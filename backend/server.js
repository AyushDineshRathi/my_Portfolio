// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chatController = require("./controllers/chatController");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.post("/api/chat", chatController.handleChat);

// Health check
app.get("/", (req, res) => {
  res.send("Portfolio Backend is running.");
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
