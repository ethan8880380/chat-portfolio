"use client";

import Image from "next/image";
import type { ContentBlock } from "@/data/projects";

interface RichContentProps {
  blocks: ContentBlock[];
  className?: string;
}

/** Renders a free-form case study body. */
export function RichContent({ blocks, className = "" }: RichContentProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div
      className={`rich-content space-y-6 [&>*:first-child]:mt-0 ${className}`}
    >
      {blocks.map((block, index) => (
        <BlockRenderer key={block.id || index} block={block} />
      ))}
    </div>
  );
}

interface BlockRendererProps {
  block: ContentBlock;
}

function BlockRenderer({ block }: BlockRendererProps) {
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
        <h2 data-inspect="Heading" className="mb-5 mt-20 font-display text-5xl font-black uppercase leading-[0.85] text-foreground wdth-75 sm:text-6xl">
          {block.content}
        </h2>
      );

    case "heading_2":
      return (
        <h3 className="mb-3 mt-14 font-display text-3xl font-extrabold uppercase leading-none text-foreground wdth-75 sm:text-4xl">
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
        <blockquote className="my-10 border-l-2 border-hot pl-6 font-serif text-2xl italic leading-snug text-foreground md:text-4xl">
          {block.content}
        </blockquote>
      );

    case "callout":
      return (
        <div className="my-6 rounded-2xl rounded-tl-sm border bg-card p-6">
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
      return (
        <figure className="my-10">
          <Image
            src={block.url}
            alt={block.caption || "Project image"}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full rounded-lg border border-foreground/10 bg-muted"
          />
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
      const videoUrl = block.url;
      return (
        <figure className="my-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-foreground/10 bg-muted">
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
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-foreground/10 bg-muted">
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
