"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
    <section className="bg-background">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="col-span-3"
        >
          {/* Overview */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="heading-secondary mb-6">Project Overview</h2>
            <p className="text-regular">
              {project.fullDescription}
            </p>
          </motion.div>

          {/* Project Details Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <Card className="bg-muted/50 rounded-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Role & Responsibilities */}
            <Card className="bg-muted/50 rounded-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">My Role</h3>
                <ul className="space-y-2">
                  {project.role.map((role) => (
                    <li key={role} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {role}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Challenge, Solution, Results with integrated images */}
          <div className="space-y-16">
            {project.challenges && (
              <motion.div variants={itemVariants}>
                <h2 className="heading-secondary mb-6">The Challenge</h2>
                <p className="text-regular">
                  {project.challenges}
                </p>
              </motion.div>
            )}

            {/* First Gallery Image */}
            {project.images.gallery && project.images.gallery[0] && (
              <motion.div variants={itemVariants} className="my-16">
                <div className="relative overflow-hidden rounded-lg bg-muted group">
                  <div className="aspect-video relative">
                    <Image
                      src={project.images.gallery[0]}
                      alt={`${project.title} - Detail 1`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            )}

            {project.solution && (
              <motion.div variants={itemVariants}>
                <h2 className="heading-secondary mb-6">The Solution</h2>
                <p className="text-regular">
                  {project.solution}
                </p>
              </motion.div>
            )}

            {/* Second Gallery Image */}
            {project.images.gallery && project.images.gallery[1] && (
              <motion.div variants={itemVariants} className="my-16">
                <div className="relative overflow-hidden rounded-lg bg-muted group">
                  <div className="aspect-video relative">
                    <Image
                      src={project.images.gallery[1]}
                      alt={`${project.title} - Detail 2`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 80vw"
                      quality={90}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
            )}

            {project.results && (
              <motion.div variants={itemVariants}>
                <h2 className="heading-secondary mb-6">The Results</h2>
                <p className="text-regular">
                  {project.results}
                </p>
              </motion.div>
            )}
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <motion.div variants={itemVariants} className="mt-16">
              <Card className="bg-muted/50">
                <CardContent className="p-8 md:p-12">
                  <blockquote className="text-xl md:text-2xl font-medium italic text-center mb-6">
                    &ldquo;{project.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="text-center">
                    <p className="font-semibold">{project.testimonial.author}</p>
                    <p className="text-muted-foreground">{project.testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
} 