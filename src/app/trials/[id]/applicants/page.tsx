"use client";

import { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import UnlockApplicantsModal from "@/components/UnlockApplicantsModal";
import CustomButton from "@/components/CustomButton";
import useLanguageStore from "@/stores/language-store";

//--------------------------------- applicants array -----------------------------------
const applicants = [
  {
    firstName: "Emma",
    lastName: "Green",
    age: 29,
    zipCode: "10001",
    country: "USA",
  },
  {
    firstName: "Liam",
    lastName: "White",
    age: 35,
    zipCode: "WC2N",
    country: "UK",
  },
  {
    firstName: "Olivia",
    lastName: "Black",
    age: 24,
    zipCode: "75001",
    country: "France",
  },
  {
    firstName: "Noah",
    lastName: "Blue",
    age: 42,
    zipCode: "10115",
    country: "Germany",
  },
];

//------------------------------------ main function -----------------------------------
export default function ApplicantsPage() {
  const [unlock, setUnlock] = useState(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const applicantsNumber = 535;
  const { l } = useLanguageStore();

  const handleUnlock = async () => {
    try {
      //   await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/v1/users`, {
      //       // request
      //       headers: {
      //           Authorization: `Bearer ${localStorage.getItem("token")}`,
      //         },
      //     });

      setIsUnlockModalOpen(false);
      setUnlock(true);
    } catch (error) {
      console.error("Error in unlock modal:", error);
    }
  };

  //------------------------------- JSX -----------------------------------
  return (
    <SidebarLayout>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
          {l("settings.title") || "Applicants for trial:"}
        </h1>
        <div className="flex_center border h-16 px-8 bg-white rounded-2xl">
          Number of applicants:{"  "}
          {applicantsNumber}
        </div>
      </div>

      <div className="flex justify-between mb-6">
        <h2 className="mb-6">
          Title: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry standard dummy
        </h2>
        <CustomButton
          title={unlock ? l("forgotpassword.form.submit") || "Unlocked" : l("forgotpassword.form.submit") || "Unlock" }
          containerStyles="rounded-lg flex_center bg-gradient-button h-11"
          disabledContainerStyles="rounded-lg flex_center bg-gray-300 h-11 text-white"
          btnType="button"
          handleClick={() => setIsUnlockModalOpen(true)}
          disabled={unlock}
        />
      </div>
      <div className="overflow-x-auto bg-white wrapper rounded-3xl">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#EEEEEE] text-left text-sm uppercase tracking-wider">
              <th className="py-3 px-6">First Name</th>
              <th className="py-3 px-6">Last Name</th>
              <th className="py-3 px-6">Age</th>
              <th className="py-3 px-6 hidden lg:table-cell">ZIP Code</th>{" "}
              <th className="py-3 px-6 hidden lg:table-cell">Country</th>{" "}
            </tr>
          </thead>

          <tbody>
            {applicants.map((applicant, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 px-6">{applicant.firstName}</td>
                <td className="py-4 px-6">
                  {unlock ? applicant.firstName : "xxxx"}
                </td>
                <td className="py-4 px-6">{unlock ? applicant.age : "xxxx"}</td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  {unlock ? applicant.zipCode : "xxxx"}
                </td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  {unlock? applicant.country : "xxxx"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <UnlockApplicantsModal
        open={isUnlockModalOpen}
        onClose={() => setIsUnlockModalOpen(false)}
        onUnlock={handleUnlock}
        />
      </div>
    </SidebarLayout>
  );
}
