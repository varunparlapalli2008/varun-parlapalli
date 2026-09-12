"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  ArrowUpRight, 
  Building2, 
  Trophy, 
  Award, 
  BookOpen, 
  Compass, 
  X,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Hash
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Achievement, Credential } from "@/types/portfolio";

interface AchievementsSectionProps {
  achievements?: Achievement[];
  credentials?: Credential[];
}

export type FilterOption = 
  | "all" 
  | "achievements" 
  | "certificates" 
  | "courses-modules" 
  | "learning-journeys";

interface FilterTab {
  id: FilterOption;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { id: "all", label: "All Records" },
  { id: "achievements", label: "Achievements" },
  { id: "certificates", label: "Certificates" },
  { id: "courses-modules", label: "Courses & Modules" },
  { id: "learning-journeys", label: "Learning Journeys" }
];

export interface DisplayRecord {
  id: string;
  kind: "achievement" | "credential";
  filterCategory: "achievements" | "certificates" | "courses-modules" | "learning-journeys";
  categoryBadge: string;
  title: string;
  issuer: string;
  type: string;
  date?: string;
  year?: string;
  summary: string;
  result?: string;
  teamOrIndividual?: "Team" | "Individual";
  credentialId?: string;
  verificationUrl?: string;
  linkedInPostUrl?: string;
  certificateImage?: string;
  featured?: boolean;
  order: number;
}

export default function AchievementsSection({ 
  achievements = [], 
  credentials = [] 
}: AchievementsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [previewRecord, setPreviewRecord] = useState<DisplayRecord | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Normalize and unite achievements and credentials
  const allRecords: DisplayRecord[] = useMemo(() => {
    const list: DisplayRecord[] = [];

    // 1. Hackathon Achievements
    achievements.forEach((ach) => {
      list.push({
        id: ach.id,
        kind: "achievement",
        filterCategory: "achievements",
        categoryBadge: "HACKATHON MILESTONE",
        title: ach.title,
        issuer: ach.organizer,
        type: `${ach.type} · ${ach.teamOrIndividual}`,
        year: ach.year,
        date: ach.year,
        result: ach.result,
        teamOrIndividual: ach.teamOrIndividual,
        summary: ach.description,
        verificationUrl: ach.evidenceUrl,
        order: ach.order
      });
    });

    // 2. Credentials
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

  // Counts by category
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

  // Filtered records
  const filteredRecords = useMemo(() => {
    if (activeFilter === "all") return allRecords;
    return allRecords.filter(r => r.filterCategory === activeFilter);
  }, [activeFilter, allRecords]);

  // Modal accessibility: Escape key and scroll lock
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
    <section 
      id="achievements" 
      className="relative w-full py-20 px-6 lg:px-16 bg-[#FAF8F3] border-b border-[#D9CCB8] scroll-mt-20 selection:bg-[#590B20] selection:text-white"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 mb-6 border-b border-[#D9CCB8]/80 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-sans tracking-[0.24em] uppercase font-medium text-[#AC9062]">
                VALIDATED MILESTONES
              </span>
              <span className="w-8 h-[1px] bg-[#AC9062]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-normal leading-[1.05] text-[#20060B]">
              Achievements &amp; Credentials.
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-display text-4xl sm:text-5xl text-[#AC9062]/30 leading-none select-none">
              05
            </span>
            <Link
              href="/achievements"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#590B20] text-white text-xs font-sans font-semibold hover:bg-[#20060B] transition-colors shadow-xs"
            >
              <span>View All Achievements &amp; Credentials</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Section Introduction */}
        <div className="max-w-3xl mb-10">
          <p className="text-base text-[#68626B] font-editorial leading-relaxed">
            Verified record of competitive hackathon placements, recognized certificates of completion, foundational courses, and structured learning journeys. Each record represents practical engineering rigor with zero simulated claims.
          </p>
        </div>

        {/* Minimal Summary Strip */}
        <div className="mb-10 py-4 px-6 bg-white/80 rounded-xl border border-[#D9CCB8]/80 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D9CCB8]/70">
            <div className="py-2 sm:py-0 sm:px-4 first:pl-0 flex items-center gap-3">
              <Trophy className="w-4 h-4 text-[#AC9062] shrink-0" />
              <div>
                <div className="font-mono text-lg font-bold text-[#590B20]">
                  {String(counts.achCount).padStart(2, "0")}
                </div>
                <div className="text-[11px] font-sans text-[#68626B] tracking-wide">
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
                <div className="text-[11px] font-sans text-[#68626B] tracking-wide">
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
                <div className="text-[11px] font-sans text-[#68626B] tracking-wide">
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
                <div className="text-[11px] font-sans text-[#68626B] tracking-wide">
                  Learning Journeys
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="mb-8 border-b border-[#D9CCB8]">
          <div 
            role="tablist" 
            aria-label="Credential Categories"
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
                      layoutId="activeFilterUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#590B20]"
                      transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Verified Records Ledger */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="divide-y divide-[#E8DFD1] border-t border-[#D9CCB8]"
          >
            {filteredRecords.map((record, index) => {
              return (
                <div
                  key={record.id}
                  className="py-7 transition-colors hover:bg-black/[0.015] group px-3 sm:px-5 rounded-xl -mx-3 sm:-mx-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start">
                    {/* Left Column: Number, Date, Category Badge */}
                    <div className="md:col-span-3 flex md:flex-col items-baseline md:items-start justify-between md:justify-start gap-1.5">
                      <span className="font-mono text-xs font-semibold text-[#AC9062]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      
                      {record.date ? (
                        <div className="font-mono text-xs sm:text-sm font-medium text-[#20060B] flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-[#AC9062]" />
                          <span>{record.date}</span>
                        </div>
                      ) : (
                        <div className="text-[11px] font-sans text-[#68626B]/80 italic mt-0.5">
                          Verified Curriculum
                        </div>
                      )}

                      <span className="text-[10px] tracking-[0.16em] uppercase font-sans font-semibold text-[#590B20] mt-1 bg-[#590B20]/5 px-2 py-0.5 rounded border border-[#590B20]/15">
                        {record.categoryBadge}
                      </span>
                    </div>

                    {/* Middle Column: Title, Result / Type, Issuer, Summary */}
                    <div className="md:col-span-6 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl sm:text-2xl text-[#20060B] group-hover:text-[#590B20] transition-colors font-medium tracking-tight">
                          {record.title}
                        </h3>
                        {record.result && (
                          <span className="text-xs font-sans font-semibold px-2.5 py-0.5 rounded-full bg-[#590B20]/10 text-[#590B20] border border-[#590B20]/20">
                            {record.result}
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#68626B] font-sans flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#AC9062] shrink-0" />
                        <span className="font-medium text-[#20060B]">{record.issuer}</span>
                        <span className="text-[#D9CCB8]">·</span>
                        <span className="text-[#AC9062]">{record.type}</span>
                      </div>

                      <p className="text-sm text-[#68626B] font-editorial leading-relaxed max-w-2xl pt-1">
                        {record.summary}
                      </p>

                      {record.credentialId && (
                        <div className="text-xs font-mono text-[#68626B] flex items-center gap-1.5 pt-1">
                          <Hash className="w-3 h-3 text-[#AC9062]" />
                          <span>ID: {record.credentialId}</span>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Status & Direct Evidence Actions */}
                    <div className="md:col-span-3 flex flex-col md:items-end justify-between gap-3 text-left md:text-right pt-2 md:pt-0">
                      <div className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold tracking-wider text-[#AC9062] uppercase">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#AC9062]" />
                        <span>VERIFIED RECORD</span>
                      </div>

                      {/* Action Links: strictly render only if authentic URL exists */}
                      <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2">
                        {record.verificationUrl && (
                          <a
                            href={record.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View official credential for ${record.title}`}
                            className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#590B20] hover:text-[#20060B] transition-colors underline underline-offset-4 decoration-[#AC9062]/50 hover:decoration-[#590B20]"
                          >
                            <span>View Credential</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        )}

                        {record.linkedInPostUrl && (
                          <a
                            href={record.linkedInPostUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View LinkedIn post for ${record.title}`}
                            className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#590B20] hover:text-[#20060B] transition-colors underline underline-offset-4 decoration-[#AC9062]/50 hover:decoration-[#590B20]"
                          >
                            <span>View LinkedIn Post</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        )}

                        {/* Certificate details modal trigger */}
                        <button
                          type="button"
                          onClick={() => setPreviewRecord(record)}
                          className="inline-flex items-center gap-1 text-xs font-sans font-medium text-[#68626B] hover:text-[#590B20] transition-colors cursor-pointer py-1 px-2.5 rounded-md hover:bg-black/5"
                        >
                          <span>Record Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Banner linking to full archive */}
        <div className="mt-12 pt-8 border-t border-[#D9CCB8]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#68626B] font-sans text-center sm:text-left">
            Showing all {filteredRecords.length} published milestones in this view.
          </div>
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#590B20] hover:text-[#20060B] transition-colors group"
          >
            <span>Explore Complete Archive &amp; Verification Directory</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Credential Details Modal */}
        <AnimatePresence>
          {previewRecord && (
            <div 
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-record-title"
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
                    <h4 id="modal-record-title" className="font-display text-2xl text-[#20060B] font-medium mt-1 leading-snug">
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
    </section>
  );
}
