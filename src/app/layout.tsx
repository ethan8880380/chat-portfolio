import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatProvider } from "@/context/ChatContext";
import { SiteHeader } from "@/components/layout/site-header";
import { Analytics } from "@vercel/analytics/next";

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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="relative flex min-h-svh flex-col">
        <div
          aria-hidden
          className="bg-dots pointer-events-none fixed inset-x-0 top-0 -z-10 h-screen opacity-[0.015] [mask-image:radial-gradient(ellipse_at_top,black,transparent_80%)]"
        />
        <ChatProvider>
          <SiteHeader />
          {children}
        </ChatProvider>
        <Analytics />
      </body>
    </html>
  );
}
