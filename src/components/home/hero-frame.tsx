"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useStudio } from "@/components/studio/studio-provider";
import { LocalTime } from "@/components/home/local-time";
import { Cursor } from "@/components/studio/cursor";

const LINES = ["Ethan", "Rogers"] as const;
const LINE_HEIGHT = 0.84;

type Handle = "e" | "s" | "se";

interface Axes {
  wdth: number[];
  wght: number;
  size: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Binary-search the `wdth` axis so a line of type exactly fills `target` px. */
function fitLine(el: HTMLElement, target: number, size: number, wght: number) {
  const set = (w: number) => {
    el.style.fontVariationSettings = `"wdth" ${w}, "wght" ${wght}`;
  };
  el.style.fontSize = `${size}px`;
  el.style.letterSpacing = "0px";

  set(150);
  if (el.offsetWidth <= target) {
    const gap = (target - el.offsetWidth) / Math.max(1, (el.textContent?.length ?? 1) - 1);
    el.style.letterSpacing = `${gap}px`;
    return 150;
  }
  set(50);
  if (el.offsetWidth >= target) {
    el.style.fontSize = `${(size * target) / el.offsetWidth}px`;
    return 50;
  }
  let lo = 50;
  let hi = 150;
  for (let i = 0; i < 9; i++) {
    const mid = (lo + hi) / 2;
    set(mid);
    if (el.offsetWidth > target) hi = mid;
    else lo = mid;
  }
  set(lo);
  return lo;
}

export function HeroFrame() {
  const reduceMotion = useReducedMotion();
  const { setCommandOpen, toggleInspect } = useStudio();

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLButtonElement>(null);
  const inspectRef = useRef<HTMLButtonElement>(null);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [maxW, setMaxW] = useState(1000);
  const [axes, setAxes] = useState<Axes>({ wdth: [100, 100], wght: 800, size: 0 });
  const [phase, setPhase] = useState<"idle" | "drawing" | "ready">("idle");
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);
  const [step, setStep] = useState(0);
  const dragStart = useRef<{ x: number; y: number; w: number; h: number; handle: Handle } | null>(null);

  // --- Initial measure + the "Ethan draws the frame" intro ------------------
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measureStage = () => {
      const avail = stage.clientWidth;
      setMaxW(avail);
      return avail;
    };
    const avail = measureStage();
    const targetW = Math.min(avail, 1120);
    const targetH = Math.round(targetW * 0.42);

    if (reduceMotion) {
      setSize({ w: targetW, h: targetH });
      setPhase("ready");
    } else {
      setSize({ w: 24, h: 16 });
      setPhase("drawing");
      const controls = animate(0, 1, {
        delay: 0.45,
        duration: 1.35,
        ease: [0.65, 0, 0.35, 1],
        onUpdate: (t) =>
          setSize({ w: Math.round(24 + (targetW - 24) * t), h: Math.round(16 + (targetH - 16) * t) }),
        onComplete: () => setPhase("ready"),
      });
      return () => controls.stop();
    }
  }, [reduceMotion]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const ro = new ResizeObserver(() => {
      const avail = stage.clientWidth;
      setMaxW(avail);
      setSize((s) => (s.w > avail ? { w: avail, h: Math.min(s.h, Math.round(avail * 0.7)) } : s));
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  // --- Fit the type every time the frame changes ----------------------------
  useLayoutEffect(() => {
    if (!size.w) return;
    const fontSize = size.h / (LINES.length * LINE_HEIGHT);
    const aspect = size.h / size.w;
    const wght = Math.round(100 + clamp((aspect - 0.12) / 0.34, 0, 1) * 800);
    const wdth = lineRefs.current.map((el) => (el ? fitLine(el, size.w, fontSize, wght) : 100));
    setAxes({ wdth, wght, size: fontSize });
  }, [size.w, size.h]);

  // --- Resizing --------------------------------------------------------------
  const maxWRef = useRef(maxW);
  maxWRef.current = maxW;

  const onHandleDown = (handle: Handle) => (e: ReactPointerEvent) => {
    if (phase !== "ready") return;
    e.preventDefault();
    dragStart.current = { x: e.clientX, y: e.clientY, w: size.w, h: size.h, handle };
    setDragging(true);
    setTouched(true);
    document.body.style.userSelect = "none";

    const onMove = (ev: PointerEvent) => {
      const d = dragStart.current;
      if (!d) return;
      const dx = ev.clientX - d.x;
      const dy = ev.clientY - d.y;
      setSize({
        w: d.handle === "s" ? d.w : Math.round(clamp(d.w + dx, 220, maxWRef.current)),
        h: d.handle === "e" ? d.h : Math.round(clamp(d.h + dy, 90, 620)),
      });
    };
    const onUp = () => {
      dragStart.current = null;
      setDragging(false);
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  // --- Ethan's cursor tour --------------------------------------------------
  const [ghost, setGhost] = useState({ x: 0, y: 0 });
  const tour = useCallback(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    if (!section || !frame) return [];
    const base = section.getBoundingClientRect();
    const rel = (el: Element | null, ox = 0.5, oy = 0.5) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left - base.left + r.width * ox, y: r.top - base.top + r.height * oy };
    };
    const panelVisible = panelRef.current && panelRef.current.offsetParent !== null;
    return [
      { at: rel(frame, 1, 1), say: touched ? "see? it re-cuts itself" : "psst — drag this corner" },
      panelVisible ? { at: rel(panelRef.current, 0.15, 0.42), say: "every axis here is live" } : null,
      { at: rel(inspectRef.current, 0.2, 0.6), say: "press I to see the redlines" },
      { at: rel(askRef.current, 0.25, 0.7), say: "or just ask my AI (⌘K)" },
    ].filter((s): s is { at: { x: number; y: number }; say: string } => Boolean(s && s.at));
  }, [touched]);

  const [message, setMessage] = useState("");

  useLayoutEffect(() => {
    // While drawing / dragging, Ethan's cursor rides the corner handle.
    if (phase === "drawing" || dragging) {
      const frame = frameRef.current;
      const section = sectionRef.current;
      if (!frame || !section) return;
      const base = section.getBoundingClientRect();
      const r = frame.getBoundingClientRect();
      if (dragging) {
        setGhost({ x: r.right - base.left + 40, y: r.bottom - base.top + 34 });
        setMessage("ooh, nice");
      } else {
        setGhost({ x: r.right - base.left, y: r.bottom - base.top });
        setMessage("drawing a frame…");
      }
    }
  }, [phase, dragging, size]);

  useEffect(() => {
    if (phase !== "ready" || dragging) return;
    const stops = tour();
    if (!stops.length) return;
    const s = stops[step % stops.length];
    setGhost(s.at);
    setMessage(s.say);
    const id = setTimeout(() => setStep((n) => n + 1), step === 0 ? 4200 : 3400);
    return () => clearTimeout(id);
  }, [phase, dragging, step, tour]);

  // --- "You" cursor label ---------------------------------------------------
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 900, damping: 50 });
  const sy = useSpring(my, { stiffness: 900, damping: 50 });
  const [showYou, setShowYou] = useState(false);

  const onSectionMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const cornerHandles: { h?: Handle; cls: string; cursor?: string }[] = [
    { cls: "-left-[5px] -top-[5px]" },
    { cls: "-right-[5px] -top-[5px]" },
    { cls: "-left-[5px] -bottom-[5px]" },
    { h: "se", cls: "-right-[7px] -bottom-[7px] size-[14px]", cursor: "cursor-nwse-resize" },
  ];

  return (
    <section
      ref={sectionRef}
      onPointerMove={onSectionMove}
      onPointerEnter={(e) => e.pointerType === "mouse" && setShowYou(true)}
      onPointerLeave={() => setShowYou(false)}
      data-inspect="HeroCanvas"
      className="relative overflow-hidden border-b bg-canvas"
    >
      <div className="mx-auto grid max-w-[1600px] gap-8 px-4 pb-14 pt-10 sm:px-8 lg:grid-cols-[1fr_260px] lg:gap-10 lg:pt-14">
        <div className="min-w-0">
          {/* Frame name, like a design tool */}
          <div className="mb-2 flex items-center justify-between font-mono text-[11px]">
            <span className="text-sel">#&nbsp;Frame 1 — hello.tsx</span>
            <span className="hidden text-muted-foreground sm:inline">
              {touched ? "edited by You · just now" : "edited by Ethan · just now"}
            </span>
          </div>

          <div ref={stageRef} className="relative" style={{ height: Math.max(size.h, 90) + 8 }}>
            <div
              ref={frameRef}
              data-inspect="ResizableType"
              data-inspect-props={`w={${size.w}} h={${size.h}}`}
              className="absolute left-0 top-0 outline outline-1 outline-sel"
              style={{ width: size.w, height: size.h }}
            >
              <h1
                aria-label="Ethan Rogers"
                className="pointer-events-none select-none font-display uppercase text-foreground"
                style={{ lineHeight: LINE_HEIGHT }}
              >
                {LINES.map((line, i) => (
                  <span
                    key={line}
                    aria-hidden
                    ref={(el) => {
                      lineRefs.current[i] = el;
                    }}
                    className="block w-max whitespace-nowrap"
                    style={{ opacity: size.w > 120 ? 1 : 0 }}
                  >
                    {line}
                  </span>
                ))}
              </h1>

              {/* Edge hit-areas */}
              <div
                onPointerDown={onHandleDown("e")}
                className="absolute -right-2 top-3 bottom-3 w-4 cursor-ew-resize touch-none"
              />
              <div
                onPointerDown={onHandleDown("s")}
                className="absolute -bottom-2 left-3 right-3 h-4 cursor-ns-resize touch-none"
              />
              {cornerHandles.map((c) => (
                <span
                  key={c.cls}
                  onPointerDown={c.h ? onHandleDown(c.h) : undefined}
                  className={`absolute size-[9px] border border-sel bg-white touch-none ${c.cls} ${c.cursor ?? ""}`}
                >
                  {c.h && !touched && phase === "ready" && (
                    <span className="absolute inset-0 animate-pulse-ring border border-sel" />
                  )}
                </span>
              ))}

              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-sel px-1.5 py-0.5 font-mono text-[10px] font-medium tabular-nums text-white">
                {size.w} × {size.h}
              </span>
            </div>
          </div>

          {/* Intro */}
          <div className="mt-14 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            <p data-inspect="Intro" className="max-w-[34ch] text-balance text-2xl leading-[1.2] tracking-tight text-foreground sm:text-3xl">
              Design technologist. I design it in Figma,{" "}
              <span className="font-serif italic">then I ship it</span> in React.{" "}
              <span className="text-muted-foreground">
                Interaction, motion &amp; Gen&nbsp;AI — four years turning enterprise
                chaos into products people actually like using.
              </span>
            </p>

            <div className="flex flex-col gap-5 md:items-end">
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/work"
                  data-inspect="Button"
                  data-inspect-props='variant="primary"'
                  className="group inline-flex h-12 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-transform active:scale-[0.98]"
                >
                  See the work
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <button
                  ref={askRef}
                  type="button"
                  onClick={() => setCommandOpen(true)}
                  data-inspect="Button"
                  data-inspect-props='variant="outline"'
                  className="inline-flex h-12 items-center gap-2 rounded-md border border-foreground/20 bg-card px-5 text-sm font-medium text-foreground transition-colors hover:border-foreground/50"
                >
                  <Sparkles className="size-4 text-hot" />
                  Ask my AI
                  <kbd className="font-mono text-[10px] text-muted-foreground">⌘K</kbd>
                </button>
              </div>
              <button
                ref={inspectRef}
                type="button"
                onClick={toggleInspect}
                className="font-mono text-[11px] text-muted-foreground underline decoration-dotted underline-offset-4 hover:text-foreground"
              >
                <span className="hidden sm:inline">Press <kbd className="rounded border bg-card px-1">I</kbd> anywhere to inspect this site</span>
                <span className="sm:hidden">Tap to inspect this site in blueprint mode</span>
              </button>
            </div>
          </div>
        </div>

        {/* Properties panel */}
        <aside
          ref={panelRef}
          data-inspect="PropertiesPanel"
          className="hidden h-fit self-start rounded-lg border bg-card/90 font-mono text-[11px] shadow-[0_12px_40px_-24px_rgba(0,0,0,0.4)] backdrop-blur lg:block"
        >
          <div className="flex border-b">
            <span className="border-b-2 border-foreground px-3 py-2 font-medium text-foreground">Design</span>
            <span className="px-3 py-2 text-muted-foreground">Prototype</span>
            <span className="px-3 py-2 text-muted-foreground">Inspect</span>
          </div>
          <PanelGroup title="Frame">
            <div className="grid grid-cols-2 gap-2">
              <Field label="W" value={size.w} />
              <Field label="H" value={size.h} />
            </div>
          </PanelGroup>
          <PanelGroup title="Text · Anybody Variable">
            <Field label="Size" value={`${axes.size.toFixed(0)}px`} />
            <Axis label="wght" value={axes.wght} min={100} max={900} />
            {LINES.map((l, i) => (
              <Axis key={l} label={`wdth·${l.toLowerCase()}`} value={Math.round(axes.wdth[i] ?? 100)} min={50} max={150} />
            ))}
          </PanelGroup>
          <PanelGroup title="Status">
            <p className="flex items-center gap-2 text-foreground">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              Open to new roles
            </p>
            <p className="text-muted-foreground">
              Seattle, WA · <LocalTime />
            </p>
            <p className="text-muted-foreground">UX Engineer @ Kimberly-Clark</p>
          </PanelGroup>
        </aside>
      </div>

      {/* Multiplayer cursors */}
      {phase !== "idle" && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20"
          initial={false}
          animate={{ x: ghost.x, y: ghost.y }}
          transition={
            phase === "drawing" || dragging
              ? { duration: 0 }
              : { type: "spring", stiffness: 60, damping: 16, mass: 1 }
          }
        >
          <Cursor name="Ethan" color="hot" message={message} />
        </motion.div>
      )}
      {showYou && (
        <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-30" style={{ x: sx, y: sy }}>
          <span className="ml-4 mt-5 inline-block rounded-sm bg-sel px-1.5 py-0.5 font-mono text-[10px] font-medium text-white">
            You
          </span>
        </motion.div>
      )}
    </section>
  );
}

function PanelGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 border-b px-3 py-3 last:border-b-0">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center gap-2 rounded border bg-background/60 px-2 py-1 tabular-nums">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function Axis({ label, value, min, max }: { label: string; value: number; min: number; max: number }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between tabular-nums">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-foreground">{value}</span>
      </div>
      <div className="relative mt-1 h-1 rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 rounded-full bg-sel" style={{ width: `${pct}%` }} />
        <div
          className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sel bg-white"
          style={{ left: `${pct}%` }}
        />
      </div>
    </div>
  );
}
