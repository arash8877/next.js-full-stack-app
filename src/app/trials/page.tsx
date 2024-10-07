"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { SidebarLayout } from "@/components/SidebarLayout";
import { iTrialFilteringProps } from "@/types";
import TrialCard from "@/components/TrialCard";
import useGetAllTrials from "@/hooks/useGetAllTrials";
import TrialFilterBar from "@/components/TrialFilterBar";
import useLanguageStore from "@/stores/language-store";
import useDiseaseStore from "@/stores/disease-store";
import useGetUserInfo from "@/hooks/useGetUserInfo";

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
  const { allTrials, trialsError } =
    useGetAllTrials(filteringSettings);
  const { setUserDiseases } = useDiseaseStore();
  const { userData } = useGetUserInfo();
  const userDiseases = userData.diseases;

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

  //-------- put diseases from database into useDiseaseStore  -------
  useEffect(() => {
    setUserDiseases(userDiseases);
  }, [setUserDiseases, userDiseases]);

  useEffect(() => {
    if (trialsError) {
      console.error("Failed to fetch trials", trialsError);
    }
  }, [trialsError]);


  //--------------------------------- return ------------------------------------------------
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidebarLayout>
        <h1 className="text-2xl font-semibold mt-3 mb-8 sm:text-3xl sm:mb-12">
          {l("trialoverview.title") || "Trials Overview"}</h1>
        <TrialFilterBar
          defaultFilterValues={filteringSettings}
          onFilterChange={handleFilterChange}
        />

        {allTrials && allTrials.length === 0 ? (
          <h2 className="text-lg font-semibold text-center mt-20">
            {l("trialoverview.warning.notrials") ||
              "No trials available ! Create your first trial."}
          </h2>
        ) : (
          <div className="trial_overview_grid">
            {allTrials &&
              allTrials.map((trial, index) => (
                <TrialCard
                  key={index}
                  trialId={trial["trialId"]}
                  title={trial["title"]}
                  shortDescription={trial["shortDescription"]}
                  urlStub={trial["urlStub"]}
                  startDate={formatDate(trial["startDate"])}
                  endDate={formatDate(trial["endDate"])}
                  address={
                    trial["trialSite"]
                      ? trial["trialSite"]["address"]
                      : undefined
                  }
                  submissionDeadline={formatDate(trial["submissionDeadline"])}
                  media={trial.media}
                  userApplication={trial.userApplication}
                  medicalCategories={trial.medicalCategories}
                  diseases={trial.diseases}
                />
              ))}
          </div>
        )}
      </SidebarLayout>
    </Suspense>
  );
}
