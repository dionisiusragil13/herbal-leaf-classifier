import React from "react";
import InputParameter from "../components/InputParameter";
import TextWithHighlight from "../components/HighLightedText";
import ProgressBar from "../components/ProgressBar";
import useTrainStore from "../store/useTrainStore";
import TrainResult from "../components/TrainResult";

function TrainPage() {
  const { isTraining, trainingResults } = useTrainStore();
  return (
    <div className="min-h-scren flex flex-col items-center justify-center mt-12">
      <img
        src="/leaf-1.png"
        className="absolute left-43 top-120 w-[300px] z-0 opacity-90"
        alt=""
      />

      <img
        src="/leaf-2.png"
        className="absolute right-40 top-60 w-[320px] z-0 opacity-90"
        alt=""
      />
      <div className="">
        <h1 className="text-[25px] font-bold">
          <TextWithHighlight
            text={"Train Your Own Model"}
            wordsToHighlight={["Train", "Model"]}
          />
        </h1>
      </div>
      <div className="z-10 mb-5">
        <InputParameter />
      </div>
      {isTraining && (
        <div className="mt-5">
          <h1 className="text-xl font-semibold mb-3">Training Progress</h1>
          <ProgressBar />
        </div>
      )}
      {/* Jika tidak ada apa-apa */}
      {!isTraining && !trainingResults && (
        <div className="mt-5 p-8 bg-gray-50 rounded-lg text-center mb-5">
          <p className="text-gray-500">
            Mulai training untuk mendapatkan model.
          </p>
        </div>
      )}
    </div>
  );
}

export default TrainPage;
