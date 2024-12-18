"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CreateTrialStepper from "@/components/CreateTrialStepper";
import CreateTrialStep2Form from "@/components/CreateTrialStep2Form";
import useLanguageStore from "@/stores/language-store";

export default function CreateTrialStep2Page() {
  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <div className="sm:sticky top-0 bg-white sm:pt-11">
        <h1 className="text-2xl font-semibold sm:text-3xl mb-4 sm:mb-[52px]">
          {l("settings.title") || "Create Trial"}
        </h1>
      </div>
      <div className="flex flex-col bg-white rounded-3xl border border-bgColor-10 shadow-lg py-8 sm:pb-0">
        <CreateTrialStepper activeStep={1} />
        <h3 className="text-lg font-medium text-center px-6 mt-12">
          {
            //l("settings.title") ||
            "Please enter location where the trial will be conducted"
          }
        </h3>
        <CreateTrialStep2Form />
      </div>
    </SidebarLayout>
  );
}
