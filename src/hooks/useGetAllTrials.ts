import { useState, useEffect } from "react";
import axios from "axios";
import { iTrialInfoProps, iTrialFilteringProps } from "@/types";
import useSWR from "swr";

//------------------------------- main function -------------------------------
export default function useGetAllTrials({
  searchValue,
  pageIndex,
  pageSize,
  //   medicalCategories,
  //   filterByIsRecruiting,
  //   filterBySoonRecruiting,
  //   submissionDeadlineSortDirection,
  //   showExpiredTrials,
  pagination,
}: iTrialFilteringProps): {
  allTrials: iTrialInfoProps[];
  totalPages: number;
  totalTrials: number;
  pageIndex: number;
  trialsError: Error | null;
  trialsIsLoading: boolean;
} {
  const [allTrials, setAllTrials] = useState<iTrialInfoProps[]>([]);
  const [totalTrials, setTotalTrials] = useState<number>(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetcher = async (url: string, body: { searchValue: string }) => {
    const res = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sp_token")}`,
        accept: "application/json",
      },
    });
    return {
      filteredTrials: res.data.trials,
      totalTrials: res.data.trials.length,
      totalPages: res.data.totalPages,
    };
  };

  const { data, error, isLoading } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_API_URL}/v1/filter`,
      { searchValue: searchValue || "", pageIndex: pageIndex, pageSize: pageSize },
    ],
    ([url, body]) => fetcher(url, body)
  );

  useEffect(() => {
    if (data) {
      setAllTrials(data.filteredTrials);
      setTotalTrials(data.totalTrials);
      setTotalPages(data.totalPages);
    }
  }, [data, pagination.pageIndex]);

  // console.log("allTrials: *********###", allTrials);
  return {
    allTrials,
    totalTrials,
    totalPages,
    trialsError: error,
    trialsIsLoading: isLoading,
    pageIndex,
  };
}
