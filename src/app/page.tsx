"use client";

import { useCallback, useEffect, useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { redirect } from "next/navigation";
import { iTrialFilteringProps, iTrialInfoProps } from "@/types";
import TrialCard from "@/components/TrialCard";
import useGetAllTrials from "@/hooks/useGetAllTrials";
import TrialFilterBar from "@/components/TrialFilterBar";
import useLanguageStore from "@/stores/language-store";
import CustomPagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";

//------- format date function --------
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

//----------------------------- main function -------------------------------
export default function TrialsPage() {
  const [filteringSettings, setFilteringSettings] =
    useState<iTrialFilteringProps>({
      searchValue: null,
      pageSize: 2,
      pageIndex: 0,
      medicalCategories: null,
      filterByIsRecruiting: null,
      filterBySoonRecruiting: null,
      submissionDeadlineSortDirection: null,
      showExpiredTrials: null,
      pagination: { maxPageResult: 5, pageIndex: 0 },
    });
  const { allTrials, trialsError, trialsIsLoading, totalPages, pageIndex } =
    useGetAllTrials(filteringSettings);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  // const observerRef = useRef<IntersectionObserver | null>(null);
  // const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { l } = useLanguageStore();

  //---------------
  useEffect(() => {
    const token = localStorage.getItem("sp_token");
    if (!token) {
      redirect("/login");
    }
  });

  //------------------ Pagination -----------------
  const [currentPage, setCurrentPage] = useState(pageIndex + 1);
  const [loadedTrials, setLoadedTrials] = useState<iTrialInfoProps[]>([]);
  const trialsPerPage = filteringSettings.pageSize;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setLoadedTrials((prev) => [...prev, ...allTrials]);
    }
  }, [allTrials, isMobile]);

  const displayedTrials = isMobile ? loadedTrials : allTrials || [];

  //--- handleFilterChange function ---
  const handleFilterChange = useCallback((newFilters: iTrialFilteringProps) => {
    setFilteringSettings((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
      pagination: { ...prevFilters.pagination, pageIndex: 0 }, // reset pagination upon new filters
    }));
  }, []);

  useEffect(() => {
    if (trialsError) {
      console.error("Failed to fetch trials", trialsError);
    }
  }, [trialsError]);

  //---- set loading timeout -----
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingTimeout(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  //--------------------------------- return ------------------------------------------------
  return (
    <div>
      <SidebarLayout>
        <div className="sm:sticky top-0 bg-white sm:pt-11 trials-header-shadow-removal">
          <h1 className="text-2xl font-semibold mb-4 sm:text-3xl sm:mb-[52px]">
            {l("trialoverview.title") || "Trials Overview"}
          </h1>
          <TrialFilterBar
            defaultFilterValues={filteringSettings}
            onFilterChange={handleFilterChange}
          />
        </div>
        {trialsIsLoading && !loadingTimeout ? (
          <Spinner />
        ) : allTrials && allTrials.length === 0 ? (
          <h2 className="text-lg font-semibold text-center mt-20">
            {l("trialoverview.warning.notrials") ||
              "No trials available ! Create your first trial."}
          </h2>
        ) : (
          <div className="flex flex-col flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-6 justify-center">
              {displayedTrials.map((trial, index) => (
                <TrialCard
                  key={index}
                  trialId={trial["trialId"]}
                  applicationCount={trial["applicationCount"]}
                  title={trial["title"]}
                  summary={trial["summary"] || "Not provided"}
                  urlStub={trial["urlStub"]}
                  startDate={formatDate(trial["startDate"])}
                  endDate={formatDate(trial["endDate"])}
                  address={
                    trial["trialSites"]
                      ? trial["trialSites"]?.[0]?.["address"]
                      : undefined
                  }
                />
              ))}
            </div>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              trialsPerPage={trialsPerPage}
              pageIndex={pageIndex}
              onPageChange={(event, value) => {
                setCurrentPage(value);
                setFilteringSettings((prevFilters) => ({
                  ...prevFilters,
                  pageIndex: value - 1,
                }));
              }}
            />
          </div>
        )}
      </SidebarLayout>
    </div>
  );
}
