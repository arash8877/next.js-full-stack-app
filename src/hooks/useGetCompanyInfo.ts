import { useState, useEffect } from "react";
import axios from "axios";
import { CompanyInfoProps } from "@/types";
import useSWR from "swr";

//----------------------------------- Main Function ---------------------------------------
const useGetCompanyInfo = (): {
  companyData: CompanyInfoProps;
  companyError: Error | null;
  companyIsLoading: boolean;
} => {
  //--- Initial Company Info ---
  const initialInfo: CompanyInfoProps = {
    name: "",
    address: "",
    country: "",
    vatNumber: "",
    zipCode: "",
    sponsorContacts: [],
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

  //--- GET Company Info ---
  const { data, error, isLoading } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/v1/sponsors/current` : null,
    fetcher
  );
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoProps>(initialInfo);
  useEffect(() => {
    if (data) {
      setCompanyInfo(data);
    }
  }, [data]);

  //  console.log("companyInfo:", companyInfo)
  return {
    companyData: companyInfo,
    companyError: error,
    companyIsLoading: isLoading,
  };
};

export default useGetCompanyInfo;
