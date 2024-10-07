import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import NavbarDashboardMobile from "./NavbarDashboardMobile";

interface SidebarLayoutProps {
  children: ReactNode;
  className?: string;
}

export function SidebarLayout({ children, className }: SidebarLayoutProps) {
  return (
    <div className="flex h-screen">
      <div className="hidden sm:block">
        <Sidebar />
      </div>
      <div className={`flex-1 flex-col wrapper ${className || ""}`}>
        <div className="block sm:hidden">
          <NavbarDashboardMobile />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}
