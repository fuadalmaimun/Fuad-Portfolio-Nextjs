"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
} from "react-icons/si";
import { getAllSkills } from "../data/skills";
import SkillCard from "./SkillCard";

const CATEGORIES = [
  { id: "all", label: "All Skills" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Database" },
  { id: "tools", label: "Tools" },
];

/** Quick-recognition tech strip shown under the progress grid. */
const TECH_STRIP = [
  { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" /> },
  { name: "Express.js", icon: <SiExpress className="text-white" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" /> },
];

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const section = document.getElementById("skills");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const skills = useMemo(() => {
    const all = getAllSkills();
    return activeCategory === "all"
      ? all
      : all.filter((skill) => skill.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#05020D] py-24 font-preahvihear select-none"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[15%] h-[460px] w-[460px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute right-[-10%] bottom-[10%] h-[460px] w-[460px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
      </div>

      <div className="container-safe relative z-10 max-w-6xl">
        {/* Section Header */}
        <div
          className={`mx-auto mb-10 max-w-2xl text-center transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1.5 text-xs tracking-[0.25em] text-purple-300 uppercase backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" />
            <span>Skill Set</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Technical{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
            Hands-on experience across the stack — from pixel-perfect React
            interfaces to REST APIs and MongoDB databases. Proficiency levels
            reflect real work shipped in production projects.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className={`mb-9 flex flex-wrap items-center justify-center gap-2 transition-all duration-700 delay-100 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-950/40"
                    : "border border-purple-500/30 bg-purple-950/30 text-purple-200 hover:-translate-y-0.5 hover:border-purple-400/60 hover:text-white"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Animated Skill Progress Grid (remounts on filter change to replay animation) */}
        <div
          key={activeCategory}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              index={index}
              isActive={isVisible}
            />
          ))}
        </div>

        {/* Tech Strip */}
        <div
          className={`mt-14 border-t border-purple-900/30 pt-8 text-center transition-all duration-700 delay-200 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="mb-5 text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">
            Daily Toolbox
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {TECH_STRIP.map((item) => (
              <span
                key={item.name}
                title={item.name}
                className="inline-flex cursor-default items-center gap-2 rounded-full border border-[#A855F7]/30 bg-[#130B24] px-3.5 py-2 text-xs font-medium text-slate-300 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#A855F7] hover:text-white sm:text-sm"
              >
                <span className="text-base">{item.icon}</span>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
