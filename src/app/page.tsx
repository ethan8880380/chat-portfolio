import { Header } from "@/components/sections/header";
import { BasiocHero } from "@/components/sections/basioc-hero";
import { ProjectTabs } from "@/components/sections/project";

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
        <ProjectTabs />
        {/* <Cta38 /> */}
        {/* <Team22 /> */}
      </div>
    </>
  );
}
