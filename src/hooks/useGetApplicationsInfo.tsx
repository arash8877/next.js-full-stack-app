"use client";

import axios from "axios";
import { iTrialApplicationsInfo } from "@/types";
import useSWR from "swr";

//----------------------------------- Main Function ---------------------------------------
const useGetApplicationsInfo = (
  id: string
): {
  applicationsData: iTrialApplicationsInfo[];
  trialError: Error | null;
  trialIsLoading: boolean;
} => {
  console.log("id", id);
  const fetcher = async (url: string) => {
    const token = localStorage.getItem("sp_token");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  };

  const token =
    typeof window !== "undefined" ? localStorage.getItem("sp_token") : null;
  const { data, error, isLoading } = useSWR(
    token
      ? `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${id}/applications`
      : null,
    fetcher
  );

  return {
    applicationsData: data,
    trialError: error,
    trialIsLoading: isLoading,
  };
};

export default useGetApplicationsInfo;
