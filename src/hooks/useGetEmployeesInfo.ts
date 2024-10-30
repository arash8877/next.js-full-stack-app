import { useState, useEffect } from "react";
import axios from "axios";
import { SponsorUserInfo, employeesInfoProps } from "@/types";
import useSWR from "swr";

//----------------------------------- Main Function ---------------------------------------
const useGetEmployeesInfo = (id: string): {
  employeeData: SponsorUserInfo;
  employeeError: Error | null;
  employeeIsLoading: boolean;
} => {
  //--- Initial Employee Info ---
  const initialEmployeeInfo: SponsorUserInfo = {
    firstName: "",
    lastName: "",
    email: "",
    lastLogin: "",
    hasConsentedToMarketing: false,
    jobTitle: "",
    phoneNumber: "",
    preferredLanguage: "",
    sponsor: null
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

  //--- GET Employee Info ---
  const { data, error, isLoading } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/v1/sponsorcontacts/user/${id}` : null,
    fetcher
  );
  const [employeesInfo, setEmployeesInfo] = useState<SponsorUserInfo>(initialEmployeeInfo);
  useEffect(() => {
    if (data) {
        console.log("hook data", data);
        setEmployeesInfo(data);
    }
  }, [data]);

  //  console.log(employeesInfo)
  return { employeeData: employeesInfo, employeeError: error, employeeIsLoading: isLoading };
};

export default useGetEmployeesInfo;
