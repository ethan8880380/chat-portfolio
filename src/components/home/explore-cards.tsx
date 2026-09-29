import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  FileText,
  Layers,
  Mail,
  Sparkles,
  User,
} from "lucide-react";
import {
  SiteGrid,
  SiteSection,
  siteLinkCellClassName,
} from "@/components/layout/site-section";

export function ExploreCards({ index }: { index?: number }) {
  return (
    <SiteSection
      index={index}
      eyebrow="Explore"
      title="Everything about my work, in one place"
    >
      <SiteGrid className="sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ title, description, icon: Icon, href }, itemIndex) => {
          const isExternal = href.endsWith(".pdf");
          const content = (
            <>
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-full border bg-background transition-colors group-hover:border-foreground/20 group-hover:bg-muted">
                  <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                </span>
                <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
                  {String(itemIndex + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-12 flex items-center gap-2 text-base font-medium text-foreground sm:text-lg">
                {title}
                <ArrowUpRight className="size-4 -translate-x-1 text-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </>
          );

          return isExternal ? (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={siteLinkCellClassName}
            >
              {content}
            </a>
          ) : (
            <Link key={title} href={href} className={siteLinkCellClassName}>
              {content}
            </Link>
          );
        })}
      </SiteGrid>
    </SiteSection>
  );
}

const ITEMS = [
  {
    title: "Case studies",
    description: "Enterprise UX, design systems, AI tools, and consumer web",
    icon: Layers,
    href: "/work",
  },
  {
    title: "Code snippets",
    description: "Favorite pieces of code pulled from real projects",
    icon: Code2,
    href: "/snippets",
  },
  {
    title: "Ask my AI",
    description: "Chat with an assistant trained on my résumé and work",
    icon: Sparkles,
    href: "/chat",
  },
  {
    title: "About me",
    description: "Background, skills, experience, and life off the clock",
    icon: User,
    href: "/about",
  },
  {
    title: "Résumé",
    description: "Download a PDF of my experience and education",
    icon: FileText,
    href: "/ethan-rogers-resume.pdf",
  },
  {
    title: "Get in touch",
    description: "Open to design technologist and front-end roles",
    icon: Mail,
    href: "/contact",
  },
];
