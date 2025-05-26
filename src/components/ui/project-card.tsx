"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectData } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectData;
  showYear?: boolean;
  maxTags?: number;
  imageSizes?: string;
}

export function ProjectCard({ 
  project, 
  showYear = false, 
  maxTags = 3,
  imageSizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
}: ProjectCardProps) {
    
  return (
    <Card className="group overflow-hidden">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.images.hero}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={imageSizes}
          quality={80}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      
      <CardContent className="py-6 px-0">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, maxTags).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-md mb-4 line-clamp-3">
          {project.shortDescription}
        </p>
        
        <div className="flex items-center justify-between">
          {showYear && (
            <span className="text-sm text-muted-foreground">{project.year}</span>
          )}
          <Link href={`/projects/${project.slug}`} className={showYear ? "" : "w-full"}>
            <Button variant="ghost" size="sm" className="group/btn p-0 hover:bg-transparent">
              View Project
              <ArrowUpRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 