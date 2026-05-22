/**
 * Cloud AI - About Page
 * Application information and stats
 */

export class AboutPage {
  constructor() {
    this.container = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-about';
    container.innerHTML = `
      <div class="about-header">
        <div class="logo-large">⚡</div>
        <h1>Cloud AI</h1>
        <p class="version">Version 1.0.0</p>
        <p class="tagline text-secondary">
          Futuristic AI Coding Workspace
        </p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card panel">
          <span class="stat-icon">💬</span>
          <div class="stat-value">0</div>
          <div class="stat-label">Messages</div>
        </div>
        <div class="stat-card panel">
          <span class="stat-icon">💻</span>
          <div class="stat-value">0</div>
          <div class="stat-label">Code Blocks</div>
        </div>
        <div class="stat-card panel">
          <span class="stat-icon">⏱</span>
          <div class="stat-value">0ms</div>
          <div class="stat-label">Avg Response</div>
        </div>
        <div class="stat-card panel">
          <span class="stat-icon">🔑</span>
          <div class="stat-value">0</div>
          <div class="stat-label">API Providers</div>
        </div>
      </div>
      
      <div class="features-section">
        <h2>Features</h2>
        <div class="features-list">
          <div class="feature-item">
            <span class="feature-icon">🤖</span>
            <div>
              <h3>Multi AI Providers</h3>
              <p class="text-secondary">Support for OpenAI, Gemini, Groq, Claude, and custom providers</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📡</span>
            <div>
              <h3>Real-time Streaming</h3>
              <p class="text-secondary">Live AI responses with WebSocket streaming</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">💻</span>
            <div>
              <h3>Live Code Preview</h3>
              <p class="text-secondary">Instant HTML/CSS/JS execution in sandbox</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🖥</span>
            <div>
              <h3>Integrated Terminal</h3>
              <p class="text-secondary">Full terminal with xterm.js and command execution</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <div>
              <h3>Futuristic UI</h3>
              <p class="text-secondary">Glassmorphism, neon glows, and smooth animations</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔐</span>
            <div>
              <h3>Secure Storage</h3>
              <p class="text-secondary">Encrypted API keys and local IndexedDB history</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="architecture-section panel">
        <h2>Architecture</h2>
        <div class="arch-diagram">
          <div class="arch-layer layer-frontend">
            <span class="layer-label">Frontend</span>
            <div class="layer-components">
              <div class="arch-component">Three.js</div>
              <div class="arch-component">Prism.js</div>
              <div class="arch-component">xterm.js</div>
              <div class="arch-component">WebSocket</div>
            </div>
          </div>
          <div class="arch-arrow">↓</div>
          <div class="arch-layer layer-backend">
            <span class="layer-label">Backend</span>
            <div class="layer-components">
              <div class="arch-component">FastAPI</div>
              <div class="arch-component">WebSocket</div>
              <div class="arch-component">JWT Auth</div>
              <div class="arch-component">AI Providers</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="tech-stack">
        <h2>Tech Stack</h2>
        <div class="tech-tags">
          <span class="tech-tag">JavaScript</span>
          <span class="tech-tag">TypeScript</span>
          <span class="tech-tag">Three.js</span>
          <span class="tech-tag">Python</span>
          <span class="tech-tag">FastAPI</span>
          <span class="tech-tag">WebSocket</span>
          <span class="tech-tag">IndexedDB</span>
          <span class="tech-tag">Docker</span>
        </div>
      </div>
    `;
    
    this.container = container;
    this.injectStyles();
    
    return container;
  }

  injectStyles() {
    const styleId = 'about-page-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .page-about {
        max-width: 900px;
        margin: 0 auto;
      }

      .about-header {
        text-align: center;
        padding: var(--space-2xl) 0;
      }

      .logo-large {
        font-size: 72px;
        margin-bottom: var(--space-md);
        animation: pulseGlow 2s ease-in-out infinite;
      }

      .about-header h1 {
        font-size: var(--text-3xl);
        margin-bottom: var(--space-xs);
      }

      .version {
        font-family: var(--font-code);
        color: var(--neon-cyan);
        margin-bottom: var(--space-xs);
      }

      .tagline {
        font-size: var(--text-lg);
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--space-md);
        margin-bottom: var(--space-2xl);
      }

      .stat-card {
        text-align: center;
        padding: var(--space-lg);
      }

      .stat-icon {
        font-size: 24px;
        display: block;
        margin-bottom: var(--space-sm);
      }

      .stat-value {
        font-family: var(--font-display);
        font-size: var(--text-2xl);
        font-weight: 700;
        color: var(--neon-cyan);
        margin-bottom: var(--space-xs);
      }

      .stat-label {
        font-size: var(--text-sm);
        color: var(--text-secondary);
      }

      .features-section,
      .tech-stack {
        margin-bottom: var(--space-2xl);
      }

      .features-section h2,
      .tech-stack h2,
      .architecture-section h2 {
        margin-bottom: var(--space-lg);
      }

      .features-list {
        display: grid;
        gap: var(--space-md);
      }

      .feature-item {
        display: flex;
        align-items: flex-start;
        gap: var(--space-md);
        padding: var(--space-md);
        background: var(--panel-bg);
        border-radius: var(--radius-md);
      }

      .feature-icon {
        font-size: 24px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--panel-elevated);
        border-radius: var(--radius-md);
      }

      .feature-item h3 {
        font-size: var(--text-base);
        margin-bottom: var(--space-xs);
      }

      .arch-diagram {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-md);
      }

      .arch-layer {
        width: 100%;
        max-width: 500px;
        padding: var(--space-lg);
        background: var(--panel-elevated);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        text-align: center;
      }

      .layer-label {
        display: block;
        font-family: var(--font-display);
        font-size: var(--text-sm);
        color: var(--accent-primary);
        margin-bottom: var(--space-md);
      }

      .layer-components {
        display: flex;
        justify-content: center;
        gap: var(--space-sm);
        flex-wrap: wrap;
      }

      .arch-component {
        padding: var(--space-xs) var(--space-md);
        background: var(--bg-primary);
        border-radius: var(--radius-full);
        font-size: var(--text-xs);
        color: var(--text-secondary);
      }

      .arch-arrow {
        font-size: 24px;
        color: var(--accent-primary);
      }

      .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-sm);
      }

      .tech-tag {
        padding: var(--space-sm) var(--space-md);
        background: var(--panel-bg);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-full);
        font-size: var(--text-sm);
        color: var(--text-secondary);
      }

      @media (max-width: 768px) {
        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `;
    
    document.head.appendChild(style);
  }
}