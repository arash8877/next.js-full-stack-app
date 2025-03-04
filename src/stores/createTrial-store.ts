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
    enteredSites: {
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
    minimumAge: string;
    maximumAge?: string;
    biologicalSex: string;
  };
  step4Data: {
    inclusionCriteria?: string[];
    conditionOfInterest?: string;
    exclusionCriteria?: string[];
    exclusionCondition?: string;
    medicalCategoryNames?: string[];
    medicalCategoryIds?: number[];
  };
  step5Data: {
    activities: string;
    expectedParticipants: string;
    additionalInformation: string;
    isRecruiting: boolean;
    isPublished: boolean;
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

//--- remove "create-trial-store" from localStorage after 2 hours ---
const scheduleLocalStorageCleanup = () => {
  const storedTimeKey = "create-trial-store-timestamp";
  const currentTime = Date.now();

  const storedTimestamp = localStorage.getItem(storedTimeKey);

  // If there's no timestamp, set one now
  if (!storedTimestamp) {
    localStorage.setItem(storedTimeKey, currentTime.toString());
  } else {
    const elapsedTime = currentTime - parseInt(storedTimestamp, 10);
    const twoHoursInMs = 2 * 60 * 60 * 1000;

    if (elapsedTime >= twoHoursInMs) {
      localStorage.removeItem("create-trial-store");
      localStorage.removeItem(storedTimeKey);
    }
  }

  setTimeout(() => {
    localStorage.removeItem("create-trial-store");
    localStorage.removeItem(storedTimeKey);
  }, 2 * 60 * 60 * 1000);
};

//----------------------------------------- main function -------------------------------------------
const useCreateTrialStore = create<FormStore>()(
  persist(
  (set) => ({
    formData: {
      step1Data: { title: "", shortDescription: "", fullDescription: "" },
      step2Data: {
        enteredSites: [],
      },
      step3Data: {
        startDate: "",
        endDate: "",
        deadline: "",
        minimumAge: "",
        maximumAge: "",
        biologicalSex: "",
      },
      step4Data: {
        inclusionCriteria: [],
        conditionOfInterest: "",
        exclusionCriteria: [],
        exclusionCondition: "",
        medicalCategoryNames: [],
        medicalCategoryIds: [],
      },
      step5Data: {
        activities: "",
        expectedParticipants: "",
        additionalInformation: "",
        isRecruiting: false,
        isPublished: false,
        drivingCompensation: false,
        monetaryCompensation: false,
        otherCompensation: false,
        otherCompensationText: "",
      },
    },

    //---- setFormData ----
    setFormData: (data) => {
      console.log("data", data);
      set((state) => ({
        formData: merge({}, state.formData, data),
      }));
    },

    //---- reset FormData ----
    resetFormData: () =>
      set({
        formData: {
          step1Data: { title: "", shortDescription: "", fullDescription: "" },
          step2Data: {
            enteredSites: [{ name: "", address: "", zipCode: "", country: "" }],
          },
          step3Data: {
            startDate: "",
            endDate: "",
            deadline: "",
            minimumAge: "",
            maximumAge: "",
            biologicalSex: "",
          },
          step4Data: {
            inclusionCriteria: [],
            conditionOfInterest: "",
            exclusionCriteria: [],
            exclusionCondition: "",
            medicalCategoryNames: [],
            medicalCategoryIds: [],
          },
          step5Data: {
            activities: "",
            expectedParticipants: "",
            additionalInformation: "",
            isRecruiting: false,
            isPublished: false,
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
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => {
      scheduleLocalStorageCleanup();
    },
  }
  )
);

export default useCreateTrialStore;
