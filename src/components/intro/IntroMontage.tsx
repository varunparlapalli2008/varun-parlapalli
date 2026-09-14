export interface IntroContent {
  projects: { title: string; category: string }[];
  milestones: { title: string; result: string; teamOrIndividual: string }[];
  leadership?: { company: string; role: string };
}

// Vector compositions use published portfolio content, never invented certificates.
// The existing NEC photo is decorative. These are title panels, not product screenshots.
export default function IntroMontage({ content }: { content: IntroContent }) {
  const projects = content.projects;
  const milestone = content.milestones[0];

  return (
    <g fontFamily="var(--font-inter), sans-serif">
      <rect width="2400" height="1300" fill="#100d0d" />
      <g transform="translate(28 26)">
        <rect width="760" height="580" fill="#ece5d9" />
        <image href="/assets/images/nec-college-building.jpg" x="0" y="0" width="760" height="375" preserveAspectRatio="xMidYMid slice" />
        <rect width="760" height="375" fill="#400d20" opacity=".2" />
        <rect x="32" y="32" width="54" height="54" fill="#ede2cb" />
        <text x="44" y="68" fill="#4b1524" fontSize="23" fontWeight="700">01</text>
        <text x="36" y="436" fill="#785c3d" fontSize="15" letterSpacing="5">DESIGN / DEVELOPMENT</text>
        <text x="34" y="505" fill="#280d14" fontSize="57" fontWeight="700">{projects[0]?.title ?? "Selected work"}</text>
        <text x="36" y="548" fill="#635a55" fontSize="19">{projects[0]?.category ?? "Design & development"}</text>
      </g>

      <g transform="translate(810 26)">
        <rect width="600" height="580" fill="#54142a" />
        <path d="M300 82 421 132v117c0 91-121 155-121 155s-121-64-121-155V132Z" fill="none" stroke="#d9b886" strokeWidth="2" />
        <path d="M300 111 394 150v95c0 65-94 121-94 121s-94-56-94-121v-95Z" fill="none" stroke="#d9b886" opacity=".35" />
        <path d="m256 226 30 30 63-68" fill="none" stroke="#eddbc0" strokeWidth="8" />
        <text x="36" y="445" fill="#d8b785" fontSize="15" letterSpacing="5">SYSTEMS / SECURITY</text>
        <text x="34" y="506" fill="#faf0df" fontSize="45" fontWeight="700">{projects[1]?.title ?? "Thoughtful systems"}</text>
        <text x="36" y="547" fill="#d1b9b8" fontSize="19">{projects[1]?.category ?? "Cybersecurity undergraduate"}</text>
      </g>

      <g transform="translate(1432 26)">
        <rect width="920" height="580" fill="#c1a174" />
        <path d="M470 100v245m0-208c-61-47-125-41-176-27v210c55-16 118-20 176 25 61-45 124-41 176-25V110c-56-14-113-20-176 27Z" fill="none" stroke="#493a2e" strokeWidth="3" />
        <text x="36" y="445" fill="#544235" fontSize="15" letterSpacing="5">IDEAS / EXPERIENCES</text>
        <text x="34" y="506" fill="#211814" fontSize="43" fontWeight="700">{projects[2]?.title ?? "Building with purpose"}</text>
        <text x="36" y="547" fill="#544235" fontSize="19">{projects[2]?.category ?? "Learn. Build. Collaborate."}</text>
      </g>

      <g transform="translate(28 628)">
        <rect width="590" height="610" fill="#201b1d" />
        <text x="36" y="57" fill="#c9ab7f" fontSize="15" letterSpacing="5">THINK. BUILD. ITERATE.</text>
        <g fontFamily="monospace" fontSize="25" fill="#e3d4bb">
          <text x="36" y="154" fill="#c096a0">const experience = &#123;</text>
          <text x="60" y="208">design: &apos;thoughtful&apos;,</text>
          <text x="60" y="262">code: &apos;purposeful&apos;,</text>
          <text x="60" y="316">learning: true</text>
          <text x="36" y="370" fill="#c096a0">&#125;;</text>
          <text x="36" y="477" fill="#938680">{"// Keep building."}</text>
        </g>
      </g>

      <g transform="translate(640 628)">
        <rect width="770" height="610" fill="#e8ddc7" />
        <circle cx="390" cy="234" r="139" fill="none" stroke="#b3986b" strokeWidth="2" />
        <circle cx="390" cy="234" r="120" fill="none" stroke="#b3986b" opacity=".5" />
        <path d="m390 167 19 42 46 5-34 31 10 46-41-24-41 24 10-46-34-31 46-5Z" fill="#8c643c" />
        <text x="36" y="435" fill="#8c643c" fontSize="15" letterSpacing="4">{milestone?.teamOrIndividual?.toUpperCase() ?? "PERSONAL"} / MILESTONES</text>
        <text x="34" y="495" fill="#302218" fontSize="44" fontWeight="750">{milestone?.result ?? "Always learning"}</text>
        <text x="36" y="542" fill="#675748" fontSize="21">{milestone?.title ?? "A journey in technology"}</text>
      </g>

      <g transform="translate(1432 628)">
        <rect width="920" height="610" fill="#281316" />
        <path d="M66 89h782M66 383h782" stroke="#b89062" opacity=".6" />
        <text x="62" y="155" fill="#c9a575" fontSize="15" letterSpacing="5">PEOPLE / EXECUTION</text>
        <text x="60" y="296" fill="#e8d0a5" fontSize="92" fontWeight="750">{content.leadership?.company ?? "Collaboration"}</text>
        <text x="66" y="453" fill="#eee0cd" fontSize="33">{content.leadership?.role ?? "Building together"}</text>
        <text x="66" y="513" fill="#b49482" fontSize="20">Ideas become real through people.</text>
      </g>
    </g>
  );
}
