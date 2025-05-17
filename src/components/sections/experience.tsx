"use client";

import { motion } from "framer-motion";
import { Cog, PencilRuler, LayoutGrid, Lightbulb, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Specialization {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const specializations: Specialization[] = [
  {
    id: 1,
    title: "Enterprise UX",
    icon: <Cog className="w-6 h-6" />,
    description: "Specialized in designing complex enterprise applications that balance advanced functionality with usability."
  },
  {
    id: 2,
    title: "Consumer Web",
    icon: <LayoutGrid className="w-6 h-6" />,
    description: "Created engaging user experiences for consumer-facing websites with a focus on conversion and brand consistency."
  },
  {
    id: 3,
    title: "Product Design",
    icon: <PencilRuler className="w-6 h-6" />,
    description: "End-to-end product design including research, wireframing, prototyping, and design implementation."
  },
  {
    id: 4,
    title: "Innovation",
    icon: <Lightbulb className="w-6 h-6" />,
    description: "Pioneered new approaches to UX challenges, including AI-powered interfaces and novel visualization techniques."
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-12 px-6">
      <div className="">


        {/* Specializations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {specializations.map((specialization, index) => (
            <motion.div
              key={specialization.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-foreground/10 rounded-lg p-8 transition-colors"
            >
              <div className="p-3 mb-6 rounded-md bg-foreground/10 w-fit text-primary">
                {specialization.icon}
              </div>
              <h4 className="text-xl font-medium mb-3">{specialization.title}</h4>
              <p className="text-foreground/80">{specialization.description}</p>
            </motion.div>
          ))}
        </div>
        {/* Experience */}
        <div className="flex flex-row gap-4 items-center justify-between p-4 px-6 rounded-lg bg-foreground/10 mt-8">
            <div className="flex flex-row gap-2">
              <h2 className="text-xl font-bold">Want to know more about my work experience?</h2>
              <p className="text-xl max-w-2xl">Let's connect and discuss how I can help you with your next project.</p>
            </div>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">
                <Mail className="w-4 h-4" />
                <span>Contact me</span>
              </a>
            </Button>
        </div>
      </div>
    </section>
  );
}
