import type { ProjectData } from "@/data/projects";
import { localProjects } from "@/data/local-projects";
import { workProjects } from "@/data/work";

/*
 * Every project lives in code: the newest case studies in
 * src/data/local-projects.ts, the rest in src/data/work.ts, in display order.
 * The functions stay async so pages don't care where the data comes from.
 */
const allProjects: ProjectData[] = [...localProjects, ...workProjects];

/** Get all projects */
export async function getProjects(): Promise<ProjectData[]> {
  return allProjects;
}

/** Get a single project by slug */
export async function getProjectBySlug(slug: string): Promise<ProjectData | undefined> {
  return allProjects.find((p) => p.slug === slug);
}

/** Get all project slugs (for static generation) */
export async function getAllProjectSlugs(): Promise<string[]> {
  return allProjects.map((p) => p.slug);
}

/** Get related projects (excluding the current project) */
export async function getRelatedProjects(currentSlug: string, limit: number = 4): Promise<ProjectData[]> {
  return allProjects.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

/** Get a project with its full case study body */
export async function getProjectWithContent(slug: string): Promise<ProjectData | undefined> {
  return getProjectBySlug(slug);
}

/** Get featured projects */
export async function getFeaturedProjects(): Promise<ProjectData[]> {
  return allProjects.filter((p) => p.featured);
}
