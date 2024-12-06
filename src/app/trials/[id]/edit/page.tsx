"use client";

import { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import useGetSingleTrialInfo from "@/hooks/useGetSingleTrialInfo";
import EditTrialTitleTab from "@/components/EditTrialTitleTab";
import EditTrialSiteTab from "@/components/EditTrialSiteTab";
import EditTrialTimeTab from "@/components/EditTrialTimeTab";
import EditTrialMoreInfoTab from "@/components/EditTrialMoreInfoTab";
import EditTrialMedicalTab from "@/components/EditTrialMedicalTab";
import CustomButton from "@/components/CustomButton";
import DeleteTrialModal from "@/components/DeleteTrialModal";
import useLanguageStore from "@/stores/language-store";

type Props = {
  params: { id: string };
};

//------------------------------- main function ----------------------------------------------
export default function EditTrialPage({ params }: Props) {
  console.log("params", params);
  const { trialData } = useGetSingleTrialInfo(params.id);
  const [currentTab, setCurrentTab] = useState<string>("1");
  const { l } = useLanguageStore();

  // console.log("searchParams:", searchParams);

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
      content: <EditTrialSiteTab {...trialData} />,
    },
    {
      id: "3",
      tabTitle: "Third Tab",
      content: <EditTrialTimeTab {...trialData} />,
    },
    {
      id: "4",
      tabTitle: "Fourth Tab",
      content: (
        <EditTrialMedicalTab
          {...{
            trialId: trialData?.trialId,
            inclusionDiseases: trialData?.inclusionDiseases,
            exclusionDiseases: trialData?.exclusionDiseases,
            inclusionRequirements: trialData?.inclusionRequirements,
            exclusionRequirements: trialData?.exclusionRequirements,
            medicalCategories: trialData?.medicalCategories?.map((category) => {
              return category.medicalCategory;
            }),
          }}
        />
      ),
    },
    {
      id: "5",
      tabTitle: "Fifth Tab",
      content: <EditTrialMoreInfoTab {...trialData} />,
    },
  ];

  useEffect(() => {
    console.log(trialData);
  }, [trialData]);

  //------ handle tab click ------
  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab((e.target as HTMLButtonElement).id);
  };

  //--- open/close modal ----
  const [isDeleteTrialModalOpen, setIsDeleteTrialModalOpen] = useState(false);

  function handleOpenDeleteTrialModal() {
    setIsDeleteTrialModalOpen(!isDeleteTrialModalOpen);
  }

  function closeDeleteTrialModal() {
    setIsDeleteTrialModalOpen(false);
  }

  //------------------------------- JSX ----------------------------------------------
  return (
    <SidebarLayout>
      <div className="flex flex-col justify-between gap-3 md:flex-row lg:gap-4 mb-8">
        <h1 className="text-2xl font-semibold sm:text-3xl md:mb-[34px]">
          {l("settings.title") || "Edit Trial"}
        </h1>
        <div className="md:flex gap-4 py-[6px] justify-between h-[56px] md:col-span-2 md:col-start-3">
          <div className="md:flex gap-4">
            <div className="flex_center rounded-lg py-[6px] h-[44px] bg-bgColor-red text-white cursor-pointer">
              <CustomButton
                title={l("settings.tab3.btn.text") || "Delete Trial"}
                containerStyles="bg-bgColor-red rounded-lg"
                textStyles="text-white"
                handleClick={handleOpenDeleteTrialModal}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white rounded-3xl wrapper4 border border-bgColor-10">
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
        <div>
          <div>
            {tabs.map((tab) => (
              <div key={tab.id}>
                {currentTab === tab.id && tab.content}
              </div>
            ))}
          </div>
        </div>
      </div>
      <DeleteTrialModal
        trialId={Number(params.id)}
        open={isDeleteTrialModalOpen}
        onClose={closeDeleteTrialModal}
      />
    </SidebarLayout>
  );
}
