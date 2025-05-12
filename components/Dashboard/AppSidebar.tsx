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

// import { MdOutlineDashboard, MdOutlineSettings } from "react-icons/md";
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
import { sidebarItems } from "@/config/docs";
import { siteConfig } from "@/config/site";
import Link from "next/link";

// This is sample data.
// const data = {
//   navMain: [
//     {
//       title: "Dashboard",
//       url: "/dashboard",
//       icon: MdOutlineDashboard,
//       items: [],
//     },

//     {
//       title: "Settings",
//       url: "/dashboard/settings",
//       icon: MdOutlineSettings,
//       items: [],
//     },
//   ],
// };

interface CustomSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: UserRole[]; // or a union like 'admin' | 'user' | etc.
}

export function AppSidebar({ userRole, ...props }: CustomSidebarProps) {
  const { state } = useSidebar();
  const session = useSession();

  const sidebarLinks = sidebarItems.filter((item) =>
    item.roles.some((role) => userRole?.includes(role))
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-4 justify-center mt-4">
          <Image src="/globe.svg" alt="" width={20} height={20} />
          {state === "expanded" && (
            <Link href={"/"}>
              <span className="hidden font-extrabold tracking-widest lg:inline-block mr-4 items-center gap-2 lg:mr-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </Link>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarLinks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
