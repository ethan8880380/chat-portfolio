import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Check if a URL is from Notion (s3 or notion.so domains)
export function isNotionUrl(url: string): boolean {
  return url.includes("s3.us-west-2.amazonaws.com") || 
         url.includes("notion.so") ||
         url.includes("prod-files-secure");
}
