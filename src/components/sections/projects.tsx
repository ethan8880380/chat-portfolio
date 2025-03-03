"use client";

import { useRef, useEffect } from "react";

const projects = [
  {
    id: 1,
    title: "Analytics Hub",
    image: "https://placehold.co/600x600",
  },
  {
    id: 2, 
    title: "Huggies Redesign",
    image: "https://placehold.co/600x600",
  },
  {
    id: 3,
    title: "Design System",
    image: "https://placehold.co/600x600",
  },
  {
    id: 4,
    title: "Real Estate Platform", 
    image: "https://placehold.co/600x600",
  },
  {
    id: 5,
    title: "AI Dashboard Generator",
    image: "https://placehold.co/600x600",
  }
];

export function Projects() {
  return (
    <section className="">
      <div className="container mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="aspect-video overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
