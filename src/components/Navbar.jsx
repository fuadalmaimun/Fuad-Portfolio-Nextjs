"use client";

import React, { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import { SITE } from "../data/site";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Education", id: "education" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);


  // Scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const scrollPosition = window.scrollY + 160;
      let currentSection = "home";

      for (const item of NAV_ITEMS) {
        const element = document.getElementById(item.id);

        if (element && element.getBoundingClientRect().top + window.scrollY <= scrollPosition) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Navigate to a section without changing the URL hash
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    // Remove #section from the URL
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu with Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#08050d]/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* Bottom border */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-500 ${
          isScrolled
            ? "bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
            : "bg-transparent"
        }`}
      />

      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-8 lg:px-10">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleSectionClick(e, "home")}
          aria-label="Go to home section"
          className="group flex shrink-0 items-center gap-3"
        >
          <div>
            <p className="text-base font-semibold tracking-tight text-white sm:text-[17px]">
              Fuad<span className="text-purple-400">.</span>
            </p>

            <p className="text-[9px] uppercase tracking-[0.25em] text-slate-500">
              Developer
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleSectionClick(e, item.id)}
              className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                activeSection === item.id
                  ? "text-purple-300"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}

              {activeSection === item.id && (
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-purple-400" />
              )}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          {/* GitHub */}
          <a
            href="https://github.com/fuadalmaimun"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden rounded-full p-2.5 text-slate-400 transition hover:bg-purple-500/10 hover:text-purple-300 sm:inline-flex"
          >
            <FaGithub size={19} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/fuad-al-maimun-97ba42399/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden rounded-full p-2.5 text-slate-400 transition hover:bg-purple-500/10 hover:text-purple-300 sm:inline-flex"
          >
            <FaLinkedin size={19} />
          </a>

          {/* WhatsApp */}
          <a
            href="https://api.whatsapp.com/send/?phone=%2B8801300725948&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hidden rounded-full p-2.5 text-slate-400 transition hover:bg-purple-500/10 hover:text-purple-300 sm:inline-flex"
          >
            <FaWhatsapp size={19} />
          </a>

          <div className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />

          {/* Download Resume CTA */}
          <a
            href={SITE.resume.url}
            download={SITE.resume.downloadName}
            aria-label="Download resume (PDF)"
            className="group hidden items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-3.5 py-2 text-xs font-semibold text-purple-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400 hover:bg-purple-600 hover:text-white hover:shadow-lg hover:shadow-purple-900/30 sm:inline-flex lg:px-4 lg:text-sm"
          >
            <Download
              size={14}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
            Resume
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-300 transition hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white lg:hidden"
          >
            {isMobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        navItems={NAV_ITEMS}
        onSectionClick={handleSectionClick}
      />
    </header>
  );
};

export default Navbar;
