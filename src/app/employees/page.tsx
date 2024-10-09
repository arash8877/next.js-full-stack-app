"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
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
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Employees List"}
      </h1>
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
