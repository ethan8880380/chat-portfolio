import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
          index={1}
          eyebrow="Selected work"
          title="Recent projects"
          description="Enterprise platforms, design systems, and AI tools — from first sketch to shipped code."
          action={
            <Button asChild variant="outline" className="group">
              <Link href="/work">
                View all work
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          }
        >
          <ProjectGrid projects={featuredProjects} showIndex />
        </SiteSection>
        <ImpactMetrics index={2} />
        <ExploreCards index={3} />
        <ContactCta index={4} />
        <SiteSpacer />
      </main>
      <SiteFooter />
    </>
  );
}
