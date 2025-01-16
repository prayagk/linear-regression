import { Rank, Tensor } from "@tensorflow/tfjs";

export interface DataPoints {
  x: number;
  y: number;
}

export interface NormalisedTensor {
  min: Tensor<Rank>;
  max: Tensor<Rank>;
}

export type TerminalTextType = {
  id: string;
  text: string;
};

export type LoaderType = {
  isLoading: boolean;
  status: string;
};

export type TrainingStatusType = null | "STARTED" | "COMPLETED" | "IMPORTED";
