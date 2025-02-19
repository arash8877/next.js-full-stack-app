"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import CustomButton from "./CustomButton";
import { toast } from "react-toastify";
import useLanguageStore from "@/stores/language-store";
import { CreateTrialTitleStepProps } from "@/types";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

//------------------------------------ main function ----------------------------------
export default function EditTrialTitleTab({
  trialId,
  title,
  shortDescription,
  fullDescription,
}: CreateTrialTitleStepProps) {
  const { l } = useLanguageStore();

  //----Yup validation ---------
  const formSchema = Yup.object({
    title: Yup.string()
      .required(
        l("settings.tab1.form.title.validation.required") ||
          "Title is required!"
      )
      .min(
        4,
        l("settings.tab1.form.title.validation.length") ||
          "Title must be at least 4 characters!"
      ),
    shortDescription: Yup.string()
      .required(
        l("settings.tab1.form.shortDescription.validation.required") ||
          "Brief Summary is required!"
      )
      .min(
        20,
        l("settings.tab1.form.shortDescription.validation.length") ||
          "Brief Summary must be at least 20 characters!"
      ),
    fullDescription: Yup.string()
      .transform((value) => value.replace(/<[^>]+>/g, "").trim()) // Remove HTML tags and trim
      .required(
        l("settings.tab1.form.description.validation.required") ||
          "Description is required!"
      )
      .min(
        40,
        l("settings.tab1.form.description.validation.length") ||
          "Description must be at least 40 characters!"
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
      title: title || "",
      shortDescription: shortDescription || "",
      fullDescription: fullDescription || "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      // eslint-disable-next-line
      const data = {
        trialId: trialId,
        title: values.title,
        shortDescription: values.shortDescription,
        fullDescription: values.shortDescription,
      };

      try {
        const token = localStorage.getItem("sp_token");
        // eslint-disable-next-line
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/update/step1`,
          {
            title: data.title,
            shortDescription: data.shortDescription,
            fullDescription: data.shortDescription,
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
    <section className="flex flex-col mt-8 lg:mt-12  bg-white rounded-lg">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-between gap-8 xl:gap-16">
          <div className="flex flex-col gap-4">
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

            <div className="flex flex-col w-full">
              <label
                htmlFor="shortDescription"
                className="text-sm font-semibold mb-2"
              >
                Brief Summary
              </label>
              <textarea
                name="shortDescription"
                value={formik.values.shortDescription}
                onChange={(e) =>
                  formik.setFieldValue("shortDescription", e.target.value)
                }
                placeholder={
                  l("placeholder.summary.key") ||
                  "Enter a brief summary of the trial"
                }
                className="register_input custom-border custom_height4 resize-none"
              />

              <small className="text-red-600 mt-1">
                {formik.touched.shortDescription &&
                  formik.errors.shortDescription}
              </small>
            </div>

            <div className="flex flex-col gap-4 xl:gap-16">
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="fullDescription"
                  className="text-sm font-semibold"
                >
                  Description:<span className="ml-1">*</span>
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
        </div>
      </form>
    </section>
  );
}
