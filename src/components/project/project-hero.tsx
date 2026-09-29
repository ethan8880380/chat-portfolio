import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import type { ProjectData } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { GridMarks } from "@/components/layout/grid-marks";
import { SiteGrid } from "@/components/layout/site-section";
import { SpotlightGrid } from "@/components/layout/spotlight-grid";
import { SmartImage } from "@/components/ui/smart-image";

export function ProjectHero({ project }: { project: ProjectData }) {
  const meta = [
    { label: "Year", value: project.year },
    { label: "Client", value: project.client },
    { label: "Role", value: project.role?.join(", ") },
    { label: "Stack", value: project.technologies?.slice(0, 4).join(", ") },
  ].filter((item): item is { label: string; value: string } =>
    Boolean(item.value?.trim())
  );
  const hasLinks = Boolean(project.liveUrl || project.githubUrl);

  return (
    <section className="-mt-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-8 pb-16 pt-32 sm:pt-36 md:px-10 md:pb-20">
        <SpotlightGrid maskClassName="[mask-image:radial-gradient(ellipse_70%_80%_at_100%_0%,black,transparent)]" />
        <div className="relative max-w-4xl">
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border bg-background px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>

          <h1 className="mt-8 text-balance text-[clamp(2.5rem,6.5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-foreground">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.shortDescription}
          </p>

          {hasLinks && (
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {project.liveUrl && (
                <Button asChild size="xl">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit site
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild size="xl" variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github />
                    View code
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-y">
        <div className="relative mx-auto max-w-6xl border-x">
          <GridMarks />
          {meta.length > 0 && (
            <SiteGrid className={META_COLUMNS[meta.length]}>
              {meta.map((item) => (
                <div key={item.label} className="bg-background px-8 py-6 md:px-10">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">{item.value}</p>
                </div>
              ))}
            </SiteGrid>
          )}
          <div className="border-t p-4 md:p-6">
            <div className="relative aspect-video w-full overflow-hidden border bg-muted">
              <SmartImage
                src={project.images.hero}
                alt={project.title}
                priority
                sizes="(max-width: 1152px) 100vw, 1152px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const META_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};
