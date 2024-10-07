import { useEffect } from "react";
import axios from "axios";
import { iApplicationProps } from "@/types";
import useSWR from "swr";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import { useMyTrialsStore } from "@/stores/trialCount-store";

export interface IUseGetMyTrials {
  myTrialsData: iApplicationProps[];
  myTrialsError:  Error | null;
  myTrialsIsLoading: boolean;
}

//------------------------------ main function ---------------------------------
export default function useGetMyTrials(): IUseGetMyTrials {
  const { setTrialsCount } = useMyTrialsStore();
  const authenticated = useIsAuthenticated();

  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          accept: "application/json",
        },
      })
      .then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    authenticated
      ? `${process.env.NEXT_PUBLIC_API_URL}/v1/users/applications`
      : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setTrialsCount(data.length);
    }
  }, [data, error, isLoading, setTrialsCount]);

  return {
    myTrialsData: data,
    myTrialsError: error,
    myTrialsIsLoading: isLoading,
  };
}
