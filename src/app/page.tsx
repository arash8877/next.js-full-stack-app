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
      medicalCategories: null,
      filterByIsRecruiting: null,
      filterBySoonRecruiting: null,
      submissionDeadlineSortDirection: null,
      showExpiredTrials: null,
      pagination: { maxPageResult: 5, pageIndex: 0 },
    });
  const { allTrials, trialsError, trialsIsLoading } =
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
  const [currentPage, setCurrentPage] = useState(1);
  const [trialsPerPage] = useState(6);

  const [nextItems, setNext] = useState(trialsPerPage);
  const handleMoreTrials = () => {
    setNext(nextItems + trialsPerPage);
    console.log(nextItems);
  };
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

  //---------------
  const indexOfLastTrial = currentPage * trialsPerPage;
  const indexOfFirstPost = indexOfLastTrial - trialsPerPage;
  const currentTrials = allTrials.slice(indexOfFirstPost, indexOfLastTrial);
  const currentTrialsMobile = allTrials.slice(0, nextItems);

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
          <>
            {" "}
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-6 justify-center">
              {allTrials && (
                <TrialList
                  trials={isMobile ? currentTrialsMobile : currentTrials}
                />
              )}
            </div>
            {nextItems < allTrials.length && (
              <button onClick={handleMoreTrials} className="show-more">
                Show more
              </button>
            )}
            <CustomPagination
              allTrials={allTrials.length}
              trialsPerPage={trialsPerPage}
              currentPage={currentPage}
              onPageChange={(event, value) => setCurrentPage(value)}
            />
          </>
        )}
      </SidebarLayout>
    </div>
  );
}

//-------------------------- TrialList component ----------------------------
const TrialList = ({ trials }: { trials: iTrialInfoProps[] }) => {
  return (
    <>
      {trials.map((trial, index) => (
        <TrialCard
          key={index}
          trialId={trial["trialId"]}
          applicationCount={trial["applicationCount"]}
          title={trial["title"]}
          shortDescription={trial["shortDescription"] || ""}
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
          referred={trial.referred}
          declined={trial.declined}
          //medicalCategories={trial.medicalCategories || []}
          medicalCategories={[]}
          inclusionDiseases={trial.inclusionDiseases || []}
          applicantsNumber={trial.applicantsNumber}
        />
      ))}
    </>
  );
};
