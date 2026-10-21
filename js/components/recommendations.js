/**
 * Star Comics — Recommendations Carousel Component
 * Renders the 6 recommendation cover images (COVER ONLY, NO TITLES/PRICES/BUTTONS).
 * Handles left/right arrow navigation, smooth scrolling, and scroll boundary button state.
 */

function renderRecommendations(recommendations, trackEl) {
  if (!trackEl || !recommendations) return;

  // Render ONLY the comic book cover images - strictly complying with display rules
  trackEl.innerHTML = recommendations.map(item => `
    <div class="recommendation-card" role="group" aria-label="${item.title}">
      <div class="recommendation-image-wrap">
        <img 
          src="${item.image}" 
          alt="${item.alt}" 
          class="recommendation-cover"
          loading="lazy"
          onerror="this.onerror=null; this.src='IMG/green arrow.jpg';"
        />
      </div>
    </div>
  `).join('');
}

function initRecommendations() {
  const trackEl = document.getElementById('recommendations-track');
  const prevBtn = document.getElementById('rec-prev-btn');
  const nextBtn = document.getElementById('rec-next-btn');

  if (!trackEl) return;

  if (window.STAR_DATA && window.STAR_DATA.RECOMMENDATIONS_DATA) {
    renderRecommendations(window.STAR_DATA.RECOMMENDATIONS_DATA, trackEl);
  }

  // Carousel scroll step logic
  const getScrollStep = () => {
    const card = trackEl.querySelector('.recommendation-card');
    if (!card) return 300;
    // Scroll by width of one card + gap
    return card.offsetWidth + 24;
  };

  const updateControlsState = () => {
    if (!prevBtn || !nextBtn) return;
    const scrollLeft = trackEl.scrollLeft;
    const maxScroll = trackEl.scrollWidth - trackEl.clientWidth;

    prevBtn.disabled = scrollLeft <= 4;
    nextBtn.disabled = scrollLeft >= maxScroll - 4;
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      trackEl.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      trackEl.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });
  }

  // Update button disabled state on scroll
  trackEl.addEventListener('scroll', updateControlsState, { passive: true });
  window.addEventListener('resize', updateControlsState, { passive: true });

  // Initial check
  setTimeout(updateControlsState, 100);
}

if (typeof window !== 'undefined') {
  window.initRecommendations = initRecommendations;
}
