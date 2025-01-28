import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("sp_token");
  const registerStep1Completed = req.cookies.get('registerStep1Completed');
  const createTrialStep1Completed = req.cookies.get("createTrialStep1Completed");
  const createTrialStep2Completed = req.cookies.get("createTrialStep2Completed");
  const createTrialStep3Completed = req.cookies.get("createTrialStep3Completed");
  const createTrialStep4Completed = req.cookies.get("createTrialStep4Completed");
  const createTrialStep5Completed = req.cookies.get("createTrialStep5Completed");


  //-- Bypass login check for register-step1 and register-step2 --
  if (req.nextUrl.pathname.startsWith("/register")) {
    //-- Protect register-step2 by ensuring step1 is completed --
    if (req.nextUrl.pathname === "/register/step2" && !registerStep1Completed) {
      return NextResponse.redirect(new URL("/register/step1", req.url));
    }
    return NextResponse.next(); // Allow access to /register routes
  }

  //--- Check if user is logged in ---
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

    //--- Protect the create-trial steps ---
    if (req.nextUrl.pathname.startsWith("/create-trial")) {
      if (req.nextUrl.pathname === "/create-trial/step2" && !createTrialStep1Completed) {
        return NextResponse.redirect(new URL("/create-trial/step1", req.url));
      }
      if (req.nextUrl.pathname === "/create-trial/step3" && !createTrialStep2Completed) {
        return NextResponse.redirect(new URL("/create-trial/step2", req.url));
      }
      if (req.nextUrl.pathname === "/create-trial/step4" && !createTrialStep3Completed) {
        return NextResponse.redirect(new URL("/create-trial/step3", req.url));
      }
      if (req.nextUrl.pathname === "/create-trial/step5" && !createTrialStep4Completed) {
        return NextResponse.redirect(new URL("/create-trial/step4", req.url));
      }
      if (req.nextUrl.pathname === "/create-trial/step6" && !createTrialStep5Completed) {
        return NextResponse.redirect(new URL("/create-trial/step5", req.url));
      }

      if (req.nextUrl.pathname === "/create-trial/step6" && 
        (!createTrialStep5Completed || !createTrialStep1Completed || 
         !createTrialStep2Completed || !createTrialStep3Completed || 
         !createTrialStep4Completed)) {
      return NextResponse.redirect(new URL("/create-trial/step5", req.url));
    }
    }

  //--- Allow access to other protected routes if the token exists ---
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/company",
    "/employees",
    "/invoices",
    "/settings",
    "/create-trial/step1",
    "/create-trial/step2",
    "/create-trial/step3",
    "/create-trial/step4",
    "/create-trial/step5",
    "/create-trial/step6",
    "/register/step1",
    "/register/step2",
  ],
};
