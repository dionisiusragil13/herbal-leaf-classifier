import React from "react";
import useTestStore from "../store/useTestStore";

function LoadModelButton() {
  const { loadModel, loading, currentModel } = useTestStore();
  const handleLoadModel = async () => {
    await loadModel();
  };
  return (
    <div className="w-80 mt-5">
      <button
        onClick={handleLoadModel}
        disabled={loading}
        className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors"
      >
        {loading ? "Loading Model..." : "Load Model"}
      </button>

      {!currentModel && (
        <p className="text-sm text-red-600 mt-2">Please select a model first</p>
      )}

      {currentModel && !loading && (
        <p className="text-sm text-gray-600 mt-2">
          Selected: <span className="font-medium">{currentModel}</span>
        </p>
      )}
    </div>
  );
}

export default LoadModelButton;
