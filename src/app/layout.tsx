import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";
import { EditorialNav } from "@/components/home/editorial-nav";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Editorial pairing (currently used on the home page)
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Ethan Rogers — Design Technologist & UX Engineer",
    template: "%s — Ethan Rogers",
  },
  description:
    "Design technologist and front-end engineer who prototypes forward-looking product experiences — interaction, motion, and Gen AI — across web and mobile. Seattle, WA.",
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
      "Design technologist and front-end engineer who prototypes forward-looking product experiences — interaction, motion, and Gen AI — across web and mobile.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Rogers — Design Technologist & UX Engineer",
    description:
      "Design technologist and front-end engineer who prototypes forward-looking product experiences — interaction, motion, and Gen AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${spaceMono.variable} ${instrumentSerif.variable} ${inter.variable}`}
    >
      <body className="bg-cream font-inter text-espresso antialiased overflow-x-clip">
        <ChatProvider>
          <EditorialNav />
          {children}
        </ChatProvider>
        <Analytics />
      </body>
    </html>
  );
}
