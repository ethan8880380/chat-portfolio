"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 border-x px-6">
        <SiteLogo />

        <span aria-hidden className="hidden h-5 w-px bg-border md:block" />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = isNavActive(pathname, item.href);
            return (
              <NavLink
                key={item.href}
                item={item}
                isActive={isActive}
                className="relative px-2.5 py-1.5"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute inset-x-2.5 -bottom-[17px] h-px bg-foreground"
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Primary" className="mt-6 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    isActive={isNavActive(pathname, item.href)}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-2.5"
                  />
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href="/ethan-rogers-resume.pdf" target="_blank" rel="noopener noreferrer">
              Résumé
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/chat">Ask my AI</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function SiteLogo({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <Link
      href="/"
      aria-label="Ethan Rogers home"
      className="flex w-fit shrink-0 items-center text-foreground"
    >
      <span
        className={cn(
          "font-semibold tracking-tight",
          size === "sm" ? "text-sm" : "text-base"
        )}
      >
        Ethan Rogers
      </span>
    </Link>
  );
}

function NavLink({
  item,
  isActive,
  className,
  onClick,
  children,
}: {
  item: NavItem;
  isActive: boolean;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-sm transition-colors",
        isActive
          ? "font-semibold text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {item.label}
      {children}
    </Link>
  );
}

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/work")
    return pathname.startsWith("/work") || pathname.startsWith("/projects");
  return pathname === href || pathname.startsWith(`${href}/`);
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Snippets", href: "/snippets" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface NavItem {
  label: string;
  href: string;
}
