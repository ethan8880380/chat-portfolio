import { ScrollingHero } from "@/components/sections/scrolling-hero";
import { FloatingNav } from "@/components/sections/floating-nav";

export default function ScrollingHeroDemo() {
  return (
    <main className="min-h-screen">
      <ScrollingHero />
      <FloatingNav />
    </main>
  );
}