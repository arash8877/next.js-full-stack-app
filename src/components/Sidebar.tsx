"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ActiveLink from "./ActiveLink"; // it used to make sidebar tabs active when clicked
import LogoutModal from "./LogoutModal";
import CounterContainer from "./CounterContainer";
import useGetMyTrials from "@/hooks/useGetMyTrials";
import { useMyTrialsStore } from "@/stores/trialCount-store";
import useLanguageStore from "@/stores/language-store";

//------------------------------- main function ------------------------------------------
export default function SidebarDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { l } = useLanguageStore();

  //-----get my trials count from useGetMyTrials hook-----
  const myTrials = useGetMyTrials();
  const { getTrialsCount } = useMyTrialsStore();
  useEffect(() => {
    getTrialsCount();
  }, [myTrials, getTrialsCount]);

  //-------- toggle sidebar ----------
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //---- open and close modal -----
  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };
  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  //------------------------------- return ------------------------------------------
  return (
    <div className="flex relative ">
      {isLogoutModalOpen && (
        <LogoutModal open={isLogoutModalOpen} onClose={closeLogoutModal} />
      )}
      <div
        className={`h-screen bg-white shadow-light sidebar_animation ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col">
          <Link href="https://app.trialsync.com/trials">
            <div
              className={`flex gap-2 items-center sidebar_animation ${
                isSidebarOpen ? "pl-9 mt-11" : "pl-3 my-11"
              }`}
            >
              <Image
                src="/logo.svg"
                width={43}
                height={42}
                style={{ width: "43px", height: "42px" }}
                alt="logo"
              />
              {isSidebarOpen && (
                <Image
                  src="/company-name.svg"
                  width={108}
                  height={22}
                  style={{ width: "108px", height: "22px" }}
                  alt="logo"
                />
              )}
            </div>
          </Link>
          {isSidebarOpen && (
          <p className="text-center mb-6 text-primary-1400">Sponsor</p>
          )}
        </div>
        <hr className="border border-gray-200 w-full mb-9 sidebar_animation" />
        <div className="flex flex-col">
          <div className="flex flex-col gap-3 sidebar_animation">
            {isSidebarOpen && (
              <h4 className="text-base font-semibold ml-4">
                {l("navbar.services.header") || "Services"}
              </h4>
            )}
            <div
              className={`flex_center flex-col gap-3 sidebar_animation ${
                isSidebarOpen ? "mx-7" : "mx-4"
              }`}
            >
              <ActiveLink
                href="/trials"
                activeClassName="sidebar_item_active"
                nonActiveClassName=""
              >
                <div
                  className={`sidebar_item ${
                    isSidebarOpen
                      ? "w-52 p-3 items-center"
                      : "w-10 p-2 relative"
                  }`}
                >
                  <Image
                    src="/home_icon.png"
                    alt="home-icon"
                    width={24}
                    height={24}
                  />
                  {isSidebarOpen &&
                    (l("common.header.trialsoverview.text") || "Trials")}
                  <CounterContainer
                    counts={getTrialsCount()}
                    style={`${
                      isSidebarOpen
                        ? "w-[36px] px-2 py-1 right-10 text-xs	"
                        : "w-[22px] px-1 top-[-5px] right-[-10px] text-[10px]"
                    }`}
                  />
                </div>
              </ActiveLink>
              <ActiveLink
                href="/company"
                activeClassName="sidebar_item_active"
                nonActiveClassName=""
              >
                <div
                  className={`sidebar_item  ${
                    isSidebarOpen
                      ? "w-52 p-3 items-center"
                      : "w-10 p-2 relative"
                  }`}
                >
                  <Image
                    src="/favorite_icon.png"
                    alt="favorite-icon"
                    width={24}
                    height={24}
                  />
                  {isSidebarOpen &&
                    (l("common.header.company.text") || "Company")}
                </div>
              </ActiveLink>

              <ActiveLink
                href="/employees"
                activeClassName="sidebar_item_active"
                nonActiveClassName=""
              >
                <div
                  className={`sidebar_item  ${
                    isSidebarOpen
                      ? "w-52 p-3 items-center"
                      : "w-10 p-2 relative"
                  }`}
                >
                  <Image
                    src="/favorite_icon.png"
                    alt="favorite-icon"
                    width={24}
                    height={24}
                  />
                  {isSidebarOpen &&
                    (l("common.header.company.text") || "Employees")}
                </div>
              </ActiveLink>

              <ActiveLink
                href="/invoices"
                activeClassName="sidebar_item_active"
                nonActiveClassName=""
              >
                <div
                  className={`sidebar_item  ${
                    isSidebarOpen
                      ? "w-52 p-3 items-center"
                      : "w-10 p-2 relative"
                  }`}
                >
                  <Image
                    src="/favorite_icon.png"
                    alt="favorite-icon"
                    width={24}
                    height={24}
                  />
                  {isSidebarOpen &&
                    (l("common.header.company.text") || "Invoices")}
                </div>
              </ActiveLink>
            </div>
          </div>

          <div className="flex flex-col absolute bottom-0">
            <div className="flex flex-col gap-3 sidebar_animation mb-10">
              {isSidebarOpen && (
                <h4 className="text-base font-semibold ml-4">
                  {l("navbar.account.header") || "Account"}
                </h4>
              )}
              <div
                className={`flex_center flex-col gap-3 sidebar_animation ${
                  isSidebarOpen ? "mx-7" : "mx-4"
                }`}
              >
                <ActiveLink
                  href="/settings"
                  activeClassName="sidebar_item_active"
                  nonActiveClassName=""
                >
                  <div
                    className={`sidebar_item ${
                      isSidebarOpen
                        ? "w-52 p-3 flex items-center"
                        : "w-10 p-2 relative"
                    }`}
                  >
                    <Image
                      src="/settings_icon.png"
                      alt="settings-icon"
                      width={24}
                      height={24}
                    />
                    {isSidebarOpen &&
                      (l("common.header.settings.text") || "Settings")}
                  </div>
                </ActiveLink>
                <button
                  className={`sidebar_item ${
                    isSidebarOpen ? "w-52 p-3" : "w-10 p-2"
                  }`}
                  onClick={openLogoutModal}
                >
                  <Image
                    src="/logout_icon.png"
                    alt="home-icon"
                    width={24}
                    height={24}
                  />
                  {isSidebarOpen &&
                    (l("navbar.account.logout.text") || "Log Out")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`absolute top-12 w-6 h-6 transform -translate-x-1/2 sidebar_animation ${
          isSidebarOpen ? "left-64" : "left-20"
        }`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <Image src="/fold-btn.svg" width={24} height={24} alt="arrow" />
        ) : (
          <Image src="/unfold-btn.svg" width={24} height={24} alt="arrow" />
        )}
      </button>
    </div>
  );
}
