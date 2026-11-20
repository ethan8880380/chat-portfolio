"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { LocalTime } from "@/components/home/local-time";
import { EASE, Fade, RiseLines } from "@/components/noir/reveal";

/*
 * Work, tucked into the sentence: a small image after "design" and another
 * after "build", cycling through projects in step, so the headline shows the
 * claim as it makes it. Each beat pairs a project's design view with its
 * shipped view.
 */
const BEATS = [
  { title: "IRIS TPO", design: "/projectImages/projectContent/tpo-library.png", build: "/projectImages/desktop/iris-tpo-hero.png" },
  { title: "Enterprise Design System", design: "/projectImages/projectContent/eds-1.png", build: "/projectImages/desktop/design-system.png" },
  { title: "Commercial Analytics Hub", design: "/projectImages/projectContent/comm-1.png", build: "/projectImages/desktop/comm-v2-hero.png" },
  { title: "Huggies Website", design: "/projectImages/projectContent/hug-1.png", build: "/projectImages/desktop/huggies.png" },
];
const BEAT_MS = 3200;
/** When the chips open, after the headline has risen. */
const CHIP_DELAY = 1.15;

export function NoirHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // As you scroll on, the headline drifts up slightly and dims.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -48]);

  const [beat, setBeat] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setBeat((b) => (b + 1) % BEATS.length), BEAT_MS);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <section ref={ref} data-inspect="Hero" className="relative flex min-h-svh flex-col justify-end px-6 pb-12 md:px-12 md:pb-16">
      <motion.div style={reduce ? undefined : { opacity, y }}>
        <RiseLines
          lines={[
            <>
              I design <Chip beat={beat} kind="design" delay={CHIP_DELAY} />
              interfaces,
            </>,
            <>
              then I build <Chip beat={beat} kind="build" delay={CHIP_DELAY + 0.12} lag={0.18} />
              them.
            </>,
          ]}
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

/**
 * An inline image sized in em, so it tracks the headline at every breakpoint.
 * It opens by widening from nothing, parting the words around it, and its
 * trailing gap stands in for the word space. All frames stay mounted and
 * cross-fade, so every image is loaded before its turn.
 */
function Chip({ beat, kind, delay, lag = 0 }: { beat: number; kind: "design" | "build"; delay: number; lag?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="inline-block overflow-hidden align-baseline"
      initial={reduce ? false : { width: "0em" }}
      animate={{ width: "1.42em" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <span className="relative block h-[0.68em] w-[1.18em] overflow-hidden rounded-[0.09em] bg-muted ring-1 ring-inset ring-foreground/10">
        {BEATS.map((b, i) => (
          <Image
            key={b.title}
            src={b[kind]}
            alt=""
            fill
            sizes="(min-width: 768px) 190px, 60px"
            priority={i === 0}
            className="object-cover object-top transition-[opacity,transform] duration-700"
            style={{
              opacity: i === beat ? 1 : 0,
              transform: i === beat ? "scale(1)" : "scale(1.06)",
              transitionDelay: `${lag}s`,
              transitionTimingFunction: `cubic-bezier(${EASE.join(",")})`,
            }}
          />
        ))}
      </span>
    </motion.span>
  );
}
