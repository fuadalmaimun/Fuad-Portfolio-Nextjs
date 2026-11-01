"use client";

import React, { useEffect, useState } from "react";
import {
  Compass,
  Briefcase,
  Heart,
  Sparkles,
  MapPin,
  Languages,
  CheckCircle2,
  Terminal,
  Zap,
  Cpu,
} from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById("about");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const strengths = [
    { title: "Fast Learner", desc: "Quickly adopt modern libraries, frameworks, and workflows" },
    { title: "Clean Code", desc: "Focus on readability, maintainable architectures, and reusability" },
    { title: "Team Player", desc: "Open communication, agile collaboration, and git-based workflows" },
    { title: "Problem Solver", desc: "Patient debugger with analytical approach to challenges" },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#06030e] py-24 select-none font-preahvihear text-white"
    >
      {/* ================= Background Ambient Glows ================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[15%] h-[460px] w-[460px] rounded-full bg-purple-700/10 blur-[140px]" />
        <div className="absolute right-[-10%] bottom-[10%] h-[480px] w-[480px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-safe relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* ================= Section Header ================= */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-xs tracking-[0.25em] uppercase text-purple-300 mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" />
            <span>Get To Know Me</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            About{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            A developer dedicated to engineering modern, responsive, and human-friendly web applications with clean code and high attention to detail.
          </p>
        </div>

        {/* ================= 3 Core Pillars: Journey, Preferred Work, Hobbies ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* 1. Programming Journey */}
          <div
            className={`relative rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-7 backdrop-blur-xl shadow-xl hover:border-purple-500/40 transition-all duration-500 group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 blur transition duration-500 -z-10" />

            <div className="flex items-center gap-3.5 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-900/30 text-purple-300 group-hover:scale-105 group-hover:border-purple-400 transition-all duration-300">
                <Compass size={24} />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-purple-400">My Story</span>
                <h3 className="text-xl font-bold text-white">Programming Journey</h3>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              My journey began with a natural fascination for how code translates into interactive visual interfaces. Starting from HTML5, CSS3, and modern JavaScript, I discovered the joy of bringing designs to life.
            </p>

            <p className="text-sm text-gray-400 leading-relaxed">
              I soon immersed myself in the <span className="text-purple-300">React & Next.js ecosystem</span> and <span className="text-purple-300">TypeScript</span>, before leveling up into full-stack development with Node.js, Express, MongoDB, and authentication systems. Every project has been an opportunity to write cleaner, more resilient code.
            </p>

            <div className="mt-6 pt-4 border-t border-purple-900/30 flex items-center gap-2 text-xs text-purple-300/80">
              <Terminal size={14} className="text-purple-400" />
              <span>Constantly leveling up with new tools</span>
            </div>
          </div>

          {/* 2. Preferred Type of Work */}
          <div
            className={`relative rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-7 backdrop-blur-xl shadow-xl hover:border-purple-500/40 transition-all duration-500 group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-fuchsia-600/20 to-transparent opacity-0 group-hover:opacity-100 blur transition duration-500 -z-10" />

            <div className="flex items-center gap-3.5 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-fuchsia-400/30 bg-fuchsia-900/30 text-fuchsia-300 group-hover:scale-105 group-hover:border-fuchsia-400 transition-all duration-300">
                <Briefcase size={24} />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-fuchsia-400">What I Do Best</span>
                <h3 className="text-xl font-bold text-white">Preferred Type of Work</h3>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              I thrive building <span className="text-fuchsia-300">full-stack web applications</span> and high-performance frontends that demand crisp UI/UX, responsive layouts, and robust backend integrations.
            </p>

            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-fuchsia-400 shrink-0 mt-0.5" />
                <span>Modern React & Next.js web applications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-fuchsia-400 shrink-0 mt-0.5" />
                <span>REST API architecture & database modeling (MongoDB)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-fuchsia-400 shrink-0 mt-0.5" />
                <span>Collaborative, agile cross-functional product teams</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-fuchsia-400 shrink-0 mt-0.5" />
                <span>Accessible, mobile-first responsive interfaces</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-purple-900/30 flex items-center gap-2 text-xs text-fuchsia-300/80">
              <Cpu size={14} className="text-fuchsia-400" />
              <span>Full Stack & Frontend Specialist</span>
            </div>
          </div>

          {/* 3. Personal Hobbies & Interests */}
          <div
            className={`relative rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-7 backdrop-blur-xl shadow-xl hover:border-purple-500/40 transition-all duration-500 group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-violet-600/20 to-transparent opacity-0 group-hover:opacity-100 blur transition duration-500 -z-10" />

            <div className="flex items-center gap-3.5 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-900/30 text-violet-300 group-hover:scale-105 group-hover:border-violet-400 transition-all duration-300">
                <Heart size={24} />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-violet-400">Beyond The Code</span>
                <h3 className="text-xl font-bold text-white">Hobbies & Interests</h3>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              When I'm not writing code or debugging, I love exploring diverse creative and recreational pursuits that keep my mind active and inspired:
            </p>

            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Zap size={16} className="text-violet-400 shrink-0 mt-0.5" />
                <span>Testing novel open-source libraries & tech stacks</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap size={16} className="text-violet-400 shrink-0 mt-0.5" />
                <span>UI/UX micro-interactions & fluid animations</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap size={16} className="text-violet-400 shrink-0 mt-0.5" />
                <span>Passionate cricket fan (following matches & fantasy leagues)</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap size={16} className="text-violet-400 shrink-0 mt-0.5" />
                <span>Reading tech blogs, playing strategy games & exploring music</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-purple-900/30 flex items-center gap-2 text-xs text-violet-300/80">
              <Sparkles size={14} className="text-violet-400" />
              <span>Continuous curiosity & creativity</span>
            </div>
          </div>
        </div>

        {/* ================= Bottom Quick Profile Bar & Strengths ================= */}
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-purple-500/20 bg-[#0d071b]/60 backdrop-blur-md transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {strengths.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-1.5 text-purple-300 font-semibold text-sm">
                <CheckCircle2 size={16} className="text-purple-400" />
                <h4>{item.title}</h4>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Location & Language Highlights */}
        <div
          className={`mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-purple-400" />
            <span>Based in <strong className="text-gray-200">Dhaka, Bangladesh</strong></span>
          </div>
          <div className="h-3 w-px bg-purple-500/30 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Languages size={15} className="text-purple-400" />
            <span>Languages: <strong className="text-gray-200">Bangla</strong> (Native), <strong className="text-gray-200">English</strong> (Intermediate)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;