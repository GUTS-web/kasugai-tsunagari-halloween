(() => {
  const root = document.documentElement;
  const body = document.body;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const compactViewport = window.matchMedia('(max-width: 900px)').matches;

  window.setTimeout(() => root.classList.add('is-ready'), prefersReducedMotion ? 0 : 120);

  const header = document.querySelector('[data-header]');
  const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 40);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const revealTargets = document.querySelectorAll('.reveal, .reveal-image');
  if (prefersReducedMotion || compactViewport || !('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  if (!prefersReducedMotion && !compactViewport) {
    window.addEventListener('pointermove', (event) => {
      root.style.setProperty('--mx', ((event.clientX / window.innerWidth) - 0.5).toFixed(3));
      root.style.setProperty('--my', ((event.clientY / window.innerHeight) - 0.5).toFixed(3));
    }, { passive: true });

    const parallaxTargets = [...document.querySelectorAll('[data-parallax]')]
      .filter((element) => !element.classList.contains('hero__photo-wrap'));
    let parallaxTicking = false;
    const updateParallax = () => {
      const center = window.innerHeight / 2;
      parallaxTargets.forEach((element) => {
        const speed = Number(element.dataset.parallax || 0);
        const rect = element.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - center) * speed;
        element.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      parallaxTicking = false;
    };
    window.addEventListener('scroll', () => {
      if (parallaxTicking) return;
      parallaxTicking = true;
      requestAnimationFrame(updateParallax);
    }, { passive: true });
    updateParallax();
  }

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-4px)`;
        card.style.boxShadow = `${(-x * 14 + 8).toFixed(1)}px ${(y * 14 + 8).toFixed(1)}px 0 rgb(255 255 255 / 16%)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }

  const countdown = document.querySelector('[data-countdown]');
  if (countdown) {
    const target = new Date('2026-10-31T10:00:00+09:00').getTime();
    const fields = {
      days: countdown.querySelector('[data-days]'),
      hours: countdown.querySelector('[data-hours]'),
      minutes: countdown.querySelector('[data-minutes]')
    };
    const updateCountdown = () => {
      const difference = Math.max(0, target - Date.now());
      const days = Math.floor(difference / 86400000);
      const hours = Math.floor((difference % 86400000) / 3600000);
      const minutes = Math.floor((difference % 3600000) / 60000);
      fields.days.textContent = String(days).padStart(2, '0');
      fields.hours.textContent = String(hours).padStart(2, '0');
      fields.minutes.textContent = String(minutes).padStart(2, '0');
      if (difference === 0) countdown.setAttribute('aria-label', '開催時刻になりました');
    };
    updateCountdown();
    window.setInterval(updateCountdown, 60000);
  }

  const modal = document.querySelector('[data-modal="quick-guide"]');
  const openModal = () => {
    if (!modal || modal.open) return;
    modal.showModal();
    body.classList.add('modal-open');
  };
  const closeModal = () => {
    if (!modal?.open) return;
    modal.close();
    body.classList.remove('modal-open');
  };
  document.querySelectorAll('[data-open-modal="quick-guide"]').forEach((button) => button.addEventListener('click', openModal));
  document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeModal));
  modal?.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  modal?.addEventListener('close', () => body.classList.remove('modal-open'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal?.open) closeModal();
  });

  const confettiField = document.querySelector('.confetti-field');
  const burst = () => {
    if (!confettiField || prefersReducedMotion) return;
    confettiField.classList.remove('is-active');
    void confettiField.offsetWidth;
    confettiField.classList.add('is-active');
    window.setTimeout(() => confettiField.classList.remove('is-active'), 1400);
  };
  document.querySelectorAll('[data-burst]').forEach((element) => element.addEventListener('click', burst));

  const allDetails = [...document.querySelectorAll('.faq details')];
  allDetails.forEach((detail) => {
    detail.addEventListener('toggle', () => {
      if (!detail.open) return;
      allDetails.forEach((other) => {
        if (other !== detail) other.removeAttribute('open');
      });
    });
  });

  // Instagramの投稿：横に流れ続ける（マウスを乗せる・指で動かすと止まる）
  const igRail = document.querySelector('[data-ig-rail]');
  if (igRail) {
    const track = igRail.querySelector('[data-ig-track]');
    const originals = [...track.children];
    const toggle = document.querySelector('[data-ig-toggle]');
    const canHover = window.matchMedia('(hover: hover)').matches;
    const speed = 34;
    let pos = 0;
    let last = 0;
    let holdUntil = 0;
    let userPaused = prefersReducedMotion;
    let tween = null;
    let running = false;
    let embedsRequested = false;

    const loopWidth = () => track.children[originals.length].offsetLeft - originals[0].offsetLeft;
    const cardStep = () => originals[1].offsetLeft - originals[0].offsetLeft;

    // 端まで来ても切れ目なく流れるよう、画面の幅に足りるだけ投稿を複製する
    const fillClones = () => {
      let added = false;
      while (track.children.length < originals.length * 2
        || (loopWidth() > 0 && track.children.length < originals.length * 6
          && igRail.scrollWidth - igRail.clientWidth < loopWidth() + 8)) {
        originals.forEach((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          track.append(clone);
        });
        added = true;
      }
      if (added && embedsRequested) window.instgrm?.Embeds.process();
    };
    new MutationObserver(() => {
      track.querySelectorAll('[aria-hidden="true"] a, [aria-hidden="true"] iframe')
        .forEach((element) => element.setAttribute('tabindex', '-1'));
    }).observe(track, { childList: true, subtree: true });
    fillClones();

    const setPos = (value) => {
      const width = loopWidth();
      pos = ((value % width) + width) % width;
      igRail.scrollLeft = pos;
    };
    const hold = (ms) => {
      holdUntil = Math.max(holdUntil, performance.now() + ms);
    };

    const tick = (now) => {
      const delta = last ? Math.min(now - last, 64) : 0;
      last = now;
      if (tween) {
        const t = Math.min(1, (now - tween.start) / tween.duration);
        setPos(tween.from + (tween.to - tween.from) * (1 - Math.pow(1 - t, 3)));
        if (t === 1) tween = null;
      } else if (!userPaused && now > holdUntil && !(canHover && igRail.matches(':hover'))) {
        setPos(pos + speed * delta / 1000);
      }
      if (running) requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = 0;
      requestAnimationFrame(tick);
    };

    const loadEmbeds = () => {
      if (embedsRequested) return;
      embedsRequested = true;
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        return;
      }
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.instagram.com/embed.js';
      body.append(script);
    };

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadEmbeds();
      }, { rootMargin: '800px 0px' }).observe(igRail);
      new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
        else running = false;
      }).observe(igRail);
    } else {
      loadEmbeds();
      start();
    }

    // 指やトラックパッドで動かしたときは、その位置から少し待って再開する
    igRail.addEventListener('scroll', () => {
      if (Math.abs(igRail.scrollLeft - pos) <= 2) return;
      pos = igRail.scrollLeft;
      tween = null;
      hold(4000);
    }, { passive: true });
    igRail.addEventListener('pointerdown', () => hold(4000));
    igRail.addEventListener('focusin', () => {
      holdUntil = Infinity;
    });
    igRail.addEventListener('focusout', () => {
      holdUntil = 0;
      hold(2000);
    });

    const nudge = (direction) => {
      tween = { from: pos, to: pos + direction * cardStep(), start: performance.now(), duration: 520 };
      hold(5000);
      start();
    };
    document.querySelector('[data-ig-prev]')?.addEventListener('click', () => nudge(-1));
    document.querySelector('[data-ig-next]')?.addEventListener('click', () => nudge(1));

    const renderToggle = () => {
      toggle.setAttribute('aria-pressed', String(userPaused));
      toggle.textContent = userPaused ? '再生' : '一時停止';
    };
    toggle?.addEventListener('click', () => {
      userPaused = !userPaused;
      holdUntil = 0;
      renderToggle();
    });
    if (toggle) renderToggle();

    window.addEventListener('resize', () => {
      fillClones();
      setPos(pos);
    }, { passive: true });
  }
})();
