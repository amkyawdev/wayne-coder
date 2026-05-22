/**
 * Cloud AI - Sidebar Component
 * Fixed sidebar navigation with icons
 */

// Import SVG icons as strings
const icons = {
  home: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
  chat: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
  api: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>`,
  recent: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  about: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
};

export class Sidebar {
  constructor(options = {}) {
    this.currentPage = options.currentPage || 'home';
    this.onPageChange = options.onPageChange || (() => {});
    this.pages = [
      { id: 'home', icon: 'home', label: 'Get Started' },
      { id: 'chat', icon: 'chat', label: 'Chat' },
      { id: 'api', icon: 'api', label: 'User API' },
      { id: 'recent', icon: 'recent', label: 'Recent' },
      { id: 'about', icon: 'about', label: 'About' }
    ];
    
    this.element = null;
    this.init();
  }

  init() {
    this.create();
    this.bindEvents();
  }

  create() {
    const sidebar = document.createElement('nav');
    sidebar.className = 'sidebar';
    sidebar.setAttribute('aria-label', 'Main navigation');
    
    // Logo at top
    const logo = document.createElement('div');
    logo.className = 'sidebar-logo';
    logo.innerHTML = `
      <span class="logo-icon">⚡</span>
    `;
    sidebar.appendChild(logo);
    
    // Navigation items
    const navList = document.createElement('ul');
    navList.className = 'sidebar-nav';
    
    this.pages.forEach(page => {
      const navItem = document.createElement('li');
      navItem.className = `sidebar-item ${page.id === this.currentPage ? 'active' : ''}`;
      navItem.dataset.page = page.id;
      navItem.innerHTML = `
        <button class="sidebar-link tooltip" aria-label="${page.label}">
          <span class="sidebar-icon">${icons[page.icon]}</span>
          <span class="tooltip-content">${page.label}</span>
        </button>
      `;
      navList.appendChild(navItem);
    });
    
    sidebar.appendChild(navList);
    
    // Version at bottom
    const version = document.createElement('div');
    version.className = 'sidebar-version';
    version.innerHTML = 'v1.0';
    sidebar.appendChild(version);
    
    this.element = sidebar;
    document.querySelector('.app-container').appendChild(sidebar);
  }

  bindEvents() {
    const items = this.element.querySelectorAll('.sidebar-item');
    
    items.forEach(item => {
      item.addEventListener('click', () => {
        const pageId = item.dataset.page;
        this.setActive(pageId);
        this.onPageChange(pageId);
      });
    });
  }

  setActive(pageId) {
    const items = this.element.querySelectorAll('.sidebar-item');
    items.forEach(item => {
      item.classList.toggle('active', item.dataset.page === pageId);
    });
    this.currentPage = pageId;
  }

  render() {
    return this.element;
  }
}

// Inject styles
const sidebarStyles = `
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: var(--sidebar-width);
    height: 100vh;
    background: var(--panel-glass);
    backdrop-filter: blur(12px);
    border-right: 1px solid var(--border-subtle);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-md) 0;
    z-index: 100;
  }

  .sidebar-logo {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--space-lg);
  }

  .logo-icon {
    font-size: 24px;
    animation: pulseGlow 2s ease-in-out infinite;
  }

  .sidebar-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    list-style: none;
  }

  .sidebar-item {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
  }

  .sidebar-item::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 0;
    background: var(--neon-cyan);
    border-radius: var(--radius-full);
    transition: height var(--transition-fast);
    box-shadow: 0 0 8px var(--neon-cyan);
  }

  .sidebar-item.active::before {
    height: 24px;
  }

  .sidebar-item:hover {
    background: var(--panel-bg);
  }

  .sidebar-item.active {
    background: rgba(0, 245, 255, 0.1);
  }

  .sidebar-link {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    color: var(--text-muted);
    cursor: pointer;
    transition: all var(--transition-fast);
    position: relative;
  }

  .sidebar-link:hover {
    color: var(--neon-cyan);
    transform: scale(1.1);
  }

  .sidebar-item.active .sidebar-link {
    color: var(--neon-cyan);
  }

  .sidebar-icon {
    width: 22px;
    height: 22px;
  }

  .sidebar-icon svg {
    width: 100%;
    height: 100%;
  }

  .sidebar-version {
    font-size: 10px;
    color: var(--text-muted);
    font-family: var(--font-code);
  }

  /* Tooltip override */
  .sidebar-item .tooltip-content {
    left: calc(100% + 8px);
  }

  @media (max-width: 1023px) {
    .sidebar {
      top: auto;
      bottom: 0;
      width: 100%;
      height: 60px;
      flex-direction: row;
      padding: 0 var(--space-md);
      border-right: none;
      border-top: 1px solid var(--border-subtle);
    }

    .sidebar-logo,
    .sidebar-version {
      display: none;
    }

    .sidebar-nav {
      flex-direction: row;
      width: 100%;
      justify-content: space-around;
      gap: 0;
    }

    .sidebar-item {
      width: auto;
      height: auto;
      padding: var(--space-sm);
    }

    .sidebar-item::before {
      left: 50%;
      top: -4px;
      transform: translateX(-50%);
      width: 24px;
      height: 3px;
    }

    .sidebar-item .tooltip-content {
      display: none;
    }
  }
`;

// Inject styles
const styleEl = document.createElement('style');
styleEl.textContent = sidebarStyles;
document.head.appendChild(styleEl);