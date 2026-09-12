"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Save, 
  Plus, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Layers, 
  Trophy, 
  Wrench, 
  ArrowLeft,
  AlertTriangle
} from "lucide-react";
import Monogram from "@/components/ui/Monogram";

const AUTHORIZED_OWNER_EMAIL = "varunparlapalli2008@gmail.com";

export default function StudioPage() {
  const [authEmail, setAuthEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [content, setContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "achievements" | "skills" | "learning">("projects");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleLogin = (emailAttempt: string) => {
    setAuthError("");
    const cleanEmail = emailAttempt.trim().toLowerCase();

    if (cleanEmail !== AUTHORIZED_OWNER_EMAIL) {
      setAuthError(`Access Denied. The account "${cleanEmail}" is not authorized. Access is strictly granted to the portfolio owner (${AUTHORIZED_OWNER_EMAIL}).`);
      setIsAuthenticated(false);
      return;
    }

    setAuthEmail(cleanEmail);
    setIsAuthenticated(true);
    fetchStudioData(cleanEmail);
  };

  const fetchStudioData = async (email: string) => {
    try {
      const res = await fetch("/api/studio", {
        headers: { "x-owner-auth-email": email }
      });
      if (res.ok) {
        const data = await res.json();
        setContent(data);
      } else {
        setAuthError("Failed to fetch studio content records.");
      }
    } catch {
      setAuthError("Network error while accessing studio.");
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setSaveStatus("saving");

    try {
      const res = await fetch("/api/studio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-owner-auth-email": authEmail
        },
        body: JSON.stringify(content)
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSaveStatus("saved");
        setStatusMessage("Changes published successfully across the site and AI assistant.");
        setTimeout(() => setSaveStatus("idle"), 3500);
      } else {
        setSaveStatus("error");
        setStatusMessage(result.error || "Failed to save updates.");
      }
    } catch {
      setSaveStatus("error");
      setStatusMessage("Error communicating with publishing pipeline.");
    }
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center p-6 selection:bg-[#590B20] selection:text-white">
        <div className="max-w-md w-full bg-white rounded-2xl border border-[#D9CCB8] p-8 shadow-[0_16px_40px_rgba(89,11,32,0.06)] font-sans">
          <div className="flex items-center gap-3 mb-6">
            <Monogram className="w-10 h-11" />
            <div>
              <h1 className="font-display text-xl text-[#20060B]">Royal Atelier Studio</h1>
              <span className="text-xs text-[#68626B]">Authorized Content Management</span>
            </div>
          </div>

          <div className="p-4 bg-[#FAF8F3] rounded-xl border border-[#D9CCB8] mb-6 text-xs text-[#68626B] leading-relaxed">
            <div className="flex items-center gap-1.5 text-[#590B20] font-semibold mb-1">
              <ShieldAlert className="w-4 h-4 text-[#AC9062]" />
              <span>Owner Authentication Gate</span>
            </div>
            Access is restricted to the authorized owner account (<span className="text-[#20060B] font-medium">{AUTHORIZED_OWNER_EMAIL}</span>). Unrelated accounts and anonymous visitors have zero write capability.
          </div>

          {authError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 mb-6 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => handleLogin(AUTHORIZED_OWNER_EMAIL)}
              className="w-full py-3 px-4 rounded-xl bg-[#590B20] text-white text-xs font-semibold hover:bg-[#430717] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#AC9062]" />
              <span>Sign In as {AUTHORIZED_OWNER_EMAIL}</span>
            </button>

            <button
              onClick={() => handleLogin("unrelated.visitor@example.com")}
              className="w-full py-2.5 px-4 rounded-xl bg-transparent border border-[#D9CCB8] text-xs text-[#68626B] hover:text-[#20060B] hover:border-[#AC9062] transition-colors cursor-pointer"
            >
              Simulate Sign-in with Unrelated Account
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8DFD1] text-center">
            <Link href="/" className="text-xs text-[#590B20] hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center p-6 text-sm text-[#68626B]">
        Loading portfolio content store...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex flex-col font-sans selection:bg-[#590B20] selection:text-white">
      {/* Studio Header */}
      <header className="w-full border-b border-[#D9CCB8] bg-white sticky top-0 z-30 px-6 lg:px-12 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Monogram className="w-8 h-9" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg text-[#20060B] font-medium">Royal Atelier Studio</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-[#590B20]/10 text-[#590B20] font-semibold">
                Owner Mode
              </span>
            </div>
            <span className="text-[11px] text-[#68626B]">{authEmail}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#D9CCB8] text-xs text-[#68626B] hover:text-[#20060B] hover:border-[#AC9062] transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
          </Link>

          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#590B20] text-white text-xs font-semibold hover:bg-[#430717] disabled:opacity-50 transition-all cursor-pointer shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saveStatus === "saving" ? "Publishing..." : "Publish Updates"}</span>
          </button>
        </div>
      </header>

      {/* Save Status Banner */}
      {saveStatus === "saved" && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-800 flex items-center justify-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {saveStatus === "error" && (
        <div className="bg-red-50 border-b border-red-200 px-6 py-2.5 text-xs text-red-800 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-[#D9CCB8] bg-[#FAF8F3] px-6 lg:px-12 flex gap-6 overflow-x-auto text-xs font-medium">
        {[
          { id: "projects", label: "Projects", icon: Layers },
          { id: "achievements", label: "Achievements & Credentials", icon: Trophy },
          { id: "skills", label: "Skills", icon: Wrench },
          { id: "learning", label: "Currently Learning", icon: Plus },
          { id: "profile", label: "Profile & Identity", icon: ShieldCheck }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-[#590B20] text-[#590B20] font-semibold"
                  : "border-transparent text-[#68626B] hover:text-[#20060B]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Studio Content Area */}
      <main className="flex-1 max-w-[1400px] mx-auto w-full p-6 lg:p-12">
        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl text-[#20060B]">Manage Projects</h2>
                <p className="text-xs text-[#68626B]">
                  Edit project narratives, manage Draft/Published visibility, and update case studies.
                </p>
              </div>
              <button
                onClick={() => {
                  const newProj = {
                    id: `proj-${Date.now()}`,
                    slug: `new-project-${Date.now().toString().slice(-4)}`,
                    title: "New Project Prototype",
                    tagline: "Brief description of the digital product.",
                    category: "Frontend & UI/UX",
                    role: "Frontend Developer",
                    contribution: "Led design and frontend implementation.",
                    featured: true,
                    status: "In Development",
                    technologies: ["React", "TypeScript", "Tailwind CSS"],
                    overview: "Project overview and objectives.",
                    problem: "Specific problem addressed.",
                    intendedUsers: ["Target Audience"],
                    teamContext: "Independent development.",
                    featuresBuilt: ["Initial responsive interface prototype"],
                    challenges: ["Balancing performance with visual polish"],
                    lessons: ["Direct user testing is essential"],
                    limitations: ["Prototype stage"],
                    liveUrl: "",
                    repoUrl: "",
                    published: false,
                    order: content.projects.length + 1
                  };
                  setContent({ ...content, projects: [...content.projects, newProj] });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#590B20] text-white text-xs font-medium hover:bg-[#430717] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project Draft</span>
              </button>
            </div>

            <div className="space-y-4">
              {content.projects.map((proj: any, index: number) => (
                <div
                  key={proj.id}
                  className="p-6 bg-white rounded-xl border border-[#D9CCB8] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DFD1]">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg text-[#20060B] font-medium">
                        {proj.title}
                      </span>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                          proj.published
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {proj.published ? "Published" : "Draft (Hidden from Public & AI)"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = content.projects.map((p: any) =>
                            p.id === proj.id ? { ...p, published: !p.published } : p
                          );
                          setContent({ ...content, projects: updated });
                        }}
                        className="px-3 py-1.5 rounded text-xs border border-[#D9CCB8] text-[#20060B] hover:bg-[#FAF8F3] cursor-pointer"
                      >
                        {proj.published ? "Unpublish to Draft" : "Publish to Site"}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                            setContent({
                              ...content,
                              projects: content.projects.filter((p: any) => p.id !== proj.id)
                            });
                          }
                        }}
                        className="p-1.5 text-red-600 hover:text-red-800 rounded cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[#68626B] mb-1 font-medium">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = content.projects.map((p: any) =>
                            p.id === proj.id ? { ...p, title: e.target.value } : p
                          );
                          setContent({ ...content, projects: updated });
                        }}
                        className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-2 text-[#20060B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#68626B] mb-1 font-medium">URL Slug</label>
                      <input
                        type="text"
                        value={proj.slug}
                        onChange={(e) => {
                          const updated = content.projects.map((p: any) =>
                            p.id === proj.id ? { ...p, slug: e.target.value } : p
                          );
                          setContent({ ...content, projects: updated });
                        }}
                        className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-2 text-[#20060B]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[#68626B] mb-1 font-medium">Tagline / Summary</label>
                      <input
                        type="text"
                        value={proj.tagline}
                        onChange={(e) => {
                          const updated = content.projects.map((p: any) =>
                            p.id === proj.id ? { ...p, tagline: e.target.value } : p
                          );
                          setContent({ ...content, projects: updated });
                        }}
                        className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-2 text-[#20060B]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[#68626B] mb-1 font-medium">Personal Contribution</label>
                      <textarea
                        rows={2}
                        value={proj.contribution}
                        onChange={(e) => {
                          const updated = content.projects.map((p: any) =>
                            p.id === proj.id ? { ...p, contribution: e.target.value } : p
                          );
                          setContent({ ...content, projects: updated });
                        }}
                        className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-2 text-[#20060B] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#68626B] mb-1 font-medium">Live Demo URL</label>
                      <input
                        type="url"
                        placeholder="https://example.vercel.app/"
                        value={proj.liveUrl || ""}
                        onChange={(e) => {
                          const updated = content.projects.map((p: any) =>
                            p.id === proj.id ? { ...p, liveUrl: e.target.value } : p
                          );
                          setContent({ ...content, projects: updated });
                        }}
                        className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-2 text-[#20060B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#68626B] mb-1 font-medium">GitHub Repository URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/username/repo"
                        value={proj.repoUrl || ""}
                        onChange={(e) => {
                          const updated = content.projects.map((p: any) =>
                            p.id === proj.id ? { ...p, repoUrl: e.target.value } : p
                          );
                          setContent({ ...content, projects: updated });
                        }}
                        className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-2 text-[#20060B]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACHIEVEMENTS & CREDENTIALS TAB */}
        {activeTab === "achievements" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9CCB8]">
              <div>
                <h2 className="font-display text-2xl text-[#20060B]">Achievements &amp; Published Credentials</h2>
                <p className="text-xs text-[#68626B]">
                  Manage competitive hackathons, certificates of completion, course modules, learning journeys, and private draft credentials.
                </p>
              </div>
            </div>

            {/* 1. Hackathons & Competitions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#AC9062]" />
                <h3 className="font-display text-lg text-[#20060B]">Competitive Hackathons</h3>
              </div>

              <div className="space-y-4">
                {content.achievements?.map((ach: any) => (
                  <div key={ach.id} className="p-6 bg-white rounded-xl border border-[#D9CCB8] shadow-xs space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD1]">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-base text-[#20060B]">{ach.event}</span>
                        <span className="text-xs text-[#590B20] font-medium">— {ach.result}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = content.achievements.map((a: any) =>
                            a.id === ach.id ? { ...a, published: !a.published } : a
                          );
                          setContent({ ...content, achievements: updated });
                        }}
                        className={`text-xs px-2.5 py-1 rounded border cursor-pointer ${
                          ach.published
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {ach.published ? "Published" : "Draft"}
                      </button>
                    </div>
                    <p className="text-xs text-[#68626B]">{ach.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Credentials & Certificates (with Private Drafts) */}
            <div className="space-y-4 pt-4 border-t border-[#D9CCB8]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#AC9062]" />
                  <h3 className="font-display text-lg text-[#20060B]">Credentials &amp; Certificates Directory</h3>
                </div>
                <span className="text-xs font-mono text-[#68626B]">
                  Total: {content.credentials?.length || 0} ({content.credentials?.filter((c: any) => !c.published).length || 0} Private Drafts)
                </span>
              </div>

              <div className="space-y-4">
                {content.credentials?.map((cred: any) => (
                  <div key={cred.id} className="p-6 bg-white rounded-xl border border-[#D9CCB8] shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD1]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-base text-[#20060B]">{cred.title}</span>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#FAF8F3] text-[#590B20] border border-[#D9CCB8]">
                            {cred.type}
                          </span>
                        </div>
                        <span className="text-xs text-[#68626B]">
                          Issuer: {cred.issuer} {cred.date ? `· ${cred.date}` : ""} {cred.credentialId ? `· ID: ${cred.credentialId}` : ""}
                        </span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          const updated = content.credentials.map((c: any) =>
                            c.id === cred.id ? { ...c, published: !c.published } : c
                          );
                          setContent({ ...content, credentials: updated });
                        }}
                        className={`text-xs px-2.5 py-1 rounded border cursor-pointer font-medium ${
                          cred.published
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        {cred.published ? "Published (Visible)" : "Private Draft (Hidden)"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-[#68626B] mb-1 font-medium">Credential Title</label>
                        <input
                          type="text"
                          value={cred.title || ""}
                          onChange={(e) => {
                            const updated = content.credentials.map((c: any) =>
                              c.id === cred.id ? { ...c, title: e.target.value } : c
                            );
                            setContent({ ...content, credentials: updated });
                          }}
                          className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-1.5 text-[#20060B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#68626B] mb-1 font-medium">Issuer Organisation</label>
                        <input
                          type="text"
                          value={cred.issuer || ""}
                          onChange={(e) => {
                            const updated = content.credentials.map((c: any) =>
                              c.id === cred.id ? { ...c, issuer: e.target.value } : c
                            );
                            setContent({ ...content, credentials: updated });
                          }}
                          className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-1.5 text-[#20060B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#68626B] mb-1 font-medium">Completion Date</label>
                        <input
                          type="text"
                          placeholder="e.g. August 2, 2025 (leave blank if unavailable)"
                          value={cred.date || ""}
                          onChange={(e) => {
                            const updated = content.credentials.map((c: any) =>
                              c.id === cred.id ? { ...c, date: e.target.value } : c
                            );
                            setContent({ ...content, credentials: updated });
                          }}
                          className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-1.5 text-[#20060B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#68626B] mb-1 font-medium">Credential ID / UID</label>
                        <input
                          type="text"
                          placeholder="e.g. 2ff35d08"
                          value={cred.credentialId || ""}
                          onChange={(e) => {
                            const updated = content.credentials.map((c: any) =>
                              c.id === cred.id ? { ...c, credentialId: e.target.value } : c
                            );
                            setContent({ ...content, credentials: updated });
                          }}
                          className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-1.5 text-[#20060B]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[#68626B] mb-1 font-medium">Learning Summary</label>
                        <textarea
                          rows={2}
                          value={cred.summary || ""}
                          onChange={(e) => {
                            const updated = content.credentials.map((c: any) =>
                              c.id === cred.id ? { ...c, summary: e.target.value } : c
                            );
                            setContent({ ...content, credentials: updated });
                          }}
                          className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-1.5 text-[#20060B] resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[#68626B] mb-1 font-medium">Exact Verification Link</label>
                        <input
                          type="url"
                          placeholder="Exact individual verification URL only"
                          value={cred.verificationUrl || ""}
                          onChange={(e) => {
                            const updated = content.credentials.map((c: any) =>
                              c.id === cred.id ? { ...c, verificationUrl: e.target.value } : c
                            );
                            setContent({ ...content, credentials: updated });
                          }}
                          className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-1.5 text-[#20060B]"
                        />
                      </div>

                      <div>
                        <label className="block text-[#68626B] mb-1 font-medium">LinkedIn Post Link</label>
                        <input
                          type="url"
                          placeholder="Exact post URL only"
                          value={cred.linkedInPostUrl || ""}
                          onChange={(e) => {
                            const updated = content.credentials.map((c: any) =>
                              c.id === cred.id ? { ...c, linkedInPostUrl: e.target.value } : c
                            );
                            setContent({ ...content, credentials: updated });
                          }}
                          className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-1.5 text-[#20060B]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-[#20060B]">Technical Competencies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {content.skills.map((skill: any) => (
                <div key={skill.id} className="p-4 bg-white rounded-xl border border-[#D9CCB8]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-semibold text-[#AC9062]">{skill.category}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F3] text-[#20060B] border border-[#D9CCB8]">
                      {skill.proficiency}
                    </span>
                  </div>
                  <h4 className="font-medium text-sm text-[#20060B]">{skill.name}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEARNING TAB */}
        {activeTab === "learning" && (
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-[#20060B]">Active Learning Curriculum</h2>
            <div className="space-y-3">
              {content.currentlyLearning.map((item: any) => (
                <div key={item.id} className="p-4 bg-white rounded-xl border border-[#D9CCB8]">
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="font-semibold text-[#590B20]">{item.area}</span>
                    <span className="text-[#68626B]">{item.dated}</span>
                  </div>
                  <h4 className="font-display text-base text-[#20060B]">{item.topic}</h4>
                  <p className="text-xs text-[#68626B] mt-1">{item.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="p-8 bg-white rounded-xl border border-[#D9CCB8] space-y-6 max-w-2xl">
            <h2 className="font-display text-2xl text-[#20060B]">Profile Identity &amp; Roles</h2>
            
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#68626B] mb-1 font-medium">Display Name</label>
                <input
                  type="text"
                  value={content.profile.name}
                  onChange={(e) => setContent({ ...content, profile: { ...content.profile, name: e.target.value } })}
                  className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-2 text-[#20060B]"
                />
              </div>

              <div>
                <label className="block text-[#68626B] mb-1 font-medium">Primary Role</label>
                <input
                  type="text"
                  value={content.profile.primaryRole}
                  onChange={(e) => setContent({ ...content, profile: { ...content.profile, primaryRole: e.target.value } })}
                  className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-2 text-[#20060B]"
                />
              </div>

              <div>
                <label className="block text-[#68626B] mb-1 font-medium">Supporting Role</label>
                <input
                  type="text"
                  value={content.profile.supportingRole}
                  onChange={(e) => setContent({ ...content, profile: { ...content.profile, supportingRole: e.target.value } })}
                  className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-2 text-[#20060B]"
                />
              </div>

              <div>
                <label className="block text-[#68626B] mb-1 font-medium">Introduction Copy</label>
                <textarea
                  rows={3}
                  value={content.profile.introduction}
                  onChange={(e) => setContent({ ...content, profile: { ...content.profile, introduction: e.target.value } })}
                  className="w-full bg-[#FAF8F3] border border-[#D9CCB8] rounded px-3 py-2 text-[#20060B] resize-none"
                />
              </div>

              <div className="p-4 bg-[#FAF8F3] rounded-lg border border-[#D9CCB8]">
                <span className="font-semibold text-[#590B20] block mb-1">Résumé Download Visibility</span>
                <p className="text-[#68626B] mb-3">
                  Status: {content.profile.contact.hasResume ? "Enabled" : "Disabled (Hidden until authentic résumé is uploaded)"}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setContent({
                      ...content,
                      profile: {
                        ...content.profile,
                        contact: {
                          ...content.profile.contact,
                          hasResume: !content.profile.contact.hasResume
                        }
                      }
                    })
                  }
                  className="px-3 py-1.5 rounded bg-white border border-[#D9CCB8] text-xs font-medium text-[#20060B] hover:bg-[#F7F4EE] cursor-pointer"
                >
                  Toggle Résumé Button Visibility
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
