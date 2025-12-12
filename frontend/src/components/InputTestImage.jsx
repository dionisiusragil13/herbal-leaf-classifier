import React, { useRef, useState } from 'react';
import useTestStore from '../store/useTestStore';

function InputTestImage() {
  const {
    imageFile,
    predictionResult,
    loading,
    error,
    setImageFile,
    predictImage,
    resetTest
  } = useTestStore();
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/jpeg'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image (JPG/PNG/JPEG)');
        return;
      }
      setImageFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const handlePredict = async () => {
    await predictImage();
  };

  const handleReset = () => {
    resetTest();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-4xl mt-10 mb-8 mx-auto p-8 bg-[#fffff0] rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Image Classification Test
      </h2>

      {/* File Input Area */}
      <div className="mb-8">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/jpg,image/png,image/jpeg"
            className="hidden"
          />
          
          {imageFile ? (
            <div className="flex flex-col items-center">
              <img 
                src={URL.createObjectURL(imageFile)} 
                alt="Preview" 
                className="max-h-64 max-w-full rounded-lg mb-4"
              />
              <p className="text-gray-600">{imageFile.name}</p>
              <p className="text-sm text-gray-500 mt-1">
                Click to change or drag & drop new image
              </p>
            </div>
          ) : (
            <div>
              <div className="text-5xl mb-4 text-gray-400">📁</div>
              <p className="text-gray-600 mb-2">Click to upload or drag & drop</p>
              <p className="text-sm text-gray-500">Supported formats: JPG, PNG, JPEG</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={handlePredict}
          disabled={!imageFile || loading}
          className={`px-6 py-3 rounded-lg font-medium ${
            !imageFile || loading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Predict Image'}
        </button>
        
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium"
        >
          Reset
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">Error: {error}</p>
        </div>
      )}

      {/* Prediction Result */}
      {predictionResult && (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Prediction Result</h3>
          
          {predictionResult.success ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Predicted Class</p>
                  <p className="text-xl font-bold text-blue-700">{predictionResult.class}</p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Confidence</p>
                  <p className="text-xl font-bold text-green-700">
                    {predictionResult.confidence?.toFixed(2) || '0.00'}%
                  </p>
                </div>
              </div>
              
              {/* Progress bar for confidence */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Confidence Level</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-green-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(predictionResult.confidence || 0, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-700">{predictionResult.message || 'Prediction failed'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default InputTestImage;