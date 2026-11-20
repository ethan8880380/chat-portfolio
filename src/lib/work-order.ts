/**
 * Curated order for the work shown on the home page and /work: analytics
 * first, then the Huggies sites, then the design system. Anything not listed
 * follows in its usual order.
 */
export const WORK_ORDER = ["kcna-hub", "iris", "iris-tpo", "huggies", "huggies-2", "design-system"];

export function curate<T extends { slug: string }>(projects: T[]): T[] {
  const rank = (slug: string) => {
    const i = WORK_ORDER.indexOf(slug);
    return i === -1 ? WORK_ORDER.length : i;
  };
  // Array.prototype.sort is stable, so unlisted projects keep their order.
  return [...projects].sort((a, b) => rank(a.slug) - rank(b.slug));
}

/** The home page's selection: every curated project, then anything else marked featured. */
export function homeSelection<T extends { slug: string; featured?: boolean }>(projects: T[]): T[] {
  return curate(projects.filter((p) => WORK_ORDER.includes(p.slug) || p.featured));
}
