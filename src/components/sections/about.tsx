"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Mail, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  images: ImageProps[];
};

export type AboutSectionProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const AboutSection = (props: AboutSectionProps) => {
  const { tagline, heading, description, images } = {
    ...AboutSectionDefaults,
    ...props,
  };

  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  // Track when section is in view for fixed positioning
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsInView(latest > 0.1 && latest < 0.9);
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Text fades in early, stays visible, fades out near end
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.7, 0.85], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.2, 0.7, 0.85], [0.95, 1, 1, 0.95]);

  // Create all transform hooks at the top level, unconditionally
  // Mobile transforms - images spread outward
  const mobileTranslateX1 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "150%"]);
  const mobileTranslateY1 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "100%"]);
  const mobileRotateZ1 = useTransform(scrollYProgress, [0.25, 0.9], ["0deg", "6deg"]);
  const mobileTranslateX2 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "-150%"]);
  const mobileTranslateY2 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "-100%"]);
  const mobileRotateZ2 = useTransform(scrollYProgress, [0.25, 0.9], ["0deg", "6deg"]);
  const mobileTranslateX3 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "180%"]);
  const mobileTranslateY3 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "-70%"]);
  const mobileRotateZ3 = useTransform(scrollYProgress, [0.25, 0.9], ["0deg", "-8deg"]);
  const mobileTranslateX4 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "-180%"]);
  const mobileTranslateY4 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "70%"]);
  const mobileRotateZ4 = useTransform(scrollYProgress, [0.25, 0.9], ["0deg", "10deg"]);

  // Desktop transforms - images spread wider
  const desktopTranslateX1 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "140%"]);
  const desktopTranslateY1 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "80%"]);
  const desktopRotateZ1 = useTransform(scrollYProgress, [0.25, 0.9], ["0deg", "-6deg"]);
  const desktopTranslateX2 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "-70%"]);
  const desktopTranslateY2 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "-100%"]);
  const desktopRotateZ2 = useTransform(scrollYProgress, [0.25, 0.9], ["0deg", "6deg"]);
  const desktopTranslateX3 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "160%"]);
  const desktopTranslateY3 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "-50%"]);
  const desktopRotateZ3 = useTransform(scrollYProgress, [0.25, 0.9], ["0deg", "-15deg"]);
  const desktopTranslateX4 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "-160%"]);
  const desktopTranslateY4 = useTransform(scrollYProgress, [0.25, 0.9], ["0%", "80%"]);
  const desktopRotateZ4 = useTransform(scrollYProgress, [0.25, 0.9], ["0deg", "12deg"]);

  // Create image transforms by selecting the appropriate pre-calculated values
  const imageTransforms = useMemo(() => [
    {},
    {
      translateX: isMobile ? mobileTranslateX1 : desktopTranslateX1,
      translateY: isMobile ? mobileTranslateY1 : desktopTranslateY1,
      rotateZ: isMobile ? mobileRotateZ1 : desktopRotateZ1,
    },
    {
      translateX: isMobile ? mobileTranslateX2 : desktopTranslateX2,
      translateY: isMobile ? mobileTranslateY2 : desktopTranslateY2,
      rotateZ: isMobile ? mobileRotateZ2 : desktopRotateZ2,
    },
    {
      translateX: isMobile ? mobileTranslateX3 : desktopTranslateX3,
      translateY: isMobile ? mobileTranslateY3 : desktopTranslateY3,
      rotateZ: isMobile ? mobileRotateZ3 : desktopRotateZ3,
    },
    {
      translateX: isMobile ? mobileTranslateX4 : desktopTranslateX4,
      translateY: isMobile ? mobileTranslateY4 : desktopTranslateY4,
      rotateZ: isMobile ? mobileRotateZ4 : desktopRotateZ4,
    },
  ], [
    isMobile,
    mobileTranslateX1, mobileTranslateY1, mobileRotateZ1, 
    mobileTranslateX2, mobileTranslateY2, mobileRotateZ2,
    mobileTranslateX3, mobileTranslateY3, mobileRotateZ3,
    mobileTranslateX4, mobileTranslateY4, mobileRotateZ4,
    desktopTranslateX1, desktopTranslateY1, desktopRotateZ1,
    desktopTranslateX2, desktopTranslateY2, desktopRotateZ2,
    desktopTranslateX3, desktopTranslateY3, desktopRotateZ3,
    desktopTranslateX4, desktopTranslateY4, desktopRotateZ4
  ]);

  return (
    <section ref={aboutRef} id="about" className="relative bg-ink -mt-7 h-[300vh] hidden md:block">
      {/* Fixed text content - stays centered when section is in view */}
      {isInView && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none"
          style={{ opacity: textOpacity, scale: textScale }}
        >
          <div className="py-16 text-center md:py-24 lg:py-28 px-4 md:px-6 pointer-events-auto">
            <div className="max-w-4xl mx-auto w-full">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0087ef] mb-6 block">
                {tagline}
              </span>
              <h1 className="text-3xl md:text-6xl font-semibold leading-tight tracking-tight mb-6 text-chalk">
                {heading}
              </h1>
              <p className="text-lg md:text-xl text-chalk/60 leading-relaxed max-w-3xl mx-auto">
                {description}
              </p>
              
              {/* Education Badge */}
              <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-full bg-chalk/[0.03] border border-chalk/[0.08]">
                <GraduationCap className="w-5 h-5 text-[#0087ef]" />
                <span className="text-sm text-chalk/70">
                  <span className="text-chalk font-medium">University of Washington</span> · BDes Interaction Design
                </span>
              </div>

              <div className="mt-8 flex items-center justify-center gap-4">
                <Link 
                  href="/chat"
                  className="px-8 py-4 rounded-full bg-chalk text-ink font-semibold hover:bg-chalk/90 transition-all"
                >
                  View Chatbot
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-chalk/[0.03] border border-chalk/[0.08] text-chalk hover:bg-chalk/[0.06] hover:border-[#0087ef]/30 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Images - animate based on scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute w-full max-w-[45vw] md:max-w-[35vw] lg:max-w-[30vw] shadow-2xl"
            style={imageTransforms[index]}
          >
            <div className="relative rounded-2xl overflow-hidden border border-chalk/10">
              <Image 
                src={image.src} 
                alt={image.alt || ""} 
                className="size-full object-cover"
                width={500}
                height={500} 
              />
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export const AboutSectionDefaults: Props = {
  tagline: "About Me",
  heading: "Excellent Designer, Mediocre Golfer",
  description:
    "I spend my workdays crafting thoughtful, user-centered digital experiences at Kimberly-Clark. " +
    "Outside of work, you'll usually find me on the golf course, " +
    "playing tennis, or diving into baseball stats. I'm a proud lifelong fan and Alumni of the " +
    "University of Washington—Go Huskies!",
  images: [
    {
      src: "/projectImages/about/baby.png",
      alt: "Baby photo",
    },
    {
      src: "/projectImages/about/guitar.png",
      alt: "Playing guitar",
    },
    {
      src: "/projectImages/about/golf.png",
      alt: "Golfing",
    },
    {
      src: "/projectImages/about/me.png",
      alt: "Profile photo",
    },
    {
      src: "/projectImages/about/husky.png",
      alt: "UW Husky",
    },
  ],
};
