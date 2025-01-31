/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  data,
  io,
  layers,
  linspace,
  loadLayersModel,
  losses,
  Rank,
  Sequential,
  sequential,
  split,
  Tensor,
  tensor1d,
  tensor2d,
  tidy,
  train,
} from "@tensorflow/tfjs";
import { show } from "@tensorflow/tfjs-vis";
import { NormalisedTensor } from "../types";
import { useLRStore } from "../store";
import { plot, showLayerInfo } from "./visor-utils";

export const extractDataSet = (data: data.CSVDataset, x: string, y: string) =>
  data.map((record: any) => ({
    x: record[x],
    y: record[y],
  }));

export const normalise = (
  tensor: Tensor<Rank>,
  min: Tensor<Rank> = tensor.min(),
  max: Tensor<Rank> = tensor.max()
) => {
  const normalisedTensor = tensor.sub(min).div(max.sub(min));
  return {
    tensor: normalisedTensor,
    min,
    max,
  };
};

export const deNormalise = (
  tensor: Tensor<Rank>,
  min: Tensor<Rank>,
  max: Tensor<Rank>
) => {
  return tensor.mul(max.sub(min)).add(min);
};

export const splitTensor = (
  tensor: Tensor<Rank>,
  ratio: number[],
  count: number
) => {
  let totalCount = 0;
  const splitCount = ratio.map((item, index) => {
    if (ratio.length - 1 === index) {
      return count - totalCount;
    } else {
      const actualCount = Math.floor(item * count);
      totalCount += actualCount;
      return actualCount;
    }
  });
  return split(tensor, splitCount);
};

export const createModel = () => {
  const model = sequential();

  model.add(
    layers.dense({
      units: 1,
      useBias: true,
      activation: "linear",
      inputDim: 1,
    })
  );
  const optimizer = train.sgd(0.1);
  model.compile({
    loss: losses.meanSquaredError,
    optimizer,
  });
  return model;
};

export const trainModel = (
  model: Sequential,
  featureTensor: Tensor<Rank>,
  labelTensor: Tensor<Rank>,
  isMobile: boolean = false
) => {
  if (isMobile) {
    return model.fit(featureTensor, labelTensor, {
      epochs: 20,
      shuffle: true,
    });
  }
  const {
    // onBatchEnd,
    onEpochEnd,
  } = show.fitCallbacks(
    {
      name: "Training Performance",
    },
    ["loss"]
  );
  return model.fit(featureTensor, labelTensor, {
    // batchSize: 512,
    epochs: 20,
    shuffle: true,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        logs = logs || {};
        return onEpochEnd(epoch, logs);
      },
      onEpochBegin: () => {
        const predictedLinePoints = plotPredictionLine(model);
        plot(predictedLinePoints);
        showLayerInfo(model);
      },
    },
  });
};

export const testModel = (
  model: Sequential,
  testingFeatureTensor: Tensor<Rank>,
  testingLabelTensor: Tensor<Rank>
) => model.evaluate(testingFeatureTensor, testingLabelTensor);

export const loadSavedModel = async (storageID: string) => {
  const storageKey = `localstorage://${storageID}`;
  const models = await io.listModels();
  const modelInfo = models[storageKey];
  if (!modelInfo) {
    return ["No saved models!", null];
  }
  const model = await loadLayersModel(storageKey);
  const optimizer = train.sgd(0.1);
  model.compile({
    loss: losses.meanSquaredError,
    optimizer,
  });

  if (!(model instanceof Sequential)) {
    return ["No saved models!", null];
  }
  return [null, model];
};

export const predict = (
  predictionInput: number,
  model: Sequential,
  normalisedFeature: NormalisedTensor,
  normalisedLabel: NormalisedTensor
): null | number => {
  let predictedPrice = null;
  tidy(() => {
    const inputTensor = tensor1d([predictionInput]);
    const normalisedInput = normalise(
      inputTensor,
      normalisedFeature.min,
      normalisedFeature.max
    );
    const predictTensor = model.predict(normalisedInput.tensor);
    if (!Array.isArray(predictTensor)) {
      const deNormalisedOutput = deNormalise(
        predictTensor,
        normalisedLabel.min,
        normalisedLabel.max
      );
      predictedPrice = deNormalisedOutput.dataSync()[0];
    }
  });
  return predictedPrice;
};

export const plotPredictionLine = (model: Sequential) => {
  const normalisedFeatureMinMax = useLRStore.getState().normalisedFeatureMinMax;
  const normalisedLabelMinMax = useLRStore.getState().normalisedLabelMinMax;

  const [xs, ys] = tidy(() => {
    if (!normalisedFeatureMinMax || !normalisedLabelMinMax) return [[], []];
    const normalisedXs = linspace(0, 1, 50);
    const normalisedYs = model.predict(normalisedXs.reshape([50, 1]));
    if (Array.isArray(normalisedYs)) return [[], []];

    const xs = deNormalise(
      normalisedXs,
      normalisedFeatureMinMax.min,
      normalisedFeatureMinMax.max
    );
    const ys = deNormalise(
      normalisedYs,
      normalisedLabelMinMax.min,
      normalisedLabelMinMax.max
    );
    return [xs.dataSync(), ys.dataSync()];
  });
  const predictedLinePoints = Array.from(xs).map((item, index) => ({
    x: item,
    y: ys[index],
  }));
  return predictedLinePoints;
};

export const plotParams = async (weight: number, bias: number) => {
  const model = useLRStore.getState().model;
  if (!model) return;

  model.getLayer("", 0).setWeights([
    tensor2d([[weight]]), // Kernel (input multiplier)
    tensor1d([bias]), // Bias
  ]);
  await plotPredictionLine(model);
  const layer = model.getLayer("", 0);
  show.layer({ name: "Layer 1" }, layer);
};

(window as any).plotParams = plotParams;
