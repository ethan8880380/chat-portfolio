"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  animation?: "fadeUp" | "slideLeft" | "slideRight" | "scale" | "splitText";
  duration?: number;
  delay?: number;
  stagger?: number;
}

export function ScrollAnimation({
  children,
  className,
  trigger,
  start = "top 80%",
  end = "bottom 20%",
  scrub = true,
  animation = "fadeUp",
  duration = 0.8,
  delay = 0,
  stagger = 0.1,
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const textElement = textRef.current;
    
    if (!element) return;

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger ? trigger : element,
        start,
        end,
        scrub,
        markers: false, // Set to true for debugging
      }
    });

    // Different animation types
    switch (animation) {
      case "fadeUp":
        gsap.set(element, { opacity: 0, y: 50 });
        tl.to(element, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out"
        });
        break;

      case "slideLeft":
        gsap.set(element, { opacity: 0, x: 100 });
        tl.to(element, {
          opacity: 1,
          x: 0,
          duration,
          delay,
          ease: "power2.out"
        });
        break;

      case "slideRight":
        gsap.set(element, { opacity: 0, x: -100 });
        tl.to(element, {
          opacity: 1,
          x: 0,
          duration,
          delay,
          ease: "power2.out"
        });
        break;

      case "scale":
        gsap.set(element, { opacity: 0, scale: 0.8 });
        tl.to(element, {
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease: "power2.out"
        });
        break;

      case "splitText":
        if (textElement) {
          // Split text into characters
          const text = textElement.textContent || "";
          const chars = text.split("").map(char => 
            char === " " ? "&nbsp;" : char
          );
          
          textElement.innerHTML = chars
            .map(char => `<span class="inline-block">${char}</span>`)
            .join("");

          const charElements = textElement.querySelectorAll("span");
          
          gsap.set(charElements, { 
            opacity: 0, 
            y: 50,
            scale: 0.8 
          });
          
          tl.to(charElements, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: {
              amount: stagger,
              from: "start"
            },
            ease: "back.out(1.7)"
          });
        }
        break;

      default:
        gsap.set(element, { opacity: 0, y: 50 });
        tl.to(element, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power2.out"
        });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, [trigger, start, end, scrub, animation, duration, delay, stagger]);

  if (animation === "splitText") {
    return (
      <div ref={elementRef} className={cn("scroll-animation", className)}>
        <div ref={textRef}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={elementRef} className={cn("scroll-animation", className)}>
      {children}
    </div>
  );
}

// Additional component for gradient background animation
export function ScrollGradientTrigger({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    // Create gradient animation similar to your image
    const _tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".gradient_trigger.top",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        markers: false,
      }
    });

    // You can add gradient animations here
    // This would work with a gradient background element

    return () => {
      ScrollTrigger.getAll().forEach(scrollTrigger => {
        if (scrollTrigger.trigger === trigger) {
          scrollTrigger.kill();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={triggerRef} 
      className={cn("gradient_trigger top", className)}
    >
      <div className="gradient_wrapper">
        {children}
      </div>
    </div>
  );
} 