"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { iTrialInfoProps, iUserTrialApplication } from "@/types";
import StatusBox from "@/components/StatusBox";
import axios from "axios";
import RecruitingDropdown from "./RecruitingDropdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-toastify";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import useLanguageStore from "@/stores/language-store";

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
}

//--------------------------------Main function--------------------------------
export default function TrialDetailsLayout({
  trialId,
  title,
  shortDescription,
  fullDescription,
  trialSite,
  startDate,
  endDate,
  submissionDeadline,
  ageMin,
  ageMax,
  gender,
  recruitingStatus,
  applicantsNumber,
}: iTrialInfoProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  const [currentApplicationState, setCurrentApplicationState] =
    useState<number>(0);
  const [trialHasBeenApplied, setTrialHasBeenApplied] = useState(false);
  const [applyForTrialButtonState, setApplyForTrialButtonState] = useState(1);
  //   const [currentApplicationId, setCurrentApplicationId] = useState(
  //     userApplication?.applicationId
  //   );
  const [currentShortDescription, setCurrentShortDescription] =
    useState(shortDescription);
  const [isRedirectToRegisterModalOpen, setIsRedirectToRegisterModalOpen] =
    useState(false);
  const authenticated = useIsAuthenticated();
  const { l } = useLanguageStore();

  //---------------- update trial ---------------
  const updateTrial = async (data: iTrialInfoProps) => {
    //function will be called in onSubmit
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/users`, //PATCH request
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(
        l("settings.tab1.form.toast.success") ||
          "Trial is updated successfully!",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error in /users", error);
      toast.error(
        l("settings.tab1.form.toast.error") || "Something went wrong!",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
    }
  };

  //----Yup validation ---------
  const formSchema = Yup.object({
    title: Yup.string()
      .required(
        l("settings.tab1.form.firstname.validation.required") ||
          "First name is required!"
      )
      .matches(
        /^[a-zA-ZæøåÆØÅ_-]+( [a-zA-ZæøåÆØÅ_-]+)*$/,
        l("settings.tab1.form.firstname.validation.format") ||
          "First name should only contain letters!"
      )
      .min(
        2,
        l("settings.tab1.form.firstname.validation.length") ||
          "First name must be at least 2 characters!"
      ),

    shortDescription: Yup.string()
      .required(
        l("settings.tab1.form.lastname.validation.required") ||
          "Last name is required!"
      )
      .matches(
        /^[a-zA-ZæøåÆØÅ_-]+( [a-zA-ZæøåÆØÅ_-]+)*$/,
        l("settings.tab1.form.lastname.validation.format") ||
          "Last name should only contain letters!"
      )
      .min(
        1,
        l("settings.tab1.form.lastname.validation.length") ||
          "Last name must be at least 1 characters!"
      ),
  });

  //--------------- formik ----------------
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
      trialSite: trialSite || "",
      recruitingStatus: recruitingStatus || false,
      ageMin: ageMin || "",
      ageMax: ageMax || "",
      applicantsNumber: applicantsNumber || "",
      startDate: startDate,
      endDate: endDate,
      submissionDeadline: submissionDeadline,
      location: trialSite?.location || "",
      address: trialSite?.address || "",
      zipCode: trialSite?.zipCode || "",
      country: trialSite?.country || "",
      gender: gender || "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      const data = {
        title: values.title,
        shortDescription: values.shortDescription,
        fullDescription: values.fullDescription,
        trialSite: values.trialSite,
        recruitingStatus: values.recruitingStatus,
        ageMin: values.ageMin,
        ageMax: values.ageMax,
        applicantsNumber: values.applicantsNumber,
        startDate: values.startDate,
        endDate: values.endDate,
        submissionDeadline: values.submissionDeadline,
        location: values.location,
        address: values.address,
        zipCode: values.zipCode,
        country: values.country,
        gender: values.gender,
      };

      updateTrial(data);
    },
    validationSchema: formSchema,
  });

  //---------------- GET trial details ---------------------
  //   async function getTrialDetails(
  //     id: number
  //   ): Promise<iTrialInfoProps | null> {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             accept: "application/json",
  //           },
  //         }
  //       );
  //       return res.data;
  //     } catch (error) {
  //       console.error(`Error in /v1/trials/${id}`, error);
  //       return null;
  //     }
  //   }

  //   function setNewestState(
  //     userApplication: iUserTrialApplication | null | undefined
  //   ) {
  //     if (userApplication) {
  //       setTrialHasBeenApplied(true);
  //       setCurrentApplicationId(userApplication.applicationId);
  //       if (userApplication) {
  //         const lastState =
  //           userApplication.applicationStates[
  //             userApplication.applicationStates.length - 1
  //           ].state;
  //         setCurrentApplicationState(lastState);
  //         setApplyForTrialButtonState(getButtonState(userApplication));
  //       } else {
  //         // Handle the case where userApplication is null
  //         setCurrentApplicationState(0); // Or whatever default state is appropriate
  //         setApplyForTrialButtonState(1); // Assuming 1 is the default state for the button
  //       }
  //     } else {
  //       setTrialHasBeenApplied(false);
  //       setCurrentApplicationState(0); // Or whatever default state is appropriate
  //       setApplyForTrialButtonState(1); // Assuming 1 is the default state for the button
  //     }
  //   }

  //   //----------------------------------------------
  //   async function getNewestState() {
  //     try {
  //       getTrialDetails(trialId).then((trial) =>
  //         setNewestState(trial?.userApplication)
  //       );
  //     } catch (error) {
  //       console.error("Error getting newest state:", error);
  //     }
  //   }

  //   //--------- set modal open and close ---------
  //   const handleApplyForTrial = () => {
  //     if (applyForTrialButtonState == 1) {
  //       setModalOpen(true);
  //     } else if (applyForTrialButtonState == 4) {
  //       setWarningModalOpen(true);
  //     }
  //   };

  //   const handleCloseModal = () => {
  //     setModalOpen(false);
  //     getNewestState();
  //   };

  //   const getButtonState = (userApplication: iUserTrialApplication | null) => {
  //     if (!isRecruiting) {
  //       return 2;
  //     }

  //     if (Date.parse(submissionDeadline) < Date.now()) {
  //       return 2;
  //     }

  //     if (userApplication) {
  //       if (
  //         userApplication.applicationStates[
  //           userApplication.applicationStates.length - 1
  //         ].state == 1
  //       ) {
  //         return 4;
  //       } else {
  //         return 3;
  //       }
  //     }

  //     return 1;
  //   };

  //   //--------- Check userApplication on component load -------------
  //   useEffect(() => {
  //     if (userApplication) {
  //       setNewestState(userApplication);
  //     }
  //   }, [userApplication]);

  //   useEffect(() => {
  //     setApplyForTrialButtonState(getButtonState(userApplication));
  //   }, [isRecruiting]);

  //   //---- open and close modal -----
  //   const openRedirectToRegisterModal = () => {
  //     setIsRedirectToRegisterModalOpen(true);
  //   };

  //-------------------------------------------- return -----------------------------------------------
  return (
    <section className="flex flex-col px-4 xs:px-8 md:mt-12  bg-bgColor-200">
      <div className="inline-flex items-center border border-primary-500 px-2 rounded-200 md:mr-4 mb-4 py-2 w-fit">
        <p className="text-sm font-bold">{l("trialdetails.id") || "ID:"}</p>
        <p className="text-sm font-light	">{trialId}</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row-reverse lg:gap-28">
          <div className="flex flex-col gap-4 lg:max-w-96 lg:sticky md:top-[50px] lg:h-[calc(100vh-50px)]">
            <div className="flex gap-2">
              <Image
                src="/add_user_icon.svg"
                alt="add_user_icon"
                width={32}
                height={32}
              />
              <div className="flex gap-2 items-center">
                <label htmlFor="password" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Status"}
                </label>
                <input
                  name="recruitingStatus"
                  type="text"
                  value={formik.values.recruitingStatus}
                  onChange={formik.handleChange("recruitingStatus")}
                  onBlur={formik.handleBlur("recruitingStatus")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.recruitingStatus &&
                    formik.errors.recruitingStatus}
                </small>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Location"}
                </label>
                <input
                  name="location"
                  type="text"
                  value={formik.values.location}
                  onChange={formik.handleChange("location")}
                  onBlur={formik.handleBlur("location")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.location && formik.errors.location}
                </small>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Address"}
                </label>
                <input
                  name="address"
                  type="text"
                  value={formik.values.location}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.address && formik.errors.address}
                </small>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="zipCode" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Zip Code"}
                </label>
                <input
                  name="zipCode"
                  type="text"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange("zipCode")}
                  onBlur={formik.handleBlur("zipCode")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.zipCode && formik.errors.zipCode}
                </small>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="country" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "country"}
                </label>
                <input
                  name="country"
                  type="text"
                  value={formik.values.country}
                  onChange={formik.handleChange("country")}
                  onBlur={formik.handleBlur("country")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.country && formik.errors.country}
                </small>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="minAge" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Min. Age"}
                </label>
                <input
                  name="ageMin"
                  type="text"
                  value={formik.values.ageMin}
                  onChange={formik.handleChange("ageMin")}
                  onBlur={formik.handleBlur("ageMin")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.ageMin && formik.errors.ageMin}
                </small>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="ageMax" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Max. Age"}
                </label>
                <input
                  name="ageMax"
                  type="text"
                  value={formik.values.country}
                  onChange={formik.handleChange("ageMax")}
                  onBlur={formik.handleBlur("ageMax")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.ageMax && formik.errors.ageMax}
                </small>
              </div>
            </div>


            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="startDate" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Start Study Date:"}
                </label>
                <input
                  name="startDate"
                  type="text"
                  value={formik.values.startDate}
                  onChange={formik.handleChange("startDate")}
                  onBlur={formik.handleBlur("startDate")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.startDate && formik.errors.startDate}
                </small>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="endDate" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "End Study Date:"}
                </label>
                <input
                  name="endDate"
                  type="text"
                  value={formik.values.endDate}
                  onChange={formik.handleChange("endDate")}
                  onBlur={formik.handleBlur("endDate")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.endDate && formik.errors.endDate}
                </small>
              </div>
            </div>


            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <label htmlFor="submissionDeadline" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Enrolment Deadline:"}
                </label>
                <input
                  name="submissionDeadline"
                  type="text"
                  value={formik.values.submissionDeadline}
                  onChange={formik.handleChange("submissionDeadline")}
                  onBlur={formik.handleBlur("submissionDeadline")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.submissionDeadline && formik.errors.submissionDeadline}
                </small>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="gender" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Biological Sex:"}
                </label>
                <input
                  name="gender"
                  type="text"
                  value={formik.values.gender}
                  onChange={formik.handleChange("gender")}
                  onBlur={formik.handleBlur("gender")}
                  className="register_input custom-border"
                />
                <small className="text-red-600">
                  {formik.touched.gender && formik.errors.gender}
                </small>
              </div>
            </div>



            <div className="flex flex-col">
              <button />
              <small className="text-xs mt-1.5	text-center">
                {l("trialdetails.cta.privacypolicy.description") ||
                  "If you are interesting in how we store and use your data, you can read more about in our"}{" "}
                <Link
                  href="https://trialsync.com/privacy"
                  target="_blank"
                  className="text-xs font-bold underline"
                >
                  {l("trialdetails.cta.privacypolicy.text") || "Privacy Policy"}
                </Link>
              </small>
            </div>
          </div>

          <div className="flex-1 flex-col gap-8">
            <div className="flex flex-col gap-4">
              {trialHasBeenApplied ? (
                <div className="hidden md:block">
                  <MessageBox currentState={currentApplicationState} />
                </div>
              ) : null}
              <h1 className="text-2xl font-semibold">{title}</h1>
              <Markdown remarkPlugins={[remarkGfm]}>
                {shortDescription}
              </Markdown>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
