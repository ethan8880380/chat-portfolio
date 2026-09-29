import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectData } from "@/data/projects";
import {
  SiteGrid,
  siteCellClassName,
  siteLinkCellClassName,
} from "@/components/layout/site-section";
import { SmartImage } from "@/components/ui/smart-image";
import { cn } from "@/lib/utils";

export function ProjectGrid({
  projects,
  columns = 2,
  showIndex = false,
}: ProjectGridProps) {
  const fillerCount = (columns - (projects.length % columns)) % columns;

  return (
    <SiteGrid className={COLUMN_CLASS[columns]}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={showIndex ? index : undefined}
          isCompact={columns === 3}
        />
      ))}
      {Array.from({ length: fillerCount }, (_, i) => (
        <div
          key={`filler-${i}`}
          aria-hidden
          className={cn(siteCellClassName, "hidden md:flex")}
        />
      ))}
    </SiteGrid>
  );
}

function ProjectCard({
  project,
  index,
  isCompact,
}: {
  project: ProjectData;
  index?: number;
  isCompact: boolean;
}) {
  const label = project.tags?.[0] ?? project.client;

  return (
    <Link href={`/projects/${project.slug}`} className={siteLinkCellClassName}>
      <div className="relative aspect-[16/10] overflow-hidden border bg-muted">
        <SmartImage
          src={project.images.hero}
          alt={project.title}
          sizes={isCompact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
          className="transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        {index !== undefined && (
          <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        )}
        <span className="size-1.5 rounded-full bg-foreground/40 transition-colors group-hover:bg-foreground" />
        {label && <span className="truncate">{label}</span>}
        <span className="ml-auto tabular-nums">{project.year}</span>
      </div>

      <h3 className="mt-4 flex items-start justify-between gap-4 text-base font-medium text-foreground sm:text-lg">
        {project.title}
        <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </h3>
      {!isCompact && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.shortDescription}
        </p>
      )}
    </Link>
  );
}

const COLUMN_CLASS = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
} as const;

interface ProjectGridProps {
  projects: ProjectData[];
  columns?: keyof typeof COLUMN_CLASS;
  showIndex?: boolean;
}
