import Link from "next/link";
import { getFeaturedProjects, getProjects } from "@/lib/projects-service";
import { Button } from "@/components/ui/button";
import { HomeHero } from "@/components/home/home-hero";
import { ProjectMarquee } from "@/components/home/project-marquee";
import { ImpactMetrics } from "@/components/home/impact-metrics";
import { ExploreCards } from "@/components/home/explore-cards";
import { ContactCta } from "@/components/home/contact-cta";
import { SiteSection, SiteSpacer } from "@/components/layout/site-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProjectGrid } from "@/components/work/project-grid";

// Revalidate every hour to keep Notion content fresh
export const revalidate = 3600;

export default async function Home() {
  const [featuredProjects, allProjects] = await Promise.all([
    getFeaturedProjects(),
    getProjects(),
  ]);

  return (
    <>
      <main className="flex-1">
        <HomeHero marquee={<ProjectMarquee projects={allProjects} />} />
        <SiteSection
          eyebrow="Selected work"
          title="Recent projects"
          description="Enterprise platforms, design systems, and AI tools — from first sketch to shipped code."
          action={
            <Button asChild variant="outline">
              <Link href="/work">View all work</Link>
            </Button>
          }
        >
          <ProjectGrid projects={featuredProjects} />
        </SiteSection>
        <ImpactMetrics />
        <ExploreCards />
        <ContactCta />
        <SiteSpacer />
      </main>
      <SiteFooter />
    </>
  );
}
