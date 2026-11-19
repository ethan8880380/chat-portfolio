"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EMAIL = "ethan0380@gmail.com";

/** Giant, click-to-copy email. The whole band is the button. */
export function ContactBand() {
  const [copied, setCopied] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <button
      type="button"
      data-inspect="ContactBand"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onClick={() => {
        navigator.clipboard?.writeText(EMAIL).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }}
      className="group relative block w-full overflow-hidden rounded-xl bg-hot px-6 py-12 text-left text-white md:px-10 md:py-16"
    >
      <span className="font-mono text-[11px] uppercase tracking-widest text-white/80">
        Open to Design Technologist · UX Engineer · Prototyper roles
      </span>
      <span className="mt-6 block font-display text-[clamp(2.75rem,9vw,9rem)] font-black uppercase leading-[0.82] tracking-[-0.02em] wdth-75 transition-[font-variation-settings] duration-700 group-hover:wdth-100">
        Let&apos;s build
        <br />
        something weird.
      </span>
      <span className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-lg md:text-2xl">
        <span className="border-b-2 border-white/80 pb-0.5 font-medium">{EMAIL}</span>
        <span className="font-mono text-xs text-white/80">{copied ? "✓ copied to clipboard" : "click anywhere to copy"}</span>
      </span>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: -24 }}
            exit={{ opacity: 0, y: -48 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="pointer-events-none absolute rounded-full bg-white px-3 py-1 font-mono text-xs font-medium text-hot shadow-lg"
            style={{ left: pos.x, top: pos.y }}
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
