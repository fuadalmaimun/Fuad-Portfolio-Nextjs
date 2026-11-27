"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import CVPreview from "@/components/CVPreview";
import { SITE } from "../data/site";

const TEXTS = [
  "Fuad Al Maimun",
  "Full-Stack Web Developer",
  "Passionate Web Developer",
  "Building Modern Web Apps",
];

const FALLBACK_ROLES = [
  "Full-Stack Web Developer",
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

  const fullName = (profile?.name || SITE.name || "Fuad Al Maimun").trim();
  const [firstName, ...nameRest] = fullName.split(" ");
  const restName = nameRest.join(" ");

  const activeTexts =
    profile?.rotatingTexts && profile.rotatingTexts.length > 0
      ? profile.rotatingTexts
      : TEXTS;

  // Roles rotate under the static name, so drop the duplicated name entry.
  const roles = useMemo(() => {
    const filtered = activeTexts.filter(
      (text) => text && text.trim().toLowerCase() !== fullName.toLowerCase()
    );

    return filtered.length > 0 ? filtered : FALLBACK_ROLES;
  }, [activeTexts, fullName]);

  // Typing animation
  useEffect(() => {
    const currentText = roles[textIndex % roles.length] || FALLBACK_ROLES[0];
    let timer;

    if (!isDeleting && displayText === currentText) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentText.slice(0, displayText.length - 1)
              : currentText.slice(0, displayText.length + 1)
          );
        },
        isDeleting ? 40 : 95
      );
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex, roles]);

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

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden text-white"
    >
      {/* ================= Content ================= */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-5 pb-28 pt-28 sm:px-8 sm:pb-32 sm:pt-32 md:px-10 lg:px-12 lg:pb-24 lg:pt-24">
        <div className="grid w-full grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 xl:gap-16">
          {/* ---------- Intro copy ---------- */}
          <div
            className={`order-2 min-w-0 text-center transition-all duration-1000 ease-out lg:order-1 lg:text-left ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            {/* Eyebrow */}
            <div className="mb-5 flex items-center justify-center gap-3 sm:mb-6 lg:justify-start">
              <span className="h-px w-10 shrink-0 bg-gradient-to-r from-transparent to-purple-400 sm:w-14" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-purple-200/90 sm:text-xs sm:tracking-[0.32em]">
                {profile?.welcomeBadge || "Welcome to my portfolio"}
              </span>
            </div>

            {/* Name */}
            <p className="text-lg font-normal text-slate-200 sm:text-xl lg:text-2xl">
              Hi, I&apos;m
            </p>

            <h1 className="mt-1 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-6xl xl:text-7xl">
              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(168,85,247,0.25)]">
                {firstName}
              </span>{" "}
              <span className="text-white">{restName}</span>
            </h1>

            {/* Rotating role with hand-drawn underline */}
            <div className="relative mt-3 inline-block max-w-full sm:mt-4">
              <p
                className="min-h-[1.4em] text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl"
                aria-live="polite"
              >
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                  {displayText}
                </span>

                <span className="hero-cursor ml-1 inline-block h-[0.9em] w-[2px] rounded-full bg-fuchsia-400 align-middle sm:w-[3px]" />
              </p>

              <svg
                aria-hidden="true"
                viewBox="0 0 240 14"
                fill="none"
                className="mt-1 h-2.5 w-40 text-purple-500/80 sm:w-52 lg:w-60"
              >
                <path
                  d="M2 9C46 3 96 2 140 5c28 2 62 4 98 2"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300/90 sm:text-base sm:leading-8 lg:mx-0">
              {profile?.description ||
                "I specialize in crafting high-performance, modern web applications using React, Next.js, TypeScript, and clean architecture."}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start">
              <button
                onClick={scrollToProjects}
                className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(168,85,247,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-16px_rgba(217,70,239,0.85)] hover:brightness-110 sm:w-auto sm:text-base"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative">View Projects</span>

                <ArrowRight
                  size={18}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <div className="flex w-full justify-center sm:w-auto">
                <CVPreview />
              </div>
            </div>

            {/* Social links */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:mt-10 lg:justify-start">
              <span className="text-sm text-slate-300">Connect with me:</span>

              <div className="flex items-center gap-2.5">
                <a
                  href={`mailto:${profile?.email || SITE.email}`}
                  aria-label="Email"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:bg-purple-500/15 hover:text-white hover:shadow-[0_12px_30px_-12px_rgba(168,85,247,0.9)]"
                >
                  <Mail size={18} />
                </a>

                <a
                  href="https://github.com/fuadalmaimun"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:bg-purple-500/15 hover:text-white hover:shadow-[0_12px_30px_-12px_rgba(168,85,247,0.9)]"
                >
                  <FaGithub size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/in/fuad-al-maimun-97ba42399/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:bg-purple-500/15 hover:text-white hover:shadow-[0_12px_30px_-12px_rgba(168,85,247,0.9)]"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* ---------- Profile visual ---------- */}
          <div
            className={`order-1 flex min-w-0 justify-center transition-all delay-150 duration-1000 ease-out lg:order-2 lg:justify-end ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="group relative flex aspect-square w-full max-w-[250px] items-center justify-center sm:max-w-[310px] md:max-w-[350px] lg:max-w-[440px] xl:max-w-[500px]">
              {/* Breathing ambient glow */}
              <div className="glow-breathe absolute inset-[2%] rounded-full bg-purple-600/30 blur-[70px] sm:blur-[100px]" />

              {/* Soft inner halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/15 via-fuchsia-500/5 to-transparent" />

              {/* Static outer rings */}
              <div
                aria-hidden="true"
                className="absolute inset-[-4%] rounded-full border border-purple-400/20"
              />
              <div
                aria-hidden="true"
                className="absolute inset-[-1.5%] rounded-full border border-purple-300/15"
              />

              {/* Rotating gradient ring */}
              <div
                aria-hidden="true"
                className="profile-ring absolute inset-0 rounded-full"
              />

              {/* Orbiting accent ring + dot */}
              <div
                aria-hidden="true"
                className="orbit-ring absolute inset-[-7%] rounded-full border border-dashed border-purple-400/20"
              >
                <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_18px_rgba(232,121,249,0.95)]" />
              </div>

              <div
                aria-hidden="true"
                className="orbit-ring-counter absolute inset-[7%] rounded-full border border-purple-400/10"
              >
                <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-300 shadow-[0_0_16px_rgba(192,132,252,0.95)]" />
              </div>

              {/* Profile image */}
              <div className="relative z-10 h-[86%] w-[86%] overflow-hidden rounded-full border border-purple-300/30 bg-gradient-to-br from-purple-950 to-[#120b1d] p-1.5 shadow-[0_35px_100px_-25px_rgba(168,85,247,0.75)] sm:p-2.5">
                <div className="h-full w-full overflow-hidden rounded-full bg-[#100a18] ring-1 ring-inset ring-white/10">
                  <img
                    src={profile?.profileImage || "/images/profile.png.jpeg"}
                    alt="Fuad Al Maimun - Full Stack Developer"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Scroll cue ================= */}
      <a
        href="#about"
        aria-label="Scroll to the about section"
        className="group absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-end gap-4 md:flex"
      >
        <span className="mb-3 h-px w-20 bg-gradient-to-r from-transparent to-purple-400/50 transition-all duration-300 group-hover:w-28 group-hover:to-purple-300 lg:w-24" />

        <span className="flex flex-col items-center gap-2 text-slate-400 transition-colors duration-300 group-hover:text-purple-200">
          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-purple-300/40 p-1">
            <span className="h-1.5 w-1 animate-bounce rounded-full bg-purple-300" />
          </span>

          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">
            Scroll Down
          </span>
        </span>

        <span className="mb-3 h-px w-20 bg-gradient-to-l from-transparent to-purple-400/50 transition-all duration-300 group-hover:w-28 group-hover:to-purple-300 lg:w-24" />
      </a>
    </section>
  );
};

export default Hero;
