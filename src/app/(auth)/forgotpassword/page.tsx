"use client";

import { useEffect } from "react";
import { Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import CustomButton from "@/components/CustomButton";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import axios from "axios";
import useEmailStore from "@/stores/emailForNotLoginUser-store";
import { languages } from "@/lib/languageInfo";
import useLanguageStore from "@/stores/language-store";

//------------------------- Main Function ----------------------------------
function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const { l, setSelectedLang } = useLanguageStore();
  //get email from store
  const { email } = useEmailStore();

  //---- set initial language -------
  useEffect(() => {
    const languageLocalStorage = localStorage.getItem("language");
    const initialLang = languages.find(
      (lang) => lang.code === languageLocalStorage
    );
    setSelectedLang(initialLang ? initialLang.code : "en");
  }, [setSelectedLang]);

  //------------ Handle Resend Email------------
  async function handleResendEmail() {
    alert("Email has been sent successfully");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SHARED_API_URL}/v1/invites/resetpassword`,
        {
          redirectURL: `${window.location.origin}/resetpassword`,
          email: email,
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error in resending email:", error);
    }
  }

  //--- handleSuccess to set the emailSent state to true ---
  const handleSuccess = () => {
    setEmailSent(true);
  };

  //------------------------------ Return -------------------------------
  return (
    <main
      className={`min-h-screen my-6 mx-2 md:mx-14 lg:grid lg:${
        emailSent ? "" : "grid-cols-2"
      } lg:mx-4`}
    >
      {emailSent ? (
        //---- if email sent successfully ----
        <div className="flex flex-col">
          <Navbar
            justify="justify-center lg:justify-start"
            displayLogin="hidden"
          />
          <section className="flex justify-center items-start md:items-center custom_height ">
            <div className="mx-auto bg-white max-w-3xl px-4 md:px-12 lg:px-10 py-6 md:py-10 xl:py-12  rounded-3xl border border-bgColor-10 shadow-lg">
              <div>
                <div className="flex_center flex-col mt-12 mb-8">
                  <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                    {l("forgotpassword.emailsent.header") ||
                      "Check your email inbox"}
                  </h1>
                  <p className="text-base">
                    {l("forgotpassword.emailsent.description") ||
                      "If there's a user with that email we will send you a link to reset your password. If you have not received an email, click the button below to resend the email."}
                  </p>
                </div>
                <div className="flex justify-center flex-col sm:flex-row gap-4">
                  <CustomButton
                    title={l("forgotpassword.emailsent.btn") || "Resend email"}
                    containerStyles="flex_center rounded-lg border border-primary-400 w-272 sm:w-60 h-10"
                    handleClick={handleResendEmail}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        //------ if email not sent  ------
        <>
          <div>
            <Navbar
              justify="justify-center lg:justify-start"
              displayLogin="hidden"
            />
            <section className="flex justify-center items-start md:items-center  custom_height">
              <div className="bg-white px-4 md:px-12 lg:px-10 py-6 md:py-10 xl:py-12 rounded-3xl border border-bgColor-10 shadow-lg">
                <div className="flex_center flex-col gap-4 mb-8">
                  <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                    {l("forgotpassword.emailnotsent.header") ||
                      "Forgot Password?"}
                  </h1>
                  <p className="text-base text-center">
                    {l("forgotpassword.emailnotsent.description") ||
                      "Please provide the email you have used to create the account."}
                  </p>
                </div>
                <ForgotPasswordForm onSuccess={handleSuccess} />
              </div>
            </section>
          </div>
          <div
            className="bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(/bg_login.svg)` }}
          ></div>
        </>
      )}
    </main>
  );
}

export default function forgotPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordPage />
    </Suspense>
  );
}
