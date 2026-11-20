"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronDown, LayoutDashboard, Menu, ScanLine, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useStudio } from "@/components/studio/studio-provider";
import { cn } from "@/lib/utils";
import { isNoirPath, normalizePath } from "@/lib/routes";

const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Snippets", href: "/snippets" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function isNavActive(pathname: string, href: string) {
  if (href === "/work") return pathname.startsWith("/work") || pathname.startsWith("/projects");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = normalizePath(usePathname());
  const { inspect, toggleInspect, setCommandOpen } = useStudio();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pageName = pathname === "/" ? "Home" : pathname.split("/").filter(Boolean).join(" / ");

  // The dashboard and the noir pages bring their own chrome.
  if (pathname.startsWith("/dashboard") || isNoirPath(pathname)) return null;

  return (
    <header
      data-inspect="Toolbar"
      className="sticky top-0 z-40 w-full border-b bg-background/85 backdrop-blur-md"
    >
      <div className="flex h-14 items-center gap-3 px-3 sm:px-4">
        <SiteLogo />

        <div className="hidden min-w-0 items-center gap-1.5 text-sm xl:flex">
          <span className="text-muted-foreground">Ethan Rogers</span>
          <span className="text-muted-foreground/50">/</span>
          <span className="flex items-center gap-1 font-medium text-foreground">
            portfolio.fig
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </span>
          <span className="ml-1 max-w-[9rem] truncate font-mono text-[11px] capitalize text-muted-foreground">
            · {pageName}
          </span>
        </div>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-lg border bg-card/70 p-1 md:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isNavActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-1.5 text-[13px] transition-colors",
                  isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    className="absolute inset-0 rounded-md bg-foreground"
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <div aria-hidden className="mr-1 hidden -space-x-1.5 xl:flex">
            <span className="flex size-7 items-center justify-center rounded-full border-2 border-background bg-hot font-mono text-[10px] font-semibold text-white">
              ER
            </span>
            <span className="flex size-7 items-center justify-center rounded-full border-2 border-background bg-sel font-mono text-[10px] font-semibold text-white">
              You
            </span>
          </div>

          <Link
            href="/dashboard"
            title="Dashboard view"
            className="hidden h-8 items-center gap-2 rounded-md border bg-card/70 px-2.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <LayoutDashboard className="size-4" />
            <span className="hidden 2xl:inline">Dashboard view</span>
          </Link>

          <button
            type="button"
            onClick={toggleInspect}
            aria-pressed={inspect}
            title="Inspect mode (I)"
            className={cn(
              "flex h-8 items-center gap-2 rounded-md border px-2.5 text-[13px] transition-colors",
              inspect
                ? "border-sel bg-sel text-black"
                : "bg-card/70 text-muted-foreground hover:text-foreground"
            )}
          >
            <ScanLine className="size-4" />
            <span className="hidden sm:inline">Inspect</span>
            <kbd className="hidden rounded border border-current/30 px-1 font-mono text-[10px] opacity-70 sm:inline">I</kbd>
          </button>

          <button
            type="button"
            onClick={() => setCommandOpen(true)}
            className="flex h-8 items-center gap-2 rounded-md bg-foreground px-2.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            <Sparkles className="size-4 text-hot" />
            <span className="hidden sm:inline">Ask my AI</span>
            <kbd className="hidden rounded bg-background/15 px-1 font-mono text-[10px] sm:inline">⌘K</kbd>
          </button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="flex size-8 items-center justify-center rounded-md border bg-card/70 md:hidden"
              >
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <SheetHeader>
                <SheetTitle className="text-left font-mono text-xs font-normal uppercase tracking-widest text-muted-foreground">
                  Pages
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Primary" className="mt-6 flex flex-col">
                {[{ label: "Home", href: "/" }, ...NAV_ITEMS, { label: "Dashboard", href: "/dashboard" }].map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-baseline gap-3 border-b py-4 font-display text-4xl font-extrabold uppercase tracking-tight wdth-75"
                  >
                    <span className="font-mono text-xs font-normal text-muted-foreground">0{i}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <a
                href="/ethan-rogers-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block font-mono text-xs uppercase tracking-widest text-muted-foreground underline underline-offset-4"
              >
                Résumé (PDF) ↗
              </a>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function SiteLogo() {
  return (
    <Link
      href="/"
      aria-label="Ethan Rogers — home"
      className="group flex size-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background"
    >
      <span className="font-display text-[13px] font-black tracking-tight wdth-125 transition-[font-variation-settings] duration-300 group-hover:wdth-50">
        ER
      </span>
    </Link>
  );
}
