import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects-service";
import { HeroFrame } from "@/components/home/hero-frame";
import { SkillTicker } from "@/components/home/skill-ticker";
import { WorkStack } from "@/components/home/work-stack";
import { HandoffPlayground } from "@/components/home/handoff-playground";
import { ImpactRedlines } from "@/components/home/impact-redlines";
import { ContactBand } from "@/components/home/contact-band";
import { Container, SectionHead } from "@/components/layout/section-head";
import { SiteFooter } from "@/components/layout/site-footer";

// Revalidate every hour to keep Notion content fresh
export const revalidate = 3600;

export const metadata = { title: "Design file view" };

export default async function FigHome() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <main className="flex-1">
        <HeroFrame />
        <SkillTicker />

        <section className="py-20 md:py-28">
          <Container>
            <SectionHead
              index="01"
              label="Selected work"
              title="Shipped, not just shot on Dribbble"
              aside={
                <>
                  Enterprise platforms, design systems and AI tools — designed and built end to end.{" "}
                  <Link href="/work" className="text-foreground underline underline-offset-4">
                    All projects →
                  </Link>
                </>
              }
            />
            <WorkStack projects={featuredProjects} />
          </Container>
        </section>

        <section className="border-t py-20 md:py-28">
          <Container>
            <SectionHead
              index="02"
              label="The handoff"
              title={
                <>
                  I design it. <span className="text-stroke">Then I ship it.</span>
                </>
              }
              aside="Most teams lose something between Figma and production. I'm the person who doesn't. Tweak the properties — the component and its code update together."
            />
            <HandoffPlayground />
          </Container>
        </section>

        <section className="border-t py-20 md:py-28">
          <Container>
            <SectionHead
              index="03"
              label="Impact"
              title="Outcomes, measured"
              aside="Good-looking screens are table stakes. These are the numbers that moved."
            />
            <ImpactRedlines />
          </Container>
        </section>

        <section className="pb-20 md:pb-28">
          <Container>
            <ContactBand />
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
