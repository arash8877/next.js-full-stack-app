"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import TrialForm from "@/components/TrialForm";
import useGetSingleTrialInfo from "@/hooks/useGetSingleTrialInfo";
import { iTrialInfoProps } from "@/types";
console.log(useGetSingleTrialInfo);



//--------------------------- main function ---------------------------            
export default function TrialPage() {
  //const { trialData } = useGetSingleTrialInfo();

  const trialData: iTrialInfoProps = {
    trialId: 0,
    title: "New Trial",
    shortDescription: "This is a short description of the new trial.",
    fullDescription: "This is a full description of the new trial.",
    urlStub: "new-trial",
    trialSite: null,
    ageMin: 18,
    ageMax: 65,
    gender: "any",
    approvedOn: new Date().toISOString(),
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    submissionDeadline: new Date().toISOString(),
    isCompleted: false,
    applicantsNumber: 0,
    recruitingStatus: "open",
    medicalCategories: [],
    media: {
      name: "Trial Image",
      filePath: "/path/to/image.jpg",
      description: "Image description",
      alt: "Image alt text",
    },
    userApplication: null,
    diseases: [],
  };

  //-------------------------- JSX --------------------------
  return (
    <SidebarLayout>
      <TrialForm {...trialData} />
    </SidebarLayout>
  );
}
