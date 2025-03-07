import Image from "next/image";
import { Header } from "@/components/sections/header";
export default function About() {
  return (
    
    <main className="min-h-screen">
        <Header />
      <section className="px-6 pt-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <h1 className="text-4xl font-semibold">About Me</h1>
            <p className="text-lg leading-relaxed">
              I&apos;m a UX Designer and Developer with a passion for creating intuitive, user-centered digital experiences. With expertise in both design and front-end development, I bridge the gap between aesthetics and functionality to build products that truly resonate with users.
            </p>
            <p className="text-lg leading-relaxed">
              My approach combines thorough user research, iterative design processes, and clean, efficient code implementation. I specialize in React, Next.js, and modern web technologies while maintaining a strong foundation in UX principles and design systems.
            </p>
          </div>
          <div className="col-span-2">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src="/myself.png"
                alt="Profile picture"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Design Skills</h3>
            <ul className="space-y-2">
              <li>User Experience Design</li>
              <li>User Interface Design</li>
              <li>User Research</li>
              <li>Prototyping</li>
              <li>Design Systems</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Development Skills</h3>
            <ul className="space-y-2">
              <li>React / Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Frontend Architecture</li>
              <li>Performance Optimization</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Tools & Methods</h3>
            <ul className="space-y-2">
              <li>Figma</li>
              <li>Adobe Creative Suite</li>
              <li>Git</li>
              <li>Agile Methodology</li>
              <li>Design Thinking</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
