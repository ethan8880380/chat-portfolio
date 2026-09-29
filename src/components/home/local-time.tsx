"use client";

import { useEffect, useState } from "react";

export function LocalTime({ timeZone = "America/Los_Angeles" }: { timeZone?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = window.setInterval(tick, 15_000);
    return () => window.clearInterval(interval);
  }, [timeZone]);

  return <time className="tabular-nums">{time ?? "--:-- PT"}</time>;
}
