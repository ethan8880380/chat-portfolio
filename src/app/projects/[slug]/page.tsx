import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectWithContent,
  getProjects,
  getAllProjectSlugs,
} from "@/lib/projects-service";
import type { ProcessImage, ProjectData } from "@/data/projects";
import { NotionContent } from "@/components/ui/notion-content";
import { SmartImage } from "@/components/ui/smart-image";
import { NoirShell } from "@/components/noir/noir-shell";
import { Fade, RiseLines } from "@/components/noir/reveal";
import { ContactBlock } from "@/components/noir/contact-block";
import { PrototypeStage } from "@/components/noir/prototype";

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
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.images.hero],
    },
  };
}

function Chapter({ label, body }: { label: string; body: string }) {
  // The first sentence is the lead; the rest keeps its paragraph breaks.
  const [first, ...paragraphs] = body.split(/\n\s*\n/);
  const [lead, ...firstRest] = first.split(/(?<=[.!?])\s+/);
  const rest = [firstRest.join(" "), ...paragraphs].filter(Boolean);
  return (
    <section className="grid gap-8 pt-32 md:grid-cols-12 md:pt-48">
      <Fade className="text-[13px] text-muted-foreground md:col-span-3">
        <h2>{label}</h2>
      </Fade>
      <div className="md:col-span-8 md:col-start-5">
        <Fade>
          <p className="font-gserif text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.18] tracking-[-0.02em]">
            {lead}
          </p>
        </Fade>
        {rest.length > 0 && (
          <Fade className="mt-8">
            <p className="whitespace-pre-line text-[15px] leading-[1.75] text-muted-foreground md:text-base">
              {rest.join("\n\n")}
            </p>
          </Fade>
        )}
      </div>
    </section>
  );
}

function Caption({ title, caption }: { title: string; caption?: string }) {
  return (
    <figcaption className="mt-4 grid gap-1 text-[13px] md:grid-cols-[minmax(0,14rem)_1fr] md:gap-6">
      <span className="text-foreground/85">{title}</span>
      {caption && <span className="text-muted-foreground">{caption}</span>}
    </figcaption>
  );
}

function Boards({ boards, title }: { boards: ProcessImage[]; title: string }) {
  return (
    <div className="grid gap-x-6 gap-y-16 pt-24 md:grid-cols-2 md:pt-32">
      {boards.map((board) => (
        <Fade
          key={board.src}
          className={board.wide ? "md:col-span-2" : undefined}
        >
          <figure>
            {/* Boards are dense; on a phone, tapping one opens it full size. */}
            <a
              href={board.src}
              target="_blank"
              rel="noopener"
              className="block cursor-zoom-in"
            >
              <Image
                src={board.src}
                alt={`${title}, ${board.title}`}
                width={board.width}
                height={board.height}
                sizes={board.wide ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                className="h-auto w-full rounded-[clamp(8px,1.2vw,20px)]"
              />
            </a>
            <Caption title={board.title} caption={board.caption} />
          </figure>
        </Fade>
      ))}
    </div>
  );
}

function Showcase({
  showcase,
  title,
}: {
  showcase: NonNullable<ProjectData["showcase"]>;
  title: string;
}) {
  return (
    <div className="px-6 md:px-12">
      {showcase.body ? (
        <Chapter label={showcase.label} body={showcase.body} />
      ) : (
        <h2 className="pt-32 text-[13px] text-muted-foreground md:pt-48">
          {showcase.label}
        </h2>
      )}
      <Boards boards={showcase.images} title={title} />
    </div>
  );
}

function Process({
  process,
  title,
}: {
  process: NonNullable<ProjectData["process"]>;
  title: string;
}) {
  const { boards = [], progression } = process;
  return (
    <>
      <Chapter label="Process" body={process.body} />
      {boards.length > 0 && <Boards boards={boards} title={title} />}
      {progression && (
        <section className="pt-32 md:pt-48">
          <Fade className="grid gap-4 md:grid-cols-12">
            <h3 className="font-gserif text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.18] tracking-[-0.02em] md:col-span-4">
              {progression.title}
            </h3>
            {progression.caption && (
              <p className="text-[15px] leading-[1.75] text-muted-foreground md:col-span-6 md:col-start-6 md:text-base">
                {progression.caption}
              </p>
            )}
          </Fade>
          <div className="-mx-6 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {progression.stages.map((stage, i) => (
              <Fade
                key={stage.src}
                delay={i * 0.12}
                className="w-[72vw] shrink-0 snap-start md:w-auto"
              >
                <figure>
                  <div className="overflow-hidden rounded-[20px] bg-card">
                    <Image
                      src={stage.src}
                      alt={`${title} homepage, ${stage.title}`}
                      width={stage.width}
                      height={stage.height}
                      sizes="(min-width: 768px) 33vw, 72vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-3 text-[13px]">
                    <span className="tabular-nums text-muted-foreground">
                      0{i + 1}
                    </span>
                    <span className="text-foreground/85">{stage.title}</span>
                  </figcaption>
                </figure>
              </Fade>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function StaticCaseStudy({ project }: { project: ProjectData }) {
  const gallery = project.images.gallery ?? [];
  return (
    <div className="px-6 md:px-12">
      {project.challenges && (
        <Chapter label="Challenge" body={project.challenges} />
      )}
      {project.process && (
        <Process process={project.process} title={project.title} />
      )}
      {project.solution && <Chapter label="Approach" body={project.solution} />}
      {gallery.length > 0 && (
        <div className="space-y-6 pt-32 md:pt-48">
          {gallery.map((src, i) => (
            <Fade key={src}>
              <div className="relative aspect-[16/10] overflow-hidden bg-card">
                <SmartImage
                  src={src}
                  alt={`${project.title}, screen ${i + 1}`}
                  sizes="100vw"
                />
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
  const [project, all] = await Promise.all([
    getProjectWithContent(slug),
    getProjects(),
  ]);
  if (!project) notFound();

  const i = all.findIndex((p) => p.slug === slug);
  const next = all.length > 1 ? all[(i + 1) % all.length] : null;
  const hasRichContent = Boolean(
    project.richContent && project.richContent.length > 0,
  );
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
            <Link
              href="/work"
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Work
            </Link>
          </Fade>
          <RiseLines
            lines={[project.title]}
            delay={0.25}
            className="font-gserif mt-8 max-w-[14ch] text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-[-0.045em]"
          />
          <Fade delay={0.6} className="mt-10 grid gap-10 md:grid-cols-12">
            <p className="text-[15px] leading-relaxed text-muted-foreground md:col-span-5 md:text-base">
              {project.shortDescription}
            </p>
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

        {project.prototype ? (
          <PrototypeStage prototype={project.prototype} title={project.title} />
        ) : (
          <Fade className="px-6 md:px-12">
            <div className="relative aspect-[16/9] overflow-hidden bg-card">
              <SmartImage
                src={project.images.hero}
                alt={project.title}
                sizes="100vw"
                className="object-cover object-top"
                priority
              />
            </div>
          </Fade>
        )}

        {hasRichContent ? (
          <div className="px-6 pt-32 md:px-12 md:pt-48">
            <div className="mx-auto max-w-2xl text-foreground">
              <NotionContent blocks={project.richContent!} />
            </div>
          </div>
        ) : (
          <StaticCaseStudy project={project} />
        )}

        {project.showcase && (
          <Showcase showcase={project.showcase} title={project.title} />
        )}

        {next && (
          <section className="px-6 pt-48 md:px-12 md:pt-64">
            <Link
              href={`/projects/${next.slug}`}
              className="group block border-t pt-8"
            >
              <span className="text-[13px] text-muted-foreground">
                Next project
              </span>
              <span className="font-gserif mt-6 block text-[clamp(2.75rem,8vw,8rem)] leading-[0.95] tracking-[-0.045em] text-muted-foreground transition-colors duration-700 group-hover:text-foreground">
                {next.title}{" "}
                <span className="inline-block transition-transform duration-700 group-hover:translate-x-3">
                  →
                </span>
              </span>
            </Link>
          </section>
        )}

        <ContactBlock />
      </main>
    </NoirShell>
  );
}
