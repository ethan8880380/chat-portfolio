"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface StudioContextValue {
  /** Blueprint / Inspect mode — the whole site shows its own redlines. */
  inspect: boolean;
  setInspect: (on: boolean) => void;
  toggleInspect: () => void;
  /** ⌘K command palette */
  commandOpen: boolean;
  setCommandOpen: (open: boolean) => void;
}

const StudioContext = createContext<StudioContextValue | null>(null);

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

export function StudioProvider({ children }: { children: ReactNode }) {
  const [inspect, setInspect] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const toggleInspect = useCallback(() => setInspect((v) => !v), []);

  useEffect(() => {
    const root = document.documentElement;
    if (inspect) root.dataset.inspect = "on";
    else delete root.dataset.inspect;
  }, [inspect]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return;
      if (e.key.toLowerCase() === "i") {
        e.preventDefault();
        setInspect((v) => !v);
      } else if (e.key === "Escape") {
        setInspect(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({ inspect, setInspect, toggleInspect, commandOpen, setCommandOpen }),
    [inspect, toggleInspect, commandOpen]
  );

  return <StudioContext.Provider value={value}>{children}</StudioContext.Provider>;
}

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) throw new Error("useStudio must be used inside <StudioProvider>");
  return ctx;
}
