import { useState, useEffect } from "react";
import axios from "axios";
import { invoicesInfoProps } from "@/types";
import useSWR from "swr";

//----------------------------------- Main Function ---------------------------------------
const useGetInvoicesInfo = (): {
  invoiceData: invoicesInfoProps[];
  invoiceError: Error | null;
  invoiceIsLoading: boolean;
} => {
  //--- Initial invoice Info ---
  const initialInvoiceInfo: invoicesInfoProps[] = [];

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

  //--- GET invoice Info ---
  const { data, error, isLoading } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/v1/invoices` : null,
    fetcher
  );
  const [invoicesInfo, setInvoicesInfo] = useState<invoicesInfoProps[]>(initialInvoiceInfo);
  useEffect(() => {
    if (data) {
        setInvoicesInfo(data);
    }
  }, [data]);

  //  console.log(invoicesInfo)
  return { invoiceData: invoicesInfo, invoiceError: error, invoiceIsLoading: isLoading };
};

export default useGetInvoicesInfo;
