"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CVPreview from "@/components/CVPreview";
import { SITE } from "../data/site";

const TEXTS = [
  "Fuad Al Maimun",
  "Full Stack Developer",
  "Passionate Web Developer",
  "Building Modern Web Apps",
];

const Hero = ({ initialProfile = null }) => {
  const [profile, setProfile] = useState(initialProfile);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (!initialProfile) {
      fetch("/api/public/profile")
        .then((r) => (r.ok ? r.json() : null))
        .then((res) => {
          if (res?.success && res?.data) {
            setProfile(res.data);
          }
        })
        .catch(() => {});
    }
  }, [initialProfile]);

  const activeTexts =
    profile?.rotatingTexts && profile.rotatingTexts.length > 0
      ? profile.rotatingTexts
      : TEXTS;

  // Typing animation
  useEffect(() => {
    const currentText = activeTexts[textIndex % activeTexts.length] || TEXTS[0];
    let timer;

    if (!isDeleting && displayText === currentText) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % activeTexts.length);
    } else {
      timer = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentText.slice(0, displayText.length - 1)
              : currentText.slice(0, displayText.length + 1)
          );
        },
        isDeleting ? 45 : 100
      );
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, activeTexts]);

  // Scroll to projects
  const scrollToProjects = () => {
    const projectsEl = document.getElementById("projects");

    if (projectsEl) {
      projectsEl.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const isName = textIndex === 0;

  return (
    <section
      id="home"
      className="relative overflow-x-clip text-white"
    >
      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 md:px-8 lg:px-12 lg:py-20">
        <div className="grid w-full grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 xl:gap-16">

          {/* Right Side / Profile
              Mobile: First
              Desktop: Right */}
          <div
            className={`relative order-1 flex min-w-0 justify-center transition-all delay-200 duration-1000 lg:order-2 lg:justify-end ${
              isLoaded
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <div className="relative flex aspect-square w-full max-w-[190px] items-center justify-center xs:max-w-[220px] sm:max-w-[290px] md:max-w-[340px] lg:max-w-[380px] xl:max-w-[420px]">
              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-[60px] sm:blur-[90px]" />

              {/* Decorative Circles */}
              <div className="absolute inset-0 rounded-full border border-purple-400/10" />

              <div className="absolute inset-[5%] rounded-full border border-purple-400/10" />

              {/* Profile Image */}
              <div className="relative z-10 h-[82%] w-[82%] overflow-hidden rounded-full border border-purple-300/20 bg-gradient-to-br from-purple-950 to-[#120b1d] p-1.5 shadow-2xl shadow-purple-950/50 sm:p-2">
                <div className="h-full w-full overflow-hidden rounded-full bg-[#100a18]">
                  <img
                    src={profile?.profileImage || "/images/profile.png.jpeg"}
                    alt="Fuad Al Maimun - Full Stack Developer"
                    className="h-full w-full object-cover object-center transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Left Side / Intro
              Mobile: After image
              Desktop: Left */}
          <div
            className={`order-2 min-w-0 text-center transition-all duration-1000 sm:order-2 lg:order-1 lg:text-left ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Intro */}
            <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 lg:mb-7 lg:justify-start">
              <span className="h-px w-7 shrink-0 bg-purple-500 sm:w-10" />

              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-purple-300 sm:text-xs sm:tracking-[0.22em]">
                {profile?.welcomeBadge || "Welcome to my portfolio"}
              </span>
            </div>

            {/* Heading */}
            <div className="min-w-0">
              <span className="mb-2 block text-sm font-medium text-slate-300 sm:text-lg lg:text-2xl">
                Hi, I&apos;m
              </span>

              <h1 className="min-h-[2.8em] break-words text-3xl font-bold leading-tight tracking-tight sm:min-h-[2.5em] sm:text-5xl lg:min-h-[2.4em] lg:text-6xl">
                <span
                  className={`bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent ${
                    isName
                      ? "text-3xl sm:text-5xl lg:text-6xl"
                      : "text-2xl sm:text-4xl lg:text-4xl xl:text-5xl"
                  }`}
                >
                  {displayText}
                </span>

                <span className="ml-1 inline-block h-[0.8em] w-[2px] animate-pulse rounded-full bg-fuchsia-400 align-middle sm:w-[3px]" />
              </h1>
            </div>

            {/* Description */}
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:mt-4 sm:text-base sm:leading-8 lg:mx-0 lg:mt-5">
              {profile?.description ||
                "I specialize in crafting high-performance, modern web applications using React, Next.js, TypeScript, and clean architecture."}
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start">
              {/* Primary Resume CTA with shimmer sweep on hover */}
              

              <button
                onClick={scrollToProjects}
                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-purple-500/40 bg-purple-950/30 px-6 py-3.5 text-sm font-semibold text-purple-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/70 hover:bg-purple-600/20 hover:text-white sm:w-auto sm:px-7 sm:text-base"
              >
                View Projects

                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>

              <div className="flex w-full justify-center sm:w-auto">
                <CVPreview />
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 lg:justify-start">
              <span className="w-full text-xs text-slate-500 sm:w-auto sm:text-sm">
                Connect with me
              </span>

              <a
                href="mailto:fuadmaymun0@gmail.com"
                aria-label="Email"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300"
              >
                <Mail size={18} />
              </a>

              <a
                href="https://github.com/fuadalmaimun"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://www.linkedin.com/in/fuad-al-maimun-97ba42399/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-300"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
