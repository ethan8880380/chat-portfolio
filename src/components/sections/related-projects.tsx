"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section className="py-16 md:py-24 bg-background">
      <div className="px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-left mb-12"
        >
          <h2 className="heading-secondary mb-4">More Projects</h2>
          <p className="text-regular">
            Explore other work from my portfolio
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {projects.slice(0, 4).map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard 
                project={project}
                maxTags={2}
                imageSizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
          <Link href="/work">
            <Button variant="outline" size="lg" className="group">
              View All Projects
              <ArrowUpRight className="h-5 w-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 