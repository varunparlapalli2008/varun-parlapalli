"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Sparkles, Send, ArrowRight } from "lucide-react";
import { useAssistant } from "../ai/AssistantContext";

export default function HeroIntro() {
  const { openAssistant } = useAssistant();
  const [query, setQuery] = useState("");

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
    <div className="flex flex-col justify-between py-8 px-6 lg:px-12 h-full">
      {/* Top Utility Bar */}
      <div className="flex items-center justify-between pb-8 text-[12px] tracking-[0.14em] uppercase font-sans text-[#68626B]">
        <div className="flex items-center gap-1.5 text-[#68626B]">
          <MapPin className="w-3.5 h-3.5 text-[#AC9062]" />
          <span>Guntur, Andhra Pradesh</span>
        </div>
        <div className="hidden sm:block text-[11px] tracking-[0.2em] text-[#68626B]">
          BUILD · LEARN · COLLABORATE
        </div>
      </div>

      {/* Main Copy Block */}
      <div className="my-auto max-w-xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[12px] font-sans tracking-[0.22em] uppercase font-medium text-[#20060B]">
            DESIGN MEETS SYSTEMS
          </span>
          <span className="w-10 h-[1px] bg-[#AC9062]" aria-hidden="true" />
        </div>

        {/* Display Heading - Broken into two deliberate lines */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-[76px] font-normal leading-[0.92] tracking-[-0.01em] text-[#20060B] mb-8">
          <span className="block">PARLAPALLI</span>
          <span className="block text-[#20060B]">VARUN</span>
        </h1>

        {/* Role & Supporting Role */}
        <div className="space-y-1.5 mb-6">
          <p className="text-xl sm:text-[22px] font-medium text-[#20060B] tracking-tight font-sans">
            Frontend Developer &amp; UI/UX Designer
          </p>
          <p className="text-sm sm:text-[15px] text-[#68626B] font-sans">
            Cybersecurity Undergraduate · COO at CodeXa Agency
          </p>
        </div>

        {/* Introduction */}
        <p className="text-base sm:text-[17px] leading-relaxed text-[#20060B]/90 font-editorial max-w-lg mb-9">
          I turn ideas into clear, responsive digital products through design, code, and thoughtful execution.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4 mb-9">
          {/* Filled Burgundy Button */}
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#590B20] text-white text-sm font-sans font-medium hover:bg-[#430717] transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#590B20] focus-visible:ring-offset-2"
          >
            <span>View Selected Work</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Outlined Burgundy Button */}
          <button
            onClick={() => openAssistant()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#590B20] text-[#590B20] bg-transparent text-sm font-sans font-medium hover:bg-[#590B20]/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#590B20]"
          >
            <Sparkles className="w-4 h-4 text-[#AC9062]" />
            <span>Ask Varun&apos;s AI</span>
          </button>
        </div>

        {/* Wide Outlined Question Input */}
        <div className="w-full max-w-lg">
          <form
            onSubmit={handleQuerySubmit}
            className="relative flex items-center bg-white border border-[#D9CCB8] rounded-xl px-4 py-3 shadow-[0_4px_16px_rgba(89,11,32,0.03)] hover:border-[#AC9062] focus-within:border-[#590B20] focus-within:ring-1 focus-within:ring-[#590B20] transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#AC9062] mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about my work, skills, or experience..."
              className="w-full bg-transparent text-sm text-[#20060B] placeholder-[#68626B]/70 outline-none font-sans"
            />
            <button
              type="submit"
              className="p-1.5 text-[#590B20] hover:text-[#20060B] transition-colors rounded focus:outline-none"
              aria-label="Send query to AI Assistant"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Helper Text */}
          <div className="mt-2 text-xs text-[#68626B] font-sans">
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

      {/* Bottom spacer on desktop to balance composition */}
      <div className="hidden lg:block pt-6" />
    </div>
  );
}
