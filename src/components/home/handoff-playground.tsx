"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "hot";
type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { h: number; px: number; text: number }> = {
  sm: { h: 36, px: 14, text: 13 },
  md: { h: 48, px: 22, text: 15 },
  lg: { h: 64, px: 30, text: 18 },
};

/**
 * "I design it, then I ship it" — a property panel on the left, the live
 * component in the middle, and the code it compiles to on the right. Every
 * control is wired to all three at once.
 */
export function HandoffPlayground() {
  const [variant, setVariant] = useState<Variant>("primary");
  const [size, setSize] = useState<Size>("md");
  const [radius, setRadius] = useState(8);
  const [label, setLabel] = useState("Hire Ethan");
  const [icon, setIcon] = useState(true);
  const [copied, setCopied] = useState(false);

  const s = SIZES[size];

  const codeLines: ReactNode[] = [
    <>
      <T c="p">&lt;</T>
      <T c="tag">Button</T>
    </>,
    <Prop name="variant" value={`"${variant}"`} />,
    <Prop name="size" value={`"${size}"`} />,
    <Prop name="radius" value={`{${radius}}`} />,
    icon ? <Prop name="iconRight" value="{<ArrowRight />}" /> : null,
    <>
      <T c="p">&gt;</T>
    </>,
    <>
      {"  "}
      <T c="str">{label || " "}</T>
    </>,
    <>
      <T c="p">&lt;/</T>
      <T c="tag">Button</T>
      <T c="p">&gt;</T>
    </>,
  ].filter(Boolean);

  const plain = `<Button\n  variant="${variant}"\n  size="${size}"\n  radius={${radius}}${icon ? "\n  iconRight={<ArrowRight />}" : ""}\n>\n  ${label}\n</Button>`;

  return (
    <div
      data-inspect="HandoffPlayground"
      className="grid overflow-hidden rounded-xl border border-foreground/15 bg-card shadow-[0_30px_60px_-40px_rgba(0,0,0,0.5)] lg:grid-cols-[260px_1fr_360px]"
    >
      {/* Design panel */}
      <div className="border-b font-mono text-[11px] lg:border-b-0 lg:border-r">
        <PanelTitle>Design</PanelTitle>
        <Group label="Variant">
          <Segmented options={["primary", "outline", "hot"]} value={variant} onChange={(v) => setVariant(v as Variant)} />
        </Group>
        <Group label="Size">
          <Segmented options={["sm", "md", "lg"]} value={size} onChange={(v) => setSize(v as Size)} />
        </Group>
        <Group label={`Corner radius · ${radius}`}>
          <input
            type="range"
            min={0}
            max={32}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            aria-label="Corner radius"
            className="w-full accent-[hsl(var(--sel))]"
          />
        </Group>
        <Group label="Label">
          <input
            value={label}
            maxLength={24}
            onChange={(e) => setLabel(e.target.value)}
            aria-label="Button label"
            className="w-full rounded border bg-background px-2 py-1.5 font-sans text-[13px] text-foreground outline-none focus:border-sel"
          />
        </Group>
        <Group label="Icon">
          <button
            type="button"
            role="switch"
            aria-checked={icon}
            aria-label="Toggle icon"
            onClick={() => setIcon((v) => !v)}
            className={cn("relative h-5 w-9 rounded-full transition-colors", icon ? "bg-sel" : "bg-muted")}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 600, damping: 35 }}
              className={cn("absolute top-0.5 size-4 rounded-full bg-white shadow", icon ? "right-0.5" : "left-0.5")}
            />
          </button>
        </Group>
      </div>

      {/* Canvas */}
      <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border-b bg-canvas bg-background p-10 lg:border-b-0 lg:border-r">
        <span className="absolute left-4 top-3 font-mono text-[11px] text-sel"># Button / {variant} / {size}</span>
        <motion.div layout transition={{ type: "spring", stiffness: 500, damping: 36 }} className="relative">
          <Link
            href="/contact"
            className={cn(
              "inline-flex items-center gap-2 whitespace-nowrap font-medium transition-colors",
              variant === "primary" && "bg-foreground text-background",
              variant === "outline" && "border-2 border-foreground bg-transparent text-foreground",
              variant === "hot" && "bg-hot text-white"
            )}
            style={{ height: s.h, paddingInline: s.px, fontSize: s.text, borderRadius: radius }}
          >
            {label || " "}
            {icon && <ArrowRight style={{ width: s.text + 2, height: s.text + 2 }} />}
          </Link>
          {/* selection chrome */}
          <span aria-hidden className="pointer-events-none absolute -inset-1.5 border border-sel" />
          {["-left-[9px] -top-[9px]", "-right-[9px] -top-[9px]", "-left-[9px] -bottom-[9px]", "-right-[9px] -bottom-[9px]"].map((c) => (
            <span key={c} aria-hidden className={`pointer-events-none absolute size-[7px] border border-sel bg-white ${c}`} />
          ))}
          <span aria-hidden className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-sel px-1.5 py-0.5 font-mono text-[10px] text-white">
            Hug × {s.h}
          </span>
          {/* radius redline */}
          {radius > 0 && (
            <span aria-hidden className="pointer-events-none absolute -left-14 -top-7 font-mono text-[10px] text-hot">
              r {radius}
            </span>
          )}
        </motion.div>
      </div>

      {/* Code */}
      <div className="flex flex-col bg-ink-panel text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 font-mono text-[11px]">
          <span className="text-white/60">hero-cta.tsx</span>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(plain).catch(() => {});
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            }}
            className="flex items-center gap-1.5 text-white/60 transition-colors hover:text-white"
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="flex-1 overflow-x-auto p-4 font-mono text-[13px] leading-[1.8]">
          {codeLines.map((line, i) => (
            <motion.div
              key={`${i}:${plain.split("\n")[i]}`}
              initial={{ backgroundColor: "rgba(255,255,255,0.10)" }}
              animate={{ backgroundColor: "rgba(255,255,255,0)" }}
              transition={{ duration: 0.8 }}
              className="-mx-4 flex px-4"
            >
              <span className="mr-4 w-4 select-none text-right text-white/25">{i + 1}</span>
              <span>{line}</span>
            </motion.div>
          ))}
        </pre>
        <p className="border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-white/45">
          ✓ tokens match Figma · 0 handoff meetings needed
        </p>
      </div>
    </div>
  );
}

function T({ c, children }: { c: "p" | "tag" | "attr" | "str"; children: ReactNode }) {
  const color = { p: "text-white/50", tag: "text-[#7dd3fc]", attr: "text-[#fda4af]", str: "text-[#fde68a]" }[c];
  return <span className={color}>{children}</span>;
}

function Prop({ name, value }: { name: string; value: string }) {
  return (
    <>
      {"  "}
      <T c="attr">{name}</T>
      <T c="p">=</T>
      <T c="str">{value}</T>
    </>
  );
}

function PanelTitle({ children }: { children: ReactNode }) {
  return <div className="border-b px-4 py-2.5 font-medium text-foreground">{children}</div>;
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2 border-b px-4 py-3 last:border-b-0">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-flow-col gap-0.5 rounded-md bg-muted p-0.5">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          aria-pressed={value === o}
          className={cn(
            "rounded px-2 py-1 transition-colors",
            value === o ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
