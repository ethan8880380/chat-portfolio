import { CountUp } from "@/components/home/count-up";

const METRICS = [
  { metric: "1,500+", label: "daily users", note: "Across the enterprise platforms I've designed and built." },
  { metric: "+75%", label: "retention", note: "User retention lift after the Huggies redesign." },
  { metric: "50%", label: "faster dev cycles", note: "From standardized templates + a shared design system." },
  { metric: "2hrs", label: "saved / user / week", note: "On the GDUSA award-winning Analytics Hub (via FullStory)." },
];

/** Outcomes presented as hand-off redlines — the number is the spec. */
export function ImpactRedlines() {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 xl:grid-cols-4">
      {METRICS.map((m, i) => (
        <div key={m.label} data-inspect="Metric" className="flex flex-col bg-background p-6 md:p-8">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            spec · {String(i + 1).padStart(2, "0")}
          </span>
          <div className="mt-8 w-fit">
            <p className="font-display text-[clamp(4rem,9vw,7.5rem)] font-black leading-[0.8] tracking-[-0.02em] wdth-50">
              <CountUp value={m.metric} />
            </p>
            <div className="redline-x mt-4" />
            <p className="mt-2 text-center font-mono text-[11px] text-hot">{m.label}</p>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{m.note}</p>
        </div>
      ))}
    </div>
  );
}
