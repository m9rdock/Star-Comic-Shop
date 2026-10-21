/**
 * Star Comics — Cart State Manager
 * Handles shopping cart operations, calculations, events, and localStorage persistence.
 */

class CartManager {
  constructor() {
    this.storageKey = 'star_comics_cart_v1';
    this.items = [];
    this.listeners = new Set();
    this.loadFromStorage();
  }

  /**
   * Load cart state from localStorage with fallback validation
   */
  loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Validate and sanitize stored items
          this.items = parsed
            .filter(item => item && item.id && typeof item.price === 'number')
            .map(item => ({
              ...item,
              quantity: Math.max(1, parseInt(item.quantity, 10) || 1)
            }));
        } else {
          this.items = [];
        }
      } else {
        this.items = [];
      }
    } catch (err) {
      console.warn('Could not load cart from localStorage:', err);
      this.items = [];
    }
  }

  /**
   * Save current items to localStorage
   */
  saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (err) {
      console.warn('Could not save cart to localStorage:', err);
    }
  }

  /**
   * Subscribe to cart updates
   * @param {Function} callback 
   * @returns {Function} unsubscribe function
   */
  subscribe(callback) {
    this.listeners.add(callback);
    // Initial notification for synchronization
    callback(this.getState());
    return () => this.listeners.delete(callback);
  }

  /**
   * Notify all registered listeners
   */
  notify() {
    const state = this.getState();
    this.listeners.forEach(fn => {
      try {
        fn(state);
      } catch (err) {
        console.error('Error in cart listener:', err);
      }
    });
  }

  /**
   * Returns complete snapshot of cart state
   */
  getState() {
    return {
      items: [...this.items],
      totalCount: this.getTotalCount(),
      subtotal: this.getSubtotal(),
      subtotalFormatted: this.formatCurrency(this.getSubtotal())
    };
  }

  /**
   * Add a product to the cart. If already present, increment quantity.
   * @param {Object} product 
   * @returns {Object} { item, isNew }
   */
  addItem(product) {
    if (!product || !product.id) return null;

    const existingIndex = this.items.findIndex(i => i.id === product.id);
    let isNew = false;
    let item;

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += 1;
      item = this.items[existingIndex];
    } else {
      item = {
        id: product.id,
        title: product.title,
        edition: product.edition,
        subtitle: product.subtitle,
        price: Number(product.price) || 15.00,
        image: product.image,
        quantity: 1
      };
      this.items.push(item);
      isNew = true;
    }

    this.saveToStorage();
    this.notify();
    return { item, isNew };
  }

  /**
   * Set specific quantity for an item
   * @param {string} productId 
   * @param {number} quantity 
   */
  updateQuantity(productId, quantity) {
    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.quantity = qty;
      this.saveToStorage();
      this.notify();
    }
  }

  /**
   * Increase quantity by 1
   * @param {string} productId 
   */
  increaseQuantity(productId) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.quantity += 1;
      this.saveToStorage();
      this.notify();
    }
  }

  /**
   * Decrease quantity by 1. If drops below 1, remove item.
   * @param {string} productId 
   */
  decreaseQuantity(productId) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        this.saveToStorage();
        this.notify();
      } else {
        this.removeItem(productId);
      }
    }
  }

  /**
   * Remove item from cart completely
   * @param {string} productId 
   */
  removeItem(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.saveToStorage();
    this.notify();
  }

  /**
   * Clear all items from cart
   */
  clear() {
    this.items = [];
    this.saveToStorage();
    this.notify();
  }

  /**
   * Total number of items (sum of all quantities)
   */
  getTotalCount() {
    return this.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
  }

  /**
   * Overall cart subtotal in USD
   */
  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /**
   * Formats a numeric value into USD string "$15.00"
   * @param {number} amount 
   */
  formatCurrency(amount) {
    return `$${Number(amount || 0).toFixed(2)}`;
  }
}

// Global cart manager singleton
const cartManager = new CartManager();
if (typeof window !== 'undefined') {
  window.CartManager = CartManager;
  window.cartManager = cartManager;
}
if (typeof global !== 'undefined') {
  global.CartManager = CartManager;
  global.cartManager = cartManager;
}
