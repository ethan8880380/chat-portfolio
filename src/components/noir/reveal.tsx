"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/*
 * One quiet motion language for the whole site: things arrive with a soft
 * fade, a short rise and a whisper of blur clearing — once, as they enter
 * view. Nothing pins, zooms or performs.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

const hidden = { opacity: 0, y: 14, filter: "blur(5px)" };
const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
const VIEWPORT = { once: true, margin: "0px 0px -8% 0px" } as const;

/** Headline lines, each settling in just after the one before. */
export function RiseLines({
  lines,
  className,
  mutedLines = [],
  delay = 0,
  as: Tag = "h1",
}: {
  lines: ReactNode[];
  className?: string;
  /** Indexes of lines rendered in the muted gray. */
  mutedLines?: number[];
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className={cn("block", mutedLines.includes(i) && "text-muted-foreground")}
          initial={reduce ? false : hidden}
          whileInView={shown}
          viewport={VIEWPORT}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.09 }}
        >
          {line}
        </motion.span>
      ))}
    </Tag>
  );
}

/** Supporting content: the same arrival, a touch lighter. */
export function Fade({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** A section rule that draws in quietly from the left. */
export function Hairline({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={cn("h-px origin-left bg-border", className)}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.4, ease: EASE }}
    />
  );
}

/** A paragraph whose words brighten gently as it scrolls through view. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, Math.min(1, (i + 3) / words.length)]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity: reduce ? 1 : opacity }}>
      {children}{" "}
    </motion.span>
  );
}
