import { useState, useEffect } from "react";
import axios from "axios";
import { iTrialInfoProps, iTrialFilteringProps } from "@/types";
import useSWR from "swr";


//------------------------------- main function -------------------------------
export default function useGetAllTrials({
  searchValue,
//   medicalCategories,
//   filterByIsRecruiting,
//   filterBySoonRecruiting,
//   submissionDeadlineSortDirection,
//   showExpiredTrials,
  pagination
}: iTrialFilteringProps) : { allTrials: iTrialInfoProps[], trialsError: Error | null, trialsIsLoading: boolean } {
  const [allTrials, setAllTrials] = useState<iTrialInfoProps[]>([]);

  const fetcher = async (url: string, body: { searchValue: string }) => {
    const res = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        accept: "application/json",
      },
    });
    return res.data;// list of all trials
  };


  const { data, error, isLoading } = useSWR(
    [`${process.env.NEXT_PUBLIC_API_URL}/v1/filter`, { "searchValue": searchValue || "" }],
    ([url, body]) => fetcher(url, body)
  );


  useEffect(() => {
    if (data) {
      setAllTrials(data);
    }
  }, [data, pagination.pageIndex]);

  return { allTrials, trialsError: error, trialsIsLoading: isLoading };
}
