import { MainNavItem, SidebarNavItem } from "@/types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  // chartsNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Accueil",
      href: "/",
    },
    {
      title: "Trouver un médecin",
      href: "/find-doctor",
    },
    {
      title: "Spécialités",
      href: "/specialities",
    },
    {
      title: "Téléconsultaion",
      href: "/telehealth",
    },
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
