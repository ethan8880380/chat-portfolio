"use client";

import { motion } from "framer-motion";
import { 
  Award,
  Users,
  TrendingUp,
  Clock,
  Target,
  Zap,
  BarChart3,
  Sparkles
} from "lucide-react";

const stats = [
  { icon: Award, label: "GDUSA Award", value: "Winner", highlight: true },
  { icon: Users, label: "Daily Users", value: "1,500+" },
  { icon: TrendingUp, label: "User Retention", value: "+75%" },
  { icon: Clock, label: "Dev Cycles Cut", value: "50%" },
  { icon: Target, label: "User Drop-off Reduced", value: "50%" },
  { icon: BarChart3, label: "Sessions Increased", value: "+60%" },
  { icon: Zap, label: "Years Experience", value: "4+" },
  { icon: Sparkles, label: "Parent Interviews", value: "50+" },
];

const skills = [
  "Figma",
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "PowerBI",
  "OpenAI",
  "User Research",
  "Prototyping",
  "Design Systems",
  "A/B Testing",
  "Supabase",
  "Sanity.io",
  "Accessibility",
];

export function StatsMarquee() {
  return (
    <section className="py-20 overflow-hidden relative">
      {/* Gradient Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0087ef]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0087ef]/50 to-transparent" />
      
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 px-4 md:px-6"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0087ef]">
          Impact & Expertise
        </span>
      </motion.div>

      {/* Stats Row */}
      <div className="relative mb-8">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 45,
              ease: "linear",
            },
          }}
          className="flex gap-6"
        >
          {[...stats, ...stats, ...stats, ...stats].map((stat, index) => (
            <div
              key={index}
              className={`
                flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl border
                ${stat.highlight 
                  ? "bg-[#0087ef]/10 border-[#0087ef]/30" 
                  : "bg-chalk/[0.02] border-chalk/[0.05]"
                }
                backdrop-blur-sm
              `}
            >
              <div className={`p-2.5 rounded-xl ${stat.highlight ? "bg-[#0087ef]/20" : "bg-chalk/5"}`}>
                <stat.icon className={`w-5 h-5 ${stat.highlight ? "text-[#0087ef]" : "text-chalk/70"}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${stat.highlight ? "text-[#0087ef]" : "text-chalk"}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-chalk/50 font-mono uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Skills Row - Opposite Direction */}
      <div className="relative">
        <motion.div
          animate={{ x: [-1500, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
          className="flex gap-3"
        >
          {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-5 py-2.5 rounded-full bg-chalk/[0.03] border border-chalk/[0.08] text-chalk/70 text-sm font-medium whitespace-nowrap hover:bg-chalk/[0.06] hover:text-chalk transition-all cursor-default"
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
