/**
 * Star Comics — Cart Drawer Component
 * Handles side drawer rendering, item operations (+, -, remove), empty state,
 * subtotal calculations, keyboard accessibility (Escape), and demo checkout modal.
 */

class CartDrawer {
  constructor() {
    this.overlay = document.getElementById('cart-drawer-overlay');
    this.drawer = document.getElementById('cart-drawer');
    this.closeBtn = document.getElementById('cart-close-btn');
    this.bodyEl = document.getElementById('cart-drawer-body');
    this.footerEl = document.getElementById('cart-drawer-footer');
    this.headerCountEl = document.getElementById('cart-header-count');
    this.totalCountEl = document.getElementById('cart-summary-total-count');
    this.subtotalAmountEl = document.getElementById('cart-subtotal-amount');
    this.checkoutBtn = document.getElementById('cart-checkout-btn');
    this.demoModal = document.getElementById('demo-modal');
    this.demoModalCloseBtn = document.getElementById('demo-modal-close-btn');

    this.isOpen = false;
    this.initEvents();
  }

  initEvents() {
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Overlay click closes drawer
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    // Keyboard Escape closes drawer & modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.demoModal && this.demoModal.classList.contains('is-open')) {
          this.closeDemoModal();
        } else if (this.isOpen) {
          this.close();
        }
      }
    });

    // Checkout demo button click
    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', () => {
        this.openDemoModal();
      });
    }

    // Demo modal close button
    if (this.demoModalCloseBtn) {
      this.demoModalCloseBtn.addEventListener('click', () => {
        this.closeDemoModal();
      });
    }

    // Demo modal overlay click
    if (this.demoModal) {
      this.demoModal.addEventListener('click', (e) => {
        if (e.target === this.demoModal) {
          this.closeDemoModal();
        }
      });
    }

    // Subscribe to cart updates
    if (window.cartManager) {
      window.cartManager.subscribe((state) => {
        this.render(state);
      });
    }
  }

  open() {
    this.isOpen = true;
    if (this.overlay) this.overlay.classList.add('is-open');
    if (this.drawer) {
      this.drawer.classList.add('is-open');
      this.drawer.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    if (this.closeBtn) this.closeBtn.focus();
  }

  close() {
    this.isOpen = false;
    if (this.overlay) this.overlay.classList.remove('is-open');
    if (this.drawer) {
      this.drawer.classList.remove('is-open');
      this.drawer.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
    const cartTrigger = document.getElementById('cart-trigger-btn');
    if (cartTrigger) cartTrigger.focus();
  }

  openDemoModal() {
    if (this.demoModal) {
      this.demoModal.classList.add('is-open');
      this.demoModal.setAttribute('aria-hidden', 'false');
      if (this.demoModalCloseBtn) this.demoModalCloseBtn.focus();
    }
  }

  closeDemoModal() {
    if (this.demoModal) {
      this.demoModal.classList.remove('is-open');
      this.demoModal.setAttribute('aria-hidden', 'true');
    }
  }

  render(state) {
    const { items, totalCount, subtotalFormatted } = state;

    // Header count badge
    if (this.headerCountEl) {
      this.headerCountEl.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
    }

    // Summary counts
    if (this.totalCountEl) {
      this.totalCountEl.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
    }

    if (this.subtotalAmountEl) {
      this.subtotalAmountEl.textContent = subtotalFormatted;
    }

    // If empty cart
    if (!items || items.length === 0) {
      this.renderEmptyState();
      if (this.footerEl) this.footerEl.style.display = 'none';
      return;
    }

    if (this.footerEl) this.footerEl.style.display = 'block';
    this.renderItemsList(items);
  }

  renderEmptyState() {
    if (!this.bodyEl) return;
    this.bodyEl.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon-wrap" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor"/>
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor"/>
            <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor"/>
          </svg>
        </div>
        <h4 class="cart-empty-text">Your cart is empty.</h4>
        <p class="cart-empty-subtext">Discover our curated graphic novels and start reading today.</p>
        <button type="button" class="continue-shopping-btn" id="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    `;

    const continueBtn = document.getElementById('continue-shopping-btn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        this.close();
        const bestSellers = document.getElementById('best-sellers');
        if (bestSellers) bestSellers.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  renderItemsList(items) {
    if (!this.bodyEl) return;

    this.bodyEl.innerHTML = items.map(item => {
      const lineItemSubtotal = (item.price * item.quantity).toFixed(2);
      return `
        <div class="cart-item" data-item-id="${item.id}">
          <div class="cart-item-thumbnail-wrap">
            <img 
              src="${item.image}" 
              alt="${item.title} thumbnail" 
              class="cart-item-thumbnail" 
              loading="lazy"
            />
          </div>
          <div class="cart-item-info">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
              <h4 class="cart-item-title">${item.title}</h4>
              <button 
                type="button" 
                class="cart-item-remove-btn" 
                data-remove-id="${item.id}"
                aria-label="Remove ${item.title} from cart"
                title="Remove item"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>

            ${item.edition ? `<p class="cart-item-edition">${item.edition}${item.subtitle ? ` • ${item.subtitle}` : ''}</p>` : ''}
            <p class="cart-item-price-unit">$${item.price.toFixed(2)} each</p>

            <div class="cart-item-bottom-row">
              <div class="qty-control-group" role="group" aria-label="Quantity for ${item.title}">
                <button 
                  type="button" 
                  class="qty-btn" 
                  data-decrease-id="${item.id}"
                  aria-label="Decrease quantity"
                >−</button>
                <span class="qty-display" aria-live="polite">${item.quantity}</span>
                <button 
                  type="button" 
                  class="qty-btn" 
                  data-increase-id="${item.id}"
                  aria-label="Increase quantity"
                >+</button>
              </div>

              <div class="cart-item-subtotal">$${lineItemSubtotal}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach item action handlers
    this.attachItemHandlers();
  }

  attachItemHandlers() {
    if (!this.bodyEl) return;

    // Increase
    this.bodyEl.querySelectorAll('[data-increase-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-increase-id');
        if (window.cartManager) window.cartManager.increaseQuantity(id);
      });
    });

    // Decrease
    this.bodyEl.querySelectorAll('[data-decrease-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-decrease-id');
        if (window.cartManager) window.cartManager.decreaseQuantity(id);
      });
    });

    // Remove
    this.bodyEl.querySelectorAll('[data-remove-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-id');
        if (window.cartManager) window.cartManager.removeItem(id);
      });
    });
  }
}

function initCartDrawer() {
  window.cartDrawer = new CartDrawer();
}

if (typeof window !== 'undefined') {
  window.initCartDrawer = initCartDrawer;
}
