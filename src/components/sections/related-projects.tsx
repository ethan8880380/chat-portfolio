"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectData } from "@/data/projects";

interface RelatedProjectsProps {
  projects: ProjectData[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (projects.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-left mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">More Projects</h2>
          <p className="text-lg text-white/60">
            Explore other work from my portfolio
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.slice(0, 4).map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard 
                project={project}
                maxTags={3}
                imageSizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Back to All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link 
            href="/work"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/[0.03] border border-white/[0.08] text-white hover:bg-white/[0.06] hover:border-[#0087ef]/30 transition-all group"
          >
            View All Projects
            <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 