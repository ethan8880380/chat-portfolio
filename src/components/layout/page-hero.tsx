import type { ReactNode } from "react";
import { GridMarks } from "@/components/layout/grid-marks";
import { Reveal } from "@/components/layout/reveal";
import { SectionEyebrow } from "@/components/layout/site-section";
import { SpotlightGrid } from "@/components/layout/spotlight-grid";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  footer,
}: PageHeroProps) {
  return (
    <section className="-mt-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-8 pb-16 pt-36 sm:pt-44 md:px-10 md:pb-20">
        <SpotlightGrid maskClassName="[mask-image:radial-gradient(ellipse_70%_80%_at_100%_0%,black,transparent)]" />
        <Reveal className="relative max-w-4xl">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h1 className="mt-8 text-balance text-[clamp(2.5rem,6.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground">
            {title}
          </h1>
          {description && (
            <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {children}
            </div>
          )}
        </Reveal>
      </div>
      {footer && (
        <div className="border-y">
          <div className="relative mx-auto max-w-6xl border-x">
            <GridMarks edges="top" />
            {footer}
          </div>
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
