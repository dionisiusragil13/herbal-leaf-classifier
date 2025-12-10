import React, { useState } from "react";
import { CircleQuestionMark } from "lucide-react";

function InputParameter() {
  const [value, setValue] = useState(50);

  const handleChange = (e) => {
    setValue(Number(e.target.value));
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
              <div className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                {value}
              </div>
            </div>

            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`,
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
              defaultValue=""
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
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-800">
                Learning Rate
              </h2>
              <CircleQuestionMark color="#000000" className="w-3 h-3" />
            </div>
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
            />
          </div>
        </div>
        <button className="bg-slate-700 mb-5">test</button>
      </div>
    </div>
  );
}

export default InputParameter;
