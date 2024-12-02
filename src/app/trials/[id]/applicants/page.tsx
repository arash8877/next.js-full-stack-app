"use client";

import { useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import UnlockApplicantsModal from "@/components/UnlockApplicantsModal";
import CustomButton from "@/components/CustomButton";
import useLanguageStore from "@/stores/language-store";
import useGetSingleTrialInfo from "@/hooks/useGetSingleTrialInfo";
import useGetApplicationsInfo from "@/hooks/useGetApplicationsInfo";
import axios from "axios";

type Props = {
  params: { id: string };
}

//------------------------------------ main function -----------------------------------
export default function ApplicantsPage({ params }: Props) {
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const { applicationsData } = useGetApplicationsInfo(params.id)
  const { trialData } = useGetSingleTrialInfo(params.id);
  const { l } = useLanguageStore();
  const title = trialData?.title;

  console.log("applicationsData:", applicationsData);

  const handleUnlock = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/invoices/purchase/trial`, 
      {
        trialId: params.id
      },
      {
        // request
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
      console.log(response);
      setIsUnlockModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 0);
    } catch (error) {
      console.error("Error in unlock modal:", error);
    }
  };

  //------------------------------- JSX -----------------------------------
  return (
    <SidebarLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-between lg:flex-row">
          <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
            {l("settings.title") || "Applicants for trial:"}
          </h1>
          <div className="flex_center border h-16 px-8 bg-white rounded-2xl">
            Number of applicants:{"  "}
            {applicationsData?.length}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 lg:flex-row">
          <h2 className="lg:w-2/3">
            {title}
          </h2>
          <CustomButton
            title={
              applicationsData?.[0]?.unlocked
                ? l("forgotpassword.form.submit") || "Unlocked"
                : l("forgotpassword.form.submit") || "Unlock"
            }
            containerStyles="rounded-lg flex_center bg-gradient-button h-11"
            disabledContainerStyles="rounded-lg flex_center bg-gray-300 h-11 text-white"
            btnType="button"
            handleClick={() => setIsUnlockModalOpen(true)}
            disabled={applicationsData?.[0]?.unlocked || applicationsData?.length === 0}
          />
        </div>
        <div className="overflow-x-auto bg-white wrapper rounded-3xl mt-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-[#EEEEEE] text-left text-sm uppercase tracking-wider">
                <th className="py-3 px-6">First Name</th>
                <th className="py-3 px-6">Last Name</th>
                <th className="py-3 px-6 hidden lg:table-cell">
                  Gender
                </th>{" "}
                <th className="py-3 px-6">Email</th>
             
              </tr>
            </thead>
            <tbody>
              {applicationsData?.map((applicant, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4 px-6">{applicant.user.firstName}</td>
                  <td className="py-4 px-6">{applicant.user.lastName}</td>
                  <td className="py-4 px-6 hidden lg:table-cell">
                    {applicant.user.gender}
                  </td>
                  <td className="py-4 px-6">{applicant.user.email}</td>
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
      </div>
    </SidebarLayout>
  );
}
