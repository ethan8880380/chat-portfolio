import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatProvider } from "@/context/ChatContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ethan Rogers | Portfolio",
  description: "Personal portfolio of Ethan Rogers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-outfit antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Progressive blur effects with z-index below header (40) */}
          <ProgressiveBlur 
            blurStrength={32} 
            gradientHeight={12} 
            blurType="linear" 
            tint="rgba(0, 0, 0, 0.01)" 
          />
          <ChatProvider>
            {children}
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
