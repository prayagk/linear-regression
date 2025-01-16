import { trainModel as trainModelFn } from "../../../utils/linear-regression";
import { useState } from "react";
import { useLRStore } from "../../../store";

function Train({ isMobile }: { isMobile: boolean }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const model = useLRStore((state) => state.model);

  const setTrainingLoss = useLRStore((state) => state.setTrainingLoss);
  const setTrainingStatus = useLRStore((state) => state.setTrainingStatus);
  const setTerminalText = useLRStore((state) => state.setTerminalText);
  const setLoader = useLRStore((state) => state.setLoader);

  const featureTensor = useLRStore((state) => state.trainingFeatureTensor);
  const labelTensor = useLRStore((state) => state.trainingLabelTensor);

  const trainModel = async () => {
    if (!model) return;
    if (!featureTensor || !labelTensor) return;

    setTerminalText("Training started");
    setTrainingStatus("STARTED");
    setIsDisabled(true);
    setLoader({
      isLoading: true,
      status: "Training model.",
    });
    const result = await trainModelFn(
      model,
      featureTensor,
      labelTensor,
      isMobile
    );
    setLoader({
      isLoading: false,
      status: "Training completed",
    });
    const loss = result.history.loss.pop();

    if (typeof loss === "number") {
      // Model trained
      setTrainingLoss(loss);
      setTrainingStatus("COMPLETED");
      setTerminalText("Model Trained!");
      setTerminalText(`Training Loss: ${loss.toFixed(5)}`);
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
