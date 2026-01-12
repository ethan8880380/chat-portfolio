"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/chat", label: "Chatbot" },
];

interface StaticHeaderProps {
  theme?: "light" | "dark";
}

export function StaticHeader({ theme = "dark" }: StaticHeaderProps) {
  const isDark = theme === "dark";
  const maxContainerWidth = 1280;
  const padding = 8;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <div className="fixed left-0 right-0 top-4 z-[100] flex justify-center pointer-events-none px-4">
        <LiquidGlass
          theme={isDark ? 'dark' : 'light'}
          blur={20}
          opacity={0.75}
          showBorder={true}
          showGradient={true}
          showLiquidBg={true}
          applyDistortion={false}
          className="rounded-full pointer-events-auto transition-all duration-300"
          style={{ 
            maxWidth: `${maxContainerWidth}px`,
            width: '100%',
            padding: `${padding}px`,
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          <div className="gap-4 md:gap-6 flex items-center justify-between w-full">
            {/* Logo/Name with Image - Left */}
            <Link 
              href="/" 
              className={`
                flex items-center space-x-3 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0 hover:opacity-70
                ${isDark ? 'text-chalk' : 'text-ink'}
              `}
            >
              <Image 
                src="/projectImages/about/me.png" 
                alt="Ethan Rogers" 
                width={40} 
                height={40} 
                className="rounded-full object-cover"
              />
              <span className="hidden sm:inline">Ethan Rogers</span>
            </Link>
            
            {/* Desktop Navigation Menu - Center */}
            <nav className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    text-base font-medium py-2 px-5 rounded-full transition-colors
                    ${isDark ? 'text-chalk/60 hover:text-chalk' : 'text-ink/60 hover:text-ink'}
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Contact Button - Right */}
            <Link 
              href="/contact"
              className={`
                hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all flex-shrink-0 group
                ${isDark 
                  ? 'bg-chalk text-ink hover:bg-chalk/90' 
                  : 'bg-ink text-chalk hover:bg-ink/90'
                }
              `}
            >
              Contact
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                md:hidden p-2 rounded-full transition-colors
                ${isDark 
                  ? 'text-chalk hover:bg-chalk/10' 
                  : 'text-ink hover:bg-ink/10'
                }
              `}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          </motion.div>
        </LiquidGlass>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] md:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <LiquidGlass
              theme={isDark ? 'dark' : 'light'}
              blur={20}
              opacity={0.9}
              showBorder={true}
              showGradient={true}
              showLiquidBg={true}
              applyDistortion={false}
              className="absolute top-20 left-4 right-4 rounded-3xl p-6"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`
                        block text-xl font-medium py-3 px-4 rounded-xl transition-colors
                        ${isDark 
                          ? 'text-chalk/80 hover:text-chalk hover:bg-chalk/10' 
                          : 'text-ink/80 hover:text-ink hover:bg-ink/5'
                        }
                      `}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Contact Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                  className={`mt-4 pt-4 border-t ${isDark ? 'border-chalk/10' : 'border-ink/10'}`}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold transition-all
                      ${isDark 
                        ? 'bg-chalk text-ink hover:bg-chalk/90' 
                        : 'bg-ink text-chalk hover:bg-ink/90'
                      }
                    `}
                  >
                    Contact
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </nav>
              </motion.div>
            </LiquidGlass>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
