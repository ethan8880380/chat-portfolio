"use client";

import { useState, type ReactNode } from "react";
import type { Discipline, Mode } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

/*
 * Chart kit for /dashboard. Mostly quiet, conventional marks; the career
 * timeline is the one dot-matrix piece. Categories are encoded by shape +
 * color (white/gray are achromatic, so color alone isn't enough):
 *   Designed & built → solid red · Design → solid white · Research-led → hollow ring
 */

const SHAPE: Record<Mode, string> = {
  "Designed & built": "bg-[var(--signal)]",
  Design: "bg-[var(--dot-on)]",
  "Research-led": "border-[1.5px] border-[var(--dot-mid)] bg-transparent",
};

export function ModeDot({ mode, className }: { mode: Mode; className?: string }) {
  return <span aria-hidden className={cn("inline-block shrink-0 rounded-full", SHAPE[mode], className ?? "size-2")} />;
}

function Tooltip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="tooltip"
      className={cn(
        "pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-max max-w-[260px] -translate-x-1/2 rounded-xl border bg-popover px-3 py-2 text-xs leading-relaxed text-foreground shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Coverage rings — share of projects involving each discipline        */

const RINGS: { d: Discipline; label: string; r: number; color: string; mode: Mode }[] = [
  { d: "Build", label: "Built it", r: 80, color: "var(--signal)", mode: "Designed & built" },
  { d: "Design", label: "Designed it", r: 64, color: "var(--dot-on)", mode: "Design" },
  { d: "Research", label: "Researched it", r: 48, color: "var(--dot-mid)", mode: "Research-led" },
];

export function CoverageRings({ total, counts }: { total: number; counts: Record<Discipline, number> }) {
  const [hover, setHover] = useState<Discipline | null>(null);
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg viewBox="0 0 200 200" className="size-44 -rotate-90" role="img" aria-label="Share of projects by discipline">
          {RINGS.map(({ d, r, color }) => {
            const c = 2 * Math.PI * r;
            const pct = total ? counts[d] / total : 0;
            return (
              <g key={d} opacity={hover === null || hover === d ? 1 : 0.3} className="transition-opacity">
                <circle cx="100" cy="100" r={r} fill="none" stroke="var(--grid)" strokeWidth="9" />
                <circle
                  cx="100"
                  cy="100"
                  r={r}
                  fill="none"
                  stroke={color}
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={`${c * pct} ${c}`}
                  className="transition-[stroke-dasharray] duration-1000 ease-out"
                />
              </g>
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-gserif text-3xl leading-none">{total}</span>
          <span className="mt-1 text-[11px] text-muted-foreground">projects</span>
        </div>
      </div>
      <ul className="w-full divide-y divide-border text-sm">
        {RINGS.map(({ d, label, mode }) => (
          <li
            key={d}
            onPointerEnter={() => setHover(d)}
            onPointerLeave={() => setHover(null)}
            className="flex items-center gap-3 py-2.5"
          >
            <ModeDot mode={mode} className="size-2.5" />
            <span className="flex-1 text-foreground/85">{label}</span>
            <span className="tabular-nums text-foreground">
              {counts[d]}
              <span className="text-muted-foreground"> / {total}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal bars — single series, value at the tip                   */

export function HBars({ data, max }: { data: { name: string; value: number; projects: string[] }[]; max: number }) {
  const [hover, setHover] = useState<number | null>(null);
  if (!data.length) return <p className="py-8 text-center text-sm text-muted-foreground">No projects in this range.</p>;
  return (
    <ul className="space-y-4">
      {data.map((d, i) => (
        <li key={d.name} className="relative" onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-foreground/85">{d.name}</span>
            <span className="tabular-nums text-muted-foreground">{d.value}</span>
          </div>
          <div className="mt-1.5 h-1.5 rounded-full bg-[var(--grid)]">
            <div
              className="h-full rounded-full transition-[width,opacity] duration-700 ease-out"
              style={{
                width: `${(d.value / Math.max(1, max)) * 100}%`,
                background: "var(--dot-on)",
                opacity: hover === null || hover === i ? 1 : 0.4,
              }}
            />
          </div>
          {hover === i && (
            <Tooltip className="bottom-auto top-full mb-0 mt-2">
              <p className="font-medium">
                {d.name} · {d.value} of {max} projects
              </p>
              <p className="mt-0.5 text-muted-foreground">{d.projects.join(", ")}</p>
            </Tooltip>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Career timeline — the one dot-matrix piece: a dot per quarter        */

interface Span {
  label: string;
  org: string;
  start: number;
  end: number | null;
  current: boolean;
}

export function DotTimeline({ spans, now }: { spans: Span[]; now: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const from = 2018;
  const to = Math.floor(now) + 1;
  const cells = (to - from) * 4;
  const years = Array.from({ length: to - from }, (_, i) => from + i);
  const fmt = (v: number) => `${["Jan", "Apr", "Jul", "Oct"][Math.floor((v % 1) * 4)]} ${Math.floor(v)}`;

  return (
    <div>
      <div className="space-y-5">
        {spans.map((s, si) => {
          const end = s.end ?? now;
          return (
            <div key={s.label} onPointerEnter={() => setHover(si)} onPointerLeave={() => setHover(null)}>
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                <span className="text-foreground">
                  {s.label} <span className="text-muted-foreground">· {s.org}</span>
                </span>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {fmt(s.start)} – {s.end ? fmt(s.end) : <span className="text-[var(--signal)]">present</span>}
                </span>
              </div>
              <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cells}, minmax(0, 1fr))` }}>
                {Array.from({ length: cells }, (_, c) => {
                  const mid = from + (c + 0.5) / 4;
                  const on = mid >= s.start && mid <= end + 0.125;
                  return (
                    <span
                      key={c}
                      className={cn(
                        "mx-auto aspect-square w-full max-w-[10px] rounded-full transition-opacity",
                        on ? (s.current ? "bg-[var(--signal)]" : "bg-[var(--dot-on)]") : "bg-[var(--dot-off)]",
                        hover !== null && hover !== si && on && "opacity-35"
                      )}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="mt-4 grid gap-[3px] border-t pt-2"
        style={{ gridTemplateColumns: `repeat(${cells}, minmax(0, 1fr))`, borderColor: "var(--grid)" }}
      >
        {years.map((y) => (
          <span key={y} className="col-span-4 text-[11px] tabular-nums text-muted-foreground">
            {y}
          </span>
        ))}
      </div>
    </div>
  );
}
