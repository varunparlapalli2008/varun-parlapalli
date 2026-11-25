"use client";

import React from "react";
import { Sparkles, Calendar, BookOpen } from "lucide-react";
import { CurrentlyLearningItem } from "@/types/portfolio";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

interface CurrentlyLearningProps {
  items: CurrentlyLearningItem[];
}

export default function CurrentlyLearning({ items }: CurrentlyLearningProps) {
  return (
    <section className="relative w-full py-16 px-6 lg:px-16 bg-[#F7F4EE] border-b border-[#D9CCB8]">
      <div className="max-w-[1600px] mx-auto">
        <Reveal variant="up" className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#D9CCB8]/80 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#AC9062] float-slow" />
              <span className="text-[11px] font-sans tracking-[0.24em] uppercase font-medium text-[#AC9062]">
                ACTIVE CURRICULUM
              </span>
            </div>
            <h3 className="font-display text-3xl font-normal text-[#20060B]">
              Currently Learning
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-sans text-[#68626B] tracking-wide">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#AC9062] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#AC9062]" />
            </span>
            Live technical exploration log
          </div>
        </Reveal>

        <RevealGroup stagger={0.09} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <RevealItem
              key={item.id}
              variant="blur"
              className="group p-6 bg-white rounded-xl border border-[#D9CCB8] shadow-xs flex flex-col justify-between lift"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] tracking-wider uppercase font-semibold text-[#590B20] font-sans">
                    {item.area}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#68626B] font-sans">
                    <Calendar className="w-3 h-3 text-[#AC9062]" />
                    <span>{item.dated}</span>
                  </div>
                </div>

                <h4 className="font-display text-xl text-[#20060B] font-normal mb-2 transition-colors duration-300 group-hover:text-[#590B20]">
                  {item.topic}
                </h4>

                <p className="text-xs text-[#68626B] font-editorial leading-relaxed">
                  {item.notes}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8DFD1] flex items-center gap-2 text-[11px] text-[#AC9062] font-sans">
                <BookOpen className="w-3.5 h-3.5 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:rotate-6" />
                <span>Under active study</span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
