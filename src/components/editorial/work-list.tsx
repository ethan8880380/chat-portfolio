"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { ProjectData } from "@/data/projects";
import { SmartImage } from "@/components/ui/smart-image";

const EASE = [0.16, 1, 0.3, 1] as const;

interface WorkListProps {
  projects: ProjectData[];
}

export function WorkList({ projects }: WorkListProps) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div ref={wrapRef} onMouseMove={handleMove} className="relative">
      <ul>
        {projects.map((project, i) => (
          <motion.li
            key={project.slug}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.06, ease: EASE }}
            className="border-b border-espresso/10"
          >
            <Link
              href={`/projects/${project.slug}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
              className="group relative flex items-center justify-between gap-6 py-7 md:py-9"
            >
              <div className="flex items-baseline gap-4 md:gap-6">
                <span className="font-inter text-xs tabular-nums text-espresso/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-3xl leading-none text-espresso transition-[color,transform] duration-300 ease-out group-hover:translate-x-3 group-hover:text-clay motion-reduce:group-hover:translate-x-0 md:text-5xl">
                  {project.title}
                </h3>
              </div>

              <div className="flex shrink-0 items-center gap-5 md:gap-8">
                <span className="hidden font-inter text-[0.7rem] uppercase tracking-[0.15em] text-espresso/45 sm:block">
                  {project.tags?.[0] ?? project.year}
                </span>
                <ArrowUpRight className="h-5 w-5 text-espresso/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-clay" />
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Cursor-following preview (desktop, client-only) */}
      {mounted && (
        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: hovered !== null && !reduce ? 1 : 0,
            scale: hovered !== null ? 1 : 0.8,
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="pointer-events-none absolute left-0 top-0 z-20 -ml-[120px] -mt-[80px] hidden h-40 w-60 overflow-hidden rounded-[12px] shadow-2xl lg:block"
        >
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                key={hovered}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0"
              >
                <SmartImage
                  src={projects[hovered].images.hero}
                  alt=""
                  sizes="240px"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
