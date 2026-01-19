 import { NextRequest, NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

/**
 * API route to proxy Notion images
 * Notion image URLs are temporary signed URLs that expire after ~1 hour
 * This route fetches fresh URLs on-demand
 * This in needed because Notion image urls are temporary signed urls that expire after ~1 hour
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
      // Don't cache this response - we need fresh URLs
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Notion API error:", error);
      return NextResponse.json({ error: "Failed to fetch block" }, { status: response.status });
    }

    const block = await response.json();
    
    let imageUrl: string | null = null;

    // Handle image blocks
    if (block.type === "image") {
      if (block.image?.type === "file") {
        imageUrl = block.image.file?.url;
      } else if (block.image?.type === "external") {
        imageUrl = block.image.external?.url;
      }
    }
    
    // Handle video blocks
    if (block.type === "video") {
      if (block.video?.type === "file") {
        imageUrl = block.video.file?.url;
      } else if (block.video?.type === "external") {
        imageUrl = block.video.external?.url;
      }
    }

    // Handle file blocks
    if (block.type === "file") {
      if (block.file?.type === "file") {
        imageUrl = block.file.file?.url;
      } else if (block.file?.type === "external") {
        imageUrl = block.file.external?.url;
      }
    }

    if (!imageUrl) {
      return NextResponse.json({ error: "No media URL found in block" }, { status: 404 });
    }

    // Redirect to the fresh signed URL
    return NextResponse.redirect(imageUrl);
  } catch (error) {
    console.error("Error fetching Notion image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
