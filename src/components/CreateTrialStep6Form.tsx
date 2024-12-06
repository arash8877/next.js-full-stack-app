"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import useGetSingleTrialInfo from "@/hooks/useGetSingleTrialInfo";
import useLanguageStore from "@/stores/language-store";
import useCreateTrialStore from "@/stores/createTrial-store";
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
  const { l } = useLanguageStore();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTrialId = localStorage.getItem("currentTrialEditId");
      setTrialId(storedTrialId);
    }
  }, []);

  useEffect(() => {
    const fetchPreviewKey = async () => {
      const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
    const trialId = localStorage.getItem("currentTrialEditId");
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/complete`, //post request
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response in createTrialStep6Form:", response);
      resetFormData();
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

      router.push("/trials");
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
      <div className="p-4 rounded-md">
        <div className="p-4 border-4 border-primary-50 rounded-md mt-4">
          <div className="flex gap-2 mb-2">
            <p className="mb-2 font-bold">Title:</p>
            <h2 className="text-sm mb-4">{trialData?.title || "----------"}</h2>
          </div>

          <div className="text-sm mb-2">
            <p className="mb-2 font-bold">Short Description:</p>
            <div
              dangerouslySetInnerHTML={{
                __html: trialData?.shortDescription || "N/A",
              }}
              className="ql-editor no_border"
            />
          </div>
          <div className="text-sm mb-2">
            <p className="mb-2 font-bold">Full Description:</p>
            <div
              dangerouslySetInnerHTML={{
                __html: trialData?.fullDescription || "N/A",
              }}
              className="ql-editor no_border"
            />
          </div>
        </div>

        <div className="p-4 border-4 border-primary-50 rounded-md mt-4">
          <p className="font-bold mb-2">Trial Sites</p>
          {trialData?.trialSites && trialData.trialSites.length > 0 ? (
            trialData.trialSites.map((site, index) => (
              <div key={index} className="mb-4 p-2">
                <div className="text-sm mb-1">
                  <p className="mb-2 font-bold">Location:</p>{" "}
                  {site.name || "N/A"}
                </div>
                <div className="text-sm mb-1">
                  <p className="mb-2 font-bold">Address:</p>{" "}
                  {site.address || "N/A"}
                </div>
                <div className="text-sm mb-1">
                  <p className="mb-2 font-bold">ZIP Code:</p>{" "}
                  {site.zipCode || "N/A"}
                </div>
                <div className="text-sm mb-1">
                  <p className="mb-2 font-bold">Country:</p>{" "}
                  {site.country || "N/A"}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm">----------</div>
          )}
        </div>

        <div className="p-4 border-4 border-primary-50 rounded-md mt-4">
          <div className="flex gap-2">
            <p className="mb-2 font-bold">Age Range:</p> {trialData?.ageMin} -{" "}
            {trialData?.ageMax}
          </div>
          <div className="flex gap-2">
            <p className="mb-2 font-bold">Gender:</p>{" "}
            {trialData?.gender || "Not Specified"}
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
            <p className="mb-2 font-bold">Submission Deadline:</p>{" "}
            {trialData?.submissionDeadline}
          </div>
        </div>

        <div className="p-4  border-4 border-primary-50 rounded-md mt-4">
          {/* <h3 className="text-lg font-semibold mb-2">Trial Criteria</h3> */}

          <div className="mb-4">
            <p className="mb-2 font-bold">Inclusion Diseases:</p>
            {trialData?.inclusionDiseases &&
            trialData.inclusionDiseases.length > 0 ? (
              <ul className="list-disc pl-5">
                {trialData.inclusionDiseases.map((disease, index) => (
                  <li key={index}>{disease || "N/A"}</li>
                ))}
              </ul>
            ) : (
              <p>----------</p>
            )}
          </div>

          <div className="mb-4">
            <p className="mb-2 font-bold">Inclusion Requirements:</p>{" "}
            {trialData?.inclusionRequirements || "N/A"}
          </div>

          <div className="mb-4">
            <p className="mb-2 font-bold">Exclusion Diseases:</p>
            {trialData?.exclusionDiseases &&
            trialData.exclusionDiseases.length > 0 ? (
              <ul className="list-disc pl-5">
                {trialData.exclusionDiseases.map((disease, index) => (
                  <li key={index}>{disease || "N/A"}</li>
                ))}
              </ul>
            ) : (
              <p>----------</p>
            )}
          </div>

          <div className="mb-4">
            <p className="mb-2 font-bold">Exclusion Requirements:</p>{" "}
            {trialData?.exclusionRequirements || "N/A"}
          </div>

          <div className="mb-4">
            <p className="mb-2 font-bold">Medical Categories:</p>
            {trialData?.medicalCategories?.length ? (
              <ul className="list-disc pl-5">
                {trialData.medicalCategories.map((category, index) => (
                  <li key={index} className="text-sm">
                    {category.medicalCategory.name || "N/A"}
                  </li>
                ))}
              </ul>
            ) : (
              <p>----------</p>
            )}
          </div>
        </div>

        <div className="flex flex-col border-4 border-primary-50 rounded-md p-4 gap-4 mt-4">
          <div>
            <p className="mb-2 font-bold">Participant Activities:</p>
            <div
              dangerouslySetInnerHTML={{
                __html: trialData?.participantActivities || "----------",
              }}
              className="ql-editor no_border"
            />
          </div>

          <div className="flex gap-2">
            <p className="mb-2 font-bold">Expected Number of Participants:</p>
            <p className="">
              {trialData?.expectedParticipants || "No data provided"}
            </p>
          </div>

          <div className="flex gap-2">
            <p className="mb-2 font-bold">Additional Information:</p>
            <p className="">
              {trialData?.additionalInformation
                ? trialData?.additionalInformation
                : "No data provided"}
            </p>
          </div>

          <div>
            <div className="flex gap-2">
              <p className="mb-2 font-bold">Driving Compensation:</p>
              {trialData?.drivingCompensation === true ? " Yes" : " No"}
            </div>

            <div className="flex gap-2">
              <p className="mb-2 font-bold">Monetary Compensation: </p>
              {trialData?.monetaryCompensation ? " Yes" : " No"}
            </div>

            <div className="flex gap-2">
              <p className="mb-2 font-bold">Other Compensation:</p>{" "}
              {trialData?.otherCompensationText || "N/A"}
            </div>
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
