import { MainNavItem, SidebarNavItem } from "@/types/nav";
import { UserRole } from "@prisma/client";
import { IconType } from "react-icons/lib";
import { MdOutlineDashboard } from "react-icons/md";

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  // chartsNav: SidebarNavItem[];
}
export type SidebarItem = {
  label: string;
  href: string;
  roles: UserRole[]; // who can access this item
  icon: IconType;
};

export const docsConfig: DocsConfig = {
  mainNav: [
    // {
    //   title: "Accueil",
    //   href: "/",
    // },
    // {
    //   title: "Trouver un médecin",
    //   href: "/find-doctor",
    // },
    // {
    //   title: "Spécialités",
    //   href: "/specialities",
    // },
    // {
    //   title: "Téléconsultaion",
    //   href: "/telehealth",
    // },
  ],

  sidebarNav: [
    {
      title: "Accueil",
      href: "/",
      items: [],
    },
    {
      title: "Trouver un médecin",
      href: "/find-doctor",
      items: [],
    },
    {
      title: "Spécialités",
      href: "/docs/components/accordion",
      items: [],
    },
    {
      title: "Téléconsultaion",
      href: "/service",
      items: [],
    },
  ],
};

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.USER],
    icon: MdOutlineDashboard,
  },
  {
    label: "Admin Panel",
    href: "/admin",
    roles: [UserRole.ADMIN],
    icon: MdOutlineDashboard,
  },
  {
    label: "My Patients",
    href: "/patients",
    roles: [UserRole.DOCTOR],
    icon: MdOutlineDashboard,
  },
  {
    label: "Profile",
    href: "/dashbord/profile",
    roles: [UserRole.USER, UserRole.DOCTOR, UserRole.ADMIN],
    icon: MdOutlineDashboard,
  },
];
