/**
 * Star Comics — Toast Notification System
 * Displays temporary feedback confirmations without interrupting browsing.
 */

class ToastManager {
  constructor() {
    this.container = null;
    this.initContainer();
  }

  initContainer() {
    if (typeof document === 'undefined') return;
    let el = document.getElementById('toast-container');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast-container';
      el.className = 'toast-container';
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    this.container = el;
  }

  /**
   * Show a toast message
   * @param {string} title 
   * @param {string} subtitle 
   * @param {number} duration in ms
   */
  show(title, subtitle = '', duration = 2800) {
    if (!this.container) this.initContainer();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor"/>
          <path d="M8 12.5L10.5 15L16 9" stroke="currentColor"/>
        </svg>
      </div>
      <div class="toast-message">
        <strong>${this.escapeHtml(title)}</strong>
        ${subtitle ? `<span> — ${this.escapeHtml(subtitle)}</span>` : ''}
      </div>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-leave');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

const toastManager = new ToastManager();
if (typeof window !== 'undefined') {
  window.toastManager = toastManager;
}
