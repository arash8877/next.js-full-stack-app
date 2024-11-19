"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios, {AxiosError} from "axios";
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


  //---------------- update trial ---------------
  // eslint-disable-next-line
  const updateTrial = async (data: CreateTrialTitleStepProps) => {
    //function will be called in onSubmit
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/edit`, //PATCH request
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
      };

      const token = localStorage.getItem("token");
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials/${trialId}/edit`, {
            title: data.title,
            shortDescription: data.shortDescription,
            fullDescription: data.fullDescription,
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

  //-------------------------------------------- return -----------------------------------------------
  return (
    <section className="flex flex-col mt-8 md:mt-12  bg-bgColor-200">
      <div className="inline-flex items-center border border-primary-500 px-2 rounded-200 md:mr-4 mb-4 py-2 w-fit">
        <p className="text-sm font-bold">{l("trialdetails.id") || "ID:"}</p>
        <p className="text-sm font-light	">{trialId}</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4 w-full xl:max-w-96 xl:sticky md:top-[50px] ">

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
        </div>
      </form>

    </section>
  );
}
