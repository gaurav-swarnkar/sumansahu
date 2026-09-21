export type ProjectContent = {
  id: string;
  label: string;
  description?: string;
};

export type Project = {
  id: string;
  eyebrow: string;
  word: string;
  title: string;
  pills: string[];
  panel: string; // background style for right panel
  visual: "tablets" | "monitor" | "truck" | "receipt";
  contents: ProjectContent[];
};

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
    role: "Senior Product Designer",
    company: "Nimbus Labs",
    duration: "2022 — Present",
    location: "Bengaluru, India",
    points: [
      "Led end-to-end design for an AI-powered study planner, driving 35%+ improvement in B2C retention.",
      "Built and scaled a shared design system adopted across 4 product squads.",
      "Mentored 2 junior designers and ran weekly design critiques.",
    ],
  },
  {
    id: "exp-2",
    role: "Product Designer",
    company: "Freightly",
    duration: "2020 — 2022",
    location: "Remote",
    points: [
      "Designed a truck-fill AI agent that improved average load capacity by 12% for carriers.",
      "Owned the 0→1 design of the driver mobile app used by 5,000+ drivers.",
    ],
  },
  {
    id: "exp-3",
    role: "UI/UX Designer",
    company: "Studio Pixel",
    duration: "2018 — 2020",
    location: "Pune, India",
    points: [
      "Delivered UI/UX for 10+ client projects spanning fintech, retail, and healthcare.",
      "Introduced a component-based design workflow that cut handoff time by 30%.",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    id: "edu-1",
    degree: "M.Des. in Interaction Design",
    institution: "National Institute of Design",
    duration: "2016 — 2018",
    description: "Specialized in human-computer interaction and service design.",
  },
  {
    id: "edu-2",
    degree: "B.Tech in Computer Science",
    institution: "SRM University",
    duration: "2012 — 2016",
    description: "Graduated with honors; minored in visual communication.",
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

export const projects: Project[] = [
  {
    id: "study-planner",
    eyebrow: "UX FOR",
    word: "Impact",
    title: "Personalized Ai Study Planner for Students",
    pills: ["35%+ B2C Student Retention", "50%+ B2B Student Acquisition"],
    panel: "bg-brand",
    visual: "tablets",
    contents: [
      { id: "product-summary", label: "Project Summary" },
      { id: "business-problem", label: "Business Usecase" },
      { id: "user-problem", label: "User Needs" },
      { id: "research", label: "Case Study" },
      { id: "design-strategy", label: "Design Process" },
      { id: "solution", label: "Concept and Solution" },
      { id: "validation", label: "User Validation" },
      { id: "impact", label: "Conclusion" },
    ],
  },
  {
    id: "flash-card",
    eyebrow: "UI FOR",
    word: "Delight",
    title: "Flash Card Engagement Spike",
    pills: ["70% with 3+ min more engagement time"],
    panel: "bg-brand-900",
    visual: "monitor",
    contents: [
      { id: "business-problem", label: "Business Usecase" },
      { id: "user-problem", label: "User Needs" },
      { id: "research", label: "Case Study" },
      { id: "design-strategy", label: "Design Process" },
      { id: "solution", label: "Concept and Solution" },
      { id: "validation", label: "User Validation" },
      { id: "impact", label: "Conclusion" },
    ],
  },
  {
    id: "truck-fill",
    eyebrow: "AI FOR",
    word: "Growth",
    title: "Truck Fill Ai Agent For Efficient Loading",
    pills: ["12% average load capacity improved for carriers"],
    panel: "bg-gradient-to-br from-brand-700 via-[#3d0079] to-[#1c0140]",
    visual: "truck",
    contents: [
      { id: "business-problem", label: "Business Usecase" },
      { id: "user-problem", label: "User Needs" },
      { id: "research", label: "Case Study" },
      { id: "design-strategy", label: "Design Process" },
      { id: "solution", label: "Concept and Solution" },
      { id: "validation", label: "User Validation" },
      { id: "impact", label: "Conclusion" },
    ],
  },
  {
    id: "recipe-stock",
    eyebrow: "ALL IN FOR",
    word: "Success",
    title: "Recipe to Stock Automation",
    pills: ["93% accurate stock mapping in a click"],
    panel: "bg-gradient-to-br from-brand-800 to-[#2a0166]",
    visual: "receipt",
    contents: [
      { id: "business-problem", label: "Business Usecase" },
      { id: "user-problem", label: "User Needs" },
      { id: "research", label: "Case Study" },
      { id: "design-strategy", label: "Design Process" },
      { id: "solution", label: "Concept and Solution" },
      { id: "validation", label: "User Validation" },
      { id: "impact", label: "Conclusion" },
    ],
  },
];
