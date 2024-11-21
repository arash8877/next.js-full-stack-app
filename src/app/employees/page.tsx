"use client";

import { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import useLanguageStore from "@/stores/language-store";
import InviteEmployeeModal from "@/components/InviteEmployeeModal";
import useGetCompanyInfo from "@/hooks/useGetCompanyInfo";

//------------------------------------ main function -----------------------------------
export default function EmployeesPage() {
  const [isInviteEmployeeModalOpen, setIsInviteEmployeeModalOpen] = useState(false);
  const { companyData } = useGetCompanyInfo();
  const router = useRouter();
  const { l } = useLanguageStore();

  function redirectToEmployeeDetails(employeeId: number) {
    router.push(`/employees/${employeeId}`);
  }


    //---- open and close modal -----
    const openInviteEmployeeModal = () => {
      setIsInviteEmployeeModalOpen(true);
    };
    const closeInviteEmployeeModal = () => {
      setIsInviteEmployeeModalOpen(false);
    };

  //------------------------------- JSX -----------------------------------
  return (
    <SidebarLayout>
      <div className="flex flex-col justify-between gap-3 md:flex-row lg:gap-4 mb-8">
        <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
          {l("settings.title") || "Employees"}
        </h1>
        <div className="md:flex gap-4 py-[6px] justify-between h-[56px] md:col-span-2 md:col-start-3">
          <div className="md:flex gap-4">
            <div className="flex_center rounded-lg py-[6px] h-[44px] bg-secondary-50 cursor-pointer">
              <button
                className="flex_center text-xs font-medium py-3 md:px-5 md:text-sm lg:px-8"
                onClick={openInviteEmployeeModal}
              >
                {l("filter.btn.suggestion") || "Invite Employee"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white wrapper rounded-3xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#EEEEEE] text-left text-sm uppercase tracking-wider">
              <th className="hidden">Id</th>
              <th className="py-3 px-6">First Name</th>
              <th className="py-3 px-6">Last Name</th>
              <th className="py-3 px-6 hidden lg:table-cell">Email</th>{" "}
              {/* Hidden on small screens */}
              <th className="py-3 px-6 hidden lg:table-cell">
                Last Login
              </th>{" "}
              {/* Hidden on small screens */}
              <th className="py-3 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {companyData?.sponsorContacts?.map((employee, index) => (
              <tr key={index} className="border-b">
                <td className="hidden">{employee.userId}</td>
                <td className="py-4 px-6">{employee.firstName}</td>
                <td className="py-4 px-6">{employee.lastName}</td>
                <td className="py-4 px-6 hidden lg:table-cell break-all max-w-xs whitespace-normal">
                  {employee.email}
                </td>{" "}
                {/* Email should break into multiple lines */}
                <td className="py-4 px-6 hidden lg:table-cell">
                  {employee.lastLogin}
                </td>
                <td className="py-4 px-6 flex justify-end">
                  <CustomButton
                    title={l("forgotpassword.form.submit") || "View"}
                    containerStyles="rounded-lg flex_center bg-gradient-button h-8 custom-padding"
                    btnType="button"
                    disabled={employee.firstName == "Invited"}
                    handleClick={() =>
                      redirectToEmployeeDetails(employee.userId)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isInviteEmployeeModalOpen && (
        <InviteEmployeeModal open={isInviteEmployeeModalOpen} onClose={closeInviteEmployeeModal} />
      )}
    </SidebarLayout>
  );
}
