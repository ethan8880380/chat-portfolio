import { NextRequest, NextResponse } from "next/server";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

// Force dynamic - never cache this route
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * API route to proxy Notion database property images (like hero images)
 * These are different from block images - they're attached to the page properties
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageId = searchParams.get("pageId");
  const property = searchParams.get("property") || "Hero Image";
  
  if (!pageId) {
    return NextResponse.json({ error: "Page ID is required" }, { status: 400 });
  }

  if (!NOTION_API_KEY) {
    return NextResponse.json({ error: "Notion API not configured" }, { status: 500 });
  }

  try {
    // Fetch the page to get fresh property values
    const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      headers: {
        "Authorization": `Bearer ${NOTION_API_KEY}`,
        "Notion-Version": "2022-06-28",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Notion API error:", error);
      return NextResponse.json({ error: "Failed to fetch page" }, { status: response.status });
    }

    const page = await response.json();
    
    // Get the image URL from the property
    const prop = page.properties?.[property];
    let imageUrl: string | null = null;

    if (prop?.type === "files" && prop.files?.length > 0) {
      const file = prop.files[0];
      if (file.type === "file") {
        imageUrl = file.file?.url;
      } else if (file.type === "external") {
        imageUrl = file.external?.url;
      }
    }

    if (!imageUrl) {
      return NextResponse.json({ error: "No image URL found in property" }, { status: 404 });
    }

    // Fetch the actual image and stream it back
    const mediaResponse = await fetch(imageUrl, {
      cache: "no-store",
    });

    if (!mediaResponse.ok) {
      console.error("Failed to fetch media:", mediaResponse.status);
      return NextResponse.json({ error: "Failed to fetch media" }, { status: mediaResponse.status });
    }

    const contentType = mediaResponse.headers.get("content-type") || "application/octet-stream";
    const body = mediaResponse.body;
    
    if (!body) {
      return NextResponse.json({ error: "No response body" }, { status: 500 });
    }

    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching Notion property image:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
