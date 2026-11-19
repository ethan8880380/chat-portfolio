import type { Metadata } from "next";
import Image from "next/image";
import { NoirShell } from "@/components/noir/noir-shell";
import { Fade, RiseLines } from "@/components/noir/reveal";
import { ContactBlock } from "@/components/noir/contact-block";

export const metadata: Metadata = {
  title: "About",
  description: "Ethan Rogers — a design technologist bridging design and engineering. Based in Seattle, WA.",
};

const ROLES = [
  { years: "2024 — Now", role: "Design & build, independent", org: "BuyerSpring, DEFOOR" },
  { years: "2021 — Now", role: "UX designer & engineer", org: "Kimberly-Clark" },
  { years: "2019", role: "UX intern", org: "Micro Focus" },
  { years: "2018 — 2022", role: "BDes, Interaction Design", org: "University of Washington" },
];

const TOOLS = [
  "Figma & variables",
  "Prototyping",
  "User research",
  "Motion",
  "React / Next.js",
  "TypeScript",
  "Tailwind",
  "Gen AI",
];

export default function AboutPage() {
  return (
    <NoirShell>
      <main>
        <section className="flex min-h-svh flex-col justify-end px-6 pb-16 md:px-12">
          <RiseLines
            lines={["Hello.", "I’m Ethan."]}
            delay={0.25}
            className="font-gserif text-[clamp(4rem,13vw,13rem)] leading-[0.9] tracking-[-0.05em]"
            mutedLines={[1]}
          />
        </section>

        <section className="grid gap-16 px-6 pt-24 md:grid-cols-12 md:px-12 md:pt-40">
          <Fade className="md:col-span-4">
            <div className="group relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-card">
              <Image
                src="/projectImages/about/me.png"
                alt="Ethan Rogers"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover grayscale transition-[filter] duration-1000 group-hover:grayscale-0"
                priority
              />
            </div>
          </Fade>
          <div className="md:col-span-7 md:col-start-6">
            <Fade>
              <p className="font-gserif text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.15] tracking-[-0.025em]">
                I joined Kimberly-Clark with a simple mission: make enterprise software that doesn’t make people want
                to throw their laptop out the window.
              </p>
            </Fade>
            <Fade className="mt-10 space-y-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              <p>
                When there was no budget for a developer, I taught myself React, Next.js and OKTA so the thing I designed
                could actually ship. It won a GDUSA award, and I’ve worked both sides of the handoff ever since.
              </p>
              <p>
                Today I design analytics platforms, build the front-end that powers them, and prototype new interaction,
                motion and Gen AI ideas. I believe the best interfaces are the ones you don’t notice.
              </p>
            </Fade>
          </div>
        </section>

        <section className="grid gap-10 px-6 pt-48 md:grid-cols-12 md:px-12 md:pt-64">
          <Fade className="text-[13px] text-muted-foreground md:col-span-3">
            <p>Experience</p>
          </Fade>
          <ul className="border-t md:col-span-9">
            {ROLES.map((r) => (
              <li key={r.role} className="grid gap-1 border-b py-6 sm:grid-cols-[10rem_1fr_auto] sm:items-baseline sm:gap-6">
                <span className="text-[13px] tabular-nums text-muted-foreground">{r.years}</span>
                <span className="font-gserif text-2xl tracking-tight md:text-3xl">{r.role}</span>
                <span className="text-[13px] text-muted-foreground">{r.org}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-10 px-6 pt-32 md:grid-cols-12 md:px-12 md:pt-48">
          <Fade className="text-[13px] text-muted-foreground md:col-span-3">
            <p>Toolkit</p>
          </Fade>
          <Fade className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-foreground/80 md:col-span-9">
            {TOOLS.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </Fade>
        </section>

        <section className="grid gap-10 px-6 pt-32 md:grid-cols-12 md:px-12 md:pt-48">
          <Fade className="text-[13px] text-muted-foreground md:col-span-3">
            <p>Off the clock</p>
          </Fade>
          <Fade className="md:col-span-9">
            <p className="font-gserif max-w-[30ch] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] tracking-[-0.02em] text-muted-foreground">
              Golf <span className="text-foreground">(under 20, but long)</span>. The Mariners{" "}
              <span className="text-foreground">(pain is temporary)</span>. Guitar{" "}
              <span className="text-foreground">(campfire certified)</span>. Huskies, class of ’22.
            </p>
          </Fade>
        </section>

        <ContactBlock />
      </main>
    </NoirShell>
  );
}
