"use client";

import Image from "next/image";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import { iTrialCardProps } from "@/types";
import TrialStatusBadge from "./TrialStatusBadge";
import useLanguageStore from "@/stores/language-store";

//--------------------------------- main function -------------------------------
export default function TrialCard({
  trialId,
  applicationCount,
  title,
  summary,
  startDate,
  endDate,
  address,
  submissionDeadline,
  approvedAt,
  publishedAt,
  referred,
  declined,
  inclusionDiseases,
}: //medicalCategories,
// applicantsNumber
// imageSrc,
// underReview,
iTrialCardProps) {
  const router = useRouter();
  const { l } = useLanguageStore();
  // eslint-disable-next-line
  const plainText =
    new DOMParser().parseFromString(summary, "text/html").body.textContent ||
    "";

  //--------------------------------- JSX ------------------------------------------------
  return (
    <section className="flex flex-col gap-4 p-6 bg-white rounded-2xl border border-bgColor-10 shadow-lg hover:shadow-xl ">
      <div className="flex justify-between">
        {/* <div className="flex justify-between gap-1">
          @TODO  Add Image after correcting medicalCategories data structure 
          {medicalCategories?.map((category, index) => (
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
          ))}
        </div> */}
        <div className="flex justify-between gap-1">
          {publishedAt === "0001-01-01T00:00:00" ? (
            <div className="flex_center gap-1">
              <Image
                src="not-published.svg"
                width={24}
                height={24}
                alt="published-icon"
              />
              <p className="text-[12px]">Not Published</p>
            </div>
          ) : (
            <div className="flex_center gap-1">
              <Image
                src="published.svg"
                width={24}
                height={24}
                alt="published-icon"
              />
              <p className="text-[12px]">Published</p>
            </div>
          )}
        </div>
        {
          <TrialStatusBadge
            approvedAt={approvedAt || ""}
            publishedAt={publishedAt || ""}
            referred={referred ?? false}
            declined={declined ?? false}
          />
        }
      </div>
      <h2 className="text-lg font-semibold line-clamp-1">{title}</h2>
      <hr />
      <div className="text-sm line-clamp-2 lg:line-clamp-3">
        {new DOMParser().parseFromString(summary, "text/html").body
          .textContent || ""}
      </div>

      <hr />
      <div className="flex justify-between gap-2">
        <p className="text-xs font-medium w-[38%]">
          {l("trialcard.period") || "Condition of interest:"}
        </p>
        <p className="text-xs text-right font-light line-clamp-1">
          {inclusionDiseases && inclusionDiseases.length > 0
            ? inclusionDiseases.join(", ")
            : "-"}
        </p>
      </div>

      <hr />
      <div className="flex justify-between gap-2">
        <p className="text-xs font-medium">
          {l("trialcard.period") || "Trial Period:"}
        </p>
        <p className="text-xs font-light">
          {startDate}-{endDate}
        </p>
      </div>
      <hr />
      {address && (
        <>
          <div className="flex justify-between gap-2">
            <p className="text-xs font-medium">
              {l("trialcard.location") || "Location:"}
            </p>
            <p className="text-xs font-light">{address}</p>
          </div>
          <hr />
        </>
      )}
      <div className="flex justify-between gap-2">
        <p className="text-xs font-medium">
          {l("trialcard.deadline") || "Submission Deadline:"}
        </p>
        <p className="text-xs font-light">{submissionDeadline}</p>
      </div>
      <div className="flex flex-col justify-between">
        <Link href={`/trials/${trialId}/applicants`}>
          <CustomButton
            title={
              <div className="flex items-center justify-between w-full">
                <span>{l("trialcard.cta.text") || "Applicants"}</span>
                {applicationCount !== null &&
                  applicationCount !== undefined && (
                    <span className="ml-2 bg-red-400 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
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
          <a href={`/trials/${trialId}`} target="_blank">
            <CustomButton
              title={l("trialcard.cta.text") || "View Trial"}
              containerStyles="rounded-lg gradient-green1 mt-4 hover1 custom-width-btn"
              btnType="submit"
            />
          </a>
          <Link href={`/trials/${trialId}/edit`}>
            <CustomButton
              title={l("trialcard.cta.text") || "Edit Trial"}
              containerStyles="rounded-lg gradient-green1 mt-4 hover1 custom-width-btn"
              btnType="button"
            />
          </Link>
        </div>
        <div className="flex flex-col">
          <CustomButton
            title={l("trialcard.cta.text") || "Publish"}
            containerStyles="rounded-lg gradient-green2 text-white mt-4 hover1 custom-width-btn"
            btnType="button"
            handleClick={() => router.push(`/trials/${trialId}/price`)}
            disabledContainerStyles="rounded-lg bg-gray-300"
            disabled={publishedAt === "0001-01-01T00:00:00"}
          />
        </div>
      </div>
    </section>
  );
}
