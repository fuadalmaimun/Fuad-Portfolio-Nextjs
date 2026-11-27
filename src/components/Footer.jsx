"use client";

import React, { useState, useEffect } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ArrowUp, Mail } from "lucide-react";
import { SITE, SOCIALS } from "../data/site";

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => {
  const [socials, setSocials] = useState(SOCIALS);
  const [email, setEmail] = useState(SITE.email);

  useEffect(() => {
    fetch("/api/public/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res?.success && res?.data?.socials) {
          setSocials({ ...SOCIALS, ...res.data.socials });
        }
        if (res?.success && res?.data?.socials?.email) {
          setEmail(res.data.socials.email);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer
      id="footer"
      className="relative scroll-mt-20 overflow-hidden bg-[#0A0518] px-6 py-12 text-white font-['Preahvihear'] md:px-10 lg:px-16"
    >
      {/* Top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-purple-600/15 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-600/15 blur-[100px]" />

      {/* Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-purple-950/20" />

      {/* Main Footer */}
      <div className="scroll-reveal-soft relative z-10 mx-auto max-w-6xl">
        {/* Top Content */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Left Content */}
          <div className="max-w-md text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Thanks for stopping by
            </h2>

            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Built with React, Next.js and Tailwind CSS. Have a project in
              mind? Head back to the contact section and let&apos;s talk.
            </p>
          </div>

          {/* Right Content */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
              Follow Me
            </p>

            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:bg-purple-600/20 hover:text-white hover:shadow-lg hover:shadow-purple-950/50"
              >
                <FaLinkedin size={17} />
              </a>

              {/* WhatsApp */}
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:bg-purple-600/20 hover:text-white hover:shadow-lg hover:shadow-purple-950/50"
              >
                <FaWhatsapp size={17} />
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:bg-purple-600/20 hover:text-white hover:shadow-lg hover:shadow-purple-950/50"
              >
                <Mail size={17} />
              </a>

              {/* Facebook */}
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:bg-purple-600/20 hover:text-white hover:shadow-lg hover:shadow-purple-950/50"
              >
                <FaFacebook size={17} />
              </a>

              {/* GitHub */}
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:bg-purple-600/20 hover:text-white hover:shadow-lg hover:shadow-purple-950/50"
              >
                <FaGithub size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-7 border-t border-white/10" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-gray-500">
            © {CURRENT_YEAR} Fuad Al Maimun. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-xs text-gray-600">
              Designed & Built with React & Tailwind CSS
            </p>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-500/30 hover:bg-purple-600/20 hover:text-white"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
