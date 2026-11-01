"use client";

import React, { useEffect, useState } from "react";

/** Maps proficiency levels to a visual percentage and colour scheme. */
const PROFICIENCY = {
  beginner: {
    percent: 33,
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  intermediate: {
    percent: 60,
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  advanced: {
    percent: 80,
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  expert: {
    percent: 100,
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
};

const DEFAULT_PROFICIENCY = {
  percent: 50,
  badge: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export const SkillCard = ({ skill, index = 0, isActive = false }) => {
  const config = PROFICIENCY[skill.proficiency] ?? DEFAULT_PROFICIENCY;
  const [progress, setProgress] = useState(0);

  // Animate the bar up from zero whenever the card scrolls into view (or the
  // active category changes and remounts the grid), with a staggered delay.
  useEffect(() => {
    if (!isActive) return;

    const timeout = setTimeout(
      () => setProgress(config.percent),
      120 + index * 50
    );

    return () => clearTimeout(timeout);
  }, [isActive, index, config.percent]);

  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-purple-900/40 bg-[#120B2E]/60 p-5 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-[#180E3D]/80 sm:p-6">
      {/* Dynamic Glow Effect on Hover */}
      <div className="absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 blur transition duration-500 group-hover:opacity-20" />

      {/* Top Section: Icon & Proficiency Badge */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-950/60 text-purple-300 transition-all duration-300 group-hover:scale-110 group-hover:border-purple-400 group-hover:text-white">
          <span className="text-base font-bold">
            {skill.name.slice(0, 2).toUpperCase()}
          </span>
        </div>

        <span
          className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium capitalize ${config.badge}`}
        >
          {skill.proficiency}
        </span>
      </div>

      {/* Skill Name */}
      <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
        {skill.name}
      </h3>

      {/* Description */}
      {skill.description && (
        <p className="mb-5 line-clamp-2 text-sm text-gray-400">
          {skill.description}
        </p>
      )}

      {/* Animated Progress Bar */}
      <div className="mt-auto">
        <div
          role="progressbar"
          aria-label={`${skill.name} proficiency`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 w-full overflow-hidden rounded-full border border-purple-900/30 bg-purple-950/50"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span>Proficiency</span>
          <span className="font-semibold text-purple-400 tabular-nums">
            {config.percent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
