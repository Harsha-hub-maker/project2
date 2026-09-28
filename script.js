const menuButton = document.querySelector('#menuBtn');
const menuPanel = document.querySelector('#menuPanel');
const loadingScreen = document.querySelector('#loadingScreen');
const skipLoader = document.querySelector('#skipLoader');

function dismissLoader() {
  if (!loadingScreen || loadingScreen.classList.contains('is-done')) return;
  loadingScreen.classList.add('is-done');
  window.setTimeout(() => loadingScreen.remove(), 650);
}

window.setTimeout(dismissLoader, 1150);
skipLoader?.addEventListener('click', dismissLoader);

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuPanel.setAttribute('aria-hidden', String(!open));
  menuPanel.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
menuPanel.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});

const revealItems = document.querySelectorAll('.section, .project, .timeline-row');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealItems.forEach(item => item.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
}

const ticker = document.querySelector('.ticker-track');
if (ticker && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ticker.style.animation = 'none';
