"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Briefcase, 
  GraduationCap, 
  Code,
  MapPin
} from "lucide-react";

interface TimelineItem {
  id: number;
  type: "work" | "education" | "freelance";
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  link?: string;
}

const timeline: TimelineItem[] = [
  {
    id: 1,
    type: "freelance",
    title: "Full Stack Designer & Developer",
    company: "Freelance",
    location: "Seattle, WA",
    period: "2024 – Present",
    description: "Building custom digital solutions for clients, from real estate platforms to brand websites.",
    highlights: [
      "Designed real estate matching platform with complex algorithm - launching Q1 2025",
      "Built property development website with Next.js & Sanity.io CMS",
      "Showcasing 100+ projects for client portfolio",
    ],
  },
  {
    id: 2,
    type: "work",
    title: "UX Designer & Engineer",
    company: "Kimberly-Clark",
    location: "Remote, WA",
    period: "2021 – Present",
    description: "Leading end-to-end product design and development for enterprise platforms serving thousands of daily users.",
    highlights: [
      "GDUSA Award for digital design excellence on analytics hub",
      "1,500+ daily users on internal platform with OpenAI integration",
      "75% improvement in user retention on Huggies redesign",
      "50% reduction in development cycles via standardized templates",
      "Architected Figma design system with Tailwind-matched variables",
      "Influenced 2025 enterprise roadmap with Next.js standardization",
    ],
  },
  {
    id: 3,
    type: "work",
    title: "UX Intern",
    company: "Micro Focus",
    location: "Seattle, WA",
    period: "Summer 2019",
    description: "Modernized legacy application UI and created comprehensive icon library.",
    highlights: [
      "Redesigned Reflection Desktop UI (built in early 90s)",
      "Created 200+ icons aligned to corporate standards",
    ],
  },
  {
    id: 4,
    type: "education",
    title: "BDes in Interaction Design",
    company: "University of Washington",
    location: "Seattle, WA",
    period: "2018 – 2022",
    description: "Focused on human-centered design, prototyping, and interactive systems.",
    highlights: [
      "Human-Computer Interaction focus",
      "Design research methodologies",
    ],
  },
];

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  freelance: Code,
};

export function WorkTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0087ef]/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0087ef] mb-4 block">
            Experience
          </span>
          <h2 className="heading-base text-chalk">
            Where I've Worked
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - visible on md+ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-chalk/10 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-[#0087ef]"
              style={{ height: lineHeight }}
            />
          </div>
          
          {/* Mobile Line - visible on small screens */}
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px bg-chalk/10">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-[#0087ef]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
            {timeline.map((item, index) => {
              const Icon = typeIcons[item.type];
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`
                    relative pl-8 md:pl-0 
                    md:w-[calc(50%-32px)]
                    ${isEven ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"}
                  `}
                >
                  {/* Timeline Dot - Mobile */}
                  <div className="md:hidden absolute top-0 left-0 w-4 h-4 rounded-full bg-[#0087ef] shadow-lg shadow-[#0087ef]/30">
                    <div className="absolute inset-0.5 rounded-full bg-ink" />
                    <div className="absolute inset-1.5 rounded-full bg-[#0087ef]" />
                  </div>

                  {/* Timeline Dot - Desktop */}
                  <div className={`
                    hidden md:block absolute top-0 w-4 h-4 rounded-full bg-[#0087ef]
                    shadow-lg shadow-[#0087ef]/30
                    ${isEven ? "right-0 translate-x-[calc(100%+24px)]" : "left-0 -translate-x-[calc(100%+24px)]"}
                  `}>
                    <div className="absolute inset-0.5 rounded-full bg-ink" />
                    <div className="absolute inset-1.5 rounded-full bg-[#0087ef]" />
                  </div>

                  {/* Card */}
                  <div className="group relative p-6 rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05] hover:border-chalk/[0.1] transition-all hover:bg-chalk/[0.04]">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 shimmer" />
                    </div>
                    
                    <div className="relative">
                      {/* Header - Always left aligned */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2.5 rounded-xl bg-[#0087ef]/20">
                          <Icon className="w-5 h-5 text-chalk" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-mono text-chalk/40 uppercase tracking-wider">
                            {item.period}
                          </span>
                          <h3 className="text-xl font-semibold text-chalk mt-1">{item.title}</h3>
                          <p className="text-[#0087ef] font-medium">{item.company}</p>
                          <p className="text-chalk/40 text-sm flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </p>
                        </div>
                      </div>

                      {/* Description - Always left aligned */}
                      <p className="text-chalk/60 mb-4">
                        {item.description}
                      </p>

                      {/* Highlights - Always left aligned */}
                      <ul className="space-y-2">
                        {item.highlights.map((highlight, i) => (
                          <li 
                            key={i} 
                            className="text-sm text-chalk/50 flex items-start gap-2"
                          >
                            <span className="text-[#0087ef] mt-1.5">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
