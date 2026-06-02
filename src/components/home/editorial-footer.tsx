import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const SOCIAL = [
  { label: "Email", href: "mailto:ethan0380@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ethan-rogers/" },
  { label: "GitHub", href: "https://github.com/ethan8880380" },
  { label: "Résumé", href: "/ethan-rogers-resume.pdf" },
];

const SITEMAP = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Ask AI", href: "/chat" },
];

export function EditorialFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-espresso/15 bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="font-inter text-xs uppercase tracking-[0.22em] text-espresso/55">
            Available for new work
          </p>
          <a
            href="mailto:ethan0380@gmail.com"
            className="group mt-6 inline-flex items-start gap-3 font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] text-espresso transition-colors hover:text-clay"
          >
            Let&apos;s work together
            <ArrowUpRight className="mt-2 h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:h-9 md:w-9" />
          </a>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-16 grid grid-cols-2 gap-10 border-t border-espresso/12 pt-10 md:grid-cols-4"
        >
          <div className="col-span-2 md:col-span-2">
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-espresso/45">
              Connect
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={
                      item.href.startsWith("http") || item.href.endsWith(".pdf")
                        ? "_blank"
                        : undefined
                    }
                    rel="noopener noreferrer"
                    className="font-inter text-base text-espresso/75 underline-offset-4 transition-colors hover:text-clay hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-espresso/45">
              Sitemap
            </p>
            <ul className="mt-4 space-y-2">
              {SITEMAP.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-inter text-base text-espresso/75 transition-colors hover:text-clay"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-espresso/45">
              Based in
            </p>
            <p className="mt-4 font-inter text-base text-espresso/75">
              Seattle, WA
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-12 font-inter text-xs text-espresso/45">
            &copy; {year} Ethan Rogers &mdash; designed &amp; built from scratch.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
