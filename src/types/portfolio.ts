export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Frontend & UI/UX' | 'Systems & AI' | 'Academic' | 'Full Stack';
  role: string;
  contribution: string;
  featured: boolean;
  status: 'Active' | 'Concept' | 'In Development' | 'Completed';
  technologies: string[];
  overview: string;
  problem: string;
  intendedUsers: string[];
  teamContext: string;
  featuresBuilt: string[];
  authenticPreviewUrl?: string;
  previewType: 'authentic' | 'concept';
  challenges: string[];
  lessons: string[];
  limitations: string[];
  liveUrl?: string;
  repoUrl?: string;
  published: boolean;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Development' | 'Design & Prototyping' | 'Programming Foundations' | 'Tools & Workflow';
  proficiency: 'Proficient' | 'Learning' | 'Core';
  relatedProjectSlugs: string[];
}

export interface Achievement {
  id: string;
  title: string;
  event: string;
  organizer: string;
  result: string;
  type: 'Hackathon' | 'Competition' | 'Recognition';
  teamOrIndividual: 'Team' | 'Individual';
  year: string;
  description: string;
  evidenceUrl?: string;
  verified: boolean;
  published: boolean;
  order: number;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  type: 'Learning Journey' | 'Course/Badge' | 'Learning Module' | 'Certificate of Completion' | string;
  category: 'learning-journey' | 'course-module' | 'certificate';
  date?: string;
  credentialId?: string;
  summary: string;
  certificateImage?: string;
  verificationUrl?: string;
  linkedInPostUrl?: string;
  featured: boolean;
  order: number;
  published: boolean;
  isJourney?: boolean;
  evidenceLink?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  cooDistinction: string;
  period: string;
  isCurrent: boolean;
  summary: string;
  contributions: string[];
  published: boolean;
}

export interface CurrentlyLearningItem {
  id: string;
  topic: string;
  area: string;
  dated: string;
  notes: string;
  published: boolean;
}

export interface PortfolioProfile {
  name: string;
  preferredName: string;
  location: string;
  primaryRole: string;
  supportingRole: string;
  introduction: string;
  aboutBio: string[];
  education: {
    degree: string;
    field: string;
    institution: string;
    university: string;
    period: string;
    disclaimer: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    availabilityStatus: string;
    hasResume: boolean;
  };
}
