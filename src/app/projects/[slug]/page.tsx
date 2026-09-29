import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectWithContent,
  getRelatedProjects,
  getAllProjectSlugs,
} from "@/lib/projects-service";
import { Button } from "@/components/ui/button";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectCaseStudy } from "@/components/project/project-case-study";
import { NotionContent } from "@/components/ui/notion-content";
import { SiteSection, SiteSpacer } from "@/components/layout/site-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProjectGrid } from "@/components/work/project-grid";

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.images.hero],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectWithContent(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = (await getRelatedProjects(slug)).slice(0, 3);
  const hasRichContent =
    project.richContent && project.richContent.length > 0;

  return (
    <>
      <main className="flex-1">
        <ProjectHero project={project} />

        {hasRichContent ? (
          <section>
            <SiteSpacer />
            <div className="border-y">
              <div className="mx-auto max-w-6xl border-x px-8 py-14 md:px-10 md:py-20">
                <div className="max-w-3xl">
                  <NotionContent blocks={project.richContent!} />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <ProjectCaseStudy project={project} />
        )}

        {relatedProjects.length > 0 && (
          <SiteSection
            eyebrow="More work"
            title="Related projects"
            action={
              <Button asChild variant="outline">
                <Link href="/work">View all work</Link>
              </Button>
            }
          >
            <ProjectGrid projects={relatedProjects} columns={3} />
          </SiteSection>
        )}
        <SiteSpacer />
      </main>
      <SiteFooter />
    </>
  );
}
