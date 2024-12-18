"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";
import axios from "axios";
import Consent from "./Consent";
import Link from "next/link";
import { iUserUpdateProps } from "@/types/index";
import { toast } from "react-toastify";
// import LanguageDropdown from "./LanguageDropdown";
import useLanguageStore from "@/stores/language-store";
import { useEffect } from "react";
import { SponsorUserInfo } from "@/types/index";
//------------------------------------------ main function -----------------------------------------
const AcceptInvitationForm = () => {
  const router = useRouter();
  const { l } = useLanguageStore();
  // const searchParams = useSearchParams();
  // const inviteToken = searchParams.get("inviteToken");
  const [userInfo, setUserInfo] = useState<SponsorUserInfo>();
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  // const userId = userInfo?.userId;

  // console.log("userId:", userId);

  useEffect(() => {
    // Extract the inviteToken from the query parameters
    const query = new URLSearchParams(window.location.search);
    setInviteToken(query.get("inviteToken"));
  }, []);

  console.log("inviteToken:", inviteToken);

  //----Yup validation ---------
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
    jobTitle: Yup.string().required(
      l("settings.tab1.form.jobtitle.validation.required") ||
        "Job title is required!"
    ),
    phoneNumber: Yup.string()
      .required(
        l("register.step1.form.country.validation.required") ||
          "Phone number is required!"
      )
      .min(
        8,
        l("settings.tab1.form.firstname.validation.length") ||
          "Phone number must be at least 8 numbers!"
      ),
    email: Yup.string()
      .required(
        l("login.form.email.validation.required") || "Email is required!"
      )
      .email(l("Invalid email format") || "Invalid email format"),

    password: Yup.string()
      .required(
        l("login.form.password.validation.required") || "Password is required!"
      )
      .min(
        8,
        l("settings.tab4.form.password.validation.format") ||
          "Password must be at least 8 characters"
      ),
    repeatedPassword: Yup.string()
      .required(
        l("login.form.password.validation.required") ||
          "Repeat password is required!"
      )
      .oneOf(
        [Yup.ref("password")],
        l("settings.tab4.form.repeatpassword.validation.format") ||
          "Passwords must match!"
      ),
    consentedToTerms: Yup.boolean().oneOf(
      [true],
      l("register.step2.form.termsandconditions.validation.required") ||
        "You must accept the terms and conditions."
    ),
    hasConsentedToMarketing: Yup.boolean(),
  });

  //---- GET invited employee info ----

  useEffect(() => {
    async function getUserInfo(): Promise<boolean> {
      try {
        // const token = localStorage.getItem("token");

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SHARED_API_URL}/v1/invites/user`,
          {
            token: inviteToken,
          }
        );
        // console.log("response:", response.data);
        setUserInfo(response.data);
        return response.data;
      } catch (error) {
        console.error("Error in /completed", error);
        return false;
      }
    }
    getUserInfo();
  }, [inviteToken]);

  console.log("userInfo:", userInfo);

  //---------------- update user ---------------
  //eslint-disable-next-line
  const updateInvitedEmployeeForm = async (data: iUserUpdateProps) => {
    //function will be called in onSubmit
    console.log("iviteToken is missing");
    if (!inviteToken) {
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/sponsorcontacts/invite/${inviteToken}/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${inviteToken}`,
          },
        }
      );
      router.push("/login");
      console.log("res", response);
      toast.success(
        l("settings.tab1.form.toast.success") ||
          "Your profile is created successfully!",
        {
          position: "top-center",
          autoClose: 2000,
          className: "single_line_toast",
        }
      );
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

  //--------------- formik ----------------
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userInfo?.firstName || "",
      lastName: userInfo?.lastName || "",
      jobTitle: userInfo?.jobTitle || "",
      phoneNumber: "",
      email: userInfo?.email || "",
      password: "",
      repeatedPassword: "",
      consentedToTerms: false,
      hasConsentedToMarketing: false,
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      console.log("values:", values);
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        jobTitle: values.jobTitle,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
        repeatedPassword: values.repeatedPassword,
        consentedToTerms: values.consentedToTerms,
        hasConsentedToMarketing: values.hasConsentedToMarketing,
      };
      console.log("data:", data);

      updateInvitedEmployeeForm(data);
    },
    validationSchema: formSchema,
  });

  //------------------------------------ JSX ----------------------------------------
  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="firstName">
          {l("settings.tab1.form.firstname.label") || "First Name"}
          <span className="ml-1">*</span>
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange("firstName")}
          onBlur={formik.handleBlur("firstName")}
          className="register_input custom-border"
        />
        <small className="text-red-600">
          {formik.touched.firstName && formik.errors.firstName}
        </small>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="lastName">
          {l("settings.tab1.form.lastname.label") || "Last Name"}
          <span className="ml-1">*</span>
        </label>
        <input
          name="lastName"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange("lastName")}
          onBlur={formik.handleBlur("lastName")}
          className="register_input custom-border"
        />
        <small className="text-red-600">
          {formik.touched.lastName && formik.errors.lastName}
        </small>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="jobTitle">
          {l("settings.tab1.form.jobTitle.label") || "Job Title"}
          <span className="ml-1">*</span>
        </label>
        <input
          name="jobTitle"
          type="text"
          readOnly
          value={formik.values.jobTitle}
          onChange={formik.handleChange("jobTitle")}
          onBlur={formik.handleBlur("jobTitle")}
          className="register_input custom-border cursor-npt-allowed bg-gray-200"
        />
        <small className="text-red-600">
          {formik.touched.jobTitle && formik.errors.jobTitle}
        </small>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber">
          {l("settings.tab1.form.phoneNumber.label") || "Phone Number"}
          <span className="ml-1">*</span>
        </label>
        <input
          name="phoneNumber"
          type="text"
          onChange={formik.handleChange("phoneNumber")}
          onBlur={formik.handleBlur("phoneNumber")}
          className="register_input custom-border"
        />
        <small className="text-red-600">
          {formik.touched.phoneNumber && formik.errors.phoneNumber}
        </small>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email">
          {l("settings.tab1.form.email.label") || "Email"}
          <span className="ml-1">*</span>
        </label>
        <input
          name="email"
          type="email"
          readOnly
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
          className="register_input custom-border cursor-npt-allowed bg-gray-200"
        />
        <small className="text-red-600">
          {formik.touched.email && formik.errors.email}
        </small>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password">
          {l("settings.tab4.form.password.label") || "Password"}
          <span className="ml-1">*</span>
        </label>
        <input
          name="password"
          type="password"
          placeholder="Minimum 8 characters"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          className="register_input custom-border"
        />
        <small className="text-red-600">
          {formik.touched.password && formik.errors.password}
        </small>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="repeatedPassword">
          {l("settings.tab4.form.repeatpassword.label") || "Repeat password"}
          <span className="ml-1">*</span>
        </label>
        <input
          name="repeatedPassword"
          type="password"
          placeholder="Repeat password"
          value={formik.values.repeatedPassword}
          onChange={formik.handleChange("repeatedPassword")}
          onBlur={formik.handleBlur("repeatedPassword")}
          className="register_input custom-border "
        />
        <small className="text-red-600">
          {formik.touched.repeatedPassword && formik.errors.repeatedPassword}
        </small>
      </div>

      <div className="md:pr-20">
        <Consent
          title={
            l("register.step2.form.termsandconditions.title") ||
            "Consent to Terms and Conditions"
          }
          label={
            l("register.step2.form.termsandconditions.label") ||
            "I have read and agree to the Terms and Conditions."
          }
          name="consentedToTerms"
          value={formik.values.consentedToTerms}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.consentedToTerms && formik.errors.consentedToTerms
          }
        >
          <small className="text-sm ">
            {l("register.step2.form.termsandconditions.text1") ||
              "By checking this box, you agree to TrialSync's"}{" "}
            <Link
              href="https://www.trialsync.com/terms-and-conditions"
              target="_blank"
              className="font-bold underline"
            >
              {l("register.step2.form.termsandconditions.cta.text") ||
                "Terms and Conditions"}
            </Link>{" "}
            {l("register.step2.form.termsandconditions.text2") ||
              "and acknowledge our"}{" "}
            <Link
              href="https://www.trialsync.com/privacy"
              target="_blank"
              className="font-bold underline"
            >
              {l("register.step2.form.termsandconditions.privacy.cta.text") ||
                "Privacy Policy"}
            </Link>
            {l("register.step2.form.termsandconditions.text3") ||
              ". We will not sell or share your personal information. Your data is used solely to enhance your experience with us."}
          </small>
        </Consent>
        <Consent
          title={
            l("register.step2.form.marketingconsent.title") ||
            "Consent to Email Marketing"
          }
          label={
            l("register.step2.form.marketingconsent.label") ||
            "I agree to receive marketing emails."
          }
          name="hasConsentedToMarketing"
          value={formik.values.hasConsentedToMarketing}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <small className="text-sm">
            {l("register.step2.form.marketingconsent.text1") ||
              "By checking this box, you agree to receive marketings emails from TrialSync. You can opt-out at any time by following the unsubscribe link in our emails."}
          </small>
        </Consent>
      </div>

      <div className="flex justify-center xs:justify-end gap-4">
        <CustomButton
          title={l("settings.form.submit") || "Accept"}
          containerStyles="rounded-lg gradient-green1 hover1"
          disabledContainerStyles="rounded-lg bg-gray-300"
          disabled={!inviteToken}
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default AcceptInvitationForm;
