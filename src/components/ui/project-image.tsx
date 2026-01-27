"use client";

import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  style?: React.CSSProperties;
}

/**
 * A wrapper around Next.js Image that handles Notion proxy URLs
 * Uses regular <img> for proxy URLs to avoid Next.js Image issues with streaming responses
 */
export function ProjectImage({
  src,
  alt,
  fill = false,
  className = "",
  sizes,
  quality = 90,
  priority = false,
  onLoad,
  style,
}: ProjectImageProps) {
  const isProxyUrl = src.startsWith("/api/");

  if (isProxyUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={`${fill ? "absolute inset-0 w-full h-full" : ""} ${className}`}
        loading={priority ? "eager" : "lazy"}
        onLoad={onLoad}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      quality={quality}
      priority={priority}
      onLoad={onLoad}
      style={style}
    />
  );
}
