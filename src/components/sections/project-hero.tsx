"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectData } from "@/data/projects";

interface ProjectHeroProps {
  project: ProjectData;
}

export function ProjectHero({ project }: ProjectHeroProps) {

  return (
    <section className="py-20 bg-background">
      <div className="px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        

        <div className="grid lg:grid-cols-1 col-span-3 gap-8 items-center">
          {/* Content Side */}
          {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <Link href="/work">
            <Button variant="ghost" className="group p-0 hover:bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Button>
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
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="heading-base text-left">
              {project.title}
            </h1>

            {/* Description */}
            <p className="text-regular">
              {project.shortDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.liveUrl && (
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto group">
                    View Live Project
                    <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
              )}
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full sm:w-auto group">
                    View Code
                    <Github className="h-4 w-4 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
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
            <div className="relative overflow-hidden aspect-[2/1]">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-xl" />
          </motion.div>
      </div>
    </section>
  );
} 