"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { iTrialInfoProps } from "@/types";
import axios, { AxiosError } from "axios";
import RecruitingDropdown from "./RecruitingDropdown";
import CustomButton from "./CustomButton";
import CustomDateInput from "./CustomDateInput";
import AgeDropdown from "./AgeDropdown";

import GenderDropdown from "./GenderDropdown";
import DeleteTrialModal from "./DeleteTrialModal";
import CountryDropdown from "./CountryDropdown";
import { toast } from "react-toastify";
// import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import useLanguageStore from "@/stores/language-store";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// function formatDate(dateString: string): string {
//   const options: Intl.DateTimeFormatOptions = {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   };
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", options);
// }

//----------------------------------- Main function -----------------------------------
export default function TrialDetailsLayout({
  trialId,
  title,
  shortDescription,
  fullDescription,
  trialSites,
  startDate,
  endDate,
  submissionDeadline,
  ageMin,
  ageMax,
  gender,
  recruitingStatus,
  applicantsNumber,
}: iTrialInfoProps) {
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  // const [currentApplicationState, setCurrentApplicationState] =
  //   useState<number>(0);
  // const [trialHasBeenApplied, setTrialHasBeenApplied] = useState(false);
  // const [applyForTrialButtonState, setApplyForTrialButtonState] = useState(1);
  //   const [currentApplicationId, setCurrentApplicationId] = useState(
  //     userApplication?.applicationId
  //   );
  // const [currentShortDescription, setCurrentShortDescription] =
  //   useState(shortDescription);
  // const [isRedirectToRegisterModalOpen, setIsRedirectToRegisterModalOpen] =
  //   useState(false);
  // const authenticated = useIsAuthenticated();
  const { l } = useLanguageStore();
  useEffect(() => {
    console.log("Sites", trialSites);
  }, [trialSites])
  
  //---------------- update trial ---------------
  // eslint-disable-next-line
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
  // eslint-disable-next-line
  const formSchema = Yup.object({
    title: Yup.string()
      .required(
        l("settings.tab1.form.title.validation.required") ||
          "Title is required!"
      )
      .min(
        5,
        l("settings.tab1.form.title.validation.length") ||
          "Title must be at least 5 characters!"
      ),

    shortDescription: Yup.string()
      .required(
        l("settings.tab1.form.shortDescription.validation.required") ||
          "Short description is required!"
      )
      .min(
        10,
        l("settings.tab1.form.shortDescription.validation.length") ||
          "Short description must be at least 10 characters!"
      ),

    fullDescription: Yup.string().required(
      l("settings.tab1.form.fullDescription.validation.required") ||
        "Full description is required!"
    ),

    trialSite: Yup.object({
      location: Yup.string().required(
        l("settings.tab1.form.location.validation.required") ||
          "Location is required!"
      ),
      address: Yup.string().required(
        l("settings.tab1.form.address.validation.required") ||
          "Address is required!"
      ),
      zipCode: Yup.string().required(
        l("settings.tab1.form.zipCode.validation.required") ||
          "ZIP Code is required!"
      ),
    }),

    recruitingStatus: Yup.boolean().oneOf(
      [true, false],
      "Recruiting status is required"
    ),

    ageMin: Yup.number()
      .required(
        l("settings.tab1.form.ageMin.validation.required") ||
          "Minimum age is required!"
      )
      .min(0, "Minimum age must be greater than or equal to 0"),

    ageMax: Yup.number()
      .required(
        l("settings.tab1.form.ageMax.validation.required") ||
          "Maximum age is required!"
      )
      .min(0, "Maximum age must be greater than or equal to 0")
      .when("ageMin", {
        is: (ageMin: number) => ageMin !== undefined && ageMin !== null,
        then: (schema) =>
          schema.min(
            Yup.ref("ageMin"),
            "Maximum age must be greater than or equal to minimum age!"
          ),
        otherwise: (schema) => schema,
      }),

    applicantsNumber: Yup.number()
      .required(
        l("settings.tab1.form.applicantsNumber.validation.required") ||
          "Number of applicants is required!"
      )
      .min(1, "Number of applicants must be at least 1"),

    startDate: Yup.date()
      .required(
        l("settings.tab1.form.startDate.validation.required") ||
          "Start date is required!"
      )
      .typeError("Please enter a valid start date"),

    endDate: Yup.date()
      .required(
        l("settings.tab1.form.endDate.validation.required") ||
          "End date is required!"
      )
      .typeError("Please enter a valid end date"),

    submissionDeadline: Yup.date()
      .required(
        l("settings.tab1.form.submissionDeadline.validation.required") ||
          "Submission deadline is required!"
      )
      .typeError("Please enter a valid submission deadline"),

    gender: Yup.string().required(
      l("settings.tab1.form.gender.validation.required") ||
        "Gender is required!"
    ),

    email: Yup.string()
      .required(
        l("settings.tab1.form.email.validation.required") ||
          "Email is required!"
      )
      .email("Please enter a valid email address"),
  });

  //--------------- formik ----------------
  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    enableReinitialize: true,
    initialValues: {
      title: title || "",
      shortDescription: shortDescription || "",
      fullDescription: fullDescription || "",
      recruitingStatus: recruitingStatus || false,
      ageMin: ageMin || "",
      ageMax: ageMax || "",
      applicantsNumber: applicantsNumber || "",
      startDate: startDate,
      endDate: endDate,
      submissionDeadline: submissionDeadline,
      location: trialSites?.[0]?.name || "",
      address: trialSites?.[0]?.address || "",
      zipCode: trialSites?.[0]?.zipCode || "",
      country: trialSites?.[0]?.country || "",
      gender: gender || "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      console.log("Submit")
      // eslint-disable-next-line
      const data = {
        trialId: trialId,
        title: values.title,
        shortDescription: values.shortDescription,
        fullDescription: values.fullDescription,
        recruitingStatus: values.recruitingStatus,
        ageMin: Number(values.ageMin),
        ageMax: Number(values.ageMax),
        applicantsNumber: values.applicantsNumber,
        startDate: values.startDate,
        endDate: values.endDate,
        submissionDeadline: values.submissionDeadline,
        location: values.location,
        address: values.address,
        zipCode: values.zipCode,
        country: values.country,
        gender: values.gender,
        urlStub: "hhhh",
        approvedOn: new Date().toISOString(), // Convert Date to string
        isCompleted: false,
      };

      const token = localStorage.getItem("token");
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/edit`, {
            title: data.title,
            shortDescription: data.shortDescription,
            fullDescription: data.fullDescription,
            isRecruiting: data.recruitingStatus,
            ageMin: data.ageMin,
            ageMax: data.ageMax,
            gender: data.gender,
            startDate: data.startDate,
            endDate: data.endDate,
            submissionDeadline: data.submissionDeadline
          },          
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response in step2:", response)
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
        }
      }
    },
  });

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
    <section className="flex flex-col mt-8 md:mt-12  bg-bgColor-200">
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

              <div className="flex flex-col gap-2 w-1/2">
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
                <label htmlFor="ageMin" className="text-sm font-semibold">
                  {l("settings.tab4.form.password.label") || "Min. Age:"}
                  <span className="ml-1">*</span>
                </label>
                <AgeDropdown
                  age={Number(formik.values.ageMin)}
                  setAge={(value) => formik.setFieldValue("ageMin", value)}
                  borderColor="#DFF2DF"
                />
                <small className="text-red-600">
                  {formik.touched.ageMin && formik.errors.ageMin}
                </small>
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="ageMax" className="text-sm font-semibold">
                  {l("settings.tab4.form.ageMax.label") || "Max. Age:"}
                  <span className="ml-1">*</span>
                </label>
                <AgeDropdown
                  age={Number(formik.values.ageMax)}
                  setAge={(value) => formik.setFieldValue("ageMax", value)}
                  borderColor="#DFF2DF"
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
                <CustomDateInput
                  value={formik.values.startDate}
                  onChange={(date) => formik.setFieldValue("startDate", date)}
                  onBlur={formik.handleBlur}
                  borderColor="custom-border"
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
                <CustomDateInput
                  value={formik.values.endDate}
                  onChange={(date) => formik.setFieldValue("endDate", date)}
                  onBlur={formik.handleBlur}
                  borderColor="custom-border"
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
                <CustomDateInput
                  value={formik.values.submissionDeadline}
                  onChange={(date) =>
                    formik.setFieldValue("submissionDeadline", date)
                  }
                  onBlur={formik.handleBlur}
                  borderColor="custom-border"
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

            <div className="flex flex-col gap-4 xl:gap-16">

            <div className="flex flex-col gap-2 w-full">
              <label
                htmlFor="shortDescription"
                className="text-sm font-semibold"
              >
                Short Description:<span className="ml-1">*</span>
              </label>
              <ReactQuill
                value={formik.values.shortDescription}
                onChange={(value) =>
                  formik.setFieldValue("shortDescription", value)
                }
              />
              <small className="text-red-600">
                {formik.touched.shortDescription &&
                  formik.errors.shortDescription}
              </small>
            </div>

            <div className="flex flex-col gap-2 w-full">
            <label
                htmlFor="fullDescription"
                className="text-sm font-semibold"
              >
                Full Description:<span className="ml-1">*</span>
              </label>
              <ReactQuill
                value={formik.values.fullDescription}
                onChange={(value) =>
                  formik.setFieldValue("fullDescription", value)
                }
              />
              <small className="text-red-600">
                {formik.touched.fullDescription &&
                  formik.errors.fullDescription}
              </small>
            </div>
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
            title={l("settings.tab3.btn.text") || "Delete Trial"}
            containerStyles="bg-bgColor-red rounded-lg"
            textStyles="text-white"
            handleClick={handleOpenDeleteTrialModal}
          />
        </div>
      </form>
      <DeleteTrialModal
        trialId={trialId}
        open={isDeleteTrialModalOpen}
        onClose={closeDeleteTrialModal}
      />
    </section>
  );
}
