import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { merge } from "lodash";

//---- interface ----
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

//---------------------------- main function ------------------------------
const useCreateTrialStore = create<FormStore>()(
  persist(
    (set) => ({
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

      //---- setFormData ----
      setFormData: (data) =>
        set((state) => ({
          formData: merge({}, state.formData, data),
        })),

      //---- reset FormData ----
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
    }),
    {
      name: "create-trial-store", // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

export default useCreateTrialStore;
