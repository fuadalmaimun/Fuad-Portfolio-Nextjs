"use client";

import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import About from '../src/components/About';
import SkillsSection from '../src/components/SkillsSection';
import Projects from '../src/components/Projects';
import Education from '../src/components/Education';
import Contact from '../src/components/Contact';
import Footer from '../src/components/Footer';
import ScrollSequence from '../src/components/ScrollSequence';
import { FRAME_SEQUENCES } from '../src/data/frames';

export default function Page() {
  return (
    <div className="home-scroll-bg relative min-h-screen bg-dark-bg text-text-primary">
      {/* Scroll-driven background — reuses the exact frame sequence, effects,
          colors and styling from the existing section page animation. */}
      <ScrollSequence
        pinMode="background"
        basePath={FRAME_SEQUENCES.about.basePath}
        count={FRAME_SEQUENCES.about.count}
        overlayClassName="bg-gradient-to-r from-[#08050d] via-[#08050d]/85 to-[#08050d]/40"
        canvasFilter="saturate(1.4) contrast(1.05) brightness(1.05)"
      >
        {/* Background Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-1/4 h-56 w-56 rounded-full bg-purple-700/20 blur-[90px] sm:h-80 sm:w-80 lg:h-[480px] lg:w-[480px]" />

          <div className="absolute -right-20 top-10 h-60 w-60 rounded-full bg-violet-600/20 blur-[100px] sm:h-80 sm:w-80 lg:h-[520px] lg:w-[520px]" />

          <div className="absolute bottom-[-10%] left-1/3 h-56 w-56 rounded-full bg-fuchsia-600/10 blur-[100px] sm:h-80 sm:w-80" />

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize:
                "clamp(32px, 5vw, 64px) clamp(32px, 5vw, 64px)",
            }}
          />
        </div>
      </ScrollSequence>

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <SkillsSection />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
