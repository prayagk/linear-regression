import { data, ready, Tensor, tensor2d, tidy, util } from "@tensorflow/tfjs";
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
import { DataPoints, NormalisedTensor } from "../../types";
import Stats from "./Stats";
import SaveModel from "./SaveModel";
import LoadModel from "./LoadModel";
import { useLRStore } from "../../store";
import Loader from "../Loader";

const LinearAggression = () => {
  const model = useLRStore((state) => state.model);
  const setModel = useLRStore((state) => state.setModel);

  const isTrained = useLRStore((state) => state.isTrained);

  const setLoader = useLRStore((state) => state.setLoader);

  const [dataPoints, setDataPoints] = useState<DataPoints[]>([]);
  const [xLabel] = useState("sqft_living");
  const [yLabel] = useState("price");

  const [normalisedFeatureMinMax, setNormalisedFeatureMinMax] =
    useState<NormalisedTensor | null>(null);
  const [normalisedLabelMinMax, setNormalisedLabelMinMax] =
    useState<NormalisedTensor | null>(null);

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

  useEffect(() => {
    const processLR = () => {
      (async function () {
        setLoader({
          isLoading: true,
          status: "Loading data",
        });
        await ready();

        // Import data from CSV
        const houseSalesDataset = data.csv(
          `${import.meta.env.BASE_URL}assets/kc_house_data.csv`
        );

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

        setNormalisedFeatureMinMax({
          min: normalisedFeature.min,
          max: normalisedFeature.max,
        });

        setNormalisedLabelMinMax({
          min: normalisedLabel.min,
          max: normalisedLabel.max,
        });

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

        setLoader({
          isLoading: false,
          status: "Trained",
        });

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
      <Loader />
      <Header />
      {model && (
        <>
          <div className="my-3">
            <VisorControls data={dataPoints} y={yLabel} x={xLabel} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="my-3">
              <div className="flex gap-3 justify-between">
                {trainingLabelTensor && trainingFeatureTensor && (
                  <Train
                    labelTensor={trainingLabelTensor}
                    featureTensor={trainingFeatureTensor}
                  />
                )}
                <span>Or</span>
                <LoadModel />
              </div>
              {isTrained && (
                <>
                  <Stats />
                  <div className="flex gap-3 justify-between">
                    {testingLabelTensor && testingFeatureTensor && (
                      <Test
                        labelTensor={testingLabelTensor}
                        featureTensor={testingFeatureTensor}
                      />
                    )}

                    <SaveModel />
                  </div>
                </>
              )}
            </div>
            {isTrained && normalisedFeatureMinMax && normalisedLabelMinMax && (
              <Predict
                normalisedFeature={normalisedFeatureMinMax}
                normalisedLabel={normalisedLabelMinMax}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default LinearAggression;
