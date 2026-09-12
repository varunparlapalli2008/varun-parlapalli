"use client";

import React from "react";
import { Sparkles, Calendar, BookOpen } from "lucide-react";
import { CurrentlyLearningItem } from "@/types/portfolio";

interface CurrentlyLearningProps {
  items: CurrentlyLearningItem[];
}

export default function CurrentlyLearning({ items }: CurrentlyLearningProps) {
  return (
    <section className="relative w-full py-16 px-6 lg:px-16 bg-[#F7F4EE] border-b border-[#D9CCB8]">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-[#D9CCB8]/80 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#AC9062]" />
              <span className="text-[11px] font-sans tracking-[0.24em] uppercase font-medium text-[#AC9062]">
                ACTIVE CURRICULUM
              </span>
            </div>
            <h3 className="font-display text-3xl font-normal text-[#20060B]">
              Currently Learning
            </h3>
          </div>
          <div className="text-xs font-sans text-[#68626B] tracking-wide">
            Live technical exploration log
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white rounded-xl border border-[#D9CCB8] shadow-xs flex flex-col justify-between"
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

                <h4 className="font-display text-xl text-[#20060B] font-normal mb-2">
                  {item.topic}
                </h4>

                <p className="text-xs text-[#68626B] font-editorial leading-relaxed">
                  {item.notes}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E8DFD1] flex items-center gap-2 text-[11px] text-[#AC9062] font-sans">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Under active study</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
