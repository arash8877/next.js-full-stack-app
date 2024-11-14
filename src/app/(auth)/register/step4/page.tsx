"use client";

import RegisterStepper from "@/components/RegisterStepper";
import Navbar from "@/components/Navbar";
import { Suspense, useEffect } from "react";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import axios from "axios";
import { languages } from "@/lib/languageInfo";
import useLanguageStore from "@/stores/language-store";

//----------------------------------- Main Function ---------------------------------------
function RegisterStep4() {
  const { l, setSelectedLang } = useLanguageStore();

  //---- set initial language -------
  useEffect(() => {
    const languageLocalStorage = localStorage.getItem("language");
    const initialLang = languages.find(
      (lang) => lang.code === languageLocalStorage
    );
    setSelectedLang(initialLang ? initialLang.code : "en");
  }, [setSelectedLang]);

  //------- call end point -------
  useEffect(() => {
    async function callEndpoint() {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/keychain/complete`, //Request
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              accept: "application/json",
            },
          }
        );
        console.log("step4 response:", response);
      } catch (error) {
        console.log("Error in verifying token:", error);
      }
    }
    callEndpoint();
  }, []);

  //------------ get user email ------------
  const { userData } = useGetUserInfo();
  const email = userData.email;

  //----------------------------- JSX --------------------------------------
  return (
    <main className="min-h-screen my-6 mx-2 md:mx-14 lg:mx-16">
      <Navbar justify="justify-between" displayLogin="hidden" />
      <section className="flex items-center custom-height">
        <div className="register_step2_div">
          <RegisterStepper activeStep={3} />
          <div>
            <div className="flex_center flex-col mt-12 mb-8">
              <h1 className="text-2xl text-center md:text-3xl font-semibold mb-4 md:mb-12">
                {l("register.step4.header") ||
                  "You are successfully registered"}
              </h1>
              <p className="text-base text-center md:font-semibold">
                {l("register.step2.description1") ||
                  "We will review your information and will send an status update email to"}{" "}
                {email}
              </p>
              <p className="text-base text-center pt-6">
                {l("settings.tab4.email.warning") ||
                  "Our support team is always ready to help you. Any questions, please contact us at"}{" "}
                <a
                  className="italic underline"
                  href="mailto:support@trialsync.com"
                  target="_blank"
                >
                  {l("settings.tab4.email.support.mail") ||
                    "support@trialsync.com"}
                </a>
              </p>
              <p className="text-base text-center mt-8">
                {l("register.step2.description1") ||
                  "You can close this window."}{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function VerifyAccount() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterStep4 />
    </Suspense>
  );
}
