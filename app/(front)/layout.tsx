import { SiteHeader } from "@/components/Frontend/SiteHeader";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SiteHeader />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
