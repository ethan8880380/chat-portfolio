import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section heading styled like a named frame on a design canvas. */
export function SectionHead({
  index,
  label,
  title,
  aside,
  className,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <header data-inspect="SectionHead" className={cn("mb-10 md:mb-14", className)}>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {index && <span className="text-sel">{index}</span>}
        <span>{label}</span>
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-[16ch] text-balance font-display text-[clamp(2.5rem,7vw,6rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] wdth-75">
          {title}
        </h2>
        {aside && <div className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">{aside}</div>}
      </div>
    </header>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1600px] px-4 sm:px-8", className)}>{children}</div>;
}
