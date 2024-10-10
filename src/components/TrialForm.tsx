"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { iTrialInfoProps, iUserTrialApplication } from "@/types";
import axios from "axios";
import RecruitingDropdown from "./RecruitingDropdown";
import CustomButton from "./CustomButton";
import GenderDropdown from "./GenderDropdown";
import DeleteTrialModal from "./DeleteTrialModal";
import CountryDropdown from "./CountryDropdown";
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
          "Title is required!"
      )
      .min(
        5,
        l("settings.tab1.form.firstname.validation.length") ||
          "Title must be at least 5 characters!"
      ),

    shortDescription: Yup.string()
      .required(
        l("settings.tab1.form.lastname.validation.required") ||
          "Short description is required!"
      )
      .min(
        10,
        l("settings.tab1.form.lastname.validation.length") ||
          "Short description must be at least 10 characters!"
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

  //--- open/close modal ----
  const [isDeleteTrialModalOpen, setIsDeleteTrialModalOpen] = useState(false);

  function handleOpenDeleteTrialModal() {
    setIsDeleteTrialModalOpen(!isDeleteTrialModalOpen);
  }

  function closeDeleteTrialModal() {
    setIsDeleteTrialModalOpen(false);
  }
  //-------------------------------------------- return -----------------------------------------------
  return (
    <section className="flex flex-col px-4 xs:px-8 md:mt-12  bg-bgColor-200">
      <div className="inline-flex items-center border border-primary-500 px-2 rounded-200 md:mr-4 mb-4 py-2 w-fit">
        <p className="text-sm font-bold">{l("trialdetails.id") || "ID:"}</p>
        <p className="text-sm font-light	">{trialId}</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-between gap-8 xl:flex-row-reverse xl:gap-16">
          <div className="flex flex-col gap-4 w-full xl:max-w-96 xl:sticky md:top-[50px] ">
            <div className="flex gap-2">
              <Image
                src="/add_user_icon.svg"
                alt="add_user_icon"
                width={32}
                height={32}
              />
              <div className="flex gap-2 items-center">
                <label
                  htmlFor="recruitingStatus"
                  className="text-sm font-semibold"
                >
                  {l("settings.tab4.form.password.label") || "Status:"}
                  <span className="ml-1">*</span>
                </label>
                <RecruitingDropdown
                  status={formik.values.gender}
                  setStatus={(value) => formik.setFieldValue("gender", value)}
                  borderColor="#DFF2DF"
                />
                <small className="text-red-600">
                  {formik.touched.recruitingStatus &&
                    formik.errors.recruitingStatus}
                </small>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="location" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Location:"}
                  <span className="ml-1">*</span>
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

              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="address" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Address:"}
                  <span className="ml-1">*</span>
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

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="zipCode" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Zip Code:"}
                  <span className="ml-1">*</span>
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

              <div className="flex flex-col gap-2 gap-2 w-1/2">
                <label htmlFor="country" className="text-sm font-semibold">
                  {l("settings.tab1.form.country.label") || "Country:"}
                  <span className="ml-1">*</span>
                </label>
                <CountryDropdown
                  country={formik.values.country}
                  setCountry={(value) => formik.setFieldValue("country", value)}
                  borderColor="#DFF2DF"
                />
                <small className="text-red-600">
                  {formik.touched.country && formik.errors.country}
                </small>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="minAge" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Min. Age:"}
                  <span className="ml-1">*</span>
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

              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="ageMax" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Max. Ag:"}
                  <span className="ml-1">*</span>
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

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="startDate" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") ||
                    "Start Study Date:"}
                  <span className="ml-1">*</span>
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

              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="endDate" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "End Study Date:"}
                  <span className="ml-1">*</span>
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

            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label
                  htmlFor="submissionDeadline"
                  className="text-sm font-semibold"
                >
                  {l("settings.tab4.form.password.label") ||
                    "Enrolment Deadline:"}
                  <span className="ml-1">*</span>
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
                  {formik.touched.submissionDeadline &&
                    formik.errors.submissionDeadline}
                </small>
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="gender" className="text-sm font-semibold">
                  {l("register.step3.form.gender.label") || "Biological sex:"}
                  <span className="ml-1">*</span>
                </label>
                <GenderDropdown
                  gender={formik.values.gender}
                  setGender={(value) => formik.setFieldValue("gender", value)}
                  borderColor="#DFF2DF"
                />
                <small className="text-red-600">
                  {formik.touched.gender && formik.errors.gender}
                </small>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 xl:w-1/2">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-sm font-semibold">
                {l("settings.tab4.form.password.label") || "Title:"}
              </label>
              <input
                name="title"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
                className="register_input custom-border"
              />
              <small className="text-red-600">
                {formik.touched.title && formik.errors.title}
              </small>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="shortDescription"
                className="text-sm font-semibold"
              >
                {l("settings.tab4.form.password.label") || "Short Description:"}
              </label>
              <textarea
                name="shortDescription"
                value={formik.values.shortDescription}
                onChange={formik.handleChange("shortDescription")}
                onBlur={formik.handleBlur("shortDescription")}
                className="textarea_input custom-border h-32"
              />
              <small className="text-red-600">
                {formik.touched.shortDescription &&
                  formik.errors.shortDescription}
              </small>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="fullDescription"
                className="text-sm font-semibold"
              >
                {l("settings.tab4.form.password.label") || "Full Description:"}
              </label>
              <textarea
                name="fullDescription"
                value={formik.values.fullDescription}
                onChange={formik.handleChange("fullDescription")}
                onBlur={formik.handleBlur("fullDescription")}
                className="textarea_input custom-border h-52"
              />
              <small className="text-red-600">
                {formik.touched.fullDescription &&
                  formik.errors.fullDescription}
              </small>
            </div>
          </div>
        </div>
        <div className="flex justify-center xs:justify-end gap-4 mt-8">
          <CustomButton
            title={l("settings.form.submit") || "Update"}
            containerStyles="rounded-lg gradient-green1 hover1"
            btnType="submit"
          />
          <CustomButton
            title={l("settings.tab3.btn.text") || "Delete user"}
            containerStyles="bg-bgColor-red rounded-lg"
            textStyles="text-white"
            handleClick={handleOpenDeleteTrialModal}
          />
        </div>
      </form>
      <DeleteTrialModal
        open={isDeleteTrialModalOpen}
        onClose={closeDeleteTrialModal}
      />
    </section>
  );
}
