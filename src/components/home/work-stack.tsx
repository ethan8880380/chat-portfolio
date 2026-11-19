import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectData } from "@/data/projects";
import { SmartImage } from "@/components/ui/smart-image";

/**
 * Selected work as a deck of frames that stack on top of each other while you
 * scroll — pure CSS sticky positioning, no scroll listeners.
 */
export function WorkStack({ projects }: { projects: ProjectData[] }) {
  return (
    <div className="relative">
      {projects.map((project, i) => (
        <div
          key={project.slug}
          className="sticky pb-[8vh] last:pb-0"
          style={{ top: `calc(4.5rem + ${i * 18}px)` }}
        >
          <Link
            href={`/projects/${project.slug}`}
            data-inspect="ProjectFrame"
            data-inspect-props={`slug="${project.slug}"`}
            className="group block"
          >
            <div className="frame-label mb-2 justify-between">
              <span className="text-sel">
                # {String(i + 1).padStart(2, "0")} — {project.title}
              </span>
              <span className="hidden sm:inline">
                {project.client} · {project.year}
              </span>
            </div>
            <article className="grid overflow-hidden rounded-xl border border-foreground/10 bg-card shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.25)] transition-colors group-hover:border-sel md:grid-cols-[1.45fr_1fr]">
              <div className="relative aspect-[16/10] overflow-hidden border-b bg-muted md:aspect-auto md:min-h-[440px] md:border-b-0 md:border-r">
                <SmartImage
                  src={project.images.hero}
                  alt={project.title}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col p-6 md:p-8">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mt-6 font-display text-[clamp(2rem,4vw,3.6rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.01em] transition-[font-variation-settings] duration-500 wdth-75 group-hover:wdth-100">
                  {project.title}
                </h3>
                <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                  {project.shortDescription}
                </p>
                <dl className="mt-auto grid grid-cols-2 gap-4 border-t pt-5 font-mono text-[11px]">
                  <div>
                    <dt className="uppercase tracking-widest text-muted-foreground">Role</dt>
                    <dd className="mt-1 text-foreground">{project.role.slice(0, 2).join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-widest text-muted-foreground">Stack</dt>
                    <dd className="mt-1 text-foreground">{(project.technologies ?? []).slice(0, 3).join(", ") || "—"}</dd>
                  </div>
                </dl>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                  Open case study
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </article>
          </Link>
        </div>
      ))}
    </div>
  );
}
