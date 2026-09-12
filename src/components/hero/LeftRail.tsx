"use client";

import React, { useState } from "react";
import Link from "next/link";
import Monogram from "../ui/Monogram";
import { Menu, X } from "lucide-react";

interface LeftRailProps {
  activeSection?: string;
}

export default function LeftRail({ activeSection = "index" }: LeftRailProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Index", href: "/#top", id: "index" },
    { label: "Projects", href: "/#projects", id: "projects" },
    { label: "Experience", href: "/#experience", id: "experience" },
    { label: "Achievements", href: "/#achievements", id: "achievements" },
    { label: "Contact", href: "/#contact", id: "contact" }
  ];

  return (
    <>
      {/* Mobile Top Navigation Bar (replaces desktop rail on small screens) */}
      <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-[#D9CCB8] bg-[#F7F4EE]/95 backdrop-blur-sm sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-3">
          <Monogram className="w-8 h-9" />
          <div className="text-[10px] tracking-[0.2em] font-medium text-[#20060B] leading-tight uppercase font-sans">
            <div>Royal</div>
            <div className="text-[#AC9062]">Atelier</div>
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="p-2 text-[#590B20] hover:text-[#20060B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#590B20] rounded"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] bg-[#F7F4EE] z-50 p-6 flex flex-col justify-between border-b border-[#D9CCB8]">
          <nav className="flex flex-col space-y-6 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg tracking-wide uppercase font-medium transition-colors ${
                  activeSection === item.id ? "text-[#590B20] font-semibold" : "text-[#68626B] hover:text-[#20060B]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-[#AC9062] hover:text-[#590B20] font-medium pt-2 border-t border-[#D9CCB8]"
            >
              Full Project Archive →
            </Link>
          </nav>
          <div className="text-[11px] tracking-[0.25em] text-[#68626B] uppercase font-sans pb-6 space-y-1">
            <div>Ideas</div>
            <div>Code</div>
            <div>People</div>
            <div className="text-[#AC9062]">A Brighter Web</div>
          </div>
        </div>
      )}

      {/* Desktop Narrow Left Rail (~165px wide) */}
      <aside
        className="hidden lg:flex flex-col justify-between w-[165px] shrink-0 border-r border-[#D9CCB8] py-8 px-6 min-h-full"
        aria-label="Desktop primary navigation"
      >
        {/* Top: Monogram & Stacked Lockup */}
        <div className="flex flex-col items-start">
          <Link href="/" className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#590B20] rounded" aria-label="Parlapalli Varun Home">
            <Monogram className="w-12 h-14 transition-transform duration-300 group-hover:scale-105" />
          </Link>
          <div className="mt-4 text-[10px] tracking-[0.22em] text-[#20060B] leading-[1.35] uppercase font-sans font-medium">
            <div>Royal</div>
            <div>Technology</div>
            <div className="text-[#AC9062]">Atelier</div>
          </div>
        </div>

        {/* Center: Navigation Links with Vertical Hairline Rules & Dot Marker */}
        <div className="flex flex-col items-start relative my-12">
          {/* Subtle vertical hairline behind active marker */}
          <div className="absolute left-[3px] top-[-16px] bottom-[-16px] w-[1px] bg-[#D9CCB8]/70" />

          <nav className="flex flex-col space-y-5 relative z-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group flex items-center text-[13px] tracking-[0.06em] font-sans transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#590B20] ${
                    isActive ? "text-[#590B20] font-semibold" : "text-[#68626B] hover:text-[#20060B]"
                  }`}
                >
                  {/* Small burgundy active marker */}
                  {isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#590B20] mr-2.5 shrink-0" aria-hidden="true" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#AC9062]/50 mr-2.5 shrink-0 transition-colors" aria-hidden="true" />
                  )}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Text Treatment */}
        <div className="text-[10px] tracking-[0.22em] text-[#68626B] uppercase font-sans leading-relaxed space-y-0.5">
          <div>Ideas</div>
          <div>Code</div>
          <div>People</div>
          <div className="text-[#AC9062] font-medium pt-1">A Brighter Web</div>
        </div>
      </aside>
    </>
  );
}
