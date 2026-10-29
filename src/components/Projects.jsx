"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { projectsData } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailsModal from "./ProjectDetailsModal";

export const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const section = document.getElementById("projects");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#05020D] py-24 min-h-screen flex items-center justify-center font-preahvihear select-none"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute right-[-10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[150px]" />
      </div>

      <div className="container-safe relative z-10 w-full max-w-5xl px-4 mx-auto">
        {/* Section Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-xs tracking-[0.25em] uppercase text-purple-300 mb-4 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" />
            <span>Featured Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Recent{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            A showcase of full-stack and frontend applications built with Next.js, React, TypeScript, and modern styling.
          </p>
        </div>

        {/* Projects Alternating Stack */}
        <div
          className={`space-y-20 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              onViewDetails={handleOpenModal}
            />
          ))}
        </div>

        {/* Bottom CTA to GitHub */}
        <div
          className={`max-w-xl mx-auto text-center mt-28 pt-10 border-t border-purple-900/30 transition-all duration-700 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-xl font-normal text-white mb-2">
            Want to explore more source code & repositories?
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            Check out my GitHub profile for open-source contributions, repositories, and experiments.
          </p>

          <a
            href="https://github.com/fuadalmaimun"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-7 py-3 rounded-full bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 text-purple-200 text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-950/40"
          >
            Visit My GitHub Profile
          </a>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Projects;