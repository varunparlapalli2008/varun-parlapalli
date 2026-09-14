import { 
  PortfolioProfile, 
  Project, 
  Skill, 
  Achievement, 
  Credential, 
  Experience, 
  CurrentlyLearningItem 
} from '@/types/portfolio';
import {
  INITIAL_PROFILE,
  INITIAL_PROJECTS,
  INITIAL_SKILLS,
  INITIAL_EXPERIENCE,
  INITIAL_ACHIEVEMENTS,
  INITIAL_CREDENTIALS,
  INITIAL_CURRENTLY_LEARNING
} from './initial-data';

export interface StorageData {
  profile: PortfolioProfile;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  achievements: Achievement[];
  credentials: Credential[];
  currentlyLearning: CurrentlyLearningItem[];
}

const INITIAL_DATA: StorageData = {
  profile: INITIAL_PROFILE,
  projects: INITIAL_PROJECTS,
  skills: INITIAL_SKILLS,
  experience: INITIAL_EXPERIENCE,
  achievements: INITIAL_ACHIEVEMENTS,
  credentials: INITIAL_CREDENTIALS,
  currentlyLearning: INITIAL_CURRENTLY_LEARNING
};

import { readPortfolioStorage, writePortfolioStorage, type StoragePersistenceResult } from './github-storage.server';

async function getData(): Promise<StorageData> {
  return readPortfolioStorage<StorageData>(INITIAL_DATA);
}

// =================== PUBLIC PUBLISHED APIS ===================

export async function getPublishedProfile(): Promise<PortfolioProfile> {
  const data = await getData();
  return data.profile;
}

export async function getPublishedProjects(): Promise<Project[]> {
  const data = await getData();
  return data.projects
    .filter(p => p.published)
    .sort((a, b) => a.order - b.order);
}

export async function getPublishedProjectBySlug(slug: string): Promise<Project | null> {
  const data = await getData();
  const project = data.projects.find(p => p.slug === slug && p.published);
  return project || null;
}

export async function getPublishedSkills(): Promise<Skill[]> {
  const data = await getData();
  return data.skills;
}

export async function getPublishedExperience(): Promise<Experience[]> {
  const data = await getData();
  return data.experience.filter(e => e.published);
}

export async function getPublishedAchievements(): Promise<Achievement[]> {
  const data = await getData();
  return data.achievements
    .filter(a => a.published)
    .sort((a, b) => a.order - b.order);
}

export async function getPublishedCredentials(): Promise<Credential[]> {
  const data = await getData();
  return data.credentials
    .filter(c => c.published)
    .sort((a, b) => a.order - b.order);
}

export async function getPublishedCurrentlyLearning(): Promise<CurrentlyLearningItem[]> {
  const data = await getData();
  return data.currentlyLearning.filter(l => l.published);
}

// Single combined safe published snapshot for AI grounding
export async function getPublishedGroundingSnapshot() {
  const profile = await getPublishedProfile();
  const projects = await getPublishedProjects();
  const skills = await getPublishedSkills();
  const experience = await getPublishedExperience();
  const achievements = await getPublishedAchievements();
  const credentials = await getPublishedCredentials();
  const currentlyLearning = await getPublishedCurrentlyLearning();

  return {
    candidate: {
      name: profile.name,
      location: profile.location,
      primaryRole: profile.primaryRole,
      supportingRole: profile.supportingRole,
      introduction: profile.introduction,
      aboutBio: profile.aboutBio,
      education: profile.education,
      contactChannels: {
        email: profile.contact.email,
        github: profile.contact.github,
        linkedin: profile.contact.linkedin,
        availability: profile.contact.availabilityStatus
      }
    },
    projects: projects.map(p => ({
      title: p.title,
      slug: p.slug,
      role: p.role,
      contribution: p.contribution,
      technologies: p.technologies,
      overview: p.overview,
      problem: p.problem,
      featuresBuilt: p.featuresBuilt,
      challenges: p.challenges,
      lessons: p.lessons,
      limitations: p.limitations,
      liveUrl: p.liveUrl,
      repoUrl: p.repoUrl
    })),
    skills: skills.map(s => ({
      name: s.name,
      category: s.category,
      proficiency: s.proficiency,
      relatedProjects: s.relatedProjectSlugs
    })),
    experience: experience.map(e => ({
      role: e.role,
      company: e.company,
      cooDistinction: e.cooDistinction,
      period: e.period,
      contributions: e.contributions
    })),
    achievements: achievements.map(a => ({
      title: a.title,
      event: a.event,
      organizer: a.organizer,
      result: a.result,
      teamOrIndividual: a.teamOrIndividual,
      year: a.year,
      description: a.description
    })),
    credentials: credentials.map(c => ({
      title: c.title,
      type: c.type,
      category: c.category,
      issuer: c.issuer,
      date: c.date,
      summary: c.summary,
      credentialId: c.credentialId,
      isJourney: c.isJourney
    })),
    currentlyLearning: currentlyLearning.map(l => ({
      topic: l.topic,
      area: l.area,
      dated: l.dated,
      notes: l.notes
    }))
  };
}

export async function getPublishedPortfolioKnowledge(): Promise<string> {
  const snapshot = await getPublishedGroundingSnapshot();
  const c = snapshot.candidate;

  return `
# PUBLISHED PORTFOLIO KNOWLEDGE BASE (PARLAPALLI VARUN)
Strict instruction: You are Varun's AI Portfolio Assistant. You must answer ONLY from the published records below. Never invent details, credentials, scores, or private data. If a requested detail is not in this document, state truthfully that it is not part of Varun's published portfolio records.

## 1. CANDIDATE PROFILE & BIOGRAPHY
- Name: ${c.name}
- Location: ${c.location}
- Primary Role: ${c.primaryRole}
- Supporting Role: ${c.supportingRole}
- Bio / Overview: ${c.introduction} ${c.aboutBio}
- Academic Education: ${c.education.degree} (${c.education.field}) at ${c.education.institution} (${c.education.university}), Period: ${c.education.period}. Coursework includes Software Engineering, Data Structures, Cybersecurity Fundamentals, and UI/UX Systems.
- Institutional Note: Independent student projects (such as the NEC Portal) are independent student prototypes and not official institutional endorsements.
- Approved Contact Channels:
  - Email: ${c.contactChannels.email}
  - GitHub: ${c.contactChannels.github}
  - LinkedIn: ${c.contactChannels.linkedin}
  - Availability: ${c.contactChannels.availability}
- Important Privacy Note: Phone numbers, residential addresses, private academic scores/GPAs, administrative credentials, and unpublished drafts are strictly private and not available.

## 2. LEADERSHIP & EXPERIENCE: CODEXA AGENCY
${snapshot.experience.map(e => `
- Role: ${e.role}
- Organization: ${e.company}
- Focus / Distinction: ${e.cooDistinction || "Operations & Delivery Leadership"}
- Period: ${e.period}
- Verified Responsibilities & Contributions:
${e.contributions.map((item: string) => `  * ${item}`).join('\n')}
`).join('\n')}

## 3. PUBLISHED PROJECTS & CASE STUDIES
${snapshot.projects.map(p => `
### Project: ${p.title}
- Slug: ${p.slug}
- Portfolio Case Study Link: /projects/${p.slug}
- Live Demo Link: ${p.liveUrl || "Not publicly deployed"}
- GitHub Repository Link: ${p.repoUrl || "Private repository"}
- Role: ${p.role}
- Varun's Specific Personal Contribution: ${p.contribution}
- Technologies Used: ${p.technologies.join(', ')}
- Problem Statement: ${p.problem}
- Built Features:
${p.featuresBuilt.map((f: string) => `  * ${f}`).join('\n')}
- Challenges Solved: ${p.challenges}
- Lessons Learned: ${p.lessons}
- Known Limitations / Future Scope: ${p.limitations}
`).join('\n')}

- Which project is best for a Frontend Internship?:
  The **NEC Portal** (/projects/nec-portal) is Varun's flagship frontend project demonstrating end-to-end frontend architecture: accessible data tables, responsive layouts, search & filter interactions, dark/light themes, and student services directories using React, TypeScript, and Tailwind CSS.

## 4. HACKATHONS & COMPETITIVE ACHIEVEMENTS
${snapshot.achievements.map(a => `
- ${a.title} (${a.year}):
  * Event & Organizer: ${a.event} (${a.organizer})
  * Result: ${a.result}
  * Category: ${a.teamOrIndividual === 'Individual' ? 'Individual Achievement' : 'Collaborative Team Achievement'}
  * Summary: ${a.description}
`).join('\n')}
Note on distinctions: ByteXL Hackathon was an individual top 30 placement among ~180 students; CodeBegun was a 4th-place team sprint.

## 5. PUBLISHED CREDENTIALS & CERTIFICATES (ALL 8 CONFIRMED)
${snapshot.credentials.map(cr => `
- **${cr.title}**
  * Type: ${cr.type}
  * Category: ${cr.category}
  * Issuer: ${cr.issuer}
  * Issued / Completed: ${cr.date}
  * Summary: ${cr.summary}
  * Credential ID / Verification: ${cr.credentialId || "Verified completion"}
  * Disclosure: ${cr.isJourney ? "Important Note: This is a comprehensive self-paced learning journey curriculum covering cloud security engineering, NOT an official proctored certification exam." : "Verified course completion certificate / learning module."}
`).join('\n')}

## 6. TECHNICAL SKILLS & PROFICIENCY
${snapshot.skills.map(s => `
- ${s.name} (${s.category}) — Proficiency: ${s.proficiency}. Linked projects: ${s.relatedProjects.join(', ') || 'General application'}.
`).join('\n')}

## 7. CURRENT LEARNING
${snapshot.currentlyLearning.map(l => `
- ${l.topic} (${l.area}) — Notes: ${l.notes}
`).join('\n')}
`.trim();
}


// =================== STUDIO / AUTHENTICATED MUTATIONS ===================

export async function getAllContentForStudio(): Promise<StorageData> {
  return getData();
}

export async function saveStudioContent(updatedData: StorageData): Promise<StoragePersistenceResult> {
  return writePortfolioStorage(updatedData);
}
