"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { StaticHeader } from "@/components/sections/static-header";
import { CtaSection } from "@/components/sections/cta-section";
import { EnhancedFooter } from "@/components/sections/enhanced-footer";
import { WorkTimeline } from "@/components/sections/work-timeline";
import { GraduationCap, MapPin, Briefcase, Heart, Trophy, Music, ArrowDown } from "lucide-react";
import Link from "next/link";

const images = [
  { src: "/projectImages/about/baby.png", alt: "Baby photo", rotate: -6 },
  { src: "/projectImages/about/guitar.png", alt: "Playing guitar", rotate: 4 },
  { src: "/projectImages/about/golf.png", alt: "Golfing", rotate: -3 },
  { src: "/projectImages/about/husky.png", alt: "UW Husky", rotate: 5 },
];

const funFacts = [
  { icon: Trophy, label: "Handicap", value: "<20", description: "I can hit the ball a long way though" },
  { icon: Heart, label: "Team", value: "Mariners", description: "Pain is temporary" },
  { icon: Music, label: "Hobby", value: "Guitar", description: "Campfire certified" },
  { icon: GraduationCap, label: "Class of", value: "'22", description: "Go Huskies" },
];

export default function About() {
  return (
    <main className="min-h-screen bg-ink overflow-hidden">
      <StaticHeader theme="dark" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#0087ef]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0087ef]/5 rounded-full blur-[120px]" />
        </div>

        {/* Floating Images - Desktop */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
              className="absolute w-64 h-64 rounded-2xl overflow-hidden border border-chalk/10 shadow-2xl"
              style={{
                rotate: `${image.rotate}deg`,
                top: index === 0 ? '12%' : index === 1 ? '15%' : index === 2 ? '50%' : '55%',
                left: index === 0 ? '5%' : index === 1 ? '80%' : index === 2 ? '3%' : '82%',
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold text-chalk mb-8 leading-[0.9] tracking-tight"
          >
            Design meets
            <br />
            <span className="text-chalk/30">engineering</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-chalk/60 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            I bridge the gap between design and development—creating award-winning digital 
            experiences from concept to code. 4+ years building enterprise platforms that 
            serve thousands of users daily.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-chalk/[0.03] border border-chalk/[0.08]">
              <MapPin className="w-4 h-4 text-[#0087ef]" />
              <span className="text-sm text-chalk/70">Seattle, WA</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-chalk/[0.03] border border-chalk/[0.08]">
              <Briefcase className="w-4 h-4 text-[#0087ef]" />
              <span className="text-sm text-chalk/70">Kimberly-Clark</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-chalk/[0.03] border border-chalk/[0.08]">
              <GraduationCap className="w-4 h-4 text-[#0087ef]" />
              <span className="text-sm text-chalk/70">University of Washington</span>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-chalk/30">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-chalk/30" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Image + Bio Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Large Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/projectImages/about/me.png"
                  alt="Ethan Rogers"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-[#0087ef]/20 blur-2xl" />
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#0087ef]/10 blur-xl" />
            </motion.div>

            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0087ef] mb-4 block">
                  The Story
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-chalk mb-6">
                  I make things that work beautifully
                </h2>
                <div className="space-y-4 text-lg text-chalk/60 leading-relaxed">
                  <p>
                    Four years ago, I joined Kimberly-Clark with a simple mission: make enterprise software 
                    that doesn't make people want to throw their laptop out the window. Turns out, that's 
                    harder than it sounds—but also way more rewarding.
                  </p>
                  <p>
                    These days, I split my time between designing award-winning analytics platforms and 
                    building the frontend systems that power them. I speak fluent Figma and TypeScript, 
                    and I'm pretty good at translating "make it pop" into actual design decisions.
                  </p>
                  <p>
                    Graduate of the University of Washington, lifelong Mariners optimist, and firmly 
                    believe that the best interfaces are the ones you don't notice. Go Huskies.
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/work"
                  className="px-8 py-4 rounded-full bg-chalk text-ink font-semibold hover:bg-chalk/90 transition-all"
                >
                  View My Work
                </Link>
                <Link
                  href="/ethan-rogers-resume.pdf"
                  target="_blank"
                  className="px-8 py-4 rounded-full bg-chalk/[0.03] border border-chalk/[0.08] text-chalk hover:bg-chalk/[0.06] hover:border-[#0087ef]/30 transition-all"
                >
                  Download Resume
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-24 px-4 md:px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chalk/10 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0087ef] mb-4 block">
              Off the Clock
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-chalk">
              When I'm Not Designing
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05] hover:border-[#0087ef]/30 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0087ef]/20 flex items-center justify-center mx-auto mb-4">
                  <fact.icon className="w-6 h-6 text-[#0087ef]" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-chalk/40 block mb-2">
                  {fact.label}
                </span>
                <span className="text-2xl font-semibold text-chalk block mb-1">
                  {fact.value}
                </span>
                <span className="text-sm text-chalk/50">
                  {fact.description}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Photo Grid - Mobile */}
          <div className="lg:hidden grid grid-cols-2 gap-4 mt-12">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square rounded-2xl overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-4 md:px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-chalk/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#0087ef] mb-4 block">
              Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-chalk">
              Skills & Tools
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4 p-8 rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05]"
            >
              <h3 className="text-xl font-semibold text-chalk">Design</h3>
              <ul className="space-y-3 text-chalk/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  User Experience Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  User Interface Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  User Research
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  Prototyping
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  Design Systems
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4 p-8 rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05]"
            >
              <h3 className="text-xl font-semibold text-chalk">Development</h3>
              <ul className="space-y-3 text-chalk/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  React / Next.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  Frontend Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  Performance Optimization
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 p-8 rounded-2xl bg-chalk/[0.02] border border-chalk/[0.05]"
            >
              <h3 className="text-xl font-semibold text-chalk">Tools</h3>
              <ul className="space-y-3 text-chalk/60">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  Figma
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  Adobe Creative Suite
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  Git / GitHub
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  PowerBI
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0087ef]" />
                  OpenAI / AI Tools
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Work Timeline */}
      <WorkTimeline />

      <CtaSection />
      <EnhancedFooter />
    </main>
  );
}
