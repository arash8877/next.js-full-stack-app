"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { iTrialInfoProps } from "@/types";
import axios, { AxiosError } from "axios";
import CustomButton from "./CustomButton";
import CustomDateInput from "./CustomDateInput";
import AgeDropdown from "./AgeDropdown";
import RecruitingDropdown from "./RecruitingDropdown";
import GenderDropdown from "./GenderDropdown";
import { toast } from "react-toastify";
// import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import useLanguageStore from "@/stores/language-store";

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
  startDate,
  endDate,
  submissionDeadline,
  ageMin,
  ageMax,
  gender,
  recruiting,
}: iTrialInfoProps) {
  const { l } = useLanguageStore();

  //----Yup validation ---------
  // eslint-disable-next-line
  const formSchema = Yup.object({
    ageMin: Yup.number()
      .required(
        l("settings.tab1.form.ageMin.validation.required") ||
          "Minimum age is required!"
      )
      .min(0, "Minimum age must be greater than or equal to 0"),

    ageMax: Yup.number()
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
    recruiting: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Recruiting status is required!"
    ),
  });

  //--------------- formik ----------------
  const formik = useFormik({
    validationSchema: formSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    enableReinitialize: true,
    initialValues: {
      ageMin: ageMin || "",
      ageMax: ageMax || "",
      startDate: startDate,
      endDate: endDate,
      submissionDeadline: submissionDeadline,
      gender: gender || "",
      recruiting: recruiting || "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      // eslint-disable-next-line
      const data = {
        trialId: trialId,
        ageMin: Number(values.ageMin),
        ageMax: Number(values.ageMax),
        startDate: values.startDate,
        endDate: values.endDate,
        submissionDeadline: values.submissionDeadline,
        gender: values.gender,
        recruiting: values.recruiting,
      };

      const token = localStorage.getItem("token");
      try {
        // eslint-disable-next-line
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step3`,
          {
            startDate: data.startDate,
            endDate: data.endDate,
            submissionDeadline: data.submissionDeadline,
            gender: data.gender,
            ageMin: data.ageMin,
            ageMax: data.ageMax,
            recruiting: data.recruiting,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("The trial is updated successfully", {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(error);
        }

        toast.error(
          l("settings.tab1.form.toast.error") || "Something went wrong!",
          {
            position: "top-center",
            autoClose: 2000,
            className: "single_line_toast",
          }
        );
      }
    },
  });

  //-------------------------------------------- return -----------------------------------------------
  return (
    <section className="flex flex-col mt-8 lg:mt-12 bg-white rounded-3xl">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-2 sm:gap-6 md:top-[50px] xl:3/4">
          <div className="flex flex-col gap-2 sm:gap-6 xl:flex-row">
            <div className="flex flex-col gap-2 xl:w-1/2">
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
            <div className="flex flex-col gap-2 xl:w-1/2">
              <label htmlFor="ageMax" className="text-sm font-semibold">
                {l("settings.tab4.form.ageMax.label") || "Max. Age:"}
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

          <div className="flex flex-col gap-2 sm:gap-6 xl:flex-row">
            <div className="flex flex-col gap-2 xl:w-1/2">
              <label htmlFor="startDate" className="text-sm font-semibold">
                {l("settings.tab4.form.password.label") || "Start Study Date:"}
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

            <div className="flex flex-col gap-2 xl:w-1/2">
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

          <div className="flex flex-col gap-2 sm:gap-6 xl:flex-row">
            <div className="flex flex-col gap-2 xl:w-1/2">
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

            <div className="flex flex-col gap-2 xl:w-1/2">
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

          <div className="flex flex-col gap-2 xl:w-1/2 xl:pr-2">
            <label htmlFor="gender" className="text-sm font-semibold">
              {l("register.step3.form.gender.label") || "Recruiting status"}
              <span className="ml-1">*</span>
            </label>
            <RecruitingDropdown
              status={formik.values.recruiting}
              setStatus={(value) => formik.setFieldValue("recruiting", value)}
              borderColor="#DFF2DF"
            />
            <small className="text-red-600">
              {formik.touched.recruiting && formik.errors.recruiting}
            </small>
          </div>
        </div>

        <div className="flex justify-center xs:justify-end gap-4 mt-8">
          <CustomButton
            title={l("settings.form.submit") || "Update"}
            containerStyles="rounded-lg gradient-green1 hover1"
            btnType="submit"
          />
        </div>
      </form>
    </section>
  );
}
