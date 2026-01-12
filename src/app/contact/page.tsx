"use client";

import { motion } from "framer-motion";
import { StaticHeader } from "@/components/sections/static-header";
import { EnhancedFooter } from "@/components/sections/enhanced-footer";
import { Mail, Phone, MapPin, Linkedin, Github, FileText, ArrowUpRight, Send } from "lucide-react";

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
    description: "Connect with me professionally",
  },
  { 
    icon: Github, 
    label: "GitHub", 
    href: "https://github.com/ethan8880380",
    description: "Check out my code",
  },
  { 
    icon: FileText, 
    label: "Resume", 
    href: "/ethan-rogers-resume.pdf",
    description: "Download my resume",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-ink">
      <StaticHeader theme="dark" />
      
      <section className="pt-32 pb-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0087ef] mb-4 block">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold text-chalk mb-6 leading-tight tracking-tight">
              Let's Work Together
            </h1>
            <p className="text-lg md:text-xl text-chalk/50 max-w-2xl mx-auto">
              I'm currently seeking new opportunities and always open to discussing 
              interesting projects and collaborations.
            </p>
          </motion.div>

          {/* Main Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden mb-8"
          >
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-3xl bg-[#0087ef]/30 p-px">
              <div className="w-full h-full rounded-3xl bg-ink" />
            </div>

            <div className="relative p-8 md:p-12">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0087ef]/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold text-chalk mb-8">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#0087ef]/20">
                          <item.icon className="w-5 h-5 text-[#0087ef]" />
                        </div>
                        <span className="text-sm font-mono uppercase tracking-wider text-chalk/40">
                          {item.label}
                        </span>
                      </div>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="text-xl text-chalk hover:text-[#0087ef] transition-colors font-medium"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-xl text-chalk font-medium">{item.value}</span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Primary CTA */}
                <a 
                  href="mailto:ethan0380@gmail.com"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-chalk text-ink font-semibold hover:bg-chalk/90 transition-all group"
                >
                  <Send className="w-5 h-5" />
                  Send me an email
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-chalk/40 mb-6">
              Connect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05] hover:border-[#0087ef]/30 hover:bg-[#0087ef]/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-chalk/5 group-hover:bg-[#0087ef]/20 transition-colors">
                      <item.icon className="w-5 h-5 text-chalk/50 group-hover:text-[#0087ef] transition-colors" />
                    </div>
                    <div>
                      <span className="font-semibold text-chalk group-hover:text-chalk transition-colors block">
                        {item.label}
                      </span>
                      <span className="text-sm text-chalk/40">{item.description}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-chalk/30 group-hover:text-[#0087ef] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      <EnhancedFooter />
    </main>
  );
}
