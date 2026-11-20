import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import SkillsSection from "./components/SkillsSection";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "../styles/globals.css";

export default function Home() {
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