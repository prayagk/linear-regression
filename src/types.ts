import { Rank, Tensor } from "@tensorflow/tfjs";

export interface DataPoints {
  x: number;
  y: number;
}

export interface NormalisedTensor {
  min: Tensor<Rank>;
  max: Tensor<Rank>;
}
