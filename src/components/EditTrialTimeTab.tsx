"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { iTrialInfoProps } from "@/types";
import axios, { AxiosError } from "axios";
import CustomButton from "./CustomButton";
import CustomDateInput from "./CustomDateInput";
import AgeDropdown from "./AgeDropdown";
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
  minimumAge,
  maximumAge,
  biologicalSex,
}: iTrialInfoProps) {
  const { l } = useLanguageStore();

  //----Yup validation ---------
  const formSchema = Yup.object({
    startDate: Yup.date().required(
      l("settings.tab1.form.place.validation.required") ||
        "Start date is required!"
    ),
    endDate: Yup.date()
      .required(
        l("settings.tab1.form.address.validation.required") ||
          "End date is required!"
      )
      .min(Yup.ref("startDate"), "End date must be later than start date"),
    deadline: Yup.date()
      .required(
        l("register.step1.form.zipCode.validation.required") ||
          "Deadline is required!"
      )
      .max(
        Yup.ref("endDate"),
        "Deadline should not be later than End Study Date"
      ),
    maximumAge: Yup.number()
      .min(
        Yup.ref("minimumAge"),
        "Maximum age should be greater than or equal to minimum age"
      )
      .integer("Maximum age must be an integer")
      .max(120, "Maximum age should be less than or equal to 120 years"),
    minimumAge: Yup.number()
      .typeError("Minimum age must be a valid number")
      .required(
        l("register.step1.form.country.validation.required") ||
          "Minimum age is required!"
      )
      .integer("Minimum age must be an integer")
      .min(18, "Minimum age should be 18 years or older")
      .max(119, "Minimum age should be less than 120 years"),

      biologicalSex: Yup.string().required(
      l("register.step1.form.country.validation.required") ||
        "Gender is required!"
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
      minimumAge: minimumAge || "",
      maximumAge: maximumAge || "",
      startDate: startDate,
      endDate: endDate,
      submissionDeadline: submissionDeadline,
      biologicalSex: biologicalSex || "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      // eslint-disable-next-line
      const data = {
        trialId: trialId,
        minimumAge: Number(values.minimumAge),
        maximumAge: Number(values.maximumAge),
        startDate: values.startDate,
        endDate: values.endDate,
        submissionDeadline: values.submissionDeadline,
        biologicalSex: values.biologicalSex,
      };

      const token = localStorage.getItem("sp_token");
      try {
        // eslint-disable-next-line
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step3`,
          {
            startDate: data.startDate,
            endDate: data.endDate,
            submissionDeadline: data.submissionDeadline,
            biologicalSex: data.biologicalSex,
            minimumAge: data.minimumAge,
            maximumAge: data.maximumAge,
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

        setTimeout(() => window.location.reload(), 2000);
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
              <label htmlFor="minimumAge" className="text-sm font-semibold">
                {l("settings.tab4.form.password.label") || "Min. Age:"}
                <span className="ml-1">*</span>
              </label>
              <AgeDropdown
                age={Number(formik.values.minimumAge)}
                setAge={(value) => formik.setFieldValue("minimumAge", value)}
                borderColor="#DFF2DF"
              />
              <small className="text-red-600">
                {formik.touched.minimumAge && formik.errors.minimumAge}
              </small>
            </div>
            <div className="flex flex-col gap-2 xl:w-1/2">
              <label htmlFor="maximumAge" className="text-sm font-semibold">
                {l("settings.tab4.form.maximumAge.label") || "Max. Age:"}
              </label>
              <AgeDropdown
                age={Number(formik.values.maximumAge)}
                setAge={(value) => formik.setFieldValue("maximumAge", value)}
                borderColor="#DFF2DF"
              />
              <small className="text-red-600">
                {formik.touched.maximumAge && formik.errors.maximumAge}
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
                minDate={
                  formik.values.startDate
                    ? new Date(formik.values.startDate) // Set minDate to start date for end date
                    : undefined
                }
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
                onBlur={formik.handleBlur("submissionDeadline")}
                borderColor="custom-border"
                maxDate={
                  formik.values.endDate
                    ? new Date(
                        new Date(formik.values.endDate).setDate(
                          new Date(formik.values.endDate).getDate() - 1
                        )
                      )
                    : undefined
                }
              />
              <small className="text-red-600">
                {formik.touched.submissionDeadline &&
                  formik.errors.submissionDeadline}
              </small>
            </div>

            <div className="flex flex-col gap-2 xl:w-1/2">
              <label htmlFor="biologicalSex" className="text-sm font-semibold">
                {l("register.step3.form.gender.label") || "Biological sex:"}
                <span className="ml-1">*</span>
              </label>
              <GenderDropdown
                gender={formik.values.biologicalSex}
                setGender={(value) => formik.setFieldValue("biologicalSex", value)}
                borderColor="#DFF2DF"
              />
              <small className="text-red-600">
                {formik.touched.biologicalSex && formik.errors.biologicalSex}
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
        </div>
      </form>
    </section>
  );
}
