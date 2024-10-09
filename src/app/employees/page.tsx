"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CustomButton from "@/components/CustomButton";
import EmployeesListForm from "@/components/EmployeesListForm";
import useGetEmployeesInfo from "@/hooks/useGetEmployeesInfo";
import useLanguageStore from "@/stores/language-store";

const dummyEmployees = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    lastLogin: "2024-10-07",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    lastLogin: "2024-10-06",
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.johnson@example.com",
    lastLogin: "2024-10-05",
  },
  {
    firstName: "Bob",
    lastName: "Brown",
    email: "bob.brown@example.com",
    lastLogin: "2024-10-04",
  },
];

export default function CompanyPage() {
  const { employeeData } = useGetEmployeesInfo();

  const { l } = useLanguageStore();

  return (
    <SidebarLayout>
      <div className="flex flex-col justify-between md:flex-row md:items-center">
        <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
          {l("settings.title") || "Employees List"}
        </h1>
        <div className="flex justify-center xs:justify-end gap-4 xl:items-end pb-4 xs:pb-8">
          <CustomButton
            title={l("settings.form.save") || "Invite Employee"}
            containerStyles="rounded-lg h-[48px] gradient-green1 hover1"
            btnType="button"
          />
        </div>
      </div>
      {dummyEmployees.map((employee, index) => (
        <div
          key={index}
          className="flex flex-col bg-white rounded-3xl mb-4 wrapper"
        >
          <EmployeesListForm {...employeeData} />
        </div>
      ))}
    </SidebarLayout>
  );
}
