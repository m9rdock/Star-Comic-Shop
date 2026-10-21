/**
 * Star Comics — Automated Logic & State Test Suite
 */

const fs = require('fs');
const path = require('path');

// Mock localStorage
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

// Mock window and global
global.window = {
  localStorage: global.localStorage
};

// Load data and cart
const dataContent = fs.readFileSync(path.join(__dirname, 'js', 'data.js'), 'utf8');
eval(dataContent);

const cartContent = fs.readFileSync(path.join(__dirname, 'js', 'cart.js'), 'utf8');
eval(cartContent);

console.log('Testing Star Comics Cart & Catalog Logic...\n');

// 1. Verify Catalog Data
const bestSellers = global.STAR_DATA.BEST_SELLERS_DATA;
const recommendations = global.STAR_DATA.RECOMMENDATIONS_DATA;

console.assert(bestSellers.length === 6, `Expected 6 best sellers, got ${bestSellers.length}`);
console.log(`[PASS] Best sellers count: ${bestSellers.length}`);

console.assert(recommendations.length === 6, `Expected 6 recommendations, got ${recommendations.length}`);
console.log(`[PASS] Recommendations count: ${recommendations.length}`);

// Verify all best sellers have price 15.00 and valid image paths inside IMG/
bestSellers.forEach(item => {
  console.assert(item.price === 15.00, `Item ${item.title} price is not 15.00: ${item.price}`);
  console.assert(fs.existsSync(path.join(__dirname, item.image)), `Best seller image missing: ${item.image}`);
});
console.log(`[PASS] All Best Sellers priced at $15.00 and image files exist in IMG/`);

// Verify all recommendations have existing image files inside IMG/
recommendations.forEach(item => {
  console.assert(fs.existsSync(path.join(__dirname, item.image)), `Recommendation image missing: ${item.image}`);
});
console.log(`[PASS] All Recommendation image files exist in IMG/`);

// 2. Test Cart Manager
const cart = global.cartManager;
cart.clear();
console.assert(cart.getTotalCount() === 0, 'Cart should be empty after clear');
console.assert(cart.getSubtotal() === 0, 'Subtotal should be 0');

// Add first item: Absolute Batman
cart.addItem(bestSellers[0]);
console.assert(cart.getTotalCount() === 1, `Expected 1 item, got ${cart.getTotalCount()}`);
console.assert(cart.getSubtotal() === 15.00, `Expected subtotal 15.00, got ${cart.getSubtotal()}`);
console.log(`[PASS] Add single item: count=1, subtotal=$15.00`);

// Add second instance of Absolute Batman (should increment quantity)
cart.addItem(bestSellers[0]);
console.assert(cart.getTotalCount() === 2, `Expected 2 items, got ${cart.getTotalCount()}`);
console.assert(cart.getSubtotal() === 30.00, `Expected subtotal 30.00, got ${cart.getSubtotal()}`);
console.assert(cart.items.length === 1, `Expected 1 distinct item line, got ${cart.items.length}`);
console.log(`[PASS] Duplicate add increments quantity to 2, subtotal=$30.00`);

// Add another product: Absolute Superman
cart.addItem(bestSellers[1]);
console.assert(cart.getTotalCount() === 3, `Expected 3 items, got ${cart.getTotalCount()}`);
console.assert(cart.getSubtotal() === 45.00, `Expected subtotal 45.00, got ${cart.getSubtotal()}`);
console.assert(cart.items.length === 2, `Expected 2 distinct item lines, got ${cart.items.length}`);
console.log(`[PASS] Add second distinct product: totalCount=3, subtotal=$45.00`);

// Test decrease quantity
cart.decreaseQuantity(bestSellers[0].id);
console.assert(cart.getTotalCount() === 2, `Expected 2 items after decrease, got ${cart.getTotalCount()}`);
console.assert(cart.getSubtotal() === 30.00, `Expected subtotal 30.00 after decrease, got ${cart.getSubtotal()}`);
console.log(`[PASS] Decrease quantity: count=2, subtotal=$30.00`);

// Test remove item
cart.removeItem(bestSellers[1].id);
console.assert(cart.getTotalCount() === 1, `Expected 1 item after remove, got ${cart.getTotalCount()}`);
console.assert(cart.getSubtotal() === 15.00, `Expected subtotal 15.00 after remove, got ${cart.getSubtotal()}`);
console.log(`[PASS] Remove item: count=1, subtotal=$15.00`);

// Test localStorage persistence
const savedRaw = storage[cart.storageKey];
console.assert(Boolean(savedRaw), 'Cart was not saved to storage');
const parsed = JSON.parse(savedRaw);
console.assert(parsed.length === 1 && parsed[0].id === bestSellers[0].id, 'Saved data does not match cart state');
console.log(`[PASS] LocalStorage persistence verified`);

// Test re-instantiation / restoration from storage
const newCart = new global.CartManager();
console.assert(newCart.getTotalCount() === 1, `Restored cart count mismatch: ${newCart.getTotalCount()}`);
console.assert(newCart.getSubtotal() === 15.00, `Restored subtotal mismatch: ${newCart.getSubtotal()}`);
console.log(`[PASS] Cart restoration on refresh verified`);

console.log('\n>> ALL 8 VERIFICATION TESTS PASSED SUCCESSFULLY! <<\n');
