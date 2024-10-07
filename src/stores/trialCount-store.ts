import {create} from "zustand";

interface MyTrialsState {
  trialsCount: number;
  setTrialsCount: (count: number) => void;
  getTrialsCount: () => number;
}

export const useMyTrialsStore = create<MyTrialsState>((set, get) => ({
  trialsCount: 0,
  setTrialsCount: (count) => set({ trialsCount: count }),
  getTrialsCount: () => get().trialsCount
}));
