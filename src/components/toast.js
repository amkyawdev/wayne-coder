/**
 * Cloud AI - Toast Notification System
 * Beautiful notifications with animations
 */

export class Toast {
  static container = null;
  
  static init() {
    if (!this.container) {
      const container = document.createElement('div');
      container.className = 'toast-container';
      container.id = 'toast-container';
      document.body.appendChild(container);
      this.container = container;
    }
    return this.container;
  }

  static show(message, type = 'info', duration = 4000) {
    this.init();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${this.getIcon(type)}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close">&times;</button>
    `;
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      this.dismiss(toast);
    });
    
    this.container.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    
    // Auto dismiss
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }
    
    return toast;
  }

  static dismiss(toast) {
    toast.classList.remove('show');
    toast.classList.add('hide');
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  static success(message, duration) {
    return this.show(message, 'success', duration);
  }

  static error(message, duration) {
    return this.show(message, 'error', duration);
  }

  static warning(message, duration) {
    return this.show(message, 'warning', duration);
  }

  static info(message, duration) {
    return this.show(message, 'info', duration);
  }

  static getIcon(type) {
    const icons = {
      success: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',
      error: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',
      warning: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
      info: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    };
    return icons[type] || icons.info;
  }
}

// Toast styles (auto-injected)
const toastStyles = `
  .toast-container {
    position: fixed;
    bottom: var(--space-lg);
    right: var(--space-lg);
    display: flex;
    flex-direction: column-reverse;
    gap: var(--space-sm);
    z-index: 9999;
    max-width: 360px;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md);
    background: var(--panel-elevated);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    transform: translateX(calc(100% + var(--space-lg)));
    opacity: 0;
    transition: all var(--transition-normal);
  }

  .toast.show {
    transform: translateX(0);
    opacity: 1;
  }

  .toast.hide {
    transform: translateX(calc(100% + var(--space-lg)));
    opacity: 0;
  }

  .toast-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .toast-icon svg {
    width: 100%;
    height: 100%;
  }

  .toast-success .toast-icon {
    color: var(--success);
  }

  .toast-error .toast-icon {
    color: var(--error);
  }

  .toast-warning .toast-icon {
    color: var(--warning);
  }

  .toast-info .toast-icon {
    color: var(--info);
  }

  .toast-message {
    flex: 1;
    font-size: var(--text-sm);
    color: var(--text-primary);
  }

  .toast-close {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 18px;
    transition: color var(--transition-fast);
  }

  .toast-close:hover {
    color: var(--text-primary);
  }

  @media (max-width: 480px) {
    .toast-container {
      left: var(--space-md);
      right: var(--space-md);
      max-width: none;
    }
  }
`;

const style = document.createElement('style');
style.textContent = toastStyles;
document.head.appendChild(style);