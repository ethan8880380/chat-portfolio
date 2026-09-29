"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Hairline grid sized to divide its container evenly (no clipped cells), plus a
 * darker copy revealed around the cursor. Place inside a `relative overflow-hidden` container.
 */
export function SpotlightGrid({ maskClassName }: { maskClassName: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<GridLines | null>(null);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const springX = useSpring(x, SPRING);
  const springY = useSpring(y, SPRING);
  const mask = useMotionTemplate`radial-gradient(220px circle at ${springX}px ${springY}px, black, transparent)`;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setLines(getGridLines(width, height));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [x, y]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0">
      {lines && (
        <>
          <GridLayer lines={lines} lineClassName="bg-border" className={maskClassName} />
          <motion.div
            style={{ maskImage: mask, WebkitMaskImage: mask }}
            className="absolute inset-0 motion-reduce:hidden"
          >
            <GridLayer lines={lines} lineClassName="bg-foreground/[0.18]" />
          </motion.div>
        </>
      )}
    </div>
  );
}

function GridLayer({
  lines,
  lineClassName,
  className,
}: {
  lines: GridLines;
  lineClassName: string;
  className?: string;
}) {
  return (
    <div className={cn("absolute inset-0 animate-in fade-in duration-700", className)}>
      {lines.columns.map((left) => (
        <span key={`c${left}`} className={cn("absolute inset-y-0 w-px", lineClassName)} style={{ left }} />
      ))}
      {lines.rows.map((top) => (
        <span key={`r${top}`} className={cn("absolute inset-x-0 h-px", lineClassName)} style={{ top }} />
      ))}
    </div>
  );
}

function getGridLines(width: number, height: number): GridLines {
  const columnCount = Math.max(4, Math.round(width / TARGET_CELL));
  const cellSize = width / columnCount;
  const rowCount = Math.max(1, Math.round(height / cellSize));

  return {
    columns: getInteriorPositions(width, columnCount),
    rows: getInteriorPositions(height, rowCount),
  };
}

/** Evenly spaced line offsets between (not on) the container's edges. */
function getInteriorPositions(length: number, count: number) {
  return Array.from({ length: count - 1 }, (_, i) => Math.round(((i + 1) * length) / count));
}

const TARGET_CELL = 64;
const SPRING = { stiffness: 300, damping: 40, mass: 0.6 };

interface GridLines {
  columns: number[];
  rows: number[];
}
