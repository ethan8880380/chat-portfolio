"use client";

import { useState, useEffect, useRef } from "react";
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

export function FloatingNav() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [initialWidth, setInitialWidth] = useState(0);
  const [triggerPoint, setTriggerPoint] = useState(0);

  useEffect(() => {
    // Calculate trigger point on mount and resize
    const calculateTriggerPoint = () => {
      setTriggerPoint(window.innerHeight * 0.5 - 40 - 16);
    };
    calculateTriggerPoint();
    window.addEventListener('resize', calculateTriggerPoint);
    return () => window.removeEventListener('resize', calculateTriggerPoint);
  }, []);

  useEffect(() => {
    // Measure initial nav width after a brief delay to ensure content is rendered
    const timer = setTimeout(() => {
      if (navRef.current && initialWidth === 0) {
        setInitialWidth(navRef.current.offsetWidth);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [initialWidth]);

  useEffect(() => {
    const handleScroll = () => {
      const endPoint = triggerPoint + 200;
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      setScrollY(currentScrollY);
      
      // Calculate scroll progress for width (0 = start, 1 = fully expanded)
      if (currentScrollY <= 0) {
        setScrollProgress(0);
      } else if (currentScrollY >= endPoint) {
        setScrollProgress(1);
      } else if (currentScrollY >= triggerPoint) {
        setScrollProgress((currentScrollY - triggerPoint) / (endPoint - triggerPoint));
      } else {
        setScrollProgress(0);
      }

      // Theme switch happens at the very end of gradient scroll (~200vh)
      // This is where the About section (dark) begins
      const themeSwitch = windowHeight * 2;
      setIsDarkMode(currentScrollY >= themeSwitch);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerPoint]);

  // Close mobile menu on route change or scroll
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

  // Calculate width
  const maxContainerWidth = 1280;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;
  const containerWidth = Math.min(maxContainerWidth, viewportWidth - 32);
  
  const currentWidth = scrollProgress > 0 && initialWidth > 0 
    ? initialWidth + (containerWidth - initialWidth) * scrollProgress
    : undefined;

  const startY = triggerPoint;
  const navTopPosition = Math.max(16, startY - scrollY + 16);

  const linkPaddingX = 12 + (8 * scrollProgress);
  const linkGap = 4 + (4 * scrollProgress);
  
  // Consistent padding - same on all sides
  const containerPadding = 8;

  return (
    <>
      {/* Spacer to create scroll space */}
      <div className="relative z-[100] h-[200vh] -mt-[200vh] pointer-events-none" />
      
      {/* Single fixed nav that transforms based on scroll */}
      <div 
        className="fixed left-0 right-0 z-[100] flex justify-center pointer-events-none px-4"
        style={{ top: `${navTopPosition}px` }}
      >
        <LiquidGlass
          theme={isDarkMode ? 'dark' : 'light'}
          blur={20}
          opacity={0.75}
          showBorder={true}
          showGradient={true}
          showLiquidBg={true}
          applyDistortion={false}
          className="rounded-full pointer-events-auto transition-all duration-300"
          style={{ 
            minWidth: currentWidth ? `${currentWidth}px` : 'auto',
            maxWidth: `${maxContainerWidth}px`,
            padding: `${containerPadding}px`,
          }}
        >
          <motion.div 
            ref={navRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
          <div className="gap-4 md:gap-6 flex items-center justify-between w-full">
            {/* Logo/Name with Image - Left */}
            <Link 
              href="/" 
              className={`
                flex items-center space-x-3 text-lg font-semibold transition-colors whitespace-nowrap flex-shrink-0 hover:opacity-70
                ${isDarkMode ? 'text-chalk' : 'text-ink'}
              `}
            >
              <Image 
                src="/projectImages/about/me.png" 
                alt="Ethan Rogers" 
                width={44} 
                height={44} 
                className="rounded-full object-cover"
              />
              <span className="hidden sm:inline">Ethan Rogers</span>
            </Link>
            
            {/* Desktop Navigation Menu - Center */}
            <nav className="hidden md:flex items-center" style={{ gap: `${linkGap}px` }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    text-base font-medium py-2 rounded-full transition-colors
                    ${isDarkMode ? 'text-chalk/60 hover:text-chalk' : 'text-ink/60 hover:text-ink'}
                  `}
                  style={{ paddingLeft: `${linkPaddingX}px`, paddingRight: `${linkPaddingX}px` }}
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
                ${isDarkMode 
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
                ${isDarkMode 
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
              theme={isDarkMode ? 'dark' : 'light'}
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
                        ${isDarkMode 
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
                  className="mt-4 pt-4 border-t border-chalk/10"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold transition-all
                      ${isDarkMode 
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
