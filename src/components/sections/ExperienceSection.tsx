"use client";

import React, { useState } from "react";
import { CheckCircle2, Building2, Users, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Experience } from "@/types/portfolio";

interface ExperienceSectionProps {
  experience: Experience[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  const [expandedCardIds, setExpandedCardIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedCardIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="experience" className="relative w-full py-20 px-6 lg:px-16 bg-[#FAF8F3] border-b border-[#D9CCB8] scroll-mt-20">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 mb-12 border-b border-[#D9CCB8]/80 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-sans tracking-[0.24em] uppercase font-medium text-[#AC9062]">
                LEADERSHIP &amp; OPERATIONS
              </span>
              <span className="w-8 h-[1px] bg-[#AC9062]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-normal leading-[1.05] text-[#20060B]">
              Chief Operating Officer at CodeXa Agency.
            </h2>
          </div>
          <span className="font-display text-4xl sm:text-5xl text-[#AC9062]/30 leading-none select-none">
            03
          </span>
        </div>

        {/* Experience Showcase Card */}
        {experience.map((exp) => {
          const isExpanded = !!expandedCardIds[exp.id];
          const hasMore = exp.contributions.length > 6;
          const initialItems = exp.contributions.slice(0, 6);
          const remainingItems = exp.contributions.slice(6);

          // Clean executive note text ensuring no duplicate prefix
          const executiveNoteContent = exp.cooDistinction
            ? exp.cooDistinction.replace(/^Executive (?:Structure Note|Role):\s*/i, "")
            : "Serving as Chief Operating Officer at CodeXa Agency, responsible for coordinating daily operations, project execution, internal teams, client communication, delivery processes, and organizational workflows in collaboration with the founders and executive leadership.";

          return (
            <div
              key={exp.id}
              className="rounded-2xl border border-[#D9CCB8] bg-white p-8 lg:p-12 shadow-[0_12px_36px_rgba(89,11,32,0.05)]"
            >
              {/* Header: Role & Organization */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#E8DFD1] gap-4">
                <div>
                  <div className="flex items-center gap-2.5 text-[#590B20] text-xs font-sans font-semibold uppercase tracking-wider mb-2">
                    <Building2 className="w-4 h-4 text-[#AC9062]" />
                    <span>{exp.company}</span>
                    <span className="text-[#D9CCB8]">·</span>
                    <span className="text-[#AC9062]">Active Venture</span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#20060B] font-medium tracking-tight">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <span className="px-3.5 py-1 rounded-full text-xs font-sans font-semibold bg-[#590B20]/10 text-[#590B20] border border-[#590B20]/20 tracking-wider uppercase">
                    CURRENT ROLE
                  </span>
                </div>
              </div>

              {/* Distinction & Operational Clarity Note */}
              <div className="my-6 p-4 bg-[#F7F4EE] rounded-xl border border-[#D9CCB8]/80 text-xs font-sans text-[#20060B]/85 flex items-start gap-3 leading-relaxed">
                <Users className="w-4 h-4 text-[#AC9062] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#590B20]">Executive Role: </span>
                  {executiveNoteContent}
                </div>
              </div>

              {/* Summary & Practical Contributions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                {/* Left Column: Scope & Mandate */}
                <div className="lg:col-span-5">
                  <h4 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#20060B] mb-3">
                    Scope &amp; Mandate
                  </h4>
                  <p className="text-base text-[#68626B] font-editorial leading-relaxed">
                    {exp.summary}
                  </p>
                </div>

                {/* Right Column: Key Practical Responsibilities */}
                <div className="lg:col-span-7">
                  <h4 className="text-sm font-sans uppercase tracking-wider font-semibold text-[#20060B] mb-4">
                    Key Practical Responsibilities
                  </h4>
                  <ul id={`responsibilities-list-${exp.id}`} className="space-y-3">
                    {initialItems.map((item, idx) => (
                      <li key={`init-${idx}`} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-[#AC9062] shrink-0 mt-1" />
                        <span className="text-sm text-[#20060B] font-sans leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}

                    <AnimatePresence initial={false}>
                      {isExpanded &&
                        remainingItems.map((item, idx) => (
                          <motion.li
                            key={`extra-${idx}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="flex items-start gap-3 overflow-hidden"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#AC9062] shrink-0 mt-1" />
                            <span className="text-sm text-[#20060B] font-sans leading-relaxed">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                    </AnimatePresence>
                  </ul>

                  {hasMore && (
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => toggleExpand(exp.id)}
                        aria-expanded={isExpanded}
                        aria-controls={`responsibilities-list-${exp.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-sans font-semibold tracking-wide text-[#590B20] bg-[#590B20]/5 hover:bg-[#590B20]/10 border border-[#590B20]/20 transition-colors cursor-pointer"
                      >
                        <span>
                          {isExpanded
                            ? "Show Fewer Responsibilities"
                            : `View All Responsibilities (${exp.contributions.length})`}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

