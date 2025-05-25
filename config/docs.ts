import { ROUTES } from "@/lib/constants";
import { MainNavItem, SidebarNavItem } from "@/types/nav";
import { UserRole } from "@prisma/client";
import { IconType } from "react-icons/lib";
import {
  MdAccessTime,
  MdAdminPanelSettings,
  MdAssignment,
  MdCalendarToday,
  MdChat,
  MdEventAvailable,
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
  // Accessible à tous
  {
    label: "Tableau de bord",
    href: ROUTES.dashboard,
    roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.USER],
    icon: MdOutlineDashboard,
  },

  // ADMIN uniquement
  {
    label: "Panneau Admin",
    href: ROUTES.adminDashboard,
    roles: [UserRole.ADMIN],
    icon: MdOutlineDashboard,
  },

  // DOCTOR uniquement
  {
    label: "Mes patients",
    href: ROUTES.doctor.patients,
    roles: [UserRole.DOCTOR],
    icon: MdPeopleOutline,
  },
  {
    label: "Mes rendez-vous",
    href: ROUTES.doctor.appointments,
    roles: [UserRole.DOCTOR],
    icon: MdCalendarToday,
  },
  {
    label: "Mes disponibilités",
    href: ROUTES.doctor.availabilities,
    roles: [UserRole.DOCTOR],
    icon: MdEventAvailable,
  },
  {
    label: "Messages",
    href: ROUTES.user.messages, // Assuming same route applies
    roles: [UserRole.DOCTOR],
    icon: MdChat,
  },

  // USER uniquement
  {
    label: "Mes prescriptions",
    href: ROUTES.user.prescriptions,
    roles: [UserRole.USER],
    icon: MdLocalPharmacy,
  },

  {
    label: "Historique médical",
    href: ROUTES.user.medicalHistory,
    roles: [UserRole.USER],
    icon: MdAssignment,
  },

  {
    label: "Messages",
    href: ROUTES.user.messages,
    roles: [UserRole.USER],
    icon: MdChat,
  },

  // Tous rôles
  {
    label: "Mon profil",
    href: ROUTES.profile,
    roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.USER],
    icon: MdPersonOutline,
  },
  {
    label: "Paramètres",
    href: ROUTES.settings,
    roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.USER],
    icon: MdSettings,
  },

  // Support - USER uniquement
  {
    label: "Support",
    href: ROUTES.support,
    roles: [UserRole.USER],
    icon: MdHelpOutline,
  },
];
