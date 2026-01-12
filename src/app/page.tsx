import { Experience } from "@/components/sections/experience";
import { AboutSection } from "@/components/sections/about";
import { GradientScroll } from "@/components/ui/gradient-scroll";
import { ScrollingHero } from "@/components/sections/scrolling-hero";
import { FloatingNav } from "@/components/sections/floating-nav";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { StatsMarquee } from "@/components/sections/stats-marquee";
import { WorkTimeline } from "@/components/sections/work-timeline";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";
import { EnhancedFooter } from "@/components/sections/enhanced-footer";
import { StaticHeader } from "@/components/sections/static-header";

export default function Home() {
  return (
    <>
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Mobile Header - Only visible on mobile */}
      <div className="md:hidden">
        <StaticHeader theme="dark" />
      </div>

      {/* Hero Section with Scrolling Images - Fixed background (handles mobile internally) */}
      <ScrollingHero />
      
      {/* Desktop only: Floating Nav */}
      <div className="hidden md:block">
        <FloatingNav />
      </div>
      
      {/* Desktop only: Gradient Animation Section */}
      <div className="hidden md:block relative z-10 -mt-[50vh]">
        <GradientScroll />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 bg-black">
        {/* About Section with floating images - Desktop only since mobile hero has this content */}
        <div className="hidden md:block">
          <AboutSection />
        </div>
        
        {/* Skills & Stats Marquee */}
        <StatsMarquee />
        
        {/* Specializations Grid */}
        <Experience />

        {/* Work Timeline */}
        <WorkTimeline />
        
        {/* Featured Projects Showcase */}
        <FeaturedProjects />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Call to Action */}
        <CtaSection />
        
        {/* Footer */}
        <EnhancedFooter />
      </div>
    </>
  );
}
