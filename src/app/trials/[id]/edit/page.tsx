"use client";

import { useState, useEffect } from "react";
// import TrialForm from "@/components/TrialForm";
//import { iTrialInfoProps } from "@/types";
import { SidebarLayout } from "@/components/SidebarLayout";
import useGetSingleTrialInfo from "@/hooks/useGetSingleTrialInfo";
import EditTrialTitleTab from "@/components/EditTrialTitleTab";
import EditTrialSiteTab from "@/components/EditTrialSiteTab";
import EditTrialTimeTab from "@/components/EditTrialTimeTab";
// import EditTrialMedicalTab  from "@/components/EditTrialMedicalTab";
import useLanguageStore from "@/stores/language-store";
import useGetAllMedicalCategories from "@/hooks/useGetAllMedicalCategories";


type Props = {
  params: { id: string };
};

//------------------------------- main function ----------------------------------------------
export default function EditTrialPage({ params }: Props) {
  console.log("params", params);
  const { trialData } = useGetSingleTrialInfo(params.id);
  const [currentTab, setCurrentTab] = useState<string>("1");
  const { l } = useLanguageStore();


  const { categoriesData } = useGetAllMedicalCategories();

  console.log("categoriesData:", categoriesData)
  console.log("trialData:", trialData)

  //------ tabs array ------
  // eslint-disable-next-line
  const tabs = [
    {
      id: "1",
      tabTitle: "first Tab",
      content: <EditTrialTitleTab {...trialData} />,
    },
    {
      id: "2",
      tabTitle: "Second Tab",
      content: <EditTrialSiteTab {...trialData}/>,
    },
    {
      id: "3",
      tabTitle: "Third Tab",
      content: <EditTrialTimeTab {...trialData}/>,
    },
    // {
    //   id: "4",
    //   tabTitle: "Fourth Tab",
    //   content: <EditTrialMedicalTab 
    //   {...trialData} 
    //   inclusionDisease={Array.isArray(trialData.inclusionDiseases) ? trialData.inclusionDiseases : []} 
    //   exclusionDisease={Array.isArray(trialData.exclusionDiseases) ? trialData.exclusionDiseases : []} 
    //   selectedMedicalCategories={Array.isArray(trialData.medicalCategories) ? trialData.medicalCategories : []} 
    //   />,
    // },
    // {
    //   id: "5",
    //   content: <EditTrialMorInfoTab />,
    // },
  ];

  useEffect(() => {
    console.log(trialData);
  }, [trialData]);

  //------ handle tab click ------
  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab((e.target as HTMLButtonElement).id);
  };
  //------------------------------- JSX ----------------------------------------------
  return (
    <SidebarLayout>
      {/* <TrialForm {...trialData} /> */}
      <div className="flex flex-col bg-white rounded-3xl py-8	mt-8">
        <div className="w-full px-8 ">
          <div className="grid grid-cols-2 md:flex pb-4 w-full gap-x-20 gap-y-6 md:gap-12  ">
            <button
              id="1"
              disabled={currentTab === "1"}
              onClick={handleTabClick}
              className={`cursor-pointer w-full disabled:cursor-not-allowed py-2 text-sm md:text-base ${
                currentTab === "1"
                  ? "text-primary-1000 border-b-2 border-primary-800"
                  : "text-primary-900"
              }`}
            >
              {l("settings.tab1.name") || "Title"}
            </button>
            <button
              id="2"
              disabled={currentTab === "2"}
              onClick={handleTabClick}
              className={`cursor-pointer w-full disabled:cursor-not-allowed py-2 text-sm md:text-base ${
                currentTab === "2"
                  ? "text-primary-1000 border-b-2 border-primary-800"
                  : "text-primary-900"
              }`}
            >
              {l("settings.tab2.name") || "Site"}
            </button>
            <button
              id="3"
              disabled={currentTab === "3"}
              onClick={handleTabClick}
              className={`cursor-pointer w-full disabled:cursor-not-allowed py-2 text-sm md:text-base ${
                currentTab === "3"
                  ? "text-primary-1000 border-b-2 border-primary-800"
                  : "text-primary-900"
              }`}
            >
              {l("settings.tab3.name") || "Time"}
            </button>
            <button
              id="4"
              disabled={currentTab === "4"}
              onClick={handleTabClick}
              className={`cursor-pointer w-full disabled:cursor-not-allowed py-2 text-sm md:text-base ${
                currentTab === "4"
                  ? "text-primary-1000 border-b-2 border-primary-800"
                  : "text-primary-900"
              }`}
            >
              {l("settings.tab4.name") || "Medical Info"}
            </button>
            <button
              id="5"
              disabled={currentTab === "5"}
              onClick={handleTabClick}
              className={`cursor-pointer w-full disabled:cursor-not-allowed py-2 text-sm md:text-base ${
                currentTab === "5"
                  ? "text-primary-1000 border-b-2 border-primary-800"
                  : "text-primary-900"
              }`}
            >
              {l("settings.tab4.name") || "More Info"}
            </button>
          </div>
        </div>

        {tabs.map((tab) => (
          <div className="px-8" key={tab.id}>
            {currentTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </SidebarLayout>
  );
}
