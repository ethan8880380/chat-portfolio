import Image from "next/image";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders project imagery as a fill image. Notion-hosted images come through a
 * local proxy route with a query string (e.g. `/api/notion-property-image?...`),
 * which `next/image` rejects — those fall back to a plain <img>.
 */
export function SmartImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: SmartImageProps) {
  const isProxied = src.startsWith("/api/");

  if (isProxied) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className={cn("absolute inset-0 h-full w-full object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
