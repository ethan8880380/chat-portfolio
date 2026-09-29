"use client";

import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GridMarks } from "@/components/layout/grid-marks";
import { SpotlightGrid } from "@/components/layout/spotlight-grid";
import { StatusDot } from "@/components/layout/status-dot";
import { LocalTime } from "@/components/home/local-time";

export function HomeHero({ marquee }: { marquee: ReactNode }) {
  return (
    <section className="-mt-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-8 pb-14 pt-32 sm:pt-40 md:px-10 md:pb-16">
        <SpotlightGrid maskClassName="[mask-image:radial-gradient(ellipse_80%_70%_at_70%_30%,black,transparent)]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative"
        >
          <motion.p
            variants={fadeVariants}
            className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            <StatusDot />
            Ethan Rogers · Open to new roles
          </motion.p>

          <h1 className="mt-10 max-w-5xl text-balance text-[clamp(2.75rem,8vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-foreground">
            <span className="sr-only">{HEADLINE.map((word) => word.text).join(" ")}</span>
            <span aria-hidden>
              {HEADLINE.map((word, index) => (
                <Fragment key={word.text}>
                  <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span variants={wordVariants} className="inline-block">
                      {word.text}
                    </motion.span>
                  </span>
                  {index < HEADLINE.length - 1 && " "}
                </Fragment>
              ))}
            </span>
          </h1>

          <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <motion.p
              variants={fadeVariants}
              className="max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I bridge design and engineering — prototyping and shipping
              forward-looking product experiences across interaction, motion, and
              Gen AI, on web, mobile, and beyond.
            </motion.p>

            <motion.div
              variants={fadeVariants}
              className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <Button asChild size="xl" className="group">
                <Link href="/work">
                  View selected work
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/chat">Ask my AI</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="border-t"
      >
        <div className="relative mx-auto max-w-6xl border-x">
          <GridMarks edges="top" />
          <dl className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {META.map((item) => (
              <div key={item.label} className="bg-background px-8 py-5 md:px-10">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="mt-1.5 truncate text-sm text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="border-t"
      >
        {marquee}
      </motion.div>
    </section>
  );
}

const HEADLINE = [
  { text: "Design" },
  { text: "technologist" },
  { text: "building" },
  { text: "prototypes" },
  { text: "&" },
  { text: "production" },
  { text: "products." },
];

const META: { label: string; value: ReactNode }[] = [
  { label: "Currently", value: "UX Engineer · Kimberly-Clark" },
  { label: "Focus", value: "Interaction, motion & Gen AI" },
  { label: "Based in", value: "Seattle, WA" },
  { label: "Local time", value: <LocalTime /> },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
