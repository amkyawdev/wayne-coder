/**
 * Cloud AI - Get Started Page
 * Welcome page with quick start guide
 */

import { Toast } from '../components/toast.js';

export class GetStartedPage {
  constructor() {
    this.container = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-get-started';
    container.innerHTML = `
      <div class="hero-section">
        <div class="hero-content animate-fade-in-up">
          <div class="hero-badge badge badge-neon">✨ AI-Powered Development</div>
          <h1 class="hero-title">
            Welcome to <span class="text-neon">Cloud AI</span>
          </h1>
          <p class="hero-subtitle text-secondary">
            Your futuristic AI coding assistant with multi-provider support, 
            live code preview, and integrated terminal.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" onclick="window.navigateTo('chat')">
              <span>🚀</span> Start Coding
            </button>
            <button class="btn btn-secondary btn-lg" onclick="window.navigateTo('api')">
              <span>🔑</span> Configure API
            </button>
          </div>
        </div>
        
        <div class="hero-visual animate-fade-in-scale delay-2">
          <div class="feature-grid">
            <div class="feature-card card">
              <span class="feature-icon">🤖</span>
              <h3>Multi AI Providers</h3>
              <p class="text-secondary text-sm">Gemini, OpenAI, Groq, and more</p>
            </div>
            <div class="feature-card card">
              <span class="feature-icon">💻</span>
              <h3>Live Preview</h3>
              <p class="text-secondary text-sm">Real-time code execution</p>
            </div>
            <div class="feature-card card">
              <span class="feature-icon">🖥</span>
              <h3>Terminal</h3>
              <p class="text-secondary text-sm">Integrated command line</p>
            </div>
            <div class="feature-card card">
              <span class="feature-icon">📡</span>
              <h3>Streaming</h3>
              <p class="text-secondary text-sm">Real-time AI responses</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="quick-start-section">
        <h2 class="section-title">Quick Start Guide</h2>
        
        <div class="steps-grid">
          <div class="step-card panel animate-fade-in-up delay-1">
            <div class="step-number">01</div>
            <h3>Configure API</h3>
            <p class="text-secondary">Add your API key from any supported provider</p>
          </div>
          
          <div class="step-card panel animate-fade-in-up delay-2">
            <div class="step-number">02</div>
            <h3>Start Chatting</h3>
            <p class="text-secondary">Ask questions and get AI-powered code</p>
          </div>
          
          <div class="step-card panel animate-fade-in-up delay-3">
            <div class="step-number">03</div>
            <h3>Live Preview</h3>
            <p class="text-secondary">See your code run in real-time</p>
          </div>
        </div>
      </div>
    `;
    
    this.container = container;
    this.injectStyles();
    return container;
  }

  injectStyles() {
    const styleId = 'get-started-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .page-get-started {
        max-width: 1200px;
        margin: 0 auto;
      }

      .hero-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-2xl);
        align-items: center;
        min-height: 60vh;
        padding: var(--space-xl) 0;
      }

      .hero-badge {
        display: inline-block;
        margin-bottom: var(--space-md);
      }

      .hero-title {
        font-size: clamp(2rem, 4vw, 3rem);
        font-weight: 700;
        margin-bottom: var(--space-md);
        line-height: 1.2;
      }

      .hero-subtitle {
        font-size: var(--text-lg);
        margin-bottom: var(--space-xl);
        max-width: 500px;
      }

      .hero-actions {
        display: flex;
        gap: var(--space-md);
        flex-wrap: wrap;
      }

      .hero-visual {
        display: flex;
        justify-content: center;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-md);
        max-width: 400px;
      }

      .feature-card {
        text-align: center;
        padding: var(--space-lg);
      }

      .feature-card .feature-icon {
        font-size: 32px;
        display: block;
        margin-bottom: var(--space-sm);
      }

      .feature-card h3 {
        font-size: var(--text-base);
        margin-bottom: var(--space-xs);
      }

      .quick-start-section {
        padding: var(--space-2xl) 0;
      }

      .section-title {
        text-align: center;
        margin-bottom: var(--space-xl);
      }

      .steps-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--space-lg);
      }

      .step-card {
        position: relative;
        padding-left: var(--space-2xl);
      }

      .step-number {
        position: absolute;
        left: var(--space-md);
        top: var(--space-md);
        font-family: var(--font-display);
        font-size: var(--text-2xl);
        font-weight: 700;
        color: var(--neon-cyan);
        opacity: 0.3;
      }

      .step-card h3 {
        margin-bottom: var(--space-xs);
      }

      @media (max-width: 1023px) {
        .hero-section {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .hero-subtitle {
          margin-left: auto;
          margin-right: auto;
        }

        .hero-actions {
          justify-content: center;
        }

        .hero-visual {
          order: -1;
        }

        .feature-grid {
          max-width: 100%;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
}