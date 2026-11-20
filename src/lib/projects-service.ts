import {
  ProjectData,
  projectsData,
  getProjectBySlugStatic,
  getAllProjectSlugsStatic,
} from "@/data/projects";
import { localProjects, projectExtras } from "@/data/local-projects";
import {
  getProjectsFromNotion,
  getProjectBySlugFromNotion,
  getAllProjectSlugsFromNotion,
  getProjectWithContentFromNotion,
  getFeaturedProjectsFromNotion,
} from "@/lib/notion";

// Check if Notion is configured
const isNotionConfigured = Boolean(
  process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID
);

/*
 * Projects come from Notion when it's configured, otherwise from the static
 * data. Either way, the projects defined in code (src/data/local-projects.ts)
 * are merged in. A local project with a slug the base source also has replaces
 * that entry in place (so a case study can be updated in code); the rest are
 * listed first as the newest work.
 */

function mergeLocal(base: ProjectData[], local: ProjectData[] = localProjects): ProjectData[] {
  const bySlug = new Map(local.map((p) => [p.slug, p]));
  const taken = new Set(base.map((p) => p.slug));
  return [...local.filter((p) => !taken.has(p.slug)), ...base.map((p) => bySlug.get(p.slug) ?? p)];
}

/** Code-side additions (e.g. screenshots) for a project whose main content lives elsewhere. */
function withExtras(project: ProjectData | undefined): ProjectData | undefined {
  const extras = project && projectExtras[project.slug];
  return extras ? { ...project, ...extras } : project;
}

function findLocal(slug: string): ProjectData | undefined {
  return localProjects.find((p) => p.slug === slug);
}

/** Runs the Notion call when configured, falling back to static on failure. */
async function fromSource<T>(notion: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!isNotionConfigured) return fallback();
  try {
    return await notion();
  } catch (error) {
    console.error("Failed to fetch from Notion, falling back to static:", error);
    return fallback();
  }
}

/** Get all projects */
export async function getProjects(): Promise<ProjectData[]> {
  return mergeLocal(await fromSource(getProjectsFromNotion, () => projectsData));
}

/** Get a single project by slug */
export async function getProjectBySlug(slug: string): Promise<ProjectData | undefined> {
  const local = findLocal(slug);
  if (local) return local;
  const base = await fromSource(
    () => getProjectBySlugFromNotion(slug),
    () => getProjectBySlugStatic(slug)
  );
  return withExtras(base ?? findLocal(slug));
}

/** Get all project slugs (for static generation) */
export async function getAllProjectSlugs(): Promise<string[]> {
  const base = await fromSource(getAllProjectSlugsFromNotion, getAllProjectSlugsStatic);
  return Array.from(new Set([...localProjects.map((p) => p.slug), ...base]));
}

/** Get related projects (excluding the current project) */
export async function getRelatedProjects(currentSlug: string, limit: number = 4): Promise<ProjectData[]> {
  return (await getProjects()).filter((p) => p.slug !== currentSlug).slice(0, limit);
}

/**
 * Get a project with its rich content (freeform Notion page content).
 * This fetches both the structured properties AND the page blocks.
 */
export async function getProjectWithContent(slug: string): Promise<ProjectData | undefined> {
  const local = findLocal(slug);
  if (local) return local;
  const base = await fromSource(
    () => getProjectWithContentFromNotion(slug),
    () => getProjectBySlugStatic(slug)
  );
  return withExtras(base ?? findLocal(slug));
}

/** Get featured projects (marked Featured in Notion, or flagged in code) */
export async function getFeaturedProjects(): Promise<ProjectData[]> {
  const base = await fromSource(getFeaturedProjectsFromNotion, () => projectsData.slice(0, 4));
  return mergeLocal(base, localProjects.filter((p) => p.featured));
}
