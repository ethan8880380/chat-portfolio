"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Cta38 } from "./list-projects";
import { Projects } from "./projects";

export function ProjectTabs() {
  // Sample project data for the list view
  const listProjectsData = {
    tagline: "Featured Projects",
    hoverLinks: [
      {
        url: "#",
        listNumber: "01",
        heading: "Analytics Hub",
        image: {
          src: "/projects.png",
          alt: "Analytics Hub"
        }
      },
      {
        url: "#",
        listNumber: "02",
        heading: "Huggies Redesign",
        image: {
          src: "/citation.png",
          alt: "Huggies Redesign"
        }
      },
      {
        url: "#",
        listNumber: "03",
        heading: "AI Chatbot Interface",
        image: {
          src: "/projects.png",
          alt: "AI Chatbot Interface"
        }
      }
    ]
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        
        <div className="mt-10">
          <Tabs defaultValue="gallery" className="w-full">
            <div className="flex justify-left mb-8 items-center gap-6">

              <TabsList>
                <TabsTrigger value="gallery">List View</TabsTrigger>
                <TabsTrigger value="list">Gallery View</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="gallery" className="mt-6">
              <Cta38 {...listProjectsData} />
            </TabsContent>
            
            <TabsContent value="list" className="mt-6">
              <Projects />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default ProjectTabs;

