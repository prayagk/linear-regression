import { trainModel as trainModelFn } from "../../../utils/linear-regression";
import { useState } from "react";
import { useLRStore } from "../../../store";

function Train() {
  const [isDisabled, setIsDisabled] = useState(false);
  const model = useLRStore((state) => state.model);

  const setTrainingLoss = useLRStore((state) => state.setTrainingLoss);
  const setIsTrained = useLRStore((state) => state.setIsTrained);
  const setTerminalText = useLRStore((state) => state.setTerminalText);
  const setLoader = useLRStore((state) => state.setLoader);

  const featureTensor = useLRStore((state) => state.trainingFeatureTensor);
  const labelTensor = useLRStore((state) => state.trainingLabelTensor);

  const trainModel = async () => {
    if (!model) return;
    if (!featureTensor || !labelTensor) return;

    setIsDisabled(true);
    setLoader({
      isLoading: true,
      status: "Training model",
    });
    const result = await trainModelFn(model, featureTensor, labelTensor);
    setLoader({
      isLoading: false,
      status: "Training completed",
    });
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
