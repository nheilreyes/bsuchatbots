import { useState, useEffect, useRef, useCallback } from "react";
import { FaMicrophone, FaPaperPlane, FaFileUpload } from "react-icons/fa";
import Image from "next/image";

const ChatWindow = ({ modelVersion }) => {
  const [messages, setMessages] = useState([
    { type: "bot", text: `You're using ${modelVersion}. How can I assist you today?` },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const chatEndRef = useRef(null);
  const recognition = useRef(null);
  const textareaRef = useRef(null);

  const handleSendMessage = useCallback(
    async (text) => {
      const messageText = text.trim();
      if (messageText && !isTyping) {
        setMessages((prev) => [...prev, { type: "user", text: messageText }]);
        setInputText("");
        setIsTyping(true);
        try {
          const response = await fetch("http://192.168.102.83:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: modelVersion, prompt: messageText, stream: false }),
          });

          if (!response.ok) throw new Error(`Server responded with ${response.status}`);
          const data = await response.json();
          setMessages((prev) => [...prev, { type: "bot", text: data.response || "No response from AI." }]);
        } catch (error) {
          console.error("Fetch error:", error.message);
          setMessages((prev) => [...prev, { type: "bot", text: "⚠️ Failed to fetch response. Check API connection." }]);
        } finally {
          setIsTyping(false);
        }
      }
    },
    [isTyping, modelVersion]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.current.lang = "en-US";
      recognition.current.interimResults = false;
      recognition.current.maxAlternatives = 1;

      recognition.current.onstart = () => setIsListening(true);
      recognition.current.onend = () => setIsListening(false);
      recognition.current.onerror = (event) => console.error("Speech recognition error:", event.error);

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleSendMessage(transcript);
        }
      };
    }
  }, [handleSendMessage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [inputText]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSendFile = () => {
    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      const fileType = selectedFile.type.startsWith("image") ? "image" : "file";
      setMessages((prev) => [...prev, { type: "user", text: fileType, fileUrl, fileName: selectedFile.name }]);
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center flex items-center gap-2 text-blue-500">
        <span className="text-blue-400">🤖</span> Hi, I&apos;m TRIOE.
      </h1>
      <div className="w-full max-w-[70vw] bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto space-y-4 p-3 pr-4 max-h-[70vh]">
          {messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.type === "bot" ? (
                <p className="text-gray-300 text-left">{message.text}</p>
              ) : (
                <div className="flex justify-end">
                  <div className="bg-gray-700 text-white p-3 rounded-xl max-w-[75%]">
                    {message.text === "image" ? (
                      <Image
                        src={message.fileUrl}
                        alt="Uploaded"
                        width={300}
                        height={300}
                        className="max-w-full rounded-lg"
                      />
                    ) : message.text === "file" ? (
                      <a href={message.fileUrl} download={message.fileName} className="text-blue-400 underline">
                        {message.fileName}
                      </a>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isTyping && <p className="text-gray-400">Typing...</p>}
          <div ref={chatEndRef}></div>
        </div>

        <div className="flex items-center bg-gray-700 rounded-xl p-3 mt-4 space-x-3">
          <label className="p-3 bg-gray-600 rounded-full hover:bg-gray-500 cursor-pointer relative group">
            <FaFileUpload className="text-white" />
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>

          {selectedFile && <button className="p-2 bg-blue-500 rounded-md text-white" onClick={handleSendFile}>Send {selectedFile.name}</button>}

          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Message TRIOE"
            className="flex-1 bg-gray-600 text-white placeholder-gray-400 p-3 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 overflow-auto"
            rows="1"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(inputText); } }}
          />

          <button className={`p-3 rounded-full ${isListening ? "bg-red-600" : "bg-gray-600"}`} onClick={() => recognition.current?.start()}>
            <FaMicrophone className="text-white" />
          </button>

          <button className="p-3 bg-blue-500 rounded-full" onClick={() => !isTyping && handleSendMessage(inputText)} disabled={isTyping}>
            <FaPaperPlane className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
