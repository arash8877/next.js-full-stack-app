"use client";

import RegisterStepper from "@/components/RegisterStepper";
import Navbar from "@/components/Navbar";
import { Suspense, useEffect } from "react";
import useGetUserInfo from "@/hooks/useGetUserInfo";
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
              <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                {l("register.step4.header") ||
                  "You are successfully registered"}
              </h1>
              <p className="text-base text-center">
                {l("register.step2.description1") ||
                  "We evaluate your company information and will send an verification email to ................."}{" "}
                {email}
                {l("register.step2.description2") || "very soon."}
              </p>
              <p className="text-base text-center pt-6">
                {l("settings.tab4.email.warning") ||
                  "For more information please contact "}
                <a
                  className="italic underline"
                  href="mailto:support@trialsync.com"
                  target="_blank"
                >
                  {l("settings.tab4.email.support.mail") ||
                    "support@trialsync.com"}
                </a>
              </p>
              <p className="text-base text-center">
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
