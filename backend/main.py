"""
Cloud AI Backend - FastAPI Server
Provides WebSocket streaming and API endpoints
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Set
import json
import asyncio

app = FastAPI(title="Cloud AI Backend")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connected WebSocket clients
class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, room_id: str = "chat"):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = set()
        self.active_connections[room_id].add(websocket)

    def disconnect(self, websocket: WebSocket, room_id: str = "chat"):
        if room_id in self.active_connections:
            self.active_connections[room_id].discard(websocket)

    async def broadcast(self, message: str, room_id: str = "chat"):
        if room_id in self.active_connections:
            disconnected = set()
            for connection in self.active_connections[room_id]:
                try:
                    await connection.send_text(message)
                except:
                    disconnected.add(connection)
            # Clean up disconnected clients
            for ws in disconnected:
                self.disconnect(ws, room_id)

manager = ConnectionManager()

@app.get("/")
async def root():
    """Root endpoint"""
    return {"status": "ok", "service": "Cloud AI Backend"}

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy"}

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for chat streaming"""
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            msg_type = message.get("type")
            
            if msg_type == "chat":
                # Echo with processing indication
                await websocket.send_json({
                    "type": "thinking",
                    "content": "Analyzing request..."
                })
                await asyncio.sleep(0.5)
                
                # Send mock response
                response = {
                    "type": "response",
                    "content": f"You said: {message.get('content', '')}. I'm ready to help with your coding tasks!"
                }
                await websocket.send_json(response)
                
            elif msg_type == "ping":
                await websocket.send_json({"type": "pong"})
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        print(f"WebSocket error: {e}")
        manager.disconnect(websocket)

@app.post("/api/chat")
async def chat_endpoint(request: dict):
    """HTTP endpoint for chat (non-streaming)"""
    content = request.get("content", "")
    
    return {
        "type": "response",
        "content": f"You said: {content}. I'm ready to help with your coding tasks!",
        "provider": "demo"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)