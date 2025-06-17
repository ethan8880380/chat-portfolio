import { Header } from "@/components/sections/header";
import { BasiocHero } from "@/components/sections/basioc-hero";
import { Experience } from "@/components/sections/experience";
import { AboutSection } from "@/components/sections/about";
import { projectsData } from "@/data/projects";
import { WorkProjects } from "@/components/sections/work-projects";

export default function Home() {
  return (
    <>
      {/* <AnimatedGradientBackground 
        Breathing={true}
        startingGap={150}
        animationSpeed={0.01}
        breathingRange={10}
        topOffset={-30}
        containerClassName="fixed top-0 left-0 w-full -z-50"
        containerStyle={{
          position: 'fixed',
          pointerEvents: 'none'
        }}
      /> */}
      <div className="relative">
        <Header />
        <BasiocHero />
        
        {/* Gallery Section with Title */}
        <div className="px-4 md:px-6">
          <WorkProjects projects={projectsData} />
        </div>
        {/* <NewGallery /> */}
        <AboutSection />
        <Experience />
        {/* <Cta38 /> */}
        {/* <Team22 /> */}
      </div>
    </>
  );
}
