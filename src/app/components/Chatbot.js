import { useState } from "react";

const Chatbot = ({ modelVersion }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    setInput("");

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, modelVersion }),
      });

      const data = await response.json();
      setMessages([...messages, userMessage, { role: "bot", content: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-full max-w-lg mt-6 p-4 bg-gray-800 rounded-lg">
      <div className="h-64 overflow-y-auto border-b border-gray-600 mb-4 p-2">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === "user" ? "text-blue-400" : "text-green-400"}`}>
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-700 text-white rounded-l-lg focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="px-4 py-2 bg-blue-600 rounded-r-lg" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
