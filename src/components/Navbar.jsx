"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import { SOCIALS } from "../data/site";
import { authClient } from "@/lib/auth-client";
import { NAV_ITEMS } from "./navbar/navData";
import NavLinks from "./navbar/NavLinks";
import NavbarAuth from "./navbar/NavbarAuth";

export { NAV_ITEMS };

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  // Highlight based on current path
  useEffect(() => {
    if (pathname === "/about") {
      setActiveSection("about");
    } else if (pathname.startsWith("/projects")) {
      setActiveSection("projects");
    } else if (pathname === "/contact") {
      setActiveSection("contact");
    } else if (pathname === "/") {
      setActiveSection("home");
    }
  }, [pathname]);

  // Scroll position and active section for home page
  useEffect(() => {
    if (pathname !== "/") return;

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

        if (
          element &&
          element.getBoundingClientRect().top + window.scrollY <= scrollPosition
        ) {
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
  }, [pathname]);

  // Handle section click smoothly when on "/"
  const handleNavClick = (e, item) => {
    if (pathname === "/" && item.href.startsWith("/#")) {
      e.preventDefault();
      const section = document.getElementById(item.id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(item.id);
      }
      setIsMobileMenuOpen(false);
    } else {
      setIsMobileMenuOpen(false);
    }
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

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const isAdmin = session?.user?.role === "admin";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled || pathname !== "/"
          ? "bg-[#08050d]/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      {/* Bottom border */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-all duration-500 ${
          isScrolled || pathname !== "/"
            ? "bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
            : "bg-transparent"
        }`}
      />

      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:h-[76px] sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Go to home"
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
        </Link>

        {/* Modular Desktop Navigation Links */}
        <NavLinks
          navItems={NAV_ITEMS}
          activeSection={activeSection}
          pathname={pathname}
          onNavClick={handleNavClick}
        />

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* GitHub */}
          <a
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden rounded-full p-2.5 text-slate-400 transition hover:bg-purple-500/10 hover:text-purple-300 sm:inline-flex"
          >
            <FaGithub size={19} />
          </a>

          {/* LinkedIn */}
          <a
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden rounded-full p-2.5 text-slate-400 transition hover:bg-purple-500/10 hover:text-purple-300 sm:inline-flex"
          >
            <FaLinkedin size={19} />
          </a>

          {/* WhatsApp */}
          <a
            href={SOCIALS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hidden rounded-full p-2.5 text-slate-400 transition hover:bg-purple-500/10 hover:text-purple-300 sm:inline-flex"
          >
            <FaWhatsapp size={19} />
          </a>

          {/* Login entry point or authenticated controls */}
          <div className="hidden lg:block">
            <NavbarAuth isAdmin={isAdmin} session={session} onSignOut={handleSignOut} />
          </div>

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
        onSectionClick={handleNavClick}
        isAdmin={isAdmin}
        session={session}
        onSignOut={handleSignOut}
      />
    </header>
  );
};

export default Navbar;
