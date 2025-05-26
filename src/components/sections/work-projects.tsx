"use client";

import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectData } from "@/data/projects";

interface WorkProjectsProps {
  projects: ProjectData[];
}

export function WorkProjects({ projects }: WorkProjectsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={itemVariants}>
          <ProjectCard 
            project={project}
            maxTags={3}
            imageSizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </motion.div>
      ))}
    </motion.div>
  );
} 