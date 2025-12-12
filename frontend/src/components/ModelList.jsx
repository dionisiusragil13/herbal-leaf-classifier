import React, { useState, useEffect } from "react";
import useTestStore from "../store/useTestStore";

function ModelList() {
  const { getModels, setCurrentModel } = useTestStore();
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      const data = await getModels();
      console.log("Data dari loadModel:", data);
      setModels(data);
    };
    fetchModels();
  }, []);

  return (
    <div className="w-80 mt-20">
      <label className="block text-sm font-medium text-white mb-2">
        Select Model
      </label>

      <div className="relative">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        >
          {selectedModel || "Choose a model"}
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {models && models.length > 0 ? (
              models.map((model, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const modelNameWithoutExt = model.filename.replace(
                      ".h5",
                      ""
                    );

                    setSelectedModel(model.filename);
                    setCurrentModel(modelNameWithoutExt);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b last:border-b-0"
                >
                  <div className=" text-black">{model.filename}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {model.size_mb} MB
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-center">
                No models available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModelList;
