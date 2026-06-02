import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/editorial/page-header";
import { Reveal } from "@/components/ui/reveal";
import { EditorialFooter } from "@/components/home/editorial-footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ethan Rogers — design technologist and front-end engineer based in Seattle, WA.",
};

const LINKS = [
  { label: "Phone", value: "253-888-0380", href: "tel:253-888-0380", external: false },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/ethan-rogers",
    href: "https://www.linkedin.com/in/ethan-rogers/",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/ethan8880380",
    href: "https://github.com/ethan8880380",
    external: true,
  },
  {
    label: "Résumé",
    value: "Download PDF",
    href: "/ethan-rogers-resume.pdf",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <main className="bg-cream">
      <PageHeader
        eyebrow="Contact — Available for work"
        title={
          <>
            Let&apos;s build something{" "}
            <em className="italic text-clay">together</em>.
          </>
        }
        intro="I'm currently open to design technologist and front-end roles, and always up for interesting product and prototyping work. The fastest way to reach me is email."
      />

      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <Reveal>
          <a
            href="mailto:ethan0380@gmail.com"
            className="group block border-t border-espresso/12 py-10 md:py-14"
          >
            <p className="font-inter text-xs uppercase tracking-[0.2em] text-espresso/45">
              Email &mdash; primary
            </p>
            <span className="mt-4 flex items-center justify-between gap-6">
              <span className="break-words font-serif text-[clamp(1.75rem,6vw,4.5rem)] leading-[1.05] text-espresso transition-colors group-hover:text-clay">
                ethan0380@gmail.com
              </span>
              <ArrowUpRight className="hidden h-10 w-10 shrink-0 text-espresso/40 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-clay md:block" />
            </span>
          </a>
        </Reveal>

        <div className="border-t border-espresso/12">
          {LINKS.map((link, i) => (
            <Reveal key={link.label} delay={i * 0.05}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 border-b border-espresso/12 py-6 md:py-7"
              >
                <span className="font-inter text-xs uppercase tracking-[0.2em] text-espresso/45">
                  {link.label}
                </span>
                <span className="flex items-center gap-4">
                  <span className="font-serif text-xl text-espresso transition-colors group-hover:text-clay md:text-2xl">
                    {link.value}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-espresso/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <EditorialFooter />
    </main>
  );
}
