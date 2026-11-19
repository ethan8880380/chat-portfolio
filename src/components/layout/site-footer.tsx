"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const WORD = "ETHAN ROGERS";

/**
 * Footer wordmark. Every letter is its own variable-font instance: the closer
 * your pointer, the wider and heavier it gets. Without a pointer it breathes
 * on its own as a slow wave.
 */
function ProximityWordmark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let visible = false;
    const current = letters.current.map(() => 0.3);

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const box = wrap.getBoundingClientRect();
      letters.current.forEach((el, i) => {
        if (!el) return;
        let target: number;
        if (pointer) {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(pointer.x - cx, (pointer.y - cy) * 0.6);
          target = Math.max(0, 1 - d / (box.width * 0.22));
        } else {
          target = reduce ? 0.5 : 0.5 + 0.5 * Math.sin(t / 900 - i * 0.55);
        }
        current[i] += (target - current[i]) * 0.12;
        const k = current[i];
        el.style.fontVariationSettings = `"wdth" ${(50 + k * 100).toFixed(1)}, "wght" ${(200 + k * 700).toFixed(0)}`;
      });
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      pointer = null;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(wrap);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      data-inspect="ProximityWordmark"
      aria-hidden
      className="flex select-none items-end justify-center overflow-hidden px-2 pt-6 font-display leading-[0.78] text-foreground"
      style={{ fontSize: "clamp(3rem, 10.6vw, 13rem)" }}
    >
      {WORD.split("").map((ch, i) => (
        <span
          key={i}
          ref={(el) => {
            letters.current[i] = el;
          }}
          className="inline-block"
          style={{ fontVariationSettings: '"wdth" 80, "wght" 400', width: ch === " " ? "0.2em" : undefined }}
        >
          {ch === " " ? " " : ch}
        </span>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer data-inspect="Footer" className="mt-auto border-t bg-background">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-[28ch] text-2xl leading-tight tracking-tight text-foreground">
            Have a weird, ambitious interface you need built?{" "}
            <span className="font-serif italic text-muted-foreground">That&apos;s my favorite kind.</span>
          </p>
          <a
            href="mailto:ethan0380@gmail.com"
            className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-sm font-medium text-foreground"
          >
            ethan0380@gmail.com ↗
          </a>
        </div>
        <FooterCol
          title="Pages"
          links={[
            { label: "Work", href: "/work" },
            { label: "Snippets", href: "/snippets" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Ask my AI", href: "/chat" },
          ]}
        />
        <FooterCol
          title="Elsewhere"
          links={[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/ethan-rogers/" },
            { label: "GitHub", href: "https://github.com/ethan8880380" },
            { label: "Résumé (PDF)", href: "/ethan-rogers-resume.pdf" },
          ]}
        />
        <div className="md:col-span-3">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Colophon</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Set in Anybody (variable), Geist &amp; Instrument Serif. Built by hand with Next.js,
            Tailwind and Framer Motion. Press <kbd className="rounded border bg-card px-1 font-mono text-[10px]">I</kbd> to
            see how.
          </p>
        </div>
      </div>

      <ProximityWordmark />

      <div className="flex flex-col gap-2 border-t px-4 py-4 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Available for new roles · Seattle, WA
        </p>
        <p>© {new Date().getFullYear()} Ethan Rogers — no templates were harmed</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className="md:col-span-2">
      <h2 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map((l) => {
          const external = l.href.startsWith("http") || l.href.endsWith(".pdf");
          const cls = "text-sm text-foreground/80 transition-colors hover:text-foreground hover:underline underline-offset-4";
          return (
            <li key={l.label}>
              {external ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className={cls}>
                  {l.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
