const ITEMS = [
  "Prototyping",
  "Interaction design",
  "Motion",
  "Design systems",
  "Gen AI interfaces",
  "React / Next.js",
  "TypeScript",
  "Figma variables",
  "User research",
  "Data viz",
];

export function SkillTicker() {
  const row = (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 font-display text-2xl font-bold uppercase wdth-125 sm:text-3xl">{item}</span>
          <span className="text-hot">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div
      data-inspect="SkillTicker"
      aria-label={ITEMS.join(", ")}
      className="flex overflow-hidden border-b bg-foreground py-4 text-background"
    >
      <div aria-hidden className="flex w-max animate-marquee [animation-duration:45s] hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
