"use client";

import { useState, useMemo, useCallback } from "react";
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
import Editor from "@/components/Editor";
import { withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";

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
const CreateTrialStep1Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  // eslint-disable-next-line
  const formSchema = Yup.object({
    title: Yup.string()
      .required(
        l("settings.tab1.form.title.validation.required") ||
          "Title is required!"
      )
      .min(
        4,
        l("settings.tab1.form.title.validation.length") ||
          "Title must be at least 2 characters!"
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
          "Long Description is required!"
      )
      .min(
        4,
        l("settings.tab1.form.fullDescription.validation.length") ||
          "Long description must be at least 4 characters!"
      ),
  });

  //-------------formik----------------
  const formik = useFormik({
    initialValues: {
      title: "",
      shortDescription: "",
      fullDescription: "",
    },
    //-----onSubmit-------
    // eslint-disable-next-line
    onSubmit: async (values) => {
      try {
        // const response = await axios.post(
        //   `${process.env.NEXT_PUBLIC_API_URL}/v1/keychain/basic`, //post request
        //   {
        //     verifyURL: `${window.location.origin}/register/step2`,
        //     title: values.title,
        //     shortDescription: values.shortDescription,
        //     fullDescription: values.fullDescription,
        //   }
        // );
        // console.log(response)
        console.log(values)
        // router.push("/create-trial/step2");
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.data) {
            setError(error.response.data);
          } else {
            setError("An unknown error occurred");
          }
        }
      }
    },
    // validationSchema: formSchema,
  });

   //----- Handlers for both editors -----
   const editorShortDescription = useMemo(() => withHistory(withReact(createEditor())), []);
   const editorFullDescription = useMemo(() => withHistory(withReact(createEditor())), []);

   const handleShortDescriptionChange = useCallback(
    (value: Descendant[]) => {
      const serializedContent = JSON.stringify(value);
      console.log('Short Description changed:', serializedContent);
      formik.setFieldValue("shortDescription", serializedContent);
    },
    [formik]
  );

  const handleFullDescriptionChange = useCallback(
    (value: Descendant[]) => {
      const serializedContent = JSON.stringify(value);
      console.log('Full Description changed:', serializedContent);
      formik.setFieldValue("fullDescription", serializedContent);
    },
    [formik]
  );

  //--------------------------------------------------Return---------------------------------------------
  return (
    <form
      className="flex flex-col gap-6 wrapper"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-center">
        <p className=" text-red-600">{error}</p>
      </div>

      <div className="flex flex-col gap-6 xl:w-3/4">
        <InputField
          label={l("register.step1.form.title.label") || "Title"}
          name="title"
          type="text"
          placeholder={l("register.step1.form.title.placeholder") || "Title"}
          formik={formik}
        />
        <div className="flex-col w-full">
          <label htmlFor="shortDescription" className="text-sm font-semibold">
            Short Description:<span className="ml-1">*</span>
          </label>
          <Editor
            editor={editorShortDescription}
            onChange={handleShortDescriptionChange}
            initialValue={initialValue}
          >
            <Editor.ToolBar />
            <Editor.Input />
          </Editor>
          <small className="text-red-600">
            {formik.touched.shortDescription && formik.errors.shortDescription}
          </small>
        </div>

        <div className="flex-col w-full">
          <label htmlFor="fullDescription" className="text-sm font-semibold">
            Full Description:<span className="ml-1">*</span>
          </label>
          <Editor
            editor={editorFullDescription}
            onChange={handleFullDescriptionChange}
            initialValue={initialValue}
          >
            <Editor.ToolBar />
            <Editor.Input />
          </Editor>
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

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default CreateTrialStep1Form;
