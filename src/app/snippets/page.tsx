import type { Metadata } from "next";
import { Container, SectionHead } from "@/components/layout/section-head";
import { PageTitle } from "@/components/layout/page-title";
import { SiteFooter } from "@/components/layout/site-footer";
import { CodeBlock } from "@/components/snippets/code-block";
import { snippetProjects } from "@/data/snippets";

export const metadata: Metadata = {
  title: "Snippets",
  description:
    "A few favorite pieces of code from my projects — a real-estate matching algorithm, a from-scratch narrated slide engine, type-safe faceted search, and an AI assistant backend.",
};

export default function SnippetsPage() {
  const total = snippetProjects.reduce((n, p) => n + p.snippets.length, 0);

  return (
    <>
      <main className="flex-1">
        <PageTitle
          frame="Page / Snippets"
          title="Source"
          count={total}
          intro="Designers who code is a cliché until you read the code. Here are a few pieces I'm proud of, pulled straight from real projects."
        >
          <nav aria-label="Snippet projects" className="flex flex-wrap gap-2 md:justify-end">
            {snippetProjects.map((p, i) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="rounded-full border bg-card px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-sel hover:text-sel"
              >
                {String(i + 1).padStart(2, "0")} {p.name}
              </a>
            ))}
          </nav>
        </PageTitle>

        {snippetProjects.map((project, pi) => (
          <section key={project.id} id={project.id} className="scroll-mt-20 border-b py-20 md:py-28">
            <Container>
              <SectionHead
                index={String(pi + 1).padStart(2, "0")}
                label={project.stack.join(" · ")}
                title={project.name}
                aside={project.summary}
              />
              <div className="space-y-16">
                {project.snippets.map((snippet) => (
                  <article key={snippet.id} data-inspect="Snippet" data-inspect-props={`file="${snippet.filename}"`} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                    <div className="lg:col-span-4">
                      <div className="lg:sticky lg:top-24">
                        <p className="font-mono text-[11px] text-sel">{snippet.filename}</p>
                        <h3 className="mt-2 text-xl font-medium tracking-tight text-foreground md:text-2xl">{snippet.title}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{snippet.description}</p>
                      </div>
                    </div>
                    <div className="min-w-0 lg:col-span-8">
                      <CodeBlock code={snippet.code} language={snippet.language} filename={snippet.filename} />
                    </div>
                  </article>
                ))}
              </div>
            </Container>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
