"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import type { ProjectData } from "@/data/projects";
import { SmartImage } from "@/components/ui/smart-image";

const EASE = [0.16, 1, 0.3, 1] as const;

function fade(delay: number) {
  return {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  };
}

export function ProjectHero({ project }: { project: ProjectData }) {
  const meta = [
    { label: "Year", value: project.year },
    { label: "Client", value: project.client },
    {
      label: "Role",
      value: project.role?.length ? project.role.join(", ") : "",
    },
    {
      label: "Stack",
      value: project.technologies?.length
        ? project.technologies.slice(0, 4).join(", ")
        : "",
    },
  ].filter((m) => Boolean(m.value && m.value.trim()));

  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 md:px-10 md:pt-24">
      <motion.div {...fade(0)}>
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 font-inter text-sm text-espresso/60 transition-colors hover:text-clay"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All work
        </Link>
      </motion.div>

      <motion.div {...fade(0.06)} className="mt-8 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-espresso/20 px-3 py-1 font-inter text-xs text-espresso/70"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      <motion.h1
        {...fade(0.12)}
        className="mt-6 max-w-4xl font-serif text-[clamp(2.5rem,7vw,6rem)] leading-[1.03] tracking-[-0.01em] text-espresso"
      >
        {project.title}
      </motion.h1>

      <motion.p
        {...fade(0.18)}
        className="mt-6 max-w-3xl font-inter text-lg leading-relaxed text-espresso/65 md:text-xl"
      >
        {project.shortDescription}
      </motion.p>

      {(project.liveUrl || project.githubUrl) && (
        <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-2.5 font-inter text-sm text-cream transition-colors hover:bg-clay"
            >
              Visit site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-espresso/25 px-5 py-2.5 font-inter text-sm text-espresso transition-colors hover:border-clay hover:text-clay"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          )}
        </motion.div>
      )}

      <motion.div
        {...fade(0.3)}
        className="mt-12 grid grid-cols-2 gap-6 border-t border-espresso/12 pt-8 md:grid-cols-4"
      >
        {meta.map((item) => (
          <div key={item.label}>
            <p className="font-inter text-xs uppercase tracking-[0.18em] text-espresso/45">
              {item.label}
            </p>
            <p className="mt-2 font-inter text-sm text-espresso/80">
              {item.value}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div
        {...fade(0.36)}
        className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-[16px]"
      >
        <SmartImage
          src={project.images.hero}
          alt={project.title}
          priority
          sizes="100vw"
        />
      </motion.div>
    </section>
  );
}
