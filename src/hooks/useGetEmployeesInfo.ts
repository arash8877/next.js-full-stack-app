import { useState, useEffect } from "react";
import axios from "axios";
import { employeesInfoProps } from "@/types";
import useSWR from "swr";

//----------------------------------- Main Function ---------------------------------------
const useGetEmployeesInfo = (): {
  employeeData: employeesInfoProps;
  employeeError: Error | null;
  employeeIsLoading: boolean;
} => {
  //--- Initial User Info ---
  const initialUserInfo: employeesInfoProps = {
    firstName: "",
    lastName: "",
    email: "",
    lastLogin: "",
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
  const [employeesInfo, setEmployeesInfo] = useState<employeesInfoProps>(initialUserInfo);
  useEffect(() => {
    if (data) {
        setEmployeesInfo(data);
    }
  }, [data]);

  //  console.log(userInfo)
  return { employeeData: employeesInfo, employeeError: error, employeeIsLoading: isLoading };
};

export default useGetEmployeesInfo;
