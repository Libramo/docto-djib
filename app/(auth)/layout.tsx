import { ModeSwitcher } from "@/components/Frontend/ModeSwitcher";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import Link from "next/link";

import React, { ReactNode } from "react";
import { FaStethoscope } from "react-icons/fa";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="fixed top-auto left-2">
        <div className="flex justify-between gap-x-80">
          <Link
            href="/"
            className="mr-4 flex text-primary items-center gap-2 lg:mr-6"
          >
            <FaStethoscope className="h-6 w-6 " />
            <span className="hidden font-extrabold tracking-widest lg:inline-block mr-4 items-center gap-2 lg:mr-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              {siteConfig.name}
            </span>
          </Link>
          <ModeSwitcher />
        </div>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
