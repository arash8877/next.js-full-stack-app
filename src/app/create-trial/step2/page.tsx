"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CreateTrialStepper from "@/components/CreateTrialStepper";
import CreateTrialStep2Form from "@/components/CreateTrialStep2Form";
import useLanguageStore from "@/stores/language-store";

export default function CreateTrialStep2Page() {
  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Create Trial"}
      </h1>
      <div className="flex flex-col bg-white rounded-3xl py-8	">
        <CreateTrialStepper activeStep={1} />
        <CreateTrialStep2Form />
      </div>
    </SidebarLayout>
  );
}
