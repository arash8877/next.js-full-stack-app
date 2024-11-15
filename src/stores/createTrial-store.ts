import { create } from "zustand";

interface FormData {
  step1Data: {
    title: string;
    shortDescription: string;
    fullDescription: string;
  };
  step2Data: {
    sites: {
      location: string;
      address: string;
      zipCode: string;
      country: string;
    }[];
  };
  step3Data: {
    startDate: string;
    endDate: string;
    deadline: string;
    ageMin: number;
    ageMax?: number;
    gender: string;
  };
  step4Data: {
    inclusionDisease: [];
    inclusionRequirements: string;
    exclusionDisease: [];
    exclusionRequirements: string;
    medicalCategories: [];
  };
  step5Data: {
   participantActivities: string;
   expectedBenefits: string;
   additionalInfo: string;
   drivingCompensation: boolean;
   monetaryCompensation: boolean;
   otherCompensation: string;
  };
}

interface FormStore {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
}

const useCreateTrialStore = create<FormStore>((set) => ({
  formData: {
    step1Data: { title: "", shortDescription: "", fullDescription: "" },
    step2Data: { sites: [{ location: "", address: "", zipCode: "", country: "" }] },
    step3Data: { startDate: "", endDate: "", deadline: "", ageMin: 0, gender: "" },
    step4Data: { inclusionDisease: [], inclusionRequirements: "", exclusionDisease: [], exclusionRequirements: "", medicalCategories: [] },
    step5Data: { participantActivities: "", expectedBenefits: "", additionalInfo: "", drivingCompensation: false, monetaryCompensation: false, otherCompensation: "" },
  },
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  resetFormData: () => set({
    formData: {
      step1Data: { title: "", shortDescription: "", fullDescription: "" },
      step2Data: { sites: [{ location: "", address: "", zipCode: "", country: "" }] },
      step3Data: { startDate: "", endDate: "", deadline: "", ageMin: 0, gender: "" },
      step4Data: { inclusionDisease: [], inclusionRequirements: "", exclusionDisease: [], exclusionRequirements: "", medicalCategories: [] },
      step5Data: { participantActivities: "", expectedBenefits: "", additionalInfo: "", drivingCompensation: false, monetaryCompensation: false, otherCompensation: "" },
    },
  }),
}));

export default useCreateTrialStore;
