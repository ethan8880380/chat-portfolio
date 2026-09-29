import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import {
  SiteGrid,
  SiteSection,
  SiteSpacer,
  siteLinkCellClassName,
} from "@/components/layout/site-section";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ethan Rogers — design technologist and front-end engineer based in Seattle, WA.",
};

export default function ContactPage() {
  return (
    <>
      <main className="flex-1">
        <PageHero
          eyebrow="Contact · Available for work"
          title="Let's build something together."
          description="I'm currently open to design technologist and front-end roles, and always up for interesting product and prototyping work. The fastest way to reach me is email."
          footer={
            <a
              href="mailto:ethan0380@gmail.com"
              className={`${siteLinkCellClassName} sm:flex-row sm:items-end sm:justify-between`}
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Email · primary
                </p>
                <p className="mt-4 break-words text-2xl font-semibold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                  ethan0380@gmail.com
                </p>
              </div>
              <ArrowUpRight className="mt-6 size-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground sm:mt-0" />
            </a>
          }
        />

        <SiteSection eyebrow="Elsewhere" title="Other ways to connect">
          <SiteGrid className="sm:grid-cols-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className={siteLinkCellClassName}
              >
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {link.label}
                </p>
                <p className="mt-8 text-base font-medium text-foreground sm:text-lg">
                  {link.value}
                </p>
                <ArrowUpRight className="absolute right-8 top-8 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 md:right-10 md:top-10" />
              </a>
            ))}
          </SiteGrid>
        </SiteSection>
        <SiteSpacer />
      </main>
      <SiteFooter />
    </>
  );
}

const LINKS = [
  { label: "Phone", value: "253-888-0380", href: "tel:253-888-0380", isExternal: false },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ethan-rogers",
    href: "https://www.linkedin.com/in/ethan-rogers/",
    isExternal: true,
  },
  {
    label: "GitHub",
    value: "github.com/ethan8880380",
    href: "https://github.com/ethan8880380",
    isExternal: true,
  },
  {
    label: "Résumé",
    value: "Download PDF",
    href: "/ethan-rogers-resume.pdf",
    isExternal: true,
  },
];
