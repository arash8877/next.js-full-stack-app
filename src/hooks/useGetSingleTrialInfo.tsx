"use client";

import axios from "axios";
import { iTrialInfoProps } from "@/types";
import useSWR from "swr";

//----------------------------------- Main Function ---------------------------------------
const useGetSingleTrialInfo = (
  id: string
): {
  trialData: iTrialInfoProps;
  trialError: Error | null;
  trialIsLoading: boolean;
} => {
  const fetcher = async (url: string) => {
    const token = localStorage.getItem("sp_token");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });
    return response.data;
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("sp_token") : null;
  const { data, error, isLoading } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${id}` : null,
    fetcher
  );
  console.log("Trial info in useGetSingleTrialInfo:", data);
  return { trialData: data, trialError: error, trialIsLoading: isLoading };
};

export default useGetSingleTrialInfo;
