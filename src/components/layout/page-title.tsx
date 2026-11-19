import type { ReactNode } from "react";
import { Container } from "@/components/layout/section-head";

/** Oversized page title that "squeezes" into place on load (variable wdth axis). */
export function PageTitle({
  frame,
  title,
  count,
  intro,
  children,
}: {
  frame: string;
  title: string;
  count?: number;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section data-inspect="PageTitle" className="border-b bg-canvas">
      <Container className="pb-10 pt-10 md:pb-14 md:pt-14">
        <p className="frame-label">
          <span className="text-sel"># {frame}</span>
        </p>
        <h1 className="mt-4 flex items-start font-display text-[clamp(4.5rem,19vw,17rem)] font-black uppercase leading-[0.78] tracking-[-0.03em]">
          <span className="animate-squeeze">{title}</span>
          {typeof count === "number" && (
            <sup className="ml-2 mt-[0.12em] font-mono text-[clamp(0.9rem,2vw,1.5rem)] font-normal tracking-normal text-hot">
              ({String(count).padStart(2, "0")})
            </sup>
          )}
        </h1>
        {(intro || children) && (
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {intro && (
              <p className="max-w-[46ch] text-lg leading-snug text-muted-foreground md:text-xl">{intro}</p>
            )}
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
