"use client";

import React from "react";
import { GraduationCap, ShieldCheck, Compass, Sparkles } from "lucide-react";
import { PortfolioProfile } from "@/types/portfolio";

interface AboutEducationProps {
  profile: PortfolioProfile;
}

export default function AboutEducation({ profile }: AboutEducationProps) {
  return (
    <section id="about" className="relative w-full py-20 px-6 lg:px-16 bg-[#F7F4EE] border-b border-[#D9CCB8] scroll-mt-20">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-10 mb-12 border-b border-[#D9CCB8]/80 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-sans tracking-[0.24em] uppercase font-medium text-[#AC9062]">
                BACKGROUND &amp; FOUNDATIONS
              </span>
              <span className="w-8 h-[1px] bg-[#AC9062]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-normal leading-[1.05] text-[#20060B]">
              Where Engineering Rigor Meets Refined Interfaces.
            </h2>
          </div>
          <span className="font-display text-4xl sm:text-5xl text-[#AC9062]/30 leading-none select-none">
            02
          </span>
        </div>

        {/* 2-Column Split: Editorial Biography + Academic Enrolment Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Narrative Story */}
          <div className="lg:col-span-7 space-y-6 font-editorial text-lg text-[#20060B]/90 leading-relaxed">
            {profile.aboutBio.map((paragraph, idx) => (
              <p key={idx} className="first-of-type:text-xl first-of-type:text-[#20060B]">
                {paragraph}
              </p>
            ))}

            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 not-italic font-sans">
              <div className="p-4 bg-white rounded-xl border border-[#D9CCB8] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#AC9062] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#20060B]">Cybersecurity Perspective</h4>
                  <p className="text-xs text-[#68626B] mt-1 leading-normal">
                    Grounding frontend design with secure session principles, input sanitation, and zero-trust mindset.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#D9CCB8] flex items-start gap-3">
                <Compass className="w-5 h-5 text-[#AC9062] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#20060B]">Product &amp; Operations</h4>
                  <p className="text-xs text-[#68626B] mt-1 leading-normal">
                    Combining design craft with operational coordination at CodeXa Agency to ship real digital tools.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Formal Enrolled Academic Record */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#D9CCB8] p-8 shadow-[0_12px_36px_rgba(89,11,32,0.05)]">
            <div className="flex items-center gap-2.5 text-[#590B20] text-xs font-sans font-semibold uppercase tracking-wider mb-6">
              <GraduationCap className="w-5 h-5 text-[#AC9062]" />
              <span>Academic Programme</span>
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-sans text-[#68626B]">Degree &amp; Discipline</span>
                <h3 className="font-display text-2xl text-[#20060B] font-medium mt-0.5">
                  {profile.education.degree}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8DFD1]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-sans text-[#68626B]">Enrolled College</span>
                  <p className="text-sm font-medium text-[#20060B] mt-0.5">
                    {profile.education.institution}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider font-sans text-[#68626B]">Affiliating University</span>
                  <p className="text-sm font-medium text-[#20060B] mt-0.5">
                    {profile.education.university}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8DFD1]">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-sans text-[#68626B]">Study Timeline</span>
                  <p className="text-sm font-medium text-[#590B20] mt-0.5">
                    {profile.education.period}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider font-sans text-[#68626B]">Current Status</span>
                  <p className="text-sm font-medium text-[#20060B] mt-0.5">
                    Undergraduate Student
                  </p>
                </div>
              </div>

              {/* Truthful institutional disclaimer as required */}
              <div className="mt-6 pt-4 border-t border-[#E8DFD1] text-[11px] text-[#68626B] leading-relaxed font-sans bg-[#FAF8F3] p-3.5 rounded-lg border border-[#E8DFD1]">
                <div className="flex items-center gap-1.5 text-[#AC9062] font-medium mb-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Verified Enrolment Record</span>
                </div>
                {profile.education.disclaimer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
