import { useState } from "react";
import { offlineAnswer } from "../../services/offlineChat.js";
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

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const userMessage = { sender: "user", text };
    appendMessage(userMessage);
    setInput("");

    setLoading(true);

    // Simulate a short “thinking” delay (optional, just for feel)
    setTimeout(() => {
      const replyText = offlineAnswer(text);
      appendMessage({ sender: "bot", text: replyText });
      setLoading(false);
    }, 200);
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
                <span className="chat-status-dot chat-status-offline"></span>
                <span className="chat-status-text">
                  Offline assistant · no API or internet required
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