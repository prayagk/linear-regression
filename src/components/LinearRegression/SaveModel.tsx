import { Sequential } from "@tensorflow/tfjs";
import { useState } from "react";

interface ISaveModel {
  storageID: string;
  model: Sequential;
  updateSavedInfo: (savedInfo: string) => void;
}

function SaveModel({ storageID, model, updateSavedInfo }: ISaveModel) {
  const [isDisabled, setIsDisabled] = useState(false);

  const saveModel = async () => {
    setIsDisabled(true);
    const saveResults = await model.save(`localstorage://${storageID}`);
    updateSavedInfo(saveResults.modelArtifactsInfo.dateSaved.toDateString());
  };
  return (
    <div>
      <button disabled={isDisabled} onClick={saveModel}>
        Save Model
      </button>
    </div>
  );
}

export default SaveModel;
