import { MainNavItem, SidebarNavItem } from "@/types/nav";
import { UserRole } from "@prisma/client";
import { IconType } from "react-icons/lib";
import {
  MdAdminPanelSettings,
  MdAssignment,
  MdCalendarToday,
  MdChat,
  MdHelpOutline,
  MdLocalPharmacy,
  MdOutlineDashboard,
  MdPeopleOutline,
  MdPersonOutline,
  MdSearch,
  MdSettings,
} from "react-icons/md";

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
    label: "Tableau de bord",
    href: "/dashboard",
    roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.USER],
    icon: MdOutlineDashboard,
  },
  {
    label: "Panneau Admin",
    href: "/admin/dashboard",
    roles: [UserRole.ADMIN],
    icon: MdAdminPanelSettings,
  },
  {
    label: "Mes patients",
    href: "/doctor/patients",
    roles: [UserRole.DOCTOR],
    icon: MdPeopleOutline,
  },
  {
    label: "Rendez-vous",
    href: "/doctor/appointments",
    roles: [UserRole.DOCTOR],
    icon: MdCalendarToday,
  },
  {
    label: "Mon profil",
    href: "/profile",
    roles: [UserRole.USER, UserRole.DOCTOR, UserRole.ADMIN],
    icon: MdPersonOutline,
  },

  {
    label: "Mes prescriptions",
    href: "/prescriptions",
    roles: [UserRole.USER],
    icon: MdLocalPharmacy,
  },
  {
    label: "Historique médical",
    href: "/medical-history",
    roles: [UserRole.USER],
    icon: MdAssignment,
  },
  {
    label: "Messages",
    href: "/messages",
    roles: [UserRole.USER],
    icon: MdChat,
  },
  {
    label: "Paramètres",
    href: "/settings",
    roles: [UserRole.USER, UserRole.DOCTOR, UserRole.ADMIN],
    icon: MdSettings,
  },
  {
    label: "Support",
    href: "/support",
    roles: [UserRole.USER],
    icon: MdHelpOutline,
  },
];
