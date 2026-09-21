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
