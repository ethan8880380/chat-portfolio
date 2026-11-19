"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStudio } from "@/components/studio/studio-provider";

interface Measure {
  name: string;
  props?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  pad: [number, number, number, number];
  font: string;
  size: string;
  weight: string;
  color: string;
}

function measure(el: HTMLElement): Measure {
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const px = (v: string) => Math.round(parseFloat(v) || 0);
  const family = cs.fontFamily.split(",")[0].replace(/["']/g, "").replace(/^__|_[a-f0-9]+$/gi, "");
  return {
    name: el.dataset.inspect || el.tagName.toLowerCase(),
    props: el.dataset.inspectProps,
    x: r.left,
    y: r.top,
    w: r.width,
    h: r.height,
    pad: [px(cs.paddingTop), px(cs.paddingRight), px(cs.paddingBottom), px(cs.paddingLeft)],
    font: prettyFont(family),
    size: `${px(cs.fontSize)}/${cs.lineHeight === "normal" ? "auto" : px(cs.lineHeight)}`,
    weight: cs.fontWeight,
    color: cs.color,
  };
}

function prettyFont(raw: string) {
  const r = raw.toLowerCase();
  if (r.includes("anybody")) return "Anybody (variable)";
  if (r.includes("instrument")) return "Instrument Serif";
  if (r.includes("mono")) return "Geist Mono";
  if (r.includes("geist")) return "Geist";
  return raw;
}

/**
 * Inspect mode. Hover anything tagged with data-inspect and get a
 * Figma-style hand-off readout: bounds, padding (hatched), and type specs —
 * all measured live from the DOM, nothing hard-coded.
 */
export function InspectOverlay() {
  const { inspect, setInspect } = useStudio();
  const [m, setM] = useState<Measure | null>(null);
  const target = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!inspect) {
      setM(null);
      target.current = null;
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      if (target.current && target.current.isConnected) setM(measure(target.current));
      else setM(null);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-inspect]") as HTMLElement | null;
      if (el !== target.current) {
        target.current = el;
        schedule();
      }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [inspect]);

  const labelAbove = m ? m.y > 120 : true;

  return (
    <>
      <AnimatePresence>
        {inspect && (
          <motion.div
            key="hud"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-4 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-sel/40 bg-ink-panel/90 py-1.5 pl-4 pr-1.5 font-mono text-[11px] text-white shadow-2xl backdrop-blur"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-sel" />
            <span className="hidden sm:inline">Inspect mode — hover anything for specs</span>
            <span className="sm:hidden">Inspect mode</span>
            <button
              type="button"
              onClick={() => setInspect(false)}
              className="rounded-full bg-white/10 px-3 py-1 transition-colors hover:bg-white/20"
            >
              Exit <kbd className="ml-1 opacity-60">I</kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {inspect && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[65]">
          {/* Rulers */}
          <div className="absolute inset-x-0 top-0 h-3 border-b border-sel/30 bg-ink-panel/70 [background-image:repeating-linear-gradient(to_right,hsl(var(--sel)/0.6)_0_1px,transparent_1px_10px),repeating-linear-gradient(to_right,hsl(var(--sel))_0_1px,transparent_1px_100px)] [background-size:100%_4px,100%_100%] [background-repeat:no-repeat] [background-position:bottom,0_0]" />
          <div className="absolute inset-y-0 left-0 w-3 border-r border-sel/30 bg-ink-panel/70 [background-image:repeating-linear-gradient(to_bottom,hsl(var(--sel)/0.6)_0_1px,transparent_1px_10px),repeating-linear-gradient(to_bottom,hsl(var(--sel))_0_1px,transparent_1px_100px)] [background-size:4px_100%,100%_100%] [background-repeat:no-repeat] [background-position:right,0_0]" />

          {m && (
            <>
              {/* Crosshair guides */}
              <div className="absolute inset-x-0 border-t border-dashed border-sel/30" style={{ top: m.y }} />
              <div className="absolute inset-x-0 border-t border-dashed border-sel/30" style={{ top: m.y + m.h }} />
              <div className="absolute inset-y-0 border-l border-dashed border-sel/30" style={{ left: m.x }} />
              <div className="absolute inset-y-0 border-l border-dashed border-sel/30" style={{ left: m.x + m.w }} />

              {/* Box + padding */}
              <div
                className="absolute border border-sel bg-sel/[0.06] transition-all duration-150 ease-out"
                style={{ left: m.x, top: m.y, width: m.w, height: m.h }}
              >
                <div className="absolute inset-x-0 top-0 bg-[repeating-linear-gradient(-45deg,hsl(var(--hot)/0.45)_0_1px,transparent_1px_5px)]" style={{ height: m.pad[0] }} />
                <div className="absolute inset-x-0 bottom-0 bg-[repeating-linear-gradient(-45deg,hsl(var(--hot)/0.45)_0_1px,transparent_1px_5px)]" style={{ height: m.pad[2] }} />
                <div className="absolute inset-y-0 left-0 bg-[repeating-linear-gradient(-45deg,hsl(var(--hot)/0.45)_0_1px,transparent_1px_5px)]" style={{ width: m.pad[3] }} />
                <div className="absolute inset-y-0 right-0 bg-[repeating-linear-gradient(-45deg,hsl(var(--hot)/0.45)_0_1px,transparent_1px_5px)]" style={{ width: m.pad[1] }} />
                {[
                  "-left-[3px] -top-[3px]",
                  "-right-[3px] -top-[3px]",
                  "-left-[3px] -bottom-[3px]",
                  "-right-[3px] -bottom-[3px]",
                ].map((c) => (
                  <span key={c} className={`absolute size-[6px] border border-sel bg-white ${c}`} />
                ))}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-sel px-1.5 py-0.5 font-mono text-[10px] font-medium text-black">
                  {Math.round(m.w)} × {Math.round(m.h)}
                </span>
              </div>

              {/* Spec card */}
              <div
                className="absolute w-64 overflow-hidden rounded-md border border-sel/50 bg-ink-panel/95 font-mono text-[11px] text-white shadow-2xl backdrop-blur"
                style={{
                  left: Math.min(Math.max(m.x, 16), (typeof window !== "undefined" ? window.innerWidth : 1200) - 272),
                  top: labelAbove ? Math.max(m.y - 128, 8) : Math.min(m.y + m.h + 32, (typeof window !== "undefined" ? window.innerHeight : 800) - 140),
                }}
              >
                <div className="border-b border-white/10 px-3 py-2 text-sel">
                  &lt;{m.name}
                  {m.props ? <span className="text-white/60"> {m.props}</span> : null} /&gt;
                </div>
                <dl className="grid grid-cols-[72px_1fr] gap-x-2 gap-y-1 px-3 py-2">
                  <dt className="text-white/50">font</dt>
                  <dd className="truncate">{m.font}</dd>
                  <dt className="text-white/50">size/lh</dt>
                  <dd>
                    {m.size} · {m.weight}
                  </dd>
                  <dt className="text-white/50">padding</dt>
                  <dd>{m.pad.join(" ")}</dd>
                  <dt className="text-white/50">color</dt>
                  <dd className="flex items-center gap-1.5 truncate">
                    <span className="size-2.5 rounded-sm border border-white/30" style={{ background: m.color }} />
                    {m.color}
                  </dd>
                </dl>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
