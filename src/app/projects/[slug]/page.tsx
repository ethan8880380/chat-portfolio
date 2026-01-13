import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectWithContent,
  getRelatedProjects,
  getAllProjectSlugs,
} from "@/lib/projects-service";
import { ProjectHero } from "@/components/sections/project-hero";
import { RelatedProjects } from "@/components/sections/related-projects";
import { StaticHeader } from "@/components/sections/static-header";
import { CtaSection } from "@/components/sections/cta-section";
import { EnhancedFooter } from "@/components/sections/enhanced-footer";
import { NotionContent } from "@/components/ui/notion-content";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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
  const project = await getProjectWithContent(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(slug);

  return (
    <main className="min-h-screen bg-ink">
      <StaticHeader theme="dark" />
      <ProjectHero project={project} />
      
      {/* Render freeform Notion content if available */}
      {project.richContent && project.richContent.length > 0 && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
              {/* Main Content - 3/4 width */}
              <div className="lg:w-3/4">
                <NotionContent blocks={project.richContent} />
              </div>
              
              {/* Sticky CTA Sidebar - 1/4 width */}
              <div className="lg:w-1/4 lg:self-start">
                <div className="sticky top-24">
                  <div className="bg-chalk/5 border border-chalk/10 rounded-3xl p-6 space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-chalk mb-2">
                        Like what you see?
                      </h3>
                      <p className="text-chalk/60 text-sm">
                        Let&apos;s discuss how I can help bring your project to life.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <a
                        href="/contact"
                        className="flex items-center justify-center w-full px-6 py-3 bg-[#0087ef] hover:bg-[#0087ef]/90 text-chalk font-medium rounded-full transition-colors"
                      >
                        Get in Touch
                      </a>
                      <a
                        href="/work"
                        className="flex items-center justify-center w-full px-6 py-3 bg-chalk/5 hover:bg-chalk/10 border border-chalk/10 text-chalk font-medium rounded-full transition-colors"
                      >
                        View More Work
                      </a>
                    </div>
                    
                    <div className="pt-4 border-t border-chalk/10">
                      <p className="text-chalk/40 text-xs uppercase tracking-wider mb-3">
                        Project Details
                      </p>
                      <div className="space-y-2 text-sm">
                        {project.year && (
                          <div className="flex justify-between">
                            <span className="text-chalk/50">Year</span>
                            <span className="text-chalk">{project.year}</span>
                          </div>
                        )}
                        {project.client && (
                          <div className="flex justify-between">
                            <span className="text-chalk/50">Client</span>
                            <span className="text-chalk">{project.client}</span>
                          </div>
                        )}
                        {project.role && project.role.length > 0 && (
                          <div className="flex flex-col gap-2">
                            <span className="text-chalk/50">Role</span>
                            <div className="flex flex-wrap gap-2">
                              {project.role.map((r) => (
                                <span key={r} className="text-xs font-medium bg-[#0087ef]/20 text-[#0087ef] px-3 py-1.5 rounded-full border border-[#0087ef]/30">
                                  {r}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      <RelatedProjects projects={relatedProjects} />
      <CtaSection />
      <EnhancedFooter />
    </main>
  );
}
