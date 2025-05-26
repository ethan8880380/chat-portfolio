"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import Image from "next/image";

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
  const { setShouldExpandChat } = useChatContext();
  const { tagline, heading, description, images } = {
    ...AboutSectionDefaults,
    ...props,
  };

  const [isMobile, setIsMobile] = useState(false);
  const aboutRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerMotion = {
    opacity: useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]),
    scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.95]),
  };

  // Create all transform hooks at the top level, unconditionally
  // Mobile transforms
  const mobileTranslateX1 = useTransform(scrollYProgress, [0, 1], ["20%", "120%"]);
  const mobileTranslateY1 = useTransform(scrollYProgress, [0, 1], ["15%", "100%"]);
  const mobileRotateZ1 = useTransform(scrollYProgress, [0, 1], ["0.6deg", "4deg"]);
  const mobileTranslateX2 = useTransform(scrollYProgress, [0, 1], ["-20%", "-120%"]);
  const mobileTranslateY2 = useTransform(scrollYProgress, [0, 1], ["-15%", "-100%"]);
  const mobileRotateZ2 = useTransform(scrollYProgress, [0, 1], ["-3deg", "4deg"]);
  const mobileTranslateX3 = useTransform(scrollYProgress, [0, 1], ["25%", "150%"]);
  const mobileTranslateY3 = useTransform(scrollYProgress, [0, 1], ["-10%", "-60%"]);
  const mobileRotateZ3 = useTransform(scrollYProgress, [0, 1], ["-0.6deg", "-6deg"]);
  const mobileTranslateX4 = useTransform(scrollYProgress, [0, 1], ["-25%", "-150%"]);
  const mobileTranslateY4 = useTransform(scrollYProgress, [0, 1], ["12%", "80%"]);
  const mobileRotateZ4 = useTransform(scrollYProgress, [0, 1], ["4.6deg", "8deg"]);

  // Desktop transforms
  const desktopTranslateX1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const desktopTranslateY1 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const desktopRotateZ1 = useTransform(scrollYProgress, [0, 1], ["0deg", "-4deg"]);
  const desktopTranslateX2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const desktopTranslateY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);
  const desktopRotateZ2 = useTransform(scrollYProgress, [0, 1], ["4deg", "4deg"]);
  const desktopTranslateX3 = useTransform(scrollYProgress, [0, 1], ["0%", "140%"]);
  const desktopTranslateY3 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const desktopRotateZ3 = useTransform(scrollYProgress, [0, 1], ["0deg", "-12deg"]);
  const desktopTranslateX4 = useTransform(scrollYProgress, [0, 1], ["0%", "-140%"]);
  const desktopTranslateY4 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const desktopRotateZ4 = useTransform(scrollYProgress, [0, 1], ["8deg", "8deg"]);

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
  
  const handleChatOpen = () => {
    setShouldExpandChat(true);
  };

  return (
    <section ref={aboutRef} id="about" className="relative flex flex-col min-h-screen">
      <motion.div
        className="sticky top-1/4 -translate-y-1/2 z-0 mx-auto flex min-h-0 items-center justify-center md:min-h-[auto]"
        style={containerMotion}
      >
        <div className="py-16 text-center md:py-24 lg:py-28">
          <div className="max-w-6xl mx-auto w-full">
            <p className="mb-3 text-foreground/50 font-semibold md:mb-4">{tagline}</p>
            <h1 className="heading-base mb-6">{heading}</h1>
            <p className="relative z-20 md:text-lg text-foreground/70">{description}</p>
            <div className="relative z-20 mt-6 flex items-center justify-center gap-x-4 md:mt-8">
              <Button onClick={handleChatOpen} size="lg">
                View Chatbot
              </Button>
              <a href="mailto:ethan0380@gmail.com" className="inline-block">
                <Button variant="outline" size="lg">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </Button>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 flex h-[100svh] flex-col justify-center sm:h-[120svh] md:h-[120svh] lg:h-[140vh] lg:justify-normal">
        <div className="relative flex size-full items-center justify-center overflow-visible">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="absolute w-full max-w-[45vw] md:max-w-[35vw] lg:max-w-[30vw] shadow-2xl"
              style={imageTransforms[index]}
            >
              <Image 
                src={image.src} 
                alt={image.alt || ""} 
                className="size-full object-cover rounded-lg"
                width={500}
                height={500} 
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 -z-10 mt-[80vh] sm:mt-[100vh]" />
    </section>
  );
};

export const AboutSectionDefaults: Props = {
  tagline: "About Me",
  heading: "Excelent Designer, Mediocre Golfer",
  description:
    "I spend my workdays crafting thoughtful, user-centered digital experiences. " +
    "Outside of work, you'll usually find me on the golf course (enthusiastically average, at best), " +
    "playing tennis, managing my fantasy football team, diving into baseball stats, or exploring " +
    "new skills and technologies. I'm also proud to have been a lifelong fan and Alumni of the " +
    "University of Washington, Go Huskies! Whether I'm designing screens or slicing drives, I'm " +
    "always up for the challenge—and always learning something new. View my chatbot to learn more about me and my work.",
  images: [
    {
      src: "/projectImages/about/baby.png",
      alt: "Relume placeholder image 1",
    },
    {
      src: "/projectImages/about/guitar.png",
      alt: "Relume placeholder image 2",
    },
    {
      src: "/projectImages/about/golf.png",
      alt: "Relume placeholder image 3",
    },
    {
      src: "/projectImages/about/me.png",
      alt: "Relume placeholder image 4",
    },
    {
      src: "/projectImages/about/husky.png",
      alt: "Relume placeholder image 5",
    },
  ],
};
