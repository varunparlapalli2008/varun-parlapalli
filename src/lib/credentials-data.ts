export type LedgerCategory = 
  | "certification" 
  | "badge" 
  | "hackathon" 
  | "internship" 
  | "training" 
  | "recognition";

export interface LedgerRecord {
  id: string;
  type: LedgerCategory;
  categoryLabel: string;
  title: string;
  issuer: string;
  issuedDate: string;
  year: string;
  description: string;
  skills: string[];
  achievement?: string;
  projectName?: string;
  credentialId?: string;
  credentialUrl?: string;
  proofUrl?: string;
  linkedInPostUrl?: string;
  certificateAsset?: string;
  verified: boolean;
  todoNotes?: string;
}

export const VERIFIED_LEDGER_RECORDS: LedgerRecord[] = [
  {
    id: "rec-ibm-python",
    type: "certification",
    categoryLabel: "CERTIFICATION",
    title: "Python for Applied Development & Data Processing",
    issuer: "IBM",
    issuedDate: "2025",
    year: "2025",
    description: "Validates core Python proficiency, structured data parsing, algorithmic problem solving, and backend API integration practices.",
    skills: ["Python", "Data Structures", "OOP Concepts", "API Integration"],
    credentialId: undefined,
    credentialUrl: undefined,
    linkedInPostUrl: undefined,
    verified: false,
    todoNotes: "Awaiting exact credential ID and certificate verification link from IBM/Credly."
  },
  {
    id: "rec-google-cloud",
    type: "badge",
    categoryLabel: "DIGITAL BADGE",
    title: "Google Cloud Computing Foundations Badge",
    issuer: "Google Cloud Skills Boost",
    issuedDate: "2025",
    year: "2025",
    description: "Earned interactive digital badges validating foundational cloud computing, application deployment principles, and modern AI/LLM tooling on Google Cloud infrastructure.",
    skills: ["Cloud Computing", "Google Cloud", "AI Concepts", "Application Architecture"],
    credentialId: undefined,
    credentialUrl: undefined,
    linkedInPostUrl: undefined,
    verified: false,
    todoNotes: "Awaiting Google Cloud Skills Boost public profile badge URL."
  },
  {
    id: "rec-windows-pi",
    type: "certification",
    categoryLabel: "CERTIFICATION",
    title: "Windows Professional Interface & System Foundations",
    issuer: "Microsoft / Windows Partner Network",
    issuedDate: "2025",
    year: "2025",
    description: "Certifies understanding of modern Windows system architectures, administrative utilities, enterprise interface conventions, and baseline security controls.",
    skills: ["System Administration", "Windows Ecosystem", "Security Controls", "OS Architecture"],
    credentialId: undefined,
    credentialUrl: undefined,
    linkedInPostUrl: undefined,
    verified: false,
    todoNotes: "Awaiting exact Windows PI certificate reference number and verification URL."
  },
  {
    id: "rec-bytexl-hackathon",
    type: "hackathon",
    categoryLabel: "HACKATHON",
    title: "ByteXL Competitive Technical Hackathon",
    issuer: "ByteXL",
    issuedDate: "2025",
    year: "2025",
    achievement: "Top 30 Finalist (out of ~180)",
    projectName: "ByteXL Python Algorithmic & Chatbot Prototype",
    description: "Competed individually in an intensive technical hackathon, finishing among the Top 30 finalists out of approximately 180 engineering participants. Developed rapid algorithmic logic, data processing routines, and responsive prototyping under timed sprint conditions.",
    skills: ["Python", "Algorithms", "Problem Solving", "Rapid Prototyping"],
    credentialId: undefined,
    proofUrl: undefined,
    linkedInPostUrl: undefined,
    verified: false,
    todoNotes: "Awaiting certificate / rank verification URL or LinkedIn post link from ByteXL."
  },
  {
    id: "rec-codebegin-hackathon",
    type: "hackathon",
    categoryLabel: "HACKATHON",
    title: "CodeBegin / CodeBegun Vibe Coding Challenge",
    issuer: "CodeBegin / CodeBegun",
    issuedDate: "2025",
    year: "2025",
    achievement: "4th Place (Team Finalist)",
    projectName: "Passing of Digital Legacy",
    description: "Collaborated in a high-velocity team sprint to build the 'Passing of Digital Legacy' web platform. Engineered core UI workflows, responsive component architecture, and rapid feature handoffs under tight deadlines, securing fourth place overall.",
    skills: ["Full-Stack Architecture", "Team Sprint Collaboration", "Interface Design", "System Delivery"],
    credentialId: undefined,
    proofUrl: undefined,
    linkedInPostUrl: undefined,
    verified: false,
    todoNotes: "Awaiting team certificate link or event LinkedIn post URL."
  },
  {
    id: "rec-codexa-internship",
    type: "internship",
    categoryLabel: "INTERNSHIP",
    title: "Agency Operations & Digital Product Delivery Internship",
    issuer: "CodeXa Agency",
    issuedDate: "2025 – Present",
    year: "2025",
    achievement: "Executive Leadership Internship",
    description: "Hands-on operational leadership coordinating agency workflows, intern team monitoring, project milestone delivery, and client communication protocols.",
    skills: ["Operations Coordination", "Project Delivery", "Team Management", "Workflow Governance"],
    credentialId: undefined,
    credentialUrl: undefined,
    linkedInPostUrl: undefined,
    verified: false,
    todoNotes: "Awaiting internal certificate reference or executive verification document."
  },
  {
    id: "rec-cybersecurity-defense",
    type: "training",
    categoryLabel: "TRAINING",
    title: "Cybersecurity Foundations & Web Defense Learning Journey",
    issuer: "Academic & Professional Self-Paced Curriculum",
    issuedDate: "2025",
    year: "2025",
    description: "Structured academic curriculum and practical laboratory exercises covering network defense principles, OWASP Top 10 vulnerabilities, and secure system architecture.",
    skills: ["Cybersecurity", "OWASP Top 10", "Threat Modeling", "Web Defense"],
    credentialId: undefined,
    credentialUrl: undefined,
    linkedInPostUrl: undefined,
    verified: false
  },
  {
    id: "rec-frontend-architecture",
    type: "training",
    categoryLabel: "TRAINING",
    title: "Advanced Responsive Frontend & Modern React Architecture",
    issuer: "Practical Engineering Projects",
    issuedDate: "2025",
    year: "2025",
    description: "Rigorous milestone-based module validating mastery of responsive layouts, performance optimization, design token systems, and accessible component architectures.",
    skills: ["React.js", "Responsive Design", "Accessibility", "Tailwind CSS"],
    credentialId: undefined,
    credentialUrl: undefined,
    linkedInPostUrl: undefined,
    verified: false
  },
  {
    id: "rec-bytexl-chatbot",
    type: "recognition",
    categoryLabel: "RECOGNITION",
    title: "ByteXL Python Chatbot & AI Exploration",
    issuer: "ByteXL Engineering Sprints",
    issuedDate: "2025",
    year: "2025",
    achievement: "Technical Project Distinction",
    projectName: "Python Chatbot Solution",
    description: "Recognized for designing a modular Python conversational assistant prototype focusing on deterministic intent routing, clean CLI/API interaction, and prompt logic during technical evaluation.",
    skills: ["Python", "Chatbot Architecture", "Intent Handling", "API Integration"],
    credentialId: undefined,
    proofUrl: undefined,
    linkedInPostUrl: undefined,
    verified: false
  },
  {
    id: "rec-google-genai",
    type: "badge",
    categoryLabel: "DIGITAL BADGE",
    title: "Google Generative AI & Prompt Architecture Exploration",
    issuer: "Google for Developers",
    issuedDate: "2025",
    year: "2025",
    description: "Completed hands-on tracks covering large language model architecture, deterministic prompt engineering, and API integration guidelines.",
    skills: ["Prompt Engineering", "LLM Foundations", "AI Integration", "API Gateways"],
    credentialId: undefined,
    credentialUrl: undefined,
    linkedInPostUrl: undefined,
    verified: false,
    todoNotes: "Awaiting Google Developer badge public share URL."
  }
];
