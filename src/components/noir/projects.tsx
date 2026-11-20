"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectData } from "@/data/projects";
import { SmartImage } from "@/components/ui/smart-image";
import { EASE, Fade, Hairline, RiseLines } from "@/components/noir/reveal";
import { PrototypeCard } from "@/components/noir/prototype";
import { cn } from "@/lib/utils";

function meta(p: ProjectData) {
  return [p.client, p.year].filter(Boolean).join(", ") || p.tags[0] || "";
}

/** Fades in and settles from a slight zoom — once, as it enters view. */
function QuietImage({ src, alt, aspect, sizes }: { src: string; alt: string; aspect: string; sizes: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("relative overflow-hidden bg-card", aspect)}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <SmartImage
          src={src}
          alt={alt}
          sizes={sizes}
          className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.015]"
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Same arrival as QuietImage, but the picture keeps its own proportions —
 * no fixed frame, no cropping.
 */
function NativeImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const reduce = useReducedMotion();
  const cls = "block h-auto w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.015]";
  return (
    <motion.div
      className="overflow-hidden bg-card"
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <motion.div
        initial={reduce ? false : { scale: 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <Image src={src} alt={alt} width={0} height={0} sizes={sizes} className={cls} style={{ width: "100%", height: "auto" }} />
      </motion.div>
    </motion.div>
  );
}

/** Home: a few projects, each given room to breathe. Alternates left and right. */
export function FeaturedProjects({ projects }: { projects: ProjectData[] }) {
  return (
    <section id="work" data-inspect="FeaturedProjects" className="px-6 pt-40 md:px-12 md:pt-56">
      <Hairline />
      <Fade className="mb-16 mt-6 flex items-baseline justify-between text-[13px] text-muted-foreground md:mb-24">
        <span>Selected work</span>
        <span className="tabular-nums">{String(projects.length).padStart(2, "0")}</span>
      </Fade>

      <div className="space-y-32 md:space-y-48">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            data-inspect="ProjectShowcase"
            data-inspect-props={`slug="${p.slug}"`}
            className={cn("group block md:w-[78%]", i % 2 === 1 && "md:ml-auto")}
          >
            {p.prototype ? (
              <PrototypeCard prototype={p.prototype} title={p.title} />
            ) : (
              <QuietImage src={p.images.hero} alt={p.title} aspect="aspect-[16/10]" sizes="(max-width: 768px) 100vw, 78vw" />
            )}
            <div className="mt-6 grid gap-4 md:grid-cols-12 md:gap-8">
              <span className="text-[13px] tabular-nums text-muted-foreground md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-7">
                <div className="flex items-start gap-3">
                  <RiseLines
                    as="h3"
                    lines={[p.title]}
                    className="font-gserif text-[clamp(2rem,4.2vw,4rem)] leading-[1] tracking-[-0.035em]"
                  />
                  <ArrowUpRight className="mt-2 size-6 shrink-0 text-muted-foreground opacity-0 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <Fade delay={0.15}>
                  <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">{p.shortDescription}</p>
                </Fade>
              </div>
              <Fade delay={0.2} className="md:col-span-4 md:text-right">
                <p className="text-[13px] text-muted-foreground">{meta(p)}</p>
              </Fade>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** Work index: every project as a card in a staggered two-column grid. */
export function ProjectGrid({ projects }: { projects: ProjectData[] }) {
  const columns = [projects.filter((_, i) => i % 2 === 0), projects.filter((_, i) => i % 2 === 1)];
  return (
    <section data-inspect="ProjectGrid" className="px-6 pt-24 md:px-12 md:pt-40">
      <div className="grid gap-x-10 gap-y-24 md:grid-cols-2">
        {columns.map((col, ci) => (
          <div key={ci} className={cn("space-y-24 md:space-y-36", ci === 1 && "md:pt-56")}>
            {col.map((p) => {
              const n = projects.indexOf(p) + 1;
              return (
                <Link key={p.slug} href={`/projects/${p.slug}`} data-inspect="ProjectCard" className="group block">
                  {p.prototype ? (
                    <PrototypeCard prototype={p.prototype} title={p.title} />
                  ) : (
                    <NativeImage src={p.images.hero} alt={p.title} sizes="(max-width: 768px) 100vw, 50vw" />
                  )}
                  <div className="mt-5 flex items-baseline gap-4">
                    <span className="text-[13px] tabular-nums text-muted-foreground">{String(n).padStart(2, "0")}</span>
                    <div className="min-w-0 flex-1">
                      <RiseLines
                        as="h3"
                        lines={[p.title]}
                        className="font-gserif text-[clamp(1.75rem,2.8vw,2.75rem)] leading-[1.05] tracking-[-0.03em]"
                      />
                      <p className="mt-2 text-[13px] text-muted-foreground">{meta(p)}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
