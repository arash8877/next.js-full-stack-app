"use client";

import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  MutableRefObject,
} from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import * as Yup from "yup";
import "react-quill/dist/quill.snow.css";
import CustomButton from "./CustomButton";
import useCreateTrialStore from "@/stores/createTrial-store";
import useLanguageStore from "@/stores/language-store";
import useJWTUserInfo from "@/hooks/useJWTUserInfo";
import {
  CreateTrialStep1FormProps,
  CreateTrialCompanyInfoProps,
} from "@/types/index";
import ReactQuill, { ReactQuillProps } from "react-quill";

// InputField Component (unchanged)
const InputField: React.FC<
  CreateTrialStep1FormProps & {
    formik: ReturnType<typeof useFormik<CreateTrialCompanyInfoProps>>;
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

// QuillEditor Component using forwardRef
const QuillEditor = forwardRef<ReactQuill, ReactQuillProps>(
  ({ value, onChange, className }, ref) => (
    <ReactQuill
      ref={ref as unknown as MutableRefObject<ReactQuill>}
      value={value}
      onChange={onChange}
      className={className}
    />
  )
);

QuillEditor.displayName = "QuillEditor";

const CreateTrialStep1Form = () => {
  const router = useRouter();
  const quillShortRef = useRef<ReactQuill | null>(null); // Separate refs for short and full editors
  const quillFullRef = useRef<ReactQuill | null>(null);
  const { l } = useLanguageStore();
  const jwtInfo = useJWTUserInfo();
  const { formData, setFormData } = useCreateTrialStore();
  const [error, setError] = useState("");

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
    shortDescription: Yup.mixed()
      .required("Short description is required!")
      .test(
        "delta-valid",
        "Short description must not be empty!",
        (value: { ops?: unknown[] } | undefined) => (value?.ops?.length ?? 0) > 0
      ),
    fullDescription: Yup.mixed()
      .required("Full description is required!")
      .test(
        "delta-valid",
        "Full description must not be empty!",
        (value: { ops?: unknown[] } | undefined) => (value?.ops?.length ?? 0) > 0
      ),
  });

  const normalizeValue = (
    value: string | { ops: never[] } | undefined
  ): string =>
    typeof value === "string" ? value : JSON.stringify(value || "");

  const formik = useFormik({
    initialValues: {
      title: formData?.step1Data?.title || "",
      shortDescription: normalizeValue(formData?.step1Data?.shortDescription),
      fullDescription: normalizeValue(formData?.step1Data?.fullDescription),
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const normalizedValues = {
        ...values,
        shortDescription: normalizeValue(values.shortDescription),
        fullDescription: normalizeValue(values.fullDescription),
      };

      setFormData({ step1Data: normalizedValues });

      // Perform API call
      try {
        const payload = {
          sponsorId: jwtInfo.jwtInfo?.sponsor_id,
          title: normalizedValues.title,
          shortDescription: normalizedValues.shortDescription,
          fullDescription: normalizedValues.fullDescription,
        };

        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/trials`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response in step1:", payload);
        localStorage.setItem("currentTrialEditId", response.data);
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

  const handleEditorChange = (value: string, editorType: "short" | "full") => {
    const delta =
      editorType === "short"
        ? quillShortRef.current?.getEditor()?.getContents()
        : quillFullRef.current?.getEditor()?.getContents();
    formik.setFieldValue(
      editorType === "short" ? "shortDescription" : "fullDescription",
      delta
    );
  };

  useEffect(() => {
    if (quillShortRef.current && formData.step1Data.shortDescription) {
      quillShortRef.current
        .getEditor()
        .setContents(JSON.parse(formData.step1Data.shortDescription));
    }
    if (quillFullRef.current && formData.step1Data.fullDescription) {
      quillFullRef.current
        .getEditor()
        .setContents(JSON.parse(formData.step1Data.fullDescription));
    }
  }, [formData]);

  return (
    <form
      className="flex flex-col gap-6 w-full wrapper"
      onSubmit={formik.handleSubmit}
    >
      {error && <p className="text-red-600">{error}</p>}

      <InputField
        label={l("register.step1.form.title.label") || "Title"}
        name="title"
        id="title"
        type="text"
        placeholder={l("register.step1.form.title.placeholder") || "Title"}
        formik={formik}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="shortDescription">Short Description</label>
        <QuillEditor
          ref={quillShortRef}
          value={formik.values.shortDescription}
          onChange={(value) => handleEditorChange(value, "short")}
          className="h-full"
        />
        <small className="text-red-600">
          {formik.touched.shortDescription && formik.errors.shortDescription}
        </small>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="fullDescription">Full Description</label>
        <QuillEditor
          ref={quillFullRef}
          value={formik.values.fullDescription}
          onChange={(value) => handleEditorChange(value, "full")}
          className="h-full"
        />
        <small className="text-red-600">
          {formik.touched.fullDescription && formik.errors.fullDescription}
        </small>
      </div>

      <CustomButton
        title={l("register.step1.form.cta.btn") || "Next"}
        containerStyles="rounded-lg gradient-green1 hover1"
        disabledContainerStyles="rounded-lg bg-gray-300"
        disabled={!formik.isValid || !formik.dirty}
        btnType="submit"
      />
    </form>
  );
};

export default CreateTrialStep1Form;
