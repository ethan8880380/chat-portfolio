import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectData } from "@/data/projects";
import { WorkList } from "@/components/editorial/work-list";

interface EditorialWorkProps {
  projects: ProjectData[];
}

export function EditorialWork({ projects }: EditorialWorkProps) {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <div className="flex items-center justify-between border-b border-espresso/10 pb-5">
          <p className="font-inter text-xs uppercase tracking-[0.22em] text-espresso/55">
            Selected Work
          </p>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 font-inter text-sm text-espresso/70 transition-colors hover:text-clay"
          >
            All projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <WorkList projects={projects} />
      </div>
    </section>
  );
}
