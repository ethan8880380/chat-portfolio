import type { Metadata } from "next";
import { Anybody, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
// Dashboard: Geist Serif for headings, Geist Pixel (circle) for small dot accents.
import { GeistSerif } from "geist/font/serif/variable";
import { GeistPixelCircle } from "geist/font/pixel/circle";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";
import { SiteHeader } from "@/components/layout/site-header";
import { StudioProvider } from "@/components/studio/studio-provider";
import { InspectOverlay } from "@/components/studio/inspect-overlay";
import { CommandMenu } from "@/components/studio/command-menu";
import { Analytics } from "@vercel/analytics/next";
import { getProjects } from "@/lib/projects-service";

export const revalidate = 3600;

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Variable display face — both the width (wdth) and weight (wght) axes are
// driven live by the hero frame, the footer, and hover states.
const anybody = Anybody({
  subsets: ["latin"],
  variable: "--font-anybody",
  axes: ["wdth"],
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Ethan Rogers — Design Technologist & UX Engineer",
    template: "%s — Ethan Rogers",
  },
  description:
    "Design technologist and front-end engineer who designs in Figma and ships in React — interaction, motion, and Gen AI. Seattle, WA.",
  authors: [{ name: "Ethan Rogers" }],
  keywords: [
    "Design Technologist",
    "UX Engineer",
    "Front-End Engineer",
    "Prototyping",
    "Motion Design",
    "React",
    "Gen AI",
    "Design Systems",
    "Seattle",
  ],
  openGraph: {
    title: "Ethan Rogers — Design Technologist & UX Engineer",
    description:
      "A portfolio built like an open design file. Resize the headline, press I to inspect every component, or ask my AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Rogers — Design Technologist & UX Engineer",
    description:
      "A portfolio built like an open design file. Resize the headline, press I to inspect every component, or ask my AI.",
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const projects = await getProjects();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${anybody.variable} ${instrument.variable} ${GeistSerif.variable} ${GeistPixelCircle.variable}`}
    >
      <body className="relative flex min-h-svh flex-col">
        <div
          aria-hidden
          className="grain bg-noise pointer-events-none fixed inset-0 z-[60] opacity-[0.04] mix-blend-multiply"
        />
        <StudioProvider>
          <ChatProvider>
            <SiteHeader />
            {children}
            <CommandMenu projects={projects.map((p) => ({ slug: p.slug, title: p.title, year: p.year, keywords: `${p.client ?? ""} ${p.tags.join(" ")}` }))} />
            <InspectOverlay />
          </ChatProvider>
        </StudioProvider>
        <Analytics />
      </body>
    </html>
  );
}
