"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-foreground/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-foreground/80"
          >
            © 2024 All rights reserved.
          </motion.p>
          <nav className="hidden md:flex gap-6">
            <a href="#experience" className="text-sm text-foreground/80 hover:text-foreground">Experience</a>
            <a href="#projects" className="text-sm text-foreground/80 hover:text-foreground">Projects</a>
            <a href="#about" className="text-sm text-foreground/80 hover:text-foreground">About</a>
          </nav>
        </div>

        <Button variant="outline" size="sm" asChild>
          <a href="/contact" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </a>
        </Button>
      </div>
    </footer>
  );
}
