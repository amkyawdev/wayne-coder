# ☁️ Cloud AI - Futuristic AI Coding Workspace

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/python-3.11+-yellow" alt="Python">
  <img src="https://img.shields.io/badge/javascript-ES2022-orange" alt="JavaScript">
</p>

> A modern, futuristic AI coding workspace inspired by Cloud AI, Cursor AI, and modern developer IDE systems.

## ✨ Features

- 🤖 **Multi AI Providers** - Support for OpenAI, Gemini, Groq, Claude, and custom providers
- 📡 **Real-time Streaming** - Live AI responses with WebSocket streaming
- 💻 **Live Code Preview** - Instant HTML/CSS/JS execution in sandboxed iframe
- 🖥 **Integrated Terminal** - Full-featured terminal with xterm.js
- 🎨 **Futuristic UI** - Glassmorphism, neon glows, and smooth animations
- 🔐 **Secure Storage** - Encrypted API keys and local IndexedDB history
- 🌌 **Three.js Background** - Animated particle system with neural connections
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠 Tech Stack

### Frontend
- HTML5 / CSS3 / JavaScript (ES2022)
- Three.js (3D visualization)
- Prism.js (syntax highlighting)
- marked (markdown rendering)
- xterm.js (terminal emulation)
- WebSocket API

### Backend
- Python 3.11+
- FastAPI
- Uvicorn
- WebSockets

### DevOps
- Docker
- Docker Compose

## 🚀 Quick Start

### Using Static Files (Recommended for Development)

Simply open `index.html` in a modern browser:

```bash
# Using Python's built-in server
cd /workspace/project/wayne-coder
python3 -m http.server 8080
# Then open http://localhost:8080
```

### Using Docker Compose

```bash
# Build and run both services
docker-compose up --build

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
```

### Running Backend Separately

```bash
# Install dependencies
cd /workspace/project/wayne-coder
pip install -r backend/requirements.txt

# Run the backend
python backend/main.py
# Or: uvicorn backend.main:app --reload
```

## 📱 Pages

| Page | Description |
|------|-------------|
| **Get Started** | Welcome page with quick start guide |
| **Chat** | Main AI chat interface with streaming responses |
| **User API** | Manage API keys for AI providers |
| **Recent** | Workspace history and chat sessions |
| **About** | Application information and architecture |

## 🔑 API Providers

Configure your API keys in the **User API** page:

1. **OpenAI** - GPT-4, GPT-3.5 Turbo
2. **Google Gemini** - Gemini Pro, Gemini Pro Vision
3. **Groq** - LLaMA, Mixtral
4. **Claude** - Claude 3 Opus, Claude 3 Sonnet
5. **Custom** - Add your own provider

## 📂 Project Structure

```
cloud-ai/
├── index.html                 # Main HTML entry point
├── SPEC.md                   # Project specification
├── docker-compose.yml        # Docker orchestration
├── Dockerfile.frontend        # Frontend container
├── Dockerfile.backend        # Backend container
│
├── src/                      # Frontend source
│   ├── app.js               # Main app entry
│   ├── components/         # UI components
│   ├── pages/              # Page views
│   ├── services/           # Services
│   ├── store/              # State management
│   ├── styles/            # CSS files
│   ├── three/             # Three.js system
│   └── utils/
│
└── backend/                # Backend source
    ├── main.py            # FastAPI app
    ├── requirements.txt   # Python deps
    ├── routes/           # API routes
    ├── services/        # Business logic
    ├── core/            # Core utilities
    └── models/          # Data models
```

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0B1020` | Main background |
| Panel | `rgba(20,20,30,0.6)` | Glass panels |
| Accent | `#5B8CFF` | Primary accent |
| Neon | `#00F5FF` | Glow effects |
| Text | `#EAEAEA` | Primary text |

### Typography

- **Display**: Orbitron
- **Body**: Inter
- **Code**: JetBrains Mono

## 🔐 Security

- API keys are stored encrypted using cryptography
- WebSocket connections use JWT authentication
- Terminal commands are sandboxed and filtered
- CSP headers configured for XSS prevention

## 📦 Deployment

### Production Build

```bash
# Run frontend statically
python3 -m http.server 8080

# Run with Docker
docker-compose -f docker-compose.yml up -d
```

---

<p align="center">Built with ❤️ using OpenHands</p>
