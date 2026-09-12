export interface ProjectEvidenceLink {
  label: string;
  url: string;
  isExternal?: boolean;
}

export interface ProjectEvidenceItem {
  name: string;
  description: string;
  links?: ProjectEvidenceLink[];
}

export interface CompetencySkill {
  id: string;
  name: string;
  classification: string;
  shortUsage: string;
  appliedIn: string;
  practicalUsage: string;
  relatedTechnologies: string[];
  areasOfImplementation: string[];
  projectEvidence?: ProjectEvidenceItem[];
  directLinks?: ProjectEvidenceLink[];
}

export interface CompetencyCategory {
  id: string;
  number: string;
  name: string;
  label: string;
  tagline: string;
  skills: CompetencySkill[];
}

export const COMPETENCY_CATEGORIES: CompetencyCategory[] = [
  {
    id: "programming-languages",
    number: "01",
    name: "Programming Languages",
    label: "01 — Programming Languages",
    tagline: "Core syntax, paradigms, and algorithmic foundations.",
    skills: [
      {
        id: "lang-typescript",
        name: "TypeScript",
        classification: "Typed Application Engineering",
        shortUsage: "Used for scalable frontend architecture, reusable components, typed application logic, API integration, and maintainable production interfaces.",
        appliedIn: "Applied in: NEC Portal, Aegis Legacy, CodeXa Apply, and portfolio projects.",
        practicalUsage: "Leveraging strict type safety, generic interfaces, union types, and robust compile-time verification to prevent runtime regressions across client applications and state machines.",
        relatedTechnologies: ["JavaScript", "React", "Next.js", "Zod", "Node.js"],
        areasOfImplementation: [
          "Scalable Frontend Architecture",
          "Type-Safe Contract Definitions",
          "Component Interface Design",
          "State & Telemetry Modeling"
        ],
        projectEvidence: [
          {
            name: "NEC Portal",
            description: "Engineered strict data models for academic schedules, examination tables, and student services.",
            links: [
              { label: "View Case Study", url: "/projects/nec-portal" },
              { label: "Live Deployment", url: "https://nec-portal-rosy.vercel.app/", isExternal: true },
              { label: "GitHub Repository", url: "https://github.com/ashuchinthapalli390-max/NEC_PORTAL", isExternal: true }
            ]
          },
          {
            name: "Aegis Legacy",
            description: "Structured telemetry types and zero-trust authentication state schemas.",
            links: [
              { label: "View Case Study", url: "/projects/aegis-legacy" },
              { label: "Live Preview", url: "https://aegis-legacy.vercel.app/", isExternal: true },
              { label: "GitHub Repository", url: "https://github.com/varunparlapalli2008/Aegis-Legacy", isExternal: true }
            ]
          }
        ]
      },
      {
        id: "lang-javascript",
        name: "Modern JavaScript (ES6+)",
        classification: "Dynamic Web Language",
        shortUsage: "Used for interactive client logic, asynchronous event processing, dynamic DOM updates, and modular application patterns.",
        appliedIn: "Applied in: NEC Portal, BookUtsav Hub, and interactive web experiences.",
        practicalUsage: "Writing idiomatic modern JavaScript utilizing Promises, async/await, closures, functional array transformations, and modular ECMAScript standards.",
        relatedTechnologies: ["HTML5", "CSS3", "Browser DOM APIs", "Node.js", "Vite"],
        areasOfImplementation: [
          "Asynchronous Data Flow",
          "Interactive Client Logic",
          "DOM Lifecycle Management",
          "Modular Code Architecture"
        ],
        projectEvidence: [
          {
            name: "BookUtsav Innovation Hub",
            description: "Engineered interactive author directory filters, workshop seat updates, and dynamic registration confirmations.",
            links: [
              { label: "View Case Study", url: "/projects/bookutsav-hub" },
              { label: "Live Platform", url: "https://bookutsav-inovationhub.vercel.app/", isExternal: true },
              { label: "GitHub Repository", url: "https://github.com/varunparlapalli2008/bookutsav-inovationhub", isExternal: true }
            ]
          }
        ]
      },
      {
        id: "lang-python",
        name: "Python",
        classification: "Algorithmic & Backend Scripting",
        shortUsage: "Used for algorithmic problem solving, automated workflows, backend services, and rapid API prototyping.",
        appliedIn: "Applied in: Technical coursework, automation scripts, and hackathon challenges.",
        practicalUsage: "Developing clean, structured Python scripts for data parsing, algorithmic solutions, and lightweight backend endpoints with clear separation of concerns.",
        relatedTechnologies: ["FastAPI", "JSON Handling", "Virtualenv", "Requests"],
        areasOfImplementation: [
          "Algorithmic Problem Solving",
          "Data Parsing & Extraction",
          "Backend Scripting",
          "Workflow Automation"
        ],
        projectEvidence: [
          {
            name: "ByteXL Competitive Hackathon",
            description: "Placed among the Top 30 finalists out of ~180 engineering participants via rapid algorithmic development.",
            links: [
              { label: "View Achievement Record", url: "/achievements" }
            ]
          }
        ]
      },
      {
        id: "lang-java",
        name: "Java & OOP",
        classification: "Object-Oriented Foundations",
        shortUsage: "Used for mastering object-oriented design paradigms, data structure implementations, and academic computing systems.",
        appliedIn: "Applied in: B.Tech in Cybersecurity engineering curriculum and academic lab modules.",
        practicalUsage: "Implementing inheritance hierarchies, encapsulation, abstraction, and memory considerations across core computing exercises.",
        relatedTechnologies: ["JVM", "OOP Principles", "Data Structures", "Java Collections"],
        areasOfImplementation: [
          "Object-Oriented System Modeling",
          "Data Structure Implementation",
          "Core Computer Science Principles"
        ]
      },
      {
        id: "lang-cpp",
        name: "C & C++",
        classification: "Systems Programming Foundations",
        shortUsage: "Used for foundational computing concepts, memory mechanics, pointer arithmetic, and algorithmic optimization.",
        appliedIn: "Applied in: Academic computer science coursework and performance analysis.",
        practicalUsage: "Building rigorous intuition for stack versus heap memory allocation, algorithmic complexity, and foundational computing fundamentals.",
        relatedTechnologies: ["Pointers & Memory Allocation", "Standard Template Library (STL)", "GCC", "Make"],
        areasOfImplementation: [
          "Memory Allocation Fundamentals",
          "Algorithmic Complexity",
          "Systems Engineering Concepts"
        ]
      },
      {
        id: "lang-sql",
        name: "SQL",
        classification: "Relational Query Language",
        shortUsage: "Used for writing structured database queries, table relationships, schemas, and relational data operations.",
        appliedIn: "Applied in: Academic database coursework and project data architecture.",
        practicalUsage: "Writing normalized database schemas, multi-table joins, subqueries, and constraints while maintaining relational integrity.",
        relatedTechnologies: ["PostgreSQL", "MySQL", "Relational Algebra", "Schema DDL"],
        areasOfImplementation: [
          "Relational Schema Design",
          "Data Normalization (3NF)",
          "Structured Retrieval Queries"
        ]
      }
    ]
  },
  {
    id: "frontend-development",
    number: "02",
    name: "Frontend Development",
    label: "02 — Frontend Development",
    tagline: "Component architecture, design systems, and responsive user interfaces.",
    skills: [
      {
        id: "fe-react-next",
        name: "React / Next.js",
        classification: "Component Architecture & Framework",
        shortUsage: "Used to build responsive interfaces, reusable UI systems, application routing, dashboards, authentication flows, and interactive web experiences.",
        appliedIn: "Applied in: CodeXa Agency, NEC Portal, Aegis Legacy, TicketX, and modern web projects.",
        practicalUsage: "Architecting modern React applications with the Next.js App Router, combining Server Components for performance with Client Components for rich interactivity, custom hooks, and layout composition.",
        relatedTechnologies: ["Next.js App Router", "React Server Components", "React Hooks", "Context API", "Suspense"],
        areasOfImplementation: [
          "Server-Driven Architecture",
          "Interactive Web Portals",
          "Custom State Hooks",
          "Telemetry & Dashboard Views"
        ],
        projectEvidence: [
          {
            name: "NEC Portal",
            description: "Crafted accessible academic examination schedules, student directories, and responsive navigation.",
            links: [
              { label: "View Case Study", url: "/projects/nec-portal" },
              { label: "Live Portal", url: "https://nec-portal-rosy.vercel.app/", isExternal: true },
              { label: "GitHub Repository", url: "https://github.com/ashuchinthapalli390-max/NEC_PORTAL", isExternal: true }
            ]
          },
          {
            name: "Aegis Legacy",
            description: "Built cybersecurity telemetry interface, threat severity cards, and high-contrast alert displays.",
            links: [
              { label: "View Case Study", url: "/projects/aegis-legacy" },
              { label: "Live Preview", url: "https://aegis-legacy.vercel.app/", isExternal: true },
              { label: "GitHub Repository", url: "https://github.com/varunparlapalli2008/Aegis-Legacy", isExternal: true }
            ]
          },
          {
            name: "CodeXa Agency",
            description: "Executive digital product delivery, agency workflows, and leadership showcase.",
            links: [
              { label: "View CodeXa Experience", url: "/#experience" }
            ]
          }
        ]
      },
      {
        id: "fe-tailwind",
        name: "Tailwind CSS",
        classification: "Utility-First Styling System",
        shortUsage: "Used for responsive layout architecture, design token enforcement, typography scales, and consistent aesthetic systems.",
        appliedIn: "Applied in: NEC Portal, Aegis Legacy, BookUtsav Hub, and portfolio experiences.",
        practicalUsage: "Composing maintainable utility classes aligned with custom palette tokens, managing dark/light surface contrast, and eliminating custom CSS bloat.",
        relatedTechnologies: ["PostCSS", "CSS Variables", "Flexbox", "CSS Grid"],
        areasOfImplementation: [
          "Design Token Mapping",
          "Mobile-First Layouts",
          "State & Interaction Variants",
          "Accessible Color Tokens"
        ],
        projectEvidence: [
          {
            name: "NEC Portal",
            description: "Designed high-contrast typographic hierarchy and responsive tables tailored for budget mobile devices.",
            links: [
              { label: "View Case Study", url: "/projects/nec-portal" }
            ]
          }
        ]
      },
      {
        id: "fe-html5",
        name: "HTML5 & Semantic Web",
        classification: "Document Standards & Semantics",
        shortUsage: "Used to establish accessible document hierarchy, semantic landmarks, SEO metadata, and progressive enhancement.",
        appliedIn: "Applied in: NEC Portal, BookUtsav Hub, and portfolio architecture.",
        practicalUsage: "Structuring web documents with meaningful semantic landmarks (<main>, <nav>, <article>, <header>) and complete OpenGraph metadata.",
        relatedTechnologies: ["Semantic Landmarks", "Open Graph Metadata", "ARIA Roles", "Microdata"],
        areasOfImplementation: [
          "Semantic Document Structure",
          "SEO Optimization",
          "Screen Reader Readability"
        ]
      },
      {
        id: "fe-responsive-layout",
        name: "Responsive Layout Architecture",
        classification: "Cross-Device Layout Engineering",
        shortUsage: "Used for fluid grid systems, mobile navigation drawers, touch-first interactions, and cross-viewport stability.",
        appliedIn: "Applied in: NEC Portal, BookUtsav Hub, and CodeXa client interfaces.",
        practicalUsage: "Engineering responsive layouts that adapt smoothly across mobile, tablet, and widescreen desktop displays without content clipping or horizontal overflow.",
        relatedTechnologies: ["CSS Grid", "Flexbox", "Media Queries", "Touch Targets", "Viewport Units"],
        areasOfImplementation: [
          "Mobile Navigation Drawers",
          "Dynamic Breakpoint Transitions",
          "Fluid Multi-Column Grids"
        ]
      },
      {
        id: "fe-uiux-figma",
        name: "UI/UX Design & Figma",
        classification: "Interface Prototyping & Design Systems",
        shortUsage: "Used for wireframing, high-fidelity clickable mockups, component variants, and precise design handoff specifications.",
        appliedIn: "Applied in: NEC Portal interface blueprints and Aegis Legacy security concept.",
        practicalUsage: "Translating complex user workflows into intuitive, high-fidelity Figma prototypes with auto-layout, atomic components, and reusable design tokens.",
        relatedTechnologies: ["Figma", "Auto-Layout", "Component Variants", "Design Tokens", "Design Handoff"],
        areasOfImplementation: [
          "User Journey Wireframing",
          "Interactive Prototypes",
          "Visual Design Systems",
          "Handoff Blueprints"
        ],
        projectEvidence: [
          {
            name: "NEC Portal Blueprints",
            description: "Created complete student journey wireframes and exam table layouts before frontend implementation.",
            links: [
              { label: "View Case Study", url: "/projects/nec-portal" }
            ]
          }
        ]
      },
      {
        id: "fe-accessibility",
        name: "Accessibility & WCAG",
        classification: "Universal Web Accessibility",
        shortUsage: "Used to guarantee compliant contrast ratios, full keyboard navigation, screen-reader support, and visible focus management.",
        appliedIn: "Applied in: NEC Portal and portfolio UI components.",
        practicalUsage: "Ensuring WCAG 2.1 AA compliance across typography contrast, interactive elements, screen reader descriptions, and respect for prefers-reduced-motion.",
        relatedTechnologies: ["WCAG 2.1 AA", "ARIA Attributes", "Visible Focus Rings", "Accessible Contrast Ratios"],
        areasOfImplementation: [
          "Keyboard Navigation & Tab Order",
          "Screen Reader Compatibility",
          "High-Contrast Color Ratios",
          "Motion Sensitivity Compliance"
        ]
      },
      {
        id: "fe-design-systems",
        name: "Design Systems & Component Libraries",
        classification: "Modular Component Architecture",
        shortUsage: "Used to build reusable UI token palettes, consistent typography hierarchies, and modular composable component primitives.",
        appliedIn: "Applied in: CodeXa Agency client handoffs, NEC Portal, and TicketX.",
        practicalUsage: "Integrating accessible headless primitives (Radix UI, Lucide) with bespoke styling tokens to produce scalable, cohesive application libraries.",
        relatedTechnologies: ["Radix UI Primitives", "shadcn/ui Patterns", "Lucide Icons", "Framer Motion"],
        areasOfImplementation: [
          "Atomic Component Design",
          "Modal & Flyout Primitives",
          "Design Token Standardization"
        ]
      }
    ]
  },
  {
    id: "backend-apis",
    number: "03",
    name: "Backend & APIs",
    label: "03 — Backend & APIs",
    tagline: "Server runtimes, HTTP protocols, API integration, and services.",
    skills: [
      {
        id: "be-rest-apis",
        name: "REST APIs & Data Fetching",
        classification: "API Integration & Protocols",
        shortUsage: "Used for HTTP request lifecycles, JSON serialization, client caching, error boundaries, and optimistic interface updates.",
        appliedIn: "Applied in: NEC Portal examination queries and web client services.",
        practicalUsage: "Structuring asynchronous client-server communication using fetch, status code verification, error boundaries, and resilient network fallbacks.",
        relatedTechnologies: ["Fetch API", "HTTP Protocols", "JSON", "Error Boundaries", "CORS"],
        areasOfImplementation: [
          "Asynchronous Endpoint Integration",
          "HTTP Request Validation",
          "Network Error Handling",
          "Data Serialization"
        ],
        projectEvidence: [
          {
            name: "NEC Portal",
            description: "Integrated frontend search queries with mock academic record JSON datasets.",
            links: [
              { label: "View Case Study", url: "/projects/nec-portal" }
            ]
          }
        ]
      },
      {
        id: "be-nodejs-express",
        name: "Node.js & Express",
        classification: "JavaScript Server Runtime",
        shortUsage: "Used for backend API routing, middleware integration, request handling, and lightweight web server architectures.",
        appliedIn: "Applied in: Practical engineering projects, backend prototyping, and NodeWave tools.",
        practicalUsage: "Designing modular server routes, request body parsing, environment secret handling, and middleware pipelines in Node.js.",
        relatedTechnologies: ["Node.js", "Express.js", "npm/pnpm", "Middleware", "dotenv"],
        areasOfImplementation: [
          "Modular API Routing",
          "Middleware Request Pipelines",
          "Backend Prototyping"
        ]
      },
      {
        id: "be-python-apis",
        name: "Python APIs & FastAPI",
        classification: "Asynchronous Web APIs",
        shortUsage: "Used for rapid API prototyping, schema-validated request bodies, asynchronous request handling, and backend services.",
        appliedIn: "Applied in: Data service prototypes and experimental AI integration backends.",
        practicalUsage: "Implementing asynchronous endpoint definitions, Pydantic data schemas, and clean API structure for exploratory backend services.",
        relatedTechnologies: ["FastAPI", "Pydantic", "Uvicorn", "Asyncio"],
        areasOfImplementation: [
          "Schema-Driven Validation",
          "Async Service Endpoints",
          "Lightweight Micro-APIs"
        ]
      }
    ]
  },
  {
    id: "databases-cloud",
    number: "04",
    name: "Databases & Cloud",
    label: "04 — Databases & Cloud",
    tagline: "Relational persistence, cloud hosting, edge distribution, and deployment pipelines.",
    skills: [
      {
        id: "db-vercel",
        name: "Vercel Deployment",
        classification: "Edge Platform & Hosting",
        shortUsage: "Used for edge network distribution, automated Git continuous deployment pipelines, preview deployments, and production management.",
        appliedIn: "Applied in: NEC Portal live deployment, Aegis Legacy preview, BookUtsav Hub, and portfolio production.",
        practicalUsage: "Managing zero-configuration edge deployments, environment variable security, production caching, and continuous Git integration.",
        relatedTechnologies: ["Vercel Edge Network", "Git CI/CD", "Environment Secrets", "Serverless Functions"],
        areasOfImplementation: [
          "Continuous Deployment Workflows",
          "Production Edge Hosting",
          "Domain & DNS Configuration"
        ],
        projectEvidence: [
          {
            name: "NEC Portal Live",
            description: "Deployed to Vercel with instant preview branches and production edge caching.",
            links: [
              { label: "Live Deployment", url: "https://nec-portal-rosy.vercel.app/", isExternal: true },
              { label: "View Case Study", url: "/projects/nec-portal" }
            ]
          },
          {
            name: "BookUtsav Innovation Hub",
            description: "Production web platform hosted and distributed through Vercel edge servers.",
            links: [
              { label: "Live Platform", url: "https://bookutsav-inovationhub.vercel.app/", isExternal: true },
              { label: "View Case Study", url: "/projects/bookutsav-hub" }
            ]
          }
        ]
      },
      {
        id: "db-postgres-mysql",
        name: "PostgreSQL & MySQL",
        classification: "Relational Database Management",
        shortUsage: "Used for relational data modeling, table constraints, foreign key cascades, transaction awareness, and structured data storage.",
        appliedIn: "Applied in: Academic database coursework and full-stack prototyping.",
        practicalUsage: "Designing normalized schemas (3NF), declaring foreign keys and primary keys, and writing structured data manipulation statements.",
        relatedTechnologies: ["PostgreSQL", "MySQL", "DBeaver", "SQL Schema DDL"],
        areasOfImplementation: [
          "Schema Normalization",
          "Foreign Key Integrity",
          "Relational Queries"
        ]
      },
      {
        id: "db-supabase-firebase",
        name: "Supabase & Firebase",
        classification: "Managed Cloud Platforms (BaaS)",
        shortUsage: "Used for managed database hosting, authentication pipelines, real-time database listeners, and cloud object storage.",
        appliedIn: "Applied in: Rapid application prototyping, user authentication flows, and event platforms.",
        practicalUsage: "Integrating client-side authentication SDKs, managing row-level security concepts, and handling asset storage buckets.",
        relatedTechnologies: ["Row-Level Security (RLS)", "Auth SDKs", "Realtime Streams", "Cloud Storage"],
        areasOfImplementation: [
          "User Authentication",
          "Managed PostgreSQL",
          "Real-Time Data Streams"
        ]
      },
      {
        id: "db-cloud-render",
        name: "Cloud Hosting & Render",
        classification: "Cloud Compute & Container Hosting",
        shortUsage: "Used for deploying containerized web services, static frontend assets, and background services with automated build hooks.",
        appliedIn: "Applied in: CloudeWave explorations, backend deployments, and staging environments.",
        practicalUsage: "Configuring build commands, monitoring service health logs, and hosting full-stack services on cloud infrastructure.",
        relatedTechnologies: ["Docker", "Web Services", "Build Pipelines", "Service Health"],
        areasOfImplementation: [
          "Full-Stack Hosting",
          "Staging Environments",
          "Containerized Deployments"
        ]
      }
    ]
  },
  {
    id: "mobile-development",
    number: "05",
    name: "Mobile Development",
    label: "05 — Mobile Development",
    tagline: "Cross-platform mobile interfaces, widget trees, and responsive handheld layouts.",
    skills: [
      {
        id: "mob-flutter",
        name: "Flutter",
        classification: "Cross-Platform Mobile Framework",
        shortUsage: "Used for building natively compiled mobile application interfaces with declarative widget hierarchies and consistent styling.",
        appliedIn: "Applied in: Cross-platform mobile prototypes and exploratory application builds.",
        practicalUsage: "Constructing responsive, composable widget trees with custom layouts, animation controllers, and platform-adaptive design systems.",
        relatedTechnologies: ["Flutter Widgets", "State Management", "Material & Cupertino", "Hot Reload"],
        areasOfImplementation: [
          "Mobile Interface Layouts",
          "Widget Composition",
          "Cross-Platform UI Prototyping"
        ]
      },
      {
        id: "mob-dart",
        name: "Dart",
        classification: "Object-Oriented Client Language",
        shortUsage: "Used for strongly-typed client logic, sound null safety, asynchronous streams, and reactive mobile architecture.",
        appliedIn: "Applied in: Flutter mobile modules and application state machines.",
        practicalUsage: "Writing robust Dart classes, asynchronous Futures, and typed data models tailored for mobile client execution.",
        relatedTechnologies: ["Sound Null Safety", "Async / Await", "Streams", "Dart DevTools"],
        areasOfImplementation: [
          "Mobile State Logic",
          "Data Models",
          "Asynchronous Stream Processing"
        ]
      }
    ]
  },
  {
    id: "ai-automation",
    number: "06",
    name: "AI & Automation",
    label: "06 — AI & Automation",
    tagline: "LLM integration, contextual grounding, model boundaries, and automated workflows.",
    skills: [
      {
        id: "ai-llm-integrations",
        name: "LLM Integrations & AI Applications",
        classification: "Intelligent Interface Integration",
        shortUsage: "Used for integrating large language models to provide interactive search, contextual question answering, and automated summarization.",
        appliedIn: "Applied in: Portfolio AI Assistant, Nexa AI explorations, and intelligent web interfaces.",
        practicalUsage: "Designing structured prompt templates, handling streaming model completions, fallback strategies, and grounding AI outputs in verified portfolio data.",
        relatedTechnologies: ["Prompt Engineering", "Streaming Responses", "Context Grounding", "JSON Mode"],
        areasOfImplementation: [
          "Context-Grounded Q&A",
          "Conversational Web Agents",
          "Automated Content Summarization"
        ]
      },
      {
        id: "ai-gemini-features",
        name: "Gemini-Based Features",
        classification: "Grounded Generative AI",
        shortUsage: "Used for contextual assistant dialogues, strict system instruction boundaries, and grounded portfolio query responses.",
        appliedIn: "Applied in: Royal Atelier Portfolio Assistant modal and intelligent feature prototypes.",
        practicalUsage: "Setting deterministic system instructions, maintaining conversational context bounds, and routing user queries accurately without hallucination.",
        relatedTechnologies: ["Gemini API", "System Prompts", "Safety Settings", "Grounding Context"],
        areasOfImplementation: [
          "Contextual Knowledge Grounding",
          "Prompt Safety Boundaries",
          "Deterministic Routing"
        ]
      },
      {
        id: "ai-workflow-automation",
        name: "Workflow Automation & Scripting",
        classification: "Operational Productivity",
        shortUsage: "Used for automating repetitive data transformations, asset optimizations, and repository build maintenance.",
        appliedIn: "Applied in: Development environment scripts and CodeXa internal operational workflows.",
        practicalUsage: "Writing focused utility scripts to validate structured schemas, automate routine data formatting, and streamline development tasks.",
        relatedTechnologies: ["Bash / PowerShell", "Node.js Scripts", "JSON Automation", "CLI Tools"],
        areasOfImplementation: [
          "Build Task Automation",
          "Data Schema Validation",
          "Operational Efficiency"
        ]
      }
    ]
  },
  {
    id: "cybersecurity",
    number: "07",
    name: "Cybersecurity",
    label: "07 — Cybersecurity",
    tagline: "Systems security foundations, threat modeling, defense principles, and secure web engineering.",
    skills: [
      {
        id: "sec-fundamentals",
        name: "Cybersecurity Fundamentals",
        classification: "Systems & Security Core",
        shortUsage: "Used for foundational security modeling including CIA triad principles, authentication architecture, and threat mitigation.",
        appliedIn: "Applied in: B.Tech in Cybersecurity coursework at Narasaraopeta Engineering College and Aegis Legacy dashboard concept.",
        practicalUsage: "Analyzing threat vectors, evaluating zero-trust architecture concepts, and studying secure system configurations as part of degree curriculum.",
        relatedTechnologies: ["CIA Triad", "Access Control Models", "Zero Trust Architecture", "Threat Vectors"],
        areasOfImplementation: [
          "Threat Modeling",
          "Authentication Architecture",
          "Security Principles"
        ],
        projectEvidence: [
          {
            name: "Aegis Legacy",
            description: "Hardened security visualization interface exploring threat telemetry, event severity classification, and policy compliance.",
            links: [
              { label: "View Case Study", url: "/projects/aegis-legacy" },
              { label: "Live Preview", url: "https://aegis-legacy.vercel.app/", isExternal: true },
              { label: "GitHub Repository", url: "https://github.com/varunparlapalli2008/Aegis-Legacy", isExternal: true }
            ]
          }
        ]
      },
      {
        id: "sec-web-security",
        name: "Web Security & OWASP Top 10",
        classification: "Application Security Defense",
        shortUsage: "Used for identifying and mitigating common web vulnerabilities such as XSS, CSRF, insecure direct object references, and broken authentication.",
        appliedIn: "Applied in: Aegis Legacy telemetry prototypes and security-conscious frontend coding standards.",
        practicalUsage: "Applying client-side input sanitization, HTTP security headers, Content Security Policies (CSP), and secure session management principles.",
        relatedTechnologies: ["XSS Mitigation", "CSRF Defense", "Content Security Policy (CSP)", "CORS Hardening"],
        areasOfImplementation: [
          "Client-Side Input Sanitization",
          "Header Hardening",
          "Vulnerability Defense Awareness"
        ]
      },
      {
        id: "sec-linux-terminal",
        name: "Linux & Terminal Environments",
        classification: "Operating Systems & Shell",
        shortUsage: "Used for Linux filesystem navigation, permission controls, package management, process monitoring, and shell scripting.",
        appliedIn: "Applied in: Cybersecurity laboratory environments and development workstation administration.",
        practicalUsage: "Navigating POSIX command line utilities, managing file permissions (chmod/chown), inspecting system processes, and working with SSH.",
        relatedTechnologies: ["Bash", "POSIX Shell", "SSH Keys", "Systemd Processes", "File Permissions"],
        areasOfImplementation: [
          "CLI Administration",
          "Permission Management",
          "Environment Configuration"
        ]
      },
      {
        id: "sec-authorized-testing",
        name: "Authorized Security Testing & Secure Development",
        classification: "Defensive Engineering",
        shortUsage: "Used for understanding defensive vulnerability assessment methodologies, secure code review, and responsible security posture evaluation.",
        appliedIn: "Applied in: Academic laboratory simulations and disciplined development practices.",
        practicalUsage: "Adhering strictly to ethical boundaries, authorized testing scopes, and secure coding practices during application development.",
        relatedTechnologies: ["Secure Code Review", "Defensive Analysis", "Audit Logs", "Scope Compliance"],
        areasOfImplementation: [
          "Defensive Posture",
          "Secure Code Review",
          "Audit Logging Principles"
        ]
      }
    ]
  },
  {
    id: "developer-tools",
    number: "08",
    name: "Developer Tools",
    label: "08 — Developer Tools",
    tagline: "Source control, build systems, developer environments, and API diagnostics.",
    skills: [
      {
        id: "tool-git",
        name: "Git & Version Control",
        classification: "Source Code Management",
        shortUsage: "Used for branch management, commit hygiene, pull requests, resolving merge conflicts, and code history integrity.",
        appliedIn: "Applied in: NEC Portal, Aegis Legacy, BookUtsav Hub, and all collaborative projects.",
        practicalUsage: "Managing feature branches, atomic commits, rebasing, and merge resolution with clean commit documentation across team projects.",
        relatedTechnologies: ["Git CLI", "Branching Strategies", "Rebase & Merge", "Commit Hygiene"],
        areasOfImplementation: [
          "Source History Integrity",
          "Feature Branching",
          "Collaborative Conflict Resolution"
        ],
        projectEvidence: [
          {
            name: "NEC Portal Repository",
            description: "Collaborative Git repository containing modular components and commits.",
            links: [
              { label: "View GitHub Repo", url: "https://github.com/ashuchinthapalli390-max/NEC_PORTAL", isExternal: true }
            ]
          },
          {
            name: "Aegis Legacy Repository",
            description: "Version-controlled security telemetry interface.",
            links: [
              { label: "View GitHub Repo", url: "https://github.com/varunparlapalli2008/Aegis-Legacy", isExternal: true }
            ]
          }
        ]
      },
      {
        id: "tool-github",
        name: "GitHub",
        classification: "Repository Collaboration & Hosting",
        shortUsage: "Used for repository hosting, documentation, code review discussions, issue management, and showcase portfolios.",
        appliedIn: "Applied in: Public project archives, hackathon submissions, and developer portfolio maintenance.",
        practicalUsage: "Publishing well-documented README files, tracking issues, managing pull requests, and showcasing verified project repositories.",
        relatedTechnologies: ["GitHub Projects", "Pull Request Reviews", "Issue Tracking", "Markdown Documentation"],
        areasOfImplementation: [
          "Code Collaboration",
          "Documentation Standards",
          "Release Archiving"
        ],
        projectEvidence: [
          {
            name: "GitHub Profile",
            description: "Verified student open-source repositories and code archives.",
            links: [
              { label: "Visit GitHub Profile", url: "https://github.com/varunparlapalli2008", isExternal: true }
            ]
          }
        ]
      },
      {
        id: "tool-vscode",
        name: "VS Code & Development Tooling",
        classification: "Integrated Development Environment",
        shortUsage: "Used for workspace configurations, multi-language debugging, linting automation, and TypeScript language server integration.",
        appliedIn: "Applied across daily software development, coursework, and agency projects.",
        practicalUsage: "Configuring ESLint, Prettier, TypeScript diagnostics, and debugging profiles for streamlined coding workflows.",
        relatedTechnologies: ["VS Code Extensions", "ESLint", "TypeScript Language Server", "Debugger"],
        areasOfImplementation: [
          "Development Workflows",
          "Linting & Formatting Automation",
          "Integrated Diagnostics"
        ]
      },
      {
        id: "tool-vite",
        name: "Vite Bundler",
        classification: "Modern Build Tool & Bundler",
        shortUsage: "Used for lightning-fast local development server spin-up, instant hot module replacement (HMR), and rollup-optimized production bundling.",
        appliedIn: "Applied in: NEC Portal development build pipeline.",
        practicalUsage: "Setting up Vite configuration files, plugin ecosystems, asset optimization, and fast build output.",
        relatedTechnologies: ["Rollup", "ES Modules", "HMR", "Asset Pipelines"],
        areasOfImplementation: [
          "Build Optimization",
          "Fast Development Iteration",
          "Production Asset Bundling"
        ],
        projectEvidence: [
          {
            name: "NEC Portal Build",
            description: "Vite-powered development setup ensuring instant feedback loops during interface iteration.",
            links: [
              { label: "View Case Study", url: "/projects/nec-portal" }
            ]
          }
        ]
      },
      {
        id: "tool-postman",
        name: "Postman API Testing",
        classification: "API Inspection & Verification",
        shortUsage: "Used for crafting HTTP requests, testing REST endpoint contracts, inspecting headers, and verifying JSON response payloads.",
        appliedIn: "Applied in: Testing external and local API endpoints during project development.",
        practicalUsage: "Organizing request collections, testing authentication headers, inspecting response latency, and asserting schema contracts.",
        relatedTechnologies: ["REST Collections", "Request Headers", "Environment Variables", "JSON Payloads"],
        areasOfImplementation: [
          "Contract Testing",
          "Header Inspection",
          "Status Verification"
        ]
      }
    ]
  }
];
