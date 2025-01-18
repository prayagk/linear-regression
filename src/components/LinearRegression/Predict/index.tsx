import { predict } from "../../../utils/linear-regression";
import { useEffect, useRef, useState } from "react";
import { useLRStore } from "../../../store";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid"; // For outline style

function Predict({ isTrained }: { isTrained: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [prediction, setPrediction] = useState<null | string>(null);

  const model = useLRStore((state) => state.model);
  const normalisedFeatureMinMax = useLRStore(
    (state) => state.normalisedFeatureMinMax
  );
  const normalisedLabelMinMax = useLRStore(
    (state) => state.normalisedLabelMinMax
  );

  useEffect(() => {
    setPrediction(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [isTrained]);

  const predictPrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!model) return;
    if (!normalisedFeatureMinMax || !normalisedLabelMinMax) return;

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const input = parseInt(data.get("inputField") as string);

    if (input < 300 || input > 1000000) return;

    const predictedPrice = predict(
      input,
      model,
      normalisedFeatureMinMax,
      normalisedLabelMinMax
    );
    if (predictedPrice) {
      const approxPrice = `${parseInt(
        (predictedPrice / 1000).toFixed(0)
      ).toLocaleString("en-us")}K`;
      setPrediction(approxPrice);
    }
  };
  return (
    <div className="border-2 p-3">
      <div className="mb-5 text-3xl flex justify-center items-center">
        <span>Predict</span>
        <ArrowTrendingUpIcon className="mx-2 h-9 text-blue-500" />
      </div>
      <form onSubmit={predictPrice}>
        <label className="block text-sm" htmlFor="input">
          Sq.ft of Living space
        </label>
        <input
          ref={inputRef}
          disabled={!isTrained}
          min={300}
          max={1000000}
          name="inputField"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          className="appearance-none mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          id="input"
          placeholder="2000"
        />
        <button
          disabled={!isTrained}
          title="Predict house price"
          className="my-2"
        >
          Predict
        </button>
      </form>
      {prediction && (
        <div>
          <span>{"Predicted house price:"}</span>
          <span className="block text-6xl font-semibold text-center">{`$${prediction}`}</span>
        </div>
      )}
    </div>
  );
}

export default Predict;
