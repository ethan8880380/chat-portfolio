import Link from "next/link";
import { SiteLogo } from "@/components/layout/site-header";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl border-x">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col bg-background p-8 md:p-10">
            <SiteLogo size="sm" />
            <p className="mt-6 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
              Design technologist prototyping and shipping product experiences
              across interaction, motion, and Gen AI.
            </p>
          </div>

          {LINK_GROUPS.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="bg-background p-8 md:p-10"
            >
              <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {group.title}
              </h2>
              <ul className="mt-6 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t px-8 py-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Available for new work
          </p>
          <p className="tabular-nums">
            © {new Date().getFullYear()} Ethan Rogers · Seattle, WA
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ link }: { link: FooterLinkItem }) {
  const className =
    "text-sm text-muted-foreground transition-colors hover:text-foreground";
  const isExternal = link.href.startsWith("http") || link.href.endsWith(".pdf");

  if (isExternal || link.href.startsWith("mailto:"))
    return (
      <a
        href={link.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={className}
      >
        {link.label}
      </a>
    );

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

const LINK_GROUPS: { title: string; links: FooterLinkItem[] }[] = [
  {
    title: "Sitemap",
    links: [
      { label: "Work", href: "/work" },
      { label: "Snippets", href: "/snippets" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: "mailto:ethan0380@gmail.com" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ethan-rogers/" },
      { label: "GitHub", href: "https://github.com/ethan8880380" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Ask my AI", href: "/chat" },
      { label: "Résumé", href: "/ethan-rogers-resume.pdf" },
    ],
  },
];

interface FooterLinkItem {
  label: string;
  href: string;
}
