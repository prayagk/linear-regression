import { useEffect, useState } from "react";
import { testModel as testModelFn } from "../../../../utils/linear-regression";
import { useLRStore } from "../../../../store";

function Test() {
  const [isDisabled, setIsDisabled] = useState(false);
  const model = useLRStore((state) => state.model);
  const setTestingLoss = useLRStore((state) => state.setTestingLoss);
  const setTerminalText = useLRStore((state) => state.setTerminalText);
  const trainingStatus = useLRStore((state) => state.trainingStatus);

  useEffect(() => {
    setIsDisabled(false);
  }, [trainingStatus]);

  const featureTensor = useLRStore((state) => state.testingFeatureTensor);
  const labelTensor = useLRStore((state) => state.testingLabelTensor);

  const testModel = () => {
    if (!model) return;
    if (!featureTensor || !labelTensor) return;

    setIsDisabled(true);
    const result = testModelFn(model, featureTensor, labelTensor);
    if (!Array.isArray(result)) {
      const loss = result.dataSync()[0];
      setTestingLoss(loss);
      setTerminalText("Model tested with testing data");
      setTerminalText(`Testing Loss: ${loss.toFixed(5)}`);
    }
  };
  return (
    <div>
      <div>
        <button onClick={testModel} disabled={isDisabled}>
          Test Model
        </button>
      </div>
    </div>
  );
}

export default Test;
