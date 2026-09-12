"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Trophy, 
  Award, 
  BookOpen, 
  Compass, 
  Building2, 
  Calendar, 
  Hash, 
  ShieldCheck, 
  ArrowUpRight, 
  X, 
  ExternalLink,
  CheckCircle2,
  Info
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Achievement, Credential } from "@/types/portfolio";
import { DisplayRecord } from "./AchievementsSection";

interface AchievementsArchiveViewProps {
  achievements: Achievement[];
  credentials: Credential[];
}

type FilterOption = "all" | "achievements" | "certificates" | "courses-modules" | "learning-journeys";

const FILTER_TABS: { id: FilterOption; label: string }[] = [
  { id: "all", label: "All Published Records" },
  { id: "achievements", label: "Hackathons & Contests" },
  { id: "certificates", label: "Certificates of Completion" },
  { id: "courses-modules", label: "Courses & Modules" },
  { id: "learning-journeys", label: "Learning Journeys" }
];

export default function AchievementsArchiveView({
  achievements,
  credentials
}: AchievementsArchiveViewProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [previewRecord, setPreviewRecord] = useState<DisplayRecord | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Normalize records
  const allRecords: DisplayRecord[] = useMemo(() => {
    const list: DisplayRecord[] = [];

    achievements.forEach((ach) => {
      list.push({
        id: ach.id,
        kind: "achievement",
        filterCategory: "achievements",
        categoryBadge: "HACKATHON COMPETITION",
        title: ach.title,
        issuer: ach.organizer,
        type: `${ach.type} · ${ach.teamOrIndividual} Result`,
        year: ach.year,
        date: ach.year,
        result: ach.result,
        teamOrIndividual: ach.teamOrIndividual,
        summary: ach.description,
        verificationUrl: ach.evidenceUrl,
        order: ach.order
      });
    });

    credentials.forEach((cred) => {
      let filterCategory: "certificates" | "courses-modules" | "learning-journeys" = "courses-modules";
      let categoryBadge = "COURSE / MODULE";

      if (cred.type === "Learning Journey" || cred.category === "learning-journey") {
        filterCategory = "learning-journeys";
        categoryBadge = "LEARNING JOURNEY";
      } else if (
        cred.type === "Certificate of Completion" || 
        cred.type === "Certificate" || 
        cred.category === "certificate"
      ) {
        filterCategory = "certificates";
        categoryBadge = "CERTIFICATE OF COMPLETION";
      } else {
        filterCategory = "courses-modules";
        categoryBadge = cred.type.toUpperCase();
      }

      list.push({
        id: cred.id,
        kind: "credential",
        filterCategory,
        categoryBadge,
        title: cred.title,
        issuer: cred.issuer,
        type: cred.type,
        date: cred.date,
        summary: cred.summary || "Structured technical curriculum record.",
        credentialId: cred.credentialId,
        verificationUrl: cred.verificationUrl,
        linkedInPostUrl: cred.linkedInPostUrl,
        certificateImage: cred.certificateImage,
        featured: cred.featured,
        order: 10 + cred.order
      });
    });

    return list.sort((a, b) => a.order - b.order);
  }, [achievements, credentials]);

  // Counts
  const counts = useMemo(() => {
    const achCount = allRecords.filter(r => r.filterCategory === "achievements").length;
    const certCount = allRecords.filter(r => r.filterCategory === "certificates").length;
    const courseCount = allRecords.filter(r => r.filterCategory === "courses-modules").length;
    const journeyCount = allRecords.filter(r => r.filterCategory === "learning-journeys").length;
    return {
      total: allRecords.length,
      achCount,
      certCount,
      courseCount,
      journeyCount
    };
  }, [allRecords]);

  const filteredRecords = useMemo(() => {
    if (activeFilter === "all") return allRecords;
    return allRecords.filter(r => r.filterCategory === activeFilter);
  }, [activeFilter, allRecords]);

  // Modal accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewRecord(null);
    };
    if (previewRecord) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewRecord]);

  return (
    <div className="w-full">
      {/* Category Metric Strip */}
      <div className="mb-10 py-4 px-6 bg-white rounded-2xl border border-[#D9CCB8] shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D9CCB8]/70">
          <div className="py-2 sm:py-0 sm:px-4 first:pl-0 flex items-center gap-3">
            <Trophy className="w-4 h-4 text-[#AC9062] shrink-0" />
            <div>
              <div className="font-mono text-lg font-bold text-[#590B20]">
                {String(counts.achCount).padStart(2, "0")}
              </div>
              <div className="text-[11px] font-sans text-[#68626B]">
                Hackathon Placements
              </div>
            </div>
          </div>

          <div className="py-2 sm:py-0 sm:px-4 flex items-center gap-3">
            <Award className="w-4 h-4 text-[#AC9062] shrink-0" />
            <div>
              <div className="font-mono text-lg font-bold text-[#590B20]">
                {String(counts.certCount).padStart(2, "0")}
              </div>
              <div className="text-[11px] font-sans text-[#68626B]">
                Certificates
              </div>
            </div>
          </div>

          <div className="py-2 sm:py-0 sm:px-4 flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-[#AC9062] shrink-0" />
            <div>
              <div className="font-mono text-lg font-bold text-[#590B20]">
                {String(counts.courseCount).padStart(2, "0")}
              </div>
              <div className="text-[11px] font-sans text-[#68626B]">
                Courses &amp; Modules
              </div>
            </div>
          </div>

          <div className="py-2 sm:py-0 sm:px-4 last:pr-0 flex items-center gap-3">
            <Compass className="w-4 h-4 text-[#AC9062] shrink-0" />
            <div>
              <div className="font-mono text-lg font-bold text-[#590B20]">
                {String(counts.journeyCount).padStart(2, "0")}
              </div>
              <div className="text-[11px] font-sans text-[#68626B]">
                Learning Journeys
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8 border-b border-[#D9CCB8]">
        <div 
          role="tablist" 
          aria-label="Archive Categories"
          className="flex items-center gap-4 sm:gap-8 overflow-x-auto scrollbar-none pb-px"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            let tabBadgeCount = counts.total;
            if (tab.id === "achievements") tabBadgeCount = counts.achCount;
            if (tab.id === "certificates") tabBadgeCount = counts.certCount;
            if (tab.id === "courses-modules") tabBadgeCount = counts.courseCount;
            if (tab.id === "learning-journeys") tabBadgeCount = counts.journeyCount;

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(tab.id)}
                className={`relative py-3.5 text-xs sm:text-sm font-sans tracking-tight transition-colors cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#590B20] focus-visible:outline-none flex items-center gap-2 ${
                  isActive 
                    ? "text-[#590B20] font-semibold" 
                    : "text-[#68626B] hover:text-[#20060B] font-normal"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                  isActive 
                    ? "bg-[#590B20]/10 text-[#590B20]" 
                    : "bg-[#D9CCB8]/40 text-[#68626B]"
                }`}>
                  {tabBadgeCount}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="activeArchiveFilterUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#590B20]"
                    transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Records Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="p-7 bg-white rounded-2xl border border-[#D9CCB8] shadow-xs hover:border-[#AC9062] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Date Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#590B20] bg-[#590B20]/5 px-2.5 py-1 rounded-md border border-[#590B20]/15 font-sans">
                    {record.categoryBadge}
                  </span>
                  {record.date ? (
                    <span className="text-xs font-mono text-[#68626B] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#AC9062]" />
                      <span>{record.date}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-sans text-[#68626B]/75 italic">
                      Curriculum Verified
                    </span>
                  )}
                </div>

                {/* Title & Placement */}
                <h3 className="font-display text-2xl text-[#20060B] group-hover:text-[#590B20] transition-colors font-medium mb-1 leading-snug">
                  {record.title}
                </h3>

                {record.result && (
                  <div className="text-sm font-semibold text-[#590B20] mb-2 font-sans">
                    {record.result}
                  </div>
                )}

                {/* Issuer & Type */}
                <div className="text-xs text-[#68626B] font-sans flex items-center gap-1.5 mb-3">
                  <Building2 className="w-3.5 h-3.5 text-[#AC9062] shrink-0" />
                  <span className="font-medium text-[#20060B]">{record.issuer}</span>
                  <span className="text-[#D9CCB8]">·</span>
                  <span>{record.type}</span>
                </div>

                {/* Summary */}
                <p className="text-sm text-[#68626B] font-editorial leading-relaxed mb-4">
                  {record.summary}
                </p>

                {/* Disclosures & Details */}
                {record.filterCategory === "learning-journeys" && (
                  <div className="p-3 bg-[#FAF8F3] rounded-lg border border-[#E8DFD1] text-xs text-[#68626B] font-sans leading-relaxed mb-4 flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#590B20] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#590B20]">Classification Disclosure: </span>
                      Structured self-paced technical learning journey on Google Cloud. This represents hands-on curriculum completion rather than passing the official proctored Google Cloud certification exam.
                    </div>
                  </div>
                )}

                {record.credentialId && (
                  <div className="text-xs font-mono text-[#68626B] bg-[#F7F4EE] px-3 py-1.5 rounded-md border border-[#E8DFD1] mb-4 inline-flex items-center gap-1.5">
                    <Hash className="w-3 h-3 text-[#AC9062]" />
                    <span>ID: {record.credentialId}</span>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-[#E8DFD1] flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-[#AC9062] font-medium uppercase tracking-wider font-sans">
                  <ShieldCheck className="w-4 h-4 text-[#AC9062]" />
                  <span>Verified Milestone</span>
                </div>

                <div className="flex items-center gap-2">
                  {record.verificationUrl && (
                    <a
                      href={record.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-[#590B20] hover:text-[#20060B] transition-colors underline underline-offset-4 decoration-[#AC9062]/50"
                    >
                      <span>View Credential</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {record.linkedInPostUrl && (
                    <a
                      href={record.linkedInPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-[#590B20] hover:text-[#20060B] transition-colors underline underline-offset-4 decoration-[#AC9062]/50"
                    >
                      <span>LinkedIn Post</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setPreviewRecord(record)}
                    className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#68626B] hover:text-[#590B20] px-2.5 py-1 rounded-md hover:bg-black/5 cursor-pointer"
                  >
                    <span>Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Record Preview Modal */}
      <AnimatePresence>
        {previewRecord && (
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="archive-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setPreviewRecord(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF8F3] border border-[#D9CCB8] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative font-sans"
            >
              <button
                type="button"
                onClick={() => setPreviewRecord(null)}
                aria-label="Close record preview"
                className="absolute top-4 right-4 p-2 rounded-full text-[#68626B] hover:text-[#20060B] hover:bg-black/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-[#AC9062]">
                    {previewRecord.categoryBadge}
                  </span>
                  <h4 id="archive-modal-title" className="font-display text-2xl text-[#20060B] font-medium mt-1 leading-snug">
                    {previewRecord.title}
                  </h4>
                  <p className="text-xs text-[#68626B] font-sans mt-1">
                    {previewRecord.issuer} · {previewRecord.type}
                  </p>
                </div>

                {previewRecord.result && (
                  <div className="p-3 bg-white rounded-lg border border-[#D9CCB8] text-xs flex items-center justify-between">
                    <span className="text-[#68626B]">Result / Placement:</span>
                    <span className="font-semibold text-[#590B20]">{previewRecord.result}</span>
                  </div>
                )}

                {previewRecord.date && (
                  <div className="p-3 bg-white rounded-lg border border-[#D9CCB8] text-xs flex items-center justify-between">
                    <span className="text-[#68626B]">Completion Date:</span>
                    <span className="font-medium text-[#20060B]">{previewRecord.date}</span>
                  </div>
                )}

                {previewRecord.credentialId && (
                  <div className="p-3 bg-white rounded-lg border border-[#D9CCB8] text-xs font-mono flex items-center justify-between">
                    <span className="text-[#68626B]">Credential ID:</span>
                    <span className="font-semibold text-[#20060B]">{previewRecord.credentialId}</span>
                  </div>
                )}

                <div className="p-4 bg-[#F7F4EE] rounded-xl border border-[#D9CCB8]">
                  <div className="text-[11px] font-semibold text-[#590B20] uppercase tracking-wider mb-1.5">
                    Curriculum Summary
                  </div>
                  <p className="text-xs text-[#68626B] font-editorial leading-relaxed">
                    {previewRecord.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D9CCB8] flex items-center justify-end gap-3">
                  {previewRecord.verificationUrl && (
                    <a
                      href={previewRecord.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans font-semibold text-white bg-[#590B20] hover:bg-[#20060B] transition-colors"
                    >
                      <span>View Original Credential</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {previewRecord.linkedInPostUrl && (
                    <a
                      href={previewRecord.linkedInPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans font-semibold text-[#590B20] bg-white border border-[#D9CCB8] hover:bg-[#F7F4EE] transition-colors"
                    >
                      <span>LinkedIn Post</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setPreviewRecord(null)}
                    className="px-4 py-2 rounded-lg text-xs font-sans font-medium text-[#68626B] hover:text-[#20060B] border border-[#D9CCB8] hover:bg-black/5"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
