"use client";
import Link from "next/link";

// import { siteConfig } from "@/config/site";

// import { Icons } from "../Icons";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { ModeSwitcher } from "./ModeSwitcher";
import { Button } from "../ui/button";
// import { CommandMenu } from "./CommandMenu";
import { LogInIcon, LogOut, Settings, User } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getInitials } from "@/lib/utils";

export function SiteHeader({ session }: { session: Session | null }) {
  const user = session?.user;
  const router = useRouter();

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center gap-2 md:gap-4">
          {/* Desktop Main Nav */}
          <div className="hidden md:flex">
            <MainNav />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden">
            <MobileNav />
          </div>

          {/* Right Side (Search, Icons) */}
          <div className="ml-auto flex items-center gap-2 px-4 space-x-4">
            {!user ? (
              <>
                <div>
                  <Button asChild variant="outline" size="default">
                    <Link href="/register?role=DOCTOR">
                      <FaUserDoctor className="h-4 w-4" />
                      <span className="sr-only">Se connecter</span>
                      <span className="font-semibold">Vous etes médecin ?</span>
                    </Link>
                  </Button>
                </div>

                <Button asChild variant="outline" size="default">
                  <Link href="/authenticate">
                    <LogInIcon className="h-4 w-4" />
                    <span className="sr-only">Se connecter</span>
                    <span>Se connecter</span>
                  </Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none focus:ring-[2px] focus:ring-offset-2 focus:ring-primary rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(user.name as string)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>

                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <p className="text-xs">{user.email}</p>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <User className="h-4 w-4" /> Tableau de bord
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4" /> Se deconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
