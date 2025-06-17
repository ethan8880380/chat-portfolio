"use client";

import { motion, Variants } from "framer-motion";
import React, { ReactElement, createElement } from "react";

interface TextAnimateProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: keyof JSX.IntrinsicElements;
  by?: "text" | "word" | "character" | "line";
  startOnView?: boolean;
  once?: boolean;
  animation?: AnimationVariant;
}

type AnimationVariant = "fadeIn" | "blurInUp" | "slideUp" | "scaleUp" | "slideLeft";

const defaultVariants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  blurInUp: {
    initial: { opacity: 0, filter: "blur(4px)", y: 10 },
    animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
};

export function TextAnimate({
  children,
  className = "",
  delay = 0,
  duration = 0.15,
  variants,
  as = "p",
  by = "word",
  startOnView = true,
  once = false,
  animation = "fadeIn",
}: TextAnimateProps): ReactElement {
  const animationVariants = variants || defaultVariants[animation];

  const splitText = (text: string, splitBy: string): string[] => {
    switch (splitBy) {
      case "character":
        return text.split("");
      case "word":
        return text.split(" ");
      case "line":
        return text.split("\n");
      case "text":
      default:
        return [text];
    }
  };

  const textArray = splitText(children, by);
  const isCharacter = by === "character";
  const isWord = by === "word";
  const isLine = by === "line";

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: duration * 0.3,
        delayChildren: delay,
      },
    },
  };

  return createElement(
    motion[as as keyof typeof motion] as React.ComponentType<{
      className?: string;
      variants?: Variants;
      initial?: string;
      animate?: string;
      viewport?: { once: boolean };
      whileInView?: string;
      children?: React.ReactNode;
    }>,
    {
      className,
      variants: containerVariants,
      initial: "initial",
      animate: "animate",
      viewport: startOnView ? { once } : undefined,
      ...(startOnView && { whileInView: "animate" }),
    },
    textArray.map((segment, index) => (
      <motion.span
        key={index}
        variants={animationVariants}
        transition={{
          duration,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={
          isCharacter
            ? "inline-block"
            : isWord
            ? "inline-block mr-1"
            : isLine
            ? "block"
            : "inline-block"
        }
      >
        {segment}
        {isCharacter && segment === " " ? "\u00A0" : ""}
      </motion.span>
    ))
  );
}
