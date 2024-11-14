import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="mx-2 md:mx-14">
      <Navbar justify="justify-between mt-6" displayLogin="hidden" />
      <div style={{ textAlign: "center", marginTop: "20vh" }}>
        <h1 className="text-2xl md:text-4xl font-semibold mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg md:text-xl text-center mb-7">
          Oops! The page you are looking for does not exist
        </p>
        <Link
          href="/login"
          className="mt-4 rounded-md bg-primary-400 px-4 py-2 text-sm text-white transition-colors hover:bg-primary-300"
        >
          Go back to login
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
