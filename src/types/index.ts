import { MouseEventHandler } from "react";
import { FormikProps } from "formik";

//------------- CustomButton ---------------------
export interface CustomButtonProps {
  title: string | JSX.Element;
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

export interface SponsorUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  hasConsentedToMarketing: boolean;
  preferredLanguage: string;
  lastLogin: string;
  sponsor: CompanyInfoProps | null;
}

//------- RegisterStep1Form --------
export interface sponsorContact {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  lastLogin: string;
}

export interface CompanyInfoProps {
  name: string;
  vatNumber: string;
  address: string;
  zipCode: string;
  country: string;
  sponsorContacts: sponsorContact[];
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
  isAdmin: boolean;
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
  media: iMediaProps;
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
  applicationCount: number;
  title: string;
  summary: string;
  shortDescription?: string;
  urlStub: string;
  startDate: string;
  endDate: string;
  address: string | undefined;
  submissionDeadline?: string;
  media?: iMediaProps;
  userApplication?: iUserTrialApplication | null;
  approvedAt?: string;
  publishedAt?: string;
  referred?: boolean;
  declined?: boolean;
  medicalCategories?: iCategoryProps[][];
  inclusionCriteria?: string[];
  applicantsNumber?: number;
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
}

//------------------trialDetails-----------------------
export interface iTrialInfoProps {
  trialId: number;
  applicationCount: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  summary?: string;
  urlStub: string;
  // company: iCompany;
  sites: iTrialSite[];
  media: iMediaProps;
  minimumAge: string;
  maximumAge: string;
  biologicalSex: string;
  isRecruiting: boolean;
  isPublished?: boolean;
  approvedAt: string;
  publishedAt: string;
  referred: boolean;
  declined: boolean;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  isCompleted: boolean;
  userApplication?: iUserTrialApplication | null;
  diseases: string[];
  applicantsNumber: number;
  recruitingStatus: string;
  expectedParticipants: string;
  inclusionCriteria?: string[];
  conditionOfInterest?: string;
  exclusionCriteria?: string[];
  exclusionCondition?: string;
  medicalCategories?: iTrialCategoryProps[];
  activities?: string;
  additionalInformation?: string;
  drivingCompensation?: boolean;
  monetaryCompensation?: boolean;
  otherCompensation?: boolean;
  otherCompensationText?: string;
}

export interface iTrialApplicationsInfo {
  applicationId: number;
  unlocked: boolean;
  user: iTrialApplicationsUserInfo;
  userMessage: string;
}

export interface iTrialApplicationsUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  biologicalSex: string;
  isRecruiting: boolean;
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
export interface CreateTrialTitleStepProps {
  trialId?: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
}

export interface CreateTrialStep1FormProps {
  label: string;
  name: keyof CreateTrialTitleStepProps;
  id: string;
  type: string;
  placeholder: string;
  formik: FormikProps<CreateTrialTitleStepProps>;
  icon?: string;
}

export interface SiteFormValues {
  name: string;
  address: string;
  zipCode: string;
  country: string;
}

export interface CreateTrialStep2FormValues {
  selectedSites: SiteFormValues[];
  enteredSites: SiteFormValues[];
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
  trialId?: number;
  inclusionCriteria?: string[];
  conditionOfInterest?: string;
  exclusionCriteria?: string[];
  exclusionCondition?: string;
  //selectedMedicalCategories: iCategoryProps[];
  medicalCategories?: iCategoryProps[];
}

export interface CreateTrialStep5FormProps {
  trialId?: number;
  activities?: string;
  expectedParticipants: string;
  additionalInformation?: string;
  isRecruiting: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  drivingCompensation?: boolean;
  monetaryCompensation?: boolean;
  otherCompensation?: boolean;
  otherCompensationText?: string;
}

export interface EditTrialMoreInfoTabProps {
  trialId: number;
  activities: string;
  expectedParticipants: string;
  additionalInformation: string;
  compensations: [boolean, boolean, boolean, string];
}

//------------------------------ Employees ----------------------------
export interface employeesInfoProps {
  userId: number;
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
  invoiceId: string;
  invoiceAmount: number;
  paymentDueDate: string;
  isPaid: boolean;
  invoiceLines: invoiceLineInfoProps[];
}

export interface invoiceLineInfoProps {
  lineText: string;
  lineAmount: number;
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
  pageSize: number;
  pageIndex: number;
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
    stateText: "Processing",
    stateKey: "trialdetails.applicationstate.Processing",
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

//----------------------- Pagination -------------------
export interface CustomPaginationProps {
  trialsPerPage: number;
  totalPages: number;
  pageIndex: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

//-------------------------  ----------------------------
