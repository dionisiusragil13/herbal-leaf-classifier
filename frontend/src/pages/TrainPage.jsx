import React from "react";
import InputParameter from "../components/InputParameter";
import TextWithHighlight from "../components/HighLightedText";
import ProgressBar from "../components/ProgressBar";
import useTrainStore from "../store/useTrainStore";

function TrainPage() {
  const { isTraining } = useTrainStore();
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
      {/*progress training */}
      {isTraining && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md text-sm">
          ⚡ Training in progress... Please don't close this page.
        </div>
      )}
    </div>
  );
}

export default TrainPage;
