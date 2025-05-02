import Link from "next/link";

// import { siteConfig } from "@/config/site";

// import { Icons } from "../Icons";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { ModeSwitcher } from "./ModeSwitcher";
import { Button } from "../ui/button";
// import { CommandMenu } from "./CommandMenu";
import { LogInIcon } from "lucide-react";

export function SiteHeader() {
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
          <div className="ml-auto flex items-center gap-2">
            {/* Search (hidden on mobile) */}
            {/* <div className="hidden md:flex flex-1 justify-end">
              <CommandMenu />
            </div> */}

            {/* GitHub + Mode Switcher */}
            <nav className="flex items-center gap-1 flex-shrink-0">
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-8 w-8 px-0"
              >
                <Link
                  href="/login"
                  //   target="_blank"
                  //   rel="noreferrer"
                >
                  <LogInIcon className="h-4 w-4" />
                  <span className="sr-only">Se connecter</span>
                </Link>
              </Button>

              <ModeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
