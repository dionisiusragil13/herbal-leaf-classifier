import React from "react";
import useTrainStore from "../store/useTrainStore";

function TrainResult() {
  const { trainResult } = useTrainStore();
  return <div>TrainResult</div>;
}

export default TrainResult;
