// import MegaMenu from "@/components/Frontend/MegaMenu";
import Navbar from "@/components/Frontend/Navbar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white">
      <Navbar />
      {/* <div
        className="mx-auto py-6 fixed top-16 w-full left-0 right-0 z-50 bg-white 
      border-t border-gray-400/30 container"
      >
        <MegaMenu />
      </div> */}
      <div>{children}</div>
    </div>
  );
};

export default Layout;
