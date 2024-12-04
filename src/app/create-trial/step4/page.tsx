"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CreateTrialStepper from "@/components/CreateTrialStepper";
import CreateTrialStep4Form from "@/components/CreateTrialStep4Form";
import useLanguageStore from "@/stores/language-store";

export default function CreateTrialStep4Page() {
  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Create Trial"}
      </h1>
      <div className="flex flex-col bg-white rounded-3xl py-8	">
        <CreateTrialStepper activeStep={3} />
        <h3 className="text-lg font-medium text-center px-6 mt-12">
          {l("settings.title") ||
            "Please enter the exclusion and inclusion requirements and medical criteria"}
        </h3>
        <CreateTrialStep4Form />
      </div>
    </SidebarLayout>
  );
}
