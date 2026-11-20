import Image from "next/image";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/** Renders project imagery as a fill image. */
export function SmartImage({ src, alt, className, sizes, priority }: SmartImageProps) {
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", className)} />;
}
