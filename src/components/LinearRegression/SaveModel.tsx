import { useState } from "react";
import { useLRStore } from "../../store";

interface ISaveModel {
  storageID: string;
}

function SaveModel({ storageID }: ISaveModel) {
  const [isDisabled, setIsDisabled] = useState(false);
  const model = useLRStore((state) => state.model);
  const setSavedInfo = useLRStore((state) => state.setSavedInfo);

  const saveModel = async () => {
    if (!model) return;

    setIsDisabled(true);
    const saveResults = await model.save(`localstorage://${storageID}`);
    const savedTime = saveResults.modelArtifactsInfo.dateSaved.toDateString();
    setSavedInfo(`Model saved: ${savedTime}`);
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
