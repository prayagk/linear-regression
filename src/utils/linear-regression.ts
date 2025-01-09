/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  data,
  layers,
  losses,
  Rank,
  Sequential,
  sequential,
  split,
  Tensor,
  train,
} from "@tensorflow/tfjs";
import { show } from "@tensorflow/tfjs-vis";

export const extractDataSet = (data: data.CSVDataset, x: string, y: string) =>
  data.map((record: any) => ({
    x: record[x],
    y: record[y],
  }));

export const normalise = (tensor: Tensor<Rank>) => {
  const min = tensor.min();
  const max = tensor.max();

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

export const trainModel = async (
  model: Sequential,
  featureTensor: Tensor<Rank>,
  labelTensor: Tensor<Rank>
) => {
  const {
    // onBatchEnd,
    onEpochEnd,
  } = show.fitCallbacks(
    {
      name: "Training Peerformance",
    },
    ["loss"]
  );
  return model.fit(featureTensor, labelTensor, {
    // batchSize: 512,
    epochs: 20,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        logs = logs || {};
        return onEpochEnd(epoch, logs);
      },
      // onEpochBegin: function () {
      //   show.layer({ name: `Layer 1` }, model.getLayer("", 0));
      // },
      // onBatchEnd,
    },
  });
};
