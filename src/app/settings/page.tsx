"use client";

import { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import SettingTabUserInfo from "@/components/SettingTabUserInfo";
import SettingTabNotification from "@/components/SettingTabNotification";
import SettingTabDeleteUser from "@/components/SettingTabDeleteUser";
import useLanguageStore from "@/stores/language-store";

//------------------------------- main function ----------------------------------------------
export default function SettingsPage() {
  const { userData } = useGetUserInfo();
  const [currentTab, setCurrentTab] = useState<string>("1");
  const { l } = useLanguageStore();

  //------ tabs array ------
  const tabs = [
    {
      id: "1",
      tabTitle: "first Tab",
      content: <SettingTabUserInfo {...userData} />,
    },
    {
      id: "2",
      tabTitle: "Second Tab",
      content: <SettingTabNotification />,
    },
    {
      id: "3",
      tabTitle: "Third Tab",
      content: <SettingTabDeleteUser />,
    },
    // {
    //   id: "14",
    //   content: <SettingTabMedical />,
    // },
  ];

  //------ handle tab click ------
  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab((e.target as HTMLButtonElement).id);
  };

  //------------------------------- JSX ----------------------------------------------
  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Settings"}
      </h1>
      <div className="flex flex-col bg-white rounded-3xl py-8	">
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
              {l("settings.tab1.name") || "User Info"}
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
              {l("settings.tab2.name") || "Notifications"}
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
              {l("settings.tab3.name") || "Delete User"}
            </button>
            {/* <button
              id="4"
              disabled={currentTab === "4"}
              onClick={handleTabClick}
              className={`cursor-pointer w-full disabled:cursor-not-allowed py-2 text-sm md:text-base ${
                currentTab === "4"
                  ? "text-primary-1000 border-b-2 border-primary-800"
                  : "text-primary-900"
              }`}
            >
              {l("settings.tab4.name") || "Fourth Tab"}
            </button> */}
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
