import { useState, useEffect } from "react";
import axios from "axios";
import { iTrialDetailsProps, iTrialFilteringProps } from "@/types";
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
}: iTrialFilteringProps) : { allTrials: iTrialDetailsProps[], trialsError: Error | null, trialsIsLoading: boolean } {
  const [allTrials, setAllTrials] = useState<iTrialDetailsProps[]>([]);

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
    [`${process.env.NEXT_PUBLIC_API_URL}/v1/filter/sorted`, { "searchValue": searchValue || "" }],
    ([url, body]) => fetcher(url, body)
  );
  // the endpoint /v1/filter/sorted is a POST request that sorts the trials based on the search value provided in the search-bar

  useEffect(() => {
    if (data) {
      setAllTrials(data);
    }
  }, [data, pagination.pageIndex]);

  return { allTrials, trialsError: error, trialsIsLoading: isLoading };
}
