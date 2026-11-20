import type { Metadata } from "next";
import { getProjects } from "@/lib/projects-service";
import { NoirShell } from "@/components/noir/noir-shell";
import { RiseLines } from "@/components/noir/reveal";
import { ProjectGrid } from "@/components/noir/projects";
import { ContactBlock } from "@/components/noir/contact-block";


export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects spanning enterprise UX, design systems, AI tools, and consumer web by Ethan Rogers.",
};

/**
 * Curated order for the work index: analytics first, then the Huggies sites,
 * then the design system. Anything not listed follows in its usual order.
 */
const WORK_ORDER = ["kcna-hub", "iris", "iris-tpo", "huggies", "huggies-2", "design-system"];

function curate<T extends { slug: string }>(projects: T[]): T[] {
  const rank = (slug: string) => {
    const i = WORK_ORDER.indexOf(slug);
    return i === -1 ? WORK_ORDER.length : i;
  };
  // Array.prototype.sort is stable, so unlisted projects keep their order.
  return [...projects].sort((a, b) => rank(a.slug) - rank(b.slug));
}

export default async function WorkPage() {
  const projects = curate(await getProjects());

  return (
    <NoirShell>
      <main>
        <section className="flex min-h-[70svh] flex-col justify-end px-6 md:px-12">
          <RiseLines
            lines={["Work"]}
            delay={0.2}
            className="font-gserif text-[clamp(4.5rem,16vw,15rem)] leading-[0.9] tracking-[-0.05em]"
          />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Enterprise platforms, design systems, AI tools and consumer web. From the first sketch to the last pull
            request.
          </p>
        </section>
        <ProjectGrid projects={projects} />
        <ContactBlock />
      </main>
    </NoirShell>
  );
}
