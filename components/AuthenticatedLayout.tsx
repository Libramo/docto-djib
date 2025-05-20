"use client";

import { ReactNode } from "react";
import { SessionProvider } from "@/components/providers/SessionContext";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Dashboard/AppSidebar";
import DynamicBreadcrumb from "@/components/Dashboard/DynamicBreadcrumb";
import { Session } from "next-auth";
import { IdleLogoutWrapper } from "./providers/IdleLogoutWrapper";

export default function AuthenticatedLayout({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <IdleLogoutWrapper session={session}>
        <div>
          <SidebarProvider>
            <AppSidebar userRole={[session?.user?.role!]} />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4 w-full justify-between">
                  <div className="flex gap-2 h-full items-center ml-3">
                    <SidebarTrigger className="-ml-3" />
                    <DynamicBreadcrumb />
                  </div>
                </div>
              </header>
              {children}
            </SidebarInset>
          </SidebarProvider>
        </div>
      </IdleLogoutWrapper>
    </SessionProvider>
  );
}
