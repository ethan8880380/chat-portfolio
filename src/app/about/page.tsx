import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import {
  SiteGrid,
  SiteSection,
  SiteSpacer,
  siteCellClassName,
} from "@/components/layout/site-section";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ethan Rogers — a design technologist bridging design and engineering. Based in Seattle, WA.",
};

export default function AboutPage() {
  return (
    <>
      <main className="flex-1">
        <PageHero
          eyebrow="About"
          title="Where design meets engineering."
          description="I'm a design technologist who bridges design and engineering — prototyping and shipping forward-looking experiences from concept to code. 4+ years building enterprise platforms, design systems, and AI tools."
        >
          <Button asChild size="xl">
            <Link href="/work">View my work</Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <a href="/ethan-rogers-resume.pdf" target="_blank" rel="noopener noreferrer">
              Download résumé
            </a>
          </Button>
        </PageHero>

        <SiteSection eyebrow="The story" title="I make things that work beautifully.">
          <SiteGrid className="lg:grid-cols-12">
            <div className={`${siteCellClassName} lg:col-span-5`}>
              <div className="relative aspect-[4/5] overflow-hidden border bg-muted">
                <Image
                  src="/projectImages/about/me.png"
                  alt="Ethan Rogers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className={`${siteCellClassName} justify-center gap-4 text-base leading-relaxed text-muted-foreground lg:col-span-7`}>
              <p>
                Four years ago, I joined Kimberly-Clark with a simple mission:
                make enterprise software that doesn&apos;t make people want to
                throw their laptop out the window. Turns out, that&apos;s harder
                than it sounds &mdash; but also way more rewarding.
              </p>
              <p>
                These days, I split my time between designing analytics
                platforms, building the front-end that powers them, and
                prototyping new interactions, motion, and Gen AI experiences. I
                speak fluent Figma and TypeScript.
              </p>
              <p>
                Graduate of the University of Washington, lifelong Mariners
                optimist, and firmly believe the best interfaces are the ones
                you don&apos;t notice. Go Huskies.
              </p>
            </div>
          </SiteGrid>
        </SiteSection>

        <SiteSection eyebrow="Experience" title="Where I've been">
          <SiteGrid>
            {ROLES.map((item) => (
              <div
                key={item.role}
                className="grid gap-4 bg-background p-8 md:grid-cols-12 md:gap-10 md:p-10"
              >
                <p className="font-mono text-xs tabular-nums text-muted-foreground md:col-span-3">
                  {item.years}
                </p>
                <div className="md:col-span-9">
                  <h3 className="text-base font-medium text-foreground sm:text-lg">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
                  <ul className="mt-5 space-y-2">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/50" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </SiteGrid>
        </SiteSection>

        <SiteSection eyebrow="Skills & tools" title="What I bring to a team">
          <SiteGrid className="md:grid-cols-3">
            {SKILLS.map((col) => (
              <div key={col.group} className={siteCellClassName}>
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {col.group}
                </h3>
                <ul className="mt-6 space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-foreground sm:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </SiteGrid>
        </SiteSection>

        <SiteSection eyebrow="Off the clock" title="A few things about me">
          <SiteGrid className="grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact) => (
              <div key={fact.label} className={siteCellClassName}>
                <p className="text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                  {fact.value}
                </p>
                <h3 className="mt-8 text-sm font-medium text-foreground">
                  {fact.label}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {fact.note}
                </p>
                <div className="relative mt-8 aspect-square overflow-hidden border bg-muted">
                  <Image
                    src={fact.photo.src}
                    alt={fact.photo.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </SiteGrid>
        </SiteSection>
        <SiteSpacer />
      </main>
      <SiteFooter />
    </>
  );
}

const FACTS = [
  {
    label: "Handicap",
    value: "<20",
    note: "I can hit it a long way though",
    photo: { src: "/projectImages/about/golf.png", alt: "Golfing" },
  },
  {
    label: "Team",
    value: "Mariners",
    note: "Pain is temporary",
    photo: { src: "/projectImages/about/baby.png", alt: "Childhood photo at a stadium" },
  },
  {
    label: "Hobby",
    value: "Guitar",
    note: "Campfire certified",
    photo: { src: "/projectImages/about/guitar.png", alt: "Playing guitar" },
  },
  {
    label: "Class of",
    value: "\u201922",
    note: "Go Huskies",
    photo: { src: "/projectImages/about/husky.png", alt: "At a UW Huskies game" },
  },
];

const SKILLS = [
  {
    group: "Design",
    items: [
      "Prototyping",
      "Interaction & Motion",
      "UX / UI Design",
      "User Research",
      "Design Systems",
    ],
  },
  {
    group: "Development",
    items: [
      "React / Next.js",
      "JavaScript / TypeScript",
      "HTML / CSS",
      "Motion / Framer",
      "Responsive Design",
    ],
  },
  {
    group: "Tools",
    items: [
      "Figma",
      "Git / GitHub",
      "OpenAI / Gen AI",
      "PowerBI",
      "Adobe Creative Suite",
    ],
  },
];

const ROLES = [
  {
    years: "2024 — Now",
    role: "Full Stack Designer & Developer",
    org: "Freelance · Seattle, WA",
    highlights: [
      "BuyerSpring — match-first real estate platform",
      "DEFOOR property site (Next.js + Sanity.io)",
      "100+ project portfolio across design & build",
    ],
  },
  {
    years: "2021 — Now",
    role: "UX Designer & Engineer",
    org: "Kimberly-Clark · Remote, WA",
    highlights: [
      "GDUSA award-winning Commercial Analytics Hub",
      "1,500+ daily users; +75% retention on Huggies",
      "Enterprise design system on ShadCN + Tailwind + Figma",
      "50% reduction in dev cycles via standardized templates",
    ],
  },
  {
    years: "Summer 2019",
    role: "UX Intern",
    org: "Micro Focus · Seattle, WA",
    highlights: [
      "Modernized the Reflection Desktop UI",
      "Built a 200+ icon library",
    ],
  },
  {
    years: "2018 — 2022",
    role: "BDes, Interaction Design",
    org: "University of Washington · Seattle, WA",
    highlights: [
      "HCI focus with design research methodologies",
      "Class of '22 — Go Huskies",
    ],
  },
];
