"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CompanyInfoForm from "@/components/CompanyInfoForm";
import useGetCompanyInfo from "@/hooks/useGetCompanyInfo";
import useLanguageStore from "@/stores/language-store";
import { useEffect } from "react";

export default function CompanyPage() {
  const { companyData } = useGetCompanyInfo();

  useEffect(() => {
    console.log(companyData);
  }, [companyData]);

  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Company Information"}
      </h1>
      <div className="flex flex-col bg-white rounded-3xl wrapper relative -z-[1]">
        <CompanyInfoForm {...companyData} />
      </div>
    </SidebarLayout>
  );
}
