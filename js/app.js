/**
 * Star Comics — Main Application Entry Point
 * Orchestrates component initialization, state hydration, and accessibility setup.
 */

document.addEventListener('DOMContentLoaded', () => {
  try {
    // 1. Initialize Header navigation & cart badge
    if (typeof window.initHeader === 'function') {
      window.initHeader();
    }

    // 2. Initialize Hero banner interactions
    if (typeof window.initHero === 'function') {
      window.initHero();
    }

    // 3. Initialize Best Sellers product grid
    if (typeof window.initBestSellers === 'function') {
      window.initBestSellers();
    }

    // 4. Initialize Recommendations horizontal carousel
    if (typeof window.initRecommendations === 'function') {
      window.initRecommendations();
    }

    // 5. Initialize Shopping Cart drawer & modal
    if (typeof window.initCartDrawer === 'function') {
      window.initCartDrawer();
    }

    // 6. Initialize Footer
    if (typeof window.initFooter === 'function') {
      window.initFooter();
    }

    console.info('Star Comics website initialized successfully.');
  } catch (err) {
    console.error('Error during Star Comics initialization:', err);
  }
});
