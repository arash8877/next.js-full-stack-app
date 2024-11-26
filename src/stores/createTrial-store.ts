import { create } from "zustand";
import { merge } from "lodash";
//import { persist, createJSONStorage } from "zustand/middleware";
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
    ageMin: string;
    ageMax?: string;
    gender: string;
  };
  step4Data: {
    inclusionDiseases?: string[];
    inclusionRequirements?: string;
    exclusionDiseases?: string[];
    exclusionRequirements?: string;
    medicalCategories?: number[];
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

const useCreateTrialStore = create<FormStore>((set) => ({
  formData: {
    step1Data: { title: "", shortDescription: "", fullDescription: "" },
    step2Data: {
      sites: [{ location: "", address: "", zipCode: "", country: "" }],
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

  resetFormData: () =>
    set({
      formData: {
        step1Data: { title: "", shortDescription: "", fullDescription: "" },
        step2Data: {
          sites: [{ location: "", address: "", zipCode: "", country: "" }],
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
    }),
}));

// const useCreateTrialStore = create<FormStore>()(
//   persist(
//     (set) => ({
//       formData: {
//         step1Data: { title: "", shortDescription: "", fullDescription: "" },
//       },

//       setFormData: (data) =>
//         set((state) => ({
//           formData: { ...state.formData, ...data },
//         })),

//       resetFormData: () =>
//         set({
//           formData: {
//             step1Data: { title: "", shortDescription: "", fullDescription: "" },
//           },
//         }),
//     }),
//     {
//       name: "create-trial-store-step1",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

export default useCreateTrialStore;
