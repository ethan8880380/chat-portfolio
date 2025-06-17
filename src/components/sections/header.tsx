"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

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
    <header className="sticky top-0 z-40 w-full px-3 md:px-6">
      <div className="flex h-10">
        <div className="grid grid-cols-4 gap-6 md:gap-3 w-full">
          <Link href="/" className="col-span-2 flex items-center space-x-0 uppercase">
            <span className="font-medium text-base text-foreground">Ethan Rogers</span>
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-0">
              <NavigationMenuItem>
                <Link href="/work" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Work
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
              <Link href="/chat" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Chatbot
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="mailto:ethan0380@gmail.com" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    email me
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Burger Menu */}
          <div className="md:hidden flex items-center justify-end col-span-2">
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-w-[400px] mx-auto">
                <DrawerHeader>
                  <DrawerTitle>Navigation Menu</DrawerTitle>
                </DrawerHeader>
                <nav className="flex flex-col space-y-4 p-4">
                  <Link 
                    href="/work" 
                    className="text-lg font-medium hover:text-muted-foreground transition-colors py-2"
                    onClick={() => setOpen(false)}
                  >
                    Work
                  </Link>
                  <Link 
                    href="/chat" 
                    className="text-lg font-medium hover:text-muted-foreground transition-colors py-2"
                    onClick={() => setOpen(false)}
                  >
                    Chatbot
                  </Link>
                  <Link 
                    href="mailto:ethan0380@gmail.com" 
                    className="text-lg font-medium hover:text-muted-foreground transition-colors py-2"
                    onClick={() => setOpen(false)}
                  >
                    email me
                  </Link>
                  <button
                    className="text-lg font-medium hover:text-muted-foreground transition-colors py-2 text-left"
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      setOpen(false);
                    }}
                  >
                    {theme === "dark" ? "{ Light Mode }" : "{ Dark Mode }"}
                  </button>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="hidden md:flex items-center space-x-4">
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
