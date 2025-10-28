const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
};

showMenu('nav-toggle', 'nav-menu');

// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && window.gsap) {
  // Overlay reveal
  gsap.to('.first', { duration: 1.5, delay: 0.5, top: '-100%', ease: 'expo.inOut' });
  gsap.to('.second', { duration: 1.5, delay: 0.7, top: '-100%', ease: 'expo.inOut' });
  gsap.to('.third', { duration: 1.5, delay: 0.9, top: '-100%', ease: 'expo.inOut' });

  // Hero reveals
  gsap.from('.home__img', { opacity: 0, duration: 2, delay: 2, x: 60, ease: 'expo.out' });
  gsap.from('.home__information', { opacity: 0, duration: 2.2, delay: 2.1, y: 25, ease: 'expo.out' });
  gsap.from('.anime-text', { opacity: 0, duration: 2.2, delay: 2.2, y: 25, ease: 'expo.out', stagger: 0.2 });
  gsap.from('.nav__logo', { opacity: 0, duration: 2, delay: 2.6, y: 20, ease: 'expo.out' });
  gsap.from('.nav__item', { opacity: 0, duration: 2, delay: 2.6, y: 20, ease: 'expo.out', stagger: 0.15 });
  gsap.from('.home__social-icon', { opacity: 0, duration: 2, delay: 3, y: 20, ease: 'expo.out', stagger: 0.15 });
}

// Subtle parallax tilt effect for hero card and image (desktop only)
(() => {
  if (prefersReducedMotion) return;
  const container = document.querySelector('.l-main');
  if (!container) return;

  const infoEl = document.querySelector('.home__information');
  const imgEl = document.querySelector('.home__img');
  if (!infoEl && !imgEl) return;

  let rafId = null;
  const state = { x: 0, y: 0 };

  function applyTilt() {
    rafId = null;
    const maxInfo = 4; // deg
    const maxImg = 8; // deg
    if (infoEl) {
      infoEl.style.transform = `rotateY(${state.x * maxInfo}deg) rotateX(${state.y * -maxInfo}deg) translateZ(0)`;
    }
    if (imgEl) {
      imgEl.style.transform = `rotateY(${state.x * maxImg}deg) rotateX(${state.y * -maxImg}deg) translateZ(0)`;
    }
  }

  function onMove(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const nx = (clientX - rect.left) / rect.width; // 0..1
    const ny = (clientY - rect.top) / rect.height; // 0..1
    state.x = (nx - 0.5) * 2; // -1..1
    state.y = (ny - 0.5) * 2; // -1..1
    if (!rafId) rafId = requestAnimationFrame(applyTilt);
  }

  function resetTilt() {
    if (infoEl) infoEl.style.transform = '';
    if (imgEl) imgEl.style.transform = '';
  }

  container.addEventListener('mousemove', onMove, { passive: true });
  container.addEventListener('mouseleave', resetTilt, { passive: true });
})();