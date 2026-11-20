"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Layers,
  AlertTriangle,
  Rocket,
  CheckCircle2,
  Sparkles,
  Code2,
  GitBranch,
  Server,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const TABS = [
  { id: "overview", label: "Overview & Features", icon: Sparkles },
  { id: "tech", label: "Tech Stack", icon: Code2 },
  { id: "state", label: "State Management", icon: GitBranch },
  { id: "backend", label: "Backend Architecture", icon: Server },
  { id: "challenges", label: "Challenges Solved", icon: AlertTriangle },
  { id: "future", label: "Future Plans", icon: Rocket },
];

function HighlightList({ items, emptyMessage }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-gray-400 italic">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-3 pt-1">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-4 backdrop-blur-md sm:p-5"
        >
          <div className="mb-2 flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg border border-purple-400/30 bg-purple-600/30 text-xs font-bold text-purple-300">
              {idx + 1}
            </span>
            <h4 className="text-sm font-bold text-white sm:text-base">
              {item.title}
            </h4>
          </div>
          <p className="pl-8 text-xs leading-relaxed text-gray-300 sm:text-sm">
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ProjectCaseStudyView({ project }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Project Not Found</h2>
        <p className="text-gray-400 mb-6">
          The requested project case study could not be located.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/40 px-6 py-2.5 text-sm font-semibold text-purple-300 hover:bg-purple-600/20 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>
    );
  }

  const githubUrl = project.githubUrl || project.githubLink;
  const liveUrl = project.liveUrl || project.liveLink;
  const hasGithub = githubUrl && githubUrl !== "#";
  const hasLiveDemo = liveUrl && liveUrl !== "#";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 font-preahvihear">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-purple-300 hover:text-white transition"
        >
          <ArrowLeft size={14} />
          Back to all projects
        </Link>
      </div>

      {/* Main card */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-[#0d071b] text-white shadow-2xl shadow-purple-950/70 p-6 sm:p-8">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-purple-600/20 blur-[90px]" />

        {/* Header */}
        <div className="relative mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/20 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-900/30 text-purple-300">
              <Layers size={22} />
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
                {project.category || "Case Study"}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                {project.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {hasLiveDemo && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-purple-950/40 hover:brightness-110"
              >
                <Globe size={15} />
                Live Demo
                <ExternalLink size={13} />
              </a>
            )}

            {hasGithub && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-950/30 px-4 py-2.5 text-xs font-bold text-purple-200 hover:border-purple-400/60 hover:text-white"
              >
                <FaGithub size={15} />
                Client Code
              </a>
            )}

            {project.backendGithubUrl && (
              <a
                href={project.backendGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-950/30 px-4 py-2.5 text-xs font-bold text-purple-200 hover:border-purple-400/60 hover:text-white"
              >
                <Server size={14} />
                Server Code
              </a>
            )}
          </div>
        </div>

        {/* Banner image preview */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-purple-500/20 bg-[#120824]">
          <div className="h-64 sm:h-80 md:h-96 w-full overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-950 to-[#0e071e]">
                <span className="text-3xl font-bold text-purple-300">
                  {project.title}
                </span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d071b] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-purple-600/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              {project.status || "Active Project"}
            </span>
            <p className="text-xs text-purple-200/90 font-medium">
              Role: <span className="font-bold text-white">{project.role || "Full Stack Developer"}</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex overflow-x-auto border-b border-purple-500/20 pb-px scrollbar-none gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-purple-600/30 border border-purple-400/40 text-purple-200 shadow-lg shadow-purple-950/40"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={14} className={isActive ? "text-purple-300" : "text-gray-400"} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-2">Project Summary</h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  {project.detailedDescription || project.description}
                </p>
              </div>

              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-base font-bold text-white mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 rounded-xl border border-purple-500/10 bg-purple-950/15 p-3"
                      >
                        <CheckCircle2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "tech" && (
            <div>
              <h3 className="text-base font-bold text-white mb-4">Technologies & Libraries</h3>
              <div className="flex flex-wrap gap-2.5">
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl border border-purple-500/20 bg-purple-950/30 px-4 py-2 text-xs font-semibold text-purple-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "state" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">State Architecture</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {project.stateManagement?.summary || "Component-level state managed with modern hooks, server state synchronized via API."}
              </p>
              <HighlightList
                items={project.stateManagement?.highlights}
                emptyMessage="No state management highlights specified."
              />
            </div>
          )}

          {activeTab === "backend" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Backend Architecture</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {project.backendArchitecture?.summary || "REST API built with Express.js and MongoDB native driver."}
              </p>
              <HighlightList
                items={project.backendArchitecture?.highlights}
                emptyMessage="No backend architecture highlights specified."
              />
            </div>
          )}

          {activeTab === "challenges" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Key Challenges & Solutions</h3>
              <HighlightList
                items={project.challenges}
                emptyMessage="No challenges documented."
              />
            </div>
          )}

          {activeTab === "future" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">Future Enhancements</h3>
              <HighlightList
                items={project.futurePlans}
                emptyMessage="Future plans will be added as features evolve."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
