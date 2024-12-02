"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { RegisterNavbarProps } from "@/types";
import { usePathname, useSearchParams } from "next/navigation";
// import LanguageDropdown from "./LanguageDropdown";
import useLanguageStore from "@/stores/language-store";

//---------------------------- main function--------------------------------
const Navbar = ({
  justify,
  items,
  displayLogo,
  displayCompanyName,
  displayLogin,
}: RegisterNavbarProps) => {
  //------get the current url---------
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { l } = useLanguageStore();

  const currentUrl = `${pathname}${
    searchParams.toString() ? "?" + searchParams.toString() : ""
  }`;
  // const loginUrl = "/login";
  // const isLoginUrl = currentUrl === loginUrl; //boolean
  const isLoginUrl = false;
    const isRegisterStep4Url = currentUrl === "/register/step4";  //boolean
  //-------------------------------- JSX ---------------------------------
  return (
    <header className={`flex ${items} ${justify} px-4  lg:px-16`}>
      {isLoginUrl || isRegisterStep4Url ? ( // if the current url is login page, the logo will be a link
        <Link href="https://www.sponsor.trialsync.com/login" target="_blank">
          <div>
            <div className="flex_center gap-1">
              <Image
                src="/logo.svg"
                width={32}
                height={31}
                style={{ width: "32px", height: "31px" }}
                alt="logo"
                className={displayLogo}
              />
              <Image
                src="/company-name.svg"
                width={90}
                height={22}
                style={{ width: "90px", height: "22px" }}
                alt="logo"
                className={displayCompanyName}
              />
            </div>
            <h3 className="text-center mb-6 text-primary-1400">Sponsor</h3>
          </div>
        </Link>
      ) : (
        <div>
          <div className="flex_center gap-1">
            <Image
              src="/logo.svg"
              width={32}
              height={31}
              style={{ width: "32px", height: "31px" }}
              alt="logo"
              className={displayLogo}
            />
            <Image
              src="/company-name.svg"
              width={90}
              height={22}
              style={{ width: "90px", height: "22px" }}
              alt="logo"
              className={displayCompanyName}
            />
          </div>
          <h3 className="text-center mb-6 text-primary-1400">Sponsor</h3>
        </div>
      )}
      <div className="flex flex-col gap-2.5 items-end xs:flex-row-reverse xs:items-center xs:gap-4">
        {/* {(isLoginUrl || isStep1Url) && <LanguageDropdown />} */}
        <div
          className={`flex items-center justify-between gap-1.5 ${displayLogin}`}
        >
          <p className="text-xs md:text-base">
            {l("navbar.register.cta.login.text") || "Already have an account?"}
          </p>
          <Link
            href="/login"
            className="text-xs md:text-base font-medium underline"
          >
            {l("navbar.register.cta.login.url.text") || "Log In"}
          </Link>
        </div>
      </div>
    </header>
  );
};

// Wrap Navbar in Suspense
const NavbarWithSuspense = (props: RegisterNavbarProps) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Navbar {...props} />
  </Suspense>
);

export default NavbarWithSuspense;
