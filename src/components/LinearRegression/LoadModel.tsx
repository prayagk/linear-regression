import { loadSavedModel as loadSavedModelFn } from "../../utils/linear-regression";
import { useLRStore } from "../../store";

function LoadModel() {
  const setModel = useLRStore((state) => state.setModel);
  const trainingStatus = useLRStore((state) => state.trainingStatus);
  const setTrainingStatus = useLRStore((state) => state.setTrainingStatus);
  const setTerminalText = useLRStore((state) => state.setTerminalText);
  const storageID = useLRStore((state) => state.storageID);

  const loadSavedModel = async () => {
    const [error, model] = await loadSavedModelFn(storageID);
    if (error) {
      alert(error);
    }
    if (model && typeof model !== "string") {
      setModel(model);
      setTrainingStatus("IMPORTED");
      setTerminalText("Model loaded from browser storage");
    }
  };

  return (
    <div>
      <button
        title="Load saved model"
        disabled={Boolean(trainingStatus)}
        onClick={loadSavedModel}
      >
        Load Model
      </button>
    </div>
  );
}

export default LoadModel;
