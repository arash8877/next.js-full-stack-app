import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import CustomButton from "./CustomButton";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import useLanguageStore from "@/stores/language-store";

interface iResetPasswordProps {
  token: string | null;
}

//------------------------------ main function-------------------------------------
const ResetPasswordForm = ({ token }: iResetPasswordProps) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { l } = useLanguageStore();

  //----- Yup validation -----
  const formSchema = Yup.object({
    password: Yup.string()
      .required(
        l("resetpassword.form.password.validation.required") ||
          "Password is required!"
      )
      .min(
        8,
        l("resetpassword.form.password.validation.format") ||
          "Password must be at least 8 characters"
      ),
    repeatedPassword: Yup.string()
      .required(
        l("resetpassword.form.repeatpassword.validation.required") ||
          "Please repeat the password!"
      )
      .oneOf(
        [Yup.ref("password")],
        l("resetpassword.form.repeatpassword.validation.format") ||
          "Passwords must match!"
      ),
  });

  //----formik----------------
  const formik = useFormik({
    initialValues: {
      password: "",
      repeatedPassword: "",
    },
    //----onSubmit-------
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SHARED_API_URL}/v1/invites/changepassword`, //post request
          {
            token: token,
            password: values.password,
            repeatedPassword: values.repeatedPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("sp_token")}`,
            },
          }
        );
        console.log(response);
        toast.success("Success! Login with new password", {
          position: "top-center",
          autoClose: 3000,
          className: "single_line_toast",
        });

        localStorage.removeItem("trialId");
        localStorage.removeItem("token");

        router.push("/login");
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

  //--------------------------Return---------------------------------
  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={formik.handleSubmit}>
      <div className="flex justify-center">
        <p className=" text-red-600">{error}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">
          {l("resetpassword.form.password.label") || "Enter your password"}
          <span className="ml-1">*</span>
        </label>
        <input
          name="password"
          type="password"
          placeholder={
            l("resetpassword.form.password.placeholder") || "Min. 8 characters"
          }
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          className="register_input"
        />
        <small className="text-red-600">
          {formik.touched.password && formik.errors.password}
        </small>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="repeatedPassword">
          {l("resetpassword.form.repeatpassword.label") || "Repeat password"}
          <span className="ml-1">*</span>
        </label>
        <input
          name="repeatedPassword"
          type="password"
          placeholder={
            l("resetpassword.form.password.placeholder") || "Min. 8 characters"
          }
          value={formik.values.repeatedPassword}
          onChange={formik.handleChange("repeatedPassword")}
          onBlur={formik.handleBlur("repeatedPassword")}
          className="register_input"
        />
        <small className="text-red-600">
          {formik.touched.repeatedPassword && formik.errors.repeatedPassword}
        </small>
      </div>
      <div className="flex justify-center">
        <CustomButton
          title={l("resetpassword.form.submit") || "Submit"}
          containerStyles="rounded-lg bg-gradient-button w-full h-10 flex_center"
          btnType="submit"
        />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
