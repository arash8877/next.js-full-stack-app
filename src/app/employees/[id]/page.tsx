"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import EmployeesListForm from "@/components/EmployeesListForm";
import useGetEmployeesInfo from "@/hooks/useGetEmployeesInfo";
import useLanguageStore from "@/stores/language-store";



//------------------------- Main Function ----------------------------------
export default function EmployeesPage() {
  const { employeeData } = useGetEmployeesInfo();
  const { l } = useLanguageStore();




  //--------------------------------- JSX -----------------------------------
  return (
    <SidebarLayout>
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
          {l("settings.title") || "Employee Info"}
        </h1>
      </div>
        <div
          className="flex flex-col bg-white rounded-3xl mb-4 wrapper"
        >
          <EmployeesListForm {...employeeData} />
        </div>
    
    </SidebarLayout>
  );
}
