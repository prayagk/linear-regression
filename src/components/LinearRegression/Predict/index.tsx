import { Sequential } from "@tensorflow/tfjs";
import { predict } from "../../../utils/linear-regression";
import { NormalisedTensor } from "../../../types";
import { useState } from "react";

interface IPredict {
  model: Sequential;
  normalisedFeature: NormalisedTensor;
  normalisedLabel: NormalisedTensor;
}

function Predict({ model, normalisedFeature, normalisedLabel }: IPredict) {
  const [prediction, setPrediction] = useState<null | string>(null);
  const predictPrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const input = parseInt(data.get("inputField") as string);

    const predictedPrice = predict(
      input,
      model,
      normalisedFeature,
      normalisedLabel
    );
    if (predictedPrice) {
      const approxPrice = `${parseInt(
        (predictedPrice / 1000).toFixed(0)
      ).toLocaleString("en-us")}K`;
      setPrediction(approxPrice);
    }
  };
  return (
    <div>
      <div>Predict</div>
      <form onSubmit={predictPrice}>
        <label className="block text-sm" htmlFor="input">
          Sq.ft of Living space
        </label>
        <input
          name="inputField"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          className="appearance-none mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          id="input"
          placeholder="2000"
        />
        <button className="my-2">Predict House Price</button>
      </form>
      {prediction && (
        <div>
          <span>{`Predicted House Price: $${prediction}`}</span>
        </div>
      )}
    </div>
  );
}

export default Predict;