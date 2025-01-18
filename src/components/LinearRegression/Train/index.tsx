import {
  createModel,
  trainModel as trainModelFn,
} from "../../../utils/linear-regression";
import { useLRStore } from "../../../store";

function Train({ isMobile }: { isMobile: boolean }) {
  const setTrainingLoss = useLRStore((state) => state.setTrainingLoss);
  const setTrainingStatus = useLRStore((state) => state.setTrainingStatus);
  const trainingStatus = useLRStore((state) => state.trainingStatus);
  const setTerminalText = useLRStore((state) => state.setTerminalText);
  const setLoader = useLRStore((state) => state.setLoader);

  const featureTensor = useLRStore((state) => state.trainingFeatureTensor);
  const labelTensor = useLRStore((state) => state.trainingLabelTensor);
  const setModel = useLRStore((state) => state.setModel);

  const trainModel = async () => {
    if (!featureTensor || !labelTensor) return;

    const model = createModel();
    setModel(model);

    setTerminalText("Training started");
    setTrainingStatus("STARTED");
    setLoader({
      isLoading: true,
      status: "Training model",
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
        <button
          onClick={trainModel}
          disabled={Boolean(trainingStatus)}
          title="Train new model"
        >
          Train Model
        </button>
      </div>
    </div>
  );
}

export default Train;
