"use client"

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, easeInOut, useSpring } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Updated gallery images with detailed descriptions
// Commented out unused variable
// const galleryImages = [
// ... existing code ...

// Combined gallery images with mobile and desktop image sources
const galleryImages = [
  { 
    id: 1, 
    src: {
      desktop: "/projectImages/desktop/design-system.png",
      mobile: "/projectImages/eds.png"
    },
    alt: "Design System",
    title: "Enterprise Design System",
    description: "Company-wide enterprise design system for Kimberly-Clark. Research, design, and development all done by me.",
    color: "bg-purple-500"
  },
  { 
    id: 2, 
    src: {
      desktop: "/projectImages/desktop/gen-fei.png",
      mobile: "/myself.png"
    },
    alt: "AI Chatbot",
    title: "GenFEI Chatbot",
    description: "Complex AI chatbot connected to a multiple different knowledge bases. Design, Frontend Development.",
    color: "bg-green-500"
  },
  { 
    id: 3, 
    src: {
      desktop: "/projectImages/desktop/IRIS.png",
      mobile: "/myself.png"
    },
    alt: "Analytic Dashboard",
    title: "IRIS",
    description: "Complex analytic dashboard focusing on new ways to visualize data and plan promotions.",
    color: "bg-yellow-500"
  },
  { 
    id: 4, 
    src: {
      desktop: "/projectImages/desktop/web-templates.png",
      mobile: "/myself.png"
    },
    alt: "Consumer Website",
    title: "Web Templates",
    description: "Standardized web templates for Kimberly-Clark consumer websites.",
    color: "bg-red-500"
  },
  { 
    id: 5, 
    src: {
      desktop: "/projectImages/desktop/pull-ups-research.png",
      mobile: "/myself.png"
    },
    alt: "Pull Ups Research",
    title: "Pull Ups Research",
    description: "Research and Prototypes for a PullUps potty training mobile app.",
    color: "bg-indigo-500"
  },
  { 
    id: 6, 
    src: {
      desktop: "/projectImages/desktop/buyer-spring.png",
      mobile: "/projectImages/desktop/buyer-spring.png"
    },
    alt: "Real Estate Website",
    title: "BuyerSpring",
    description: "Real estate website focused on a new way to buy and sell homes.",
    color: "bg-pink-500"
  },
  { 
    id: 7, 
    src: {
      desktop: "/projectImages/desktop/huggies.png",
      mobile: "/myself.png"
    },
    alt: "Huggies Website",
    title: "Huggies Website",
    description: "Redesigned the Huggies website to be more user-friendly and engaging.",
    color: "bg-orange-500"
  },
  { 
    id: 8, 
    src: {
      desktop: "/projectImages/desktop/defoor.png",
      mobile: "/myself.png"
    },
    alt: "Defoor Development",
    title: "Defoor Development",
    description: "Custom website for Defoor Property Development showcasing their work and services.",
    color: "bg-red-500"
  }
];

export function NewGallery() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  // Create state for the current set of gallery images
  const [currentGalleryImages] = useState(galleryImages);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Phase 1: Scaling animation (first 35% of scroll)
  const { scrollYProgress: scaleProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "35% center"]
  });

  // Phase 2: Individual image transitions (remaining 65% of scroll)
  const { scrollYProgress: slideProgress } = useScroll({
    target: containerRef,
    offset: ["35% center", "95% center"]
  });

  // Card animation - appears before images
  const { scrollYProgress: cardProgress } = useScroll({
    target: containerRef,
    offset: ["30% center", "40% center"]
  });

  // Combined horizontal movement (first phase)
  const { scrollYProgress: horizontalProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "40% end"]
  });

  // Scale animation values
  const rawScale = useTransform(
    scaleProgress, 
    [0, 0.3, 0.6, 0.8, 1],
    [1, 1.5, 2.2, 2.8, 3.6],
    { ease: easeInOut }
  );
  const scale = useSpring(rawScale, { stiffness: 100, damping: 20 });
  
  // Horizontal row movement for first phase
  const rawTopRowX = useTransform(
    horizontalProgress, 
    [0, 1], 
    [0, isMobile ? -300 : -600],
    { ease: easeInOut }
  );
  const topRowX = useSpring(rawTopRowX, { stiffness: 100, damping: 20 });
  
  const rawBottomRowX = useTransform(
    horizontalProgress, 
    [0, 1], 
    [0, isMobile ? 300 : 600],
    { ease: easeInOut }
  );
  const bottomRowX = useSpring(rawBottomRowX, { stiffness: 100, damping: 20 });

  // Create more evenly distributed animation ranges for the 8 images
  // Each image gets approximately 12% of the scroll range - adjusted to ensure image is fully visible with card
  
  // Image 1: 0% - 13% of scroll (with 3% slide-up time)
  const rawSlideImage1 = useTransform(
    slideProgress,
    [0, 0.07, 0.07 + 0.03, 0.13, 1],
    ["100vh", "100vh", "0vh", "0vh", "0vh"],
    { ease: easeInOut }
  );
  const slideImage1 = useSpring(rawSlideImage1, { stiffness: 100, damping: 20 });

  // Image 2: 12.5% - 25% of scroll (with 3% slide-up time)
  const rawSlideImage2 = useTransform(
    slideProgress,
    [0, 0.125, 0.125 + 0.03, 0.25, 1],
    ["100vh", "100vh", "0vh", "0vh", "0vh"],
    { ease: easeInOut }
  );
  const slideImage2 = useSpring(rawSlideImage2, { stiffness: 100, damping: 20 });

  // Image 3: 25% - 37.5% of scroll (with 3% slide-up time)
  const rawSlideImage3 = useTransform(
    slideProgress,
    [0, 0.25, 0.25 + 0.03, 0.375, 1],
    ["100vh", "100vh", "0vh", "0vh", "0vh"],
    { ease: easeInOut }
  );
  const slideImage3 = useSpring(rawSlideImage3, { stiffness: 100, damping: 20 });

  // Image 4: 37.5% - 50% of scroll (with 3% slide-up time)
  const rawSlideImage4 = useTransform(
    slideProgress,
    [0, 0.375, 0.375 + 0.03, 0.5, 1],
    ["100vh", "100vh", "0vh", "0vh", "0vh"],
    { ease: easeInOut }
  );
  const slideImage4 = useSpring(rawSlideImage4, { stiffness: 100, damping: 20 });

  // Image 5: 50% - 62.5% of scroll (with 3% slide-up time)
  const rawSlideImage5 = useTransform(
    slideProgress,
    [0, 0.5, 0.5 + 0.03, 0.625, 1],
    ["100vh", "100vh", "0vh", "0vh", "0vh"],
    { ease: easeInOut }
  );
  const slideImage5 = useSpring(rawSlideImage5, { stiffness: 100, damping: 20 });

  // Image 6: 62.5% - 75% of scroll (with 3% slide-up time)
  const rawSlideImage6 = useTransform(
    slideProgress,
    [0, 0.625, 0.625 + 0.03, 0.75, 1],
    ["100vh", "100vh", "0vh", "0vh", "0vh"],
    { ease: easeInOut }
  );
  const slideImage6 = useSpring(rawSlideImage6, { stiffness: 100, damping: 20 });

  // Image 7: 75% - 87.5% of scroll (with 3% slide-up time)
  const rawSlideImage7 = useTransform(
    slideProgress,
    [0, 0.75, 0.75 + 0.03, 0.875, 1],
    ["100vh", "100vh", "0vh", "0vh", "0vh"],
    { ease: easeInOut }
  );
  const slideImage7 = useSpring(rawSlideImage7, { stiffness: 100, damping: 20 });
  
  // Image 8: 87.5% - 100% of scroll - with proper slide-up animation
  const rawSlideImage8 = useTransform(
    slideProgress,
    [0, 0.875, 0.875 + 0.03, 1],
    ["100vh", "100vh", "0vh", "0vh"],
    { ease: easeInOut }
  );
  const slideImage8 = useSpring(rawSlideImage8, { stiffness: 100, damping: 20 });

  // Card slide-up animation (appears before the images)
  const rawCardSlideY = useTransform(
    cardProgress, 
    [0, 0.3, 0.6, 1], 
    ["100vh", "0vh", "0vh", "0vh"],
    { ease: easeInOut }
  );
  const cardSlideY = useSpring(rawCardSlideY, { stiffness: 100, damping: 20 });

  // Initial card content visibility (shown when card first appears)
  const rawInitialContentVisibility = useTransform(
    slideProgress,
    [0.03, 0.05],
    [1, 0],
    { ease: easeInOut }
  );
  const initialContentVisibility = useSpring(rawInitialContentVisibility, { stiffness: 100, damping: 20 });

  // Raw transforms for X positions with spring applied later - updated to match new visibility timing
  const rawContentX1 = useTransform(slideProgress, [0, 0.07, 0.11, 0.13], ["100%", "0%", "0%", "-100%"]);
  const rawContentX2 = useTransform(slideProgress, [0.125, 0.15, 0.23, 0.26], ["100%", "0%", "0%", "-100%"]);
  const rawContentX3 = useTransform(slideProgress, [0.25, 0.28, 0.36, 0.39], ["100%", "0%", "0%", "-100%"]);
  const rawContentX4 = useTransform(slideProgress, [0.375, 0.41, 0.48, 0.51], ["100%", "0%", "0%", "-100%"]);
  const rawContentX5 = useTransform(slideProgress, [0.5, 0.53, 0.61, 0.64], ["100%", "0%", "0%", "-100%"]);
  const rawContentX6 = useTransform(slideProgress, [0.625, 0.66, 0.73, 0.76], ["100%", "0%", "0%", "-100%"]);
  const rawContentX7 = useTransform(slideProgress, [0.75, 0.78, 0.86, 0.89], ["100%", "0%", "0%", "-100%"]);
  // Commented out unused variable
  // const rawContentX8 = useTransform(slideProgress, [0.875, 0.9, 0.98, 1], ["100%", "0%", "0%", "0%"]);

  // Apply spring to content transitions for subtle bounce
  const contentX1 = useSpring(rawContentX1, { stiffness: 120, damping: 20, mass: 0.5 });
  const contentX2 = useSpring(rawContentX2, { stiffness: 120, damping: 20, mass: 0.5 });
  const contentX3 = useSpring(rawContentX3, { stiffness: 120, damping: 20, mass: 0.5 });
  const contentX4 = useSpring(rawContentX4, { stiffness: 120, damping: 20, mass: 0.5 });
  const contentX5 = useSpring(rawContentX5, { stiffness: 120, damping: 20, mass: 0.5 });
  const contentX6 = useSpring(rawContentX6, { stiffness: 120, damping: 20, mass: 0.5 });
  const contentX7 = useSpring(rawContentX7, { stiffness: 120, damping: 20, mass: 0.5 });
  const contentX8 = useSpring(
    useTransform(
      slideProgress, 
      [0.875, 0.88, 0.98, 1], 
      ["100%", "0%", "0%", "0%"]
    ), 
    { stiffness: 120, damping: 20, mass: 0.5 }
  );

  // Adjusted content visibility to match new timings - fixing the timing so cards don't disappear before images fully arrive
  const contentVisibility1 = useTransform(slideProgress, [0.01, 0.04, 0.11, 0.13], [0, 1, 1, 0]);
  const contentVisibility2 = useTransform(slideProgress, [0.125, 0.15, 0.23, 0.26], [0, 1, 1, 0]);
  const contentVisibility3 = useTransform(slideProgress, [0.25, 0.28, 0.36, 0.39], [0, 1, 1, 0]);
  const contentVisibility4 = useTransform(slideProgress, [0.375, 0.41, 0.48, 0.51], [0, 1, 1, 0]);
  const contentVisibility5 = useTransform(slideProgress, [0.5, 0.53, 0.61, 0.64], [0, 1, 1, 0]);
  const contentVisibility6 = useTransform(slideProgress, [0.625, 0.66, 0.73, 0.76], [0, 1, 1, 0]);
  const contentVisibility7 = useTransform(slideProgress, [0.75, 0.78, 0.86, 0.89], [0, 1, 1, 0]);
  const contentVisibility8 = useTransform(slideProgress, [0.875, 0.88, 1, 1], [0, 1, 1, 1]);

  // Improved z-index management for proper stacking
  const zIndex1 = useTransform(slideProgress, [0, 0.125], [10, 5]);
  const zIndex2 = useTransform(slideProgress, [0, 0.125, 0.25], [5, 20, 5]);
  const zIndex3 = useTransform(slideProgress, [0, 0.25, 0.375], [5, 30, 5]);
  const zIndex4 = useTransform(slideProgress, [0, 0.375, 0.5], [5, 40, 5]);
  const zIndex5 = useTransform(slideProgress, [0, 0.5, 0.625], [5, 50, 5]);
  const zIndex6 = useTransform(slideProgress, [0, 0.625, 0.75], [5, 60, 5]);
  const zIndex7 = useTransform(slideProgress, [0, 0.75, 0.875], [5, 70, 5]);
  const zIndex8 = useTransform(slideProgress, [0, 0.875], [5, 90]);  // Last image gets highest z-index

  // Slide positions for each image
  const slidePositions = [
    slideImage1, slideImage2, slideImage3, slideImage4,
    slideImage5, slideImage6, slideImage7, slideImage8
  ];

  // Content x positions for animations
  const contentPositions = [
    contentX1, contentX2, contentX3, contentX4,
    contentX5, contentX6, contentX7, contentX8
  ];

  // Content visibility values
  const contentVisibilities = [
    contentVisibility1, contentVisibility2, contentVisibility3, contentVisibility4,
    contentVisibility5, contentVisibility6, contentVisibility7, contentVisibility8
  ];

  // Z-index values for proper stacking
  const zIndexValues = [
    zIndex1, zIndex2, zIndex3, zIndex4,
    zIndex5, zIndex6, zIndex7, zIndex8
  ];

  return (
    <>
      {/* Main scrolling section */}
      <section 
        ref={containerRef} 
        aria-label="Project Gallery" 
        className="relative h-[800vh]"
      >
        {/* Sticky container */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
          {/* Phase 1: Scaling content - Regular gallery */}
          <motion.div
            ref={sectionRef}
            style={{ scale }}
            className="absolute w-full h-full flex items-center justify-center p-4 md:p-8"
          >
            <div className="flex flex-col gap-2 md:gap-6 max-w-[100vw]">
              {/* Top row - scrolls left */}
              <motion.div 
                style={{ x: topRowX }}
                className="flex gap-2 md:gap-6 w-full"
              >
                {currentGalleryImages.slice(0, 4).map((image) => (
                  <div 
                    key={image.id} 
                    className={`relative min-w-[30vw] aspect-video backdrop-blur-sm mt-12`}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <div className="aspect-video w-full h-full relative">
                        <Image
                          src={isMobile ? image.src.mobile : image.src.desktop}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover"
                          style={{ objectPosition: '50% 10%' }}
                          quality={100}
                          loading="eager"
                          priority={image.id <= 4}
                          unoptimized={image.src.desktop.endsWith('.gif')}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {currentGalleryImages.slice(0, 4).map((image) => (
                  <div 
                    key={`dup-${image.id}`} 
                    className={`relative min-w-[70vw] md:min-w-[30vw] backdrop-blur-sm`}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <div className="aspect-video w-full h-full relative">
                        <Image
                          src={isMobile ? image.src.mobile : image.src.desktop}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover"
                          style={{ objectPosition: '50% 10%' }}
                          quality={100}
                          loading="lazy"
                          unoptimized={image.src.desktop.endsWith('.gif')}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Middle row - static */}
              <div className="flex items-center justify-center gap-2 md:gap-6 w-full">
                {currentGalleryImages.slice(4, 7).map((image, index) => {
                  // Special case for the middle image (index 1)
                  if (index === 1) {
                    return (
                      <div 
                        key="custom-middle-image" 
                        className={`relative flex-1 min-w-[33vw] aspect-video backdrop-blur-sm`}
                      >
                        <div className="relative w-full h-full overflow-hidden">
                          <div className="aspect-video w-full h-full relative">
                            <Image
                              src="/projectImages/desktop/comm-analytics.png" 
                              alt="Ethan's Portrait"
                              fill
                              sizes="40vw"
                              className="object-cover"
                              style={{ objectPosition: '50% 50%' }}
                              quality={100}
                              loading="eager"
                              priority
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                  // Regular gallery images for the other positions
                  return (
                    <div 
                      key={image.id} 
                      className={`relative flex-1 min-w-[33vw] aspect-video backdrop-blur-sm`}
                    >
                      <div className="relative w-full h-full overflow-hidden">
                        <div className="aspect-video w-full h-full relative">
                          <Image
                            src={isMobile ? image.src.mobile : image.src.desktop}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                            style={{ objectPosition: '50% 10%' }}
                            quality={90}
                            loading="eager"
                            unoptimized={image.src.desktop.endsWith('.gif')}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom row - scrolls right */}
              <motion.div 
                style={{ x: bottomRowX }}
                className="flex flex-row-reverse gap-2 md:gap-6 w-full"
              >
                {currentGalleryImages.filter(img => [6,8,9].includes(img.id)).map((image) => (
                  <div 
                    key={`dup-${image.id}`} 
                    className={`relative min-w-[33vw] aspect-video backdrop-blur-sm`}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <div className="aspect-video w-full h-full relative">
                        <Image
                          src={isMobile ? image.src.mobile : image.src.desktop}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                          style={{ objectPosition: '50% 10%' }}
                          quality={100}
                          unoptimized={image.src.desktop.endsWith('.gif')}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {currentGalleryImages.slice(6, 8).concat(currentGalleryImages.slice(0, 2)).map((image) => (
                  <div 
                    key={`bottom-${image.id}`} 
                    className={`relative min-w-[30vw] aspect-video backdrop-blur-sm`}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <div className="aspect-video w-full h-full relative">
                        <Image
                          src={isMobile ? image.src.mobile : image.src.desktop}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 30vw"
                          className="object-cover"
                          style={{ objectPosition: '50% 10%' }}
                          quality={100}
                          unoptimized={image.src.desktop.endsWith('.gif')}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Phase 2: Info Card - slides up before the images */}
          <motion.div
            style={{ y: cardSlideY }}
            className="absolute bottom-0 md:bottom-8 left-0 right-0 mx-auto w-[100vw] md:right-8 md:left-auto md:w-[30vw] md:max-w-md md:min-w-[350px] h-auto z-[9000]"
          >
            <div className="w-full bg-background/70 backdrop-blur-sm overflow-hidden border rounded-lg">
              {/* Container for all animated content cards */}
              <div className="relative h-[300px] md:h-[400px] w-full">
                {/* Initial card content - shown when card first appears */}
                <motion.div
                  style={{ 
                    opacity: initialContentVisibility,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0
                  }}
                >
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex-1">
                      <div className="mb-4 text-primary font-semibold text-sm">
                        Project 1
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">
                        Commercial Analytics Hub
                      </h3>
                      <div className="w-16 h-1 bg-primary mb-6"></div>
                      <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                        GDUSA Award-winning internal analytics hub serving over 1,000 internal users weekly. Research, design, and development all done by me.
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <Button variant="ghost" className="hidden">
                        View Project
                        <ArrowUpRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Project-specific content */}
                {currentGalleryImages.map((image, index) => (
                  <motion.div
                    key={`info-${image.id}`}
                    style={{ 
                      x: contentPositions[index],
                      opacity: contentVisibilities[index],
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      top: 0,
                      left: 0
                    }}
                  >
                    <div className="p-8 flex flex-col h-full">
                      <div className="flex-1">
                        <div className="mb-4 text-primary font-semibold text-sm">
                          PROJECT {index + 2}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-black dark:text-white">
                          {image.title}
                        </h3>
                        <div className="w-16 h-1 bg-primary mb-6"></div>
                        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                          {image.description}
                        </p>
                      </div>
                      
                      <div className="mt-auto">
                        <button className="hidden">
                          View Project
                          <ArrowUpRight className="h-5 w-5 ml-2" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Phase 3: Individual images */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Fullscreen images - with responsive images for mobile/desktop */}
            {currentGalleryImages.map((image, index) => (
              <motion.div
                key={`slide-${image.id}`}
                style={{ 
                  y: slidePositions[index],
                  zIndex: zIndexValues[index]
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* Fullscreen image container */}
                <div className={`relative w-screen h-screen backdrop-blur-sm`}>
                  <div className="relative w-full h-full overflow-hidden rounded-lg">
                    <div className="aspect-video w-full h-full max-h-full flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={isMobile ? image.src.mobile : image.src.desktop}
                          alt={image.alt}
                          fill
                          sizes="100vw"
                          className="object-cover"
                          style={{ objectPosition: '50% 10%' }}
                          quality={100}
                          priority={isMobile ? index < 3 : index < 2}
                          loading={isMobile && index < 4 && !(isMobile ? index < 3 : index < 2) ? "eager" : undefined}
                          unoptimized={image.src.desktop.endsWith('.gif')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
