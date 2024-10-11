"use client";

import { SidebarLayout } from "@/components/SidebarLayout";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import useLanguageStore from "@/stores/language-store";

const employees = [
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

//------------------------------------ main function -----------------------------------
export default function EmployeesPage() {
  const router = useRouter();
  const { l } = useLanguageStore();

  function redirectToEmployeeDetails(employeeId: string) {
    router.push(`/employees/${employeeId}`);
  }

  //------------------------------- JSX -----------------------------------
  return (
    <SidebarLayout>
      <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
        {l("settings.title") || "Employees"}
      </h1>
      <div className="overflow-x-auto bg-white wrapper rounded-3xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#EEEEEE] text-left text-sm uppercase tracking-wider">
              <th className="py-3 px-6">First Name</th>
              <th className="py-3 px-6">Last Name</th>
              <th className="py-3 px-6 hidden lg:table-cell">Email</th> {/* Hidden on small screens */}
              <th className="py-3 px-6 hidden lg:table-cell">Last Login</th> {/* Hidden on small screens */}
              <th className="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6">{employee.firstName}</td>
                <td className="py-4 px-6">{employee.lastName}</td>
                <td className="py-4 px-6 hidden lg:table-cell break-all max-w-xs whitespace-normal">
                  {employee.email}
                </td> {/* Email should break into multiple lines */}
                <td className="py-4 px-6 hidden lg:table-cell">{employee.lastLogin}</td>
                <td className="py-4 px-6 flex justify-end">
                  <CustomButton
                    title={l("forgotpassword.form.submit") || "View"}
                    containerStyles="rounded-lg flex_center bg-gradient-button h-8 custom-padding"
                    btnType="button"
                    handleClick={() => redirectToEmployeeDetails(employee.email)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SidebarLayout>
  );
}
