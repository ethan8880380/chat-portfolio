"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ProjectData } from "@/data/projects";
import { isNotionUrl } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectData;
  maxTags?: number;
  imageSizes?: string;
}

export function ProjectCard({ 
  project, 
  maxTags = 3,
  imageSizes = "(max-width: 768px) 100vw, 50vw"
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="h-full"
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <div 
          className={`
            relative overflow-hidden rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05]
            hover:border-chalk/[0.1] transition-all h-full aspect-video
          `}
        >
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={project.images.hero}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              sizes={imageSizes}
              quality={90}
              unoptimized={isNotionUrl(project.images.hero)}
            />
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Shimmer Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 shimmer" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, maxTags).map((tag) => (
                <span 
                  key={tag} 
                  className="px-2.5 py-1 text-xs font-mono rounded-full bg-chalk/10 backdrop-blur-sm text-chalk/80 border border-chalk/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & Description */}
            <h3 className="font-semibold text-chalk mb-2 group-hover:text-[#0087ef] transition-colors text-xl md:text-2xl">
              {project.title}
            </h3>
            
            <p className="text-chalk/60 line-clamp-2 text-sm md:text-base">
              {project.shortDescription}
            </p>

            {/* Arrow */}
            <div className="mt-4 flex items-center gap-2 text-chalk/60 group-hover:text-[#0087ef] transition-colors">
              <span className="text-xs font-mono uppercase tracking-wider">View Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>

          {/* Award Badge */}
          {project.tags.includes("Award-Winning") && (
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0087ef]/20 backdrop-blur-sm border border-[#0087ef]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#0087ef]" />
              <span className="text-xs font-mono text-[#0087ef]">GDUSA Award</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
