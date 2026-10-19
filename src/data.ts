import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faLayerGroup,
  faGraduationCap,
  faPalette,
  faBullseye,
  faChessBoard,
  faAward,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";

export type ProjectContent = {
  id: string;
  label: string;
  description?: string;
};

export type ExperienceJourney = {
  id: string;
  label: string;
  description?: string;
  items?: {
    id: string;
    label: string;
    description?: string;
  }[];
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
  experienceJourneys?: {
    before: ExperienceJourney[];
    after: ExperienceJourney[];
  };
};

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
    image: "/src/imports/about_page/college.png",
  },
  {
    id: "edu-2",
    degree: "Creative Design & UX Learning",
    institution: "Self-directed",
    duration: "JAN 2019 - JUN 2019",
    description: "Sharpened my creative lens through continuous learning, tuning design solutions around specific user needs.",
    image: "/src/imports/about_page/design_thinking.png",
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
      { id: "project-summary", label: "Project Summary" },
      { id: "business-problem", label: "Business Usecase" },
      { id: "user-problem", label: "User Problems" },
      { id: "research", label: "Research" },
      { id: "design-strategy", label: "Design Process" },
      { id: "solution", label: "Concept and Solution" },
      { id: "validation", label: "User Validation" },
      { id: "impact", label: "Conclusion" },
    ],
    experienceJourneys: {
      before: [
        { 
          id: "before-1", 
          label: "Plan", 
          description: "Study planning flow",
          items: [
            { id: "before-1-1", label: "First Time User", description: "New student onboarding" },
            { id: "before-1-2", label: "Returning User", description: "Existing student flow" },
          ]
        },
        { 
          id: "before-2", 
          label: "Acknowledgement", 
          description: "Notification preferences",
          items: [
            { id: "before-2-1", label: "Mobile Notification", description: "Mobile push notifications" },
            { id: "before-2-2", label: "Email Notification", description: "Email notifications" },
          ]
        },
        { 
          id: "before-3", 
          label: "Access", 
          description: "Access points for users",
          items: [
            { id: "before-3-1", label: "From Dashboard", description: "Access from dashboard" },
            { id: "before-3-2", label: "From Calendar", description: "Access from calendar" },
          ]
        },
        { 
          id: "before-4", 
          label: "Revoke", 
          description: "Revoke permissions",
          items: [
            { id: "before-4-1", label: "From Calendar", description: "Revoke from calendar view" },
          ]
        },
      ],
      after: [
        { 
          id: "after-1", 
          label: "Plan", 
          description: "Study planning flow",
          items: [
            { id: "after-1-1", label: "First Time User", description: "New student onboarding" },
            { id: "after-1-2", label: "Returning User", description: "Existing student flow" },
          ]
        },
        { 
          id: "after-2", 
          label: "Acknowledgement", 
          description: "Notification preferences",
          items: [
            { id: "after-2-1", label: "Mobile Notification", description: "Mobile push notifications" },
            { id: "after-2-2", label: "Email Notification", description: "Email notifications" },
          ]
        },
        { 
          id: "after-3", 
          label: "Access", 
          description: "Access points for users",
          items: [
            { id: "after-3-1", label: "From Dashboard", description: "Access from dashboard" },
            { id: "after-3-2", label: "From Calendar", description: "Access from calendar" },
          ]
        },
        { 
          id: "after-4", 
          label: "Revoke", 
          description: "Revoke permissions",
          items: [
            { id: "after-4-1", label: "From Calendar", description: "Revoke from calendar view" },
          ]
        },
      ],
    },
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
      { id: "user-problem", label: "User Problems" },
      { id: "research", label: "Research" },
      { id: "design-strategy", label: "Design Process" },
      { id: "solution", label: "Concept and Solution" },
      { id: "validation", label: "User Validation" },
      { id: "impact", label: "Conclusion" },
    ],
    experienceJourneys: {
      before: [
        { id: "before-1", label: "Plan", description: "Manual truck loading planning process", items: [
          { id: "before-1-1", label: "Manual Calculation", description: "Drivers calculate capacity manually" },
          { id: "before-1-2", label: "Trial & Error", description: "Multiple attempts to find optimal loading" },
        ]},
        { id: "before-2", label: "Acknowledge", description: "Limited capacity visibility", items: [
          { id: "before-2-1", label: "No Real-time Data", description: "No live truck capacity feedback" },
          { id: "before-2-2", label: "Guess Work", description: "Capacity estimation based on experience only" },
        ]},
        { id: "before-3", label: "Access", description: "Static loading instructions", items: [
          { id: "before-3-1", label: "Paper Based", description: "Physical loading instructions only" },
          { id: "before-3-2", label: "No Updates", description: "Cannot modify instructions on the fly" },
        ]},
        { id: "before-4", label: "Revoke", description: "No optimization capability", items: [
          { id: "before-4-1", label: "Fixed Plans", description: "Cannot re-optimize once loading starts" },
          { id: "before-4-2", label: "Wasted Space", description: "No recalculation for space efficiency" },
        ]},
      ],
      after: [
        { id: "after-1", label: "Plan", description: "AI-optimized loading plans", items: [
          { id: "after-1-1", label: "Instant Calculation", description: "AI calculates optimal loading in seconds" },
          { id: "after-1-2", label: "Proven Efficiency", description: "Consistent 12% capacity improvement" },
        ]},
        { id: "after-2", label: "Acknowledge", description: "Real-time capacity tracking", items: [
          { id: "after-2-1", label: "Live Updates", description: "Real-time truck capacity monitoring" },
          { id: "after-2-2", label: "Smart Suggestions", description: "AI suggests optimal item placement" },
        ]},
        { id: "after-3", label: "Access", description: "Dynamic loading suggestions", items: [
          { id: "after-3-1", label: "App Based", description: "Mobile app with visual loading guide" },
          { id: "after-3-2", label: "Instant Access", description: "Instructions available anytime, anywhere" },
        ]},
        { id: "after-4", label: "Revoke", description: "Instant plan regeneration", items: [
          { id: "after-4-1", label: "Adaptive Plans", description: "Regenerate plans based on item changes" },
          { id: "after-4-2", label: "Continuous Optimization", description: "Learn and improve with each loading" },
        ]},
      ],
    },
  },
  {
    id: "recipe-stock",
    eyebrow: "Agents for",
    word: "Success",
    title: "Recipe to Stock Automation",
    pills: ["93% accurate stock mapping in a click"],
    panel: "bg-gradient-to-br from-brand-800 to-[#2a0166]",
    visual: "receipt",
    contents: [
      { id: "business-problem", label: "Business Usecase" },
      { id: "user-problem", label: "User Needs" },
      { id: "research", label: "Research" },
      { id: "design-strategy", label: "Design Process" },
      { id: "solution", label: "Concept and Solution" },
      { id: "validation", label: "User Validation" },
      { id: "impact", label: "Conclusion" },
    ],
    experienceJourneys: {
      before: [
        { id: "before-1", label: "Plan", description: "Manual recipe to stock mapping", items: [
          { id: "before-1-1", label: "Manual Entry", description: "Recipes manually matched to inventory items" },
          { id: "before-1-2", label: "Time Consuming", description: "Hours spent mapping recipes to stock" },
        ]},
        { id: "before-2", label: "Acknowledge", description: "Low accuracy mapping process", items: [
          { id: "before-2-1", label: "Human Error", description: "Frequent mistakes in item matching" },
          { id: "before-2-2", label: "Inconsistency", description: "Different mapping rules applied inconsistently" },
        ]},
        { id: "before-3", label: "Access", description: "Time-consuming manual entry", items: [
          { id: "before-3-1", label: "Desktop Only", description: "Mapping only possible on desktop systems" },
          { id: "before-3-2", label: "Batch Processing", description: "Cannot process recipes in real-time" },
        ]},
        { id: "before-4", label: "Revoke", description: "No version control", items: [
          { id: "before-4-1", label: "No History", description: "Cannot track changes to mappings" },
          { id: "before-4-2", label: "No Rollback", description: "Cannot revert to previous mappings" },
        ]},
      ],
      after: [
        { id: "after-1", label: "Plan", description: "Automated mapping with AI", items: [
          { id: "after-1-1", label: "Instant Processing", description: "AI processes recipes in seconds" },
          { id: "after-1-2", label: "Bulk Upload", description: "Upload and process hundreds of recipes" },
        ]},
        { id: "after-2", label: "Acknowledge", description: "93% accurate automation", items: [
          { id: "after-2-1", label: "High Accuracy", description: "Consistent 93% accuracy across all mappings" },
          { id: "after-2-2", label: "Smart Learning", description: "AI learns from corrections and improves" },
        ]},
        { id: "after-3", label: "Access", description: "One-click processing", items: [
          { id: "after-3-1", label: "Simple Upload", description: "Drag and drop recipe files" },
          { id: "after-3-2", label: "Real-time Results", description: "Immediate mapping results and export" },
        ]},
        { id: "after-4", label: "Revoke", description: "Full audit trail available", items: [
          { id: "after-4-1", label: "Change History", description: "Complete history of all mapping changes" },
          { id: "after-4-2", label: "Version Control", description: "Easy rollback to any previous version" },
        ]},
      ],
    },
  },
];
