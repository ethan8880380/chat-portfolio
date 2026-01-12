"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { ProjectData } from "@/data/projects";

interface ProjectHeroProps {
  project: ProjectData;
}

export function ProjectHero({ project }: ProjectHeroProps) {

  return (
    <section className="py-20 pt-32 bg-black">
      <div className="px-4 md:px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        

        <div className="grid lg:grid-cols-1 col-span-3 gap-8 items-center">
          {/* Content Side */}
          {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <Link href="/work" className="inline-flex items-center text-white/60 hover:text-white transition-colors group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Project Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 text-sm font-mono rounded-full bg-white/10 text-white/80 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="heading-base text-left text-white">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/60 leading-relaxed">
              {project.shortDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.liveUrl && (
                <Link 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all group"
                >
                  View Live Project
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              )}
              {project.githubUrl && (
                <Link 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] text-white hover:bg-white/[0.06] hover:border-[#0087ef]/30 transition-all group"
                >
                  View Code
                  <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </Link>
              )}
            </div>
          </motion.div>

          
        </div>
        {/* Image Side */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative col-span-4"
          >
            <div className="relative overflow-hidden rounded-2xl aspect-[2/1]">
              <div className="aspect-video relative">
                <Image
                  src={project.images.hero}
                  alt={project.title}
                  fill
                  className="object-cover"
                  style={{ objectPosition: '50% 10%' }}
                  quality={100}
                  priority
                />
              </div>
              
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#0087ef]/10 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#0087ef]/5 rounded-full blur-xl" />
          </motion.div>
      </div>
    </section>
  );
} 