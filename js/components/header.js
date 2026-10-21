/**
 * Star Comics — Header Component
 * Manages sticky navigation, smooth section scrolling, mobile toggle, and live cart counter.
 */

function initHeader() {
  const headerEl = document.querySelector('.site-header');
  const cartTriggerBtn = document.getElementById('cart-trigger-btn');
  const cartBadge = document.getElementById('cart-badge');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  // Handle scroll class for header elevation
  window.addEventListener('scroll', () => {
    if (window.scrollY > 15) {
      headerEl.classList.add('is-scrolled');
    } else {
      headerEl.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navLinksList) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinksList.classList.toggle('is-open');
      mobileToggle.classList.toggle('is-active', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('is-open');
        mobileToggle.classList.remove('is-active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll with proper offset for section links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Open cart drawer on cart icon click
  if (cartTriggerBtn) {
    cartTriggerBtn.addEventListener('click', () => {
      if (window.cartDrawer) {
        window.cartDrawer.open();
      }
    });
  }

  // Cart badge subscription
  if (window.cartManager && cartBadge) {
    window.cartManager.subscribe((state) => {
      const count = state.totalCount;
      cartBadge.textContent = count;
      cartBadge.setAttribute('aria-label', `${count} items in cart`);

      if (count > 0) {
        cartBadge.style.display = 'flex';
        // Add a quick bounce animation
        cartBadge.classList.add('bump');
        setTimeout(() => cartBadge.classList.remove('bump'), 200);
      } else {
        cartBadge.style.display = 'none';
      }
    });
  }
}

if (typeof window !== 'undefined') {
  window.initHeader = initHeader;
}
