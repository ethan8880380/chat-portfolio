import {
  ProjectData,
  projectsData,
  getProjectBySlugStatic,
  getAllProjectSlugsStatic,
  getRelatedProjectsStatic,
} from "@/data/projects";
import {
  getProjectsFromNotion,
  getProjectBySlugFromNotion,
  getAllProjectSlugsFromNotion,
  getRelatedProjectsFromNotion,
  getProjectWithContentFromNotion,
  getFeaturedProjectsFromNotion,
} from "@/lib/notion";

// Check if Notion is configured
const isNotionConfigured = Boolean(
  process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID
);

/**
 * Get all projects - fetches from Notion if configured, otherwise uses static data
 */
export async function getProjects(): Promise<ProjectData[]> {
  if (isNotionConfigured) {
    try {
      const projects = await getProjectsFromNotion();
      return projects;
    } catch (error) {
      console.error("Failed to fetch from Notion, falling back to static:", error);
      return projectsData;
    }
  }
  return projectsData;
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<ProjectData | undefined> {
  if (isNotionConfigured) {
    try {
      const project = await getProjectBySlugFromNotion(slug);
      return project;
    } catch (error) {
      console.error("Failed to fetch from Notion, falling back to static:", error);
      return getProjectBySlugStatic(slug);
    }
  }
  return getProjectBySlugStatic(slug);
}

/**
 * Get all project slugs (for static generation)
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  if (isNotionConfigured) {
    try {
      const slugs = await getAllProjectSlugsFromNotion();
      return slugs;
    } catch (error) {
      console.error("Failed to fetch from Notion, falling back to static:", error);
      return getAllProjectSlugsStatic();
    }
  }
  return getAllProjectSlugsStatic();
}

/**
 * Get related projects (excluding current project)
 */
export async function getRelatedProjects(
  currentSlug: string,
  limit: number = 4
): Promise<ProjectData[]> {
  if (isNotionConfigured) {
    try {
      const projects = await getRelatedProjectsFromNotion(currentSlug, limit);
      return projects;
    } catch (error) {
      console.error("Failed to fetch from Notion, falling back to static:", error);
      return getRelatedProjectsStatic(currentSlug, limit);
    }
  }
  return getRelatedProjectsStatic(currentSlug, limit);
}

/**
 * Get a project with its rich content (freeform Notion page content)
 * This fetches both the structured properties AND the page blocks
 */
export async function getProjectWithContent(slug: string): Promise<ProjectData | undefined> {
  if (isNotionConfigured) {
    try {
      const project = await getProjectWithContentFromNotion(slug);
      return project;
    } catch (error) {
      console.error("Failed to fetch from Notion, falling back to static:", error);
      return getProjectBySlugStatic(slug);
    }
  }
  return getProjectBySlugStatic(slug);
}

/**
 * Get featured projects only (marked as Featured in Notion)
 */
export async function getFeaturedProjects(): Promise<ProjectData[]> {
  if (isNotionConfigured) {
    try {
      const projects = await getFeaturedProjectsFromNotion();
      return projects;
    } catch (error) {
      console.error("Failed to fetch from Notion, falling back to static:", error);
      // Fallback: return first 4 projects as "featured"
      return projectsData.slice(0, 4);
    }
  }
  // Static fallback: return first 4 projects
  return projectsData.slice(0, 4);
}
