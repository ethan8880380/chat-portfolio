import { SiteGrid, SiteSpacer } from "@/components/layout/site-section";
import { SmartImage } from "@/components/ui/smart-image";
import type { ProjectData } from "@/data/projects";

export function ProjectCaseStudy({ project }: { project: ProjectData }) {
  const sections = [
    { label: "Overview", body: project.fullDescription },
    { label: "Challenge", body: project.challenges },
    { label: "Solution", body: project.solution },
    { label: "Results", body: project.results },
  ].filter((s): s is { label: string; body: string } => Boolean(s.body));

  const gallery = project.images.gallery ?? [];

  return (
    <section>
      <SiteSpacer />
      <div className="border-y">
        <div className="mx-auto max-w-6xl border-x">
          <SiteGrid>
            {sections.map((section) => (
              <div
                key={section.label}
                className="grid gap-4 bg-background p-8 md:grid-cols-12 md:gap-10 md:p-10"
              >
                <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-3">
                  {section.label}
                </h2>
                <p className="whitespace-pre-line text-base leading-relaxed text-foreground/80 md:col-span-9 md:text-lg">
                  {section.body}
                </p>
              </div>
            ))}

            {gallery.length > 0 && (
              <div className="grid gap-px bg-border md:grid-cols-2">
                {gallery.map((src, i) => (
                  <div key={src} className="bg-background p-4 md:p-6">
                    <div className="relative aspect-[4/3] overflow-hidden border bg-muted">
                      <SmartImage
                        src={src}
                        alt={`${project.title} — image ${i + 1}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                ))}
                {gallery.length % 2 === 1 && (
                  <div aria-hidden className="hidden bg-background md:block" />
                )}
              </div>
            )}

            {project.testimonial && (
              <figure className="bg-background p-8 md:p-10">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Testimonial
                </p>
                <blockquote className="mt-6 max-w-4xl text-balance text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">
                  {project.testimonial.author} · {project.testimonial.position}
                </figcaption>
              </figure>
            )}
          </SiteGrid>
        </div>
      </div>
    </section>
  );
}
