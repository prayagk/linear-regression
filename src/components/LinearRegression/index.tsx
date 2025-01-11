/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  data,
  ready,
  Sequential,
  Tensor,
  tensor2d,
  tidy,
  util,
} from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import {
  createModel,
  extractDataSet,
  normalise,
  splitTensor,
} from "../../utils/linear-regression";
import Header from "./Header";
import VisorControls from "./VisorControls";
import Train from "./Train";
import Predict from "./Predict";
import Test from "./Test";
import { DataPoints } from "../../types";
import Stats from "./Stats";
import SaveModel from "./SaveModel";
import LoadModel from "./LoadModel";

const LinearAggression = () => {
  const [dataPoints, setDataPoints] = useState<DataPoints[]>([]);
  const [xLabel] = useState("sqft_living");
  const [yLabel] = useState("price");
  const [model, setModel] = useState<Sequential | null>(null);

  const [storageID] = useState("linear-regression");
  const [isTrained, setIsTrained] = useState(false);

  const [trainingLabelTensor, setTrainingLabelTensor] = useState<Tensor | null>(
    null
  );
  const [testingFeatureTensor, setTestingFeatureTensor] =
    useState<Tensor | null>(null);

  const [testingLabelTensor, setTestingLabelTensor] = useState<Tensor | null>(
    null
  );
  const [trainingFeatureTensor, setTrainingFeatureTensor] =
    useState<Tensor | null>(null);

  const [terminalTexts, setTerminalTexts] = useState<string[]>([]);

  const writeTerminal = (text: string) => {
    setTerminalTexts((prev) => [...prev, text]);
  };

  const updateTrainingLoss = (loss: number | null) => {
    writeTerminal(`Training Loss: ${loss}`);
    setIsTrained(true);
  };
  const updateTestingLoss = (loss: number | null) => {
    writeTerminal(`Testing Loss: ${loss}`);
  };

  const updateSavedInfo = (savedInfo: string) => {
    writeTerminal(`Model saved: ${savedInfo}`);
  };

  const updateModel = (model: Sequential) => {
    writeTerminal(`Model loaded from browser storage`);
    setModel(model);
    setIsTrained(true);
  };

  useEffect(() => {
    const processLR = () => {
      (async function () {
        await ready();

        // Import data from CSV
        const houseSalesDataset = data.csv("/assets/kc_house_data.csv");

        // Extract x, y to plot
        const pointsDataSet = extractDataSet(houseSalesDataset, xLabel, yLabel);
        const points = await pointsDataSet.toArray();

        // Shuffling data before spliiting to avoid patterns
        util.shuffle(points);
        setDataPoints(points);

        // Features (input)
        const featureValues = points.map((p) => p.x);
        const featureTensor = tensor2d(featureValues, [
          featureValues.length,
          1,
        ]);

        // Labels (output)
        const labelValues = points.map((p) => p.y);
        const labelTensor = tensor2d(labelValues, [labelValues.length, 1]);

        // Normalisation
        const normalisedFeature = normalise(featureTensor);
        const normalisedLabel = normalise(labelTensor);

        // Splitting
        const [trainingFeatureTensor, testingFeatureTensor] = splitTensor(
          normalisedFeature.tensor,
          [0.5, 0.5],
          points.length
        );
        setTrainingFeatureTensor(trainingFeatureTensor);
        setTestingFeatureTensor(testingFeatureTensor);

        const [trainingLabelTensor, testingLabelTensor] = splitTensor(
          normalisedLabel.tensor,
          [0.5, 0.5],
          points.length
        );
        setTrainingLabelTensor(trainingLabelTensor);
        setTestingLabelTensor(testingLabelTensor);

        const model = createModel();
        setModel(model);

        // Inspection
        // show.modelSummary({ name: "Model Summary", tab: "Model" }, model);
        // const layer = model.getLayer("", 0);
        // show.layer({ name: "Layer 1" }, layer);
        // model.summary();
      })();
    };

    tidy(processLR);
  }, [xLabel, yLabel]);

  return (
    <>
      <Header />
      {model && (
        <>
          <VisorControls data={dataPoints} y={yLabel} x={xLabel} />
          <div className="grid grid-cols-2 gap-3">
            <div className="border-r-2 pr-2">
              <div className="flex gap-3 justify-between">
                {trainingLabelTensor && trainingFeatureTensor && (
                  <Train
                    model={model}
                    labelTensor={trainingLabelTensor}
                    featureTensor={trainingFeatureTensor}
                    updateTrainingLoss={updateTrainingLoss}
                  />
                )}
                <span>Or</span>
                <LoadModel storageID={storageID} updateModel={updateModel} />
              </div>
              {isTrained && (
                <>
                  <Stats texts={terminalTexts} />
                  <div className="flex gap-3 justify-between">
                    {testingLabelTensor && testingFeatureTensor && (
                      <Test
                        model={model}
                        labelTensor={testingLabelTensor}
                        featureTensor={testingFeatureTensor}
                        updateTestingLoss={updateTestingLoss}
                      />
                    )}

                    <SaveModel
                      storageID={storageID}
                      model={model}
                      updateSavedInfo={updateSavedInfo}
                    />
                  </div>
                </>
              )}
            </div>
            <Predict />
          </div>
        </>
      )}
    </>
  );
};

export default LinearAggression;
