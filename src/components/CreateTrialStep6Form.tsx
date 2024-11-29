"use client";

import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import useGetSingleTrialInfo from "@/hooks/useGetSingleTrialInfo";
import useLanguageStore from "@/stores/language-store";
import useCreateTrialStore from "@/stores/createTrial-store";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

//-------------------------------------- main function-----------------------------------------
const CreateTrialStep6Form = () => {
  const router = useRouter();
  const [previewKey, setPreviewKey] = useState("");
  const [trialId, setTrialId] = useState<string | null>(null);
  const { trialData } = useGetSingleTrialInfo(trialId || "");
  const { resetFormData } = useCreateTrialStore();
  const { l } = useLanguageStore();
  console.log("trialData$$$$$$$$$$:", trialData);
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
        console.log("previewKey:", previewKey);
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          // Handle error
        }
      }
    };

    fetchPreviewKey();
    // eslint-disable-next-line
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
      // document.cookie = "createTrialStep6Completed=true; Path=/;";
      const cookiesToRemove = [
        "createTrialStep1Completed",
        "createTrialStep2Completed",
        "createTrialStep3Completed",
        "createTrialStep4Completed",
        "createTrialStep5Completed",
      ];
      cookiesToRemove.forEach((cookieName) => {
        document.cookie = `${cookieName}=; path=/; max-age=0;`;
      });

      router.push("/trials");
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        //setError(error.response?.data || "An unknown error occurred");
      }
    }
  }

  console.log("trialData in step6:", trialData);
  //-------------------------------------------------- JSX ---------------------------------------------
  return (
    <div className="flex flex-col gap-6 wrapper">
      <div className="p-4 rounded-md">
        <div className="p-4 border rounded-md mt-4">
          <div className="text-sm mb-2">
            <strong>Title:</strong>
            <h2 className="text-sm mb-4">
              {trialData?.title || "No Title Available"}
            </h2>
          </div>

          <div className="text-sm mb-2">
            <strong>Short Description:</strong>
            <div
              dangerouslySetInnerHTML={{
                __html: trialData?.shortDescription || "N/A",
              }}
              className="ql-editor"
            />
          </div>
          <div className="text-sm mb-2">
            <strong>Full Description:</strong>
            <div
              dangerouslySetInnerHTML={{
                __html: trialData?.fullDescription || "N/A",
              }}
              className="ql-editor"
            />
          </div>
        </div>

        <div className="p-4 border rounded-md mt-4">
          {/* <h3 className="text-lg font-semibold mb-2">Trial Sites</h3> */}
          {trialData?.trialSites && trialData.trialSites.length > 0 ? (
            trialData.trialSites.map((site, index) => (
              <div key={index} className="mb-4 p-2">
                <div className="text-sm mb-1">
                  <strong>Location:</strong> {site.name || "N/A"}
                </div>
                <div className="text-sm mb-1">
                  <strong>Address:</strong> {site.address || "N/A"}
                </div>
                <div className="text-sm mb-1">
                  <strong>ZIP Code:</strong> {site.zipCode || "N/A"}
                </div>
                <div className="text-sm mb-1">
                  <strong>Country:</strong> {site.country || "N/A"}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm">No trial sites available.</div>
          )}
        </div>

        <div className="p-4 border rounded-md mt-4">
          <div className="text-sm mb-2">
            <strong>Age Range:</strong> {trialData?.ageMin} -{" "}
            {trialData?.ageMax}
          </div>
          <div className="text-sm mb-2">
            <strong>Gender:</strong> {trialData?.gender || "Not Specified"}
          </div>
          <div className="text-sm mb-2">
            <strong>Expected Participants:</strong>{" "}
            {trialData?.expectedParticipants}
          </div>
          <div className="text-sm mb-2">
            <strong>Start Date:</strong> {trialData?.startDate}
          </div>
          <div className="text-sm mb-2">
            <strong>End Date:</strong> {trialData?.endDate}
          </div>
          <div className="text-sm mb-2">
            <strong>Submission Deadline:</strong>{" "}
            {trialData?.submissionDeadline}
          </div>
        </div>

        <div className="p-4 border rounded-md mt-4">
          {/* <h3 className="text-lg font-semibold mb-2">Trial Criteria</h3> */}

          <div className="mb-4">
            <strong>Inclusion Diseases:</strong>
            {trialData?.inclusionDiseases &&
            trialData.inclusionDiseases.length > 0 ? (
              <ul className="list-disc pl-5">
                {trialData.inclusionDiseases.map((disease, index) => (
                  <li key={index} className="text-sm">
                    {disease || "N/A"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">No inclusion diseases specified.</p>
            )}
          </div>

          <div className="text-sm mb-4">
            <strong>Inclusion Requirements:</strong>{" "}
            {trialData?.inclusionRequirements || "N/A"}
          </div>

          <div className="mb-4">
            <strong>Exclusion Diseases:</strong>
            {trialData?.exclusionDiseases &&
            trialData.exclusionDiseases.length > 0 ? (
              <ul className="list-disc pl-5">
                {trialData.exclusionDiseases.map((disease, index) => (
                  <li key={index} className="text-sm">
                    {disease || "N/A"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">No exclusion diseases specified.</p>
            )}
          </div>

          <div className="text-sm mb-4">
            <strong>Exclusion Requirements:</strong>{" "}
            {trialData?.exclusionRequirements || "N/A"}
          </div>

          <div className="mb-4">
            <strong>Medical Categories:</strong>
            {trialData?.medicalCategories?.length ? (
              <ul className="list-disc pl-5">
                {trialData.medicalCategories.map((category, index) => (
                  <li key={index} className="text-sm">
                    {category.name || "N/A"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">No medical categories specified.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col border rounded-md p-4 gap-4 mt-4">
          <div>
            <strong className="text-sm mb-2">Participant Activities:</strong>
            <div
              dangerouslySetInnerHTML={{
                __html: trialData?.participantActivities || "No data provided",
              }}
              className="ql-editor"
            />
          </div>

          <div>
            <strong className="text-sm mb-2">
              Expected Number of Participants:
            </strong>
            <p className="">
              {trialData?.expectedParticipants || "No data provided"}
            </p>
          </div>

          <div>
            <strong className="text-sm mb-2">Additional Information:</strong>
            <p className="">
              {trialData?.additionalInformation
                ? trialData?.additionalInformation
                : "No data provided"}
            </p>
          </div>

          <div>
            <ul className="list-disc ml-5">
              <li>
                <strong className="text-sm mb-2">Driving Compensation:</strong>
                {trialData?.drivingCompensation === true ? " Yes" : " No"}
              </li>

              <li>
                <strong className="text-sm mb-2">
                  Monetary Compensation:{" "}
                </strong>
                {trialData?.monetaryCompensation ? " Yes" : " No"}
              </li>

              <li>
                <strong className="text-sm mb-2">Other Compensation:</strong>{" "}
                {trialData?.otherCompensationText || "N/A"}
              </li>
            </ul>
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
