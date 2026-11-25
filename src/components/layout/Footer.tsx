import React from "react";
import Link from "next/link";
import Monogram from "../ui/Monogram";
import { ReplayIntroButton } from "../intro/CinematicIntro";
import { Reveal } from "@/components/ui/Reveal";

export default function Footer({ showIntroReplay = false }: { showIntroReplay?: boolean }) {
  return (
    <footer className="w-full bg-[#F7F4EE] border-t border-[#D9CCB8] py-12 px-6 lg:px-16 text-[#68626B] font-sans">
      <Reveal variant="up" className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="group flex items-center gap-4">
          <Monogram className="w-8 h-9 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-3" />
          <div className="text-xs">
            <span className="font-semibold text-[#20060B]">Parlapalli Varun</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs text-[#68626B]">
          {showIntroReplay && <ReplayIntroButton />}
          <Link href="/#top" className="link-sweep hover:text-[#590B20] transition-colors">
            Top
          </Link>
          <Link href="/projects" className="link-sweep hover:text-[#590B20] transition-colors">
            Projects
          </Link>
          <Link href="/achievements" className="link-sweep hover:text-[#590B20] transition-colors">
            Achievements
          </Link>
          <a
            href="https://github.com/varunparlapalli2008"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep hover:text-[#590B20] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/varun-parlapalli/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep hover:text-[#590B20] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </Reveal>
    </footer>
  );
}
