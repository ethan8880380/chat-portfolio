"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Animates the numeric part of a string like "1,500+" or "+75%" once in view. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();
  const { prefix, target, suffix } = parseMetric(value);

  useEffect(() => {
    if (!isInView || shouldReduceMotion || target === null) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current)
          ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString("en-US")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, shouldReduceMotion, prefix, target, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

function parseMetric(value: string) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  if (!match) return { prefix: "", target: null, suffix: "" };
  return {
    prefix: match[1],
    target: Number(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}
