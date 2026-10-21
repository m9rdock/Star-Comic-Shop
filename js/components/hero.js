/**
 * Star Comics — Hero Component
 * Manages the hero banner interactions, including the "Start Shopping" scroll to Recommendations.
 */

function initHero() {
  const startShoppingBtn = document.getElementById('hero-start-shopping-btn');
  const recommendationsSection = document.getElementById('recommendations');

  if (startShoppingBtn && recommendationsSection) {
    startShoppingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      recommendationsSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

if (typeof window !== 'undefined') {
  window.initHero = initHero;
}
