import {create} from 'zustand';

interface DiseaseStore {
  selectedInclusionDiseases: string[];
  selectedExclusionDiseases: string[];
  setSelectedInclusionDiseases: (diseases: string[]) => void;
  setSelectedExclusionDiseases: (diseases: string[]) => void;
  setUserInclusionDiseases: (diseases: string[]) => void;
  setUserExclusionDiseases: (diseases: string[]) => void;
  resetDiseases: () => void;
}

const useDiseaseStore = create<DiseaseStore>((set) => ({
  selectedInclusionDiseases: [],
  selectedExclusionDiseases: [],
  setSelectedInclusionDiseases: (diseases) => set({ selectedInclusionDiseases: diseases }),
  setSelectedExclusionDiseases: (diseases) => set({ selectedExclusionDiseases: diseases }),
  setUserInclusionDiseases: (diseases) => set({ selectedInclusionDiseases: diseases }),
  setUserExclusionDiseases: (diseases) => set({ selectedExclusionDiseases: diseases }),
  resetDiseases: () => set({ selectedInclusionDiseases: [], selectedExclusionDiseases: [] }),
}));

export default useDiseaseStore;