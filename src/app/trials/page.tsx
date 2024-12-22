"use client";

import { useCallback, useEffect, useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { iTrialFilteringProps } from "@/types";
import TrialCard from "@/components/TrialCard";
import useGetAllTrials from "@/hooks/useGetAllTrials";
import TrialFilterBar from "@/components/TrialFilterBar";
import useLanguageStore from "@/stores/language-store";
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

//-----------------------------main function -------------------------------
export default function TrialsPage() {
  const [filteringSettings, setFilteringSettings] =
    useState<iTrialFilteringProps>({
      searchValue: null,
      medicalCategories: null,
      filterByIsRecruiting: null,
      filterBySoonRecruiting: null,
      submissionDeadlineSortDirection: null,
      showExpiredTrials: null,
      pagination: { maxPageResult: 5, pageIndex: 0 },
    });
  const { l } = useLanguageStore();
  const { allTrials, trialsError, trialsIsLoading } =
    useGetAllTrials(filteringSettings);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  // const observerRef = useRef<IntersectionObserver | null>(null);
  // const loadMoreRef = useRef<HTMLDivElement | null>(null);

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
        <div className="sm:sticky top-0 bg-white sm:pt-11">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-6 justify-center">
            {allTrials &&
              allTrials.map((trial, index) => (
                <TrialCard
                  key={index}
                  trialId={trial["trialId"]}
                  applicationCount={trial["applicationCount"]}
                  title={trial["title"]}
                  description={trial["description"]}
                  urlStub={trial["urlStub"]}
                  startDate={formatDate(trial["startDate"])}
                  endDate={formatDate(trial["endDate"])}
                  address={
                    trial["trialSites"]
                      ? trial["trialSites"]?.[0]?.["address"]
                      : undefined
                  }
                  submissionDeadline={formatDate(trial["submissionDeadline"])}
                  media={trial.media}
                  approvedAt={trial.approvedAt}
                  publishedAt={trial.publishedAt}
                  declined={trial.declined}
                  //medicalCategories={trial.medicalCategories || []}
                  medicalCategories={[]}
                  inclusionDiseases={trial.inclusionDiseases || []}
                  applicantsNumber={trial.applicantsNumber}
                />
              ))}
          </div>
        )}
      </SidebarLayout>
    </div>
  );
}

// "0001-01-01T00:00:00"
