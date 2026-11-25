import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getPublishedProjects } from "@/lib/content-store";
import { ArrowLeft, ArrowUpRight, Layers, Code, ExternalLink } from "lucide-react";
import Monogram from "@/components/ui/Monogram";
import Footer from "@/components/layout/Footer";
import { Reveal, RevealGroup, RevealItem, RevealHeading } from "@/components/ui/Reveal";

export const metadata = {
  title: "Projects & Selected Case Studies | Parlapalli Varun",
  description: "Explore selected software engineering, UI/UX design systems, and frontend architecture projects by Parlapalli Varun.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectsArchivePage() {
  const projects = await getPublishedProjects();

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col selection:bg-[#590B20] selection:text-white">
      {/* Top Header Bar */}
      <header className="w-full border-b border-[#D9CCB8] bg-[#F7F4EE]/90 backdrop-blur-sm sticky top-0 z-30 px-6 lg:px-16 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="transition-transform duration-500 ease-out hover:scale-105 hover:-rotate-3">
              <Monogram className="w-8 h-9" />
            </Link>
            <div className="text-xs tracking-wider uppercase font-sans font-medium text-[#20060B]">
              <span>Parlapalli Varun</span>
              <span className="mx-2 text-[#D9CCB8]">/</span>
              <span className="text-[#AC9062]">Project Archive</span>
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
      <main className="flex-1 max-w-[1600px] mx-auto w-full py-16 px-6 lg:px-16">
        {/* Eyebrow & Title */}
        <div className="max-w-3xl mb-12">
          <Reveal variant="fade" className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase font-medium text-[#AC9062]">
              SELECTED WORKS &amp; SYSTEMS
            </span>
            <span className="w-8 h-[1px] bg-[#AC9062] rule-draw" aria-hidden="true" />
          </Reveal>
          <RevealHeading
            as="h1"
            text="Curated Project Archive"
            className="font-display text-4xl sm:text-6xl font-normal text-[#20060B] mb-4"
          />
          <Reveal variant="up" delay={0.1}>
            <p className="text-base sm:text-lg text-[#68626B] font-editorial leading-relaxed">
              Detailed case studies across academic portals, cybersecurity telemetry interfaces, and interactive community platforms.
            </p>
          </Reveal>
        </div>

        {/* Project Grid */}
        <RevealGroup stagger={0.09} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <RevealItem
              key={project.id}
              as="article"
              variant="blur"
              className="group relative flex flex-col justify-between rounded-2xl border border-[#D9CCB8] bg-white p-7 shadow-[0_8px_30px_rgba(89,11,32,0.04)] hover:shadow-[0_22px_50px_rgba(89,11,32,0.12)] hover:border-[#AC9062] hover:-translate-y-1.5 transition-[transform,box-shadow,border-color] duration-500 ease-out"
            >
              {/* Accessible Full-Card Primary Navigation Link */}
              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#590B20] focus:ring-offset-2"
                aria-label={`Read case study: ${project.title}`}
              />

              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8DFD1] text-xs font-sans">
                  <span className="text-[#AC9062] font-medium tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#F7F4EE] text-[#590B20] border border-[#D9CCB8]/70">
                    {project.status}
                  </span>
                </div>

                <div className="relative h-48 w-full rounded-xl overflow-hidden mb-6 bg-[#FAF8F3] border border-[#E8DFD1]">
                  {project.authenticPreviewUrl ? (
                    <Image
                      src={project.authenticPreviewUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF8F3] to-[#F2EDE2]">
                      <Layers className="w-8 h-8 text-[#AC9062]/60 mb-2 transition-transform duration-500 ease-out group-hover:scale-110" />
                      <span className="text-sm font-serif font-medium text-[#20060B]">
                        {project.title}
                      </span>
                      <span className="text-[10px] text-[#68626B] font-sans mt-0.5">
                        Interface Concept
                      </span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#20060B]/70 text-white font-mono text-[10px] backdrop-blur-xs transition-all duration-300 group-hover:bg-[#590B20] group-hover:px-2.5">
                    0{idx + 1}
                  </div>

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#20060B]/25 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                <h2 className="font-display text-2xl font-normal text-[#20060B] mb-2 group-hover:text-[#590B20] transition-colors duration-300">
                  {project.title}
                </h2>
                <span
                  className="block h-[1px] w-0 bg-[#AC9062] mb-2 transition-[width] duration-500 ease-out group-hover:w-14"
                  aria-hidden="true"
                />
                <p className="text-sm text-[#68626B] font-editorial leading-relaxed mb-4">
                  {project.tagline}
                </p>

                <div className="p-3.5 bg-[#FAF8F3] rounded-lg border border-[#E8DFD1] mb-5">
                  <span className="text-[10px] uppercase font-semibold text-[#590B20] tracking-wider block mb-1">
                    Role &amp; Contribution
                  </span>
                  <p className="text-xs text-[#20060B]/85 font-sans leading-relaxed">
                    {project.contribution}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-sans px-2.5 py-1 bg-[#F7F4EE] text-[#20060B] rounded border border-[#D9CCB8]/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions & Cue */}
                <div className="space-y-3">
                  <div className="w-full inline-flex items-center justify-between p-3 rounded-lg bg-[#590B20] text-white text-xs font-sans font-medium group-hover:bg-[#430717] transition-colors pointer-events-none">
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>

                  {(project.liveUrl || project.repoUrl) && (
                    <div className="flex items-center justify-between pt-2 border-t border-[#E8DFD1] text-xs font-sans relative z-20">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#590B20] hover:text-[#20060B] font-medium transition-colors p-1"
                          aria-label={`Live demo for ${project.title}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      ) : <span />}

                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#68626B] hover:text-[#20060B] transition-colors p-1"
                          aria-label={`GitHub repository for ${project.title}`}
                        >
                          <Code className="w-3.5 h-3.5" />
                          <span>Repository</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </main>

      <Footer />
    </div>
  );
}
