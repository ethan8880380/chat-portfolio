"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useChatContext } from "@/context/ChatContext";

export function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { setShouldExpandChat } = useChatContext();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to handle scrolling to the about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 w-full bg-background border-b supports-[backdrop-filter]:bg-background/60 px-3 font-inter">
        <div className="flex h-8 items-center justify-between py-0">
          {/* Skeleton loading state */}
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full px-6">
      <div className="flex h-10">
        <div className="grid grid-cols-4 gap-6 md:gap-3 w-full">
          <Link href="/" className="col-span-2 flex items-center space-x-0 uppercase">
            <span className="font-medium text-base text-foreground">Ethan Rogers</span>
          </Link>
          <NavigationMenu >
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <Link href="/work" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Work
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button 
                  onClick={() => setShouldExpandChat(true)} 
                  className={navigationMenuTriggerStyle()}
                >
                  Chatbot
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button 
                  onClick={scrollToAbout} 
                  className={navigationMenuTriggerStyle()}
                >
                  About
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="#experience" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Contact Me
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center space-x-4">
          <button
            className="text-sm uppercase text-foreground hover:text-muted-foreground transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "{ Light Mode }" : "{ Dark Mode }"}
          </button>
        </div>
        </div>
      </div>
    </header>
  );
}
