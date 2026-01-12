"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientScrollProps {
  className?: string;
}

export function GradientScroll({ className }: GradientScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values based on scroll progress
  const y = useTransform(scrollYProgress, [0, 1], [100, -20]);
  const height = useTransform(scrollYProgress, [0, 1], ["20%", "50%"]);

  return (
    <div 
      ref={containerRef}
      className={cn("relative h-fit overflow-hidden pointer-events-none", className)}
      style={{ 
        width: "110vw",
        marginLeft: "calc(-55vw + 50%)",
      }}
    >
      {/* Gradient Image */}
      <motion.img
        src="/gradient.png"
        alt=""
        className="object-cover"
        style={{
          y,
          height,
          width: "110vw",
        }}
        initial={{
          y: 100,
          height: "20%",
        }}
      />
      
      {/* Black gradient at bottom 10% to prevent white flash */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '10%',
          background: 'linear-gradient(to bottom, transparent 0%, black 100%)',
        }}
      />
    </div>
  );
}
