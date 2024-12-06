"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CreateTrialStepper from "@/components/CreateTrialStepper";
import CreateTrialStep3Form from "@/components/CreateTrialStep3Form";
import useLanguageStore from "@/stores/language-store";

export default function CreateTrialStep3Page() {
  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold sm:text-3xl mb-4 sm:mb-16">
        {l("settings.title") || "Create Trial"}
      </h1>
      <div className="flex flex-col bg-white rounded-3xl border border-bgColor-10 py-8 sm:pb-0">
        <CreateTrialStepper activeStep={2} />
        <h3 className="text-lg font-medium text-center px-6 mt-12 mb-6">
          {
            //l("settings.title") ||
            "Please enter the date, gender and age for the participants"
          }
        </h3>
        <CreateTrialStep3Form />
      </div>
    </SidebarLayout>
  );
}
