import React, { useState, useEffect, useRef } from 'react';

// --- STYLES ---
// All CSS is included here to make the component self-contained.
const styles = `
:root {
  --container-bg: #2a2a2a;
  --user-msg-bg: #4a90e2;
  --bot-msg-bg: #3c3c3c;
  --text-color: #f0f0f0;
  --input-bg: #333333;
  --border-color: #444444;
  --button-bg: #4a90e2;
  --button-hover-bg: #357abd;
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.gemini-chat-app {
  font-family: var(--font-family);
  background-color: var(--background-color);
  color: var(--text-color);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 16px;
  box-sizing: border-box;
}

.chat-container {
  width: 100%;
  max-width: 800px;
  height: 75vh;
  max-height: 900px;
  background-color: var(--container-bg);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
}

.chat-box {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Custom scrollbar for webkit browsers */
.chat-box::-webkit-scrollbar {
  width: 8px;
}

.chat-box::-webkit-scrollbar-track {
  background: var(--container-bg);
}

.chat-box::-webkit-scrollbar-thumb {
  background-color: #555;
  border-radius: 10px;
  border: 2px solid var(--container-bg);
}

.message {
  max-width: 80%;
  padding: 12px 18px;
  border-radius: 20px;
  line-height: 1.5;
  word-wrap: break-word;
  font-size: 0.95rem;
  white-space: pre-wrap; /* Ensures newlines are respected */
}

.message.user {
  background-color: var(--user-msg-bg);
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 4px;
}

.message.bot {
  background-color: var(--bot-msg-bg);
  color: var(--text-color);
  align-self: flex-start;
  border-bottom-left-radius: 4px;
}

.message.bot pre {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
}

.message.bot code {
    font-family: 'Courier New', Courier, monospace;
}

.input-area {
  display: flex;
  padding: 16px;
  border-top: 1px solid var(--border-color);
  background-color: rgba(0,0,0,0.1);
}

.input-area input {
  flex-grow: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background-color: var(--input-bg);
  color: var(--text-color);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.input-area input:focus {
  border-color: var(--user-msg-bg);
}

.input-area button {
  margin-left: 12px;
  padding: 0 24px;
  border: none;
  border-radius: 24px;
  background-color: var(--button-bg);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.input-area button:hover:not(:disabled) {
  background-color: var(--button-hover-bg);
}

.input-area button:disabled {
  background-color: #555;
  cursor: not-allowed;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.loading .dot {
  width: 8px;
  height: 8px;
  background-color: #888;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading .dot:nth-child(1) { animation-delay: -0.32s; }
.loading .dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}
`;

const FormattedBotMessage = ({ message }) => {
  const parts = message.split(/(```[\s\S]*?```|\*\*.*?\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          return <pre key={index}>{part.slice(3, -3).trim()}</pre>;
        } else if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </>
  );
};


function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    
    // Create the new messages array *before* setting state.
    // This ensures we send the most up-to-date history.
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    setInput('');
    setIsLoading(true);

    try {
      // API call to your Node.js server
      const response = await fetch('https://e-learning-backened.onrender.com/api/v1/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the entire 'newMessages' array as 'history'
        body: JSON.stringify({ history: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage = { text: data.message, sender: 'bot' };
      
      // Update state with the bot's response
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { text: 'Sorry, something went wrong. Please try again.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className="gemini-chat-app">
      <style>{styles}</style>
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.sender === 'bot' ? (
                <FormattedBotMessage message={msg.text} />
              ) : (
                msg.text
              )}
            </div>
          ))}
          {isLoading && (
            <div className="message bot loading">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading || input.trim() === ''}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

