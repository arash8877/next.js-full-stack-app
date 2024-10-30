"use client"

import TrialForm from "@/components/TrialForm";
//import { iTrialInfoProps } from "@/types";
import { SidebarLayout } from "@/components/SidebarLayout";
import useGetSingleTrialInfo from "@/hooks/useGetSingleTrialInfo";
import { useEffect } from "react";

type Props = {
  params: { id: string };
}

export default function EditTrialPage({ params }: Props) {
  console.log("params", params)
  const { trialData } = useGetSingleTrialInfo(params.id);
  useEffect(() => {
    console.log(trialData);
  }, [trialData])
  return (
    <SidebarLayout>
        <TrialForm {...trialData} />
    </SidebarLayout>
  );
}
