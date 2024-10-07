"use client";

import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import  useEmailStore from "@/stores/emailForNotLoginUser-store";
import useLanguageStore from "@/stores/language-store";

//--- prop types ---
interface ForgotPasswordProps {
  onSuccess: () => void;
}

//------------------------------------ main Function ------------------------------------------------------
// prettier-ignore
const ForgotPasswordForm: React.FC<ForgotPasswordProps> = ({ onSuccess }) => {
  const { setEmail } = useEmailStore();
  
  const { l } = useLanguageStore(); 

  //---Yup validation ---
  const formSchema = Yup.object({
    email: Yup.string()
      .required(l("forgotpassword.form.email.validation.required") || "Email is required!")
      .email(l("forgotpassword.form.email.validation.format") || "Invalid email format"),
  });

  
  //---Formik---
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    //---On Submit---
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/invites/resetpassword`,
          {
            redirectURL: `${window.location.origin}/resetpassword`,
            email: values.email,
          }
        );
        if (response.status == 200) {
          onSuccess();
          setEmail(values.email);
        }

      } catch (error) {
        console.error("Error in /auth/resetpassword", error);
      }
    },
    validationSchema: formSchema,
  });

  //------------------------- JSX -------------------------
  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="email">
              {l("forgotpassword.form.email.label") || "Enter your email"}<span className="ml-1">*</span>
            </label>
          </div>

          <input
            name="email"
            type="email"
            placeholder={l("forgotpassword.form.email.placeholder") || "youremail@email.com"}
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            className="register_input"
          />
          <small className="text-red-600">
            {formik.touched.email && formik.errors.email}
          </small>
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
          <CustomButton
            title={l("forgotpassword.form.submit") || "Reset password"}
            containerStyles="rounded-lg bg-gradient-button w-full h-10"
            btnType="submit"
          />
          <div className="flex_center gap-2">
           <Image src="/arrow-left.svg" alt="arrow-left" width={10} height={10} />
          <Link href="/login" className="text-base font-light underline">
            {l("forgotpassword.cta.returntologin.text") || "Back to login"}
          </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
