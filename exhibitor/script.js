(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.querySelector('.loader');
  const header = document.querySelector('[data-header]');
  const modal = document.querySelector('[data-modal]');
  const canvas = document.querySelector('.confetti-canvas');

  window.addEventListener('load', () => {
    window.setTimeout(() => loader?.classList.add('is-hidden'), reducedMotion ? 0 : 650);
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px' });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  const updateHeader = () => header?.classList.toggle('is-fixed', window.scrollY > 360);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const deadline = new Date('2026-09-15T23:59:59+09:00');
  const now = new Date();
  const days = Math.max(0, Math.ceil((deadline - now) / 86400000));
  const daysNode = document.querySelector('[data-days]');
  const daysLabel = document.querySelector('[data-days-label]');
  if (daysNode && daysLabel) {
    daysNode.textContent = deadline > now ? String(days) : '終了';
    daysLabel.textContent = deadline > now ? '日後に締切' : '募集締切済み';
  }

  const openModal = () => {
    if (!modal) return;
    modal.showModal();
    document.body.classList.add('is-locked');
  };
  const closeModal = () => {
    if (!modal?.open) return;
    modal.close();
    document.body.classList.remove('is-locked');
  };
  document.querySelectorAll('[data-modal-open]').forEach((button) => button.addEventListener('click', openModal));
  document.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', closeModal));
  modal?.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) closeModal();
  });
  modal?.addEventListener('cancel', () => document.body.classList.remove('is-locked'));

  if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.tilt').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) translateY(-4px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }

  const launchConfetti = () => {
    if (!canvas || reducedMotion) return;
    const context = canvas.getContext('2d');
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    context.scale(ratio, ratio);
    const colors = ['#f06421', '#ffd84a', '#b9e86e', '#d84471', '#ffffff'];
    const particles = Array.from({ length: 85 }, () => ({
      x: window.innerWidth * (.2 + Math.random() * .6), y: window.innerHeight * .63,
      vx: (Math.random() - .5) * 10, vy: -5 - Math.random() * 9,
      size: 4 + Math.random() * 7, rotation: Math.random() * Math.PI,
      color: colors[Math.floor(Math.random() * colors.length)], life: 100
    }));
    const tick = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle) => {
        particle.x += particle.vx; particle.y += particle.vy; particle.vy += .22;
        particle.rotation += .14; particle.life -= 1;
        context.save(); context.translate(particle.x, particle.y); context.rotate(particle.rotation);
        context.fillStyle = particle.color; context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * .55); context.restore();
      });
      if (particles.some((particle) => particle.life > 0)) requestAnimationFrame(tick);
      else context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
    tick();
  };

  const finalSection = document.querySelector('.final-cta');
  if (finalSection && 'IntersectionObserver' in window) {
    const celebrationObserver = new IntersectionObserver((entries, instance) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        launchConfetti();
        instance.disconnect();
      }
    }, { threshold: .45 });
    celebrationObserver.observe(finalSection);
  }
})();
