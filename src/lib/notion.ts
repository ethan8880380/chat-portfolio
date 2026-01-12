import { ProjectData, NotionBlock } from "@/data/projects";

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Type for Notion page properties - using any for flexibility with Notion API
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NotionPage = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropertyValue = any;

// Base fetch helper for Notion API
async function notionFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      "Authorization": `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Notion API error: ${response.status} - ${error}`);
  }

  return response.json();
}

// Query a database
async function queryDatabase(databaseId: string, body: object = {}) {
  return notionFetch(`/databases/${databaseId}/query`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// Get all blocks from a page (handles pagination)
async function getBlocks(blockId: string): Promise<any[]> {
  const allBlocks: any[] = [];
  let cursor: string | undefined = undefined;
  
  do {
    const url = cursor 
      ? `/blocks/${blockId}/children?start_cursor=${cursor}&page_size=100`
      : `/blocks/${blockId}/children?page_size=100`;
    
    const response = await notionFetch(url);
    allBlocks.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);
  
  return allBlocks;
}

// Recursively get blocks including children
async function getBlocksWithChildren(blockId: string): Promise<any[]> {
  const blocks = await getBlocks(blockId);
  
  // Fetch children for blocks that have them
  for (const block of blocks) {
    if (block.has_children) {
      block.children = await getBlocksWithChildren(block.id);
    }
  }
  
  return blocks;
}

// Helper functions to extract values from Notion properties
function getTextProperty(property: PropertyValue): string {
  if (!property) return "";
  if (property.type === "rich_text" && property.rich_text?.length > 0) {
    return property.rich_text.map((t: { plain_text: string }) => t.plain_text).join("");
  }
  return "";
}

function getTitleProperty(property: PropertyValue): string {
  if (!property) return "";
  if (property.type === "title" && property.title?.length > 0) {
    return property.title.map((t: { plain_text: string }) => t.plain_text).join("");
  }
  return "";
}

function getUrlProperty(property: PropertyValue): string | undefined {
  if (!property) return undefined;
  if (property.type === "url" && property.url) {
    return property.url;
  }
  return undefined;
}

function getFilesProperty(property: PropertyValue): string | undefined {
  if (!property) return undefined;
  if (property.type === "files" && property.files?.length > 0) {
    const file = property.files[0];
    // Handle both uploaded files and external URLs
    if (file.type === "file") {
      return file.file?.url;
    } else if (file.type === "external") {
      return file.external?.url;
    }
  }
  return undefined;
}

function getMultiSelectProperty(property: PropertyValue): string[] {
  if (!property) return [];
  if (property.type === "multi_select") {
    return property.multi_select.map((item: { name: string }) => item.name);
  }
  return [];
}

function getSelectProperty(property: PropertyValue): string {
  if (!property) return "";
  if (property.type === "select" && property.select) {
    return property.select.name;
  }
  return "";
}

function getNumberProperty(property: PropertyValue): number {
  if (!property) return 0;
  if (property.type === "number" && property.number !== null) {
    return property.number;
  }
  return 0;
}

function getCheckboxProperty(property: PropertyValue): boolean {
  if (!property) return false;
  if (property.type === "checkbox") {
    return property.checkbox === true;
  }
  return false;
}

// Parse gallery images from comma-separated string
function parseGalleryImages(galleryString: string): string[] | undefined {
  if (!galleryString) return undefined;
  const images = galleryString
    .split(",")
    .map((img) => img.trim())
    .filter((img) => img.length > 0);
  return images.length > 0 ? images : undefined;
}

// Transform Notion page to ProjectData
function transformNotionPageToProject(
  page: NotionPage,
  index: number
): ProjectData {
  const props = page.properties;

  // Parse testimonial if all fields are present
  const testimonialQuote = getTextProperty(props["Testimonial Quote"]);
  const testimonialAuthor = getTextProperty(props["Testimonial Author"]);
  const testimonialPosition = getTextProperty(props["Testimonial Position"]);

  const testimonial =
    testimonialQuote && testimonialAuthor && testimonialPosition
      ? {
          quote: testimonialQuote,
          author: testimonialAuthor,
          position: testimonialPosition,
        }
      : undefined;

  // Get gallery images
  const galleryString = getTextProperty(props["Gallery Images"]);
  const galleryImages = parseGalleryImages(galleryString);

  return {
    id: props["Order"] ? getNumberProperty(props["Order"]) : index,
    slug: getTextProperty(props["Slug"]),
    title: getTitleProperty(props["Title"]),
    shortDescription: getTextProperty(props["Short Description"]),
    fullDescription: getTextProperty(props["Full Description"]),
    images: {
      hero: getFilesProperty(props["Hero Image"]) || getTextProperty(props["Hero Image"]) || getUrlProperty(props["Hero Image"]) || "",
      preview: getFilesProperty(props["Preview"]) || undefined,
      gallery: galleryImages,
    },
    tags: getMultiSelectProperty(props["Tags"]),
    year: props["Year"] ? getTextProperty(props["Year"]) : "",
    client: props["Client"] ? getTextProperty(props["Client"]) : undefined,
    role: getMultiSelectProperty(props["Role"]),
    technologies: props["Technologies"] ? getMultiSelectProperty(props["Technologies"]) : undefined,
    challenges: getTextProperty(props["Challenges"]) || undefined,
    solution: getTextProperty(props["Solution"]) || undefined,
    results: getTextProperty(props["Results"]) || undefined,
    testimonial,
    liveUrl: props["Live URL"] ? getUrlProperty(props["Live URL"]) : undefined,
    githubUrl: props["GitHub URL"] ? getUrlProperty(props["GitHub URL"]) : undefined,
    color: props["Color"] ? getSelectProperty(props["Color"]) : "bg-blue-500",
    featured: getCheckboxProperty(props["Featured"]),
  };
}

// Fetch all projects from Notion
export async function getProjectsFromNotion(): Promise<ProjectData[]> {
  try {
    const response = await queryDatabase(NOTION_DATABASE_ID!, {
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
    });

    const projects = response.results
      .filter((page: NotionPage) => "properties" in page)
      .map((page: NotionPage, index: number) => transformNotionPageToProject(page, index));

    return projects;
  } catch (error) {
    console.error("Error fetching projects from Notion:", error);
    throw error;
  }
}

// Fetch a single project by slug
export async function getProjectBySlugFromNotion(
  slug: string
): Promise<ProjectData | undefined> {
  try {
    const response = await queryDatabase(NOTION_DATABASE_ID!, {
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return undefined;
    }

    const page = response.results[0];
    if (!("properties" in page)) {
      return undefined;
    }

    return transformNotionPageToProject(page as NotionPage, 0);
  } catch (error) {
    console.error("Error fetching project from Notion:", error);
    throw error;
  }
}

// Get all project slugs (for static generation)
export async function getAllProjectSlugsFromNotion(): Promise<string[]> {
  const projects = await getProjectsFromNotion();
  return projects.map((project) => project.slug);
}

// Get related projects (excluding current)
export async function getRelatedProjectsFromNotion(
  currentSlug: string,
  limit: number = 4
): Promise<ProjectData[]> {
  const projects = await getProjectsFromNotion();
  return projects.filter((project) => project.slug !== currentSlug).slice(0, limit);
}

// Get featured projects only
export async function getFeaturedProjectsFromNotion(): Promise<ProjectData[]> {
  const projects = await getProjectsFromNotion();
  return projects.filter((project) => project.featured === true);
}

// Extract text from rich_text array
function extractRichText(richText: { plain_text: string }[]): string {
  if (!richText || !Array.isArray(richText)) return "";
  return richText.map((t) => t.plain_text).join("");
}

// Transform Notion blocks to our simplified format
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformBlock(block: any): NotionBlock | null {
  const baseBlock = {
    id: block.id,
    type: block.type,
    content: "",
  };

  switch (block.type) {
    case "paragraph":
      return {
        ...baseBlock,
        content: extractRichText(block.paragraph?.rich_text),
      };

    case "heading_1":
      return {
        ...baseBlock,
        content: extractRichText(block.heading_1?.rich_text),
        level: 1,
      };

    case "heading_2":
      return {
        ...baseBlock,
        content: extractRichText(block.heading_2?.rich_text),
        level: 2,
      };

    case "heading_3":
      return {
        ...baseBlock,
        content: extractRichText(block.heading_3?.rich_text),
        level: 3,
      };

    case "bulleted_list_item":
      return {
        ...baseBlock,
        type: "list_item",
        content: extractRichText(block.bulleted_list_item?.rich_text),
      };

    case "numbered_list_item":
      return {
        ...baseBlock,
        type: "numbered_list_item",
        content: extractRichText(block.numbered_list_item?.rich_text),
      };

    case "quote":
      return {
        ...baseBlock,
        content: extractRichText(block.quote?.rich_text),
      };

    case "callout":
      return {
        ...baseBlock,
        content: extractRichText(block.callout?.rich_text),
      };

    case "code":
      return {
        ...baseBlock,
        content: extractRichText(block.code?.rich_text),
        language: block.code?.language || "plaintext",
      };

    case "image": {
      const imageUrl =
        block.image?.type === "external"
          ? block.image.external?.url
          : block.image?.file?.url;
      return {
        ...baseBlock,
        url: imageUrl,
        caption: extractRichText(block.image?.caption),
        content: "",
      };
    }

    case "video": {
      const videoUrl =
        block.video?.type === "external"
          ? block.video.external?.url
          : block.video?.file?.url;
      return {
        ...baseBlock,
        url: videoUrl,
        caption: extractRichText(block.video?.caption),
        content: "",
      };
    }

    case "embed":
      return {
        ...baseBlock,
        url: block.embed?.url,
        caption: extractRichText(block.embed?.caption),
        content: "",
      };

    case "divider":
      return {
        ...baseBlock,
        content: "---",
      };

    case "toggle":
      return {
        ...baseBlock,
        content: extractRichText(block.toggle?.rich_text),
      };

    case "to_do":
      const checked = block.to_do?.checked ? "☑" : "☐";
      return {
        ...baseBlock,
        type: "list_item",
        content: `${checked} ${extractRichText(block.to_do?.rich_text)}`,
      };

    case "bookmark":
      return {
        ...baseBlock,
        type: "embed",
        url: block.bookmark?.url,
        caption: extractRichText(block.bookmark?.caption),
        content: "",
      };

    case "link_preview":
      return {
        ...baseBlock,
        type: "embed",
        url: block.link_preview?.url,
        content: "",
      };

    case "file":
      const fileUrl = block.file?.type === "external"
        ? block.file.external?.url
        : block.file?.file?.url;
      return {
        ...baseBlock,
        type: "embed",
        url: fileUrl,
        caption: extractRichText(block.file?.caption),
        content: "",
      };

    case "pdf":
      const pdfUrl = block.pdf?.type === "external"
        ? block.pdf.external?.url
        : block.pdf?.file?.url;
      return {
        ...baseBlock,
        type: "embed",
        url: pdfUrl,
        caption: extractRichText(block.pdf?.caption),
        content: "",
      };

    case "table_of_contents":
    case "breadcrumb":
    case "column_list":
    case "column":
      // These are structural blocks, skip them but process children
      return null;

    default:
      // Log unknown block types for debugging
      console.log(`Unknown Notion block type: ${block.type}`);
      return null;
  }
}

// Transform blocks recursively (including children)
function transformBlocksRecursively(blocks: any[]): NotionBlock[] {
  const result: NotionBlock[] = [];
  
  for (const block of blocks) {
    const transformed = transformBlock(block);
    if (transformed) {
      result.push(transformed);
      
      // If block has children, transform them too
      if (block.children && block.children.length > 0) {
        const childBlocks = transformBlocksRecursively(block.children);
        result.push(...childBlocks);
      }
    }
  }
  
  return result;
}

// Fetch rich content blocks from a Notion page
export async function getPageContent(pageId: string): Promise<NotionBlock[]> {
  try {
    const blocks = await getBlocksWithChildren(pageId);
    return transformBlocksRecursively(blocks);
  } catch (error) {
    console.error("Error fetching page content from Notion:", error);
    return [];
  }
}

// Fetch a project with its rich content
export async function getProjectWithContentFromNotion(
  slug: string
): Promise<ProjectData | undefined> {
  try {
    const response = await queryDatabase(NOTION_DATABASE_ID!, {
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Published",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return undefined;
    }

    const page = response.results[0];
    if (!("properties" in page)) {
      return undefined;
    }

    // Get basic project data
    const project = transformNotionPageToProject(page as NotionPage, 0);

    // Add page ID and fetch rich content
    project.notionPageId = page.id;
    project.richContent = await getPageContent(page.id);

    return project;
  } catch (error) {
    console.error("Error fetching project with content from Notion:", error);
    throw error;
  }
}
