import { NextRequest, NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

// Force dynamic - never cache this route
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * API route to proxy Notion images
 * Notion image URLs are temporary signed URLs that expire after ~1 hour
 * This route fetches fresh URLs and streams the image data directly
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const blockId = searchParams.get("blockId");
  
  if (!blockId) {
    return NextResponse.json({ error: "Block ID is required" }, { status: 400 });
  }

  if (!NOTION_API_KEY) {
    return NextResponse.json({ error: "Notion API not configured" }, { status: 500 });
  }

  try {
    // Fetch the block to get fresh image URL
    const response = await fetch(`https://api.notion.com/v1/blocks/${blockId}`, {
      headers: {
        "Authorization": `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Notion API error:", error);
      return NextResponse.json({ error: "Failed to fetch block" }, { status: response.status });
    }

    const block = await response.json();
    
    let mediaUrl: string | null = null;

    // Handle image blocks
    if (block.type === "image") {
      if (block.image?.type === "file") {
        mediaUrl = block.image.file?.url;
      } else if (block.image?.type === "external") {
        mediaUrl = block.image.external?.url;
      }
    }
    
    // Handle video blocks
    if (block.type === "video") {
      if (block.video?.type === "file") {
        mediaUrl = block.video.file?.url;
      } else if (block.video?.type === "external") {
        mediaUrl = block.video.external?.url;
      }
    }

    // Handle file blocks
    if (block.type === "file") {
      if (block.file?.type === "file") {
        mediaUrl = block.file.file?.url;
      } else if (block.file?.type === "external") {
        mediaUrl = block.file.external?.url;
      }
    }

    if (!mediaUrl) {
      return NextResponse.json({ error: "No media URL found in block" }, { status: 404 });
    }

    // Fetch the actual image/media and stream it back
    const mediaResponse = await fetch(mediaUrl, {
      cache: "no-store",
    });

    if (!mediaResponse.ok) {
      console.error("Failed to fetch media:", mediaResponse.status);
      return NextResponse.json({ error: "Failed to fetch media" }, { status: mediaResponse.status });
    }

    // Get the content type from the response
    const contentType = mediaResponse.headers.get("content-type") || "application/octet-stream";
    
    // Stream the response body
    const body = mediaResponse.body;
    
    if (!body) {
      return NextResponse.json({ error: "No response body" }, { status: 500 });
    }

    // Return the image with appropriate headers
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching Notion image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
