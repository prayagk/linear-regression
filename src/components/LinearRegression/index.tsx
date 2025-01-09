/* eslint-disable @typescript-eslint/no-explicit-any */
import { data, ready, tensor2d, tidy, util } from "@tensorflow/tfjs";
import {
  render,
  //  show
} from "@tensorflow/tfjs-vis";
import { useEffect } from "react";
import {
  createModel,
  extractDataSet,
  normalise,
  splitTensor,
  trainModel,
} from "../../utils/linear-regression";

const LinearAggression = () => {
  useEffect(() => {
    const processLR = () => {
      (async function () {
        await ready();

        // Import data from CSV
        const houseSalesDataset = data.csv("/assets/kc_house_data.csv");

        const xLabel = "sqft_living";
        const yLabel = "price";

        // Extract x, y to plot
        const pointsDataSet = extractDataSet(houseSalesDataset, xLabel, yLabel);
        const points = await pointsDataSet.toArray();

        // Shuffling data before spliiting to avoid patterns
        util.shuffle(points);
        plot(points, xLabel, yLabel);

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
        // trainingFeatureTensor.print(true);
        // testingFeatureTensor.print(true);
        const [trainingLabelTensor, testingLabelTensor] = splitTensor(
          normalisedLabel.tensor,
          [0.5, 0.5],
          points.length
        );
        // trainingLabelTensor.print(true);
        // testingLabelTensor.print(true);

        const model = createModel();

        // Inspection
        // show.modelSummary({ name: "Model Summary", tab: "Model" }, model);
        // const layer = model.getLayer("", 0);
        // show.layer({ name: "Layer 1" }, layer);
        // model.summary();

        const result = await trainModel(
          model,
          trainingFeatureTensor,
          trainingLabelTensor
        );
        const trainingLoss = result.history.loss.pop();
        console.log("🚀 ~ trainingLoss:", trainingLoss);

        const lossTensor = model.evaluate(
          testingFeatureTensor,
          testingLabelTensor
        );
        const loss = lossTensor.toString();
        console.log("🚀 ~ loss:", loss);
      })();
    };

    tidy(processLR);
  }, []);

  async function plot(
    points: Array<{ x: number; y: number }>,
    xLabel: string,
    yLabel: string
  ) {
    return await render.scatterplot(
      {
        name: `${xLabel} vs ${yLabel}`,
      },
      {
        values: points,
        series: ["Original"],
      },
      {
        xLabel: xLabel,
        yLabel: yLabel,
      }
    );
  }

  return <div></div>;
};

export default LinearAggression;
