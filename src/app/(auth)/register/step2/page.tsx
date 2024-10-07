"use client";

import RegisterStepper from "@/components/RegisterStepper";
import RegisterStep2Form from "@/components/RegisterStep2Form";
import Navbar from "@/components/Navbar";
import useLanguageStore from "@/stores/language-store";

//---------------------------- main function -----------------------------
export default function RegisterStep2() {
  const { l } = useLanguageStore();

  //-------------------------------------- jsx ---------------------------------------
  return (
    <main className="min-h-screen my-6 mx-2 md:mx-14 lg:mx-16">
      <Navbar
        justify="justify-between"
        items="items-end"
        displayCompanyName="hidden sm:block"
      />
      <section className="register_step1_section">
        <RegisterStepper activeStep={1} />
        <div>
          <div className="flex_center flex-col mt-12 mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">
              {l("register.step2.header1") || "Please fill out your personal information"}{" "}
            </h1>
            <p className="text-base text-center	">
              {l("register.step2.description") ||
                "Provide your full name, job title, email address, and create a password with a minimum of 8 characters"}
            </p>
          </div>
          <RegisterStep2Form />
        </div>
      </section>
    </main>
  );
}
