import { ScrollingHero } from "@/components/sections/scrolling-hero";
import { FloatingNav } from "@/components/sections/floating-nav";
import { getProjects } from "@/lib/projects-service";

export default async function ScrollingHeroDemo() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen">
      <ScrollingHero projects={projects} />
      <FloatingNav />
    </main>
  );
}