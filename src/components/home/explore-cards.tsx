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

export function ExploreCards() {
  return (
    <SiteSection eyebrow="Explore" title="Everything about my work, in one place">
      <SiteGrid className="sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ title, description, icon: Icon, href }) => {
          const isExternal = href.endsWith(".pdf");
          const content = (
            <>
              <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              <h3 className="mt-8 text-sm font-medium text-foreground sm:text-base">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <ArrowUpRight className="absolute right-8 top-8 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 md:right-10 md:top-10" />
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
