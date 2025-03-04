"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import useGetSingleTrialInfo from "@/hooks/useGetSingleTrialInfo";
import useLanguageStore from "@/stores/language-store";
import useCreateTrialStore from "@/stores/createTrial-store";
import useDiseaseStore from "@/stores/disease-store";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep6Form = () => {
  const router = useRouter();
  // eslint-disable-next-line
  const [previewKey, setPreviewKey] = useState("");
  const [trialId, setTrialId] = useState<string | null>(null);
  const { trialData } = useGetSingleTrialInfo(trialId || "");
  const { resetFormData } = useCreateTrialStore();
  const { resetDiseases } = useDiseaseStore();
  const { l } = useLanguageStore();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTrialId = localStorage.getItem("currentTrialEditId");
      setTrialId(storedTrialId);
    }
  }, []);

  // console.log("trialData in Create Trial-Step6:", trialData);

  useEffect(() => {
    const fetchPreviewKey = async () => {
      const token = localStorage.getItem("sp_token");
      const trialId = localStorage.getItem("currentTrialEditId");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/preview`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("RESPONSE in Create Trial - Step6:", response);
        setPreviewKey(response.data);
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          // Handle error
        }
      }
    };

    fetchPreviewKey();
  }, [trialId]);

  async function handleCreateTrial() {
    const token = localStorage.getItem("sp_token");
    const trialId = localStorage.getItem("currentTrialEditId");
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response in createTrialStep6Form:", response);
      resetFormData();
      resetDiseases();
      localStorage.removeItem("currentTrialEditId");
      document.cookie = "createTrialStep6Completed=true; Path=/; max-age=7200";
      const cookiesToRemove = [
        "createTrialStep1Completed",
        "createTrialStep2Completed",
        "createTrialStep3Completed",
        "createTrialStep4Completed",
        "createTrialStep5Completed",
        "createTrialStep6Completed",
      ];
      cookiesToRemove.forEach((cookieName) => {
        document.cookie = `${cookieName}=; path=/; max-age=0;`;
      });
      localStorage.removeItem("currentTrialEditId");
      localStorage.removeItem("create-trial-store");

      toast.success("Trial created successfully", {
        position: "top-center",
        autoClose: 2000,
        className: "single_line_toast",
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        //setError(error.response?.data || "An unknown error occurred");
      }
    }
  }

  //-------------------------------------------------- JSX ---------------------------------------------
  return (
    <div className="flex flex-col gap-6 wrapper">
      <div className="rounded-md">
        <div className="p-4 border-4 border-primary-50 rounded-md mt-4">
          <div className="flex flex-col gap-2 mb-2">
            <p className="font-bold">Title:</p>
            <h2 className="text-sm mb-2 pl-4">
              {trialData?.title || "----------"}
            </h2>
          </div>

          <div className="text-sm mb-2">
            <p className="font-bold">Description:</p>
            <div
              dangerouslySetInnerHTML={{
                __html: trialData?.shortDescription || "----------",
              }}
              className="ql-editor no_border"
            />
          </div>
        </div>

        <div className="p-4 border-4 border-primary-50 rounded-md mt-4">
          <p className="font-bold mb-2">Trial Sites</p>
          {trialData?.sites && trialData.sites.length > 0 ? (
            trialData.sites.map((site, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="text-sm">
                  <p className="mb-2 font-bold">Location:</p>{" "}
                  {site.name || "----------"}
                </div>
                <div className="text-sm">
                  <p className="mb-2 font-bold">Address:</p>{" "}
                  {site.address || "----------"}
                </div>
                <div className="text-sm">
                  <p className="mb-2 font-bold">ZIP Code:</p>{" "}
                  {site.zipCode || "----------"}
                </div>
                <div className="text-sm">
                  <p className="mb-2 font-bold">Country:</p>{" "}
                  {site.country || "----------"}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm">----------</div>
          )}
        </div>

        <div className="p-4 border-4 border-primary-50 rounded-md mt-4">
          <div className="flex gap-2">
            <p className="mb-2 font-bold">Age Range:</p> {trialData?.minimumAge}{" "}
            - {trialData?.maximumAge}
          </div>
          <div className="flex gap-2">
            <p className="mb-2 font-bold">Biological Sex:</p>{" "}
            {trialData?.biologicalSex || "----------"}
          </div>
          <div className="flex gap-2">
            <p className="mb-2 font-bold">Expected Participants:</p>{" "}
            {trialData?.expectedParticipants}
          </div>
          <div className="flex gap-2">
            <p className="mb-2 font-bold">Start Date:</p> {trialData?.startDate}
          </div>
          <div className="flex gap-2">
            <p className="mb-2 font-bold">End Date:</p> {trialData?.endDate}
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Submission Deadline:</p>{" "}
            {trialData?.submissionDeadline}
          </div>
        </div>

        <div className="p-4  border-4 border-primary-50 rounded-md mt-4">
          {/* <h3 className="text-lg font-semibold mb-2">Trial Criteria</h3> */}

          <div className="mb-2">
            <p className="font-bold">Inclusion Diseases:</p>
            {trialData?.inclusionCriteria &&
            trialData.inclusionCriteria.length > 0 ? (
              <ul className="list-disc pl-5">
                {trialData.inclusionCriteria.map((disease, index) => (
                  <li key={index}>{disease || "----------"}</li>
                ))}
              </ul>
            ) : (
              <p>----------</p>
            )}
          </div>

          <div className="mb-2">
            <p className="font-bold">Inclusion Requirements:</p>{" "}
            {trialData?.conditionOfInterest || "----------"}
          </div>

          <div className="mb-2">
            <p className="font-bold">Exclusion Diseases:</p>
            {trialData?.exclusionCriteria &&
            trialData.exclusionCriteria.length > 0 ? (
              <ul className="list-disc pl-5">
                {trialData.exclusionCriteria.map((disease, index) => (
                  <li key={index}>{disease || "----------"}</li>
                ))}
              </ul>
            ) : (
              <p>----------</p>
            )}
          </div>

          <div className="mb-2">
            <p className="font-bold">Exclusion Requirements:</p>{" "}
            {trialData?.exclusionCondition || "----------"}
          </div>

          <div>
            <p className="font-bold">Medical Categories:</p>
            {trialData?.medicalCategories?.length ? (
              <ul className="list-disc pl-5">
                {trialData.medicalCategories.map((category, index) => (
                  <li key={index} className="text-sm">
                    {category.medicalCategory.name || "----------"}
                  </li>
                ))}
              </ul>
            ) : (
              <p>----------</p>
            )}
          </div>
        </div>

        <div className="flex flex-col border-4 border-primary-50 rounded-md p-4 gap-4 mt-4">
          <div className="mb-2">
            <p className="font-bold">Participant Activities:</p>
            <div
              dangerouslySetInnerHTML={{
                __html: trialData?.activities || "----------",
              }}
              className="ql-editor no_border"
            />
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Expected Number of Participants:</p>
            <p className="">
              {trialData?.expectedParticipants || "----------"}
            </p>
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Additional Information:</p>
            <p className="">
              {trialData?.additionalInformation
                ? trialData?.additionalInformation
                : "----------"}
            </p>
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Recruiting Status:</p>
            <p className="">
              {trialData?.isRecruiting === true ? "Yes" : "No"}
            </p>
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Publish Status:</p>
            <p className="">
              {trialData?.isPublished === true ? "Yes" : "No"}
            </p>
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Driving Compensation:</p>
            {trialData?.drivingCompensation === true ? " Yes" : " No"}
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Monetary Compensation: </p>
            {trialData?.monetaryCompensation ? " Yes" : " No"}
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Other Compensation:</p>{" "}
            {trialData?.otherCompensationText || "----------"}
          </div>
        </div>
      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Create"}
          containerStyles="rounded-lg gradient-green1 hover1 mt-4"
          btnType="button"
          handleClick={handleCreateTrial}
        />
      </div>
    </div>
  );
};

export default CreateTrialStep6Form;
