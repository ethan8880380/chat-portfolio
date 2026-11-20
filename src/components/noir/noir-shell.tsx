"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { normalizePath } from "@/lib/routes";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/** Wraps every noir page: theme, a whisper of navigation, nothing else. */
export function NoirShell({ children }: { children: ReactNode }) {
  const pathname = normalizePath(usePathname());

  useEffect(() => {
    document.documentElement.dataset.noir = "";
    return () => {
      delete document.documentElement.dataset.noir;
    };
  }, []);

  return (
    <div className="noir relative min-h-svh bg-background text-foreground">
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 text-[13px] mix-blend-difference md:px-12"
      >
        <Link href="/" className="text-foreground">
          Ethan Rogers
        </Link>
        <nav aria-label="Primary" className="flex gap-6">
          {LINKS.map((l) => {
            const active = pathname === l.href || (l.href === "/work" && pathname.startsWith("/projects"));
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn("transition-colors duration-300 hover:text-foreground", active ? "text-foreground" : "text-muted-foreground")}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </motion.header>
      {children}
    </div>
  );
}
