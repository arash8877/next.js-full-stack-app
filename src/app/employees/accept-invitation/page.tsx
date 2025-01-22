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
            router.push("/");
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
    <main className="min-h-screen my-6 mx-2 md:mx-14 lg:mx-16">
      <Navbar justify="justify-center md:justify-start" displayLogin="hidden" />
      <section className="register_step1_section border border-bgColor-10 shadow-lg">
        <div className="bg-white mx-auto pb-12 rounded-2xl lg:w-full">
          <h1 className="text-center text-2xl md:text-3xl font-semibold mb-4">
            {l("login.header") || "Accept Invitation"}
          </h1>
          <p className="text-base text-center px-4 lg:px-12">
            {l("login.description") ||
              "You have been invited to join TrialSync sponsor platform. Please accept the invitation to create your profile."}
          </p>
        </div>
        <AcceptInvitationForm />
      </section>
    </main>
  );
}
