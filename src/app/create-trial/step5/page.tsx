"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CreateTrialStepper from "@/components/CreateTrialStepper";
import CreateTrialStep5Form from "@/components/CreateTrialStep5Form";
import useLanguageStore from "@/stores/language-store";

export default function CreateTrialStep4Page() {
  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Create Trial"}
      </h1>
      <div className="flex flex-col bg-white rounded-3xl py-8	border border-bgColor-10">
        <CreateTrialStepper activeStep={4} />
        <h3 className="text-lg font-medium text-center px-6 mt-12">
          {
            //l("settings.title") ||
            "In this step your are able to add more info about the trial"
          }
        </h3>
        <CreateTrialStep5Form />
      </div>
    </SidebarLayout>
  );
}
