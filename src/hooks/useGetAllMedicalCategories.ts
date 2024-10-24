import axios from "axios";
import { iCategoryProps } from "@/types";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import useSWR from "swr";

// Define a type for the return value
type UseGetAllMedicalCategoriesReturn = {
  categoriesData: iCategoryProps[];
  categoriesError: Error | null;
  categoriesIsLoading: boolean;
};

//--------------------------------------- main function ------------------------------------------
export default function useGetAllMedicalCategories(): UseGetAllMedicalCategoriesReturn {
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
      ? `${process.env.NEXT_PUBLIC_API_URL}/v1/medicalCategories`
      : null,
    fetcher
  );

  return {
    categoriesData: data,
    categoriesError: error,
    categoriesIsLoading: isLoading,
  };
}
