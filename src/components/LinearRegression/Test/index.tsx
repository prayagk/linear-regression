import { Rank, Tensor } from "@tensorflow/tfjs";
import { useState } from "react";
import { testModel as testModelFn } from "../../../utils/linear-regression";
import { useLRStore } from "../../../store";

interface ITestModelInterface {
  featureTensor: Tensor<Rank>;
  labelTensor: Tensor<Rank>;
}
function Test({ featureTensor, labelTensor }: ITestModelInterface) {
  const [isDisabled, setIsDisabled] = useState(false);
  const model = useLRStore((state) => state.model);
  const setTestingLoss = useLRStore((state) => state.setTestingLoss);
  const setTerminalText = useLRStore((state) => state.setTerminalText);

  const testModel = () => {
    if (!model) return;

    setIsDisabled(true);
    const result = testModelFn(model, featureTensor, labelTensor);
    if (!Array.isArray(result)) {
      const loss = result.dataSync()[0];
      setTestingLoss(loss);
      setTerminalText(`Testing Loss: ${loss}`);
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
