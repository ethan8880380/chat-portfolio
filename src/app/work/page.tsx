import type { Metadata } from "next";
import { getProjects } from "@/lib/projects-service";
import { PageHeader } from "@/components/editorial/page-header";
import { WorkGrid } from "@/components/editorial/work-grid";
import { EditorialFooter } from "@/components/home/editorial-footer";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects spanning enterprise UX, design systems, AI tools, and consumer web by Ethan Rogers.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main className="bg-cream">
      <PageHeader
        eyebrow="Index"
        title={
          <>
            Selected work, <em className="italic text-clay">prototype</em> to{" "}
            <em className="italic text-clay">production</em>.
          </>
        }
        intro="A collection of projects spanning enterprise UX, design systems, AI tools, and consumer web — from first sketch to shipped code."
      />

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <div className="flex items-center justify-between border-b border-espresso/15 pb-5">
          <p className="font-inter text-xs uppercase tracking-[0.22em] text-espresso/55">
            All projects
          </p>
          <p className="font-inter text-xs uppercase tracking-[0.22em] text-espresso/45">
            {String(projects.length).padStart(2, "0")} total
          </p>
        </div>

        <div className="mt-12">
          <WorkGrid projects={projects} />
        </div>
      </section>

      <EditorialFooter />
    </main>
  );
}
