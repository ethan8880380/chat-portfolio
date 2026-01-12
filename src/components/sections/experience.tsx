"use client";

import { motion } from "framer-motion";
import { 
  Cog, 
  PencilRuler, 
  LayoutGrid, 
  Lightbulb
} from "lucide-react";

interface Specialization {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  stats?: string;
}

const specializations: Specialization[] = [
  {
    id: 1,
    title: "Enterprise UX",
    icon: <Cog className="w-6 h-6" />,
    description: "Complex analytics dashboards and internal platforms serving thousands of users daily.",
    stats: "1,500+ daily users",
  },
  {
    id: 2,
    title: "Consumer Web",
    icon: <LayoutGrid className="w-6 h-6" />,
    description: "Mobile-first experiences for global consumer brands with measurable engagement lifts.",
    stats: "+75% retention",
  },
  {
    id: 3,
    title: "Design Systems",
    icon: <PencilRuler className="w-6 h-6" />,
    description: "Scalable component libraries with Figma variables matched to Tailwind classes.",
    stats: "50% faster dev",
  },
  {
    id: 4,
    title: "Frontend Dev",
    icon: <Lightbulb className="w-6 h-6" />,
    description: "Next.js, React, and Tailwind expertise. Pixel-perfect implementation from Figma.",
    stats: "4+ years",
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-4 md:px-6 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0087ef]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0087ef]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0087ef] mb-4 block">
            Expertise
          </span>
          <h2 className="heading-base text-chalk">
            What I Do
          </h2>
        </motion.div>

        {/* Specializations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {specializations.map((specialization, index) => (
            <motion.div
              key={specialization.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl p-6 bg-chalk/[0.02] border border-chalk/[0.05] hover:border-[#0087ef]/30 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 bg-[#0087ef]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="relative z-10 w-12 h-12 rounded-xl bg-[#0087ef]/20 flex items-center justify-center mb-6 text-chalk">
                {specialization.icon}
              </div>

              <div className="relative z-10">
                <h4 className="text-xl font-semibold mb-2 text-chalk">{specialization.title}</h4>
                {specialization.stats && (
                  <span className="inline-block text-xs font-mono px-2 py-1 rounded-full bg-[#0087ef]/20 text-[#0087ef] mb-3">
                    {specialization.stats}
                  </span>
                )}
                <p className="text-chalk/50 leading-relaxed">{specialization.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
