"use client";

//import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { iTrialCardProps } from "@/types";
import TrialStatusBadge from "./TrialStatusBadge";
import useLanguageStore from "@/stores/language-store";

//--------------------------------- main function -------------------------------
export default function TrialCard({
  trialId,
  applicationCount,
  title,
  shortDescription,
  startDate,
  endDate,
  address,
  submissionDeadline,
  userApplication,
  //medicalCategories,
  diseases,
}: // applicantsNumber
// imageSrc,
// underReview,
iTrialCardProps) {
  const { l } = useLanguageStore();

  //--------------------------------- return ------------------------------------------------
  return (
    <section className="flex flex-col gap-4 p-6 bg-white rounded-lg max-w-[480px] sm:max-w-[345px] md:max-w-md lg:max-w-lg">
      <div className="flex justify-between">
        <div className="flex justify-between gap-1">
          {/* @TODO  Add Image after correcting medicalCategories data structure */}
          {/* {medicalCategories?.map((category, index) => (
            <Image
              key={index}
              src={category.media ? category.media.filePath : ""}
              alt={
                category.media
                  ? category.media.alt
                  : "image depicting the medical category"
              }
              width={28}
              height={28}
            />
          ))} */}
        </div>
        {userApplication != null && (
          <TrialStatusBadge userApplication={userApplication} />
        )}
      </div>
      <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
      <h3 className="text-sm font-bold text-primary-600 line-clamp-1">
        {diseases}
      </h3>
      <hr />
      <p className="text-sm line-clamp-2">{shortDescription}</p>
      <hr />
      <div className="flex justify-between">
        <p className="text-xs font-medium">
          {l("trialcard.period") || "Trial Period"}
        </p>
        <p className="text-xs font-light">
          {startDate}-{endDate}
        </p>
      </div>
      <hr />
      {address && (
        <>
          <div className="flex justify-between">
            <p className="text-xs font-medium">
              {l("trialcard.location") || "Location"}
            </p>
            <p className="text-xs font-light">{address}</p>
          </div>
          <hr />
        </>
      )}
      <div className="flex justify-between">
        <p className="text-xs font-medium">
          {l("trialcard.deadline") || "Submission Deadline"}
        </p>
        <p className="text-xs font-light">{submissionDeadline}</p>
      </div>
      <div className="flex flex-col justify-between">
        <Link href={`/trials/${trialId}/applicants`}>
          <CustomButton
            title={
              <div className="flex items-center justify-between w-full">
                <span>{l("trialcard.cta.text") || "Applicants"}</span>
                {applicationCount > 0 && (
                  <span className="ml-2 bg-red-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {applicationCount}
                  </span>
                )}
              </div>
            }
            containerStyles="rounded-lg gradient-green1 mt-4 hover1 custom-width-btn"
            btnType="button"
          />
        </Link>
        <div className="flex flex-col">
          <Link href={`/trials/${trialId}`}>
            <CustomButton
              title={l("trialcard.cta.text") || "View Trial"}
              containerStyles="rounded-lg gradient-green1 mt-4 hover1 custom-width-btn"
              btnType="submit"
            />
          </Link>
          <Link href={`/trials/${trialId}/edit`}>
            <CustomButton
              title={l("trialcard.cta.text") || "Edit Trial"}
              containerStyles="rounded-lg gradient-green1 mt-4 hover1 custom-width-btn"
              btnType="button"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
