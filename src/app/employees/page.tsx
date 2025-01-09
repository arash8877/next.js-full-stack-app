"use client";

import { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import useLanguageStore from "@/stores/language-store";
import InviteEmployeeModal from "@/components/InviteEmployeeModal";
import { toast } from "react-toastify";
import useGetCompanyInfo from "@/hooks/useGetCompanyInfo";
import axios from "axios";

//------------------------------------ main function -----------------------------------
export default function EmployeesPage() {
  const [isInviteEmployeeModalOpen, setIsInviteEmployeeModalOpen] =
    useState(false);
  const { companyData } = useGetCompanyInfo();
  const router = useRouter();
  const { l } = useLanguageStore();

  function redirectToEmployeeDetails(employeeId: number) {
    router.push(`/employees/${employeeId}`);
  }


  //----- Un-Invite an employee -----
  async function unInviteEmployee(employeeId: number) {
    console.log("Uninvite employee!");
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/sponsorcontacts/user/${employeeId}/uninvite`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Invitation removed successfully", {
        position: "top-center",
        autoClose: 2000,
        className: "single_line_toast",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2100);
    } catch (error) {
      console.error("Error in /uninvite", error);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
        className: "single_line_toast",
      });
    }
  }

  //----- Re-Invite an employee -----
  // eslint-disable-next-line
  async function reInviteEmployee(employeeId: number) {
    console.log("Re-invite employee!");
    // try {
    //   await axios.post(
    //     `${process.env.NEXT_PUBLIC_API_URL}/v1/sponsorcontacts/user/${employeeId}/uninvite`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 0);
    // } catch (error) {
    //   console.error("Error in /uninvite", error);
    // }
  }

  //---- open and close modal -----
  const openInviteEmployeeModal = () => {
    setIsInviteEmployeeModalOpen(true);
  };
  const closeInviteEmployeeModal = () => {
    setIsInviteEmployeeModalOpen(false);
  };

  //---- Refresh page after invite an employee -----
  const handleSuccess = () => {
    window.location.reload();
  };

  //------------------------------- JSX -----------------------------------
  return (
    <SidebarLayout>
      <div className="flex flex-col justify-between gap-3 mb-4 sm:mb-0 md:flex-row lg:gap-4 bg-white sm:pt-11">
        <h1 className="text-2xl font-semibold sm:text-3xl sm:mb-[52px]">
          {l("settings.title") || "Employees"}
        </h1>
        <div className="md:flex gap-4 py-[6px] justify-between h-[56px] md:col-span-2 md:col-start-3">
          <div className="md:flex gap-4">
            <div className="flex_center rounded-lg py-[6px] h-[44px] bg-secondary-50 cursor-pointer">
              <button
                className="flex_center text-sm font-medium py-3 md:px-5 lg:px-8"
                onClick={openInviteEmployeeModal}
              >
                {l("filter.btn.suggestion") || "Invite Employee"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white wrapper2 rounded-3xl border border-bgColor-10 shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#EEEEEE] text-left text-sm uppercase tracking-wider">
              <th className="hidden">Id</th>
              <th className="py-3 px-6 text-xs">First Name</th>
              <th className="py-3 px-6 hidden md:table-cell text-xs">Last Name</th>
              {/* Hidden on small screens */}
              <th className="py-3 px-6 hidden lg:table-cell text-xs">Email</th>
              {/* Hidden on small screens */}
              <th className="py-3 px-6 hidden 2xl:table-cell text-xs">Last Login</th>
              <th className="py-3 px-6 text-right text-xs">Action</th>
            </tr>
          </thead>
          <tbody>
            {companyData?.sponsorContacts?.map((employee, index) => (
              <tr key={index} className="border-b">
                <td className="hidden">{employee.userId}</td>
                <td className="py-4 px-6 text-sm 2xl:text-base">{employee.firstName}</td>
                <td className="py-4 px-6 hidden md:table-cell text-sm 2xl:text-base">
                  {employee.lastName}
                </td>
                <td className="py-4 px-6 hidden lg:table-cell text-sm 2xl:text-base">
                  {employee.email}
                </td>
                <td className="py-4 px-6 hidden 2xl:table-cell 2xl:text-base">
                  {employee.lastLogin == "0001-01-01T00:00:00"
                    ? "---------"
                    : new Date(employee.lastLogin).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                </td>
                <td className="py-4 px-6 flex justify-end">
                  {employee.lastLogin == "0001-01-01T00:00:00" ? (
                    <div className="flex gap-2">
                      <CustomButton
                        title={l("forgotpassword.form.submit") || "Uninvite"}
                        containerStyles="rounded-lg flex_center bg-bgColor-red h-8 custom_padding"
                        textStyles="text-white text-xs xl:text-sm 2xl:text-base"
                        btnType="button"
                        handleClick={() => unInviteEmployee(employee.userId)}
                      />
                      <CustomButton
                        title={l("forgotpassword.form.submit") || "Reinvite"}
                        containerStyles="rounded-lg flex_center bg-gradient-button h-8 custom_padding"
                        textStyles="text-xs xl:text-sm 2xl:text-base"
                        btnType="button"
                        handleClick={() => reInviteEmployee(employee.userId)}
                      />
                    </div>
                  ) : (
                    <CustomButton
                      title={l("forgotpassword.form.submit") || "View"}
                      containerStyles="rounded-lg flex_center bg-gradient-button h-8 custom_padding2"
                      textStyles="text-xs xl:text-sm 2xl:text-base"
                      btnType="button"
                      handleClick={() =>
                        redirectToEmployeeDetails(employee.userId)
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isInviteEmployeeModalOpen && (
        <InviteEmployeeModal
          open={isInviteEmployeeModalOpen}
          onClose={closeInviteEmployeeModal}
          onSuccess={handleSuccess}
        />
      )}
    </SidebarLayout>
  );
}
