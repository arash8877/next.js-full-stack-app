"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";
import useLanguageStore from "@/stores/language-store";

//---------------------------- main function -----------------------------
export default function LoginPage() {
  const router = useRouter();

  const { l } = useLanguageStore();

  useEffect(() => {
    const checkUserStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          router.push("/trials");
        } catch (error) {
          console.error("Error checking if user is completed", error);
        }
      }
    };

    checkUserStatus();
  }, [router]);

  // ------------------------------ return -------------------------------
  return (
    <main className="mx-2 md:mx-14 lg:grid lg:grid-cols-2 lg:mx-4">
      <div>
        <Navbar justify="justify-between mt-6" displayLogin="hidden" />
        <section className="mx-auto flex justify-center  items-start md:items-center custom_height">
          <div className="bg-white px-4 md:px-12 lg:px-10 py-6 md:py-10 xl:py-12 rounded-3xl border border-bgColor-10">
            <div className="flex_center flex-col gap-4 mb-8">
              <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                {l("login.header") || "Log In"}
              </h1>
              <p className="text-base">
                {l("login.description") ||
                  "Welcome back! Please enter your details below"}
              </p>
            </div>
            <LoginForm />
            <div className="flex_center mt-3 md:mt-6">
              <p className="text-sm">
                {l("login.cta.signup.description") || "Don't have an account?"}
              </p>
              <Link href="/register/step1" className="text-sm underline ml-1">
                {l("login.cta.signup.text") || "Sign Up"}
              </Link>
            </div>
          </div>
        </section>
      </div>
      <div
        className="bg-cover bg-center rounded-2xl my-4"
        style={{ backgroundImage: `url(/bg_login.svg)` }}
      ></div>
    </main>
  );
}
