"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SOCIALS } from "../data/site";
import MobileNavLinks from "./navbar/MobileNavLinks";
import NavbarAuth from "./navbar/NavbarAuth";

const MobileMenu = ({
  isOpen,
  onClose,
  activeSection,
  navItems,
  onSectionClick,
  isAdmin,
  session,
  onSignOut,
}) => {
  return (
    <>
      {/* Background overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 top-[68px] z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 sm:top-[76px] lg:hidden ${
          isOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      />

      {/* Menu panel */}
      <div
        id="mobile-navigation"
        aria-hidden={!isOpen}
        className={`absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-[#0c0714]/[0.98] px-4 pb-6 pt-3 shadow-2xl shadow-black/30 backdrop-blur-2xl transition-all duration-300 sm:px-8 lg:hidden ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-xl">
          {/* Modular Mobile Navigation Items */}
          <MobileNavLinks
            navItems={navItems}
            activeSection={activeSection}
            isOpen={isOpen}
            onNavClick={onSectionClick}
          />

          {/* Modular Auth Controls (No signin/signup link shown if unauthenticated) */}
          <NavbarAuth
            isAdmin={isAdmin}
            session={session}
            onSignOut={onSignOut}
            isMobile={true}
            onClose={onClose}
          />

          {/* Social links */}
          <div className="mt-5 flex items-center justify-center gap-3 border-t border-white/10 pt-5">
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
            >
              <FaGithub size={19} />
            </a>

            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
            >
              <FaLinkedin size={19} />
            </a>

            <a
              href={SOCIALS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
            >
              <FaWhatsapp size={19} />
            </a>
          </div>

          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.2em] text-slate-600">
            Fuad Al Maimun · Developer
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
