import React from "react";
import { Link, Outlet } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { ArrowBigLeft, Fingerprint } from "lucide-react";
import Footer from "../Footer";
import { ProtectedRoute } from "@/hooks/useProtectedRoute";

const AuthLayout = () => {
  return (
    <ProtectedRoute authRoute={true}>
      <main className="min-h-screen flex flex-col">
        <header className="flex items-center justify-between p-5">
          <h1 className="sm:hidden flex items-center gap-1">
            <span className="aspect-square p-2 size-9 lg:size-10 flex items-center justify-center rounded-xl bg-primary text-white">
              <Fingerprint />
            </span>
            <span className="text-lg lg:text-2xl font-bold">Profily</span>
          </h1>
          <Link
            to="/"
            className={buttonVariants({
              variant: "default",
              size: "lg",
              className: "",
            })}
          >
            <ArrowBigLeft fill="currentColor" />
            <span className="font-medium max-sm:hidden">Return Back</span>
          </Link>
        </header>

        <div className="flex min-h-0 grow items-center justify-center">
          <Outlet />
        </div>
        <Footer />
      </main>
    </ProtectedRoute>
  );
};

export default AuthLayout;
