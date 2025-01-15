import { Sequential, Tensor } from "@tensorflow/tfjs";
import { create } from "zustand";
import {
  DataPoints,
  LoaderType,
  NormalisedTensor,
  TerminalTextType,
} from "./types";

type State = {
  model: Sequential | null;
  xLabel: string;
  yLabel: string;
  isDataLoaded: boolean;
  isTrained: boolean;
  terminalTexts: TerminalTextType[];
  trainingLoss: number | null;
  testingLoss: number | null;
  savedInfo: string | null;
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
  setIsTrained: (flag: boolean) => void;
  setTerminalText: (text: string) => void;
  setTrainingLoss: (value: number) => void;
  setTestingLoss: (value: number) => void;
  setSavedInfo: (value: string) => void;
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
  isTrained: false,
  terminalTexts: [],
  trainingLoss: null,
  testingLoss: null,
  savedInfo: null,
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
  setIsTrained: (flag: boolean) => set({ isTrained: flag }),
  setTrainingLoss: (value: number) => set({ trainingLoss: value }),
  setTestingLoss: (value: number) => set({ testingLoss: value }),
  setSavedInfo: (value: string) => set({ savedInfo: value }),
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
