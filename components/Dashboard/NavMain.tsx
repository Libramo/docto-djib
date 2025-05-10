"use client";

// import { ChevronRight, type LucideIcon } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { IconType } from "react-icons/lib";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";

export function NavMain({
  items,
}: {
  items: {
    label: string;
    href: string;
    icon?: IconType;
    isActive?: boolean;
    roles?: UserRole[];
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                className={cn(
                  "flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors",
                  isActive && "bg-primary/50 text-primary-foreground",
                  "hover:bg-primary/70 hover:text-white"
                  // You can also use: isActive && "bg-primary/50 text-primary-foreground"
                )}
                tooltip={item.label}
                onClick={() => router.push(item.href)}
              >
                {item.icon && <item.icon />}
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
