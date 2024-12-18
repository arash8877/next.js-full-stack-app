"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import AcceptInvitationForm from "@/components/AcceptInvitationForm";
import axios from "axios";
import useLanguageStore from "@/stores/language-store";

//---------------------------- main function -----------------------------
export default function AcceptInvitationPage() {
  const router = useRouter();
  const { l } = useLanguageStore();

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
    <div className="">
      <Navbar justify="justify-between mt-6" displayLogin="hidden" />
      <div className="mx-2 md:mx-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:mx-4 mt-8 mb-4">
          <div className="bg-white wrapper mx-auto rounded-2xl lg:w-full">
            <div className="flex_center flex-col gap-4 mb-8">
              <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                {l("login.header") || "Accept Invitation"}
              </h1>
              <p className="text-base text-center">
                {l("login.description") ||
                  "You have been invited by to join TrialSync sponsor platform. Please accept the invitation to create your profile."}
              </p>
            </div>
            <AcceptInvitationForm />
          </div>
        <div
          className="bg-cover bg-center rounded-2xl"
          style={{ backgroundImage: `url(/bg_login.svg)` }}
        ></div>
      </div>
    </div>
  );
}
