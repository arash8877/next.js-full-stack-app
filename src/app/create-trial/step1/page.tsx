"use client";
import { SidebarLayout } from "@/components/SidebarLayout";
import CreateTrialStepper from "@/components/CreateTrialStepper";
import CreateTrialStep1Form from "@/components/CreateTrialStep1Form";
import useLanguageStore from "@/stores/language-store";

export default function CreateTrialStep1Page() {
  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Create Trial"}
      </h1>
      <div className="flex flex-col bg-white rounded-3xl py-8	">
        <CreateTrialStepper activeStep={0} />
        <h3 className="text-lg font-medium text-center px-6 mt-12">
          {l("settings.title") ||
            "Please enter the title, short description and full description of the trial"}
        </h3>
        <CreateTrialStep1Form />
      </div>
    </SidebarLayout>
  );
}
