"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex items-center gap-2.5 font-inter text-xs uppercase tracking-[0.22em] text-espresso/55"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />
        {eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="mt-6 max-w-4xl font-serif text-[clamp(2.5rem,6.5vw,5.5rem)] font-normal leading-[1.04] tracking-[-0.01em] text-espresso"
      >
        {title}
      </motion.h1>

      {intro ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-6 max-w-2xl font-inter text-lg leading-relaxed text-espresso/65"
        >
          {intro}
        </motion.p>
      ) : null}
    </header>
  );
}
