import { projectsData } from "@/data/projects";
import { Header } from "@/components/sections/header";
import { WorkProjects } from "@/components/sections/work-projects";

export default function WorkPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-16 md:py-24">
        <div className="px-4 md:px-6">
          <div className="text-left flex flex-col items-start mb-12">
            <h1 className="heading-base mb-6">My Work</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A collection of projects showcasing my expertise in design, development, and user experience.
            </p>
          </div>
          <WorkProjects projects={projectsData} />
        </div>
      </section>
    </main>
  );
} 