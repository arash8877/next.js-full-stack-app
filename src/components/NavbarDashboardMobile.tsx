"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CounterMyTrials from "./CounterContainer";
import useGetMyTrials from "@/hooks/useGetMyTrials";
import { useMyTrialsStore } from "@/stores/trialCount-store";
import useGetUserInfo from "@/hooks/useGetUserInfo";
// import RedirectToRegisterModal from "./RedirectToRegisterModal";
import LogoutModal from "./LogoutModal";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import useLanguageStore from "@/stores/language-store";

//-------------------------------- main function -----------------------------------------
export default function NavbarDashboardMobile() {
  const [menu, setMenu] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { userData } = useGetUserInfo();
  const isDiseaseSelected = userData.diseases.length > 0;
  const authenticated = useIsAuthenticated();
  const { l } = useLanguageStore();

  //--- toggle burger icon -----
  function toggleBurgerIcon() {
    setMenu(!menu);
    setToggleMenu(!toggleMenu);
  }

  //---- open/close modals -----
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
//   const [isRedirectToRegisterModalOpen, setIsRedirectToRegisterModalOpen] =
//     useState(false);
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

//   const openRedirectToRegisterModal = () => {
//     setIsRedirectToRegisterModalOpen(true);
//   };

  //-----get my trials count from useGetMyTrials hook-----
  const myTrials = useGetMyTrials();
  const { getTrialsCount } = useMyTrialsStore();
  useEffect(() => {
    getTrialsCount();
  }, [myTrials, getTrialsCount]);

  //-------------------------------------- JSX ----------------------------------------
  return (
    <>
      {isLogoutModalOpen && (
        <LogoutModal open={isLogoutModalOpen} onClose={closeLogoutModal} />
      )}
      {/* {isRedirectToRegisterModalOpen && (
        <RedirectToRegisterModal
          open={isRedirectToRegisterModalOpen}
          onClose={() => setIsRedirectToRegisterModalOpen(false)}
        />
      )} */}
      <nav className="flex justify-between items-center bg-white h-12 p-4 rounded-full z-50 relative ">
        <div>
          <Image
            src="/logo.svg"
            width={32}
            height={31}
            style={{ width: "32px", height: "31px" }}
            alt="logo"
          />
        </div>
        <div className="flex_center gap-3">
          <div onClick={toggleBurgerIcon} className="w-8">
            {menu ? (
              <Image
                src="/close.svg"
                width={32}
                height={40}
                style={{ width: "32px", height: "auto" }}
                alt="close-icon"
                className="cursor-pointer"
              />
            ) : (
              <Image
                src="/burger.svg"
                width={21}
                height={16}
                style={{ width: "21px", height: "16px" }}
                alt="burger-icon"
                className="cursor-pointer"
              />
            )}
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 bg-white transition-transform duration-800 ease-in-out z-30 ${
          toggleMenu ? "transform translate-y-0" : "transform -translate-y-full"
        }`}
      >
        <div className="flex flex-col gap-3 w-full pl-4 pr-12 absolute top-[100px]  ">
          <h4 className="text-base font-semibold ml-4">
            {l("navbar.services.header") || "Services"}
          </h4>
          <div className="navbar_item items-center">
            <Image
              src="/home_icon.png"
              alt="home-icon"
              width={24}
              height={24}
            />
            <Link
              className="text-sm"
              href="/trials"
              onClick={() => {
                setMenu(false);
                setToggleMenu(false);
              }}
            >
              {l("common.header.trialsoverview.text") || "Trial Overview"}
            </Link>
          </div>
          <div
            className="navbar_item items-center"
            // onClick={(e) => {
            //   if (!authenticated) {
            //     e.preventDefault();
            //     openRedirectToRegisterModal();
            //   }
            // }}
          >
            <Image
              src="/favorite_icon.png"
              alt="home-icon"
              width={24}
              height={24}
            />
            <Link
              className="text-sm"
              href={authenticated ? "/settings" : "#"}
              onClick={() => {
                setMenu(false);
                setToggleMenu(false);
              }}
            >
              {l("common.header.mytrrials.text") || "My Trials"}
            </Link>
            <CounterMyTrials
              counts={getTrialsCount()}
              style="w-[36px] px-2 py-1 right-16 text-xs	"
            />
          </div>
        </div>
        <div
          className={`flex flex-col gap-3 w-full pl-4 pr-12  absolute bottom-0 ${
            authenticated ? "mb-8" : "mb-20"
          }`}
        >
          <hr className="border border-gray-200 w-full mb-8" />
          <h4 className="text-base font-semibold ml-4 ">
            {l("navbar.account.header") || "Account"}
          </h4>

          <div className="navbar_item items-center justify-between">
            <div
              className="flex gap-3"
            //   onClick={(e) => {
            //     if (!authenticated) {
            //       e.preventDefault();
            //       openRedirectToRegisterModal();
            //     }
            //   }}
            >
              <Image
                src="/settings_icon.png"
                alt="setting-icon"
                width={24}
                height={24}
              />
              <Link
                className="text-sm"
                href={authenticated ? "/settings" : "#"}
                onClick={() => {
                  setMenu(false);
                  setToggleMenu(false);
                }}
              >
                {l("common.header.settings.text") || "Settings"}
              </Link>
            </div>
            {!isDiseaseSelected && authenticated && (
              <Image
                src="/alert_icon.svg"
                width={20}
                height={20}
                alt="alert-icon"
                style={{ width: "20px", height: "auto" }}
              />
            )}
          </div>
          {authenticated && (
            <button
              className="navbar_item items-center text-sm"
              onClick={openLogoutModal}
            >
              <Image
                src="/logout_icon.png"
                alt="logout-icon"
                width={24}
                height={24}
              />
              {l("navbar.account.logout.text") || "Log Out"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
