import { data, ready, tensor2d, tidy, util } from "@tensorflow/tfjs";
import { useLRStore } from "../../store";
import {
  extractDataSet,
  normalise,
  splitTensor,
} from "../../utils/linear-regression";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function LoadData() {
  const xLabel = useLRStore((state) => state.xLabel);
  const yLabel = useLRStore((state) => state.yLabel);

  const setLoader = useLRStore((state) => state.setLoader);

  const setNormalisedFeatureMinMax = useLRStore(
    (state) => state.setNormalisedFeatureMinMax
  );
  const setNormalisedLabelMinMax = useLRStore(
    (state) => state.setNormalisedLabelMinMax
  );

  const setTrainingLabelTensor = useLRStore(
    (state) => state.setTrainingLabelTensor
  );
  const setTrainingFeatureTensor = useLRStore(
    (state) => state.setTrainingFeatureTensor
  );

  const setTestingFeatureTensor = useLRStore(
    (state) => state.setTestingFeatureTensor
  );
  const setTestingLabelTensor = useLRStore(
    (state) => state.setTestingLabelTensor
  );

  const setPlottingPoints = useLRStore((state) => state.setPlottingPoints);

  const isDataLoaded = useLRStore((state) => state.isDataLoaded);
  const setIsDataLoaded = useLRStore((state) => state.setIsDataLoaded);
  const setTerminalText = useLRStore((state) => state.setTerminalText);

  const processLR = () => {
    tidy(() => {
      (async function () {
        setLoader({
          isLoading: true,
          status: "Loading data from CSV",
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
        setPlottingPoints(points);

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

        await sleep(1000);
        setLoader({
          isLoading: false,
          status: "",
        });
        setIsDataLoaded(true);
        setTerminalText("Data loaded");
        setTerminalText("Data shuffled and splitted");

        // Inspection
        // show.modelSummary({ name: "Model Summary", tab: "Model" }, model);
        // const layer = model.getLayer("", 0);
        // show.layer({ name: "Layer 1" }, layer);
        // model.summary();
      })();
    });
  };

  return (
    <div>
      <button
        title="Load data from CSV"
        disabled={isDataLoaded}
        onClick={processLR}
      >
        Load Data
      </button>
    </div>
  );
}

export default LoadData;
