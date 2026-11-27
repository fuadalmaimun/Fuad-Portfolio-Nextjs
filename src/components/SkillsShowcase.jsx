'use client'
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { SHOWCASE_SKILLS } from '../data/showcase-skills';

// Real SVG Brand Icons to match the image 100%
const TechIcons = {
  JS: () => (
    <div className="w-8 h-8 rounded bg-[#F7DF1E] text-black font-extrabold text-xs flex items-end justify-end p-1 shadow-md">
      JS
    </div>
  ),
  TS: () => (
    <div className="w-8 h-8 rounded bg-[#3178C6] text-white font-extrabold text-xs flex items-end justify-end p-1 shadow-md">
      TS
    </div>
  ),
  React: () => (
    <svg className="w-8 h-8 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
    </svg>
  ),
  Next: () => (
    <div className="w-8 h-8 rounded-full bg-white text-black font-black text-base flex items-center justify-center shadow-md">
      N
    </div>
  ),
  Tailwind: () => (
    <svg className="w-8 h-8 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  Node: () => (
    <div className="w-8 h-8 rounded-lg bg-[#339933]/20 border border-[#339933]/40 flex items-center justify-center text-[#5FA04E] font-bold text-xs">
      JS
    </div>
  ),
  Express: () => (
    <span className="text-xl font-light tracking-tighter text-gray-200">ex</span>
  ),
  Mongo: () => (
    <svg className="w-7 h-7 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C12 2 7 7.5 7 13.5C7 17.5 10.5 20.5 11.5 21.5V23H12.5V21.5C13.5 20.5 17 17.5 17 13.5C17 7.5 12 2 12 2ZM12 18.5C12 18.5 11.5 15 11.5 11.5C11.5 9.5 12 7 12 7C12 7 12.5 9.5 12.5 11.5C12.5 15 12 18.5 12 18.5Z" />
    </svg>
  ),
  // PostgreSQL Official Elephant SVG Icon
  sql: () => (
    <svg className="w-8 h-8 text-[#336791]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.128 3.23c-1.36-.425-2.853-.378-4.185.134-.657-.497-1.466-.78-2.313-.808-2.463-.08-4.63 1.716-5.043 4.18-.472 2.815.792 5.713 3.168 7.265.245.16.39.436.383.73-.033 1.38.042 2.762.224 4.13.153 1.15.968 2.083 2.086 2.388.368.1.748.15 1.128.15.75 0 1.488-.2 2.137-.58 1.155-.676 1.816-1.958 1.696-3.29-.067-.748-.102-1.5-.104-2.252 1.868-.935 3.14-2.755 3.35-4.835.24-2.37-.926-4.66-2.936-5.772-.2-.11-.397-.213-.591-.44zm-1.42 8.71c-.41 1.425-1.56 2.515-3.01 2.852-.39.09-.666.437-.666.837v2.81c0 .55-.448.998-.998.998-.495 0-.915-.364-.987-.854-.176-1.202-.25-2.416-.222-3.63.016-.716-.34-1.388-.94-1.78-1.84-1.203-2.82-3.448-2.455-5.63.31-1.855 1.936-3.204 3.79-3.143.658.022 1.292.244 1.81.635.294.222.688.257 1.016.09 1.055-.538 2.283-.638 3.412-.28 1.44.456 2.473 1.73 2.616 3.232.138 1.448-.594 2.843-1.846 3.553-.245.14-.427.367-.52.634z" />
      <circle cx="14.5" cy="8.5" r="1.1" fill="#ffffff" />
    </svg>
  ),
  Git: () => (
    <div className="w-7 h-7 rotate-45 rounded bg-[#F05032] flex items-center justify-center shadow">
      <div className="-rotate-45 text-white font-bold text-xs">Y</div>
    </div>
  ),
  VSCode: () => (
    <svg className="w-7 h-7 text-[#007ACC]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5 2L7 11.5L2.5 8L1 9.2L5.2 12.5L1 15.8L2.5 17L7 13.5L17.5 23L22 20.8V4.2L17.5 2ZM17.5 18.2L10.2 12.5L17.5 6.8V18.2Z" />
    </svg>
  ),
  Postman: () => (
    <div className="w-7 h-7 rounded-full bg-[#FF6C37] flex items-center justify-center text-white text-xs font-bold shadow">
      🚀
    </div>
  ),
  Figma: () => (
    <div className="grid grid-cols-2 w-5 h-7 gap-0.5">
      <span className="bg-[#F24E1E] rounded-l-full"></span>
      <span className="bg-[#FF7262] rounded-r-full"></span>
      <span className="bg-[#A259FF] rounded-l-full"></span>
      <span className="bg-[#1ABCFE] rounded-full"></span>
      <span className="bg-[#0ACF83] rounded-l-full rounded-b-full"></span>
    </div>
  ),
  Docker: () => (
    <svg className="w-8 h-8 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 5h2v2h-2V5zm-3 0h2v2h-2V5zm-3 0h2v2H7V5zm6 3h2v2h-2V8zm-3 0h2v2H-2V8zm-3 0h2v2H7V8zm-3 0h2v2H4V8zm16.5 2.5c-.5-.3-1.6-.4-2.4-.2-.2-1.1-.9-2-1.8-2.5l-.4-.2-.2.4c-.4.7-.5 1.8-.1 2.7-.4.2-1.1.4-2 .4H2c-.3 1.8.2 4.3 1.9 6 1.6 1.6 4 2.4 7.1 2.4 5.5 0 9.6-2.5 11.4-7.1.8 0 2.3 0 3.1-1.4l.2-.3-.2-.2z" />
    </svg>
  ),
};

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState('All Skills');
  const [skills, setSkills] = useState(SHOWCASE_SKILLS);

  useEffect(() => {
    fetch('/api/public/skills', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((result) => {
        if (Array.isArray(result?.data)) setSkills(result.data);
      })
      .catch(() => {});
  }, []);

  const skillsFor = (category) => skills.filter((skill) => skill.category?.toLowerCase() === category);
  const iconAliases = {
    JavaScript: 'JS', TypeScript: 'TS', 'Next.js': 'Next', 'Tailwind CSS': 'Tailwind',
    'Node.js': 'Node', 'Express.js': 'Express', MongoDB: 'Mongo', PostgreSQL: 'sql',
  };

  const renderSkillIcon = (skill) => {
    const iconName = skill.icon || skill.name;
    const Icon = TechIcons[iconName] || TechIcons[iconAliases[iconName]] || TechIcons[skill.name] || TechIcons[iconAliases[skill.name]] || null;
    return Icon ? <Icon /> : <span className="text-sm font-bold text-current">{String(skill.name || '?').slice(0, 2).toUpperCase()}</span>;
  };

  const navItems = [
    { label: 'All Skills', icon: '★' },
    { label: 'Frontend', icon: '🖥' },
    { label: 'Backend', icon: '🗄' },
    { label: 'Database', icon: '🛢' },
    { label: 'Tools', icon: '🔧' },
  ];

  return (
    <section className="relative min-h-screen w-full bg-[#060814] text-white flex items-center justify-center py-16 px-4 sm:px-8 overflow-hidden select-none font-sans">
      
      {/* Top-Left Organic Glowing Wave Shape */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[350px] bg-gradient-to-br from-[#7C3AED] via-[#4F46E5] to-transparent rounded-full blur-[90px] opacity-60 pointer-events-none" />
      <svg className="absolute top-0 left-0 w-72 h-72 opacity-40 pointer-events-none" viewBox="0 0 200 200">
        <path fill="#7C3AED" d="M0,0 L160,0 C130,60 70,80 40,140 C20,170 0,180 0,200 Z" />
      </svg>

      {/* Bottom-Right Organic Glowing Wave Shape */}
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[350px] bg-gradient-to-tl from-[#6D28D9] via-[#2563EB] to-transparent rounded-full blur-[90px] opacity-50 pointer-events-none" />

      {/* Floating Decorative Tilted Squares & Dots */}
      <div className="hidden md:block absolute top-36 left-28 w-5 h-5 rounded-md bg-indigo-500/40 rotate-12 backdrop-blur-sm" />
      <div className="hidden md:block absolute top-60 left-12 w-2.5 h-2.5 rounded-full bg-purple-500/60" />
      <div className="hidden md:block absolute top-32 right-12 w-6 h-6 rounded-lg bg-blue-500/40 rotate-12" />
      <div className="hidden md:block absolute top-48 right-24 w-4 h-4 rounded bg-purple-500/40 -rotate-12" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[1140px] mx-auto flex flex-col items-center">
        
        {/* Section Header — matches the Projects section banner */}
        <div className="scroll-reveal text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-xs tracking-[0.25em] uppercase text-purple-300 mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" />
            <span>My Expertise</span>
          </div>

          <h2 className="text-balance text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Skills &amp;{' '}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            The tools I use to build modern, scalable and user-friendly web applications.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {navItems.map((tab) => {
            const active = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white shadow-[0_0_25px_rgba(124,58,237,0.65)] border border-purple-400/40'
                    : 'bg-[#121629]/80 text-gray-300 border border-white/10 hover:border-white/25 hover:bg-[#191E38]'
                }`}
              >
                <span className={active ? 'text-white' : 'text-indigo-400'}>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Cards Layout */}
        <div className="scroll-reveal w-full space-y-6">
          
          {/* Top Row: Frontend & Backend Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* FRONTEND CARD (7 cols on large screens) */}
            {(activeTab === 'All Skills' || activeTab === 'Frontend') && (
              <div className="lg:col-span-7 relative rounded-[28px] p-[1.5px] bg-gradient-to-br from-purple-500/70 via-indigo-500/20 to-white/10 shadow-[0_0_40px_rgba(124,58,237,0.15)]">
                {/* Inner Glass Card */}
                <div className="relative h-full w-full rounded-[27px] bg-[#0D1021]/95 backdrop-blur-xl p-6 sm:p-7 overflow-hidden">
                  {/* Top-Left Corner Glow */}
                  <div className="absolute -top-10 -left-10 w-36 h-36 bg-purple-600/35 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* 3 Sparkle Accent Lines (Top Right) */}
                  <div className="absolute top-5 right-8 flex gap-1.5 -rotate-12">
                    <span className="w-1 h-3.5 bg-purple-400 rounded-full" />
                    <span className="w-1 h-4 bg-indigo-400 rounded-full -translate-y-1" />
                    <span className="w-1 h-3 bg-blue-400 rounded-full" />
                  </div>

                  {/* Card Header */}
                  <div className="relative flex items-center gap-4 mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-600/20 border border-purple-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.35)]">
                      <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <path d="M8 21h8M12 17v4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Frontend</h3>
                      <p className="text-xs sm:text-sm text-gray-400">Building beautiful &amp; responsive UI</p>
                    </div>
                  </div>

                  {/* Mini Skill Boxes */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {skillsFor('frontend').map((skill) => (
                      <div
                        key={skill.id || skill._id || skill.name}
                        className="group flex flex-col items-center justify-center gap-2.5 py-4 px-2 rounded-2xl bg-[#14182E]/90 border border-white/[0.07] hover:border-purple-400/40 hover:bg-[#181d36] hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-950/40 transition-all duration-300"
                      >
                        <div className="transition-transform duration-300 group-hover:scale-110">
                          {renderSkillIcon(skill)}
                        </div>
                        <span className="text-[11px] font-medium text-gray-200 text-center">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BACKEND CARD (5 cols on large screens) */}
            {(activeTab === 'All Skills' || activeTab === 'Backend') && (
              <div className="lg:col-span-5 relative rounded-[28px] p-[1.5px] bg-gradient-to-br from-emerald-400/70 via-teal-500/20 to-white/10 shadow-[0_0_40px_rgba(16,185,129,0.12)]">
                {/* Inner Glass Card */}
                <div className="relative h-full w-full rounded-[27px] bg-[#0B121E]/95 backdrop-blur-xl p-6 sm:p-7 overflow-hidden">
                  {/* Top-Left Corner Emerald Glow */}
                  <div className="absolute -top-10 -left-10 w-36 h-36 bg-emerald-500/30 rounded-full blur-2xl pointer-events-none" />

                  {/* Decorative Corner Accent Lines */}
                  <div className="absolute top-4 right-4 flex gap-1 rotate-45">
                    <span className="w-1 h-3 bg-emerald-400 rounded-full" />
                    <span className="w-1 h-3 bg-teal-300 rounded-full translate-y-1" />
                  </div>

                  {/* Card Header */}
                  <div className="relative flex items-center gap-4 mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-600/20 border border-emerald-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                      <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="4" width="20" height="6" rx="2" />
                        <rect x="2" y="14" width="20" height="6" rx="2" />
                        <circle cx="6" cy="7" r="1" fill="currentColor" />
                        <circle cx="6" cy="17" r="1" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Backend</h3>
                      <p className="text-xs sm:text-sm text-gray-400">Powering the application logic</p>
                    </div>
                  </div>

                  {/* Mini Skill Boxes */}
                  <div className="grid grid-cols-3 gap-3">
                    {skillsFor('backend').map((skill) => (
                      <div
                        key={skill.id || skill._id || skill.name}
                        className="group flex flex-col items-center justify-center gap-2.5 py-4 px-2 rounded-2xl bg-[#121B29]/90 border border-white/[0.07] hover:border-emerald-400/40 hover:bg-[#152233] hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-950/40 transition-all duration-300"
                      >
                        <div className="h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          {renderSkillIcon(skill)}
                        </div>
                        <span className="text-[11px] font-medium text-gray-200 text-center">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Row: DATABASE & TOOLS FULL-WIDTH CARD */}
          {(activeTab === 'All Skills' || activeTab === 'Database' || activeTab === 'Tools') && (
            <div className="relative rounded-[28px] p-[1.5px] bg-gradient-to-r from-amber-400/80 via-orange-500/20 to-indigo-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)]">
              <div className="relative w-full rounded-[27px] bg-[#0F1123]/95 backdrop-blur-xl p-6 sm:p-7 overflow-hidden">
                {/* Left Corner Amber Glow */}
                <div className="absolute -top-10 -left-10 w-44 h-44 bg-amber-500/30 rounded-full blur-2xl pointer-events-none" />

                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left Title Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-13 h-13 shrink-0 rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-600/20 border border-amber-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.35)]">
                      <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <ellipse cx="12" cy="5" rx="9" ry="3" />
                        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Database &amp; Tools</h3>
                      <p className="text-xs sm:text-sm text-gray-400">Managing data and boosting productivity</p>
                    </div>
                  </div>

                  {/* Right 6 Tool Boxes */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 flex-1 lg:max-w-2xl">
                    {skills.filter((skill) => ['database', 'tools'].includes(skill.category?.toLowerCase()) && (activeTab === 'All Skills' || skill.category?.toLowerCase() === activeTab.toLowerCase())).map((skill) => (
                      <div
                        key={skill.id || skill._id || `${skill.category}-${skill.name}`}
                        className="group flex flex-col items-center justify-center gap-2.5 py-3.5 px-2 rounded-2xl bg-[#14172B]/90 border border-white/[0.07] hover:border-amber-400/40 hover:bg-[#1a1a33] hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-950/40 transition-all duration-300"
                      >
                        <div className="h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          {renderSkillIcon(skill)}
                        </div>
                        <span className="text-[11px] font-medium text-gray-200 text-center whitespace-nowrap">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
