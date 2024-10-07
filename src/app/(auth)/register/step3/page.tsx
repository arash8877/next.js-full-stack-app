"use client";

import RegisterStepper from "@/components/RegisterStepper";
import Navbar from "@/components/Navbar";
import CustomButton from "@/components/CustomButton";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Suspense, useEffect } from "react";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { toast } from "react-toastify";
import { languages } from "@/lib/languageInfo";
import useLanguageStore from "@/stores/language-store";

//----------------------------------- Main Function ---------------------------------------
function RegisterStep3() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { l, setSelectedLang } = useLanguageStore();

    //---- set initial language -------
    useEffect(() => {
      const languageLocalStorage = localStorage.getItem("language");
      const initialLang = languages.find(
        (lang) => lang.code === languageLocalStorage
      );
      setSelectedLang(initialLang ? initialLang.code : "en");
    }, [setSelectedLang]);

  //------------- Handle Next Step ---------------
  async function handleNextStep() {
    const token = searchParams.get("invite_token");

    if (token) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/invites/verify`, //Request
          {
            token: token,
          }
        );
        localStorage.setItem("token", response.data.token);

        router.push("/register/step4");
      } catch (error) {
        console.error("Error in verifying token:", error);
      }
    } else {
      console.log("No token found");
      return;
    }
  }

  useEffect(() => {
    handleNextStep();
  }, []);

  //------------ Handle Resend Email------------
  async function handleResendEmail() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/invites/verifymail`, //request to resend email
        {
          verifyURL: `${window.location.origin}/register/step2`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );
      console.log(response)
      toast.success("New link is sent to your email", {
        position: "top-center",
        autoClose: 2000,
        className: "single_line_toast",
      });
    } catch (error) {
      console.error("Error in resending email:", error);
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 2000,
        className: "single_line_toast",
      });
    }
  }

  //------------ get user email ------------
  const { userData } = useGetUserInfo();
  const email = userData.email;

  //----------------------------- JSX --------------------------------------
  return (
      <main className="min-h-screen my-6 mx-2 md:mx-14 lg:mx-16">
        <Navbar justify="justify-between" displayLogin="hidden" />
        <section className="flex items-center custom-height">
          <div className="register_step2_div">
            <RegisterStepper activeStep={2} />
            <div>
              <div className="flex_center flex-col mt-12 mb-8">
                <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                  {l("register.step2.header") || "Check your email inbox"}
                </h1>
                <p className="text-base text-center">
                  {l("register.step2.description1") ||
                    "You should have received a verification email at ......."}{" "}
                  {email}
                  {l("register.step2.description2") ||
                    ". If not, click the button below to resend the email."}
                </p>
              </div>
              <div className="flex justify-center flex-col xs:flex-row gap-4">
                <CustomButton
                  title={l("register.step2.btn") || "Resend verification email"}
                  containerStyles="rounded-lg border border-primary-400 hover:border-2 "
                  handleClick={handleResendEmail}
                />
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
      <RegisterStep3 />
    </Suspense>
  );
}
