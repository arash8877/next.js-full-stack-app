import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { AxiosError } from "axios";
import { InviteEmployeeFormProps } from "@/types/index";
import useLanguageStore from "@/stores/language-store";

//--------- Reusable Input Component ---------
const InputField: React.FC<InviteEmployeeFormProps> = ({
  label,
  name,
  type,
  placeholder,
  formik,
  icon,
}) => (
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

//-------------------------------------- main function-----------------------------------------
const InviteEmployeeForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore();

  //----------------- Yup validation ---------------
  // eslint-disable-next-line
  const formSchema = Yup.object({
    firstName: Yup.string()
      .required(
        l("settings.tab1.form.firstname.validation.required") ||
          "First name is required!"
      )
      .matches(
        /^[a-zA-ZæøåÆØÅ_-]+( [a-zA-ZæøåÆØÅ_-]+)*$/,
        l("settings.tab1.form.firstname.validation.format") ||
          "First name should only contain letters!"
      )
      .min(
        2,
        l("settings.tab1.form.firstname.validation.length") ||
          "First name must be at least 2 characters!"
      ),
    lastName: Yup.string()
      .required(
        l("settings.tab1.form.lastname.validation.required") ||
          "Last name is required!"
      )
      .matches(
        /^[a-zA-ZæøåÆØÅ_-]+( [a-zA-ZæøåÆØÅ_-]+)*$/,
        l("settings.tab1.form.lastname.validation.format") ||
          "Last name should only contain letters!"
      )
      .min(
        1,
        l("settings.tab1.form.lastname.validation.length") ||
          "Last name must be at least 1 characters!"
      ),
    jobTitle: Yup.string()
      .required(
        l("settings.tab1.form.jobTitle.validation.required") ||
          "Job title is required!"
      )
      .min(
        2,
        l("settings.tab1.form.jobTitle.validation.length") ||
          "Last name must be at least 2 characters!"
      ),
    email: Yup.string()
      .required(
        l("register.step2.form.email.validation.required") ||
          "Email is required!"
      )
      .email(
        l("register.step2.form.email.validation.format") ||
          "Invalid email format"
      ),
  });

  //-------------formik----------------
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
    },
    //-----onSubmit-------
    // eslint-disable-next-line
    onSubmit: async (values) => {
      try {
        // const response = await axios.post(
        //   `${process.env.NEXT_PUBLIC_API_URL}/v1/keychain/basic`, //post request
        //   {
        //     verifyURL: `${window.location.origin}/register/step2`,
        //     firstName: values.firstName,
        //     lastName: values.lastName,
        //     jobTitle: values.jobTitle,
        //     email: values.email,
        //   }
        // );
        toast.success("Invitation is successfully sent", {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        });

        router.push("/employees");
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
    // eslint-disable-next-line
    // validationSchema: formSchema,
  });

  //--------------------------------------------------Return---------------------------------------------
  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <div className="flex justify-center">
        <p className=" text-red-600">{error}</p>
      </div>
      <div className="flex flex-col gap-6 w-full lg:flex-row lg:justify-between">
        <div className="grid gap-7 md:gap-6 lg:w-4/5 md:grid-cols-">
          <InputField
            label={l("register.step2.form.firstname.label") || "First name"}
            name="firstName"
            type="text"
            placeholder={
              l("register.step2.form.firstname.placeholder") || "e.g. John"
            }
            formik={formik}
          />
          <InputField
            label={l("register.step2.form.lastname.label") || "Last name"}
            name="lastName"
            type="text"
            placeholder={
              l("register.step2.form.lastname.placeholder") || "e.g. Smith"
            }
            formik={formik}
          />
        </div>
        <div className="grid gap-7 md:gap-6 lg:w-4/5 md:grid-cols-">
          <InputField
            label={l("register.step2.form.lastname.label") || "Job title"}
            name="jobTitle"
            type="text"
            placeholder={
              l("register.step2.form.lastname.placeholder") || "e.g. Manager"
            }
            formik={formik}
          />
          <InputField
            label={l("register.step2.form.email.label") || "Email"}
            name="email"
            type="email"
            placeholder={
              l("register.step2.form.email.placeholder") || "employee@email.com"
            }
            formik={formik}
            icon="/email_icon.svg"
          />
        </div>
      </div>
      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step2.form.cta.btn") || "Invite"}
          containerStyles="rounded-lg gradient-green1 hover1"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default InviteEmployeeForm;
