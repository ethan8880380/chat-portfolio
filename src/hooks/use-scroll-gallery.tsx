"use client";

import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollGalleryProps {
  sectionRef: RefObject<HTMLElement>;
  galleryRef: RefObject<HTMLElement>;
  middleImageRef: RefObject<HTMLElement>;
  topRowSelector: string;
  middleRowSelector: string;
  bottomRowSelector: string;
  horizontalScrollAmount?: string;
  centerImageScale?: number;
}

export function useScrollGallery({
  sectionRef,
  galleryRef,
  middleImageRef,
  topRowSelector,
  middleRowSelector,
  bottomRowSelector,
  horizontalScrollAmount = "-20%",
  centerImageScale = 1.5,
}: UseScrollGalleryProps) {
  useEffect(() => {
    if (!sectionRef.current || !galleryRef.current || !middleImageRef.current) return;

    const section = sectionRef.current;
    const gallery = galleryRef.current;
    const middleImage = middleImageRef.current;

    // Create a timeline for the animation sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        markers: false, // Set to true for debugging
      },
    });

    // Horizontal scroll animations for top and bottom rows
    const topRowElements = gallery.querySelectorAll(topRowSelector);
    const bottomRowElements = gallery.querySelectorAll(bottomRowSelector);

    if (topRowElements.length) {
      // Animate top row to scroll left
      tl.to(topRowElements, {
        x: horizontalScrollAmount,
        ease: "none",
      }, 0);
    }

    if (bottomRowElements.length) {
      // Animate bottom row to scroll right
      tl.to(bottomRowElements, {
        x: Math.abs(parseInt(horizontalScrollAmount)) + "%",
        ease: "none",
      }, 0);
    }

    // Scale the middle image to full width
    tl.to(middleImage, {
      width: "100%",
      height: "auto",
      maxWidth: "100vw",
      borderRadius: "0",
      margin: "0",
      scale: centerImageScale,
      ease: "power2.inOut",
    }, 0.3);

    // Clean up on unmount
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [
    sectionRef, 
    galleryRef, 
    middleImageRef, 
    topRowSelector, 
    middleRowSelector,
    bottomRowSelector,
    horizontalScrollAmount,
    centerImageScale
  ]);
}

export default useScrollGallery; 