"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Ethan's work on the Analytics Hub transformed how our commercial teams make decisions. The interface is intuitive, powerful, and has become indispensable to our daily operations.",
    author: "Marwa Salhut",
    position: "Director of CA",
    company: "Kimberly-Clark",
    project: "Commercial Analytics Hub",
  },
  {
    quote: "Ethan combines rare technical depth with genuine design intuition. He doesn't just make things look good—he makes them work beautifully for real users.",
    author: "Andy Ford",
    position: "Director of Design",
    company: "Kimberly-Clark",
  },
  {
    quote: "Ethan makes collaborating on design effortless. He gets the details and helps turn ideas into great solutions. He’s the bridge between design and engineering every team wants.",
    author: "Nancy Ma",
    position: "UX Designer",
    company: "Kimberly-Clark",
    project: "Multiple Projects",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 md:px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0087ef] mb-4 block">
            Testimonials
          </span>
          <h2 className="heading-base text-white">
            What People Say
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial} 
              index={index}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company?: string;
    project?: string;
  };
  index: number;
  featured?: boolean;
}

function TestimonialCard({ testimonial, index, featured }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`
        relative p-6 md:p-8 rounded-2xl overflow-hidden
        ${featured 
          ? "bg-[#0087ef]/10 border border-[#0087ef]/20" 
          : "bg-white/[0.02] border border-white/[0.05]"
        }
      `}
    >
      {/* Shimmer */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 shimmer opacity-50" />
      </div>

      <div className="relative">
        {/* Quote Icon */}
        <div className={`
          w-10 h-10 rounded-xl flex items-center justify-center mb-6
          ${featured ? "bg-[#0087ef]/20" : "bg-white/5"}
        `}>
          <Quote className={`w-5 h-5 ${featured ? "text-[#0087ef]" : "text-white/40"}`} />
        </div>

        {/* Quote Text */}
        <blockquote className="text-lg md:text-xl leading-relaxed mb-8 text-white/80">
          "{testimonial.quote}"
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold
            ${featured 
              ? "bg-[#0087ef] text-white" 
              : "bg-white/10 text-white/70"
            }
          `}>
            {testimonial.author.split(" ").map((n) => n[0]).join("")}
          </div>
          
          <div>
            <p className="font-semibold text-white">
              {testimonial.author}
            </p>
            <p className="text-sm text-white/50">
              {testimonial.position}
              {testimonial.company && ` · ${testimonial.company}`}
            </p>
          </div>
        </div>

        {/* Project Badge */}
        {testimonial.project && (
          <div className="absolute top-6 right-6 text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/10">
            {testimonial.project}
          </div>
        )}
      </div>
    </motion.div>
  );
}
