import React from "react";
import Link from "next/link";
import { getPublishedAchievements, getPublishedCredentials } from "@/lib/content-store";
import { ArrowLeft } from "lucide-react";
import Monogram from "@/components/ui/Monogram";
import Footer from "@/components/layout/Footer";

import AchievementsArchiveView from "@/components/sections/AchievementsArchiveView";
import { Reveal, RevealHeading } from "@/components/ui/Reveal";

export const metadata = {
  title: "Achievements & Credentials Archive | Parlapalli Varun",
  description: "Verified hackathon placements, competitive milestones, and learning credentials achieved by Parlapalli Varun.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AchievementsArchivePage() {
  const achievements = await getPublishedAchievements();
  const credentials = await getPublishedCredentials();

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col selection:bg-[#590B20] selection:text-white">
      {/* Top Header */}
      <header className="w-full border-b border-[#D9CCB8] bg-[#F7F4EE]/90 backdrop-blur-sm sticky top-0 z-30 px-6 lg:px-16 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="transition-transform duration-500 ease-out hover:scale-105 hover:-rotate-3">
              <Monogram className="w-8 h-9" />
            </Link>
            <div className="text-xs tracking-wider uppercase font-sans font-medium text-[#20060B]">
              <span>Parlapalli Varun</span>
              <span className="mx-2 text-[#D9CCB8]">/</span>
              <span className="text-[#AC9062]">Achievements Archive</span>
            </div>
          </div>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-sans font-medium text-[#590B20] hover:text-[#20060B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="link-sweep">Return to Portfolio</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] mx-auto w-full py-16 px-6 lg:px-16">
        <div className="max-w-3xl mb-12">
          <Reveal variant="fade" className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase font-medium text-[#AC9062]">
              VALIDATED MILESTONES
            </span>
            <span className="w-8 h-[1px] bg-[#AC9062] rule-draw" aria-hidden="true" />
          </Reveal>
          <RevealHeading
            as="h1"
            text={"Achievements & Credentials"}
            className="font-display text-4xl sm:text-6xl font-normal text-[#20060B] mb-4"
          />
          <Reveal variant="up" delay={0.1}>
            <p className="text-base sm:text-lg text-[#68626B] font-editorial leading-relaxed">
              Complete verified record of competitive technical hackathons, recognized certificates of completion, foundational courses, and structured learning journeys.
            </p>
          </Reveal>
        </div>

        {/* Interactive Archive Component */}
        <AchievementsArchiveView 
          achievements={achievements} 
          credentials={credentials} 
        />
      </main>

      <Footer />
    </div>
  );
}
