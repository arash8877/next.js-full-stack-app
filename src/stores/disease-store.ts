import {create} from 'zustand';

interface DiseaseStore {
  selectedDiseases: string[];
  setSelectedDiseases: (diseases: string[]) => void;
  setUserDiseases: (diseases: string[]) => void;
}

const useDiseaseStore = create<DiseaseStore>((set) => ({
  selectedDiseases: [],
  setSelectedDiseases: (diseases) => set({ selectedDiseases: diseases }),
  setUserDiseases: (diseases) => set({ selectedDiseases: diseases }),
}));

export default useDiseaseStore;