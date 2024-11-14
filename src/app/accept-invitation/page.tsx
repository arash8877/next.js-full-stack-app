"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import AcceptInvitationForm from "@/components/AcceptInvitationForm";
import axios from "axios";
import { iUserProps } from "@/types";
import useLanguageStore from "@/stores/language-store";

//---------------------------- main function -----------------------------
export default function AcceptInvitationPage() {
  const router = useRouter();
  const { l } = useLanguageStore(); 


  const invitedEmployeeData: iUserProps = {
    firstName: "John",
    lastName: "Doe",
    jobTitle: "Software Developer",
    phoneNumber: "123456789",
    email: "johan@email.com",
    consentedToTerms: true,
    hasConsentedToMarketing: false,
    preferredLanguage: "en", 
  }


  //---- check if user completed the registration ----
  async function CheckUserCompleted(): Promise<boolean> {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/users/completed`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      );
      return response.data; //boolean
    } catch (error) {
      console.error("Error in /completed", error);
      return false;
    }
  }

  useEffect(() => {
    const checkUserStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const isCompleted = await CheckUserCompleted();
          if (isCompleted) {
            router.push("/trials");
          }
        } catch (error) {
          console.error("Error checking if user is completed", error);
        }
      }
    };

    checkUserStatus();
  }, [router]);



  // ------------------------------ return -------------------------------
  return (
    <div className="flex flex-col gap-40">
        <Navbar justify="justify-between mt-6" displayLogin="hidden" />
      <div className="mx-2 md:mx-14 lg:grid gap-4 lg:grid-cols-2 lg:mx-4">
        <section className="mx-auto flex_center custom_height">
          <div className="bg-white px-4 md:px-12 lg:px-10 py-6 md:py-10 xl:py-12 rounded-3xl">
            <div className="flex_center flex-col gap-4 mb-8">
              <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                {l("login.header") || "Accept Invitation"}
              </h1>
              <p className="text-base">
                {l("login.description") ||
                  "You have been invited by company ..... Please fill in the form below to accept the invitation."}
              </p>
            </div>
            <AcceptInvitationForm {...invitedEmployeeData}/>
          </div>
        </section>
        <div
        className="bg-cover bg-center rounded-2xl"
        style={{ backgroundImage: `url(/bg_login.svg)` }}
      ></div>
      </div>

    </div>
  );
}
