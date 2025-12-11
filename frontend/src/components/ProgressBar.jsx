import React from "react";
import useTrainStore from "../store/useTrainStore";


const ProgressBar = () => {
  

  const { progress, currentEpoch, totalEpochs, isTraining, metrics } =
    useTrainStore();

  if (!isTraining && progress === 0) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-[#fffff0] rounded-lg shadow border w-[800px]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">
          {isTraining
            ? `Training Epoch ${currentEpoch}/${totalEpochs}`
            : "Training Completed"}
        </h3>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-sm text-gray-500 mb-3">
        {isTraining ? "Training in progress..." : "All epochs completed"}
      </div>

      {metrics.accuracy > 0 && (
        <div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="font-medium text-black">Training Acc</div>
              <div className="text-black">
                {(metrics.accuracy * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="font-medium text-black">Val Acc</div>
              <div className="text-black">
                {(metrics.val_accuracy * 100).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm mt-2">
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="font-medium text-black">Training Loss</div>
              <div className="text-black">
                {(metrics.loss * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="font-medium text-black">Val Loss</div>
              <div className="text-black">
                {(metrics.val_loss * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
