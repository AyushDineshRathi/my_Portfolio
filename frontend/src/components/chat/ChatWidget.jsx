import { useState } from "react";
import { profileData } from "../../data/profileData.js";

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: profileData.chatConfig.introMessage }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const appendMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMessage = { sender: "user", text };
    appendMessage(userMessage);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (data.reply) {
        appendMessage({ sender: "bot", text: data.reply });
      } else {
        appendMessage({ sender: "bot", text: "Something went wrong. Please try again." });
      }
    } catch (error) {
      console.error("Chat Error:", error);
      appendMessage({
        sender: "bot",
        text: "I'm having trouble connecting to the server. Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const { assistantName, sampleQuestions } = profileData.chatConfig;

  return (
    <>
      {!isOpen && (
        <button className="chat-fab" onClick={toggleOpen}>
          Chat
        </button>
      )}

      {isOpen && (
        <div className="chat-container">
          <header className="chat-header">
            <div>
              <div className="chat-title">{assistantName}</div>
              <div className="chat-subtitle">
                Ask about Ayush, his projects, and this site
              </div>
              <div className="chat-status-row">
                <span className="chat-status-dot chat-status-online"></span>
                <span className="chat-status-text">
                  AI Assistant · Hybrid Intelligence
                </span>
              </div>
            </div>
            <div className="chat-controls">
              <button className="chat-close" onClick={toggleOpen}>
                ✕
              </button>
            </div>
          </header>

          <div className="chat-messages">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={
                  m.sender === "user"
                    ? "chat-message chat-message-user"
                    : "chat-message chat-message-bot"
                }
              >
                <div className="chat-bubble">{m.text}</div>
              </div>
            ))}

            {loading && (
              <div className="chat-message chat-message-bot">
                <div className="chat-bubble">
                  <div className="chat-typing">
                    <span className="chat-typing-dot"></span>
                    <span className="chat-typing-dot"></span>
                    <span className="chat-typing-dot"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="chat-suggestions">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setInput(q)}
                className="chat-suggestion-btn"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="chat-input-row">
            <textarea
              rows="1"
              className="chat-input"
              placeholder="Ask something about Ayush..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chat-send-btn" onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget;