"use client";

import { motion } from "framer-motion";
import { Cog, PencilRuler, LayoutGrid, Lightbulb, Mail, User } from "lucide-react";
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
    title: "UX Design",
    icon: <Cog className="w-6 h-6" />,
    description: "Specialized in designing complex enterprise applications that balance advanced functionality with usability."
  },
  {
    id: 2,
    title: "Consumer Web",
    icon: <LayoutGrid className="w-6 h-6" />,
    description: "Created engaging user experiences for consumer-facing websites with a mobile first approach."
  },
  {
    id: 3,
    title: "Product Design",
    icon: <PencilRuler className="w-6 h-6" />,
    description: "End-to-end product design including research, wireframing, prototyping, and design implementation."
  },
  {
    id: 4,
    title: "Frontend Development",
    icon: <Lightbulb className="w-6 h-6" />,
    description: "Experienced in NextJS, TailwindCSS, and React. Tranforming designs into applications exactly as they look in Figma."
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-12 px-6 pb-24">
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
      </div>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="flex flex-col gap-4 p-8 rounded-lg bg-foreground/10">
          <div className="p-3 mb-6 rounded-md bg-foreground/10 w-fit text-primary">
            <User className="w-6 h-6" />
          </div>
          <div className="flex flex-row gap-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">Email</h1>
              <p className="text-lg text-muted-foreground underline">
                <a href="mailto:ethan0380@gmail.com" className="hover:text-primary">ethan0380@gmail.com</a>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">Phone</h1>
              <p className="text-lg text-muted-foreground underline">
                <a href="tel:253-888-0380" className="hover:text-primary">253-888-0380</a>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">Location</h1>
              <p className="text-lg text-muted-foreground">Seattle, WA</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-8 rounded-lg bg-foreground/10">
          <div className="p-3 mb-6 rounded-md bg-foreground/10 w-fit text-primary">
            <User className="w-6 h-6" />
          </div>
          <div className="flex flex-row gap-12">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">Linkedin</h1>
              <p className="text-lg text-muted-foreground underline">
                <a href="https://www.linkedin.com/in/ethan-rogers/" className="hover:text-primary">My LinkedIn</a>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">Github</h1>
              <p className="text-lg text-muted-foreground underline">
                <a href="https://github.com/ethan8880380" className="hover:text-primary">My Github</a>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">Resume</h1>
              <p className="text-lg text-muted-foreground underline">
                <a href="/ethan-rogers-resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Download Resume</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
