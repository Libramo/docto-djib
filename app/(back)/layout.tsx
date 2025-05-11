import { auth } from "@/auth";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { IdleLogoutWrapper } from "@/components/providers/IdleLogoutWrapper";
// import { AppSidebar } from "@/components/Dashboard/AppSidebar";
// import DynamicBreadcrumb from "@/components/Dashboard/DynamicBreadcrumb";
// import { SessionProvider } from "@/components/providers/SessionContext";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <AuthenticatedLayout session={session}>
      <IdleLogoutWrapper>{children}</IdleLogoutWrapper>
    </AuthenticatedLayout>
  );
};

export default Layout;
