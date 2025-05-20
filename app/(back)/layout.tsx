import { auth } from "@/auth";
import AuthenticatedLayout from "@/components/AuthenticatedLayout";
import { IdleLogoutWrapper } from "@/components/providers/IdleLogoutWrapper";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  console.log("This is the session:", session);

  return (
    <AuthenticatedLayout session={session}>{children}</AuthenticatedLayout>
  );
};

export default Layout;
