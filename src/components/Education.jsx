"use client";

import React, { useEffect, useState } from "react";
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { educationData } from "../data/education";

const Education = ({ initialEducation = null }) => {
  const [eduList, setEduList] = useState(initialEducation || educationData);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!initialEducation) {
      fetch("/api/public/education")
        .then((r) => (r.ok ? r.json() : null))
        .then((res) => {
          if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
            setEduList(res.data);
          }
        })
        .catch(() => {});
    }
  }, [initialEducation]);

  useEffect(() => {
    const section = document.getElementById("education");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap size={24} className="text-purple-300" />;
      case "Award":
        return <Award size={24} className="text-fuchsia-300" />;
      case "BookOpen":
      default:
        return <BookOpen size={24} className="text-violet-300" />;
    }
  };

  const getBorderGradient = (index) => {
    switch (index % 3) {
      case 0:
        return "from-purple-500/30 via-purple-500/10 to-transparent";
      case 1:
        return "from-fuchsia-500/30 via-fuchsia-500/10 to-transparent";
      case 2:
      default:
        return "from-violet-500/30 via-violet-500/10 to-transparent";
    }
  };

  return (
    <section
      id="education"
      className="relative min-h-screen overflow-hidden bg-[#070312] py-16 text-white select-none font-preahvihear sm:py-24"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[20%] h-[460px] w-[460px] rounded-full bg-purple-600/10 blur-[150px]" />
        <div className="absolute bottom-[15%] left-[-10%] h-[480px] w-[480px] rounded-full bg-violet-600/10 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-safe relative z-10 mx-auto max-w-5xl px-5 sm:px-8">
        {/* Header */}
        <div
          className={`mx-auto mb-12 max-w-3xl text-center transition-all duration-700 ease-out sm:mb-16 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/40 px-3.5 py-1.5 text-xs uppercase tracking-[0.25em] text-purple-300 backdrop-blur-md">
            <Sparkles size={14} className="text-purple-400" />
            <span>Academic Background</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Educational{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
              Qualification
            </span>
          </h2>
        </div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute bottom-6 left-8 top-6 hidden w-px bg-gradient-to-b from-purple-500/40 via-fuchsia-500/30 to-purple-900/10 md:block" />

          <div className="space-y-8">
            {eduList.map((item, index) => (
              <div
                key={item.id}
                className={`relative transition-all duration-700 ease-out ${isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 top-7 z-20 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-purple-400/40 bg-[#0e071e] shadow-lg shadow-purple-950/50 md:flex">
                  <span className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400" />
                </div>

                {/* Education Card */}
                <div className="group relative rounded-2xl border border-purple-500/20 bg-[#0d071b]/80 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-purple-400/40 sm:p-8 md:ml-20">
                  {/* Top Gradient Line */}
                  <div
                    className={`absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r ${getBorderGradient(
                      index
                    )}`}
                  />

                  {/* Card Header */}
                  <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-400/25 bg-purple-900/30 shadow-md transition-transform duration-300 group-hover:scale-105">
                        {getIcon(item.icon)}
                      </div>

                      <div className="min-w-0">
                        <span className="text-xs font-medium uppercase tracking-wider text-purple-400">
                          {item.type}
                        </span>

                        <h3 className="break-words text-xl font-bold text-white transition-colors group-hover:text-purple-200 sm:text-2xl">
                          {item.degree}
                        </h3>

                        <p className="mt-1 break-words text-sm font-medium text-slate-300">
                          {item.institution}
                        </p>

                        {item.grade && (
                          <p className="mt-2 text-sm font-medium text-fuchsia-300">
                            {item.grade}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Period & Location */}
                    <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/50 px-3.5 py-1 text-xs font-medium text-purple-300">
                        <Calendar size={13} />
                        {item.period}
                      </span>

                      {item.location && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-400">
                          <MapPin size={12} />
                          {item.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-sm font-normal leading-relaxed text-gray-300">
                    {item.description}
                  </p>

                  {/* Skills */}
                  {item.skills?.length > 0 && (
                    <div>
                      <h4 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-400">
                        <CheckCircle2
                          size={13}
                          className="text-purple-400"
                        />
                        Key Focus & Learnings
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg border border-purple-500/20 bg-purple-950/30 px-3 py-1 text-xs text-purple-200/90 transition-colors hover:border-purple-400/40 hover:text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
