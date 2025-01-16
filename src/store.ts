import { Sequential, Tensor } from "@tensorflow/tfjs";
import { create } from "zustand";
import {
  DataPoints,
  LoaderType,
  NormalisedTensor,
  TerminalTextType,
  TrainingStatusType,
} from "./types";

type State = {
  model: Sequential | null;
  xLabel: string;
  yLabel: string;
  isDataLoaded: boolean;
  trainingStatus: TrainingStatusType;
  terminalTexts: TerminalTextType[];
  trainingLoss: number | null;
  testingLoss: number | null;
  storageID: string;
  loader: LoaderType;
  normalisedFeatureMinMax: NormalisedTensor | null;
  normalisedLabelMinMax: NormalisedTensor | null;
  trainingLabelTensor: Tensor | null;
  trainingFeatureTensor: Tensor | null;
  testingLabelTensor: Tensor | null;
  testingFeatureTensor: Tensor | null;
  plotingPoints: DataPoints[];
};

type Actions = {
  setModel: (model: Sequential) => void;
  setIsDataLoaded: (isDataLoaded: boolean) => void;
  setTrainingStatus: (trainingStatus: TrainingStatusType) => void;
  setTerminalText: (text: string) => void;
  setTrainingLoss: (value: number) => void;
  setTestingLoss: (value: number) => void;
  setLoader: ({ isLoading, status }: LoaderType) => void;
  setNormalisedFeatureMinMax: (normalisedFeature: NormalisedTensor) => void;
  setNormalisedLabelMinMax: (normalisedLabel: NormalisedTensor) => void;
  setTrainingLabelTensor: (tensor: Tensor) => void;
  setTrainingFeatureTensor: (tensor: Tensor) => void;
  setTestingLabelTensor: (tensor: Tensor) => void;
  setTestingFeatureTensor: (tensor: Tensor) => void;
  setPlottingPoints: (points: DataPoints[]) => void;
};

export const useLRStore = create<State & Actions>((set) => ({
  model: null,
  xLabel: "sqft_living",
  yLabel: "price",
  isDataLoaded: false,
  trainingStatus: null,
  terminalTexts: [],
  trainingLoss: null,
  testingLoss: null,
  storageID: "linear-regression",
  loader: {
    isLoading: false,
    status: "",
  },
  normalisedFeatureMinMax: null,
  normalisedLabelMinMax: null,
  trainingLabelTensor: null,
  trainingFeatureTensor: null,
  testingLabelTensor: null,
  testingFeatureTensor: null,
  plotingPoints: [],
  setModel: (model: Sequential) => set({ model }),
  setTerminalText: (text: string) => {
    const newLine: TerminalTextType = {
      text,
      id: crypto.randomUUID(),
    };
    set((state) => ({
      terminalTexts: [...state.terminalTexts, newLine],
    }));
  },
  setIsDataLoaded: (isDataLoaded: boolean) => set({ isDataLoaded }),
  setTrainingStatus: (trainingStatus: TrainingStatusType) =>
    set({ trainingStatus }),
  setTrainingLoss: (value: number) => set({ trainingLoss: value }),
  setTestingLoss: (value: number) => set({ testingLoss: value }),
  setLoader: (data: LoaderType) => set({ loader: data }),
  setNormalisedFeatureMinMax: (normalisedFeatureMinMax: NormalisedTensor) =>
    set({ normalisedFeatureMinMax }),
  setNormalisedLabelMinMax: (normalisedLabelMinMax: NormalisedTensor) =>
    set({ normalisedLabelMinMax }),
  setTrainingLabelTensor: (trainingLabelTensor: Tensor) =>
    set({ trainingLabelTensor }),
  setTrainingFeatureTensor: (trainingFeatureTensor: Tensor) =>
    set({ trainingFeatureTensor }),
  setTestingLabelTensor: (testingLabelTensor: Tensor) =>
    set({ testingLabelTensor }),
  setTestingFeatureTensor: (testingFeatureTensor: Tensor) =>
    set({ testingFeatureTensor }),
  setPlottingPoints: (plotingPoints: DataPoints[]) => set({ plotingPoints }),
}));
