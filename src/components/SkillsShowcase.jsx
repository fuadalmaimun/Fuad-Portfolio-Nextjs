"use client";

import React from "react";
import {
  SiFigma,
  SiReact,
  SiC,
  SiNodedotjs,
  SiRedux,
  SiJavascript,
  SiCss3,
  SiAdobexd,
  SiNextdotjs,
  SiGatsby,
  SiAdobeillustrator,
  SiExpress,
  SiMongodb,
} from "react-icons/si";
import { Code2 } from "lucide-react";

const skills = [
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "C", icon: SiC, color: "#659AD3" },
  { name: "Node.js", icon: SiNodedotjs, color: "#68A063" },
  { name: "Redux", icon: SiRedux, color: "#764ABC" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6" },
  { name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Gatsby", icon: SiGatsby, color: "#663399" },
  { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
  { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
];

const SkillIcon = ({ skill, index }) => {
  const Icon = skill.icon || Code2;

  return (
    <div
      className="skill-node group relative z-10 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/5 bg-[#21182F] shadow-lg transition-all duration-300 hover:scale-125 hover:border-purple-400/50 hover:bg-[#302044] sm:h-12 sm:w-12"
      style={{
        animationDelay: `${index * 0.15}s`,
      }}
      title={skill.name}
    >
      <Icon
        className="text-2xl transition-all duration-300 group-hover:drop-shadow-[0_0_8px_currentColor] sm:text-[26px]"
        style={{ color: skill.color }}
      />

      <span className="pointer-events-none absolute -bottom-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-purple-500/20 bg-[#21182F] px-2 py-1 text-[10px] text-purple-200 opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100">
        {skill.name}
      </span>
    </div>
  );
};

const SkillsShowcase = () => {
  const firstRow = skills.slice(0, 7);
  const secondRow = skills.slice(7);

  return (
    <section className="relative mx-auto w-full max-w-[680px] overflow-hidden py-8">
      <style jsx>{`
        @keyframes floating {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @keyframes lineGlow {
          0%, 100% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.85;
          }
        }

        .skill-node {
          animation: floating 3s ease-in-out infinite;
        }

        .connector-line {
          animation: lineGlow 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .skill-node,
          .connector-line {
            animation: none;
          }
        }
      `}</style>

      {/* Connecting Lines */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 680 280"
        preserveAspectRatio="none"
        fill="none"
      >
        {[
          "M190 119 C215 160 250 205 295 280",
          "M250 119 C270 165 290 215 315 280",
          "M310 119 C320 165 325 220 330 280",
          "M370 119 C360 165 355 220 350 280",
          "M430 119 C405 165 385 215 365 280",
          "M490 119 C455 165 415 215 385 280",
        ].map((path, index) => (
          <path
            key={index}
            d={path}
            stroke="#8738C8"
            strokeWidth="1"
            className="connector-line"
            style={{ animationDelay: `${index * 0.3}s` }}
          />
        ))}
      </svg>

      {/* First Row */}
      <div className="relative z-10 flex justify-center gap-2 sm:gap-3">
        {firstRow.map((skill, index) => (
          <SkillIcon
            key={skill.name}
            skill={skill}
            index={index}
          />
        ))}
      </div>

      {/* Second Row */}
      <div className="relative z-10 mt-5 flex justify-center gap-2 sm:gap-3">
        {secondRow.map((skill, index) => (
          <SkillIcon
            key={skill.name}
            skill={skill}
            index={index + 7}
          />
        ))}
      </div>

    </section>
  );
};

export default SkillsShowcase;