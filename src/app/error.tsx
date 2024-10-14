"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import useLanguageStore from "@/stores/language-store";
import { languages } from "@/lib/languageInfo";

//------------------------------------- main function ---------------------------------------
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { l, setSelectedLang } = useLanguageStore();

  //--- Optionally log the error to an error reporting service ---
  useEffect(() => {
    console.error(error);
  }, [error]);

  //---- set initial language -------
  useEffect(() => {
    const languageLocalStorage = localStorage.getItem("language");
    const initialLang = languages.find(
      (lang) => lang.code === languageLocalStorage
    );
    setSelectedLang(initialLang ? initialLang.code : "en");
  }, [setSelectedLang]);

  //------------------------------------- JSX ----------------------------------------------
  return (
    <main className="mx-2 md:mx-14">
      <div>
        <Navbar justify="justify-between mt-6" displayLogin="hidden" />
        <section style={{ textAlign: "center", marginTop: "20vh" }}>
          <div className="flex flex-col items-center">
            <h1 className="text-2xl md:text-4xl font-semibold mb-4">
              {l("error.header") || "Something went wrong!"}
            </h1>
            <p className="text-lg md:text-xl text-center">
              {l("error.description") ||
                "Please try again later or contact support."}
            </p>
            <a
              className="italic text-lg lg:text-xl my-4 text-blue-400"
              href={l("support.float.url") || "mailto:support@trialsync.com"}
              target="_blank"
            >
              {l("support.float.email") || "support@trialsync.com"}
            </a>
            <button
              className="mt-4 rounded-md bg-primary-400 px-4 py-2 text-sm text-white transition-colors hover:bg-primary-300"
              onClick={
                // Attempt to recover by trying to re-render the invoices route
                () => reset()
              }
            >
              {l("maintenance.btn.text") || "Try again"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
