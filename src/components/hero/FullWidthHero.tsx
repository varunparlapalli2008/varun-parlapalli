"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { MapPin, Sparkles, Send, ArrowRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useAssistant } from "../ai/AssistantContext";
import ArchitecturalArtwork from "./ArchitecturalArtwork";
import { useAmbientAnimation, useMagnetic, FOCUS_RING } from "@/lib/motion";
import { PortfolioProfile } from "@/types/portfolio";

interface FullWidthHeroProps {
  profile?: PortfolioProfile;
}

export default function FullWidthHero({ profile }: FullWidthHeroProps) {
  const { openAssistant } = useAssistant();
  const [query, setQuery] = useState("");
  const isAmbientActive = useAmbientAnimation();
  const shouldReduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // The linework drifts slower than the page, and the copy settles back a
  // touch as the reader leaves — a shallow depth cue, not a parallax stunt.
  const artworkY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const artworkScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const {
    ref: primaryCtaRef,
    onMouseMove: onPrimaryCtaMove,
    onMouseLeave: onPrimaryCtaLeave,
  } = useMagnetic<HTMLAnchorElement>(0.16, 5);

  const {
    ref: secondaryCtaRef,
    onMouseMove: onSecondaryCtaMove,
    onMouseLeave: onSecondaryCtaLeave,
  } = useMagnetic<HTMLButtonElement>(0.16, 5);

  const rawName = (profile?.name || "PARLAPALLI VARUN").trim();
  const nameParts = rawName.split(/\s+/);
  const firstLine = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : nameParts[0];
  const secondLine = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      openAssistant("Tell me about the NEC Portal project.");
      return;
    }
    openAssistant(query.trim());
    setQuery("");
  };

  const handleExampleClick = () => {
    openAssistant("Tell me about the NEC Portal project.");
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative w-full min-h-[calc(100svh-72px)] flex flex-col justify-between py-8 sm:py-12 px-6 lg:px-16 bg-[#F7F4EE] paper-grain border-b border-[#D9CCB8] overflow-hidden"
    >
      {/* Delicate Architectural Linework in Background with visibility-aware ambient breathing */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25 select-none z-0 will-change-transform"
        style={shouldReduceMotion ? undefined : { y: artworkY, scale: artworkScale }}
      >
        <ArchitecturalArtwork className="w-full max-w-5xl h-auto" isAmbientActive={isAmbientActive} />
      </motion.div>

      {/* Warm vignette that deepens the page edges without hiding the grain */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 35%, transparent 45%, rgba(32, 6, 11, 0.045) 100%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto w-full flex-1 flex flex-col justify-between items-center text-center"
        style={shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {/* Top Secondary Information */}
        <div
          className="w-full flex flex-col sm:flex-row items-center justify-between text-[11px] tracking-[0.15em] sm:tracking-[0.18em] uppercase font-sans text-[#68626B] pb-4 gap-2 anim-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="flex items-center gap-1.5 text-[#68626B]">
            <MapPin className="w-3.5 h-3.5 text-[#AC9062]" />
            <span>{profile?.location || "Guntur, Andhra Pradesh"}</span>
          </div>
          <div className="text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] text-[#68626B]">
            BUILD · LEARN · COLLABORATE
          </div>
        </div>

        {/* Center: Main Balanced Editorial Introduction */}
        <div className="my-auto py-4 sm:py-8 w-full flex flex-col items-center">
          {/* Eyebrow with Animated Gold Rule */}
          <div
            className="flex items-center justify-center gap-3 mb-4 anim-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="text-[11px] sm:text-xs font-sans tracking-[0.24em] uppercase font-medium text-[#20060B]">
              DESIGN MEETS SYSTEMS
            </span>
            <span
              className="h-[1px] bg-[#AC9062] inline-block anim-rule"
              style={{ animationDelay: "0.25s" }}
              aria-hidden="true"
            />
          </div>

          {/* Dominant Heading: Dynamic Name from Profile */}
          <h1 className="font-display text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[92px] font-normal leading-[0.92] tracking-[-0.015em] text-[#20060B] mb-5 sm:mb-6 max-w-full">
            <span
              className="block anim-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              {firstLine}
            </span>
            {secondLine && (
              <span
                className="block text-[#20060B] anim-fade-up"
                style={{ animationDelay: "0.38s" }}
              >
                {secondLine}
              </span>
            )}
          </h1>

          {/* Role & Supporting Role */}
          <div
            className="space-y-1 mb-5 sm:mb-6 anim-fade-up max-w-full px-2"
            style={{ animationDelay: "0.5s" }}
          >
            {profile?.primaryRole && (
              <p className="text-lg sm:text-2xl font-medium text-[#20060B] tracking-tight font-sans">
                {profile.primaryRole}
              </p>
            )}
            {profile?.supportingRole && (
              <p className="text-xs sm:text-[15px] text-[#68626B] font-sans">
                {profile.supportingRole}
              </p>
            )}
          </div>

          {/* Editorial Introduction Paragraph */}
          <p
            className="text-sm sm:text-lg leading-relaxed text-[#20060B]/90 font-editorial max-w-2xl mb-6 sm:mb-8 anim-fade-up px-2 sm:px-0"
            style={{ animationDelay: "0.62s" }}
          >
            {profile?.introduction || "I turn ideas into clear, responsive digital products through design, code, and thoughtful execution."}
          </p>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto anim-fade-up px-4 sm:px-0"
            style={{ animationDelay: "0.74s" }}
          >
            {/* Filled Burgundy Button */}
            <Link
              href="/#projects"
              ref={primaryCtaRef}
              onMouseMove={onPrimaryCtaMove}
              onMouseLeave={onPrimaryCtaLeave}
              className={`group sheen w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#590B20] text-white text-sm font-sans font-medium hover:bg-[#430717] hover:shadow-[0_14px_32px_rgba(89,11,32,0.28)] active:scale-98 transition-[background-color,box-shadow] duration-200 shadow-sm ${FOCUS_RING}`}
            >
              <span>View Selected Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>

            {/* Outlined Burgundy Button */}
            <button
              onClick={() => openAssistant()}
              ref={secondaryCtaRef}
              onMouseMove={onSecondaryCtaMove}
              onMouseLeave={onSecondaryCtaLeave}
              className={`group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-[#590B20] text-[#590B20] bg-transparent text-sm font-sans font-medium hover:bg-[#590B20]/5 hover:shadow-[0_10px_26px_rgba(89,11,32,0.12)] active:scale-98 transition-[background-color,box-shadow,border-color] duration-200 cursor-pointer ${FOCUS_RING}`}
            >
              <Sparkles className="w-4 h-4 text-[#AC9062] transition-transform duration-300 group-hover:rotate-[18deg] group-hover:scale-110" />
              <span>Ask Varun&apos;s AI</span>
            </button>
          </div>

          {/* Wide Outlined Question Input */}
          <div
            className="w-full max-w-lg anim-fade-up"
            style={{ animationDelay: "0.86s" }}
          >
            <form
              onSubmit={handleQuerySubmit}
              className={`relative flex items-center bg-white border border-[#D9CCB8] rounded-xl px-4 py-3.5 shadow-[0_4px_20px_rgba(89,11,32,0.04)] hover:border-[#AC9062] hover:shadow-[0_10px_28px_rgba(89,11,32,0.07)] focus-within:border-[#590B20] focus-within:ring-2 focus-within:ring-[#590B20]/20 focus-within:shadow-[0_12px_32px_rgba(89,11,32,0.1)] focus-within:-translate-y-0.5 transition-all duration-300 ${FOCUS_RING}`}
            >
              <Sparkles className="w-4 h-4 text-[#AC9062] mr-3 shrink-0 transition-transform duration-500 group-focus-within:rotate-12" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about my work, skills, or experience..."
                className="w-full bg-transparent text-sm text-[#20060B] placeholder-[#68626B]/70 outline-none font-sans"
              />
              <button
                type="submit"
                className="p-1.5 text-[#590B20] hover:text-[#20060B] hover:scale-110 active:scale-95 transition-all rounded focus:outline-none cursor-pointer"
                aria-label="Send query to AI Assistant"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Helper Prompt */}
            <div className="mt-2.5 text-xs text-[#68626B] font-sans">
              Example:{" "}
              <button
                type="button"
                onClick={handleExampleClick}
                className="text-[#590B20] underline underline-offset-2 hover:text-[#20060B] transition-colors cursor-pointer"
              >
                “Tell me about the NEC Portal project.”
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Prompt Indicator */}
        <div
          className="pt-2 pb-1 anim-fade-up"
          style={{ animationDelay: "0.98s" }}
        >
          <Link
            href="/#projects"
            className={`group flex flex-col items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-sans text-[#68626B] hover:text-[#590B20] transition-colors rounded ${FOCUS_RING}`}
          >
            <span className="transition-[letter-spacing] duration-500 group-hover:tracking-[0.26em]">
              Scroll to Projects
            </span>
            <span className="w-4 h-[1px] bg-[#AC9062] group-hover:w-10 transition-all duration-500 ease-out" />
            <ChevronDown
              className="w-3.5 h-3.5 text-[#AC9062] scroll-cue"
              aria-hidden="true"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
