"use client";

import React from "react";
import { LinearBlur, RadialBlur } from "progressive-blur";

interface ProgressiveBlurProps {
  blurStrength?: number; // Maximum blur strength in pixels
  gradientHeight?: number; // Height of the blur gradient in vh
  blurType?: "linear" | "radial" | "both"; // Type of blur effect
  tint?: string; // Optional color tint
}

export function ProgressiveBlur({
  blurStrength = 64,
  gradientHeight = 30,
  blurType = "linear",
  tint = "transparent",
}: ProgressiveBlurProps) {
  const heightStyle = { height: `${gradientHeight}vh` };
  
  return (
    <>
      {(blurType === "linear" || blurType === "both") && (
        <LinearBlur
          steps={8}
          strength={blurStrength}
          falloffPercentage={100}
          tint={tint}
          side="top"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            pointerEvents: "none",
            ...heightStyle
          }}
        />
      )}
      
      {(blurType === "radial" || blurType === "both") && (
        <RadialBlur
          steps={8} 
          strength={Math.round(blurStrength * 0.8)}
          falloffPercentage={100}
          tint={tint}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            zIndex: 29,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
}

export default ProgressiveBlur; 