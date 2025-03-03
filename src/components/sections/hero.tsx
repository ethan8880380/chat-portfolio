"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeroProps {
  chatResponse?: string;
  selectedImage?: string;
  isInitialState: boolean;
}

export function Hero({ chatResponse, selectedImage, isInitialState }: HeroProps) {
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  
  const heroText = "UX Designer and researcher with significant front-end programming expertise, building award-winning, customer-facing, and internal platforms";
  const words = heroText.split(' ');
  
  // Refs for GSAP animations
  const lineRef = useRef<HTMLDivElement>(null);
  
  // Word reveal animation
  useEffect(() => {
    if (isInitialState) {
      const wordRevealInterval = setInterval(() => {
        setVisibleWords(prev => {
          if (prev.length >= words.length) {
            clearInterval(wordRevealInterval);
            return prev;
          }
          return [...prev, prev.length];
        });
      }, 80);
      
      return () => clearInterval(wordRevealInterval);
    }
  }, [words.length, isInitialState]);
  
  // Line animation after words are revealed
  useEffect(() => {
    if (visibleWords.length === words.length && lineRef.current && isInitialState) {
      gsap.to(lineRef.current, {
        width: "100%",
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.2
      });
    }
  }, [visibleWords.length, words.length, isInitialState]);

  return (
    <section className="min-h-[calc(100vh-12rem)] px-6 pt-40">
      <AnimatePresence mode="wait">
        {isInitialState ? (
          <motion.div
            key="initial"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 gap-y-8"
          >
            <div className="col-span-4 grid grid-cols-4 gap-3">
              <h1 className="text-5xl leading-tight col-span-3 font-semibold">
                {words.map((word, index) => (
                  <span 
                    key={index}
                    className={`inline-block mr-[0.25em] transition-all duration-300 ${
                      visibleWords.includes(index) 
                        ? 'opacity-100 transform-none' 
                        : 'opacity-0 translate-y-5'
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <div 
                ref={lineRef} 
                className="col-span-1 h-full w-full border-b"
                style={{ width: '0%' }}
              ></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg leading-relaxed"
              >
                {chatResponse}
              </motion.p>
            </div>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-foreground/10 rounded-lg overflow-hidden aspect-video"
              >
                <img 
                  src={selectedImage} 
                  alt="Response visual" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
