import { Rank, Sequential, Tensor } from "@tensorflow/tfjs";
import { useState } from "react";
import { testModel as testModelFn } from "../../../utils/linear-regression";

interface ITestModelInterface {
  model: Sequential;
  featureTensor: Tensor<Rank>;
  labelTensor: Tensor<Rank>;
  updateTestingLoss: (loss: number | null) => void;
}
function Test({
  model,
  featureTensor,
  labelTensor,
  updateTestingLoss,
}: ITestModelInterface) {
  const [isDisabled, setIsDisabled] = useState(false);

  const testModel = async () => {
    setIsDisabled(true);
    const result = await testModelFn(model, featureTensor, labelTensor);
    if (!Array.isArray(result)) {
      const loss = result.dataSync()[0];
      updateTestingLoss(loss);
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
