import Link from "next/link";

// import { siteConfig } from "@/config/site";

// import { Icons } from "../Icons";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { ModeSwitcher } from "./ModeSwitcher";
import { Button } from "../ui/button";
// import { CommandMenu } from "./CommandMenu";
import { LogInIcon } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import { requireUser } from "@/lib/requireUser";

export function SiteHeader() {
  const user = requireUser();

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
              <>There is a user connected</>
            )}

            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
