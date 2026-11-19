"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarRange,
  Frame,
  GitCommitHorizontal,
  LayoutGrid,
  ScanLine,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ChatPanel } from "@/components/chat/chat-panel";
import { CountUp } from "@/components/home/count-up";
import { useStudio } from "@/components/studio/studio-provider";
import { CAREER, CAREER_START, DISCIPLINES, toolCounts, type DashProject, type Discipline } from "@/lib/dashboard-data";
import { CoverageRings, DotTimeline, HBars } from "@/components/dashboard/charts";
import { ProjectDrawer, ProjectList } from "@/components/dashboard/project-table";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "projects", label: "Projects", icon: BriefcaseBusiness },
  { id: "career", label: "Career", icon: CalendarRange },
  { id: "incidents", label: "Incidents", icon: AlertTriangle },
  { id: "changelog", label: "Changelog", icon: GitCommitHorizontal },
];

const RANGES = [
  { label: "All time", from: 0 },
  { label: "2022+", from: 2022 },
  { label: "2024+", from: 2024 },
];

const KPIS = [
  { value: "1,500+", label: "Daily users", note: "Across enterprise platforms I designed and built" },
  { value: "+75%", label: "Retention lift", note: "Huggies.com redesign" },
  { value: "50%", label: "Faster dev cycles", note: "Standardized templates + design system" },
  { value: "2 hrs", label: "Saved per user, weekly", note: "Analytics Hub, measured in FullStory" },
];

/* ------------------------------------------------------------------ */

function useNow(intervalMs: number) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}

function uptime(now: Date) {
  let s = Math.floor((now.getTime() - CAREER_START.getTime()) / 1000);
  const y = Math.floor(s / (365.25 * 86400));
  s -= Math.floor(y * 365.25 * 86400);
  const d = Math.floor(s / 86400);
  s -= d * 86400;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${y}y ${d}d ${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

function Widget({
  id,
  title,
  description,
  action,
  children,
  className,
}: {
  id?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      data-inspect="Widget"
      data-inspect-props={title ? `title="${title}"` : undefined}
      className={cn("min-w-0 scroll-mt-6 rounded-3xl border bg-card p-5 sm:p-6", className)}
    >
      {(title || action) && (
        <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-sm font-medium text-foreground">{title}</h2>}
            {description && <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */

export function DashboardShell({ projects }: { projects: DashProject[] }) {
  const { setCommandOpen, toggleInspect, inspect } = useStudio();
  const [range, setRange] = useState(RANGES[0]);
  const [copilot, setCopilot] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [active, setActive] = useState("overview");
  const now = useNow(1000);

  // Portalled UI (sheets) lives outside .dash, so theme <html> too.
  useEffect(() => {
    document.documentElement.dataset.dash = "";
    return () => {
      delete document.documentElement.dataset.dash;
    };
  }, []);

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const hasYears = projects.filter((p) => p.year !== null).length >= Math.max(2, projects.length / 2);
  const inRange = useMemo(
    () => projects.filter((p) => range.from === 0 || (p.year !== null && p.year >= range.from)),
    [projects, range]
  );
  const tools = useMemo(() => toolCounts(inRange), [inRange]);
  const disciplineCounts = useMemo(
    () =>
      Object.fromEntries(DISCIPLINES.map((d) => [d, inRange.filter((p) => p.disciplines.includes(d)).length])) as Record<
        Discipline,
        number
      >,
    [inRange]
  );

  const openProject = projects.find((p) => p.slug === openSlug) ?? null;
  const nowYear = now ? now.getFullYear() + now.getMonth() / 12 : 2026.9;
  const clock = now
    ? new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", hour: "2-digit", minute: "2-digit", hour12: false }).format(now)
    : "--:--";
  const dateStr = now
    ? new Intl.DateTimeFormat("en-US", { timeZone: "America/Los_Angeles", weekday: "long", month: "long", day: "numeric" }).format(now)
    : "";

  return (
    <div className="dash min-h-svh bg-background text-foreground">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r bg-background px-4 py-6 lg:flex">
        <div className="px-2">
          <p className="font-gserif text-xl leading-none">Ethan Rogers</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-[var(--signal)]" />
            Portfolio dashboard
          </p>
        </div>

        <nav aria-label="Dashboard" className="mt-10 flex-1 space-y-0.5">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={cn(
                "flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition-colors",
                active === n.id ? "bg-foreground/[0.08] text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <n.icon className="size-4" />
              {n.label}
            </a>
          ))}
          <div className="!my-5 mx-2.5 border-t" />
          <Link href="/fig" className="flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground">
            <Frame className="size-4" /> Design file view
          </Link>
          <button
            type="button"
            onClick={toggleInspect}
            className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ScanLine className="size-4" /> {inspect ? "Exit inspect" : "Inspect"}
            <kbd className="ml-auto font-mono text-[10px]">I</kbd>
          </button>
        </nav>

        <div className="rounded-2xl border bg-card p-4">
          <p className="text-sm font-medium">Upgrade to Ethan Pro</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">A full-time designer who also ships the code.</p>
          <Link
            href="/contact"
            className="mt-3 flex h-9 items-center justify-center rounded-full bg-[var(--signal)] text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Hire Ethan
          </Link>
        </div>
      </aside>

      <div className="pb-28 lg:pb-0 lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-3 px-4 md:px-8">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="flex h-9 w-full max-w-sm items-center gap-2.5 rounded-full border bg-card px-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Search className="size-3.5" />
              <span className="flex-1 truncate text-left">Search or ask anything</span>
              <kbd className="hidden font-mono text-[10px] sm:inline">⌘K</kbd>
            </button>
            {hasYears && (
              <div role="radiogroup" aria-label="Date range" className="ml-auto hidden h-9 rounded-full border p-0.5 sm:flex">
                {RANGES.map((r) => (
                  <button
                    key={r.label}
                    type="button"
                    role="radio"
                    aria-checked={range.label === r.label}
                    onClick={() => setRange(r)}
                    className={cn(
                      "rounded-full px-3 text-xs transition-colors",
                      range.label === r.label ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => setCopilot(true)}
              className={cn(
                "flex h-9 shrink-0 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background",
                !hasYears && "ml-auto"
              )}
            >
              <Sparkles className="size-3.5" />
              <span className="hidden sm:inline">Ask Copilot</span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1280px] px-4 py-8 md:px-8 md:py-12">
          <div id="overview" className="grid scroll-mt-24 grid-cols-1 gap-4 xl:grid-cols-12">
            {/* Hero */}
            <Widget className="flex flex-col justify-between gap-10 p-8 xl:col-span-8">
              <div>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="relative flex size-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/50" />
                    <span className="relative size-2 rounded-full bg-emerald-400" />
                  </span>
                  Open to new roles
                </p>
                <h1 className="font-gserif mt-6 text-[clamp(2.75rem,6vw,4.75rem)] leading-[1] tracking-[-0.03em]">
                  Designs in Figma.
                  <br />
                  <span className="text-muted-foreground">Ships in React.</span>
                </h1>
                <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
                  I&apos;m Ethan Rogers, a design technologist and UX engineer. Four years building enterprise
                  platforms, design systems and Gen AI tools at Kimberly-Clark, from first sketch to production.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="flex h-11 items-center rounded-full bg-[var(--signal)] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Hire Ethan
                </Link>
                <a
                  href="/ethan-rogers-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center gap-1.5 rounded-full border px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/[0.05]"
                >
                  Résumé <ArrowUpRight className="size-4 text-muted-foreground" />
                </a>
              </div>
            </Widget>

            {/* Clock */}
            <Widget className="flex flex-col p-8 xl:col-span-4">
              <p className="text-sm text-muted-foreground">Seattle, WA</p>
              <p className="font-pixel mt-4 text-[clamp(3.5rem,7vw,5rem)] leading-none tabular-nums" suppressHydrationWarning>
                {clock}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{dateStr}</p>
              <div className="mt-auto border-t pt-5">
                <p className="text-xs text-muted-foreground">Career uptime, since fall 2018</p>
                <p className="mt-1 font-mono text-sm tabular-nums text-foreground">{now ? uptime(now) : "—"}</p>
              </div>
            </Widget>

            {/* Impact */}
            <Widget title="Impact" description="Outcomes from shipped work" className="xl:col-span-12">
              <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-border">
                {KPIS.map((k, i) => (
                  <div key={k.label} data-inspect="Stat" className={cn("pr-6", i > 0 && "lg:pl-6")}>
                    <p className="text-sm text-muted-foreground">{k.label}</p>
                    <p className="font-gserif mt-3 text-[clamp(2.5rem,4vw,3.25rem)] leading-none tracking-tight tabular-nums">
                      <CountUp value={k.value} />
                    </p>
                    <p className="mt-3 max-w-[26ch] text-xs leading-relaxed text-muted-foreground">{k.note}</p>
                  </div>
                ))}
              </div>
            </Widget>

            {/* Coverage */}
            <Widget title="Coverage" description="How far I took each project" className="xl:col-span-4">
              <CoverageRings total={inRange.length} counts={disciplineCounts} />
            </Widget>

            {/* Career */}
            <Widget
              id="career"
              title="Career"
              description="One dot per quarter"
              action={
                <span className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[var(--dot-on)]" /> Past
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[var(--signal)]" /> Current
                  </span>
                </span>
              }
              className="xl:col-span-8"
            >
              <DotTimeline spans={CAREER} now={nowYear} />
            </Widget>

            {/* Projects */}
            <Widget id="projects" title="Projects" description={`${inRange.length} case studies`} className="xl:col-span-8">
              <ProjectList projects={inRange} onOpen={setOpenSlug} />
            </Widget>

            {/* Tools */}
            <Widget title="Tools" description="Projects that use each" className="xl:col-span-4">
              <HBars data={tools} max={inRange.length} />
            </Widget>

            {/* Incident */}
            <Widget
              id="incidents"
              title="Incident report"
              description="INC-2023-007 · Resolved"
              action={<AlertTriangle className="size-4 text-[var(--signal)]" aria-label="Incident" />}
              className="xl:col-span-8"
            >
              <h3 className="font-gserif max-w-[22ch] text-3xl leading-tight tracking-tight">
                A $100K app shipped against the research.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">It was delisted two years later. A blameless, but honest, postmortem.</p>
              <ol className="mt-8 space-y-4 border-l pl-5 text-sm">
                {[
                  ["Kickoff", "Pull-Ups asked for an app that solves a real potty-training problem. We went research-first."],
                  ["Research", "Interviewed 50+ parents. The real pain was accidents during screen time, not progress tracking."],
                  ["Detected", "The brand had already spent $100K on an unvalidated, pre-drawn tracker app."],
                  ["Mitigation", "Prototyped a video player that pauses for potty reminders. Parents loved it. The brand's concept tested as “I don't have time for this.”"],
                  ["Outcome", "The original shipped anyway and our team was removed. It launched a year later and was delisted the year after."],
                ].map(([k, v], i, arr) => (
                  <li key={k} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[24.5px] top-1.5 size-2 rounded-full ring-4 ring-card",
                        i === arr.length - 1 ? "bg-[var(--signal)]" : "bg-[var(--dot-mid)]"
                      )}
                    />
                    <span className="text-foreground">{k}.</span> <span className="text-muted-foreground">{v}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 rounded-2xl bg-foreground/[0.04] p-5 text-sm">
                <p className="font-medium text-foreground">What I do differently now</p>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">
                  Get research in front of decision-makers before the budget is spent, and bring prototypes, not decks.
                </p>
              </div>
            </Widget>

            {/* Changelog */}
            <Widget id="changelog" title="Changelog" className="xl:col-span-4">
              <ul className="space-y-5 text-sm">
                {[
                  ["v5.1", "Now", "Shipped this dashboard."],
                  ["v5.0", "2026", "Rebuilt the portfolio as an open design file."],
                  ["v4.0", "2024", "Went independent on the side: BuyerSpring and DEFOOR."],
                  ["v3.2", "2023", "Analytics Hub wins a GDUSA award. GenFEI ships."],
                  ["v3.0", "2021", "Joined Kimberly-Clark. Taught myself React to ship my designs."],
                  ["v1.0", "2018", "Initial commit: Interaction Design at UW."],
                ].map(([v, when, what], i) => (
                  <li key={v} className="grid grid-cols-[44px_1fr] gap-3">
                    <span className={cn("font-mono text-xs leading-5", i === 0 ? "text-[var(--signal)]" : "text-muted-foreground")}>{v}</span>
                    <span>
                      <span className="text-foreground/90">{what}</span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{when}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Widget>
          </div>

          <footer className="mt-10 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <p>© {now?.getFullYear() ?? ""} Ethan Rogers</p>
            <Link href="/fig" className="hover:text-foreground">
              Switch to design file view →
            </Link>
          </footer>
        </main>
      </div>

      {/* Mobile floating nav */}
      <nav
        aria-label="Dashboard"
        className="fixed inset-x-0 bottom-4 z-30 mx-auto flex w-fit items-center gap-1 rounded-full border bg-card/95 p-1.5 shadow-2xl backdrop-blur lg:hidden"
      >
        {NAV.slice(0, 4).map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            aria-label={n.label}
            className={cn(
              "flex size-10 items-center justify-center rounded-full transition-colors",
              active === n.id ? "bg-foreground text-background" : "text-muted-foreground"
            )}
          >
            <n.icon className="size-4" />
          </a>
        ))}
        <Link href="/contact" className="ml-1 flex h-10 items-center rounded-full bg-[var(--signal)] px-4 text-sm font-medium text-white">
          Hire
        </Link>
      </nav>

      <ProjectDrawer project={openProject} onClose={() => setOpenSlug(null)} />

      {/* Copilot */}
      <Sheet open={copilot} onOpenChange={setCopilot}>
        <SheetContent side="right" className="flex w-full flex-col gap-0 border-l bg-background p-0 sm:max-w-md [&>button]:hidden">
          <div className="flex h-16 items-center justify-between border-b px-5">
            <SheetTitle className="flex items-center gap-2 text-sm font-medium">
              <Sparkles className="size-4" /> Copilot
            </SheetTitle>
            <button
              type="button"
              onClick={() => setCopilot(false)}
              aria-label="Close copilot"
              className="flex size-8 items-center justify-center rounded-full hover:bg-foreground/[0.06]"
            >
              <X className="size-4" />
            </button>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <ChatPanel />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
