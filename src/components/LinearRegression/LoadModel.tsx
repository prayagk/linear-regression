import { loadSavedModel as loadSavedModelFn } from "../../utils/linear-regression";
import { useState } from "react";
import { useLRStore } from "../../store";

function LoadModel() {
  const [isDisabled, setIsDisabled] = useState(false);

  const setModel = useLRStore((state) => state.setModel);
  const setTrainingStatus = useLRStore((state) => state.setTrainingStatus);
  const setTerminalText = useLRStore((state) => state.setTerminalText);
  const storageID = useLRStore((state) => state.storageID);

  const loadSavedModel = async () => {
    setIsDisabled(true);
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
        disabled={isDisabled}
        onClick={loadSavedModel}
      >
        Load model
      </button>
    </div>
  );
}

export default LoadModel;
