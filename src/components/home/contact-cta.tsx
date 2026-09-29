import Link from "next/link";
import { ArrowUpRight, FileText, Sparkles } from "lucide-react";
import { GridMarks } from "@/components/layout/grid-marks";
import { Reveal } from "@/components/layout/reveal";
import { SectionEyebrow, SiteSpacer } from "@/components/layout/site-section";
import { StatusDot } from "@/components/layout/status-dot";

export function ContactCta({ index }: { index?: number }) {
  return (
    <section>
      <SiteSpacer />
      <div className="border-y">
        <div className="relative mx-auto max-w-6xl border-x bg-background text-foreground">
          <GridMarks />
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_90%_at_100%_0%,black,transparent)]" />
          </div>

          <Reveal className="relative px-8 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
            <SectionEyebrow index={index}>
              <span className="inline-flex items-center gap-2">
                <StatusDot />
                Available for new work
              </span>
            </SectionEyebrow>
            <h2 className="mt-8 max-w-4xl text-balance text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
              Let&apos;s build something together.
            </h2>
            <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              Currently open to design technologist and front-end roles, and
              always up for interesting product and prototyping work.
            </p>

            <a
              href="mailto:ethan0380@gmail.com"
              className="group mt-12 inline-flex max-w-full items-center gap-4 border-b pb-3 text-xl font-medium tracking-tight transition-colors hover:border-foreground sm:text-4xl"
            >
              ethan0380@gmail.com
              <span className="flex size-10 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-300 group-hover:-rotate-45 sm:size-12">
                <ArrowUpRight className="size-5 rotate-45" />
              </span>
            </a>
          </Reveal>

          <div className="relative grid gap-px border-t bg-border sm:grid-cols-2">
            {OPTIONS.map(({ title, description, icon: Icon, href, isExternal }) => {
              const content = (
                <>
                  <Icon className="size-5 text-muted-foreground transition-colors group-hover:text-foreground" />
                  <div>
                    <h3 className="text-base font-medium">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  </div>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </>
              );
              const className =
                "spotlight group relative flex items-center gap-5 bg-background px-8 py-7 outline-none transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 md:px-10";

              return isExternal ? (
                <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={className}>
                  {content}
                </a>
              ) : (
                <Link key={title} href={href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const OPTIONS = [
  {
    title: "Ask my AI",
    description: "Quick answers about my work, process, and projects",
    icon: Sparkles,
    href: "/chat",
    isExternal: false,
  },
  {
    title: "Download résumé",
    description: "A one-page PDF of my experience and skills",
    icon: FileText,
    href: "/ethan-rogers-resume.pdf",
    isExternal: true,
  },
];
