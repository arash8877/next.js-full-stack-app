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
      const token = localStorage.getItem("token");
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
        console.log("Response:", response)
      } catch (error) {
        console.error(error);
      }
    };

    fetchPreviewKey();
  }, [trialId]); 

  useEffect(() => {
    if (previewKey && urlStub) {
      router.push(`https://test.app.trialsync.com/trial/${urlStub}?previewkey=${previewKey}`);
    } else {
      console.error("urlStub is missing or previewKey is unavailable");
    }
  }, [previewKey, router, urlStub]);

  console.log("previewKey:", previewKey);

  return (
    <SidebarLayout>
      <div>
        <h1>Single Trial Page</h1>
        <p>Trial ID: {trialId}</p>
        <Spinner />
      </div>
    </SidebarLayout>
  );
}
