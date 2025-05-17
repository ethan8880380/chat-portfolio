import { Header } from "@/components/sections/header";
import { BasiocHero } from "@/components/sections/basioc-hero";
import { NewGallery } from "@/components/sections/new-gallery";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
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
        
        <NewGallery />
        <Experience />
        <Footer />
        {/* <Cta38 /> */}
        {/* <Team22 /> */}
      </div>
    </>
  );
}
