/**
 * Cloud AI - Recent Page
 * Workspace history with IndexedDB storage
 */

export class RecentPage {
  constructor() {
    this.history = [];
    this.container = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-recent';
    container.innerHTML = `
      <div class="page-header">
        <div class="header-content">
          <h1>Recent Activity</h1>
          <p class="text-secondary">Your workspace history and chat sessions</p>
        </div>
        <div class="header-actions">
          <button class="btn btn-secondary" id="export-btn">
            <span>📤</span> Export
          </button>
          <button class="btn btn-ghost" id="clear-all-btn">
            Clear All
          </button>
        </div>
      </div>
      
      <div class="search-bar">
        <input 
          type="text" 
          class="input" 
          id="search-input"
          placeholder="Search history..."
        >
      </div>
      
      <div class="history-sections">
        <!-- Chat Sessions -->
        <section class="history-section">
          <h2 class="section-title">Chat Sessions</h2>
          <div class="history-list" id="chat-history-list">
            ${this.renderEmptyState('chat')}
          </div>
        </section>
        
        <!-- Code Snippets -->
        <section class="history-section">
          <h2 class="section-title">Saved Code</h2>
          <div class="history-list" id="code-history-list">
            ${this.renderEmptyState('code')}
          </div>
        </section>
      </div>
      
      <div class="storage-permission panel mt-xl">
        <div class="permission-content">
          <h3>💾 Storage Permission</h3>
          <p class="text-secondary">
            Allow local storage to save your workspace history?
          </p>
        </div>
        <div class="permission-actions">
          <button class="btn btn-primary" id="allow-storage">Allow</button>
          <button class="btn btn-secondary" id="deny-storage">Deny</button>
        </div>
      </div>
    `;
    
    this.container = container;
    this.bindEvents();
    this.loadHistory();
    this.injectStyles();
    
    return container;
  }

  renderEmptyState(type) {
    const emptyStates = {
      chat: {
        icon: '💬',
        title: 'No chat sessions yet',
        description: 'Start chatting to see your history here'
      },
      code: {
        icon: '💻',
        title: 'No saved code yet',
        description: 'Generated code will appear here'
      }
    };
    
    const state = emptyStates[type];
    
    return `
      <div class="empty-state">
        <span class="empty-icon">${state.icon}</span>
        <h3>${state.title}</h3>
        <p class="text-secondary">${state.description}</p>
      </div>
    `;
  }

  bindEvents() {
    // Export button
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportHistory());
    }
    
    // Clear all button
    const clearBtn = document.getElementById('clear-all-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearAll());
    }
    
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.search(e.target.value);
      });
    }
    
    // Storage permission buttons
    const allowBtn = document.getElementById('allow-storage');
    const denyBtn = document.getElementById('deny-storage');
    
    if (allowBtn) {
      allowBtn.addEventListener('click', () => this.requestStoragePermission(true));
    }
    if (denyBtn) {
      denyBtn.addEventListener('click', () => this.requestStoragePermission(false));
    }
  }

  async loadHistory() {
    // Load from localStorage for demo
    const savedHistory = localStorage.getItem('chat_history');
    if (savedHistory) {
      try {
        this.history = JSON.parse(savedHistory);
        this.renderHistory();
      } catch (e) {
        console.error('Failed to parse history:', e);
      }
    }
  }

  renderHistory() {
    const chatList = document.getElementById('chat-history-list');
    if (!chatList) return;
    
    if (this.history.length === 0) {
      chatList.innerHTML = this.renderEmptyState('chat');
      return;
    }
    
    chatList.innerHTML = this.history.map((item, index) => `
      <div class="history-item" data-index="${index}">
        <div class="history-item-icon">💬</div>
        <div class="history-item-content">
          <h4>${this.escapeHtml(item.title || 'Session ' + (index + 1))}</h4>
          <p class="text-secondary text-sm">${this.formatDate(item.date)}</p>
        </div>
        <div class="history-item-actions">
          <button class="btn btn-icon btn-ghost restore-btn" data-index="${index}" title="Restore">
            ↩
          </button>
          <button class="btn btn-icon btn-ghost delete-item-btn" data-index="${index}" title="Delete">
            🗑
          </button>
        </div>
      </div>
    `).join('');
    
    // Bind delete/restore events
    chatList.querySelectorAll('.restore-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.restoreSession(index);
      });
    });
    
    chatList.querySelectorAll('.delete-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        this.deleteItem(index);
      });
    });
  }

  exportHistory() {
    const data = JSON.stringify(this.history, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `cloud-ai-history-${Date.now()}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  }

  importHistory(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        this.history = [...this.history, ...data];
        this.saveHistory();
        this.renderHistory();
      } catch (err) {
        console.error('Import failed:', err);
      }
    };
    reader.readAsText(file);
  }

  search(query) {
    if (!query) {
      this.renderHistory();
      return;
    }
    
    const filtered = this.history.filter(item => 
      item.title?.toLowerCase().includes(query.toLowerCase()) ||
      item.messages?.some(m => m.content.toLowerCase().includes(query.toLowerCase()))
    );
    
    const chatList = document.getElementById('chat-history-list');
    if (chatList) {
      chatList.innerHTML = filtered.length > 0 
        ? filtered.map((item, i) => `<div class="history-item">...</div>`).join('')
        : this.renderEmptyState('chat');
    }
  }

  clearAll() {
    if (confirm('Are you sure you want to clear all history?')) {
      this.history = [];
      this.saveHistory();
      this.renderHistory();
    }
  }

  restoreSession(index) {
    const session = this.history[index];
    if (session && window.navigateTo) {
      window.navigateTo('chat');
      // In production, load session messages into chat
    }
  }

  deleteItem(index) {
    this.history.splice(index, 1);
    this.saveHistory();
    this.renderHistory();
  }

  saveHistory() {
    localStorage.setItem('chat_history', JSON.stringify(this.history));
  }

  requestStoragePermission(allowed) {
    const panel = document.querySelector('.storage-permission');
    if (panel) {
      panel.style.display = 'none';
    }
    
    if (allowed) {
      localStorage.setItem('storage_permission', 'granted');
    }
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  injectStyles() {
    const styleId = 'recent-page-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .page-recent {
        max-width: 800px;
        margin: 0 auto;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: var(--space-lg);
      }

      .header-actions {
        display: flex;
        gap: var(--space-sm);
      }

      .search-bar {
        margin-bottom: var(--space-xl);
      }

      .history-section {
        margin-bottom: var(--space-xl);
      }

      .section-title {
        font-size: var(--text-lg);
        margin-bottom: var(--space-md);
      }

      .history-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
      }

      .history-item {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-md);
        background: var(--panel-bg);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        transition: all var(--transition-fast);
      }

      .history-item:hover {
        border-color: var(--border-default);
        background: var(--panel-elevated);
      }

      .history-item-icon {
        font-size: 20px;
      }

      .history-item-content {
        flex: 1;
      }

      .history-item-content h4 {
        font-size: var(--text-sm);
        margin-bottom: 2px;
      }

      .history-item-actions {
        display: flex;
        gap: var(--space-xs);
        opacity: 0;
        transition: opacity var(--transition-fast);
      }

      .history-item:hover .history-item-actions {
        opacity: 1;
      }

      .storage-permission {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-lg);
      }

      .permission-content h3 {
        margin-bottom: var(--space-xs);
      }

      .permission-actions {
        display: flex;
        gap: var(--space-sm);
      }

      .empty-state {
        padding: var(--space-2xl);
        text-align: center;
      }

      .empty-icon {
        font-size: 32px;
        display: block;
        margin-bottom: var(--space-sm);
      }

      @media (max-width: 600px) {
        .page-header {
          flex-direction: column;
          gap: var(--space-md);
        }

        .storage-permission {
          flex-direction: column;
          text-align: center;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
}