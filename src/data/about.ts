/* About page content: journey timeline, work experience, education and achievements.
 * Edit text here; images live in src/assets/images/about/. */
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faLayerGroup, faGraduationCap, faPalette, faBullseye, faChessBoard, faAward, faBrain } from "@fortawesome/free-solid-svg-icons";
import collegeImage from "../assets/images/about/college.png";
import designThinkingImage from "../assets/images/about/design-thinking.png";

export type JourneyStage = {
  id: string;
  year: string;
  description: string;
  gradient: string; // Tailwind classes for the placeholder image/GIF panel
  icon: IconDefinition;
};

export const journeyTimeline: JourneyStage[] = [
  {
    id: "stage-1",
    year: "6+ Years",
    description:
      "Designing SaaS and commercial products across gaming, healthcare, food-tech, and transportation.",
    gradient: "bg-gradient-to-br from-brand-600 to-brand-900",
    icon: faLayerGroup,
  },
  {
    id: "stage-2",
    year: "Mar 2015 – Oct 2018",
    description:
      "Graduated with a BCA from NSHM Knowledge Campus, Kolkata — sparking an interest in building front-end digital solutions.",
    gradient: "bg-gradient-to-br from-lilac to-brand-700",
    icon: faGraduationCap,
  },
  {
    id: "stage-3",
    year: "Jan – Jun 2019",
    description:
      "Sharpened a creative lens, learning to tune design solutions around specific user needs.",
    gradient: "bg-gradient-to-br from-brand-700 via-[#4c04a9] to-[#2a0166]",
    icon: faPalette,
  },
  {
    id: "stage-4",
    year: "Aug 2019 – Mar 2021",
    description:
      "UI Designer at Greenbook Labs, Bhilai — first go-to-market work on a performance-tracking platform and an ad-network SaaS product.",
    gradient: "bg-gradient-to-br from-brand-800 to-[#1c0140]",
    icon: faBullseye,
  },
  {
    id: "stage-5",
    year: "July 2021 - Dec 2021",
    description:
      "UX/UI Designer at SquareOff — moved to Bengaluru mid-pandemic to keep building SaaS products, making board games more scalable.",
    gradient: "bg-gradient-to-br from-lilac to-brand-600",
    icon: faChessBoard,
  },
  {
    id: "stage-6",
    year: "Jan 2022 – Feb 2026",
    description:
      "Product Designer at Poynoial.ai — founding member of Pixel Studio, our design lab serving clients like Sutherland and GE. Won the Service Award, 2023–24.",
    gradient: "bg-gradient-to-br from-brand to-brand-900",
    icon: faAward,
  },
  {
    id: "stage-7",
    year: "Mar – Aug 2026",
    description:
      "A break to skill up and stay ahead of the curve — reinventing as an AI-driven product designer focused on real user needs.",
    gradient: "bg-gradient-to-br from-brand-900 to-ink",
    icon: faBrain,
  },
];

export type WorkExperienceEntry = {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  points: string[];
};

export type EducationEntry = {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  image?: string;
};

export type AchievementEntry = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
};

export const journeySummary = {
  heading: "Product Designer crafting intelligent, human-centered experiences.",
  bio: "I'm a product designer with 4+ years of experience turning ambiguous problems into clear, usable products across SaaS, AI, and logistics. I partner closely with engineering and business teams to ship design that measurably moves the needle — from onboarding flows to AI-assisted workflows.",
  stats: [
    { label: "Years of Experience", value: "4+" },
    { label: "Products Shipped", value: "15+" },
    { label: "Companies", value: "3" },
  ],
  skills: [
    "UX Research",
    "Interaction Design",
    "Design Systems",
    "Prototyping",
    "AI-Assisted Design",
    "Stakeholder Alignment",
  ],
};

export const workExperience: WorkExperienceEntry[] = [
  {
    id: "exp-1",
    role: "Product Designer",
    company: "Poynoial.ai",
    duration: "Jan 2022 – Feb 2026",
    location: "Bengaluru, India",
    points: [
      "Founding member of Pixel Studio, our design lab serving clients like Sutherland and GE.",
      "Won the Service Award, 2023–24.",
      "Designed intelligent, human-centered experiences across SaaS and AI products.",
    ],
  },
  {
    id: "exp-2",
    role: "UX/UI Designer",
    company: "SquareOff",
    duration: "Jul – Dec 2021",
    location: "Bengaluru, India",
    points: [
      "Moved to Bengaluru to continue building SaaS products in the gaming space.",
      "Made board games more scalable through thoughtful digital design.",
    ],
  },
  {
    id: "exp-3",
    role: "UI Designer",
    company: "Greenbook Labs",
    duration: "Aug 2019 – Mar 2021",
    location: "Bhilai, India",
    points: [
      "First go-to-market work on a performance-tracking platform.",
      "Designed an ad-network SaaS product from ground up.",
      "Built foundational UI patterns and design workflows.",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "NSHM Knowledge Campus",
    duration: "Mar 2015 – Oct 2018",
    description: "Graduated with honors from Kolkata. Sparked an interest in building front-end digital solutions.",
    image: collegeImage,
  },
  {
    id: "edu-2",
    degree: "Creative Design & UX Learning",
    institution: "Self-directed",
    duration: "JAN 2019 - JUN 2019",
    description: "Sharpened my creative lens through continuous learning, tuning design solutions around specific user needs.",
    image: designThinkingImage,
  },
];

export const achievements: AchievementEntry[] = [
  {
    id: "ach-1",
    title: "Best UX Case Study Award",
    issuer: "IxDA Design Awards",
    year: "2023",
    description: "Recognized for the AI Study Planner case study among 200+ entries.",
  },
  {
    id: "ach-2",
    title: "Speaker — Design Matters Conference",
    issuer: "Design Matters",
    year: "2022",
    description: "Presented on designing trustworthy AI-assisted experiences.",
  },
  {
    id: "ach-3",
    title: "Published Case Study",
    issuer: "UX Collective (Medium)",
    year: "2021",
    description: "Article on personalization patterns reached 50K+ reads.",
  },
  {
    id: "ach-4",
    title: "Hackathon Winner",
    issuer: "TechFest Nationals",
    year: "2019",
    description: "Won 1st place for a prototype improving last-mile logistics UX.",
  },
];
