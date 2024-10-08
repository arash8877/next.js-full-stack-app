"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CompanyInfoForm from "@/components/CompanyInfoForm";
import useGetCompanyInfo from "@/hooks/useGetCompanyInfo";
import useLanguageStore from "@/stores/language-store";

export default function CompanyPage() {
  const {companyData} = useGetCompanyInfo();

  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Company Information"}
      </h1>
      <div className="flex flex-col bg-white rounded-3xl wrapper">
      <CompanyInfoForm {...companyData} />
      </div>
    </SidebarLayout>
  );
}
