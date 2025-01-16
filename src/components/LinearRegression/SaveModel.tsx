import { useState } from "react";
import { useLRStore } from "../../store";

function SaveModel() {
  const [isDisabled, setIsDisabled] = useState(false);

  const model = useLRStore((state) => state.model);
  const storageID = useLRStore((state) => state.storageID);
  const setTerminalText = useLRStore((state) => state.setTerminalText);

  const saveModel = async () => {
    if (!model) return;

    setIsDisabled(true);
    const saveResults = await model.save(`localstorage://${storageID}`);
    const savedTime = saveResults.modelArtifactsInfo.dateSaved.toDateString();
    setTerminalText(`Model saved in browser: ${savedTime}`);
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
