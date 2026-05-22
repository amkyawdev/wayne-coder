/**
 * Cloud AI - Simplified App
 * Uses inline functions instead of ES modules to avoid CORS issues
 */

(function() {
  'use strict';
  
  // Current page state
  let currentPage = 'home';
  
  // SVG icons for navigation
  const icons = {
    home: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
    chat: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>',
    api: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>',
    recent: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    about: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
  };

  // Page definitions
  const pages = {
    home: renderHomePage,
    chat: renderChatPage,
    api: renderApiPage,
    recent: renderRecentPage,
    about: renderAboutPage
  };

  // Initialize app
  function init() {
    initSidebar();
    initCanvasBackground();
    navigateTo('home');
  }

  // Initialize sidebar
  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    // Create structure
    sidebar.innerHTML = `
      <div class="sidebar-logo">
        <span class="logo-icon">⚡</span>
      </div>
      <ul class="sidebar-nav">
        ${['home', 'chat', 'api', 'recent', 'about'].map(id => `
          <li class="sidebar-item ${id === currentPage ? 'active' : ''}" data-page="${id}">
            <button class="sidebar-link">${icons[id]}</button>
          </li>
        `).join('')}
      </ul>
      <div class="sidebar-version">v1.0</div>
    `;
    
    // Bind events
    sidebar.querySelectorAll('.sidebar-item').forEach(item => {
      item.addEventListener('click', () => {
        const pageId = item.dataset.page;
        navigateTo(pageId);
      });
    });
  }

  // Initialize Three.js-like canvas background
  function initCanvasBackground() {
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) return;
    
    // Create a simple animated background using canvas
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;';
    canvasContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 100;
    
    // Create particles
    for(let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: ['#00F5FF', '#5B8CFF', '#8B5CF6'][Math.floor(Math.random() * 3)]
      });
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
    
    // Animation loop
    function animate() {
      ctx.fillStyle = 'rgba(11, 16, 32, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around edges
        if(p.x < 0) p.x = canvas.width;
        if(p.x > canvas.width) p.x = 0;
        if(p.y < 0) p.y = canvas.height;
        if(p.y > canvas.height) p.y = 0;
        
        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        
        // Connections
        particles.forEach(p2 => {
          if(p2 === p) return;
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if(dist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 80) * 0.15;
            ctx.stroke();
          }
        });
      });
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Navigate to page
  function navigateTo(pageId) {
    currentPage = pageId;
    
    // Update sidebar active state
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
      item.classList.toggle('active', item.dataset.page === pageId);
    });
    
    // Render page content
    const pageContainer = document.getElementById('page-container');
    if (pageContainer && pages[pageId]) {
      pageContainer.innerHTML = '';
      pageContainer.appendChild(pages[pageId]());
    }
  }

  // Page renderers
  function renderHomePage() {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="home-page" style="max-width:1200px;margin:0 auto;">
        <div class="hero-section" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;min-height:60vh;">
          <div class="hero-content">
            <span class="hero-badge" style="display:inline-block;padding:4px 12px;background:rgba(0,245,255,0.15);color:#00F5FF;border-radius:9999px;font-size:12px;margin-bottom:16px;">✨ AI-Powered Development</span>
            <h1 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);margin-bottom:16px;">
              Welcome to <span style="color:#00F5FF;">Cloud AI</span>
            </h1>
            <p style="color:#8892A8;font-size:18px;margin-bottom:24px;max-width:500px;">
              Your futuristic AI coding assistant with multi-provider support, 
              live code preview, and integrated terminal.
            </p>
            <div style="display:flex;gap:16px;flex-wrap:wrap;">
              <button onclick="navigateTo('chat')" style="padding:12px 24px;background:linear-gradient(135deg,#5B8CFF,#4366E0);color:white;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;">🚀 Start Coding</button>
              <button onclick="navigateTo('api')" style="padding:12px 24px;background:transparent;color:#EAEAEA;border:1px solid rgba(91,140,255,0.2);border-radius:8px;font-size:14px;cursor:pointer;">🔑 Configure API</button>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:400px;">
            ${[
              { icon: '🤖', title: 'Multi AI', desc: 'Gemini, OpenAI, Groq' },
              { icon: '💻', title: 'Live Preview', desc: 'Real-time code' },
              { icon: '🖥', title: 'Terminal', desc: 'Command line' },
              { icon: '📡', title: 'Streaming', desc: 'Real-time AI' }
            ].map(f => `
              <div style="background:rgba(20,20,30,0.8);backdrop-filter:blur(12px);border:1px solid rgba(91,140,255,0.1);border-radius:12px;padding:24px;text-align:center;">
                <span style="font-size:32px;display:block;margin-bottom:8px;">${f.icon}</span>
                <h3 style="font-size:16px;margin-bottom:4px;">${f.title}</h3>
                <p style="color:#8892A8;font-size:12px;">${f.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    return container;
  }

  function renderChatPage() {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="chat-page" style="height:calc(100vh - 120px);display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
        <div class="chat-main" style="display:flex;flex-direction:column;background:rgba(20,20,30,0.6);backdrop-filter:blur(12px);border:1px solid rgba(91,140,255,0.1);border-radius:12px;grid-column:1/3;overflow:hidden;">
          <div class="chat-messages" id="chat-messages" style="flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:16px;">
            <div class="welcome-message" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;flex:1;min-height:300px;">
              <span style="font-size:64px;">🤖</span>
              <h2>Welcome to Cloud AI Chat</h2>
              <p style="color:#8892A8;">Start a conversation with your AI coding assistant</p>
            </div>
          </div>
          <div class="chat-input-area" style="padding:16px;border-top:1px solid rgba(91,140,255,0.1);background:rgba(20,20,30,0.85);">
            <div style="display:flex;gap:8px;align-items:flex-end;">
              <textarea id="chat-input" placeholder="Describe what you want to build..." rows="1" style="flex:1;padding:8px 16px;font-size:14px;color:#EAEAEA;background:#0B1020;border:1px solid rgba(91,140,255,0.2);border-radius:12px;resize:none;font-family:var(--font-body);"></textarea>
              <button id="send-button" style="padding:8px 16px;background:linear-gradient(135deg,#5B8CFF,#4366E0);color:white;border:none;border-radius:8px;cursor:pointer;">➤</button>
            </div>
            <div style="display:flex;align-items:center;gap:16px;margin-top:8px;">
              <select id="provider-select" style="padding:4px 8px;background:rgba(10,15,25,0.8);color:#EAEAEA;border:1px solid rgba(91,140,255,0.2);border-radius:8px;">
                <option>OpenAI</option>
                <option>Gemini</option>
                <option>Groq</option>
              </select>
            </div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;background:rgba(20,20,30,0.6);backdrop-filter:blur(12px);border:1px solid rgba(91,140,255,0.1);border-radius:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid rgba(91,140,255,0.1);">
            <h3 style="font-size:16px;">Live Preview</h3>
          </div>
          <div style="flex:1;min-height:200px;background:#0B1020;border-radius:8px;margin:16px;overflow:hidden;">
            <iframe id="preview-frame" style="width:100%;height:100%;border:none;" sandbox="allow-scripts"></iframe>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;background:rgba(20,20,30,0.6);backdrop-filter:blur(12px);border:1px solid rgba(91,140,255,0.1);border-radius:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid rgba(91,140,255,0.1);">
            <h3 style="font-size:16px;">Terminal</h3>
          </div>
          <div id="terminal-container" style="flex:1;padding:16px;font-family:var(--font-code);font-size:14px;color:#00F5FF;">
            <div style="margin-bottom:4px;"><span style="color:#10B981;">$</span> cloudai --version</div>
            <div style="color:#8892A8;padding-left:16px;">Cloud AI v1.0.0</div>
          </div>
        </div>
      </div>
    `;
    
    // Bind chat events
    setTimeout(() => {
      const input = document.getElementById('chat-input');
      const sendBtn = document.getElementById('send-button');
      
      if (input && sendBtn) {
        input.addEventListener('input', () => {
          input.style.height = 'auto';
          input.style.height = Math.min(input.scrollHeight, 200) + 'px';
        });
        
        const sendMessage = () => {
          const msg = input.value.trim();
          if(msg) {
            addChatMessage('user', msg);
            addChatMessage('ai', getAIResponse(msg));
            input.value = '';
            input.style.height = 'auto';
          }
        };
        
        sendBtn.addEventListener('click', sendMessage);
        input.addEventListener('keydown', (e) => {
          if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        });
      }
    }, 100);
    
    return container;
  }

  function addChatMessage(role, content) {
    const container = document.getElementById('chat-messages');
    if(!container) return;
    
    const welcome = container.querySelector('.welcome-message');
    if(welcome) welcome.remove();
    
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message chat-message-' + role;
    msgEl.style.cssText = 'display:flex;gap:8px;max-width:85%;animation:fadeInUp 0.25s forwards;';
    
    const avatar = role === 'ai' ? '🤖' : '👤';
    msgEl.innerHTML = `
      <div style="width:36px;height:36px;border-radius:50%;background:rgba(30,30,45,0.8);display:flex;align-items:center;justify-content:center;">${avatar}</div>
      <div style="padding:16px;border-radius:12px;background:${role === 'user' ? 'rgba(91,140,255,0.2)' : 'rgba(30,30,45,0.8)'};word-break:break-word;">${escapeHtml(content)}</div>
    `;
    
    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;
  }

  function getAIResponse(msg) {
    const responses = {
      default: '# AI Response\n\nI\'d be happy to help! Here\'s an example:\n\n```python\ndef hello():\n    print("Hello, World!")\n```',
      js: '# JavaScript Solution\n\nHere\'s a modern JS example:\n\n```javascript\nconst greet = () => console.log("Hi!");\ngreet();\n```'
    };
    
    if(msg.toLowerCase().includes('javascript') || msg.toLowerCase().includes('js')) {
      return responses.js;
    }
    return responses.default;
  }

  function escapeHtml(text) {
    const map = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'};
    return text.replace(/[&<>"']/g,m => map[m]);
  }

  function renderApiPage() {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="api-page" style="max-width:900px;margin:0 auto;">
        <div style="margin-bottom:32px;">
          <h1>API Configuration</h1>
          <p style="color:#8892A8;">Manage your AI provider API keys</p>
        </div>
        <div style="display:grid;gap:16px;">
          ${['OpenAI 🤖', 'Google Gemini 🔮', 'Groq ⚡', 'Claude 🧠', 'Custom Provider ⚙️'].map((p, i) => `
            <div style="background:rgba(20,20,30,0.6);backdrop-filter:blur(12px);border:1px solid rgba(91,140,255,0.1);border-radius:12px;padding:24px;">
              <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
                <span style="font-size:32px;">${p.split(' ')[1]}</span>
                <div style="flex:1;">
                  <h3 style="font-size:18px;">${p.split(' ')[0]}</h3>
                  <span style="display:inline-block;padding:4px 8px;font-size:12px;border-radius:9999px;background:rgba(245,158,11,0.15);color:#F59E0B;">Not Configured</span>
                </div>
              </div>
              <div style="display:flex;gap:16px;">
                <input type="password" placeholder="Enter API key" style="flex:1;padding:8px 16px;font-size:14px;color:#EAEAEA;background:rgba(10,15,25,0.8);border:1px solid rgba(91,140,255,0.2);border-radius:8px;">
                <button style="padding:8px 16px;background:#5B8CFF;color:white;border:none;border-radius:8px;cursor:pointer;">Test</button>
                <button style="padding:8px 16px;background:transparent;color:#EAEAEA;border:1px solid rgba(91,140,255,0.2);border-radius:8px;cursor:pointer;">Save</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div style="margin-top:32px;padding:24px;background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:12px;">
          <h3>🔒 Security Information</h3>
          <p style="color:#8892A8;font-size:14px;margin-top:8px;">Your API keys are encrypted and stored locally in your browser.</p>
        </div>
      </div>
    `;
    return container;
  }

  function renderRecentPage() {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="recent-page" style="max-width:800px;margin:0 auto;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
          <div>
            <h1>Recent Activity</h1>
            <p style="color:#8892A8;">Your workspace history</p>
          </div>
          <div style="display:flex;gap:8px;">
            <button style="padding:8px 16px;background:transparent;color:#EAEAEA;border:1px solid rgba(91,140,255,0.2);border-radius:8px;cursor:pointer;">Export</button>
            <button style="padding:8px 16px;background:transparent;color:#8892A8;border:none;cursor:pointer;">Clear All</button>
          </div>
        </div>
        <input type="text" placeholder="Search history..." style="width:100%;padding:8px 16px;font-size:14px;color:#EAEAEA;background:rgba(10,15,25,0.8);border:1px solid rgba(91,140,255,0.2);border-radius:8px;margin-bottom:32px;">
        <div style="text-align:center;padding:48px;">
          <span style="font-size:32px;">💬</span>
          <h3 style="margin:16px 0 8px;">No chat sessions yet</h3>
          <p style="color:#8892A8;">Start chatting to see your history here</p>
        </div>
      </div>
    `;
    return container;
  }

  function renderAboutPage() {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="about-page" style="max-width:900px;margin:0 auto;text-align:center;padding:48px 0;">
        <div style="margin-bottom:48px;">
          <span style="font-size:72px;display:block;margin-bottom:16px;">⚡</span>
          <h1 style="font-size:32px;margin-bottom:8px;">Cloud AI</h1>
          <p style="color:#00F5FF;font-family:var(--font-code);">Version 1.0.0</p>
          <p style="color:#8892A8;font-size:18px;margin-top:16px;">Futuristic AI Coding Workspace</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:48px;">
          ${['💬 0 Messages', '💻 0 Code', '⏱ 0ms Avg', '🔑 0 Providers'].map(s => `
            <div style="background:rgba(20,20,30,0.6);backdrop-filter:blur(12px);border:1px solid rgba(91,140,255,0.1);border-radius:12px;padding:24px;">
              <span style="font-size:24px;display:block;margin-bottom:8px;">${s.split(' ')[0]}</span>
              <span style="font-family:var(--font-display);font-size:24px;font-weight:700;color:#00F5FF;">${s.split(' ')[1]}</span>
              <p style="color:#8892A8;font-size:12px;margin-top:4px;">${s.split(' ').slice(2).join(' ')}</p>
            </div>
          `).join('')}
        </div>
        <div style="text-align:left;margin-bottom:48px;">
          <h2 style="margin-bottom:24px;">Features</h2>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
            ${[
              {icon:'🤖',title:'Multi AI Providers',desc:'OpenAI, Gemini, Groq'},
              {icon:'📡',title:'Real-time Streaming',desc:'Live AI responses'},
              {icon:'💻',title:'Live Code Preview',desc:'Instant execution'},
              {icon:'🖥',title:'Terminal',desc:'Integrated CLI'},
              {icon:'🎨',title:'Futuristic UI',desc:'Glassmorphism'},
              {icon:'🔐',title:'Secure Storage',desc:'Encrypted keys'}
            ].map(f => `
              <div style="display:flex;gap:16px;padding:16px;background:rgba(20,20,30,0.6);border-radius:12px;">
                <span style="font-size:24px;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:rgba(30,30,45,0.8);border-radius:8px;">${f.icon}</span>
                <div>
                  <h3 style="font-size:16px;margin-bottom:4px;">${f.title}</h3>
                  <p style="color:#8892A8;font-size:12px;">${f.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
          ${['JavaScript','Three.js','Python','FastAPI','WebSocket','Docker'].map(t => `
            <span style="padding:8px 16px;background:rgba(20,20,30,0.6);border:1px solid rgba(91,140,255,0.1);border-radius:9999px;font-size:14px;color:#8892A8;">${t}</span>
          `).join('')}
        </div>
      </div>
    `;
    return container;
  }

  // Make navigateTo globally accessible
  window.navigateTo = navigateTo;
  
  // Initialize on DOM ready
  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();