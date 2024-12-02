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
  //console.log("id", id);
  const fetcher = async (url: string) => {
    const token = localStorage.getItem("token");
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
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { data, error, isLoading } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${id}` : null,
    fetcher
  );
  console.log("trial Data in useGetSingleTrialInfo****************:", data);
  return { trialData: data, trialError: error, trialIsLoading: isLoading };
};

export default useGetSingleTrialInfo;
