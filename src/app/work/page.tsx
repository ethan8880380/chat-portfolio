import { getProjects } from "@/lib/projects-service";
import { StaticHeader } from "@/components/sections/static-header";
import { WorkProjects } from "@/components/sections/work-projects";
import { CtaSection } from "@/components/sections/cta-section";
import { EnhancedFooter } from "@/components/sections/enhanced-footer";

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-ink">
      <StaticHeader theme="dark" />
      <section className="py-16 md:pt-48 pt-48 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-left flex flex-col items-start mb-12">
            <h1 className="heading-base text-chalk mb-6">My Work</h1>
            <p className="text-lg text-chalk/60 max-w-2xl">
              A collection of projects showcasing my expertise in design, development, and user experience.
            </p>
          </div>
          <WorkProjects projects={projects} />
        </div>
      </section>
      <CtaSection />
      <EnhancedFooter />
    </main>
  );
}
