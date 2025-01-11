import { Sequential } from "@tensorflow/tfjs";
import { loadSavedModel as loadSavedModelFn } from "../../utils/linear-regression";
import { useState } from "react";

interface ILoadModel {
  storageID: string;
  updateModel: (model: Sequential) => void;
}

function LoadModel({ storageID, updateModel }: ILoadModel) {
  const [isDisabled, setIsDisabled] = useState(false);

  const loadSavedModel = async () => {
    setIsDisabled(true);
    const [error, model] = await loadSavedModelFn(storageID);
    if (error) {
      alert(error);
    }
    if (model && typeof model !== "string") {
      updateModel(model);
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
