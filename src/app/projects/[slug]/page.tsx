import { notFound } from "next/navigation";
import { getProjectBySlug, getRelatedProjects, getAllProjectSlugs } from "@/data/projects";
import { ProjectHero } from "@/components/sections/project-hero";
import { ProjectContent } from "@/components/sections/project-content";
import { RelatedProjects } from "@/components/sections/related-projects";
import { StaticHeader } from "@/components/sections/static-header";
import { CtaSection } from "@/components/sections/cta-section";
import { EnhancedFooter } from "@/components/sections/enhanced-footer";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Ethan Rogers Portfolio`,
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
  const project = getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(slug);

  return (
    <main className="min-h-screen bg-black">
      <StaticHeader theme="dark" />
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <RelatedProjects projects={relatedProjects} />
      <CtaSection />
      <EnhancedFooter />
    </main>
  );
}
