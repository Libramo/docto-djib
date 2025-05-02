import { auth } from "@/auth";
import { AppSidebar } from "@/components/Dashboard/AppSidebar";
import DynamicBreadcrumb from "@/components/Dashboard/DynamicBreadcrumb";
import { SessionProvider } from "@/components/providers/SessionContext";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider session={session}>
      <div>
        <SidebarProvider>
          <AppSidebar userRole={[session.user.role]} />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4 w-full justify-between">
                <div className="flex gap-2 h-full my-auto">
                  <SidebarTrigger className="-ml-3" />
                  {/* <Separator orientation="vertical" className="mr-2 h-7" /> */}
                  <DynamicBreadcrumb />
                </div>
                <div className="uppercase text-3xl font-serif">
                  {session?.user.name?.slice(0, 2)}
                </div>
              </div>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </div>
    </SessionProvider>
  );
};

export default Layout;
