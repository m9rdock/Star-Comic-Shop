/**
 * Star Comics — Footer Component
 * Sets dynamic copyright year and ensures clean minimal footer rendering.
 */

function initFooter() {
  const yearEl = document.getElementById('footer-current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

if (typeof window !== 'undefined') {
  window.initFooter = initFooter;
}
