import { notFound } from "next/navigation";
import { getProjectBySlug, getRelatedProjects, getAllProjectSlugs } from "@/data/projects";
import { ProjectHero } from "@/components/sections/project-hero";
import { ProjectContent } from "@/components/sections/project-content";
import { RelatedProjects } from "@/components/sections/related-projects";
import { Header } from "@/components/sections/header";

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
    <main className="min-h-screen">
      <Header />
      <ProjectHero project={project} />
      <ProjectContent project={project} />
      <RelatedProjects projects={relatedProjects} />
    </main>
  );
} 