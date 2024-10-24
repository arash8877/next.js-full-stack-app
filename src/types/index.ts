import { MouseEventHandler } from "react";
import { FormikProps } from "formik";

//------------- CustomButton ---------------------
export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon?: string;
  disabled?: boolean;
  disabledTitle?: string;
  disabledContainerStyles?: string;
  isStable?: boolean;
}

//------------- LanguageDropdown ---------------------
// interface iLanguage {
//   code: string;
//   name: string;
//   nickname: string;
//   flag: string;
// }

//--------------------------- Register ------------------------------
export interface RegisterNavbarProps {
  justify?: string;
  items?: string;
  displayLogo?: string;
  displayCompanyName?: string;
  displayLogin?: string;
}

//------- RegisterStep1Form --------
export interface CompanyInfoProps {
  sponsorName: string;
  vatNumber: string;
  address: string;
  zipCode: string;
  country: string;
  // consentedToTerms: boolean;
}

export interface Step1FormProps {
  label: string;
  name: keyof CompanyInfoProps;
  type: string;
  placeholder: string;
  formik: FormikProps<CompanyInfoProps>;
  icon?: string;
}

//------- RegisterStep2Form --------
export interface Step2FormValues {
  firstName: string;
  lastName: string;
  jobTitle: string;
  phoneNumber: string;
  email: string;
  password: string;
  repeatedPassword: string;
  consentedToTerms: boolean;
  hasConsentedToMarketing: boolean;
}

export interface Step2FormProps {
  label: string;
  name: keyof Step2FormValues;
  type: string;
  placeholder: string;
  formik: FormikProps<Step2FormValues>;
  icon?: string;
}

//-------------------- user ----------------------------------

export interface iUserProps {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  phoneNumber: string;
  consentedToTerms: boolean;
  hasConsentedToMarketing: boolean;
  preferredLanguage: string;
}

export interface iUserUpdateProps {
  password?: string;
  repeatedPassword?: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email?: string;
}

//-----------------------------------------------------------

export interface iMedicalCategory {
  medicalCategoryId: iCategoryProps;
  optionalText: string;
  userMedicalCategoryId: number;
}

export interface iMediaProps {
  name: string;
  filePath: string;
  description: string;
  alt: string;
}

export interface iCategoryProps {
  medicalCategoryId?: number;
  name: string;
  description: string;
  media: iMediaProps;
}

export interface iTrialCategoryProps {
  medicalCategory: iCategoryProps;
}

export interface iUserType {
  email: string;
  HealthInfo: {
    categories: string[];
    other: string;
  };
}

//--------------- trialCard -------------------------
export interface iTrialCardProps {
  trialId: number;
  title: string;
  shortDescription: string;
  urlStub: string;
  startDate: string;
  endDate: string;
  address: string | undefined;
  submissionDeadline: string;
  media: iMediaProps;
  userApplication: iUserTrialApplication | null;
  medicalCategories: iTrialCategoryProps[];
  diseases: string[];
  //medicalCategories: iCategoryProps[];
  // imageSrc: string;
  // underReview?: boolean;
}

//------------------ company -------------------------
export interface iCompany {
  companyId: number;
  name: string;
  address: string;
  country: string;
  zipCode: string;
}

//------------------- site ---------------------------
export interface iTrialSite {
  trialSiteId: number;
  name: string;
  address: string | undefined;
  zipCode: string;
  country: string;
  iconUrl: string;
  siteInfo: string;
  location: string;
}

//------------------trialDetails-----------------------
export interface iTrialInfoProps {
  trialId: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  urlStub: string;
  // company: iCompany;
  trialSite: iTrialSite | null;
  medicalCategories: iTrialCategoryProps[];
  media: iMediaProps;
  ageMin: number;
  ageMax: number;
  gender: string;
  approvedOn: string;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  isCompleted: boolean;
  userApplication: iUserTrialApplication | null;
  diseases: string[];
  applicantsNumber: number;
  recruitingStatus: string;
}

//--------------- application -------------------------
export interface iApplicationStateProps {
  stateId: number;
  state: number;
  description: null;
}

export interface iUserTrialApplication {
  applicationId: number;
  applicationStates: iApplicationStateProps[];
  userMessage: string | null;
}

export interface iPaginationProps {
  maxPageResult: number;
  pageIndex: number;
}

export interface iApplicationProps {
  applicationId: number;
  applicationStates: iApplicationStateProps[];
  trial: iTrialInfoProps;
  userMessage: string;
}

// ------------------ create-trial ------------------------
export interface CreateTrialCompanyInfoProps {
  title: string;
  shortDescription: string;
  fullDescription: string;
}

export interface CreateTrialStep1FormProps {
  label: string;
  name: keyof CreateTrialCompanyInfoProps;
  id: string;
  type: string;
  placeholder: string;
  formik: FormikProps<CreateTrialCompanyInfoProps>;
  icon?: string;
}

export interface SiteFormValues {
  location: string;
  address: string;
  zipCode: string;
  country: string;
}

export interface CreateTrialStep2FormValues {
  sites: SiteFormValues[];
}

export interface CreateTrialStep2FormProps {
  label: string;
  name: keyof SiteFormValues;
  type: string;
  placeholder: string;
  formik: FormikProps<CreateTrialStep2FormValues>;
  icon?: string;
}

export interface CreateTrialStep3FormValues {
  startDate: string;
  endDate: string;
  deadline: string;
  ageStart: number;
  ageEnd: number;
  gender: string;
}

export interface CreateTrialStep4FormProps {
  inclusionDisease: string[];
  inclusionRequirements: string;
  exclusionDisease: string[];
  exclusionRequirements: string;
  selectedMedicalCategories:[];
}

export interface CreateTrialStep5FormProps {
  participantActivities: string;  
  expectedParticipants: number | null;
  additionalInfo: string;
  drivingCompensation: boolean; 
  monetaryCompensation: boolean
  otherCompensation: string;
}

//------------------------------ Employees ----------------------------
export interface employeesInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: string;
}

//------- Invite Employee Form --------
export interface InviteEmployeeFormValues {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
}

export interface InviteEmployeeFormProps {
  label: string;
  name: keyof InviteEmployeeFormValues;
  type: string;
  placeholder: string;
  formik: FormikProps<InviteEmployeeFormValues>;
  icon?: string;
}

//--------------------------- Invoices --------------------------
export interface invoicesInfoProps {
  invNumber: string;
  amount: string;
  isPaid: boolean;
}

//------- Applicants --------
export interface applicantsInfoProps {
  applicantsNumber: number;
  firstName: string;
  lastName: string;
  age: string;
  zipCode: string;
  country: string;
}

//------------------------- filtering ----------------------------
export interface iTrialFilteringProps {
  searchValue: string | null;
  medicalCategories: number[] | null;
  filterByIsRecruiting: boolean | null;
  filterBySoonRecruiting: boolean | null;
  showExpiredTrials: boolean | null;
  submissionDeadlineSortDirection: string | null;
  pagination: iPaginationProps;
}

export interface iTrialFilterBarProps {
  defaultFilterValues: iTrialFilteringProps;
  onFilterChange: (filters: iTrialFilteringProps) => void;
}

//------------------ applicationStates -----------------

interface iApplicationStateLayoutProps {
  icon: string;
  stateText: string;
  stateKey: string;
  color: string;
}

export const applicationStates: {
  [key: number]: iApplicationStateLayoutProps;
} = {
  1: {
    icon: "/Awaiting.png",
    stateText: "Pending",
    stateKey: "trialdetails.applicationstate.pending",
    color: "#FFEBB9",
  },
  2: {
    icon: "/in-process.png",
    stateText: "Processesing",
    stateKey: "trialdetails.applicationstate.processesing",
    color: "#CCCCCC",
  },
  3: {
    icon: "/approved.png",
    stateText: "Approved",
    stateKey: "trialdetails.applicationstate.approved",
    color: "#B5E6B2",
  },
  4: {
    icon: "/not-approved.png",
    stateText: "Declined",
    stateKey: "trialdetails.applicationstate.declined",
    color: "#F47F7F",
  },
};

//-------------------------  ----------------------------
