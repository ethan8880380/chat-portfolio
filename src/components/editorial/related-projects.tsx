import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import type { ProjectData } from "@/data/projects";

export function RelatedProjects({ projects }: { projects: ProjectData[] }) {
  const items = projects.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
      <p className="border-t border-espresso/12 pt-10 font-inter text-xs uppercase tracking-[0.22em] text-espresso/55">
        More work
      </p>
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {items.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <SmartImage
                  src={project.images.hero}
                  alt={project.title}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <h3 className="font-serif text-xl text-espresso transition-colors group-hover:text-clay md:text-2xl">
                  {project.title}
                </h3>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-espresso/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay" />
              </div>
              <p className="mt-1 font-inter text-xs uppercase tracking-[0.15em] text-espresso/45">
                {project.tags?.[0] ?? project.year}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
