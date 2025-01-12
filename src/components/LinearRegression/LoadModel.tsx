import { loadSavedModel as loadSavedModelFn } from "../../utils/linear-regression";
import { useState } from "react";
import { useLRStore } from "../../store";

interface ILoadModel {
  storageID: string;
}

function LoadModel({ storageID }: ILoadModel) {
  const [isDisabled, setIsDisabled] = useState(false);

  const setModel = useLRStore((state) => state.setModel);
  const setIsTrained = useLRStore((state) => state.setIsTrained);
  const setTerminalText = useLRStore((state) => state.setTerminalText);

  const loadSavedModel = async () => {
    setIsDisabled(true);
    const [error, model] = await loadSavedModelFn(storageID);
    if (error) {
      alert(error);
    }
    if (model && typeof model !== "string") {
      setModel(model);
      setIsTrained(true);
      setTerminalText("Model loaded from browser storage");
    }
  };

  return (
    <div>
      <button disabled={isDisabled} onClick={loadSavedModel}>
        Load saved model
      </button>
    </div>
  );
}

export default LoadModel;
