import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  footer,
}: PageHeroProps) {
  return (
    <section className="-mt-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-8 pb-16 pt-36 sm:pt-40 md:px-10 md:pb-20">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_80%_at_0%_100%,black,transparent)]"
        />
        <div className="relative max-w-3xl">
          <p className="inline-flex rounded-full border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tighter text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {children}
            </div>
          )}
        </div>
      </div>
      {footer && (
        <div className="border-y">
          <div className="mx-auto max-w-6xl border-x">{footer}</div>
        </div>
      )}
    </section>
  );
}

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}
