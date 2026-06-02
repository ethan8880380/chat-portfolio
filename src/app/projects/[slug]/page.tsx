import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectWithContent,
  getRelatedProjects,
  getAllProjectSlugs,
} from "@/lib/projects-service";
import { ProjectHero } from "@/components/editorial/project-hero";
import { ProjectCaseStudy } from "@/components/editorial/project-case-study";
import { RelatedProjects } from "@/components/editorial/related-projects";
import { NotionContent } from "@/components/ui/notion-content";
import { EditorialFooter } from "@/components/home/editorial-footer";

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

  const relatedProjects = await getRelatedProjects(slug);
  const hasRichContent =
    project.richContent && project.richContent.length > 0;

  return (
    <main className="bg-cream">
      <ProjectHero project={project} />

      {hasRichContent ? (
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-3xl">
            <NotionContent blocks={project.richContent!} />
          </div>
        </section>
      ) : (
        <ProjectCaseStudy project={project} />
      )}

      <RelatedProjects projects={relatedProjects} />
      <EditorialFooter />
    </main>
  );
}
