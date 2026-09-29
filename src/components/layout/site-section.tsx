import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SiteSection({
  id,
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
        <div className="mx-auto max-w-6xl border-x">
          <header className="flex flex-col gap-8 px-8 py-14 sm:flex-row sm:items-end sm:justify-between md:px-10 md:py-20">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl">
                {title}
              </h2>
              {description && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {description}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </header>
          {children && <div className="border-t">{children}</div>}
        </div>
      </div>
    </section>
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
  "outline-none transition-colors hover:bg-muted/50 focus-visible:bg-muted/50"
);

interface SiteSectionProps {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
}
