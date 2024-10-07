import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Yup from "yup";
import Link from "next/link";
import CustomButton from "./CustomButton";
import Consent from "./Consent";
import axios, { AxiosError } from "axios";
import { Step2FormProps } from "@/types/index";
import useLanguageStore from "@/stores/language-store";




//--------- Reusable Input Component ---------
const InputField: React.FC<Step2FormProps> = ({
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
const RegisterStep2Form = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore(); 

  //----------------- Yup validation ---------------
const formSchema = Yup.object({
  firstName: Yup.string()
    .required(l("settings.tab1.form.firstname.validation.required") || "First name is required!")
    .matches(
      /^[a-zA-ZæøåÆØÅ_-]+( [a-zA-ZæøåÆØÅ_-]+)*$/,
      (l("settings.tab1.form.firstname.validation.format") || "First name should only contain letters!")
    )
    .min(2, (l("settings.tab1.form.firstname.validation.length") || "First name must be at least 2 characters!")),
  lastName: Yup.string()
    .required(l("settings.tab1.form.lastname.validation.required") || "Last name is required!")
    .matches(
      /^[a-zA-ZæøåÆØÅ_-]+( [a-zA-ZæøåÆØÅ_-]+)*$/,
      (l("settings.tab1.form.lastname.validation.format") || "Last name should only contain letters!")
    )
    .min(1, (l("settings.tab1.form.lastname.validation.length") || "Last name must be at least 1 characters!")),
  jobTitle: Yup.string()
    .required(l("settings.tab1.form.jobTitle.validation.required") || "Job title is required!")
    .min(2, (l("settings.tab1.form.jobTitle.validation.length") || "Last name must be at least 2 characters!")),
  email: Yup.string()
    .required(l("register.step2.form.email.validation.required") || "Email is required!")
    .email(l("register.step2.form.email.validation.format") || "Invalid email format"),
  password: Yup.string()
    .required(l("register.step2.form.password.validation.required") || "Password is required!")
    .min(8, (l("register.step2.form.password.validation.format") || "Password must be at least 8 characters")),
  repeatedPassword: Yup.string()
    .required(l("register.step2.form.repeatpassword.validation.required") || "Please repeat the password!")
    .oneOf([Yup.ref("password")], (l("register.step2.form.repeatpassword.validation.format") || "Passwords must match!")),
  consentedToTerms: Yup.boolean().oneOf(
    [true],
    (l("register.step2.form.termsandconditions.validation.required") || "You must accept the terms and conditions.")
  ),
  hasConsentedToMarketing: Yup.boolean(),
});


  //-------------formik----------------
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      password: "",
      repeatedPassword: "",
      consentedToTerms: false,
      hasConsentedToMarketing: false,
    },
    //-----onSubmit-------
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/keychain/basic`, //post request
          {
            verifyURL: `${window.location.origin}/register/step2`,
            firstName: values.firstName,
            lastName: values.lastName,
            jobTitle: values.jobTitle,
            email: values.email,
            password: values.password,
            repeatedPassword: values.repeatedPassword,
            consentedToTerms: values.consentedToTerms,
            hasConsentedToMarketing: values.hasConsentedToMarketing,
          }
        );

        localStorage.setItem("token", response.data.token);

        router.push("/register/step3");
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
    validationSchema: formSchema,
  });


  //--------------------------------------------------Return---------------------------------------------
  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <div className="flex justify-center">
        <p className=" text-red-600">{error}</p>
      </div>
      <InputField
        label={l("register.step2.form.firstname.label") || "First name"}
        name="firstName"
        type="text"
        placeholder={l("register.step2.form.firstname.placeholder") || "e.g. John"}
        formik={formik}
      />
      <InputField
        label={l("register.step2.form.lastname.label") || "Last name"}
        name="lastName"
        type="text"
        placeholder={l('register.step2.form.lastname.placeholder') || "e.g. Smith"}
        formik={formik}
      />
      <InputField
        label={l("register.step2.form.lastname.label") || "Job title"}
        name="jobTitle"
        type="text"
        placeholder={l('register.step2.form.lastname.placeholder') || "e.g. Manager"}
        formik={formik}
      />
      <InputField
        label={l("register.step2.form.email.label") || "Email"}
        name="email"
        type="email"
        placeholder={l('register.step2.form.email.placeholder') || "youremail@email.com"}
        formik={formik}
        icon="/email_icon.svg"
      />
      <InputField
        label={l("register.step2.form.password.label") || "Enter your password"}
        name="password"
        type="password"
        placeholder={l("register.step2.form.password.placeholder") || "Min. 8 characters"}
        formik={formik}
      />
      <InputField
        label={l("register.step2.form.repeatpassword.label") || "Repeat password"}
        name="repeatedPassword"
        type="password"
        placeholder={l("register.step2.form.repeatpassword.placeholder") || "Min. 8 characters"}
        formik={formik}
      />
      <div className="md:pr-20">
        <Consent
          title={l("register.step2.form.termsandconditions.title") || "Consent to Terms and Conditions"}
          label={l("register.step2.form.termsandconditions.label") || "I have read and agree to the Terms and Conditions."}
          name="consentedToTerms"
          value={formik.values.consentedToTerms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.consentedToTerms && formik.errors.consentedToTerms
          }
        >
          <small className="text-sm ">
            {l("register.step2.form.termsandconditions.text1") || "By checking this box, you agree to TrialSync's"}{" "}
            <Link
              href="https://www.trialsync.com/terms-and-conditions"
              target="_blank"
              className="font-bold underline"
            >
              {l("register.step2.form.termsandconditions.cta.text") || "Terms and Conditions"}
            </Link>{" "}
            {l("register.step2.form.termsandconditions.text2") || "and acknowledge our"}{" "}
            <Link
              href="https://www.trialsync.com/privacy"
              target="_blank"
              className="font-bold underline"
            >
              {l("register.step2.form.termsandconditions.privacy.cta.text") || "Privacy Policy"}
            </Link>
            {l("register.step2.form.termsandconditions.text3") || ". We will not sell or share your personal information. Your data is used solely to enhance your experience with us."}
          </small>
        </Consent>
        <Consent
          title={l("register.step2.form.marketingconsent.title") || "Consent to Email Marketing"}
          label={l("register.step2.form.marketingconsent.label") || "I agree to receive marketing emails."}
          name="hasConsentedToMarketing"
          value={formik.values.hasConsentedToMarketing}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <small className="text-sm">
            {l("register.step2.form.marketingconsent.text1") || "By checking this box, you agree to receive marketings emails from TrialSync. You can opt-out at any time by following the unsubscribe link in our emails."}
          </small>
        </Consent>
      </div>
      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("register.step2.form.cta.btn") || "Next"}
          containerStyles="rounded-lg gradient-green1 hover1"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default RegisterStep2Form;
