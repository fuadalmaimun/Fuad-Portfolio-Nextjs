"use client";

import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import About from '../src/components/About';
import SkillsSection from '../src/components/SkillsSection';
import Projects from '../src/components/Projects';
import Education from '../src/components/Education';
import Contact from '../src/components/Contact';
import Footer from '../src/components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      <Navbar />
      <main>
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
