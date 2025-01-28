"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import useClickOutside from "@/hooks/useClickOutside";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import useLanguageStore from "@/stores/language-store";
import axios from "axios";
import { languages, Language } from "@/lib/languageInfo";

// Define the type for LanguageDropdownProps
interface LanguageDropdownProps {
  mdBreakpoint?: boolean;
}

//---------------------------------- main function ----------------------------------
export default function LanguageDropdown({
  mdBreakpoint,
}: LanguageDropdownProps) {
  const [isActive, setIsActive] = useState(false);
  const [selectedLangCode, setSelectedLangCode] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setSelectedLang } = useLanguageStore();
  const authenticated = useIsAuthenticated();

  //-- Set initial language from localStorage or userLang --
  useEffect(() => {
    const languageLocalStorage = localStorage.getItem("language");
    const initialLang = languages.find(
      (lang) => lang.code === languageLocalStorage
    );
    setSelectedLangCode(initialLang ? initialLang.code : "en");
    setSelectedLang(initialLang ? initialLang.code : "en");
  }, [setSelectedLang]);

  //-- Close dropdown when clicked outside --
  useClickOutside(dropdownRef, () => setIsActive(false));

  //-- Show/hide dropdown --
  const handleShowList = () => {
    setIsActive((current) => !current);
  };
  //-- Select language --
  const handleSelectLanguage = (language: Language) => {
    setSelectedLangCode(language.code);
    updateUsersLanguage(language.code);
    localStorage.setItem("language", language.code);
    setSelectedLang(language.code);
    setIsActive(false);
  };

  //-- Update user's language in the database --
  const updateUsersLanguage = async (langCode: string) => {
    if (!authenticated) return;

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/users/language`,
        { isoCode: langCode },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sp_token")}`,
          },
        }
      );
      console.log("Patch request", res);
    } catch (error) {
      console.log("Error in updating users language", error);
    }
  };

  //-- Get the displayed language --
  const displayedLang = languages.find(
    (lang) => lang.code === selectedLangCode
  );

  //------------------------------- JSX --------------------------------
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {displayedLang && (
        <>
          <div
            onClick={handleShowList}
            className="cursor-pointer flex items-center"
          >
            <div
              className={`flex items-center justify-between bg-white px-1.5 py-1.5 rounded-md w-[76px] ${
                mdBreakpoint ? "md:w-[123px]" : "xs:w-[123px]"
              }`}
            >
              <Image
                src={displayedLang.flag}
                alt={displayedLang.name}
                width={24}
                height={16}
                className={`${
                  mdBreakpoint ? "md:w-8 md:h-[21.6px]" : "xs:w-8 xs:h-[21.6px]"
                }`}
              />
              <span
                className={`text-md block ${
                  mdBreakpoint ? "md:hidden" : " xs:hidden"
                }`}
              >
                {displayedLang.nickname}
              </span>
              <span
                className={`text-md hidden ${
                  mdBreakpoint ? "md:block" : "xs:block"
                }`}
              >
                {displayedLang.name}
              </span>
              <Image
                src="/arrow-down-2.png"
                alt="Arrow down"
                width={8.17}
                height={4.6}
              />
            </div>
          </div>
          {isActive && (
            <div className="absolute left-0 right-0 mt-2 rounded-md bg-white ring-1 ring-black ring-opacity-5 dropdown_animation z-50">
              <div className="py-1">
                {languages.map((language) => (
                  <a
                    key={language.code}
                    onClick={() => handleSelectLanguage(language)}
                    className={`flex items-center gap-1.5  pl-1.5 py-2 text-md hover:bg-gray-100 cursor-pointer w-full ${
                      mdBreakpoint ? "md:gap-4" : "xs:gap-4"
                    }`}
                  >
                    <Image
                      src={language.flag}
                      alt={language.name}
                      width={24}
                      height={16}
                      className={`${
                        mdBreakpoint
                          ? "md:w-8 md:h-[21.6px]"
                          : "xs:w-8 xs:h-[21.6px]"
                      }`}
                    />
                    <span
                      className={`text-md block ${
                        mdBreakpoint ? "md:hidden" : " xs:hidden"
                      }`}
                    >
                      {language.nickname}
                    </span>
                    <span
                      className={`text-md hidden ${
                        mdBreakpoint ? "md:block" : "xs:block"
                      }`}
                    >
                      {language.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
