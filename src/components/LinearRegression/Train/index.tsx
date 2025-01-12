import { Rank, Tensor } from "@tensorflow/tfjs";
import { trainModel as trainModelFn } from "../../../utils/linear-regression";
import { useState } from "react";
import { useLRStore } from "../../../store";

interface ITrainModelInterface {
  featureTensor: Tensor<Rank>;
  labelTensor: Tensor<Rank>;
}
function Train({ featureTensor, labelTensor }: ITrainModelInterface) {
  const [isDisabled, setIsDisabled] = useState(false);
  const model = useLRStore((state) => state.model);
  const setTrainingLoss = useLRStore((state) => state.setTrainingLoss);
  const setIsTrained = useLRStore((state) => state.setIsTrained);
  const setTerminalText = useLRStore((state) => state.setTerminalText);

  const trainModel = async () => {
    if (!model) return;
    setIsDisabled(true);
    const result = await trainModelFn(model, featureTensor, labelTensor);
    const loss = result.history.loss.pop();

    if (typeof loss === "number") {
      // Model trained
      setTrainingLoss(loss);
      setIsTrained(true);
      setTerminalText(`Training Loss: ${loss}`);
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
