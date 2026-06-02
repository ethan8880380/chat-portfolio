"use client";

import Image from "next/image";
import { NotionBlock } from "@/data/projects";

interface NotionContentProps {
  blocks: NotionBlock[];
  className?: string;
}

/**
 * Helper to get the image URL - uses proxy for Notion-hosted images to avoid expired signed URLs
 */
function getImageUrl(block: NotionBlock): string {
  if (!block.url) return "";

  const isNotionHosted =
    block.url.includes("s3.us-west-2.amazonaws.com") ||
    block.url.includes("notion.so") ||
    block.url.includes("prod-files-secure");

  if (isNotionHosted && block.id) {
    return `/api/notion-image?blockId=${block.id}`;
  }

  return block.url;
}

export function NotionContent({ blocks, className = "" }: NotionContentProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div
      className={`notion-content space-y-6 [&>*:first-child]:mt-0 ${className}`}
    >
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
        <p className="font-inter text-lg leading-[1.8] text-espresso/75">
          {block.content}
        </p>
      );

    case "heading_1":
      return (
        <h2 className="mb-5 mt-16 font-serif text-3xl leading-[1.1] text-espresso md:text-4xl">
          {block.content}
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="mb-3 mt-12 border-l-2 border-clay pl-4 font-serif text-2xl leading-snug text-espresso">
          {block.content}
        </h3>
      );

    case "heading_3":
      return (
        <h4 className="mb-2 mt-8 font-serif text-xl leading-snug text-espresso">
          {block.content}
        </h4>
      );

    case "list_item":
      return (
        <li className="-mt-6 ml-6 list-disc font-inter text-lg leading-[1.6] text-espresso/75 marker:text-clay">
          {block.content}
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="-mt-6 ml-6 list-decimal font-inter text-lg leading-[1.6] text-espresso/75 marker:text-clay">
          {block.content}
        </li>
      );

    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-clay pl-6 font-serif text-2xl italic leading-snug text-espresso">
          {block.content}
        </blockquote>
      );

    case "callout":
      return (
        <div className="my-6 rounded-[12px] bg-espresso/[0.04] p-6">
          <p className="font-inter text-lg leading-[1.8] text-espresso/75">
            {block.content}
          </p>
        </div>
      );

    case "code":
      return (
        <pre className="my-6 overflow-x-auto rounded-[12px] bg-espresso p-6">
          <code className="font-mono text-sm leading-relaxed text-cream">
            {block.content}
          </code>
        </pre>
      );

    case "image": {
      if (!block.url) return null;
      const imageUrl = getImageUrl(block);
      const isProxied = imageUrl.startsWith("/api/");

      return (
        <figure className="my-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-[12px]">
            {isProxied ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={block.caption || "Project image"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <Image
                src={imageUrl}
                alt={block.caption || "Project image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            )}
          </div>
          {block.caption && (
            <figcaption className="mt-3 font-inter text-sm text-espresso/50">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "video": {
      if (!block.url) return null;
      const videoUrl = getImageUrl(block);
      return (
        <figure className="my-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-[12px]">
            <video
              src={videoUrl}
              controls
              className="h-full w-full object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 font-inter text-sm text-espresso/50">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "embed":
      if (!block.url) return null;
      if (block.url.includes("youtube.com") || block.url.includes("youtu.be")) {
        const videoId = extractYouTubeId(block.url);
        if (videoId) {
          return (
            <figure className="my-10">
              <div className="relative aspect-video w-full overflow-hidden rounded-[12px]">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="h-full w-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              {block.caption && (
                <figcaption className="mt-3 font-inter text-sm text-espresso/50">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }
      }
      return (
        <div className="my-10">
          <iframe
            src={block.url}
            className="aspect-video w-full rounded-[12px]"
          />
        </div>
      );

    case "divider":
      return <hr className="my-12 border-espresso/12" />;

    case "toggle":
      return (
        <details className="my-6 rounded-[12px] bg-espresso/[0.04] p-6">
          <summary className="cursor-pointer font-inter text-lg font-medium leading-[1.8] text-espresso/80">
            {block.content}
          </summary>
        </details>
      );

    default:
      return null;
  }
}

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
