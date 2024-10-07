"use client";

import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Suspense, useEffect, useState } from "react";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import useLanguageStore from "@/stores/language-store";
import { languages } from "@/lib/languageInfo";

//----------------------------------- main function -----------------------------------------
function VerifyAccountComponent() {
  const [tokenAvailable, setTokenAvailable] = useState(false);
  const searchParams = useSearchParams();
  const reset_token = searchParams.get("reset_token");
  const { l, setSelectedLang } = useLanguageStore();

  //---- set initial language -------
  useEffect(() => {
    const languageLocalStorage = localStorage.getItem("language");
    const initialLang = languages.find(
      (lang) => lang.code === languageLocalStorage
    );
    setSelectedLang(initialLang ? initialLang.code : "en");
  }, [setSelectedLang]);

  //------------- Handle Next Step---------------
  useEffect(() => {
    async function verifyToken() {
      if (reset_token) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/invites/verify/persist`, //POST request

            {
              token: reset_token,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.data == true) {
            setTokenAvailable(true);
          } else {
            setTokenAvailable(false);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
          }
        }
      } else {
        console.log("No token found");
        return;
      }
    }

    verifyToken();
  }, [reset_token]);

  //--------------------------------------- Return -------------------------------------------
  return (
    <main className="min-h-screen my-6 mx-2 md:mx-14 lg:mx-16">
      <section className="flex items-center custom-height">
        <div className="reset_password_div">
          <div>
            <div className="flex_center flex-col mt-12 mb-8">
              <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                {l("resetpassword.header") || "Please enter your new password"}
              </h1>
              {tokenAvailable ? (
                <ResetPasswordForm token={reset_token} />
              ) : (
                <p>
                  {l("resetpassword.expiredlink") || "This link is expired!"}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const ForgotPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyAccountComponent />
    </Suspense>
  );
};

export default ForgotPassword;
