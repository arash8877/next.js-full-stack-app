"use client";

import { useState, useEffect } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { useParams, useRouter } from "next/navigation";
import useGetSingleTrialInfo from "@/hooks/useGetSingleTrialInfo";
import Spinner from "@/components/Spinner";
import axios from "axios";

type SingleTrialPageProps = {
  params: { id: string };
};

//------------------------------------ main function -----------------------------------
export default function SingleTrialPage({ params }: SingleTrialPageProps) {
  const [previewKey, setPreviewKey] = useState("");
  const { trialData } = useGetSingleTrialInfo(params.id);
  const urlStub = trialData?.urlStub;
  const router = useRouter();
  const { id } = useParams();
  const trialId = id;

  console.log("trialData:", trialData);
  console.log("urlStub:", urlStub);

  useEffect(() => {
    const fetchPreviewKey = async () => {
      if (previewKey && urlStub) {
        router.push(
          `https://app.trialsync.com/trial/${urlStub}?previewkey=${previewKey}`
        );
      } else {
        const token = localStorage.getItem("sp_token");
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/preview`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("**** Response in preview *****:", response);
          setPreviewKey(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchPreviewKey();
  }, [previewKey, router, trialId, urlStub]);

  // useEffect(() => {
  //   if (previewKey && urlStub) {
  //     router.push(
  //       `https://app.trialsync.com/trial/${urlStub}?previewkey=${previewKey}`
  //     );
  //   } else {
  //     console.error("urlStub is missing or previewKey is unavailable");
  //   }
  // }, [previewKey, router, urlStub]);

  console.log("previewKey:", previewKey);

  //------------------------------- JSX -----------------------------------
  return (
    <SidebarLayout>
      <div>
        <Spinner />
      </div>
    </SidebarLayout>
  );
}
