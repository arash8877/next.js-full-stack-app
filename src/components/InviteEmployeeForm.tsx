import { useState, forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { InviteEmployeeFormProps } from "@/types/index";
import useLanguageStore from "@/stores/language-store";

const InputField: React.FC<InviteEmployeeFormProps> = ({
  label,
  name,
  type,
  placeholder,
  formik,
  icon,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-start">
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
          className="absolute left-3 top-[59%] transform -translate-y-1/2"
        />
      )}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={String(formik.values[name])}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="register_input mt-2"
        style={icon ? { paddingLeft: "2.5rem" } : {}}
      />
    </div>
    <small className="text-red-600">
      {formik.touched[name] && formik.errors[name]}
    </small>
  </div>
);


//--------------------------------- main function ---------------------------------
const InviteEmployeeForm = forwardRef((props, ref) => {
  const [error, setError] = useState("");
  const { l } = useLanguageStore();


  //----------- Yup ------------
  const formSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required!")
      .min(2, "First name must be at least 2 characters!"),
    lastName: Yup.string()
      .required("Last name is required!")
      .min(1, "Last name must be at least 1 character!"),
    jobTitle: Yup.string()
      .required("Job title is required!")
      .min(2, "Job title must be at least 2 characters!"),
    email: Yup.string()
      .required("Email is required!")
      .email("Invalid email format"),
  });


  //------------- Formik -----------
  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      email: "",
    },
    validationSchema: formSchema,

    //----- onSubmit -----
    // eslint-disable-next-line
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");
    
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/sponsorcontacts/invite`,
          {
            redirectUri: "",
            email: values.email,
            jobTitle: values.jobTitle
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response for invite:", response)
        console.log("invite form submited")
        toast.success("Invitation is successfully sent", {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        });

      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response && error.response.data) {
            setError(error.response.data);
          } else {
            setError("An unknown error occurred");
            toast.error("Something went wrong!", {
              position: "top-center",
              autoClose: 2000,
              className: "single_line_toast",
            });
          }
        }
      }
    },
  });

  useImperativeHandle(ref, () => ({
    submit: formik.handleSubmit,
  }));

  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <div className="flex justify-center">
        <p className="text-red-600">{error}</p>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="grid gap-7 md:gap-6 lg:w-4/5">
          <InputField
            label={l("register.step2.form.jobTitle.label") || "Job title"}
            name="jobTitle"
            type="text"
            placeholder="e.g. Manager"
            formik={formik}
          />
          <InputField
            label={l("register.step2.form.email.label") || "Email"}
            name="email"
            type="email"
            placeholder="e.g. employee@email.com"
            formik={formik}
            icon="/email_icon.svg"
          />
        </div>
      </div>
    </form>
  );
});

InviteEmployeeForm.displayName = "InviteEmployeeForm";

export default InviteEmployeeForm;
