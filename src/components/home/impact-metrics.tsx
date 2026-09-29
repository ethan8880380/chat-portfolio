import {
  SiteGrid,
  SiteSection,
  siteCellClassName,
} from "@/components/layout/site-section";
import { CountUp } from "@/components/home/count-up";

export function ImpactMetrics({ index }: { index?: number }) {
  return (
    <SiteSection
      index={index}
      eyebrow="Impact"
      title="Measurable outcomes, not just good-looking screens"
    >
      <SiteGrid className="grid-cols-2 lg:grid-cols-4">
        {METRICS.map((item) => (
          <div key={item.label} className={siteCellClassName}>
            <span aria-hidden className="absolute left-0 top-0 h-px w-0 bg-foreground transition-all duration-500 group-hover:w-full" />
            <p className="text-4xl font-semibold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              <CountUp value={item.metric} />
            </p>
            <h3 className="mt-10 text-sm font-medium text-foreground">
              {item.label}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </SiteGrid>
    </SiteSection>
  );
}

const METRICS = [
  {
    metric: "1,500+",
    label: "Daily users",
    description: "Across the enterprise platforms I've designed and built",
  },
  {
    metric: "+75%",
    label: "Retention",
    description: "User retention lift on the Huggies redesign",
  },
  {
    metric: "50%",
    label: "Faster dev cycles",
    description: "Through standardized templates and a shared design system",
  },
  {
    metric: "4+",
    label: "Years shipping",
    description: "Enterprise platforms, design systems, and AI tools",
  },
];
