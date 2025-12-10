import React from "react";
import InputParameter from "../components/InputParameter";
import TextWithHighlight from "../components/HighLightedText";

function TrainPage() {
  return (
    <div className="min-h-scren flex flex-col items-center justify-center mt-20">
      <div className="">
        <h1 className="text-[25px] font-bold">
          <TextWithHighlight
            text={"Train Your Own Model"}
            wordsToHighlight={["Train", "Model"]}
          />
        </h1>
      </div>
      <InputParameter />
    </div>
  );
}

export default TrainPage;
