"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { ProjectData } from "@/data/projects";

interface FeaturedProjectsProps {
  projects: ProjectData[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Projects are already filtered by "Featured" checkbox from Notion
  const featuredProjects = projects;
  return (
    <section id="projects" className="py-24 px-4 md:px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0087ef]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0087ef]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0087ef] mb-4 block">
            Selected Work
          </span>
          <h2 className="heading-base text-chalk">
            Featured Projects
          </h2>
        </motion.div>

        {/* Projects Grid - Standard 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard 
              key={project.slug}
              project={project} 
              index={index}
            />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link 
            href="/work" 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-chalk/[0.03] border border-chalk/[0.08] hover:border-[#0087ef]/30 hover:bg-[#0087ef]/5 transition-all group"
          >
            <span className="text-lg font-medium text-chalk">View All Projects</span>
            <ArrowUpRight className="w-5 h-5 text-[#0087ef] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

interface FeaturedProjectCardProps {
  project: ProjectData;
  index: number;
}

function FeaturedProjectCard({ project, index }: FeaturedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div 
          className="relative overflow-hidden rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05] hover:border-chalk/[0.1] transition-all aspect-video"
        >
          {/* Background Image */}
          <Image
            src={project.images.hero}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />

          {/* Shimmer Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 shimmer" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag} 
                  className="px-2.5 py-1 text-xs font-mono rounded-full bg-chalk/10 backdrop-blur-sm text-chalk/80 border border-chalk/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title & Description */}
            <h3 className="text-xl md:text-2xl font-semibold text-chalk mb-2 group-hover:text-[#0087ef] transition-colors">
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
