/* Projects: the list shown on the Projects page and in each project page.
 * Order here = order on the site. Media lives in src/assets/{images,videos}/projects/<project-id>/. */
import studyPlannerVideo from "../assets/videos/projects/study-planner/background.mp4";
import studyPlannerBanner from "../assets/images/projects/study-planner/banner.webp";

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
  visual: "tablets" | "monitor" | "truck" | "receipt" | "brand" | "system";
  /**
   * Optional photo shown on the Projects page below "View Project" (and in the
   * project banner). Import an image from src/imports/project_covers/ and set it
   * here; when empty, the built-in mockup (`visual`) is shown instead.
   */
  cover?: string;
  /**
   * Optional looping video used as the full background of the project's panel
   * on the Projects page. Replaces the gradient and the mockup when set.
   */
  backgroundVideo?: string;
  /**
   * Optional transparent image for the project page banner. When set, the
   * banner becomes minimal: just the title on the left and this image on the right.
   */
  bannerImage?: string;
  contents: ProjectContent[];
  experienceJourneys?: {
    before: ExperienceJourney[];
    after: ExperienceJourney[];
  };
};


export const projects: Project[] = [
  {
    id: "study-planner",
    eyebrow: "01",
    word: "Product & UX Design",
    title: "Personalized AI Study Planner for Students",
    pills: ["35%+ B2C Student Retention", "50%+ B2B Student Acquisition"],
    panel: "bg-brand",
    visual: "tablets",
    backgroundVideo: studyPlannerVideo,
    bannerImage: studyPlannerBanner,
    contents: [
      { id: "project-summary", label: "Project Summary" },
      { id: "business-problem", label: "Business Usecase" },
      { id: "user-problem", label: "User Problems" },
      { id: "research", label: "Research" },
      { id: "design-strategy", label: "Concept" },
      { id: "solution", label: "Solution" },
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
    eyebrow: "02",
    word: "AI Agent Design",
    title: "AI-Powered Truck Loading & Optimization",
    pills: ["12% average load capacity improved for carriers"],
    panel: "bg-gradient-to-br from-brand-700 via-[#3d0079] to-[#1c0140]",
    visual: "truck",
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
    eyebrow: "03",
    word: "Enterprise Workflows",
    title: "Recipe-to-Inventory Automation System",
    pills: ["93% accurate stock estimates", "Daily stock count cut from 2 hrs to 15 min"],
    panel: "bg-gradient-to-br from-brand-800 to-[#2a0166]",
    visual: "receipt",
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
  {
    id: "brand-experience",
    eyebrow: "04",
    word: "Brand Experience",
    title: "Brand Websites & Digital Experiences",
    pills: ["Websites that tell the brand story", "Designed and shipped end to end"],
    panel: "bg-gradient-to-br from-brand-700 to-[#1c0140]",
    visual: "brand",
    contents: [
      { id: "project-summary", label: "Project Summary" },
      { id: "challenge", label: "The Challenge" },
      { id: "approach", label: "Approach" },
      { id: "showcase", label: "Showcase" },
      { id: "impact", label: "Conclusion" },
    ],
  },
  {
    id: "design-systems",
    eyebrow: "05",
    word: "Design Systems",
    title: "Scalable Design Systems for SaaS Platforms",
    pills: ["One system, many products", "Tokens to production components"],
    panel: "bg-gradient-to-br from-brand-800 to-[#140033]",
    visual: "system",
    contents: [
      { id: "project-summary", label: "Project Summary" },
      { id: "challenge", label: "The Challenge" },
      { id: "foundations", label: "Foundations" },
      { id: "components", label: "Components" },
      { id: "governance", label: "Adoption & Governance" },
      { id: "impact", label: "Conclusion" },
    ],
  }
];
