import { create } from "zustand";
import { merge } from "lodash";
//import { persist, createJSONStorage } from "zustand/middleware";


//--------- interface -------
interface FormData {
  step1Data: {
    title: string;
    shortDescription: string;
    fullDescription: string;
  };
  step2Data: {
    trialSites: {
      name: string;
      address: string;
      zipCode: string;
      country: string;
    }[];
  };
  step3Data: {
    startDate: string;
    endDate: string;
    deadline: string;
    ageMin: string;
    ageMax?: string;
    gender: string;
  };
  step4Data: {
    inclusionDiseases?: string[];
    inclusionRequirements?: string;
    exclusionDiseases?: string[];
    exclusionRequirements?: string;
    medicalCategoryNames?: string[];
    medicalCategoryIds?: number[];
  };
  step5Data: {
    participantActivities: string;
    expectedParticipants: string;
    additionalInformation: string;
    drivingCompensation?: boolean;
    monetaryCompensation?: boolean;
    otherCompensation?: boolean;
    otherCompensationText?: string;
  };
}

interface FormStore {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
}


//--------------------------- main function ------------------------------------
const useCreateTrialStore = create<FormStore>((set) => ({
  formData: {
    step1Data: { title: "", shortDescription: "", fullDescription: "" },
    step2Data: {
      trialSites: [{ name: "", address: "", zipCode: "", country: "" }],
    },
    step3Data: {
      startDate: "",
      endDate: "",
      deadline: "",
      ageMin: "",
      ageMax: "",
      gender: "",
    },
    step4Data: {
      inclusionDiseases: [],
      inclusionRequirements: "",
      exclusionDiseases: [],
      exclusionRequirements: "",
      medicalCategories: [],
    },
    step5Data: {
      participantActivities: "",
      expectedParticipants: "",
      additionalInformation: "",
      drivingCompensation: false,
      monetaryCompensation: false,
      otherCompensation: false,
      otherCompensationText: "",
    },
  },

  setFormData: (data) =>
    set((state) => ({
      formData: merge({}, state.formData, data),
    })),

    //---------- reset form data ------------
  resetFormData: () =>
    set({
      formData: {
        step1Data: { title: "", shortDescription: "", fullDescription: "" },
        step2Data: {
          trialSites: [{ name: "", address: "", zipCode: "", country: "" }],
        },
        step3Data: {
          startDate: "",
          endDate: "",
          deadline: "",
          ageMin: "",
          ageMax: "",
          gender: "",
        },
        step4Data: {
          inclusionDiseases: [],
          inclusionRequirements: "",
          exclusionDiseases: [],
          exclusionRequirements: "",
          medicalCategoryNames: [],
          medicalCategoryIds: [],
        },
        step5Data: {
          participantActivities: "",
          expectedParticipants: "",
          additionalInformation: "",
          drivingCompensation: false,
          monetaryCompensation: false,
          otherCompensation: false,
          otherCompensationText: "",
        },
      },
    }),
}));


export default useCreateTrialStore;
