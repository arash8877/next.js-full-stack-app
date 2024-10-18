"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { AxiosError } from "axios";
import {
  CreateTrialStep1FormProps,
  CreateTrialCompanyInfoProps,
} from "@/types/index";
import useLanguageStore from "@/stores/language-store";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

//--------- Reusable Input Component ---------
const InputField: React.FC<
  CreateTrialStep1FormProps & {
    formik: ReturnType<typeof useFormik<CreateTrialCompanyInfoProps>>;
  }
> = ({ label, name, type, placeholder, formik, icon }) => (
  <div className="flex flex-col">
    <label htmlFor={name}>
      {label}
      <span className="ml-1">*</span>
    </label>
    <div className="relative">
      {icon && (
        <Image
          src={icon}
          width={20}
          height={16}
          alt={`${name}-icon`}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={
          formik.values[name as keyof CreateTrialCompanyInfoProps] as string
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="register_input mt-2 custom-border"
        style={icon ? { paddingLeft: "2.5rem" } : {}}
      />
    </div>
    <small className="text-red-600">
      {formik.touched[name as keyof CreateTrialCompanyInfoProps] &&
        formik.errors[name as keyof CreateTrialCompanyInfoProps]}
    </small>
  </div>
);

//-------------------------------------- main function-----------------------------------------
// Your form component
const CreateTrialStep1Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore();

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
          "Short description is required!"
      )
      .min(
        4,
        l("settings.tab1.form.shortDescription.validation.length") ||
          "Short description must be at least 4 characters!"
      ),
    fullDescription: Yup.string()
      .required(
        l("register.step1.form.fullDescription.validation.required") ||
          "Full Description is required!"
      )
      .min(
        4,
        l("settings.tab1.form.fullDescription.validation.length") ||
          "Full description must be at least 4 characters!"
      ),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          shortDescription: JSON.stringify(values.shortDescription),
          fullDescription: JSON.stringify(values.fullDescription),
        };
        // const response = await axios.post('/your-api-endpoint', payload);
        console.log(payload);
        router.push("/create-trial/step2");
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setError(error.response.data.message || "An unknown error occurred");
        } else {
          setError("An unknown error occurred");
        }
      }
    },
  });

  //----------------------------------- JSX ----------------------------------------------
  return (
    <form
      className="flex flex-col gap-6 wrapper"
      onSubmit={formik.handleSubmit}
    >
      {error && <p className="text-red-600">{error}</p>}

      <div className="flex flex-col gap-6 lg:w-2/3">
        <InputField
          label={l("register.step1.form.title.label") || "Title"}
          name="title"
          type="text"
          placeholder={l("register.step1.form.title.placeholder") || "Title"}
          formik={formik}
        />

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="shortDescription" className="text-sm font-semibold">
            Short Description:<span className="ml-1">*</span>
          </label>
          <ReactQuill
            value={formik.values.shortDescription}
            onChange={(value) =>
              formik.setFieldValue("shortDescription", value)
            }
          />
          <small className="text-red-600">
            {formik.touched.shortDescription && formik.errors.shortDescription}
          </small>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="fullDescription" className="text-sm font-semibold">
            Full Description:<span className="ml-1">*</span>
          </label>
          <ReactQuill
            value={formik.values.fullDescription}
            onChange={(value) => formik.setFieldValue("fullDescription", value)}
          />
          <small className="text-red-600">
            {formik.touched.fullDescription && formik.errors.fullDescription}
          </small>
        </div>
      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Next"}
          containerStyles="rounded-lg gradient-green1 hover1"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default CreateTrialStep1Form;
