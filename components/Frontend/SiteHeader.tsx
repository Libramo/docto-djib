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
                  <Link href="/login">
                    <LogInIcon className="h-4 w-4" />
                    <span className="sr-only">Se connecter</span>
                    <span>Se connecter</span>
                  </Link>
                </Button>
              </>
            ) : (
              // <Avatar>
              //   <AvatarImage src={user.image ?? ""} />
              //   <AvatarFallback>
              //     {user.name
              //       ?.split(" ")
              //       .map((n) => n[0])
              //       .join("")
              //       .toUpperCase()}
              //   </AvatarFallback>
              // </Avatar>

              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none focus:ring-[2px] focus:ring-offset-2 focus:ring-primary rounded-full">
                  <Avatar>
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <User className="h-4 w-4" /> Tableau de bord
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4" /> Logout
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
