"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const WORDS: { t: string; cls?: string }[] = [
  { t: "Design" },
  { t: "technologist" },
  { t: "building" },
  { t: "prototypes", cls: "italic text-clay" },
  { t: "&", cls: "italic text-clay" },
  { t: "production", cls: "italic text-clay" },
  { t: "products.", cls: "italic text-clay" },
];

export function EditorialHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.15]);

  const rise = reduce ? 0 : "0.5em";
  const wordsEnd = 0.18 + WORDS.length * 0.05;

  return (
    <section ref={ref} className="bg-cream">
      <motion.div
        style={{ y, opacity }}
        className="mx-auto max-w-6xl px-6 pb-14 pt-14 md:px-10 md:pb-20 md:pt-20"
      >
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="flex items-center gap-2.5 font-inter text-xs uppercase tracking-[0.22em] text-espresso/55"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />
          Ethan Rogers &mdash; Seattle, WA
        </motion.p>

        <h1 className="mt-8 max-w-5xl font-serif text-[clamp(2.75rem,7vw,6.5rem)] font-normal leading-[1.04] tracking-[-0.01em] text-espresso">
          {WORDS.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: rise }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 + i * 0.05, ease: EASE }}
              className={cn("inline-block", w.cls)}
              style={{ marginRight: "0.22em" }}
            >
              {w.t}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: wordsEnd + 0.05, ease: EASE }}
          className="mt-8 max-w-2xl font-inter text-lg leading-relaxed text-espresso/65 md:text-xl"
        >
          I bridge design and engineering &mdash; prototyping and shipping
          forward-looking product experiences across interaction, motion, and
          Gen AI, on web, mobile, and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: wordsEnd + 0.16, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3 font-inter text-sm text-cream transition-colors hover:bg-clay"
            >
              View selected work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
          <Link
            href="/chat"
            className="font-inter text-sm text-espresso/70 underline-offset-4 transition-colors hover:text-espresso hover:underline"
          >
            or ask my AI &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
