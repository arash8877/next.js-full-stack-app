"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CreateTrialStepper from "@/components/CreateTrialStepper";
import useLanguageStore from "@/stores/language-store";
import CreateTrialStep6Form from "@/components/CreateTrialStep6Form";

export default function CreateTrialStep4Page() {
  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Create Trial"}
      </h1>
      <div className="flex flex-col bg-white rounded-3xl py-8	">
        <CreateTrialStepper activeStep={5} />
        <div className="flex flex-col gap-1 mt-12">
          <h3 className="text-lg font-medium text-center px-6">
            {l("settings.title") ||
              "Please Review the Trial information before creating it"}
          </h3>
          <h3 className="text-lg font-medium text-center px-6">
            {l("settings.title") ||
              "You are able to edit the trial after creating it"}
          </h3>
        </div>

        <CreateTrialStep6Form />
      </div>
    </SidebarLayout>
  );
}
