"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { FaStethoscope } from "react-icons/fa";
import { docsConfig } from "@/config/docs";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        className="mr-4 flex text-primary items-center gap-2 lg:mr-6"
      >
        <FaStethoscope className="h-6 w-6 " />
        <span className="hidden font-extrabold tracking-widest lg:inline-block mr-4 items-center gap-2 lg:mr-6 bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="flex items-center gap-4 text-sm xl:gap-6">
        {docsConfig.mainNav.map((item, i) => (
          <Link
            key={i}
            href={item.href as string}
            className={cn(
              "transition-colors hover:text-foreground/80 duration-300 hover:border-b-2 hover:border-primary ",
              pathname === item.href ? "text-primary" : "text-foreground/80"
            )}
          >
            {item.title}
          </Link>
        ))}
        {/* <Link
          href="/docs/installation"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/docs/installation"
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Docs
        </Link> */}

        {/* <Link
          href="/docs/components"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/components") &&
              !pathname?.startsWith("/docs/component/chart")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Components
        </Link>

        <Link
          href="/blocks"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/blocks")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Blocks
        </Link>

        <Link
          href="/charts"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/docs/component/chart") ||
              pathname?.startsWith("/charts")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Charts
        </Link>

        <Link
          href="/themes"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/themes")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Themes
        </Link>

        <Link
          href="/colors"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/colors")
              ? "text-foreground"
              : "text-foreground/80"
          )}
        >
          Colors
        </Link> */}
      </nav>
    </div>
  );
}
