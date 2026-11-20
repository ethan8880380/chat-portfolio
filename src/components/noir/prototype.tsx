"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { ProjectData } from "@/data/projects";
import { Fade } from "@/components/noir/reveal";
import { cn } from "@/lib/utils";

/*
 * A coded prototype, running live in a phone. The site is rendered at a real
 * iPhone viewport (390×844) so its own breakpoints, fixed menu and sheets
 * behave exactly as on a phone, then the whole device is scaled to fit.
 */

const SCREEN = { w: 390, h: 844 };
const BEZEL = 11;
const DEVICE = { w: SCREEN.w + BEZEL * 2, h: SCREEN.h + BEZEL * 2 };

type Prototype = NonNullable<ProjectData["prototype"]>;

/** Scale that fits the device into the element's box. */
function useFitScale(maxScale = 1) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setScale(Math.min(maxScale, width / DEVICE.w, height / DEVICE.h));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxScale]);
  return { ref, scale };
}

/**
 * The path the framed site is on, for the address bar. Same-origin, so it can
 * be read directly; polled because client-side navigation fires no load event.
 */
function useFramePath(frame: React.RefObject<HTMLIFrameElement>, base: string) {
  const [path, setPath] = useState("");
  useEffect(() => {
    const id = setInterval(() => {
      try {
        const p = frame.current?.contentWindow?.location.pathname ?? "";
        const next = p.startsWith(base) ? p.slice(base.length) : "";
        setPath((prev) => (prev === next ? prev : next));
      } catch {}
    }, 400);
    return () => clearInterval(id);
  }, [frame, base]);
  return path;
}

function Phone({
  src,
  domain,
  title,
  scale,
  interactive,
  lazy,
}: {
  src: string;
  domain: string;
  title: string;
  scale: number;
  interactive: boolean;
  lazy?: boolean;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const path = useFramePath(frame, src);
  return (
    <div style={{ width: DEVICE.w * scale, height: DEVICE.h * scale }} className="shrink-0">
      <div
        className="relative origin-top-left rounded-[58px] bg-[#1c1c1e] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/15"
        style={{ width: DEVICE.w, height: DEVICE.h, padding: BEZEL, transform: `scale(${scale})` }}
      >
        {/* Side buttons */}
        <span aria-hidden className="absolute -left-[3px] top-[16%] h-7 w-[3px] rounded-l-full bg-[#3a3a3c]" />
        <span aria-hidden className="absolute -left-[3px] top-[24%] h-11 w-[3px] rounded-l-full bg-[#3a3a3c]" />
        <span aria-hidden className="absolute -right-[3px] top-[20%] h-16 w-[3px] rounded-r-full bg-[#3a3a3c]" />

        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[47px] bg-white">
          {/* Dynamic Island */}
          <span aria-hidden className="pointer-events-none absolute left-1/2 top-[11px] z-20 h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-black" />
          <BrowserChrome domain={`${domain}${path}`} />
          <iframe
            ref={frame}
            key={src}
            src={src}
            title={title}
            loading={lazy ? "lazy" : "eager"}
            tabIndex={interactive ? 0 : -1}
            className={cn("min-h-0 w-full flex-1 border-0", !interactive && "pointer-events-none")}
          />
        </div>
      </div>
    </div>
  );
}

/** Mobile Safari's top chrome: status bar, then the domain pill with a lock and share button. */
function BrowserChrome({ domain }: { domain: string }) {
  return (
    <div aria-hidden className="shrink-0 select-none border-b border-black/[0.06] bg-[#f6f6f7] font-sans">
      <div className="flex h-[50px] items-end justify-between px-8 pb-2 text-[15px] font-semibold tracking-tight text-neutral-950">
        <span>9:41</span>
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 17 11" fill="currentColor" className="h-[11px] w-[17px]">
            <rect x="0" y="7" width="3" height="4" rx="0.8" />
            <rect x="4.67" y="4.5" width="3" height="6.5" rx="0.8" />
            <rect x="9.33" y="2" width="3" height="9" rx="0.8" />
            <rect x="14" y="0" width="3" height="11" rx="0.8" />
          </svg>
          <svg viewBox="0 0 16 12" fill="none" className="h-3 w-4">
            <path d="M1.5 4.2a9.2 9.2 0 0 1 13 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M3.76 6.46a6 6 0 0 1 8.48 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M8 10.7 5.8 8.5a3.1 3.1 0 0 1 4.4 0Z" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 27 13" fill="none" className="h-[13px] w-[27px]">
            <rect x="0.5" y="0.5" width="22" height="12" rx="3.8" stroke="currentColor" strokeOpacity="0.4" />
            <rect x="2" y="2" width="19" height="9" rx="2.5" fill="currentColor" />
            <path d="M24.2 4.4v4.2c.9-.35 1.6-1.2 1.6-2.1s-.7-1.75-1.6-2.1Z" fill="currentColor" fillOpacity="0.45" />
          </svg>
        </span>
      </div>
      <div className="px-3 pb-2.5 pt-1">
        <div className="relative flex h-10 items-center justify-center gap-1.5 rounded-[0.85rem] bg-[#e6e6e8] px-10 text-[15px] text-neutral-900">
          <svg viewBox="0 0 12 14" fill="none" className="h-[14px] w-3 shrink-0 text-neutral-600">
            <path d="M3.25 6V4a2.75 2.75 0 0 1 5.5 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="1" y="5.75" width="10" height="7.5" rx="2" fill="currentColor" />
          </svg>
          <span className="truncate">{domain}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute right-3 size-[19px] text-neutral-700"
          >
            <path d="M12 15V3.5M8 7l4-4 4 4M7.5 10.5H6.5A2.5 2.5 0 0 0 4 13v5.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V13a2.5 2.5 0 0 0-2.5-2.5h-1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Project page: the prototype, live and usable, with a variant switcher. */
export function PrototypeStage({ prototype, title }: { prototype: Prototype; title: string }) {
  const [active, setActive] = useState(0);
  const { ref, scale } = useFitScale(1);
  const variant = prototype.variants[active];

  return (
    <Fade className="px-6 md:px-12">
      <div data-inspect="PrototypeStage" className="flex flex-col items-center bg-card px-4 pb-10 pt-12 md:pt-16">
        <div ref={ref} className="flex h-[min(78svh,880px)] w-full justify-center">
          {scale > 0 && <Phone src={variant.src} domain={variant.domain} title={`${title} — ${variant.label}`} scale={scale} interactive />}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-[13px] sm:flex-row sm:gap-8">
          {prototype.variants.length > 1 && (
            <div role="tablist" aria-label="Brand" className="flex gap-1 rounded-full border p-1">
              {prototype.variants.map((v, i) => (
                <button
                  key={v.src}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-full px-4 py-1.5 transition-colors duration-300",
                    i === active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
          <a
            href={variant.src}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            Open full screen <ArrowUpRight className="size-3.5" />
          </a>
        </div>
        <p className="mt-4 text-[12px] text-muted-foreground/70">Live prototype — scroll, tap and navigate inside the phone.</p>
      </div>
    </Fade>
  );
}

/** Work grid: a still-live, non-interactive preview of the prototype's first variant. */
export function PrototypeCard({ prototype, title }: { prototype: Prototype; title: string }) {
  const { ref, scale } = useFitScale(1);
  return (
    <div
      ref={ref}
      className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-card py-6"
      style={prototype.background ? { background: prototype.background } : undefined}
    >
      {scale > 0 && (
        <div className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.015]">
          <Phone src={prototype.variants[0].src} domain={prototype.variants[0].domain} title={title} scale={scale} interactive={false} lazy />
        </div>
      )}
    </div>
  );
}
