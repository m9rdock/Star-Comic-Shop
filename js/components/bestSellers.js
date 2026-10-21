/**
 * Star Comics — Best Sellers Component
 * Renders the 6 Best Sellers products and handles "Add to Cart" interactions.
 */

function renderBestSellers(products, containerEl) {
  if (!containerEl || !products) return;

  containerEl.innerHTML = products.map(product => `
    <article class="product-card" data-product-id="${product.id}">
      <!-- 1. Comic book cover image -->
      <div class="product-image-wrap">
        <img 
          src="${product.image}" 
          alt="${product.alt}" 
          class="product-image"
          loading="lazy"
          onerror="this.onerror=null; this.src='IMG/absolute batman.jpg';"
        />
      </div>

      <!-- Product Details Container -->
      <div class="product-details">
        <!-- 2. Comic book title -->
        <h3 class="product-title">${product.title}</h3>

        <!-- 3. Trade paperback volume or subtitle -->
        <div class="product-edition-subtitle">
          <span class="product-volume">${product.edition}</span>
          ${product.subtitle ? `<span class="product-subtitle">${product.subtitle}</span>` : ''}
        </div>

        <!-- 4. Issue collection information -->
        <p class="product-issues">Issues collected: ${product.issuesCollected}</p>

        <!-- 5. Price -->
        <div class="product-price-row">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <span class="product-format-tag">TPB</span>
        </div>

        <!-- 6. "Add to Cart" button -->
        <button 
          type="button" 
          class="add-to-cart-btn" 
          data-product-id="${product.id}"
          aria-label="Add ${product.title} to cart"
        >
          <svg class="btn-cart-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          Add to Cart
        </button>
      </div>
    </article>
  `).join('');

  // Attach click listeners for "Add to Cart"
  const buttons = containerEl.querySelectorAll('.add-to-cart-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = btn.getAttribute('data-product-id');
      const product = products.find(p => p.id === productId);
      if (product && window.cartManager) {
        const result = window.cartManager.addItem(product);
        
        // Show brief confirmation toast
        if (window.toastManager) {
          window.toastManager.show('Added to cart', product.title);
        }

        // Brief visual feedback on button
        const originalText = btn.innerHTML;
        btn.innerHTML = `
          <svg class="btn-cart-icon" viewBox="0 0 24 24" style="stroke: #292929;">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Added!
        `;
        btn.style.backgroundColor = 'var(--color-pastel-pink)';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
        }, 1200);
      }
    });
  });
}

function initBestSellers() {
  const container = document.getElementById('best-sellers-grid');
  if (container && window.STAR_DATA && window.STAR_DATA.BEST_SELLERS_DATA) {
    renderBestSellers(window.STAR_DATA.BEST_SELLERS_DATA, container);
  }
}

if (typeof window !== 'undefined') {
  window.initBestSellers = initBestSellers;
}
