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
      <div className="bg-white sm:pt-11">
        <h1 className="text-2xl font-semibold sm:text-3xl mb-4 sm:mb-[52px]">
          {l("settings.title") || "Company Information"}
        </h1>
        <div className="flex flex-col bg-white rounded-3xl wrapper2 border border-bgColor-10 shadow-lg">
          <CompanyInfoForm {...companyData} />
        </div>
      </div>
    </SidebarLayout>
  );
}
