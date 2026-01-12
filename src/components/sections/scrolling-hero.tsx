"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import { ProjectData } from "@/data/projects";

interface ScrollingHeroProps {
  projects: ProjectData[];
}

export function ScrollingHero({ projects }: ScrollingHeroProps) {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [opacity, setOpacity] = useState(1);
  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Get project data for each row and create unique distributions
  const { row1Projects, row2Projects, row3Projects } = useMemo(() => {
    const allProjects = projects;
    
    if (allProjects.length === 0) {
      return {
        row1Projects: [],
        row2Projects: [],
        row3Projects: [],
      };
    }
    
    // Helper function to rotate array deterministically
    const rotateArray = <T,>(array: T[], offset: number): T[] => {
      if (array.length === 0) return array;
      const rotated = [...array];
      for (let i = 0; i < offset; i++) {
        rotated.push(rotated.shift()!);
      }
      return rotated;
    };
    
    // Calculate optimal offsets to minimize duplicates on screen
    // With ~3-4 projects visible per row, we want to offset by at least that amount
    const offset1 = 0; // Row 1: Original order
    const offset2 = Math.max(4, Math.floor(allProjects.length / 3)); // Row 2: Offset by ~1/3 or at least 4
    const offset3 = Math.max(7, Math.floor(allProjects.length * 2 / 3)); // Row 3: Offset by ~2/3 or at least 7
    
    // Create unique distributions for each row to avoid duplicates on screen
    // Row 1: Original order
    const row1Base = [...allProjects];
    // Row 2: Rotated to show different projects
    const row2Base = rotateArray([...allProjects], offset2);
    // Row 3: Reversed and rotated for maximum variety
    const row3Base = rotateArray([...allProjects].reverse(), offset3);
    
    // Create three sets of projects for infinite scroll (repeat 3 times for seamless loop)
    return {
      row1Projects: [...row1Base, ...row1Base, ...row1Base],
      row2Projects: [...row2Base, ...row2Base, ...row2Base],
      row3Projects: [...row3Base, ...row3Base, ...row3Base],
    };
  }, [projects]);

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop scrolling animation
  useEffect(() => {
    if (isMobile) return;

    const positions = {
      row1: 0,
      row2: -33.333,
      row3: -16.666,
    };

    const uniformSpeed = 0.008;

    const animate = () => {
      positions.row1 -= uniformSpeed;
      if (positions.row1 <= -33.333) {
        positions.row1 = 0;
      }
      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${positions.row1}%)`;
      }

      positions.row2 += uniformSpeed;
      if (positions.row2 >= 0) {
        positions.row2 = -33.333;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${positions.row2}%)`;
      }

      positions.row3 -= uniformSpeed;
      if (positions.row3 <= -33.333) {
        positions.row3 = 0;
      }
      if (row3Ref.current) {
        row3Ref.current.style.transform = `translateX(${positions.row3}%)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  // Handle scroll events for fade effect (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const fadeStart = windowHeight * 0.2;
      const fadeEnd = windowHeight * 1.5;
      
      if (scrollPosition <= fadeStart) {
        setOpacity(1);
      } else if (scrollPosition >= fadeEnd) {
        setOpacity(0);
      } else {
        const fadeProgress = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Handle mouse movement for preview positioning (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Mobile Hero
  if (isMobile) {
    return (
      <section className="min-h-screen bg-ink flex flex-col">
        {/* Hero Content */}
        <div className="flex-1 flex flex-col justify-center px-4 pt-24 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Title */}
            <div>
              <h1 className="text-4xl font-semibold text-chalk leading-tight">
                Ethan Rogers
              </h1>
              <p className="text-xl text-chalk/60 mt-2">
                UX Designer & Front End Developer
              </p>
            </div>

            {/* Description */}
            <p className="text-chalk/50 text-lg leading-relaxed">
              Creating award-winning digital experiences from concept to code. 5+ years of designing and building enterprise platforms.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/work"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-chalk text-ink font-semibold transition-all"
              >
                View My Work
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/chat"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-chalk/[0.05] border border-chalk/[0.1] text-chalk font-medium transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#0087ef]" />
                Try My Chatbot
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Project Carousel */}
        <div className="pb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xs font-mono uppercase tracking-[0.2em] text-chalk/40 px-4 mb-4"
          >
            Featured Projects
          </motion.p>
          
          <motion.div
            ref={carouselRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.slice(0, 6).map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className={`flex-shrink-0 snap-start ${index === 0 ? 'ml-4' : ''} ${index === projects.slice(0, 6).length - 1 ? 'mr-4' : ''}`}
              >
                <div className="w-72 aspect-video relative rounded-2xl overflow-hidden group">
                  <Image
                    src={project.images.hero}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-active:scale-105"
                    sizes="288px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-chalk font-medium text-sm line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-chalk/60 text-xs mt-1 line-clamp-1">
                      {project.tags.slice(0, 2).join(" • ")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // Desktop Hero (Scrolling Images)
  return (
    <>
      <div 
        ref={heroRef}
        className="fixed inset-0 h-screen bg-chalk transition-opacity duration-100 ease-linear z-0"
        style={{ opacity }}
      >
        {/* Scrolling Image Rows */}
        <div className="absolute inset-0 flex flex-col gap-4 py-4">
          {/* Top Row */}
          <div className="flex-1 relative overflow-hidden">
            <div 
              ref={row1Ref}
              className="flex h-full w-[300%] will-change-transform"
            >
              {row1Projects.map((project, index) => (
                <Link 
                  key={`row1-${index}`}
                  href={`/projects/${project.slug}`}
                  className="flex-shrink-0 relative mr-4 h-full aspect-video rounded-2xl overflow-hidden z-20 cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <Image
                    src={project.images.hero}
                    alt={project.title}
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                    sizes="33vw"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Middle Row */}
          <div className="flex-1 relative overflow-hidden">
            <div 
              ref={row2Ref}
              className="flex h-full w-[300%] will-change-transform"
              style={{ transform: 'translateX(-33.333%)' }}
            >
              {row2Projects.map((project, index) => (
                <Link 
                  key={`row2-${index}`}
                  href={`/projects/${project.slug}`}
                  className="flex-shrink-0 relative mr-4 h-full aspect-video rounded-2xl overflow-hidden z-20 cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <Image
                    src={project.images.hero}
                    alt={project.title}
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                    sizes="33vw"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex-1 relative overflow-hidden">
            <div 
              ref={row3Ref}
              className="flex h-full w-[300%] will-change-transform"
              style={{ transform: 'translateX(-16.666%)' }}
            >
              {row3Projects.map((project, index) => (
                <Link 
                  key={`row3-${index}`}
                  href={`/projects/${project.slug}`}
                  className="flex-shrink-0 relative mr-4 h-full aspect-video rounded-2xl overflow-hidden z-20 cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <Image
                    src={project.images.hero}
                    alt={project.title}
                    fill
                    className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                    sizes="33vw"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for scroll effect - outside fixed container */}
      <div className="relative z-10 pointer-events-none" style={{ height: '200vh' }}></div>

      {/* Hover Preview */}
      {hoveredProject && (
        <div 
          className="fixed pointer-events-none z-[50]"
          style={{
            left: (() => {
              const previewWidth = 430;
              const offset = 15;
              const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
              if (mousePosition.x + offset + previewWidth > windowWidth) {
                return mousePosition.x - previewWidth - offset;
              }
              return mousePosition.x + offset;
            })(),
            top: (() => {
              const previewHeight = 320;
              const offset = 10;
              const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
              if (mousePosition.y + offset + previewHeight > windowHeight) {
                return mousePosition.y - previewHeight - offset;
              }
              return mousePosition.y + offset;
            })(),
          }}
        >
          <div className="bg-chalk/95 backdrop-blur-lg border border-ink/10 rounded-xl p-4 shadow-xl">
            <div className="w-96 aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={hoveredProject.images.preview 
                  || (hoveredProject.images.gallery && hoveredProject.images.gallery.length > 0 
                    ? hoveredProject.images.gallery[0] 
                    : hoveredProject.images.hero)}
                alt={`${hoveredProject.title} preview`}
                fill
                className="object-cover"
                sizes="384px"
              />
            </div>
            <div className="mt-4 px-1">
              <h3 className="text-lg font-medium text-ink">
                {hoveredProject.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
