"use client";

// this components is used to create a link that will be active when the current route matches the href prop
// it is used in the SidebarDashboard component

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ActiveLinkProps {
    children: ReactNode;
    href: string;
    activeClassName: string;
    nonActiveClassName: string;
    className?: string;
  } 

  //-------------------- main function --------------------------
const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  href,
  activeClassName, 
  nonActiveClassName, 
  className,
  ...rest
}) => {
  const pathname = usePathname(); 
  const isActive = pathname.endsWith(href) || (href.includes(pathname) && pathname !== "/");
  const newClassName = `${isActive ? activeClassName : nonActiveClassName} ${className}`;
  return (
    <Link href={href} className={newClassName} {...rest}>
      {children}
    </Link>
  );
};
export default ActiveLink;