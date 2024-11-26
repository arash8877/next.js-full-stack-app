"use client";

import Navbar from "@/components/Navbar";
import AcceptInvitationForm from "@/components/AcceptInvitationForm";
import { iUserProps } from "@/types";
import useLanguageStore from "@/stores/language-store";

//---------------------------- main function -----------------------------
export default function AcceptInvitationPage() {
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
