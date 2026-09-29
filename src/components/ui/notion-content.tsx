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
        <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
          {block.content}
        </p>
      );

    case "heading_1":
      return (
        <h2 className="mb-5 mt-16 text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl">
          {block.content}
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="mb-3 mt-12 text-2xl font-semibold tracking-tight text-foreground">
          {block.content}
        </h3>
      );

    case "heading_3":
      return (
        <h4 className="mb-2 mt-8 text-lg font-medium text-foreground">
          {block.content}
        </h4>
      );

    case "list_item":
      return (
        <li className="-mt-6 ml-6 list-disc text-base leading-relaxed text-foreground/80 marker:text-muted-foreground md:text-lg">
          {block.content}
        </li>
      );

    case "numbered_list_item":
      return (
        <li className="-mt-6 ml-6 list-decimal text-base leading-relaxed text-foreground/80 marker:text-muted-foreground md:text-lg">
          {block.content}
        </li>
      );

    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-foreground pl-6 text-xl font-medium tracking-tight text-foreground md:text-2xl">
          {block.content}
        </blockquote>
      );

    case "callout":
      return (
        <div className="my-6 rounded-lg border bg-muted/50 p-6">
          <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
            {block.content}
          </p>
        </div>
      );

    case "code":
      return (
        <pre className="my-6 overflow-x-auto rounded-lg border bg-muted/50 p-6">
          <code className="font-mono text-sm leading-relaxed text-foreground">
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
          <div className="relative aspect-video w-full overflow-hidden border bg-muted">
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
            <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
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
          <div className="relative aspect-video w-full overflow-hidden border bg-muted">
            <video
              src={videoUrl}
              controls
              className="h-full w-full object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
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
              <div className="relative aspect-video w-full overflow-hidden border bg-muted">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  className="h-full w-full"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
              {block.caption && (
                <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
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
            className="aspect-video w-full border bg-muted"
          />
        </div>
      );

    case "divider":
      return <hr className="my-12" />;

    case "toggle":
      return (
        <details className="my-6 rounded-lg border bg-muted/50 p-6">
          <summary className="cursor-pointer text-base font-medium text-foreground">
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
