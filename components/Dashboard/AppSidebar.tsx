"use client";

import * as React from "react";
// import {
//   AudioWaveform,
//   BookOpen,
//   Bot,
//   Command,
//   Frame,
//   GalleryVerticalEnd,
//   Map,
//   PieChart,
//   Settings2,
//   SquareTerminal,
// } from "lucide-react";

import { MdOutlineDashboard, MdOutlineSettings } from "react-icons/md";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { useSession } from "../providers/SessionContext";
import Image from "next/image";
import { UserRole } from "@prisma/client";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: MdOutlineDashboard,
      items: [],
    },

    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: MdOutlineSettings,
      items: [],
    },
  ],
};

interface CustomSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: UserRole[]; // or a union like 'admin' | 'user' | etc.
}

export function AppSidebar({ ...props }: CustomSidebarProps) {
  const { state } = useSidebar();
  const session = useSession();

  // const filteredItems = data.navMain.filter((item) => item.(userRole));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-4 justify-center">
          <Image src="/globe.svg" alt="" width={20} height={20} />
          {state === "expanded" && <h1>LOGONAME</h1>}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
