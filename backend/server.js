// backend/server.js  (CommonJS version)

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("Warning: GEMINI_API_KEY is not set in .env");
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Simple summary for now – you can improve this text later
const profileSummary =
  "You are Ayush's portfolio assistant. Answer only about Ayush, his background, skills, projects, and this site. If you don't know, say you don't know.";

app.post("/api/chat-gemini", async (req, res) => {
  if (!genAI) {
    return res.json({
      reply:
        "Gemini API key is not configured on the server. Please use Offline mode."
    });
  }

  const { message, history = [] } = req.body;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const historyParts = history.map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                profileSummary +
                "\n\nConversation (if any): " +
                JSON.stringify(history, null, 2) +
                "\n\nUser question: " +
                message +
                "\n\nIf unsure, say you don't know."
            }
          ]
        },
        ...historyParts
      ]
    });

    const text =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response.";

    res.json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      reply:
        "There was an error talking to Gemini (possibly rate-limited). Please use Offline mode."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
