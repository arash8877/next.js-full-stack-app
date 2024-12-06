"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import EmployeesListForm from "@/components/EmployeesListForm";
import useGetEmployeesInfo from "@/hooks/useGetEmployeesInfo";
import useLanguageStore from "@/stores/language-store";
import { useEffect } from "react";

type Props = {
  params: { id: string };
}


//------------------------- Main Function ----------------------------------
export default function EmployeesPage({ params }: Props) {
  const { employeeData } = useGetEmployeesInfo(params.id);
  const userId = Number(params.id);
  console.log("userId:", userId);
  const { l } = useLanguageStore();

  useEffect(() => {
    console.log("Params", params);
    console.log("Data", employeeData)

  }, [employeeData, params])

  //--------------------------------- JSX -----------------------------------
  return (
    <SidebarLayout>
      <div className="flex flex-col justify-between md:flex-row md:items-center mb-[6px]">
        <h1 className="text-2xl font-semibold mt-3 mb-4 sm:text-3xl sm:mb-12">
          {l("settings.title") || "Employee Info"}
        </h1>
      </div>
        <div
          className="flex flex-col bg-white rounded-3xl mb-4"
        >
          <EmployeesListForm {...employeeData} userId={userId}/>
        </div>
    
    </SidebarLayout>
  );
}
