import { getFeaturedProjects } from "@/lib/projects-service";
import { EditorialHero } from "@/components/home/editorial-hero";
import { EditorialWork } from "@/components/home/editorial-work";
import { EditorialFooter } from "@/components/home/editorial-footer";

// Revalidate every hour to keep Notion content fresh
export const revalidate = 3600;

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <main className="bg-cream">
      <EditorialHero />
      <EditorialWork projects={featuredProjects} />
      <EditorialFooter />
    </main>
  );
}
