import { auth } from "@/auth";
import { SiteHeader } from "@/components/Frontend/SiteHeader";
import { IdleLogoutWrapper } from "@/components/providers/IdleLogoutWrapper";
import { SessionProvider } from "@/components/providers/SessionContext";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <IdleLogoutWrapper session={session}>
        <SiteHeader session={session} />
        {children}
      </IdleLogoutWrapper>
    </SessionProvider>
  );
};

export default Layout;
