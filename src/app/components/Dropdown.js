"use client";

import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Dropdown = ({ onSelect, currentModel}) => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(currentModel || "Loading models...");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://192.168.102.83:11434/api/tags");
        if (!response.ok) throw new Error(`Failed to fetch models: ${response.status}`);

        const data = await response.json();
        console.log("Fetched models:", data);

        if (data.models && Array.isArray(data.models)) {
          const modelNames = data.models.map((model) => model.name);
          setModels(modelNames);
          if (!modelNames.includes(selectedModel)) {
            setSelectedModel(modelNames[0] || "Default Model");
            onSelect(modelNames[0] || "Default Model");
          }
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        console.error("Error fetching models:", err);
        setError("⚠️ Failed to load models.");
      }
    };

    fetchModels();
  }, [onSelect, selectedModel]); // Fetches only once on mount

  useEffect(() => {
    setSelectedModel(currentModel);
  }, [currentModel]);

  const handleSelect = (model) => {
    setSelectedModel(model);
    onSelect(model);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="w-full flex justify-between items-center px-4 py-3 bg-gray-800 rounded-lg text-gray-300 hover:text-white font-semibold text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedModel}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isOpen && models.length > 0 && (
        <div className="absolute w-full mt-2 bg-gray-900 rounded-lg shadow-lg z-10">
          {models.map((model, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white text-base"
              onClick={() => handleSelect(model)}
            >
              {model}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
};

// ✅ Add PropTypes validation
Dropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  currentModel: PropTypes.string.isRequired,
  isSidebarOpen: PropTypes.bool, // Optional prop
  sidebarWidth: PropTypes.number, // Optional prop
};

export default Dropdown;
