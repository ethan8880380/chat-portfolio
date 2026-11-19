import type { ProjectData } from "@/data/projects";

/**
 * Everything on /dashboard is derived from real project data (Notion or the
 * static fallback) plus résumé facts — no invented numbers.
 */

export type Discipline = "Design" | "Build" | "Research";
export const DISCIPLINES: Discipline[] = ["Design", "Build", "Research"];

/** Exclusive category per project, so a stacked column is a true part-to-whole. */
export type Mode = "Designed & built" | "Design" | "Research-led";
export const MODES: Mode[] = ["Designed & built", "Design", "Research-led"];

export interface DashProject {
  slug: string;
  title: string;
  client: string;
  year: number | null;
  yearLabel: string;
  type: string;
  summary: string;
  hero: string;
  roles: string[];
  stack: string[];
  disciplines: Discipline[];
  mode: Mode;
  impact: string | null;
  status: "Delivered" | "In pilot" | "Sunset";
  searchText: string;
}

const RX: Record<Discipline, RegExp> = {
  Design: /design|ui\b|ux|prototyp|visual|template|figma|interface|brand/i,
  Build: /develop|engineer|front ?end|full ?stack|code|next\.?js|react|tailwind|supabase|api|build/i,
  Research: /research|user test|interview|usability|testing|maze/i,
};

const IMPACT: [RegExp, string][] = [
  [/analytics.?hub|commercial.?analytics/i, "2 hrs saved / user / wk"],
  [/huggies/i, "+75% retention"],
  [/template/i, "50% faster dev cycles"],
  [/pull.?ups|potty/i, "50+ parents interviewed"],
  [/design.?system/i, "Org-wide standard"],
];

export function toDashProject(p: ProjectData): DashProject {
  const text = [p.title, p.slug, p.shortDescription, ...p.tags, ...p.role, ...(p.technologies ?? [])].join(" ");
  const yearMatch = p.year?.match(/(19|20)\d{2}/g);
  const year = yearMatch ? Number(yearMatch[yearMatch.length - 1]) : null;
  const disciplines = DISCIPLINES.filter((d) => RX[d].test([...p.role, ...p.tags, ...(p.technologies ?? [])].join(" ")));
  const key = `${p.slug} ${p.title}`;

  return {
    slug: p.slug,
    title: p.title,
    client: p.client || "",
    year,
    yearLabel: p.year || "—",
    type: p.tags[0] ?? "Project",
    summary: p.shortDescription,
    hero: p.images.hero,
    roles: p.role,
    stack: p.technologies ?? [],
    disciplines: disciplines.length ? disciplines : ["Design"],
    mode: disciplines.includes("Build")
      ? "Designed & built"
      : disciplines.includes("Research") && !disciplines.includes("Design")
        ? "Research-led"
        : "Design",
    impact: IMPACT.find(([rx]) => rx.test(key))?.[1] ?? null,
    status: /pull.?ups|potty/i.test(key) ? "Sunset" : /buyer/i.test(key) ? "In pilot" : "Delivered",
    searchText: text.toLowerCase(),
  };
}

/** Tools counted by how many projects mention them anywhere in their data. */
export const TOOLS: { name: string; rx: RegExp }[] = [
  { name: "Figma", rx: /figma|figjam/i },
  { name: "React / Next.js", rx: /react|next\.?js/i },
  { name: "Tailwind", rx: /tailwind/i },
  { name: "User research", rx: /research|interview|user test/i },
  { name: "Gen AI", rx: /\bai\b|chatbot|gpt|openai/i },
  { name: "Data viz / PowerBI", rx: /power ?bi|data vis|dashboard|analytics/i },
  { name: "Motion", rx: /framer|motion|animation/i },
];

export function toolCounts(projects: DashProject[]) {
  return TOOLS.map((t) => {
    const hits = projects.filter((p) => t.rx.test(p.searchText));
    return { name: t.name, value: hits.length, projects: hits.map((p) => p.title) };
  })
    .filter((t) => t.value > 0)
    .sort((a, b) => b.value - a.value);
}

export function mixByYear(projects: DashProject[]) {
  const years = Array.from(new Set(projects.map((p) => p.year).filter((y): y is number => y !== null))).sort();
  return years.map((year) => {
    const inYear = projects.filter((p) => p.year === year);
    return {
      year,
      total: inYear.length,
      segments: MODES.map((mode) => ({
        mode,
        titles: inYear.filter((p) => p.mode === mode).map((p) => p.title),
      })),
    };
  });
}

export const CAREER = [
  { label: "BDes, Interaction Design", org: "University of Washington", start: 2018.7, end: 2022.45, current: false },
  { label: "UX Intern", org: "Micro Focus", start: 2019.45, end: 2019.7, current: false },
  { label: "UX Designer & Engineer", org: "Kimberly-Clark", start: 2021.5, end: null, current: true },
  { label: "Freelance design + build", org: "Independent", start: 2024.0, end: null, current: true },
];

export const CAREER_START = new Date("2018-09-25T09:00:00-07:00");
