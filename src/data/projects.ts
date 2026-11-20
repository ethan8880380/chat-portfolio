export interface ProcessImage {
  src: string;
  width: number;
  height: number;
  title: string;
  caption?: string;
  /** Boards marked wide span the full width; the rest sit two to a row. */
  wide?: boolean;
}

export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: {
    hero: string;
    preview?: string;
    gallery?: string[];
  };
  tags: string[];
  year: string;
  client?: string;
  role: string[];
  technologies?: string[];
  challenges?: string;
  solution?: string;
  results?: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  color: string;
  featured?: boolean;
  /**
   * A live, coded prototype shown in place of screenshots (a static export
   * served from public/prototypes). The first variant is the default.
   */
  prototype?: {
    /** domain is what the phone's address bar shows, e.g. "huggies.com". */
    variants: { label: string; src: string; domain: string }[];
    /** Colour field behind the phone on project cards, like the other projects' hero images. */
    background?: string;
  };
  /**
   * How the work got made: a written chapter, annotated design boards shown at
   * their native size, and an optional side-by-side progression of one screen.
   */
  process?: {
    body: string;
    boards?: ProcessImage[];
    progression?: { title: string; caption?: string; stages: ProcessImage[] };
  };
  /** A titled set of screenshots shown after the case study, e.g. the shipped site. */
  showcase?: { label: string; body?: string; images: ProcessImage[] };
  /** Free-form case study body (headings, paragraphs, images), shown instead of the Challenge/Approach/Outcome chapters. */
  richContent?: ContentBlock[];
}

/** One block of a free-form case study body. */
export interface ContentBlock {
  id: string;
  type: string;
  content: string;
  // For images, embeds, etc.
  url?: string;
  caption?: string;
  // For lists
  items?: string[];
  // For code blocks
  language?: string;
  // For headings
  level?: number;
}
