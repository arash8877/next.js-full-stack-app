"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CreateTrialStepper from "@/components/CreateTrialStepper";
import useLanguageStore from "@/stores/language-store";
import CreateTrialStep6Form from "@/components/CreateTrialStep6Form";

export default function CreateTrialStep4Page() {
  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <div className="sm:sticky top-0 bg-white sm:pt-11">
        <h1 className="text-2xl font-semibold sm:text-3xl mb-4 sm:mb-[52px]">
          {l("settings.title") || "Create Trial"}
        </h1>
      </div>
      <div className="flex flex-col bg-white rounded-3xl border border-bgColor-10 shadow-lg py-8 sm:pb-0">
        <CreateTrialStepper activeStep={5} />
        <div className="flex flex-col gap-1 mt-12">
          <h3 className="text-lg font-medium text-center px-6">
            {l("settings.title") ||
              "Please Review the Trial information before creating it"}
          </h3>
          <h3 className="text-lg font-medium text-center px-6">
            {l("settings.title") ||
              "You are able to edit the trial after creation"}
          </h3>
        </div>

        <CreateTrialStep6Form />
      </div>
    </SidebarLayout>
  );
}
