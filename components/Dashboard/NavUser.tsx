"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { UserId } from "@/types/auth";
import { User } from "next-auth";
import { UserRole } from "@prisma/client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { getInitials } from "@/lib/utils";

export function NavUser({
  user,
  type = "button",
}: {
  user: User & {
    id: UserId;
    role: UserRole | null;
  };
  type?: "icon" | "button";
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu className="border-t w-full">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {type === "icon" ? (
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-20 w-8">
                  <AvatarImage
                    src={user.image as string}
                    alt={user.name as string}
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.image as string}
                    alt={user.name as string}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.slice(0, 2).toUpperCase() || "JD"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.image as string}
                    alt={user.name as string}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(user.name!)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => signOut()}
            >
              <LogOut />
              <span>Se deconnecter</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
