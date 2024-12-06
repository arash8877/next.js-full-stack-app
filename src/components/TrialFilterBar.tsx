"use client";

import { iTrialFilterBarProps, iTrialFilteringProps } from "@/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { debounce } from "@mui/material";
// import useGetUserInfo from "@/hooks/useGetUserInfo";
// import { useSearchParams } from "next/navigation";
import useLanguageStore from "@/stores/language-store";
import { useRouter } from "next/navigation";

//--------------------------main function ---------------------------------
const TrialFilterBar: React.FC<iTrialFilterBarProps> = ({
  defaultFilterValues,
  onFilterChange,
}) => {
  const [filters, setFilters] =
    useState<iTrialFilteringProps>(defaultFilterValues);
  const [searchInputValue, setSearchInputValue] = useState<string | null>(
    filters?.searchValue || ""
  );
  //   const searchParams = useSearchParams();
  //   const { userData, userError, userIsLoading } = useGetUserInfo();
  const router = useRouter();
  const { l } = useLanguageStore();

  function updateURL(newFilters: iTrialFilteringProps) {
    let newUrl = "/trials";
    let separator = "?";

    if (newFilters.searchValue != null) {
      newUrl += separator + "search=" + newFilters.searchValue;
      separator = "&";
    }

    window.history.replaceState({}, "", newUrl);
  }

  //   useEffect(() => {
  //     if (userData) {
  //       let defaultCategories: number[] | null = Array.isArray(
  //         userData.medicalCategories
  //       )
  //         ? userData.medicalCategories
  //             .map((cat) => cat.medicalCategoryId)
  //             .filter((id): id is number => id !== undefined) // Filters out undefined values
  //         : null;

  //       const paramCategories = searchParams.get("categories");
  //       if (paramCategories) {
  //         defaultCategories = paramCategories
  //           .split(",")
  //           .map((cat) => Number.parseInt(cat));
  //       }

  //       const defaultFilters: iTrialFilteringProps = {
  //         searchValue: searchParams.get("search"),
  //         medicalCategories: defaultCategories,
  //         filterByIsRecruiting: searchParams.get("isrecruiting")
  //           ? searchParams.get("isrecruiting") === "true"
  //           : true,
  //         filterBySoonRecruiting: searchParams.get("issoonrecruiting") === "true",
  //         showExpiredTrials: searchParams.get("showexpired") === "true",
  //         submissionDeadlineSortDirection: searchParams.get("sort"),
  //         pagination: { maxPageResult: 5, pageIndex: 0 },
  //       };
  //       setFilters(defaultFilters);
  //       updateURL(defaultFilters);
  //       onFilterChange(defaultFilters);
  //     }
  //   }, [userData, userError, userIsLoading, onFilterChange, searchParams]);

  ////-------------------
  useEffect(() => {
    updateURL(filters);
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const debouncedApplyFilters = debounce(
    (updatedFilters: iTrialFilteringProps) => {
      onFilterChange(updatedFilters);
      let newUrl = "/trials";
      let separator = "?";

      if (updatedFilters.searchValue != null) {
        newUrl += separator + "search=" + updatedFilters.searchValue;
        separator = "&";
      }

      window.history.replaceState({}, "", newUrl);
    },
    500
  );

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInputValue(value);

    if (value.length >= 2 || value.length === 0) {
      // Check if at least 2 characters are typed or if the input is cleared
      setFilters((prev) => {
        const updatedFilters = { ...prev, searchValue: value };
        debouncedApplyFilters(updatedFilters); // Debounce the application of filters with the latest state
        return updatedFilters;
      });
    }
  };

  //--------

  function redirectToCreateTrialPage() {
    router.push("/create-trial/step1");
  }

  //------------------------------------------ JSX --------------------------------------------
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
      <div className="flex bg-white flex-1 rounded-xl relative  md:col-span-4">
        <Image
          src="/search-icon.svg"
          width={11}
          height={11}
          style={{ width: "11px", height: "11px" }}
          alt="search-icon"
          className="absolute left-5 top-1/2 transform -translate-y-1/2"
        />
        <input
          type="text"
          name="search"
          onChange={handleSearchOnChange}
          placeholder={l("filter.search.placeholder") || "Search"}
          className="w-full bg-white p-4 rounded-lg h-[56px] border border-bgColor-10 shadow-md"
          style={{ paddingLeft: "40px" }}
          value={searchInputValue ?? ""}
        />
      </div>
      <button
        className="flex_center text-xs font-medium md:px-12 md:text-sm rounded-lg py-[6px] h-[54px] bg-secondary-50 cursor-pointer shadow-md"
        onClick={redirectToCreateTrialPage}
      >
        {l("filter.btn.suggestion") || "Create Trial"}
      </button>
    </div>
  );
};

export default TrialFilterBar;
