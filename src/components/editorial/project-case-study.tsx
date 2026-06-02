import { Reveal } from "@/components/ui/reveal";
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
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <div className="mt-16 border-t border-espresso/12 md:mt-24">
        {sections.map((section) => (
          <Reveal key={section.label}>
            <div className="grid grid-cols-1 gap-6 border-b border-espresso/12 py-12 md:grid-cols-12 md:gap-10 md:py-16">
              <div className="md:col-span-3">
                <span className="font-inter text-xs uppercase tracking-[0.18em] text-clay">
                  {section.label}
                </span>
              </div>
              <div className="whitespace-pre-line font-inter text-lg leading-[1.8] text-espresso/75 md:col-span-9 md:text-xl">
                {section.body}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {gallery.length > 0 && (
        <div className="grid grid-cols-1 gap-6 py-16 md:grid-cols-2">
          {gallery.map((src, i) => (
            <Reveal key={src} delay={i * 0.06}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                <SmartImage
                  src={src}
                  alt={`${project.title} — image ${i + 1}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {project.testimonial && (
        <Reveal>
          <figure className="border-t border-espresso/12 py-16 md:py-24">
            <blockquote className="max-w-4xl font-serif text-2xl leading-[1.2] text-espresso md:text-4xl">
              <span className="text-clay">&ldquo;</span>
              {project.testimonial.quote}
              <span className="text-clay">&rdquo;</span>
            </blockquote>
            <figcaption className="mt-6 font-inter text-sm text-espresso/55">
              {project.testimonial.author} &middot; {project.testimonial.position}
            </figcaption>
          </figure>
        </Reveal>
      )}
    </div>
  );
}
