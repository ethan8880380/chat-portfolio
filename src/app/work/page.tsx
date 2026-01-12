import { projectsData } from "@/data/projects";
import { StaticHeader } from "@/components/sections/static-header";
import { WorkProjects } from "@/components/sections/work-projects";
import { CtaSection } from "@/components/sections/cta-section";
import { EnhancedFooter } from "@/components/sections/enhanced-footer";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black">
      <StaticHeader theme="dark" />
      <section className="py-16 md:pt-48 pt-48 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-left flex flex-col items-start mb-12">
            <h1 className="heading-base text-white mb-6">My Work</h1>
            <p className="text-lg text-white/60 max-w-2xl">
              A collection of projects showcasing my expertise in design, development, and user experience.
            </p>
          </div>
          <WorkProjects projects={projectsData} />
        </div>
      </section>
      <CtaSection />
      <EnhancedFooter />
    </main>
  );
}
