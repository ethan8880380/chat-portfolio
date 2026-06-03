import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SmartImage } from "@/components/ui/smart-image";
import type { ProjectData } from "@/data/projects";

interface WorkGridProps {
  projects: ProjectData[];
}

export function WorkGrid({ projects }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16">
      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={(i % 2) * 0.08}>
          <Link href={`/projects/${project.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-espresso/[0.04]">
              <SmartImage
                src={project.images.hero}
                alt={project.title}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-espresso transition-colors group-hover:text-clay md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-1.5 font-inter text-xs uppercase tracking-[0.15em] text-espresso/45">
                  {project.tags?.[0] ?? project.year}
                </p>
              </div>
              <ArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-espresso/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay" />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
