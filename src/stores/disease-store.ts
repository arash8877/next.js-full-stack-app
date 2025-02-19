import { create } from "zustand";

interface DiseaseStore {
  selectedinclusionCriteria: string[];
  selectedexclusionCriteria: string[];
  setSelectedinclusionCriteria: (diseases: string[]) => void;
  setSelectedexclusionCriteria: (diseases: string[]) => void;
  setUserinclusionCriteria: (diseases: string[]) => void;
  setUserexclusionCriteria: (diseases: string[]) => void;
  resetDiseases: () => void;
}

const useDiseaseStore = create<DiseaseStore>((set) => ({
  selectedinclusionCriteria: [],
  selectedexclusionCriteria: [],
  setSelectedinclusionCriteria: (diseases) =>
    set({ selectedinclusionCriteria: diseases }),
  setSelectedexclusionCriteria: (diseases) =>
    set({ selectedexclusionCriteria: diseases }),
  setUserinclusionCriteria: (diseases) =>
    set({ selectedinclusionCriteria: diseases }),
  setUserexclusionCriteria: (diseases) =>
    set({ selectedexclusionCriteria: diseases }),
  resetDiseases: () =>
    set({ selectedinclusionCriteria: [], selectedexclusionCriteria: [] }),
}));

export default useDiseaseStore;
