import Link from "next/link";
import { FileText, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SiteGrid,
  SiteSection,
  siteLinkCellClassName,
} from "@/components/layout/site-section";

export function ContactCta() {
  return (
    <SiteSection
      eyebrow="Available for new work"
      title="Let's build something together"
      description="Currently open to design technologist and front-end roles, and always up for interesting product and prototyping work."
      action={
        <Button asChild>
          <Link href="/contact">Get in touch</Link>
        </Button>
      }
    >
      <SiteGrid className="md:grid-cols-3">
        {OPTIONS.map(({ title, description, icon: Icon, href }) => {
          const content = (
            <>
              <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
              <h3 className="mt-8 text-sm font-medium text-foreground sm:text-base">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </>
          );

          if (href.startsWith("/") && !href.endsWith(".pdf"))
            return (
              <Link key={title} href={href} className={siteLinkCellClassName}>
                {content}
              </Link>
            );

          return (
            <a
              key={title}
              href={href}
              target={href.endsWith(".pdf") ? "_blank" : undefined}
              rel={href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
              className={siteLinkCellClassName}
            >
              {content}
            </a>
          );
        })}
      </SiteGrid>
    </SiteSection>
  );
}

const OPTIONS = [
  {
    title: "Email me",
    description: "ethan0380@gmail.com — the fastest way to reach me",
    icon: Mail,
    href: "mailto:ethan0380@gmail.com",
  },
  {
    title: "Ask my AI",
    description: "Get quick answers about my work, process, and projects",
    icon: Sparkles,
    href: "/chat",
  },
  {
    title: "Download résumé",
    description: "A one-page PDF of my experience and skills",
    icon: FileText,
    href: "/ethan-rogers-resume.pdf",
  },
];
