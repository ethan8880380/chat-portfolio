"use client";

import { Fade, Hairline, ScrollWords } from "@/components/noir/reveal";

const TEXT =
  "Four years at Kimberly-Clark taught me that the gap between a good design and a shipped one is where most products quietly die. So I work on both sides of it: research, interaction, motion, and the React that makes it real. Platforms 1,500 people use every day. A design system a whole company builds on. An award, a few AI tools, and one app I’m still glad I argued against.";

export function Statement() {
  return (
    <section data-inspect="Statement" className="px-6 pt-48 md:px-12 md:pt-72">
      <Hairline />
      <div className="mt-6 grid gap-10 md:grid-cols-12">
        <Fade className="text-[13px] text-muted-foreground md:col-span-3">
          <p>Approach</p>
        </Fade>
        <div className="md:col-span-9">
          <ScrollWords
            text={TEXT}
            className="font-gserif max-w-[26ch] text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.12] tracking-[-0.025em] md:max-w-none"
          />
          <Fade className="mt-16 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-muted-foreground">
            {["Research", "Interaction", "Motion", "Design systems", "React / Next.js", "Gen AI"].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </Fade>
        </div>
      </div>
    </section>
  );
}
