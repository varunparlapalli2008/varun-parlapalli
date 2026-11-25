import React from "react";
import Link from "next/link";
import { Home, Compass } from "lucide-react";
import Monogram from "@/components/ui/Monogram";
import { Reveal } from "@/components/ui/Reveal";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col items-center justify-center p-6 text-center selection:bg-[#590B20] selection:text-white paper-grain">
      <Reveal variant="scale" className="max-w-md w-full bg-white rounded-2xl border border-[#D9CCB8] p-10 shadow-[0_16px_40px_rgba(89,11,32,0.06)]">
        <div className="flex justify-center mb-6">
          <Monogram className="w-12 h-14 float-slow" />
        </div>

        <span className="text-[11px] font-sans tracking-[0.24em] uppercase font-semibold text-[#AC9062] block mb-2">
          ERROR 404 · RECORD NOT LOCATED
        </span>

        <h1 className="font-display text-4xl text-[#20060B] font-normal mb-3">
          Page Beyond Archive
        </h1>

        <p className="text-sm text-[#68626B] font-editorial leading-relaxed mb-8">
          The requested route or case study does not exist within Varun&apos;s published portfolio catalog.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="group sheen w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#590B20] text-white text-xs font-sans font-medium hover:bg-[#430717] hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(89,11,32,0.22)] active:translate-y-0 transition-all duration-300"
          >
            <Home className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>Return to Portfolio</span>
          </Link>

          <Link
            href="/projects"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#D9CCB8] text-[#20060B] text-xs font-sans font-medium hover:border-[#AC9062] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            <Compass className="w-3.5 h-3.5 transition-transform duration-700 ease-out group-hover:rotate-45" />
            <span>View All Projects</span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
