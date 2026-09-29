"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HomeHero({ marquee }: { marquee: ReactNode }) {
  return (
    <section className="-mt-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-6 pb-16 pt-32 sm:pt-36 md:pb-20">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 bg-center [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)]"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex flex-col items-center text-center"
        >
          <motion.p
            variants={itemVariants}
            className="flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Ethan Rogers · Seattle, WA
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-8 max-w-4xl text-balance text-4xl font-medium tracking-tighter text-foreground sm:text-[clamp(2.5rem,5.6vw,4.25rem)] sm:leading-[1.05]"
          >
            Design technologist building prototypes & production products.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[56ch] text-sm text-muted-foreground sm:text-base"
          >
            I bridge design and engineering — prototyping and shipping
            forward-looking product experiences across interaction, motion, and
            Gen AI, on web, mobile, and beyond.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button asChild size="xl">
              <Link href="/work">View selected work</Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/chat">Ask my AI</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="border-t"
      >
        {marquee}
      </motion.div>
    </section>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
