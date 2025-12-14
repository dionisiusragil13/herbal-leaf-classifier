import React from "react";
import useTrainStore from "../store/useTrainStore";

const ProgressBar = () => {
  const { progress, currentEpoch, totalEpochs, isTraining, metrics } =
    useTrainStore();

  // ❗ Jangan tampilkan apa pun kalau belum pernah training
  if (progress === 0 && !isTraining) {
    return null;
  }

  const formatLoss = (value) => {
    if (value === undefined || value === null) return "0.000";
    return Number(value).toFixed(3);
  };

  const isFinished = !isTraining && progress === 100;

  return (
    <div className="mb-6 p-4 bg-[#fffff0] rounded-lg shadow border w-[800px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">
          {isTraining
            ? `Training Epoch ${currentEpoch}/${totalEpochs}`
            : `Training Completed (${currentEpoch}/${totalEpochs})`}
        </h3>

        <span className="text-sm text-gray-500">{progress}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isFinished ? "bg-green-600" : "bg-blue-600"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status Text */}
      <div className="text-sm text-gray-500 mb-3">
        {isTraining
          ? "Training in progress..."
          : `Completed at epoch ${currentEpoch}/${totalEpochs}`}
      </div>

      {/* Metrics */}
      {metrics && typeof metrics.accuracy === "number" && (
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
              <div className="text-black">{formatLoss(metrics.loss)}</div>
            </div>

            <div className="text-center p-2 bg-green-50 rounded">
              <div className="font-medium text-black">Val Loss</div>
              <div className="text-black">{formatLoss(metrics.val_loss)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Finished Badge */}
      {isFinished && (
        <div className="mt-3 text-sm font-semibold text-green-600 text-center">
          ✅ Model siap digunakan
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
