import { Rank, Sequential, Tensor } from "@tensorflow/tfjs";
import { trainModel as trainModelFn } from "../../../utils/linear-regression";
import { useState } from "react";

interface ITrainModelInterface {
  model: Sequential;
  featureTensor: Tensor<Rank>;
  labelTensor: Tensor<Rank>;
  updateTrainingLoss: (loss: number | null) => void;
}
function Train({
  model,
  featureTensor,
  labelTensor,
  updateTrainingLoss,
}: ITrainModelInterface) {
  const [isDisabled, setIsDisabled] = useState(false);

  const trainModel = async () => {
    setIsDisabled(true);
    const result = await trainModelFn(model, featureTensor, labelTensor);
    const loss = result.history.loss.pop();

    if (typeof loss === "number") {
      updateTrainingLoss(loss);
    }
  };
  return (
    <div>
      <div>
        <button onClick={trainModel} disabled={isDisabled}>
          Train Model
        </button>
      </div>
    </div>
  );
}

export default Train;
