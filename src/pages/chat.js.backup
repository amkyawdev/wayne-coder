/**
 * Cloud AI - Chat Page
 * Main chat interface with AI assistant
 */

import { marked } from 'https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js';

// Simple HTML escaping helper function
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

export class ChatPage {
  constructor() {
    this.messages = [];
    this.isStreaming = false;
    this.provider = 'openai';
    this.model = 'gpt-4';
    this.ws = null;
    this.container = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'page-chat';
    container.innerHTML = `
      <div class="chat-layout">
        <!-- Chat Messages Area -->
        <div class="chat-main">
          <div class="chat-messages" id="chat-messages">
            <div class="welcome-message animate-fade-in-up">
              <div class="welcome-icon">🤖</div>
              <h2>Welcome to Cloud AI Chat</h2>
              <p class="text-secondary">Start a conversation with your AI coding assistant</p>
            </div>
          </div>
          
          <!-- Chat Input -->
          <div class="chat-input-area">
            <div class="chat-input-wrapper">
              <textarea 
                class="chat-input" 
                id="chat-input"
                placeholder="Describe what you want to build..."
                rows="1"
              ></textarea>
              <button class="send-button btn btn-primary" id="send-button">
                <span class="send-icon">➤</span>
              </button>
            </div>
            <div class="input-options">
              <select class="provider-select select" id="provider-select">
                <option value="openai">OpenAI</option>
                <option value="gemini">Gemini</option>
                <option value="groq">Groq</option>
              </select>
              <label class="streaming-toggle">
                <input type="checkbox" id="streaming-toggle" checked>
                <span class="toggle-switch"></span>
                <span class="toggle-label">Streaming</span>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Live Preview Panel -->
        <div class="preview-panel panel" id="preview-panel">
          <div class="panel-header">
            <h3 class="panel-title">Live Preview</h3>
            <button class="btn btn-icon btn-ghost" id="refresh-preview" title="Refresh">
              <span>↻</span>
            </button>
          </div>
          <div class="preview-frame-wrapper">
            <iframe id="preview-frame" class="preview-frame" sandbox="allow-scripts"></iframe>
          </div>
        </div>
        
        <!-- Terminal Panel -->
        <div class="terminal-panel panel" id="terminal-panel">
          <div class="panel-header">
            <h3 class="panel-title">Terminal</h3>
            <div class="terminal-controls">
              <button class="btn btn-sm btn-ghost" id="clear-terminal">Clear</button>
            </div>
          </div>
          <div id="terminal-container" class="terminal-container"></div>
        </div>
      </div>
    `;
    
    this.container = container;
    this.bindEvents();
    this.injectStyles();
    this.initPreview();
    this.initTerminal();
    
    return container;
  }

  bindEvents() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-button');
    
    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 200) + 'px';
    });
    
    // Send message
    const sendMessage = () => {
      const message = input.value.trim();
      if (message && !this.isStreaming) {
        this.sendMessage(message);
        input.value = '';
        input.style.height = 'auto';
      }
    };
    
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  async sendMessage(content) {
    this.isStreaming = true;
    
    // Add user message
    this.addMessage('user', content);
    
    // Add AI message placeholder
    const aiMessage = this.addMessage('ai', '', true);
    
    // Simulate AI response (replace with actual API call)
    await this.simulateAIResponse(aiMessage, content);
    
    this.isStreaming = false;
  }

  addMessage(role, content, isLoading = false) {
    const messagesContainer = document.getElementById('chat-messages');
    
    // Remove welcome message if exists
    const welcome = messagesContainer.querySelector('.welcome-message');
    if (welcome) welcome.remove();
    
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message chat-message-${role}`;
    
    if (role === 'user') {
      messageEl.innerHTML = `
        <div class="message-content">${this.escapeHtml(content)}</div>
      `;
    } else {
      const loadingIndicator = isLoading ? `
        <div class="loading-indicator">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
          <span class="loading-text">Thinking...</span>
        </div>
      ` : '';
      
      messageEl.innerHTML = `
        <div class="message-avatar">${role === 'ai' ? '🤖' : '👤'}</div>
        <div class="message-content">${loadingIndicator}<div class="message-text"></div></div>
      `;
    }
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    this.messages.push({ role, content, element: messageEl });
    
    return messageEl;
  }

  async simulateAIResponse(messageEl, userMessage) {
    const textEl = messageEl.querySelector('.message-text');
    const loadingEl = messageEl.querySelector('.loading-indicator');
    
    // Sample responses
    const responses = {
      default: `# AI Response\n\nI'd be happy to help you with that! Here's a quick example:\n\n\`\`\`python\ndef hello_world():\n    print("Hello, World!")\n\nhello_world()\n\`\`\`\n\nThis is a basic Python function that prints "Hello, World!" to the console.`,
      javascript: `# JavaScript Solution\n\nHere's a modern JavaScript example:\n\n\`\`\`javascript\nconst fetchData = async (url) => {\n  const response = await fetch(url);\n  const data = await response.json();\n  return data;\n};\n\n// Usage\nfetchData('https://api.example.com/data')\n  .then(data => console.log(data))\n  .catch(err => console.error(err));\n\`\`\`\n\nThis uses async/await for cleaner asynchronous code.`,
    };
    
    // Choose response based on keywords
    let response = responses.default;
    if (userMessage.toLowerCase().includes('javascript') || userMessage.toLowerCase().includes('js')) {
      response = responses.javascript;
    }
    
    // Render markdown
    const html = marked.parse(response);
    
    // Remove loading indicator
    if (loadingEl) loadingEl.remove();
    
    // Render with typing effect
    textEl.innerHTML = html;
    this.highlightCode(messageEl);
    this.attachCopyButtons(messageEl);
    
    // Try to extract and show code in preview
    this.updatePreview(response);
  }
  
  // End of ChatPage class methods
  
  // Note: escapeHtml is defined at module level

  startSimulation() {
    // Basic syntax highlighting - just add language class
    container.querySelectorAll('pre code').forEach(block => {
      block.classList.add('language-javascript');
    });
  }

  attachCopyButtons(container) {
    container.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.copy-button')) return;
      
      const button = document.createElement('button');
      button.className = 'copy-button btn btn-sm btn-ghost';
      button.textContent = 'Copy';
      button.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy', 2000);
      });
      
      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-header';
      wrapper.appendChild(button);
      
      pre.insertBefore(wrapper, pre.firstChild);
    });
  }

  initPreview() {
    const previewFrame = document.getElementById('preview-frame');
    if (!previewFrame) return;
    
    // Set initial preview content
    this.setPreviewContent('');
  }

  setPreviewContent(html) {
    const frame = document.getElementById('preview-frame');
    if (!frame) return;
    
    const doc = frame.contentDocument || frame.contentWindow.document;
    doc.open();
    doc.write(html || '<!DOCTYPE html><html><head></head><body style="background:#0B1020;color:#EAEAEA;font-family:system-ui;display:flex;align-items:center;justify-content:center;height:100vh;"><p>Preview will appear here</p></body></html>');
    doc.close();
  }

  updatePreview(markdown) {
    // Extract HTML from markdown and update preview
    const htmlMatch = markdown.match(/```html\n([\s\S]*?)```/);
    if (htmlMatch) {
      this.setPreviewContent(htmlMatch[1]);
    }
  }

  initTerminal() {
    const terminalContainer = document.getElementById('terminal-container');
    if (!terminalContainer) return;
    
    // Create simple terminal output
    terminalContainer.innerHTML = `
      <div class="terminal-output">
        <span class="terminal-prompt">$</span>
        <span class="terminal-command">cloudai --version</span>
      </div>
      <div class="terminal-output terminal-response">
        <span class="terminal-result">Cloud AI v1.0.0</span>
      </div>
    `;
  }

  injectStyles() {
    const styleId = 'chat-page-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .page-chat {
        height: calc(100vh - var(--header-height) - var(--space-lg) * 2);
        display: flex;
        flex-direction: column;
      }

      .chat-layout {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: var(--space-md);
        flex: 1;
        min-height: 0;
      }

      .chat-main {
        display: flex;
        flex-direction: column;
        grid-column: 1 / 3;
        background: var(--panel-bg);
        backdrop-filter: blur(12px);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        overflow: hidden;
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: var(--space-lg);
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
      }

      .welcome-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex: 1;
        min-height: 300px;
      }

      .welcome-icon {
        font-size: 64px;
        margin-bottom: var(--space-md);
      }

      .chat-message {
        display: flex;
        gap: var(--space-sm);
        max-width: 85%;
        animation: fadeInUp var(--transition-normal) forwards;
      }

      .chat-message-user {
        align-self: flex-end;
        flex-direction: row-reverse;
      }

      .chat-message-ai {
        align-self: flex-start;
      }

      .message-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--panel-elevated);
        flex-shrink: 0;
      }

      .message-content {
        padding: var(--space-md);
        border-radius: var(--radius-lg);
        background: var(--panel-elevated);
        word-break: break-word;
      }

      .chat-message-user .message-content {
        background: rgba(91, 140, 255, 0.2);
      }

      .loading-indicator {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-sm) 0;
      }

      .loading-text {
        font-size: var(--text-sm);
        color: var(--text-muted);
      }

      .message-text h1,
      .message-text h2,
      .message-text h3 {
        margin-top: var(--space-md);
        margin-bottom: var(--space-sm);
      }

      .message-text p {
        margin-bottom: var(--space-sm);
      }

      .message-text pre {
        background: rgba(10, 12, 20, 0.9);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-md);
        padding: var(--space-md);
        margin: var(--space-sm) 0;
        overflow-x: auto;
        position: relative;
      }

      .message-text code {
        font-family: var(--font-code);
        font-size: 13px;
      }

      .message-text p code {
        background: rgba(91, 140, 255, 0.15);
        padding: 2px 6px;
        border-radius: var(--radius-sm);
      }

      .code-block-header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: var(--space-xs);
      }

      .copy-button {
        opacity: 0;
        transition: opacity var(--transition-fast);
      }

      .message-text pre:hover .copy-button {
        opacity: 1;
      }

      .chat-input-area {
        padding: var(--space-md);
        border-top: 1px solid var(--border-subtle);
        background: var(--panel-glass);
      }

      .chat-input-wrapper {
        display: flex;
        gap: var(--space-sm);
        align-items: flex-end;
      }

      .chat-input {
        flex: 1;
        padding: var(--space-sm) var(--space-md);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        color: var(--text-primary);
        background: var(--bg-primary);
        border: 1px solid var(--border-default);
        border-radius: var(--radius-lg);
        resize: none;
        max-height: 200px;
      }

      .chat-input:focus {
        outline: none;
        border-color: var(--accent-primary);
      }

      .send-button {
        padding: var(--space-sm) var(--space-md);
      }

      .send-icon {
        font-size: 16px;
      }

      .input-options {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        margin-top: var(--space-sm);
      }

      .provider-select {
        width: auto;
        padding-right: var(--space-lg);
      }

      .streaming-toggle {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        cursor: pointer;
      }

      .streaming-toggle input {
        display: none;
      }

      .toggle-switch {
        width: 36px;
        height: 20px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-full);
        position: relative;
        transition: background var(--transition-fast);
      }

      .toggle-switch::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        background: var(--text-secondary);
        border-radius: 50%;
        top: 2px;
        left: 2px;
        transition: all var(--transition-fast);
      }

      .streaming-toggle input:checked + .toggle-switch {
        background: var(--accent-primary);
      }

      .streaming-toggle input:checked + .toggle-switch::after {
        left: 18px;
        background: white;
      }

      .toggle-label {
        font-size: var(--text-sm);
        color: var(--text-secondary);
      }

      .preview-panel,
      .terminal-panel {
        display: flex;
        flex-direction: column;
        min-height: 0;
      }

      .preview-frame-wrapper {
        flex: 1;
        min-height: 200px;
        border-radius: var(--radius-md);
        overflow: hidden;
        background: var(--bg-primary);
      }

      .preview-frame {
        width: 100%;
        height: 100%;
        border: none;
        background: var(--bg-primary);
      }

      .terminal-container {
        flex: 1;
        overflow-y: auto;
        font-family: var(--font-code);
        font-size: var(--text-sm);
        color: var(--neon-cyan);
        padding: var(--space-sm);
      }

      .terminal-output {
        display: flex;
        gap: var(--space-sm);
        margin-bottom: var(--space-xs);
      }

      .terminal-prompt {
        color: var(--neon-green);
      }

      .terminal-command {
        color: var(--text-primary);
      }

      .terminal-response {
        color: var(--text-secondary);
        padding-left: var(--space-md);
      }

      @media (max-width: 1200px) {
        .chat-layout {
          grid-template-columns: 1fr 1fr;
        }

        .preview-panel {
          display: none;
        }
      }

      @media (max-width: 768px) {
        .chat-layout {
          grid-template-columns: 1fr;
        }

        .terminal-panel {
          display: none;
        }

        .chat-main {
          grid-column: 1;
        }
      }
    `;
    
    document.head.appendChild(style);
  }
}