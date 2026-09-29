import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { SiteGrid, SiteSection, SiteSpacer } from "@/components/layout/site-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { CodeBlock } from "@/components/snippets/code-block";
import { snippetProjects } from "@/data/snippets";

export const metadata: Metadata = {
  title: "Snippets",
  description:
    "A few favorite pieces of code from my projects — a real-estate matching algorithm, a from-scratch narrated slide engine, type-safe faceted search, and an AI assistant backend.",
};

export default function SnippetsPage() {
  return (
    <>
      <main className="flex-1">
        <PageHero
          eyebrow="Snippets"
          title="Code I'm proud of."
          description="A few favorite snippets pulled from real projects — the algorithm behind a real-estate marketplace, a from-scratch narrated slide engine, type-safe faceted search, and the backend that keeps an AI assistant honest."
        />

        {snippetProjects.map((project, projectIndex) => (
          <SiteSection
            key={project.id}
            id={project.id}
            eyebrow={`${String(projectIndex + 1).padStart(2, "0")} / ${String(snippetProjects.length).padStart(2, "0")}`}
            title={project.name}
            description={
              <>
                {project.summary}
                <span className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border bg-background px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </>
            }
          >
            <SiteGrid>
              {project.snippets.map((snippet) => (
                <article
                  key={snippet.id}
                  className="grid gap-6 bg-background p-8 md:p-10 lg:grid-cols-12 lg:gap-10"
                >
                  <div className="lg:col-span-4">
                    <h3 className="text-base font-medium text-foreground sm:text-lg">
                      {snippet.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {snippet.description}
                    </p>
                  </div>
                  <div className="min-w-0 lg:col-span-8">
                    <CodeBlock
                      code={snippet.code}
                      language={snippet.language}
                      filename={snippet.filename}
                    />
                  </div>
                </article>
              ))}
            </SiteGrid>
          </SiteSection>
        ))}
        <SiteSpacer />
      </main>
      <SiteFooter />
    </>
  );
}
