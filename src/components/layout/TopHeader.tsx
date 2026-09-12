"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Monogram from "../ui/Monogram";
import { Menu, X, Sparkles, ArrowUpRight } from "lucide-react";
import { useAssistant } from "../ai/AssistantContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FOCUS_RING } from "@/lib/motion";

export default function TopHeader() {
  const { openAssistant } = useAssistant();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { label: "Home", href: "/#top", id: "top" },
    { label: "Projects", href: "/#projects", id: "projects" },
    { label: "Experience", href: "/#experience", id: "experience" },
    { label: "Achievements", href: "/#achievements", id: "achievements" },
    { label: "Contact", href: "/#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Reading progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // Scroll-spy active section detection
      const sectionIds = ["top", "projects", "about", "experience", "skills", "achievements", "contact"];
      const scrollPosition = scrollY + 140;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id === "about" || id === "skills" ? "projects" : id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#F7F4EE]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(89,11,32,0.03)] border-b border-[#D9CCB8]"
          : "bg-[#F7F4EE] border-b border-[#D9CCB8]/80"
      }`}
    >
      {/* Restrained reading progress line at the very top */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-[#AC9062] transition-all duration-150 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 h-[72px] flex items-center justify-between">
        {/* Left: PV Monogram & Compact Branding */}
        <Link
          href="/#top"
          className={`group flex items-center gap-2.5 sm:gap-3.5 rounded-lg py-1 ${FOCUS_RING}`}
          aria-label="Parlapalli Varun — Return to top"
        >
          <Monogram className="w-8 h-9 sm:w-9 sm:h-10 transition-transform duration-300 group-hover:scale-105 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-[#20060B] uppercase leading-tight group-hover:text-[#590B20] transition-colors">
              Parlapalli Varun
            </span>
            <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.18em] sm:tracking-[0.24em] text-[#AC9062] uppercase leading-tight mt-0.5">
              Royal Technology Atelier
            </span>
          </div>
        </Link>

        {/* Right: Desktop Navigation Links with Active Indicator */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs tracking-[0.08em] uppercase" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`relative py-2 transition-colors duration-200 ${FOCUS_RING} ${
                  isActive ? "text-[#590B20] font-semibold" : "text-[#68626B] hover:text-[#20060B]"
                }`}
              >
                <span>{link.label}</span>
                {/* Active animated underline */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#590B20] rounded-full"
                    transition={{
                      duration: shouldReduceMotion ? 0.05 : 0.25,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}

          {/* Compact AI Launcher Button in Header */}
          <button
            onClick={() => openAssistant()}
            className={`group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#590B20]/40 text-[#590B20] hover:bg-[#590B20] hover:text-white active:scale-95 transition-all duration-200 text-xs font-medium cursor-pointer shadow-xs ${FOCUS_RING}`}
            aria-label="Ask Varun's AI assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#AC9062] group-hover:text-white transition-colors duration-200 group-hover:rotate-12" />
            <span>Ask AI</span>
          </button>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => openAssistant()}
            className={`p-2 text-[#590B20] hover:bg-[#590B20]/10 rounded-lg active:scale-95 transition-all ${FOCUS_RING}`}
            aria-label="Open AI Assistant"
          >
            <Sparkles className="w-5 h-5 text-[#AC9062]" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 text-[#20060B] hover:text-[#590B20] hover:bg-[#20060B]/5 rounded-lg active:scale-95 transition-all ${FOCUS_RING}`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.05 : 0.22,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="md:hidden border-t border-[#D9CCB8] bg-[#F7F4EE] px-6 py-6 shadow-xl overflow-hidden"
          >
            <nav className="flex flex-col space-y-4 font-sans text-sm tracking-wider uppercase font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 transition-colors ${FOCUS_RING} ${
                    activeSection === link.id ? "text-[#590B20] font-bold" : "text-[#68626B] hover:text-[#20060B]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#D9CCB8]/70 flex flex-col gap-3">
                <Link
                  href="/projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-between text-xs text-[#AC9062] hover:text-[#590B20] font-medium py-1"
                >
                  <span>Full Project Archive</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/achievements"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-between text-xs text-[#AC9062] hover:text-[#590B20] font-medium py-1"
                >
                  <span>Achievements &amp; Credentials</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
