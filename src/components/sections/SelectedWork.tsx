"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers, ArrowUpRight, Code, ExternalLink } from "lucide-react";
import { Project } from "@/types/portfolio";
import { useFinePointerTilt, FOCUS_RING } from "@/lib/motion";

interface SelectedWorkProps {
  projects: Project[];
}

function ProjectCard({ project, idx }: { project: Project; idx: number }) {
  const shouldReduceMotion = useReducedMotion();
  const { ref, style, onMouseMove, onMouseLeave } = useFinePointerTilt();

  return (
    <motion.article
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : idx * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-[#D9CCB8] bg-white p-7 shadow-[0_8px_30px_rgba(89,11,32,0.04)] hover:shadow-[0_18px_44px_rgba(89,11,32,0.1)] hover:border-[#AC9062] hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] transition-all duration-300"
    >
      <div
        ref={ref}
        style={shouldReduceMotion ? undefined : style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="flex flex-col justify-between h-full"
      >
        {/* Accessible Full-Card Primary Navigation Link */}
        <Link
          href={`/projects/${project.slug}`}
          className={`absolute inset-0 z-10 rounded-xl sm:rounded-2xl ${FOCUS_RING}`}
          aria-label={`Read case study: ${project.title}`}
        />

        <div>
          {/* Top Meta */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8DFD1] text-xs font-sans">
            <span className="text-[#AC9062] font-medium tracking-wider uppercase">
              {project.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] tracking-wide font-medium bg-[#F7F4EE] text-[#590B20] border border-[#D9CCB8]/70">
              {project.status}
            </span>
          </div>

          {/* Project Visual / Thumbnail concept */}
          <div className="relative h-48 w-full rounded-lg overflow-hidden mb-6 bg-[#FAF8F3] border border-[#E8DFD1]">
            {project.authenticPreviewUrl ? (
              <Image
                src={project.authenticPreviewUrl}
                alt={`${project.title} preview`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF8F3] to-[#F2EDE2]">
                <Layers className="w-8 h-8 text-[#AC9062]/60 mb-2 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xs font-serif font-medium text-[#20060B]">
                  {project.title}
                </span>
                <span className="text-[10px] text-[#68626B] font-sans mt-0.5">
                  Interactive Interface Concept
                </span>
              </div>
            )}
            {/* Subtle index tag */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#20060B]/70 text-white font-mono text-[10px] backdrop-blur-xs">
              0{idx + 1}
            </div>
          </div>

          {/* Title and Tagline */}
          <h3 className="font-display text-2xl font-normal text-[#20060B] mb-2 group-hover:text-[#590B20] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-[#68626B] font-editorial leading-relaxed mb-4 line-clamp-3">
            {project.tagline}
          </p>

          {/* Contribution Highlight */}
          <div className="p-3 bg-[#FAF8F3] rounded-lg border border-[#E8DFD1] mb-5 group-hover:border-[#AC9062]/40 transition-colors">
            <div className="text-[10px] tracking-wider uppercase font-semibold text-[#590B20] mb-1 font-sans">
              My Contribution
            </div>
            <p className="text-xs text-[#20060B]/85 font-sans leading-relaxed line-clamp-2">
              {project.contribution}
            </p>
          </div>
        </div>

        <div>
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="text-[11px] font-sans px-2.5 py-1 bg-[#F7F4EE] text-[#20060B] rounded border border-[#D9CCB8]/60 group-hover:border-[#AC9062]/30 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[11px] font-sans px-2 py-1 text-[#68626B]">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Actions Bar */}
          <div className="pt-4 border-t border-[#E8DFD1] flex items-center justify-between">
            {/* Visual cue for reading case study */}
            <div className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-[#590B20] group-hover:text-[#20060B] transition-colors pointer-events-none">
              <span>Read Case Study</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#AC9062]" />
            </div>

            {/* Independent External Links (Elevated above card link) */}
            <div className="flex items-center gap-3 relative z-20">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs text-[#590B20] hover:text-[#20060B] inline-flex items-center gap-1 font-medium transition-colors p-1 rounded ${FOCUS_RING}`}
                  aria-label={`Live demo for ${project.title}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live</span>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs text-[#68626B] hover:text-[#20060B] inline-flex items-center gap-1 transition-colors p-1 rounded ${FOCUS_RING}`}
                  aria-label={`Code repository for ${project.title}`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function SelectedWork({ projects }: SelectedWorkProps) {
  const featuredProjects = projects.filter((p) => p.featured);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="relative w-full py-20 px-6 lg:px-16 bg-[#F7F4EE] border-b border-[#D9CCB8] scroll-mt-20"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between pb-12 mb-12 border-b border-[#D9CCB8]/80 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-sans tracking-[0.24em] uppercase font-medium text-[#AC9062]">
                SELECTED WORK
              </span>
              <span className="w-8 h-[1px] bg-[#AC9062]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[1.05] text-[#20060B]">
              Projects that turn ideas into reality.
            </h2>
          </div>

          <div className="flex items-end justify-between lg:justify-end gap-8">
            <div className="max-w-xs text-sm text-[#68626B] font-editorial leading-relaxed hidden sm:block">
              A curated selection of work where design meets practical, real-world impact.
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-display text-4xl sm:text-5xl text-[#AC9062]/30 leading-none select-none">
                01
              </span>
              <Link
                href="/projects"
                className={`group inline-flex items-center gap-1.5 text-sm font-sans font-medium text-[#590B20] hover:text-[#20060B] transition-colors ${FOCUS_RING} rounded`}
              >
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Projects Editorial Grid with Staggered Scroll Reveal & 1-2° Tilt on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
