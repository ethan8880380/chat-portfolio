"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "Snippets", href: "/snippets" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function useIsActive() {
  const pathname = usePathname();
  return (href: string) => {
    if (href === "/work") {
      return pathname.startsWith("/work") || pathname.startsWith("/projects");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };
}

export function EditorialNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = useIsActive();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50"
    >
      <ProgressiveBlur
        className="z-0"
        position="top"
        height="100px"
        blurLevels={[0.5, 1, 2, 4, 8, 16, 32, 64]}
      />

      <nav className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-10">
        <Link
          href="/"
          className="font-inter text-sm font-medium tracking-tight text-espresso"
        >
          Ethan Rogers
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "font-inter text-sm transition-colors",
                isActive(l.href)
                  ? "text-clay"
                  : "text-espresso/60 hover:text-espresso"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/chat"
            className={cn(
              "rounded-full border px-4 py-1.5 font-inter text-sm transition-colors",
              isActive("/chat")
                ? "border-clay bg-clay text-cream"
                : "border-espresso/20 text-espresso hover:border-clay hover:text-clay"
            )}
          >
            Ask AI
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center md:hidden"
        >
          <span className="relative flex h-3.5 w-5 flex-col justify-between">
            <span
              className={cn(
                "h-px w-full bg-espresso transition-transform",
                open && "translate-y-[6px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-espresso transition-opacity",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-espresso transition-transform",
                open && "-translate-y-[6px] -rotate-45"
              )}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="relative z-10 border-t border-espresso/10 bg-cream px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {[...LINKS, { label: "Ask AI", href: "/chat" }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-2 font-serif text-2xl transition-colors",
                  isActive(l.href)
                    ? "text-clay"
                    : "text-espresso hover:text-clay"
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
