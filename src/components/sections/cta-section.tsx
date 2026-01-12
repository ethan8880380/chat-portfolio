"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Download, Sparkles, Mail, Phone, MapPin, Linkedin, Github, FileText, ArrowUpRight } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import Link from "next/link";

const contactInfo = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "ethan0380@gmail.com",
    href: "mailto:ethan0380@gmail.com",
  },
  { 
    icon: Phone, 
    label: "Phone", 
    value: "253-888-0380",
    href: "tel:253-888-0380",
  },
  { 
    icon: MapPin, 
    label: "Location", 
    value: "Seattle, WA",
    href: null,
  },
];

const socialLinks = [
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/in/ethan-rogers/",
  },
  { 
    icon: Github, 
    label: "GitHub", 
    href: "https://github.com/ethan8880380",
  },
  { 
    icon: FileText, 
    label: "Resume", 
    href: "/ethan-rogers-resume.pdf",
  },
];

export function CtaSection() {
  const { setShouldExpandChat } = useChatContext();

  const handleChatOpen = () => {
    setShouldExpandChat(true);
  };

  return (
    <section className="py-24 px-4 md:px-6 overflow-hidden relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#0087ef]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Main CTA Card */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-3xl bg-[#0087ef]/50 p-px">
              <div className="w-full h-full rounded-3xl bg-black" />
            </div>

            <div className="relative p-8 md:p-16">
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {/* Gradient Orbs */}
                <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] rounded-full bg-[#0087ef]/10 blur-[100px] animate-blob" />
                <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] rounded-full bg-[#0087ef]/10 blur-[80px] animate-blob animation-delay-2000" />
                
                {/* Grid Pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                >
                  <Sparkles className="w-4 h-4 text-[#0087ef]" />
                  <span className="text-sm font-mono text-white/60">Available for new opportunities</span>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl md:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight"
                >
                  Let's get to work
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto"
                >
                  I'm currently seeking new opportunities, collaborations, and conversations 
                  about design, development, and everything in between.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all group"
                  >
                    Get in Touch
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <button 
                    onClick={handleChatOpen}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-[#0087ef]/30 transition-all group"
                  >
                    <MessageSquare className="w-4 h-4 text-[#0087ef]" />
                    Try My Chatbot
                  </button>

                  <a 
                    href="/ethan-rogers-resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white/60 hover:text-white transition-all group"
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact & Social Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-8">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-2xl p-6 md:p-8 bg-white/[0.02] border border-white/[0.05]"
          >
            <h4 className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-6">Contact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white/40">
                    <item.icon className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase tracking-wider">{item.label}</span>
                  </div>
                  {item.href ? (
                    <a 
                      href={item.href}
                      className="text-white hover:text-[#0087ef] transition-colors font-medium"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white font-medium">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Social Links Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="rounded-2xl p-6 md:p-8 bg-white/[0.02] border border-white/[0.05]"
          >
            <h4 className="text-sm font-mono uppercase tracking-[0.2em] text-white/40 mb-6">Connect</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-[#0087ef]/30 hover:bg-[#0087ef]/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-white/50 group-hover:text-[#0087ef] transition-colors" />
                    <span className="font-medium text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-[#0087ef] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
