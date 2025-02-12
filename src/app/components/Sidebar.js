
import {
  Bars3Icon,
  PlusIcon,
  CodeBracketIcon,
  ClockIcon, // History Icon
  Cog6ToothIcon, // Settings Icon
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

const Sidebar = ({ isOpen, setIsOpen, handleNewChat }) => {
  const handleCodeClick = () => {
    alert("Code functionality coming soon!");
  };

  const handleHelpClick = () => {
    alert("Redirecting to Help & Support...");
  };

  const handleHistoryClick = () => {
    alert("Opening chat history...");
  };

  const handleSettingsClick = () => {
    alert("Opening settings...");
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-[#202123] text-white flex flex-col p-4 shadow-lg transition-all duration-300 border-r border-gray-700 ${isOpen ? "w-72" : "w-16"}`}>
      {/* Sidebar Toggle Button (No Tooltip) */}
      <div className="flex justify-center mb-6">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <Bars3Icon className={`w-8 h-8 text-blue-500 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="flex flex-col space-y-6">
        {/* New Chat */}
        <div className="relative group">
          <button className="flex items-center space-x-3 text-gray-300 hover:text-white transition" onClick={handleNewChat}>
            <PlusIcon className="w-6 h-6" />
            {isOpen && <span>New Chat</span>}
          </button>
          {!isOpen && (
            <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition shadow-lg">
              New Chat
            </span>
          )}
        </div>

        {/* Code Button */}
        <div className="relative group">
          <button className="flex items-center space-x-3 text-gray-300 hover:text-white transition" onClick={handleCodeClick}>
            <CodeBracketIcon className="w-6 h-6" />
            {isOpen && <span>Code</span>}
          </button>
          {!isOpen && (
            <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition shadow-lg">
              Code
            </span>
          )}
        </div>

        {/* History Button */}
        <div className="relative group">
          <button className="flex items-center space-x-3 text-gray-300 hover:text-white transition" onClick={handleHistoryClick}>
            <ClockIcon className="w-6 h-6" />
            {isOpen && <span>History</span>}
          </button>
          {!isOpen && (
            <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition shadow-lg">
              History
            </span>
          )}
        </div>

        {/* Settings Button */}
        <div className="relative group">
          <button className="flex items-center space-x-3 text-gray-300 hover:text-white transition" onClick={handleSettingsClick}>
            <Cog6ToothIcon className="w-6 h-6" />
            {isOpen && <span>Settings</span>}
          </button>
          {!isOpen && (
            <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition shadow-lg">
              Settings
            </span>
          )}
        </div>

        {/* Help Button */}
        <div className="relative group">
          <button className="flex items-center space-x-3 text-gray-300 hover:text-white transition" onClick={handleHelpClick}>
            <QuestionMarkCircleIcon className="w-6 h-6" />
            {isOpen && <span>Help</span>}
          </button>
          {!isOpen && (
            <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition shadow-lg">
              Help
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
