import { Sequential } from "@tensorflow/tfjs";
import { create } from "zustand";
import { LoaderType, TerminalTextType } from "./types";

type State = {
  model: Sequential | null;
  isTrained: boolean;
  terminalTexts: TerminalTextType[];
  trainingLoss: number | null;
  testingLoss: number | null;
  savedInfo: string | null;
  storageID: string;
  loader: LoaderType;
};

type Actions = {
  setModel: (model: Sequential) => void;
  setIsTrained: (flag: boolean) => void;
  setTerminalText: (text: string) => void;
  setTrainingLoss: (value: number) => void;
  setTestingLoss: (value: number) => void;
  setSavedInfo: (value: string) => void;
  setLoader: ({ isLoading, status }: LoaderType) => void;
};

export const useLRStore = create<State & Actions>((set) => ({
  model: null,
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
  setIsTrained: (flag: boolean) => set({ isTrained: flag }),
  setTrainingLoss: (value: number) => set({ trainingLoss: value }),
  setTestingLoss: (value: number) => set({ testingLoss: value }),
  setSavedInfo: (value: string) => set({ savedInfo: value }),
  setLoader: (data: LoaderType) => set({ loader: data }),
}));
