"use client";

import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The blur intensity (0-100)
   * @default 20
   */
  blur?: number;
  /**
   * The opacity of the background (0-1)
   * @default 0.8
   */
  opacity?: number;
  /**
   * Whether to show the border
   * @default true
   */
  showBorder?: boolean;
  /**
   * Whether to show the subtle gradient overlay
   * @default true
   */
  showGradient?: boolean;
  /**
   * Whether to show the animated liquid background
   * @default false
   */
  showLiquidBg?: boolean;
  /**
   * Whether to apply SVG glass distortion filter
   * @default false
   */
  applyDistortion?: boolean;
  /**
   * The color theme
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
  (
    {
      blur = 20,
      opacity = 0.8,
      showBorder = true,
      showGradient = true,
      showLiquidBg = false,
      applyDistortion = false,
      theme = 'light',
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const isDark = theme === 'dark';
    const filterId = `liquid-glass-filter-${Math.random().toString(36).substring(7)}`;

    return (
      <>
        {/* SVG Filter Definition - Subtle glass effect */}
        {applyDistortion && (
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id={filterId}>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.01"
                  numOctaves="2"
                  seed="1"
                  result="turb"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="turb"
                  scale="3"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>
        )}

        <div
          ref={ref}
          className={cn(
            "relative overflow-hidden",
            className
          )}
          style={{
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            ...style,
          }}
          {...props}
        >
          {/* Animated Liquid Background */}
          {showLiquidBg && (
            <div
              className="absolute inset-0 -z-20 animate-liquid-float"
              style={{
                backgroundImage: isDark
                  ? `radial-gradient(circle at 30% 50%, rgba(0, 135, 239, 0.3) 0%, transparent 50%),
                     radial-gradient(circle at 70% 50%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
                     radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)`
                  : `radial-gradient(circle at 30% 50%, rgba(0, 135, 239, 0.15) 0%, transparent 50%),
                     radial-gradient(circle at 70% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                     radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)`,
                backgroundSize: '200% 200%',
                backgroundPosition: 'center center',
              }}
            />
          )}

          {/* Base glass layer */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundColor: isDark
                ? `rgba(18, 18, 18, ${opacity})`
                : `rgba(255, 255, 255, ${opacity})`,
            }}
          />

          {/* Gradient overlay for depth */}
          {showGradient && (
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: isDark
                  ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0) 100%)',
              }}
            />
          )}

          {/* Border highlight */}
          {showBorder && (
            <div
              className="absolute inset-0 -z-10 rounded-[inherit]"
              style={{
                border: '1px solid',
                borderColor: isDark
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(0, 0, 0, 0.1)',
                boxShadow: isDark
                  ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              }}
            />
          )}

          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </>
    );
  }
);

LiquidGlass.displayName = "LiquidGlass";
