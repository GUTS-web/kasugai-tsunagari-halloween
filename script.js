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
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
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
})();
