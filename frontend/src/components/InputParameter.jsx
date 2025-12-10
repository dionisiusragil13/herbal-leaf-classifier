import React, { useState } from "react";
import { CircleQuestionMark } from "lucide-react";
import useTrainStore from "../store/useTrainStore";

function InputParameter() {
  const [splitData, setsplitData] = useState(50);
  const [optimizer, setOptimizer] = useState("");
  const [learningRate, setLearningRate] = useState("");
  const [epoch, setEpoch] = useState(5);

  const { startTraining, isLoading } = useTrainStore();

  const handleChange = (e) => {
    setsplitData(Number(e.target.value));
  };
  const handleOptimizerChange = (e) => {
    setOptimizer(e.target.value);
  };

  const handleLearningRateChange = (e) => {
    setLearningRate(e.target.value);
  };
  const handleEpochChange = (e) => {
    setEpoch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parameter = {
      'split_data': splitData,
      'optimizer': optimizer,
      'learning_rate': Number(learningRate),
      'epochs': Number(epoch),
    };
    startTraining(parameter);
  };

  return (
    <div className="flex flex-col bg-[#fffff0] w-[800px] h-auto rounded-lg">
      <div className="flex justify-center mt-5">
        <h1 className="text-black text-[20px] font-semibold">
          Pilih Konfigurasi Parameter
        </h1>
      </div>

      {/*Split data */}
      <div className="ml-5 w-full">
        <div className="w-full max-w-2xl mx-auto p-8">
          <div className="mb-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-row items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  Split data
                </h2>
                <CircleQuestionMark color="#000000" className="w-3 h-3" />
              </div>
              <div className="bg-blue-800 text-white px-4 py-1 rounded-full text-sm font-medium">
                {splitData}
              </div>
            </div>

            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={splitData}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${splitData}%, #e5e7eb ${splitData}%, #e5e7eb 100%)`,
                }}
              />

              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Optimizer */}
          <div className="mb-5">
            <div className="flex flex-row items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Optimizer</h2>
              <CircleQuestionMark color="#000000" className="w-3 h-3" />
            </div>

            <select
              className="w-full bg-[#d9d9d9] h-10 rounded-lg text-black pl-3 
               placeholder-black placeholder:font-light
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="rmsprop"
              value={optimizer}
              onChange={handleOptimizerChange}
            >
              <option value="" disabled>
                Pilih optimizer
              </option>
              <option value="adam">Adam</option>
              <option value="rmsprop">RMSprop</option>
              <option value="sgd">SGD</option>
            </select>
          </div>
          {/* Learning rate */}
          <div className="mb-5">
            <div className="flex flex-row items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Optimizer</h2>
              <CircleQuestionMark color="#000000" className="w-3 h-3" />
            </div>

            <select
              className="w-full bg-[#d9d9d9] h-10 rounded-lg text-black pl-3 
               placeholder-black placeholder:font-light
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue=""
              value={learningRate}
              onChange={handleLearningRateChange}
            >
              <option value="" disabled>
                Pilih optimizer
              </option>
              <option value={0.1}>0.1 (low)</option>
              <option value={0.01}>0.01 (medium)</option>
              <option value={0.001}>0.001 (high)</option>
              <option value={0.0001}>0.0001 (very high)</option>
            </select>
          </div>
          {/* epoch */}
          <div className="mb-5">
            <div className="flex flex-row items-center gap-2 mb-2">
              <h2 className="text-xl font-semibold text-gray-800">Epoch</h2>
              <CircleQuestionMark color="#000000" className="w-3 h-3" />
            </div>
            <input
              className=" w-full bg-[#d9d9d9] placeholder-gray-700/50 h-10 rounded-lg text-black pl-5"
              type="number"
              placeholder="masukkan epoch"
              value={epoch}
              onChange={handleEpochChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-yellow-500 mb-5 text-black p-2 rounded-lg"
          onClick={handleSubmit}
        >
          {isLoading ? "memulai training" : "mulai training"}
        </button>
      </div>
    </div>
  );
}

export default InputParameter;
