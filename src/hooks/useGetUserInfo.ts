import { useState, useEffect } from "react";
import axios from "axios";
import { iUserProps } from "@/types";
import useSWR from "swr";

interface iError {
    message: string;
    status?: number;
  }
//----------------------------------- Main Function ---------------------------------------
const useGetUserInfo = (): {
  userData: iUserProps;
  userError: iError | null;
  userIsLoading: boolean;
} => {
  //--- Initial User Info ---
  const initialUserInfo: iUserProps = {
    email: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    phoneNumber: "",
    isAdmin: false,
    consentedToTerms: true,
    hasConsentedToMarketing: true,
    preferredLanguage: "",
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

  //--- GET User Info ---
  const { data, error, isLoading } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/v1/users/current` : null,
    fetcher
  );
  const [userInfo, setUserInfo] = useState<iUserProps>(initialUserInfo);
  useEffect(() => {
    if (data) {
      setUserInfo(data);
    }
  }, [data]);

  //  console.log("user info:", userInfo)
  return { userData: userInfo, userError: error, userIsLoading: isLoading };
};

export default useGetUserInfo;
