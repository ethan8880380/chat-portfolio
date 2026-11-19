"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/*
 * The footer's one flourish: the contact block pins while you scroll and the
 * heading pulls back out of the counter of an "o" until the sentence settles.
 */

const PORTAL_MAX = 42;

function useCounterOrigin(headingRef: React.RefObject<HTMLElement | null>) {
  const [origin, setOrigin] = useState("50% 50%");
  useLayoutEffect(() => {
    const h = headingRef.current;
    if (!h) return;
    const measure = () => {
      const o = h.querySelector<HTMLElement>("[data-portal]");
      const probe = h.querySelector<HTMLElement>("[data-portal-probe]");
      if (!o || !probe) return;
      // Measure without the current zoom applied.
      const prev = h.style.transform;
      h.style.transform = "none";
      const hr = h.getBoundingClientRect();
      const or = o.getBoundingClientRect();
      const baseline = probe.getBoundingClientRect().top;
      h.style.transform = prev;
      const cs = getComputedStyle(o);
      const ctx = document.createElement("canvas").getContext("2d");
      let cx = or.left + or.width / 2;
      let cy = baseline - or.height * 0.22;
      if (ctx) {
        ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const m = ctx.measureText("o");
        cx = or.left + (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2;
        cy = baseline - (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
      }
      setOrigin(`${cx - hr.left}px ${cy - hr.top}px`);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [headingRef]);
  return origin;
}

/** Splits lines into text, wrapping the portal "o" (line, char index) in a span. */
function PortalLines({ lines, muted, portal }: { lines: string[]; muted: number[]; portal: [number, number] }) {
  return (
    <>
      {lines.map((line, li) => (
        <span key={li} className={cn("block", muted.includes(li) && "text-muted-foreground")}>
          {li === portal[0] ? (
            <>
              {line.slice(0, portal[1])}
              <span data-portal className="inline-block">
                {line[portal[1]]}
                <span data-portal-probe className="inline-block h-0 w-0 align-baseline" />
              </span>
              {line.slice(portal[1] + 1)}
            </>
          ) : (
            line
          )}
        </span>
      ))}
    </>
  );
}

/**
 * Scroll mode: the block pins while you scroll; the heading starts deep
 * inside the counter of the chosen "o" and pulls back until the sentence
 * settles. `after` fades in once it lands. Time mode (no surrounding page
 * to scroll through) plays the same pull-back on mount.
 */
export function PortalHeading({
  lines,
  muted = [],
  portal,
  className,
  before,
  after,
  mode = "scroll",
}: {
  lines: string[];
  muted?: number[];
  portal: [number, number];
  className?: string;
  before?: ReactNode;
  after?: ReactNode;
  mode?: "scroll" | "time";
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const origin = useCounterOrigin(headingRef);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Zoom is interpolated in log space (so equal scroll = equal perceived camera
  // travel), eased in-out: linger inside the letter, sweep, settle.
  const zoom = (p: number) => {
    const t = Math.min(1, Math.max(0, p));
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    return Math.pow(PORTAL_MAX, 1 - e);
  };
  const scale = useTransform(scrollYProgress, (p) => zoom(p / 0.72));
  const afterOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const afterY = useTransform(scrollYProgress, [0.7, 0.85], [16, 0]);
  const beforeOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);

  const headingEl = (style?: Record<string, unknown>) => (
    <motion.h2 ref={headingRef} className={className} style={{ transformOrigin: origin, ...style }}>
      <PortalLines lines={lines} muted={muted} portal={portal} />
    </motion.h2>
  );

  if (reduce) {
    return (
      <div className="px-6 py-40 md:px-12">
        {before}
        {headingEl()}
        {after}
      </div>
    );
  }

  if (mode === "time") {
    return (
      <div className="flex min-h-svh flex-col justify-center overflow-hidden px-6 pt-24 md:px-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}>
          {before}
        </motion.div>
        <TimePortal origin={origin} className={className} headingRef={headingRef}>
          <PortalLines lines={lines} muted={muted} portal={portal} />
        </TimePortal>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.9 }}>
          {after}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative h-[240svh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-6 md:px-12">
        <motion.div style={{ opacity: beforeOpacity }}>{before}</motion.div>
        {headingEl({ scale })}
        <motion.div style={{ opacity: afterOpacity, y: afterY }}>{after}</motion.div>
      </div>
    </div>
  );
}

function TimePortal({
  origin,
  className,
  headingRef,
  children,
}: {
  origin: string;
  className?: string;
  headingRef: React.RefObject<HTMLHeadingElement>;
  children: ReactNode;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setGo(true));
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    const h = headingRef.current;
    if (!go || !h) return;
    const c = animate(1, 0, {
      duration: 1.8,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (v) => (h.style.transform = `scale(${Math.pow(PORTAL_MAX, v)})`),
    });
    return () => c.stop();
  }, [go, headingRef]);
  return (
    <h2 ref={headingRef} className={className} style={{ transformOrigin: origin, transform: `scale(${PORTAL_MAX})` }}>
      {children}
    </h2>
  );
}
