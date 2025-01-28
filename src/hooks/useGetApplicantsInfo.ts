import { useState, useEffect } from "react";
import axios from "axios";
import { applicantsInfoProps } from "@/types";
import useSWR from "swr";

//----------------------------------- Main Function ---------------------------------------
const useGetApplicantsInfo = (): {
  applicantData: applicantsInfoProps;
  applicantError: Error | null;
  applicantIsLoading: boolean;
} => {
  //--- Initial applicant Info ---
  const initialApplicantInfo: applicantsInfoProps = {
    applicantsNumber: 0,
    firstName: "",
    lastName: "",
    age: "",
    zipCode: "",
    country: "",
  };

  //--- Fetcher Function ---
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

  //--- GET applicant Info ---
  const { data, error, isLoading } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/v1/users/current` : null,
    fetcher
  );
  const [applicantInfo, setApplicantInfo] =
    useState<applicantsInfoProps>(initialApplicantInfo);
  useEffect(() => {
    if (data) {
      setApplicantInfo(data);
    }
  }, [data]);

  //  console.log(applicantInfo)
  return {
    applicantData: applicantInfo,
    applicantError: error,
    applicantIsLoading: isLoading,
  };
};

export default useGetApplicantsInfo;
