import { useState, useEffect } from "react";
import axios from "axios";
import { iTrialInfoProps } from "@/types";
import useSWR from "swr";

//----------------------------------- Main Function ---------------------------------------
const useGetSingleTrialInfo = (): {
  trialData: iTrialInfoProps;
  trialError: Error | null;
  trialIsLoading: boolean;
} => {
  //--- Initial trial Info ---
  const initialTrialInfo: iTrialInfoProps = {
    trialId: 0,
    title: "",
    shortDescription: "",
    fullDescription: "",
    urlStub: "",
    trialSite: null,
    isRecruiting: false,
    ageMin: 18,
    ageMax: 120,
    gender: "",
    approvedOn: "", 
    startDate: "",
    endDate: "",
    submissionDeadline: "",
    isCompleted: false,
    applicantsNumber: 0,
  };

  //--- Fetcher Function ---
  const fetcher = async (url: string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });
    return response.data;
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  //--- GET Company Info ---
  const { data, error, isLoading } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/v1/users/current` : null,
    fetcher
  );
  const [trialInfo, setTrialInfo] = useState<iTrialInfoProps>(initialTrialInfo);
  useEffect(() => {
    if (data) {
        setTrialInfo(data);
    }
  }, [data]);

  //  console.log(trialInfo)
  return { trialData: trialInfo, trialError: error, trialIsLoading: isLoading };
};

export default useGetSingleTrialInfo;
