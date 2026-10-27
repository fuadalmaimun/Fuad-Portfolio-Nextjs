"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const MobileMenu = ({
  isOpen,
  onClose,
  activeSection,
  navItems,
  onSectionClick,
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
          {/* Navigation items */}
          <div className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={(e) => onSectionClick(e, item.id)}
                  className={`group flex w-full items-center justify-between rounded-xl border px-4 py-3.5 transition-all duration-200 ${
                    isActive
                      ? "border-purple-500/20 bg-purple-500/10 text-purple-300"
                      : "border-transparent bg-transparent text-slate-300 hover:border-purple-500/20 hover:bg-purple-500/10 hover:text-white"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 30}ms` : "0ms",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive
                          ? "bg-purple-400"
                          : "bg-slate-600 group-hover:bg-purple-400"
                      }`}
                    />

                    <span className="text-sm font-medium">
                      {item.label}
                    </span>
                  </span>

                  <span
                    className={`text-xs transition-transform duration-200 ${
                      isActive
                        ? "translate-x-0 text-purple-300"
                        : "-translate-x-1 text-slate-600 group-hover:translate-x-0 group-hover:text-purple-300"
                    }`}
                  >
                    →
                  </span>
                </a>
              );
            })}
          </div>

          {/* Social links */}
          <div className="mt-5 flex items-center justify-center gap-3 border-t border-white/10 pt-5">
            <a
              href="https://github.com/FuadAlMaimun-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
            >
              <FaGithub size={19} />
            </a>

            <a
              href="https://www.linkedin.com/in/fuad-al-maimun-97ba42399/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
            >
              <FaLinkedin size={19} />
            </a>

            <a
              href="https://api.whatsapp.com/send/?phone=%2B8801300725948&text&type=phone_number&app_absent=0"
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