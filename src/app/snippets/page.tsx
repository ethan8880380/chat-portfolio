import type { Metadata } from "next";
import { PageHeader } from "@/components/editorial/page-header";
import { CodeBlock } from "@/components/editorial/code-block";
import { EditorialFooter } from "@/components/home/editorial-footer";
import { Reveal } from "@/components/ui/reveal";
import { snippetProjects } from "@/data/snippets";

export const metadata: Metadata = {
  title: "Snippets",
  description:
    "A few favorite pieces of code from my projects — a real-estate matching algorithm, a from-scratch narrated slide engine, type-safe faceted search, and an AI assistant backend.",
};

export default function SnippetsPage() {
  return (
    <main className="bg-cream">
      <PageHeader
        eyebrow="Source"
        title={
          <>
            Code I&apos;m <em className="italic text-clay">proud</em> of.
          </>
        }
        intro="A few favorite snippets pulled from real projects — the algorithm behind a real-estate marketplace, a from-scratch narrated slide engine, type-safe faceted search, and the backend that keeps an AI assistant honest."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        {snippetProjects.map((project, projectIndex) => (
          <section
            key={project.id}
            className="[&:not(:first-child)]:mt-24"
          >
            <Reveal>
              <div className="flex items-baseline justify-between gap-6">
                <h2 className="font-serif text-3xl leading-[1.1] text-espresso md:text-4xl">
                  {project.name}
                </h2>
                <span className="shrink-0 font-inter text-xs uppercase tracking-[0.22em] text-espresso/45">
                  {String(projectIndex + 1).padStart(2, "0")} / {String(snippetProjects.length).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-5 max-w-2xl font-inter text-lg leading-relaxed text-espresso/65">
                {project.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-espresso/[0.05] px-3 py-1 font-mono text-xs text-espresso/60"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-14 space-y-16">
              {project.snippets.map((snippet) => (
                <Reveal key={snippet.id}>
                  <article>
                    <h3 className="font-serif text-2xl leading-snug text-espresso">
                      {snippet.title}
                    </h3>
                    <p className="mt-2.5 max-w-2xl font-inter text-base leading-relaxed text-espresso/60">
                      {snippet.description}
                    </p>
                    <div className="mt-6">
                      <CodeBlock
                        code={snippet.code}
                        language={snippet.language}
                        filename={snippet.filename}
                      />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      <EditorialFooter />
    </main>
  );
}
