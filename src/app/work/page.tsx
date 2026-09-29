import type { Metadata } from "next";
import { getProjects } from "@/lib/projects-service";
import { PageHero } from "@/components/layout/page-hero";
import { SiteSection, SiteSpacer } from "@/components/layout/site-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProjectGrid } from "@/components/work/project-grid";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects spanning enterprise UX, design systems, AI tools, and consumer web by Ethan Rogers.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <>
      <main className="flex-1">
        <PageHero
          eyebrow="Work"
          title="Selected work, prototype to production."
          description="A collection of projects spanning enterprise UX, design systems, AI tools, and consumer web — from first sketch to shipped code."
        />
        <SiteSection
          eyebrow={`${String(projects.length).padStart(2, "0")} projects`}
          title="All projects"
        >
          <ProjectGrid projects={projects} showIndex />
        </SiteSection>
        <SiteSpacer />
      </main>
      <SiteFooter />
    </>
  );
}
