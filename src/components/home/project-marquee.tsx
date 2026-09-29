import Link from "next/link";
import type { ProjectData } from "@/data/projects";
import { SmartImage } from "@/components/ui/smart-image";

export function ProjectMarquee({ projects }: { projects: ProjectData[] }) {
  if (projects.length === 0) return null;

  return (
    <div className="w-full">
      <div className="relative overflow-hidden motion-reduce:overflow-x-auto">
        <ul className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...projects, ...projects].map((project, index) => {
            const isDuplicate = index >= projects.length;
            const meta = [project.client, project.year].filter(Boolean).join(" · ");

            return (
              <li
                key={`${project.slug}-${index}`}
                aria-hidden={isDuplicate || undefined}
                className="border-r"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  tabIndex={isDuplicate ? -1 : undefined}
                  className="group flex w-72 flex-col p-6 text-left transition-colors hover:bg-muted/50 sm:w-80"
                >
                  <div className="relative aspect-video overflow-hidden border bg-muted">
                    <SmartImage
                      src={project.images.hero}
                      alt={isDuplicate ? "" : `${project.title} preview`}
                      sizes="320px"
                      priority={index < 4}
                      className="object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <span className="mt-5 truncate font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {project.tags?.[0] ?? "Project"}
                  </span>
                  <p className="mt-2 truncate text-sm font-medium text-foreground">
                    {project.title}
                  </p>
                  {meta && (
                    <p className="mt-1 truncate text-sm text-muted-foreground">{meta}</p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-y">
        <p className="mx-auto max-w-6xl border-x px-6 py-6 text-center font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Brands, platforms, and clients I&apos;ve designed & built for
        </p>
      </div>
    </div>
  );
}
