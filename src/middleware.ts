import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const step1Completed = req.cookies.get('step1Completed');

  //-- Bypass login check for register-step1 and register-step2 --
  if (req.nextUrl.pathname.startsWith("/register")) {
    //-- Protect register-step2 by ensuring step1 is completed --
    if (req.nextUrl.pathname === "/register/step2" && !step1Completed) {
      return NextResponse.redirect(new URL("/register/step1", req.url));
    }
    return NextResponse.next(); // Allow access to /register routes
  }

  //--- Check if user is logged in ---
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //--- Allow access to other protected routes if the token exists ---
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/trials",
    "/company",
    "/employees",
    "/invoices",
    "/settings",
    "/create-trial/step1",
    "/create-trial/step2",
    "/create-trial/step3",
    "/create-trial/step4",
    "/register/step1",
    "/register/step2",
  ],
};
