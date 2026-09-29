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
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm border bg-muted">
        <SmartImage
          src={project.images.hero}
          alt={project.title}
          sizes={isCompact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
          className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-3 left-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-foreground/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-background opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View case study
          <ArrowUpRight className="size-3" />
        </span>
      </div>

      <div className="mt-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        {index !== undefined && (
          <span className="tabular-nums transition-colors group-hover:text-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span className="size-1.5 rounded-full bg-foreground/30 transition-colors group-hover:bg-foreground" />
        {label && <span className="truncate">{label}</span>}
        <span className="ml-auto tabular-nums">{project.year}</span>
      </div>

      <h3
        className={cn(
          "mt-4 flex items-start justify-between gap-4 font-semibold tracking-tight text-foreground",
          isCompact ? "text-lg" : "text-xl sm:text-2xl"
        )}
      >
        {project.title}
        <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
        </span>
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
