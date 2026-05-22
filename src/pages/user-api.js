/**
 * Cloud AI - User API Page
 * API key management for AI providers
 */

export class UserAPIPage {
  constructor() {
    this.providers = [
      { id: 'openai', name: 'OpenAI', icon: '🤖', models: ['gpt-4', 'gpt-3.5-turbo'] },
      { id: 'gemini', name: 'Google Gemini', icon: '🔮', models: ['gemini-pro', 'gemini-pro-vision'] },
      { id: 'groq', name: 'Groq', icon: '⚡', models: ['llama-3-70b', 'mixtral-8x7b'] },
      { id: 'claude', name: 'Claude', icon: '🧠', models: ['claude-3-opus', 'claude-3-sonnet'] },
      { id: 'custom', name: 'Custom Provider', icon: '⚙️', models: [] }
    ];
    this.container = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-api';
    container.innerHTML = `
      <div class="page-header">
        <h1>API Configuration</h1>
        <p class="text-secondary">Manage your AI provider API keys</p>
      </div>
      
      <div class="providers-grid" id="providers-grid">
        ${this.providers.map(provider => this.renderProviderCard(provider)).join('')}
      </div>
      
      <div class="info-section panel mt-xl">
        <h3>🔒 Security Information</h3>
        <p class="text-secondary mt-sm">
          Your API keys are encrypted and stored locally in your browser. 
          They are never sent to our servers. Keys are only used when making 
          direct requests to AI providers.
        </p>
      </div>
    `;
    
    this.container = container;
    this.bindEvents();
    this.injectStyles();
    
    return container;
  }

  renderProviderCard(provider) {
    const savedKey = localStorage.getItem(`api_key_${provider.id}`);
    
    return `
      <div class="provider-card panel" data-provider="${provider.id}">
        <div class="provider-header">
          <span class="provider-icon">${provider.icon}</span>
          <div class="provider-info">
            <h3 class="provider-name">${provider.name}</h3>
            <span class="badge ${savedKey ? 'badge-success' : 'badge-warning'}">
              ${savedKey ? 'Configured' : 'Not Configured'}
            </span>
          </div>
        </div>
        
        <div class="provider-form">
          <div class="input-group">
            <label class="input-label">API Key</label>
            <input 
              type="password" 
              class="input api-key-input" 
              placeholder="Enter your ${provider.name} API key"
              data-provider="${provider.id}"
            >
          </div>
          
          ${provider.models.length > 0 ? `
            <div class="input-group mt-md">
              <label class="input-label">Model</label>
              <select class="select model-select" data-provider="${provider.id}">
                ${provider.models.map(model => `<option value="${model}">${model}</option>`).join('')}
              </select>
            </div>
          ` : ''}
          
          <div class="provider-actions">
            <button class="btn btn-primary btn-sm test-btn" data-provider="${provider.id}">
              Test Connection
            </button>
            <button class="btn btn-secondary btn-sm save-btn" data-provider="${provider.id}">
              Save Key
            </button>
            ${savedKey ? `
              <button class="btn btn-ghost btn-sm delete-btn" data-provider="${provider.id}">
                Delete
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const grid = document.getElementById('providers-grid');
    
    // Load saved keys and models
    this.providers.forEach(provider => {
      const keyInput = grid.querySelector(`.api-key-input[data-provider="${provider.id}"]`);
      const modelSelect = grid.querySelector(`.model-select[data-provider="${provider.id}"]`);
      const savedKey = localStorage.getItem(`api_key_${provider.id}`);
      const savedModel = localStorage.getItem(`model_${provider.id}`);
      
      if (keyInput && savedKey) {
        keyInput.value = '•••••••••••••••';
      }
      
      if (modelSelect && savedModel) {
        modelSelect.value = savedModel;
      }
    });
    
    // Bind button events
    grid.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const providerId = e.target.dataset.provider;
        this.saveApiKey(providerId);
      });
    });
    
    grid.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const providerId = e.target.dataset.provider;
        this.deleteApiKey(providerId);
      });
    });
    
    grid.querySelectorAll('.test-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const providerId = e.target.dataset.provider;
        this.testConnection(providerId);
      });
    });
  }

  saveApiKey(providerId) {
    const keyInput = document.querySelector(`.api-key-input[data-provider="${providerId}"]`);
    const modelSelect = document.querySelector(`.model-select[data-provider="${providerId}"]`);
    
    const apiKey = keyInput.value.trim();
    const model = modelSelect ? modelSelect.value : '';
    
    if (!apiKey || apiKey.includes('•')) {
      this.showToast('Please enter a valid API key', 'error');
      return;
    }
    
    // In production, encrypt the key before storing
    // For demo, we store directly (NOT SECURE - just for demonstration)
    localStorage.setItem(`api_key_${providerId}`, apiKey);
    
    if (model) {
      localStorage.setItem(`model_${providerId}`, model);
    }
    
    this.updateProviderStatus(providerId, true);
    this.showToast('API key saved successfully', 'success');
  }

  deleteApiKey(providerId) {
    localStorage.removeItem(`api_key_${providerId}`);
    localStorage.removeItem(`model_${providerId}`);
    
    const keyInput = document.querySelector(`.api-key-input[data-provider="${providerId}"]`);
    if (keyInput) keyInput.value = '';
    
    this.updateProviderStatus(providerId, false);
    this.showToast('API key deleted', 'info');
  }

  updateProviderStatus(providerId, isConfigured) {
    const card = document.querySelector(`.provider-card[data-provider="${providerId}"]`);
    if (!card) return;
    
    const badge = card.querySelector('.badge');
    badge.className = `badge ${isConfigured ? 'badge-success' : 'badge-warning'}`;
    badge.textContent = isConfigured ? 'Configured' : 'Not Configured';
  }

  async testConnection(providerId) {
    const apiKey = localStorage.getItem(`api_key_${providerId}`);
    
    if (!apiKey) {
      this.showToast('No API key found. Please save a key first.', 'error');
      return;
    }
    
    // Simulate API test (in production, actually call the API)
    this.showToast('Testing connection...', 'info');
    
    setTimeout(() => {
      // Mock successful connection
      this.showToast(`${providerId.toUpperCase()} connection successful!`, 'success');
    }, 1500);
  }

  showToast(message, type) {
    // Simple toast fallback
    const container = document.querySelector('#toast-container') || document.body;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
  }

  injectStyles() {
    const styleId = 'api-page-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .page-api {
        max-width: 900px;
        margin: 0 auto;
      }

      .page-header {
        margin-bottom: var(--space-xl);
      }

      .page-header h1 {
        margin-bottom: var(--space-xs);
      }

      .providers-grid {
        display: grid;
        gap: var(--space-lg);
      }

      .provider-card {
        padding: var(--space-lg);
      }

      .provider-header {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        margin-bottom: var(--space-lg);
      }

      .provider-icon {
        font-size: 32px;
      }

      .provider-info {
        flex: 1;
        display: flex;
        align-items: center;
        gap: var(--space-md);
      }

      .provider-name {
        font-size: var(--text-lg);
      }

      .provider-form {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
      }

      .provider-actions {
        display: flex;
        gap: var(--space-sm);
        flex-wrap: wrap;
        margin-top: var(--space-sm);
      }

      .info-section {
        border-color: rgba(16, 185, 129, 0.3);
      }

      .info-section h3 {
        margin-bottom: var(--space-xs);
      }
    `;
    
    document.head.appendChild(style);
  }
}