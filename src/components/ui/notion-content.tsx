"use client";

import Image from "next/image";
import { NotionBlock } from "@/data/projects";

interface NotionContentProps {
  blocks: NotionBlock[];
  className?: string;
}

export function NotionContent({ blocks, className = "" }: NotionContentProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={`notion-content space-y-6 [&>*:first-child]:mt-0 ${className}`}>
      {blocks.map((block, index) => (
        <NotionBlockRenderer key={block.id || index} block={block} />
      ))}
    </div>
  );
}

interface NotionBlockRendererProps {
  block: NotionBlock;
}

function NotionBlockRenderer({ block }: NotionBlockRendererProps) {
  switch (block.type) {
    case "paragraph":
      if (!block.content) return null;
      return (
        <p className="text-lg text-chalk/60 leading-[1.8]">
          {block.content}
        </p>
      );

    case "heading_1":
      return (
        <h2 className="text-[2.75rem] font-bold text-chalk mt-16 mb-6 leading-tight">
          {block.content}
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="text-[1.375rem] font-medium text-chalk mt-10 mb-3 leading-tight pl-4 border-l-2 border-[#0087ef]">
          {block.content}
        </h3>
      );

    case "heading_3":
      return (
        <h4 className="text-[1.25rem] font-medium text-chalk mt-8 mb-2 leading-tight">
          {block.content}
        </h4>
      );

    case "list_item":
      return (
        <li className="text-lg text-chalk/70 ml-6 list-disc leading-[1.6] -mt-6">
          {block.content}
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="text-lg text-chalk/80 ml-6 list-decimal leading-[1.6] -mt-6">
          {block.content}
        </li>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-[#0087ef] pl-6 py-2 my-6 text-lg italic text-chalk/80 leading-[1.8]">
          {block.content}
        </blockquote>
      );

    case "callout":
      return (
        <div className="bg-chalk/5 border border-chalk/10 rounded-lg p-6 my-6">
          <p className="text-lg text-chalk/80 leading-[1.8]">{block.content}</p>
        </div>
      );

    case "code":
      return (
        <pre className="bg-ink/50 border border-chalk/10 rounded-lg p-6 my-6 overflow-x-auto">
          <code className="text-lg text-green-400 font-mono leading-relaxed">
            {block.content}
          </code>
        </pre>
      );

    case "image":
      if (!block.url) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
              src={block.url}
              alt={block.caption || "Project image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-chalk/50 text-lg mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "video":
      if (!block.url) return null;
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <video
              src={block.url}
              controls
              className="w-full h-full object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-chalk/50 text-lg mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "embed":
      if (!block.url) return null;
      // Handle common embeds (YouTube, Vimeo, etc.)
      if (block.url.includes("youtube.com") || block.url.includes("youtu.be")) {
        const videoId = extractYouTubeId(block.url);
        if (videoId) {
          return (
            <figure className="my-8">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="w-full h-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              {block.caption && (
                <figcaption className="text-center text-chalk/50 text-lg mt-3">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }
      }
      // Generic embed fallback
      return (
        <div className="my-8">
          <iframe
            src={block.url}
            className="w-full aspect-video rounded-xl"
          />
        </div>
      );

    case "divider":
      return <hr className="border-chalk/10 my-10" />;

    case "toggle":
      return (
        <details className="bg-chalk/5 border border-chalk/10 rounded-lg p-6 my-6">
          <summary className="text-lg text-chalk/80 cursor-pointer font-medium leading-[1.8]">
            {block.content}
          </summary>
        </details>
      );

    default:
      return null;
  }
}

// Helper to extract YouTube video ID
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}
