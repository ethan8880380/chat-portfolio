import type { ReactNode } from "react";
import { GridMarks } from "@/components/layout/grid-marks";
import { Reveal } from "@/components/layout/reveal";
import { cn } from "@/lib/utils";

export function SiteSection({
  id,
  index,
  eyebrow,
  title,
  description,
  action,
  children,
}: SiteSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <SiteSpacer />
      <div className="border-y">
        <div className="relative mx-auto max-w-6xl border-x">
          <GridMarks />
          <header className="flex flex-col gap-8 px-8 py-14 sm:flex-row sm:items-end sm:justify-between md:px-10 md:py-20">
            <Reveal className="max-w-2xl">
              <SectionEyebrow index={index}>{eyebrow}</SectionEyebrow>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tighter text-foreground sm:text-5xl sm:leading-[1.05]">
                {title}
              </h2>
              {description && (
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {description}
                </p>
              )}
            </Reveal>
            {action && (
              <Reveal delay={0.1} className="shrink-0">
                {action}
              </Reveal>
            )}
          </header>
          {children && <div className="border-t">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function SectionEyebrow({
  index,
  className,
  children,
}: {
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground",
        className
      )}
    >
      {index !== undefined ? (
        <span className="tabular-nums text-foreground">
          {String(index).padStart(2, "0")}
        </span>
      ) : (
        <span aria-hidden className="size-1.5 bg-foreground" />
      )}
      <span aria-hidden className="h-px w-6 bg-current opacity-40" />
      {children}
    </p>
  );
}

export function SiteSpacer() {
  return (
    <div aria-hidden className="mx-auto h-16 max-w-6xl border-x md:h-24" />
  );
}

export function SiteGrid({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("grid gap-px bg-border", className)}>{children}</div>
  );
}

export const siteCellClassName =
  "group relative flex flex-col bg-background p-8 md:p-10";

export const siteLinkCellClassName = cn(
  siteCellClassName,
  "spotlight outline-none transition-colors hover:bg-muted/40 focus-visible:bg-muted/40"
);

interface SiteSectionProps {
  id?: string;
  index?: number;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}
