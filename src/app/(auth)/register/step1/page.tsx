"use client";

import RegisterStepper from "@/components/RegisterStepper";
import Navbar from "@/components/Navbar";
import RegisterStep1Form from "@/components/RegisterStep1Form";
import useLanguageStore from "@/stores/language-store";

//---------------------------- main function -----------------------------
export default function RegisterStep1() {
  const { l } = useLanguageStore();

  //-------------------------------------- jsx ---------------------------------------
  return (
    <main className="min-h-screen pt-6 mx-2 md:mx-14 ">
      <Navbar
        justify="justify-between"
        items="items-start"
        displayCompanyName="hidden sm:block"
      />
      <section className="flex items-start md:items-center custom-height">
        <div className="register_step1_section border border-bgColor-10 shadow-lg">
          <RegisterStepper activeStep={0} />
          <div>
            <div className="flex_center flex-col mt-12 mb-8">
              <h1 className="text-2xl md:text-3xl font-semibold mb-4">
                {l("register.step1.header1") || "Let's start with your"}{" "}
                <br className="block sm:hidden" />{" "}
                {l("register.step1.header2") || "company information"}
              </h1>
              <p className="text-base text-center	">
                {l("register.step1.description") ||
                  "To get started, please provide your company name, VAT number and address."}
              </p>
            </div>
            <RegisterStep1Form />
          </div>
        </div>
      </section>
    </main>
  );
}
