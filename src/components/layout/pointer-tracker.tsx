"use client";

import { useEffect } from "react";

/** Feeds cursor coordinates to any `.spotlight` element under the pointer. */
export function PointerTracker() {
  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const target = (event.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      target.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return null;
}
