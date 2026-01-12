"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight,
  MapPin
} from "lucide-react";

const navigation = {
  main: [
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
    { name: "Chatbot", href: "/chat" },
    { name: "Resume", href: "/ethan-rogers-resume.pdf", external: true },
  ],
  projects: [
    { name: "Analytics Hub", href: "/projects/commercial-analytics-hub" },
    { name: "Design System", href: "/projects/enterprise-design-system" },
    { name: "GenFEI Chatbot", href: "/projects/genfei-chatbot" },
    { name: "IRIS Analytics", href: "/projects/iris-analytics" },
  ],
  social: [
    { 
      name: "GitHub", 
      href: "https://github.com/ethan8880380", 
      icon: Github 
    },
    { 
      name: "LinkedIn", 
      href: "https://www.linkedin.com/in/ethan-rogers/", 
      icon: Linkedin 
    },
    { 
      name: "Email", 
      href: "mailto:ethan0380@gmail.com", 
      icon: Mail 
    },
  ],
};

export function EnhancedFooter() {
  return (
    <footer className="relative border-t border-white/[0.05]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0087ef]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-4 mb-6 group">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#0087ef]/30 transition-colors">
                <Image
                  src="/projectImages/about/me.png"
                  alt="Ethan Rogers"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-semibold text-white block">Ethan Rogers</span>
                <span className="text-sm text-white/40">UX Designer & Engineer</span>
              </div>
            </Link>
            
            <p className="text-white/50 max-w-md mb-6 leading-relaxed">
              UX Designer and researcher with significant front-end programming expertise, 
              building award-winning platforms at Kimberly-Clark.
            </p>

            <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
              <MapPin className="w-4 h-4" />
              <span>Seattle, WA</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {navigation.social.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target={item.name !== "Email" ? "_blank" : undefined}
                  rel={item.name !== "Email" ? "noopener noreferrer" : undefined}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-[#0087ef]/30 hover:bg-[#0087ef]/5 transition-all group"
                  aria-label={item.name}
                >
                  <item.icon className="w-5 h-5 text-white/50 group-hover:text-[#0087ef] transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-6">Navigation</h4>
            <ul className="space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a 
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <Link 
                      href={item.href}
                      className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                    >
                      {item.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white/30 mb-6">Featured Work</h4>
            <ul className="space-y-4">
              {navigation.projects.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.05] mt-16 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-white/30 text-center md:text-left font-mono">
              © {new Date().getFullYear()} Ethan Rogers
            </p>

            {/* Built With */}
            <p className="text-sm text-white/30 font-mono">
              Next.js · Tailwind · Framer Motion
            </p>
          </div>
        </div>
      </div>

      {/* Large Name Background */}
      <div className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center pb-8"
        >
          <h2 
            className="text-[18vw] md:text-[14vw] font-bold text-white/[0.02] leading-none select-none tracking-tighter"
            aria-hidden="true"
          >
            ETHAN
          </h2>
        </motion.div>
      </div>
    </footer>
  );
}
