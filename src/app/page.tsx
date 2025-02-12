"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import Dropdown from "./components/Dropdown";
import SignIn from "./components/SignIn";
import "./globals.css";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState("ChatGPT");
  const [chatKey, setChatKey] = useState(0);
  // const [sidebarWidth] = useState(50); // Added sidebarWidth state

  const handleNewChat = () => {
    setChatKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        handleNewChat={handleNewChat}
        // Pass sidebarWidth to Sidebar
      />

      {/* Main Chat Area */}
      <div
        className={`flex flex-col h-full transition-all duration-500 ${isSidebarOpen ? "ml-[250px]" : "ml-[80px]"} w-full`}
      >
        {/* Dropdown beside Sidebar */}
        <div className="absolute top-3 transition-all duration-500" style={{ left: isSidebarOpen ? "310px" : "90px" }}>
        <Dropdown 
  onSelect={setSelectedVersion} 
  currentModel={selectedVersion} // Add this line
  
   
/>

        </div>

        {/* Sign In Button (Top Right) */}
        <div className="absolute top-4 right-10">
          <SignIn />
        </div>

        {/* Chat Window (Adjusts but keeps margins) */}
        <div className="flex-grow flex justify-center items-center transition-all duration-500">
          <div
            className={`w-full max-w-[1200px] px-4 transition-all duration-500 ${isSidebarOpen ? "ml-[20px]" : "ml-0"}`}
          >
           <ChatWindow key={chatKey} modelVersion={selectedVersion} />


          </div>
        </div>
      </div>
    </div>
  );
}
