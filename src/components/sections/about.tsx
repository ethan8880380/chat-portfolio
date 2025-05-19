"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";

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

  const halfViewportHeight = typeof window !== "undefined" ? window.innerHeight * 0.5 : 100;

  const containerMotion = {
    opacity: useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]),
    scale: useTransform(scrollYProgress, [0, 0.5], [1, 0.95]),
  };

  const createTransform = (x: string[], y: string[], rotate: string[]) => ({
    translateX: useTransform(scrollYProgress, [0, 1], x),
    translateY: useTransform(scrollYProgress, [0, 1], y),
    rotateZ: useTransform(scrollYProgress, [0, 1], rotate),
  });

  const imageTransforms = [
    {},
    isMobile
      ? createTransform(["20%", "120%"], ["15%", "100%"], ["0.6deg", "4deg"])
      : createTransform(["0%", "100%"], ["0%", "60%"], ["0deg", "-4deg"]),
    isMobile
      ? createTransform(["-20%", "-120%"], ["-15%", "-100%"], ["-3deg", "4deg"])
      : createTransform(["0%", "-50%"], ["0%", "-90%"], ["4deg", "4deg"]),
    isMobile
      ? createTransform(["25%", "150%"], ["-10%", "-60%"], ["-0.6deg", "-6deg"])
      : createTransform(["0%", "140%"], ["0%", "-40%"], ["0deg", "-12deg"]),
    isMobile
      ? createTransform(["-25%", "-150%"], ["12%", "80%"], ["4.6deg", "8deg"])
      : createTransform(["0%", "-140%"], ["0%", "60%"], ["8deg", "8deg"]),
  ];
  
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
            <h1 className="mb-5 text-foreground text-2xl md:text-5xl font-medium">{heading}</h1>
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
              <img src={image.src} alt={image.alt} className="size-full object-cover rounded-lg" />
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
