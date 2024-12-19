"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { AxiosError } from "axios";
import {
  CreateTrialStep1FormProps,
  CreateTrialTitleStepProps,
} from "@/types/index";
import useCreateTrialStore from "@/stores/createTrial-store";
import Spinner from "./Spinner";
import useLanguageStore from "@/stores/language-store";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import useJWTUserInfo from "@/hooks/useJWTUserInfo";

//--------- Reusable Input Component ---------
const InputField: React.FC<
  CreateTrialStep1FormProps & {
    formik: ReturnType<typeof useFormik<CreateTrialTitleStepProps>>;
  }
> = ({ label, name, id, type, placeholder, formik, icon }) => (
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
        id={id}
        type={type}
        placeholder={placeholder}
        value={formik.values[name as keyof CreateTrialTitleStepProps] as string}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="register_input mt-2 custom-border"
        style={icon ? { paddingLeft: "2.5rem" } : {}}
      />
    </div>
    <small className="text-red-600">
      {formik.touched[name as keyof CreateTrialTitleStepProps] &&
        formik.errors[name as keyof CreateTrialTitleStepProps]}
    </small>
  </div>
);

//-------------------------------------- main function-----------------------------------------

const CreateTrialStep1Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore();
  const jwtInfo = useJWTUserInfo();
  const { formData, setFormData } = useCreateTrialStore();
  const [loading, setLoading] = useState(false);

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
      .transform((value) => value.replace(/<[^>]+>/g, "").trim()) // Remove HTML tags and trim
      .required(
        l("settings.tab1.form.shortDescription.validation.required") ||
          "Short description is required!"
      )
      .min(
        10,
        l("settings.tab1.form.shortDescription.validation.length") ||
          "Short description must be at least 10 characters!"
      ),
    fullDescription: Yup.string()
      .transform((value) => value.replace(/<[^>]+>/g, "").trim()) // Remove HTML tags and trim
      .required(
        l("register.step1.form.fullDescription.validation.required") ||
          "Full Description is required!"
      )
      .min(
        20,
        l("settings.tab1.form.fullDescription.validation.length") ||
          "Full description must be at least 20 characters!"
      ),
  });

  //---------- formik -----------
  const formik = useFormik({
    initialValues: {
      title: formData?.step1Data?.title || "",
      shortDescription: formData?.step1Data?.shortDescription || "",
      fullDescription: formData?.step1Data?.fullDescription || "",
    },
    validationSchema: formSchema,
    //----- on submit ---------
    onSubmit: async (values) => {
      setLoading(true);
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("token")
          : null;

      try {
        const payload = {
          sponsorId: jwtInfo.jwtInfo?.sponsor_id,
          title: values["title"],
          shortDescription: values["shortDescription"],
          fullDescription: values["fullDescription"],
        };
        setFormData({ step1Data: values });

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.setItem("currentTrialEditId", response.data);
        document.cookie =
          "createTrialStep1Completed=true; Path=/; max-age=7200";
        router.push("/create-trial/step2");
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setError(error.response.data.message || "An unknown error occurred");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  //----------------------------------- JSX ----------------------------------------------
  return (
    <form
      className="flex flex-col gap-6 w-full wrapper"
      onSubmit={formik.handleSubmit}
    >
      {loading && <Spinner />}
      {error && <p className="text-red-600">{error}</p>}

      <div className="flex flex-col gap-6">
        <InputField
          label={l("register.step1.form.title.label") || "Title"}
          name="title"
          id="title"
          type="text"
          placeholder={l("register.step1.form.title.placeholder") || "Title"}
          formik={formik}
        />

        <div className="flex flex-col gap-2 w-full mb-12">
          <label htmlFor="shortDescription" className="text-sm font-semibold">
            Short Description<span className="ml-1">*</span>
          </label>
          <div className="h-[200px]">
            <ReactQuill
              value={formik.values.shortDescription}
              onChange={(value) =>
                formik.setFieldValue("shortDescription", value)
              }
              className="h-full"
            />
          </div>

          <small className="text-red-600 mt-10">
            {formik.touched.shortDescription && formik.errors.shortDescription}
          </small>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="fullDescription" className="text-sm font-semibold">
            Full Description<span className="ml-1">*</span>
          </label>
          <div className="h-[400px]">
            <ReactQuill
              value={formik.values.fullDescription}
              onChange={(value) =>
                formik.setFieldValue("fullDescription", value)
              }
              className="h-full"
            />
          </div>

          <small className="text-red-600 mt-10">
            {formik.touched.fullDescription && formik.errors.fullDescription}
          </small>
        </div>
      </div>

      <div className="flex justify-center xs:justify-end gap-4 mt-20">
        <CustomButton
          title={l("register.step1.form.cta.btn") || "Next"}
          containerStyles="rounded-lg gradient-green1 hover1"
          // disabledContainerStyles="rounded-lg bg-gray-300"
          // disabled={!formik.isValid || !formik.dirty}
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default CreateTrialStep1Form;
