"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectData } from "@/data/projects";

interface ProjectContentProps {
  project: ProjectData;
}

export function ProjectContent({ project }: ProjectContentProps) {

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

  return (
    <section className="bg-ink py-16">
      <div className="px-4 md:px-6 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Overview */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-chalk mb-6">Project Overview</h2>
            <p className="text-lg text-chalk/60 leading-relaxed">
              {project.fullDescription}
            </p>
          </motion.div>

          {/* Project Details Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-16">
            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="p-6 rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05]">
                <h3 className="text-xl font-semibold text-chalk mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 text-sm rounded-full bg-chalk/10 text-chalk/70 border border-chalk/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Role & Responsibilities */}
            <div className="p-6 rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05]">
              <h3 className="text-xl font-semibold text-chalk mb-4">My Role</h3>
              <ul className="space-y-2">
                {project.role.map((role) => (
                  <li key={role} className="flex items-center text-chalk/60">
                    <div className="w-2 h-2 bg-[#0087ef] rounded-full mr-3" />
                    {role}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Challenge, Solution, Results with integrated images */}
          <div className="space-y-16">
            {project.challenges && (
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-semibold text-chalk mb-6">The Challenge</h2>
                <p className="text-lg text-chalk/60 leading-relaxed">
                  {project.challenges}
                </p>
              </motion.div>
            )}

            {/* First Gallery Image */}
            {project.images.gallery && project.images.gallery[0] && (
              <motion.div variants={itemVariants} className="my-16">
                <div className="relative overflow-hidden rounded-2xl bg-chalk/[0.02] group">
                  <div className="aspect-video relative">
                    <Image
                      src={project.images.gallery[0]}
                      alt={`${project.title} - Detail 1`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            )}

            {project.solution && (
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-semibold text-chalk mb-6">The Solution</h2>
                <p className="text-lg text-chalk/60 leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>
            )}

            {/* Second Gallery Image */}
            {project.images.gallery && project.images.gallery[1] && (
              <motion.div variants={itemVariants} className="my-16">
                <div className="relative overflow-hidden rounded-2xl bg-chalk/[0.02] group">
                  <div className="aspect-video relative">
                    <Image
                      src={project.images.gallery[1]}
                      alt={`${project.title} - Detail 2`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            )}

            {project.results && (
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-semibold text-chalk mb-6">The Results</h2>
                <p className="text-lg text-chalk/60 leading-relaxed">
                  {project.results}
                </p>
              </motion.div>
            )}
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <motion.div variants={itemVariants} className="mt-16">
              <div className="p-8 md:p-12 rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05]">
                <blockquote className="text-xl md:text-2xl font-medium italic text-center mb-6 text-chalk">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold text-chalk">{project.testimonial.author}</p>
                  <p className="text-chalk/50">{project.testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
} 