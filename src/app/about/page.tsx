import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/editorial/page-header";
import { Reveal } from "@/components/ui/reveal";
import { editorialButton } from "@/components/editorial/editorial-button";
import { EditorialFooter } from "@/components/home/editorial-footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ethan Rogers — a design technologist bridging design and engineering. Based in Seattle, WA.",
};

const FACTS = [
  { label: "Handicap", value: "<20", note: "I can hit it a long way though" },
  { label: "Team", value: "Mariners", note: "Pain is temporary" },
  { label: "Hobby", value: "Guitar", note: "Campfire certified" },
  { label: "Class of", value: "\u201922", note: "Go Huskies" },
];

const PHOTOS = [
  { src: "/projectImages/about/baby.png", alt: "Baby photo" },
  { src: "/projectImages/about/guitar.png", alt: "Playing guitar" },
  { src: "/projectImages/about/golf.png", alt: "Golfing" },
  { src: "/projectImages/about/husky.png", alt: "UW Husky" },
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

export default function AboutPage() {
  return (
    <main className="bg-cream">
      <PageHeader
        eyebrow="About — Ethan Rogers"
        title={
          <>
            Where design meets{" "}
            <em className="italic text-clay">engineering</em>.
          </>
        }
        intro="I'm a design technologist who bridges design and engineering — prototyping and shipping forward-looking experiences from concept to code. 4+ years building enterprise platforms, design systems, and AI tools."
      />

      {/* Profile + bio */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10 md:pb-28">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[14px]">
              <Image
                src="/projectImages/about/me.png"
                alt="Ethan Rogers"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center lg:col-span-7">
            <p className="font-inter text-xs uppercase tracking-[0.22em] text-clay">
              The Story
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-[1.1] text-espresso md:text-4xl">
              I make things that work beautifully.
            </h2>
            <div className="mt-6 space-y-4 font-inter text-lg leading-relaxed text-espresso/70">
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
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/work" className={editorialButton({ variant: "solid" })}>
                View my work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="/ethan-rogers-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={editorialButton({ variant: "outline" })}
              >
                Download résumé
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Off the clock */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10 md:pb-28">
        <Reveal>
          <p className="border-t border-espresso/12 pt-10 font-inter text-xs uppercase tracking-[0.22em] text-espresso/55">
            Off the Clock
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <p className="font-inter text-xs uppercase tracking-[0.18em] text-espresso/45">
                  {fact.label}
                </p>
                <p className="mt-3 font-serif text-4xl leading-none text-espresso md:text-5xl">
                  {fact.value}
                </p>
                <p className="mt-3 font-inter text-sm text-espresso/55">
                  {fact.note}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {PHOTOS.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 0.06}>
              <div className="group relative aspect-square overflow-hidden rounded-[12px]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10 md:pb-28">
        <Reveal>
          <p className="border-t border-espresso/12 pt-10 font-inter text-xs uppercase tracking-[0.22em] text-espresso/55">
            Skills &amp; Tools
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
          {SKILLS.map((col, i) => (
            <Reveal key={col.group} delay={i * 0.08}>
              <h3 className="font-serif text-2xl text-espresso">{col.group}</h3>
              <ul className="mt-5 space-y-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 font-inter text-base text-espresso/70"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-clay"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <Reveal>
          <p className="border-t border-espresso/12 pt-10 font-inter text-xs uppercase tracking-[0.22em] text-espresso/55">
            Experience
          </p>
        </Reveal>
        <div className="mt-6">
          {ROLES.map((item, i) => (
            <Reveal key={item.role} delay={i * 0.06}>
              <div className="grid grid-cols-1 gap-4 border-b border-espresso/12 py-8 md:grid-cols-12 md:gap-10 md:py-10">
                <div className="md:col-span-3">
                  <span className="font-inter text-sm text-espresso/55">
                    {item.years}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif text-2xl text-espresso md:text-3xl">
                    {item.role}
                  </h3>
                  <p className="mt-1.5 font-inter text-sm text-espresso/55">
                    {item.org}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-3 font-inter text-base text-espresso/70"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay"
                          aria-hidden
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <EditorialFooter />
    </main>
  );
}
