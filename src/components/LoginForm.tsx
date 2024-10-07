"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import axios from "axios";
import useLanguageStore from "@/stores/language-store";

//---- Yup validation ----


//------------------------ main function -----------------------------
const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { l } = useLanguageStore();

    //------------ get user email ------------

  const formSchema = Yup.object({
    email: Yup.string()
      .required(l("login.form.email.validation.required") || "Email is required!")
      .email(l("Invalid email format") || "Invalid email format"),
    password: Yup.string().required(l("login.form.password.validation.required") || "Password is required!"),
  });

  // -------------- formik -------------------
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    //---- submit form ----
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
          {
            email: values.email,
            password: values.password,
          }
        );
        console.log(response.data)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("language", response.data.user.preferredLanguage);

        //-- check if user is verified (clicked on email after step1) --
        const verifiedResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/users/verified`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (verifiedResponse.data == false) {
          router.push("/register/step2");
        } else {
          //-- check if user completed the registration --
          const completedResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/users/completed`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (completedResponse.data == false) {
            router.push("/register/step3");
          } else {
            router.push("/trials");
          }
        }
      } catch (error) {
        console.error("catch error in login", error);
        // --- Cast error to AxiosError to resolve the type ---
        if (
          axios.isAxiosError(error) &&
          (error.response?.status === 401 || error.response?.status === 404)
        ) {
          setError(l("login.form.validation.error") || "Invalid email or password");
        }
      }
    },
    validationSchema: formSchema,
  });

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    setError(""); // Reset the error message
    formik.handleChange(event);
  };

  //------------------------------- return -----------------------------
  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <label htmlFor="email">
              {l("login.form.email.label") || "Enter your email"}
              <span className="ml-1">*</span>
            </label>
            <Link
              href="/forgotpassword"
              className="text-sm md:text-xs underline"
            >
              {l("login.form.cta.forgotpassword.text") || "Forgot your password?"}
            </Link>
          </div>
          <input
            name="email"
            type="email"
            placeholder={l("login.form.email.placeholder") || "youremail@email.com"}
            value={formik.values.email}
            onChange={handleChange}
            onBlur={formik.handleBlur("email")}
            className="register_input mt-2"
          />
          <small className="text-red-600">
            {formik.touched.email && formik.errors.email}
          </small>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            {l("login.form.password.label") ||"Enter your password"}
            <span className="ml-1">*</span>
          </label>
          <input
            name="password"
            type="password"
            placeholder={l("login.form.password.placeholder") || "Your password"}
            value={formik.values.password}
            onChange={handleChange}
            onBlur={formik.handleBlur("password")}
            className="register_input mt-2"
          />
          <small className="text-red-600">
            {formik.touched.password && formik.errors.password}
          </small>
          <small className="text-red-600">{error}</small>
        </div>
        <div className="flex justify-center">
          <CustomButton
            title={l("login.submit.text") || "Login"}
            containerStyles="rounded-lg gradient-green1 hover1 "
            btnType="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
