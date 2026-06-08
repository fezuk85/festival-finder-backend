import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Mock endpoints for testing
app.post("/api/trpc/invites.create", (req, res) => {
  const token = Math.random().toString(36).substring(2, 15);
  res.json({ result: { data: { token, expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } } });
});

app.post("/api/trpc/invites.accept", (req, res) => {
  res.json({ result: { data: { success: true } } });
});

app.post("/api/trpc/locations.share", (req, res) => {
  res.json({ result: { data: { success: true } } });
});

app.post("/api/trpc/friends.list", (req, res) => {
  res.json({ result: { data: [] } });
});

// WebSocket for real-time location updates
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("location:update", (data) => {
    console.log(`Location update from ${socket.id}:`, data);
    socket.broadcast.emit("location:update", { userId: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
