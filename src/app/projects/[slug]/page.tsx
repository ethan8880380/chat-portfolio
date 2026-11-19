import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectWithContent,
  getProjects,
  getAllProjectSlugs,
} from "@/lib/projects-service";
import type { ProjectData } from "@/data/projects";
import { NotionContent } from "@/components/ui/notion-content";
import { SmartImage } from "@/components/ui/smart-image";
import { NoirShell } from "@/components/noir/noir-shell";
import { Fade, RiseLines } from "@/components/noir/reveal";
import { ContactBlock } from "@/components/noir/contact-block";

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: { title: project.title, description: project.shortDescription, images: [project.images.hero] },
  };
}

function Chapter({ label, body }: { label: string; body: string }) {
  const [lead, ...rest] = body.split(/(?<=[.!?])\s+/);
  return (
    <section className="grid gap-8 pt-32 md:grid-cols-12 md:pt-48">
      <Fade className="text-[13px] text-muted-foreground md:col-span-3">
        <h2>{label}</h2>
      </Fade>
      <div className="md:col-span-8 md:col-start-5">
        <Fade>
          <p className="font-gserif text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.18] tracking-[-0.02em]">{lead}</p>
        </Fade>
        {rest.length > 0 && (
          <Fade className="mt-8">
            <p className="whitespace-pre-line text-[15px] leading-[1.75] text-muted-foreground md:text-base">{rest.join(" ")}</p>
          </Fade>
        )}
      </div>
    </section>
  );
}

function StaticCaseStudy({ project }: { project: ProjectData }) {
  const gallery = project.images.gallery ?? [];
  return (
    <div className="px-6 md:px-12">
      {project.challenges && <Chapter label="Challenge" body={project.challenges} />}
      {project.solution && <Chapter label="Approach" body={project.solution} />}
      {gallery.length > 0 && (
        <div className="space-y-6 pt-32 md:pt-48">
          {gallery.map((src, i) => (
            <Fade key={src}>
              <div className="relative aspect-[16/10] overflow-hidden bg-card">
                <SmartImage src={src} alt={`${project.title}, screen ${i + 1}`} sizes="100vw" />
              </div>
            </Fade>
          ))}
        </div>
      )}
      {project.results && <Chapter label="Outcome" body={project.results} />}
      {project.testimonial && (
        <Fade className="pt-32 md:pt-48">
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-gserif text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.18] tracking-[-0.02em]">
              “{project.testimonial.quote}”
            </blockquote>
            <figcaption className="mt-8 text-[13px] text-muted-foreground">
              {project.testimonial.author} — {project.testimonial.position}
            </figcaption>
          </figure>
        </Fade>
      )}
    </div>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, all] = await Promise.all([getProjectWithContent(slug), getProjects()]);
  if (!project) notFound();

  const i = all.findIndex((p) => p.slug === slug);
  const next = all.length > 1 ? all[(i + 1) % all.length] : null;
  const hasRichContent = Boolean(project.richContent && project.richContent.length > 0);
  const meta = [
    ["Client", project.client],
    ["Year", project.year],
    ["Role", project.role.join(", ")],
    ["Stack", (project.technologies ?? []).join(", ")],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <NoirShell>
      <main>
        <section className="flex min-h-[85svh] flex-col justify-end px-6 pb-12 md:px-12">
          <Fade delay={0.1}>
            <Link href="/work" className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
              ← Work
            </Link>
          </Fade>
          <RiseLines
            lines={[project.title]}
            delay={0.25}
            className="font-gserif mt-8 max-w-[14ch] text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-[-0.045em]"
          />
          <Fade delay={0.6} className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="text-[15px] leading-relaxed text-muted-foreground md:col-span-5 md:text-base">{project.shortDescription}</p>
            {meta.length > 0 && (
              <dl className="grid grid-cols-2 gap-x-8 gap-y-5 text-[13px] md:col-span-6 md:col-start-7">
                {meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="mt-1 text-foreground/85">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Fade>
        </section>

        <Fade className="px-6 md:px-12">
          <div className="relative aspect-[16/9] overflow-hidden bg-card">
            <SmartImage src={project.images.hero} alt={project.title} sizes="100vw" className="object-cover object-top" priority />
          </div>
        </Fade>

        {hasRichContent ? (
          <div className="px-6 pt-32 md:px-12 md:pt-48">
            <div className="mx-auto max-w-2xl text-foreground">
              <NotionContent blocks={project.richContent!} />
            </div>
          </div>
        ) : (
          <StaticCaseStudy project={project} />
        )}

        {next && (
          <section className="px-6 pt-48 md:px-12 md:pt-64">
            <Link href={`/projects/${next.slug}`} className="group block border-t pt-8">
              <span className="text-[13px] text-muted-foreground">Next project</span>
              <span className="font-gserif mt-6 block text-[clamp(2.75rem,8vw,8rem)] leading-[0.95] tracking-[-0.045em] text-muted-foreground transition-colors duration-700 group-hover:text-foreground">
                {next.title} <span className="inline-block transition-transform duration-700 group-hover:translate-x-3">→</span>
              </span>
            </Link>
          </section>
        )}

        <ContactBlock />
      </main>
    </NoirShell>
  );
}
