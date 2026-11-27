"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Globe, Info } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectCard({ project, index = 0, onViewDetails }) {
  const isEven = index % 2 === 0;

  const githubUrl = project.githubUrl || project.githubLink;
  const liveUrl = project.liveUrl || project.liveLink;

  const hasGithub = githubUrl && githubUrl !== "#";
  const hasLiveDemo = liveUrl && liveUrl !== "#";

  return (
    <article
      className={`group relative grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-12 my-20 ${
        !isEven ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Project Image */}
      <Link
        href={`/projects/${project.id}`}
        className="group/image relative overflow-hidden rounded-2xl border border-white/10 bg-[#10091c] shadow-2xl transition-all duration-500 hover:border-purple-400/40 hover:shadow-[0_30px_70px_-30px_rgba(168,85,247,0.65)]"
      >
        <div className="aspect-[16/10] overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} project preview`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-2xl font-semibold text-purple-300">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Bottom gradient for depth */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[#08050d]/80 via-transparent to-transparent opacity-70" />

        {/* Subtle image border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />

        {/* Index badge */}
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-200 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Quick view overlay on hover */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-purple-950/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-black/70 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
            <Info size={14} className="text-purple-400" />
            Open case study
          </span>
        </div>
      </Link>

      {/* Project Information */}
      <div className="relative flex flex-col">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-purple-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
            {project.category || "Featured Project"}
          </span>
        </div>

        <Link href={`/projects/${project.id}`}>
          <h3 className="mb-4 text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-purple-200 sm:text-3xl lg:text-4xl">
            {project.title}
            <span className="mt-2 block h-px w-12 bg-gradient-to-r from-purple-400 to-transparent transition-all duration-500 group-hover:w-24" />
          </h3>
        </Link>

        <p className="mb-6 text-sm leading-7 text-gray-400 sm:text-base">
          {project.description}
        </p>

        {/* Technology Stack */}
        {project.technologies?.length > 0 && (
          <div className="mb-7 flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={`${tech}-${idx}`}
                className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400/40 hover:text-purple-200"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Project Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* View Details Primary Action */}
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-purple-600/30 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <Info size={17} />
            View Case Study
          </Link>

          {/* Live Demo */}
          {hasLiveDemo && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-purple-500/40 bg-purple-950/30 px-5 py-3 text-sm font-semibold text-purple-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400 hover:bg-purple-600/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <Globe size={17} />
              Live Demo
              <ExternalLink size={15} />
            </a>
          )}

          {/* Source Code */}
          {hasGithub && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <FaGithub size={18} />
              Source Code
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}