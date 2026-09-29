import Link from "next/link";
import { SiteLogo } from "@/components/layout/site-header";
import { StatusDot } from "@/components/layout/status-dot";

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

        <div aria-hidden className="relative select-none overflow-hidden border-t">
          <p className="translate-y-[22%] whitespace-nowrap px-4 text-center text-[clamp(3.5rem,15.5vw,11.5rem)] font-semibold leading-none tracking-[-0.06em] text-foreground/[0.09]">
            Ethan Rogers
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="flex flex-col gap-3 border-t px-8 py-6 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p className="flex items-center gap-2">
            <StatusDot />
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
    "text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline";
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
