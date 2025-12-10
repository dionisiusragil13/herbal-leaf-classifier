import React from "react";
import InputParameter from "../components/InputParameter";
import TextWithHighlight from "../components/HighLightedText";

function TrainPage() {
  return (
    <div className="min-h-scren flex flex-col items-center justify-center mt-12">
      <img
        src="/leaf-1.png"
        className="absolute left-43 bottom-5 w-[300px] z-0 opacity-90"
        alt=""
      />

      <img
        src="/leaf-2.png"
        className="absolute right-40 top-40 w-[320px] z-0 opacity-90"
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
      <div className="z-10">
        <InputParameter />
      </div>
      {/*progress training */}
      <div>test</div>
    </div>
  );
}

export default TrainPage;
