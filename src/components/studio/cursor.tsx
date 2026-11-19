"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** A multiplayer-style cursor with a name tag and optional chat bubble. */
export function Cursor({
  name,
  color = "hot",
  message,
}: {
  name: string;
  color?: "hot" | "sel";
  message?: string;
}) {
  const bg = color === "hot" ? "bg-hot" : "bg-sel";
  const fill = color === "hot" ? "hsl(var(--hot))" : "hsl(var(--sel))";
  return (
    <div className="relative">
      <svg width="18" height="20" viewBox="0 0 18 20" className="drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
        <path d="M1 1 L16.5 8.5 L9.5 10.5 L6 18 Z" fill={fill} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <div className="absolute left-4 top-4 flex flex-col items-start gap-1">
        <span className={cn("rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-medium text-white", bg)}>{name}</span>
        <AnimatePresence mode="wait">
          {message && (
            <motion.span
              key={message}
              initial={{ opacity: 0, y: 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "whitespace-nowrap rounded-xl rounded-tl-sm px-3 py-1.5 text-[13px] font-medium text-white shadow-lg",
                bg
              )}
            >
              {message}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
