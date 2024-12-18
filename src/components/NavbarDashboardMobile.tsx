"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useGetMyTrials from "@/hooks/useGetMyTrials";
// import useGetUserInfo from "@/hooks/useGetUserInfo";
import { useMyTrialsStore } from "@/stores/trialCount-store";
import LogoutModal from "./LogoutModal";
import useLanguageStore from "@/stores/language-store";

//-------------------------------- main function -----------------------------------------
export default function NavbarDashboardMobile() {
  const [menu, setMenu] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  // const { userData } = useGetUserInfo();
  // const isAdmin = userData.isAdmin;
  const isAdmin = true;
  const { l } = useLanguageStore();

  //--- toggle burger icon -----
  function toggleBurgerIcon() {
    setMenu(!menu);
    setToggleMenu(!toggleMenu);
  }

  //---- open/close modals -----
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

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
      <nav className="flex justify-between items-center bg-white h-12 p-4 rounded-full sticky z-50">
        <div>
          <Image
            src="/logo.svg"
            width={51}
            height={51}
            style={{ width: "51px", height: "51px" }}
            alt="logo"
          />
        </div>
        <div className="flex_center gap-3 ">
          <div
            onClick={toggleBurgerIcon}
            className="flex_center w-12 h-12 rounded-lg bg-[#f7f7f9]"
          >
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
          <Link
            href="/trials"
            className="navbar_item items-center"
            onClick={() => {
              setMenu(false);
              setToggleMenu(false);
            }}
          >
            <Image
              src="/home_icon.png"
              alt="home-icon"
              width={24}
              height={24}
            />
            <span className="text-sm">
              {l("common.header.trialsoverview.text") || "Trials"}
            </span>
          </Link>

          {isAdmin && (
            <Link
              href="/company"
              className="navbar_item items-center"
              onClick={() => {
                setMenu(false);
                setToggleMenu(false);
              }}
            >
              <Image
                src="/company.svg"
                alt="company-icon"
                width={24}
                height={24}
              />
              <span className="text-sm">
                {l("common.header.trialsoverview.text") || "Company"}
              </span>
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/employees"
              className="navbar_item items-center"
              onClick={() => {
                setMenu(false);
                setToggleMenu(false);
              }}
            >
              <Image
                src="/employees.svg"
                alt="employees-icon"
                width={24}
                height={24}
              />
              <span className="text-sm">
                {l("common.header.trialsoverview.text") || "Employees"}
              </span>
            </Link>
          )}

          <Link
            href="/invoices"
            className="navbar_item items-center"
            onClick={() => {
              setMenu(false);
              setToggleMenu(false);
            }}
          >
            <Image
              src="/invoices.svg"
              alt="invoice-icon"
              width={24}
              height={24}
            />
            <span className="text-sm">
              {l("common.header.trialsoverview.text") || "Invoices"}
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-3 w-full pl-4 pr-12  absolute bottom-0 mb-8">
          <hr className="border border-gray-200 w-full mb-8" />
          <h4 className="text-base font-semibold ml-4 ">
            {l("navbar.account.header") || "Account"}
          </h4>

          <div className="navbar_item items-center justify-between">
            <div className="flex gap-3">
              <Image
                src="/settings_icon.png"
                alt="setting-icon"
                width={24}
                height={24}
              />
              <Link
                className="text-sm"
                href="/settings"
                onClick={() => {
                  setMenu(false);
                  setToggleMenu(false);
                }}
              >
                {l("common.header.settings.text") || "Settings"}
              </Link>
            </div>
          </div>

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
        </div>
      </div>
    </>
  );
}
