"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { LocalTime } from "@/components/home/local-time";
import { Fade, RiseLines } from "@/components/noir/reveal";

export function NoirHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // As you scroll on, the headline drifts up slightly and dims.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -48]);

  return (
    <section ref={ref} data-inspect="Hero" className="relative flex min-h-svh flex-col justify-end px-6 pb-12 md:px-12 md:pb-16">
      <motion.div style={reduce ? undefined : { opacity, y }}>
        <RiseLines
          lines={["I design interfaces,", "then I build them."]}
          mutedLines={[1]}
          delay={0.2}
          className="font-gserif text-[clamp(3rem,9.5vw,10rem)] leading-[0.92] tracking-[-0.045em]"
        />
      </motion.div>
      <Fade delay={0.6} className="mt-16 grid gap-3 border-t pt-6 text-[13px] text-muted-foreground sm:grid-cols-3 md:mt-24">
        <p>Design technologist & UX engineer</p>
        <p className="sm:text-center">
          Seattle, <LocalTime />
        </p>
        <p className="flex items-center gap-2 sm:justify-end">
          <span className="size-1.5 rounded-full bg-foreground" />
          Open to new roles
        </p>
      </Fade>
    </section>
  );
}
