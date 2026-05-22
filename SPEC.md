# Cloud AI - Advanced AI Coding Workspace Specification

## 1. Project Overview

**Project Name:** Cloud AI - Futuristic AI Coding Workspace  
**Type:** Full-stack Web Application (Frontend + Backend)  
**Core Functionality:** A modern, futuristic AI-powered coding workspace featuring multi-AI provider support, live code preview, integrated terminal, and collaborative chat interface.  
**Target Users:** Developers seeking AI-assisted coding with real-time preview capabilities

---

## 2. UI/UX Specification

### Layout Structure

**Main Layout:**
- Fixed sidebar (58px width) on left
- Main content area filling remaining space
- Floating menu button (top-left, outside sidebar)
- Full viewport height (100vh)

**Page Sections:**
- Sidebar: Icon-only navigation, fixed position
- Header: Page title + floating elements
- Content: Dynamic based on current page
- Footer: Status bar (optional)

**Responsive Breakpoints:**
- Desktop: >= 1024px (full layout)
- Tablet: 768px - 1023px (collapsible sidebar)
- Mobile: < 768px (bottom navigation)

### Visual Design

**Color Palette:**
- Background Primary: #0B1020 (deep space blue)
- Background Secondary: #0D1225 (slightly lighter)
- Panel Background: rgba(20, 20, 30, 0.6)
- Panel Elevated: rgba(30, 30, 45, 0.8)
- Accent Primary: #5B8CFF (electric blue)
- Accent Secondary: #4366E0 (deeper blue)
- Neon Cyan: #00F5FF (glow effect)
- Neon Pink: #FF00FF (secondary glow)
- Text Primary: #EAEAEA
- Text Secondary: #8892A8
- Text Muted: #4A5568
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444
- Border: rgba(91, 140, 255, 0.2)

**Typography:**
- Font Family Display: 'Orbitron', sans-serif (fallback: 'Inter')
- Font Family Body: 'Inter', sans-serif
- Font Family Code: 'JetBrains Mono', monospace
- Heading 1: 32px, weight 700
- Heading 2: 24px, weight 600
- Heading 3: 18px, weight 600
- Body: 14px, weight 400
- Small: 12px, weight 400
- Code: 13px, weight 400

**Spacing System:**
- Base unit: 4px
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Visual Effects:**
- Border Radius: 8px (cards), 12px (panels), 20px (modals)
- Box Shadow Primary: 0 4px 20px rgba(0, 0, 0, 0.4)
- Box Shadow Glow: 0 0 20px rgba(0, 245, 255, 0.3)
- Backdrop Filter: blur(12px)
- Glass Effect: background rgba + backdrop-filter blur

### Components

**Sidebar:**
- Width: 58px
- Icons: 24px size
- Hover: Scale 1.1 + glow
- Active indicator: Left border neon cyan
- Tooltip on hover

**Floating Menu Button:**
- Size: 40px x 40px
- Position: top-left, 16px margin
- Glass effect background
- Click animation (ripple)
- Z-index: 1000

**Panel:**
- Background: rgba(20, 20, 30, 0.6)
- Border: 1px solid rgba(91, 140, 255, 0.15)
- Border radius: 12px
- Padding: 16px
- Backdrop filter: blur(12px)

**Button:**
- Primary: Gradient accent background
- Secondary: Transparent with border
- Ghost: No background, text only
- Icon button: 36px x 36px
- Hover: Slight lift + glow
- Active: Pressed state
- Disabled: 50% opacity

**Input:**
- Background: rgba(10, 15, 25, 0.8)
- Border: 1px solid rgba(91, 140, 255, 0.2)
- Focus: Border accent + glow
- Height: 40px (single line)
- Padding: 12px 16px

**Chat Message:**
- User: Aligned right, accent background
- AI: Aligned left, panel background
- Avatar: 32px circle
- Timestamp: 12px muted
- Actions: Copy button on hover

**Code Block:**
- Background: rgba(10, 12, 20, 0.9)
- Border: 1px solid rgba(91, 140, 255, 0.2)
- Language badge: Top-right
- Copy button: Top-right corner
- Line numbers: Optional

**Toast Notification:**
- Position: Bottom-right
- Width: 320px
- Auto-dismiss: 4 seconds
- Types: Success, Warning, Error, Info

---

## 3. Functionality Specification

### Pages

#### 3.1 Get Started (Home)
- Welcome message with introduction
- Quick start guide
- Provider setup wizard
- Feature highlights
- Recent activity preview

#### 3.2 Chat
- Message list with history
- Input area with send button
- Provider selector dropdown
- Model selector
- Streaming response toggle
- Thinking process display
- Code block rendering with syntax highlighting
- Copy code functionality
- Auto-scroll to newest message

#### 3.3 User API
- Provider cards (Gemini, OpenAI, Groq, Cloud AI, Custom)
- API key input field
- Save/Test buttons
- Connection status indicator
- Active provider badge
- Model selection dropdown
- Delete key option
- Encrypted local storage

#### 3.4 Recent
- Workspace history list
- Chat sessions
- Generated code snippets
- Project restore functionality
- Search/filter bar
- Export workspace
- Import workspace
- Clear history option

#### 3.5 About
- Application version
- Architecture overview diagram
- Provider status
- System performance
- GPU acceleration info
- Links/resources

### Three.js Background System

**Scene Configuration:**
- Particle count: 500 (low-end friendly)
- Camera: PerspectiveCamera, FOV 75
- Mouse interaction: Parallax effect
- Animation: Continuous rotation/drift

**Elements:**
- Starfield particles (random positions)
- Neural connection lines (nearby particles)
- Pulse effects (subtle glow)
- Color gradient: Cyan to Purple

**Managers:**
- SceneManager: Init, render loop, resize
- ParticleManager: Create/update particles
- AnimationManager: Tween/easing
- CameraManager: Mouse tracking

### Chat Features

**Streaming:**
- WebSocket connection to backend
- Chunk-by-chunk response
- Loading indicator during stream
- Error handling on disconnect

**Markdown Rendering:**
- Headers, bold, italic
- Lists (ordered/unordered)
- Code blocks with language
- Inline code
- Links
- Blockquotes

**Syntax Highlighting:**
- Prism.js integration
- Languages: JavaScript, TypeScript, Python, HTML, CSS, JSON, Bash
- Theme: Custom dark theme

**Code Blocks:**
- Copy button (copies to clipboard)
- Language label
- Line wrapping option
- Expandable for long blocks

### Live Code Preview

**Features:**
- Sandboxed iframe execution
- CSS injection (style tag)
- JS execution (try/catch wrapper)
- Error overlay with message
- Console log capture
- Refresh button
- Full-screen toggle

**Supported:**
- HTML fragments
- CSS styles
- JavaScript (ES6+)
- External resource loading

### Terminal System

**Frontend (xterm.js):**
- Terminal emulator
- ANSI color support
- Copy/paste support
- Scrollback buffer
- Resize handler

**Backend (FastAPI + asyncio):**
- Async subprocess execution
- Streamed output via WebSocket
- Command whitelist
- Timeout handling
- Process kill capability

**Security:**
- Command blacklist (rm -rf, mkfs, etc.)
- Process sandboxing
- Resource limits
- Timeout: 30 seconds

### API Provider System

**Supported Providers:**
- Google Gemini (gemini-pro, gemini-pro-vision)
- OpenAI (gpt-4, gpt-3.5-turbo)
- Groq (llama, mixtral)
- Cloud AI (custom endpoint)
- Custom Provider (user-defined)

**Features:**
- API key input (masked)
- Encryption (Fernet)
- Local storage (localStorage/IndexedDB)
- Test connection
- Switch active provider
- Model selection per provider

### Workspace History

**Storage:**
- IndexedDB for persistence
- Auto-save intervals
- Export as JSON
- Import from JSON

**Data:**
- Chat messages
- Code generated
- Provider settings
- UI preferences

**Permissions:**
- Prompt for storage access
- Deny/Allow options
- Persistence toggle

---

## 4. Technical Architecture

### Frontend Structure

```
src/
├── components/
│   ├── sidebar.js
│   ├── chat-message.js
│   ├── code-block.js
│   ├── chat-input.js
│   ├── api-card.js
│   ├── terminal.js
│   ├── live-preview.js
│   └── common/
│       ├── button.js
│       ├── input.js
│       ├── modal.js
│       └── toast.js
├── pages/
│   ├── get-started.js
│   ├── chat.js
│   ├── user-api.js
│   ├── recent.js
│   └── about.js
├── services/
│   ├── api.js
│   ├── websocket.js
│   ├── storage.js
│   └── encryption.js
├── store/
│   └── state.js
├── styles/
│   ├── main.css
│   ├── variables.css
│   ├── components.css
│   └── animations.css
├── utils/
│   ├── helpers.js
│   └── constants.js
├── assets/
│   └── icons/
└── three/
    ├── scene-manager.js
    ├── particle-manager.js
    ├── animation-manager.js
    └── camera-manager.js
```

### Backend Structure

```
backend/
├── routes/
│   ├── chat.py
│   ├── api.py
│   └── terminal.py
├── services/
│   ├── provider_manager.py
│   ├── ai_providers/
│   │   ├── gemini.py
│   │   ├── openai.py
│   │   └── groq.py
│   └── terminal_service.py
├── core/
│   ├── config.py
│   ├── security.py
│   └── websocket.py
├── models/
│   ├── request.py
│   └── response.py
├── database/
│   └── db.py
└── utils/
    └── helpers.py
```

---

## 5. Acceptance Criteria

### Visual Checkpoints
- [ ] Dark futuristic background (#0B1020)
- [ ] Glass panels with blur effect
- [ ] Neon cyan accents visible
- [ ] Sidebar exactly 58px wide
- [ ] Floating menu button in top-left
- [ ] Smooth animations (300ms ease)
- [ ] Three.js background running smoothly
- [ ] Responsive at all breakpoints

### Functional Checkpoints
- [ ] Navigation between all 5 pages
- [ ] Chat message sending and display
- [ ] Code block with copy button
- [ ] API key input and storage
- [ ] Terminal can execute commands
- [ ] Live preview renders HTML/CSS/JS
- [ ] WebSocket streaming works
- [ ] History persists in IndexedDB

### Performance Targets
- [ ] Initial load < 3 seconds
- [ ] Three.js 60fps on desktop
- [ ] Three.js 30fps on low-end
- [ ] Memory usage < 200MB

---

## 6. Security Requirements

- API keys encrypted with Fernet
- WebSocket connection authenticated
- Terminal commands filtered
- No sensitive data in logs
- CSP headers configured
- XSS prevention in place