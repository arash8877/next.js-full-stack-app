"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import InviteEmployeeForm from "@/components/InviteEmployeeForm";
import useLanguageStore from "@/stores/language-store";

//------------------------- Main Function ----------------------------------
export default function CompanyPage() {
  const { l } = useLanguageStore();

  //--------------------------------- JSX -----------------------------------
  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Invite Employee"}
      </h1>
      <div className="flex flex-col bg-white rounded-3xl wrapper">
        <InviteEmployeeForm />
      </div>
    </SidebarLayout>
  );
}
