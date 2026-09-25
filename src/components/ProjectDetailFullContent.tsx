import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faCalendarDays, faFire, faClipboardList, faLock, faHeartBroken, faUsers, faChartLine, faCheckCircle, faClock, faChevronLeft, faChevronRight, faCheck, faXmark, faInfoCircle, faMagnifyingGlass, faFlask, faBrain, faCircleQuestion, faStar, faCircleXmark, faCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import sumansahuImage from "../imports/Main/suman_sahu.png";
import student1 from "../imports/project_assets/student1.png";
import student2 from "../imports/project_assets/student 2.png";
import student3 from "../imports/project_assets/student 3.png";
import persona1 from "../imports/project_assets/persona1.png";
import persona2 from "../imports/project_assets/persona2.png";
import persona3 from "../imports/project_assets/persona3.png";
import persona4 from "../imports/project_assets/persona4.png";
import persona5 from "../imports/project_assets/persona5.png";
import individualLearnerImg from "../imports/project_assets/p1_indivisual_learner.png";
import groupLearnerImg from "../imports/project_assets/p1_group_of_learners.png";
import myStudyLifeLogo from "../imports/project_assets/mystudylife.png";
import studySmarterLogo from "../imports/project_assets/studysmarter.png";
import shovelLogo from "../imports/project_assets/shovel.png";
import fastiLogo from "../imports/project_assets/Fasti.png";
import notionLogo from "../imports/project_assets/notion.png";
import googleCalendarLogo from "../imports/project_assets/google_calendar.png";
import todoistLogo from "../imports/project_assets/todoist.png";
import myStudyLifeBanner from "../imports/project_assets/mystudylife_banner.png";
import studySmarterBanner from "../imports/project_assets/studysmarter_banner.png";
import shovelBanner from "../imports/project_assets/shovel_banner.png";
import fastiBanner from "../imports/project_assets/fasti_banner.png";
import notionBanner from "../imports/project_assets/notion_banner.png";
import googleCalendarBanner from "../imports/project_assets/google_calendar_banner.png";
import todoistBanner from "../imports/project_assets/todoist_banner.png";
import video1 from "../imports/Main/1.mp4";
import video2 from "../imports/Main/2.mp4";
import video3 from "../imports/Main/3.mp4";
import video4 from "../imports/Main/4.mp4";
import { useState, useRef } from "react";
import { Project } from "../data";

interface ProjectDetailFullContentProps {
  projectId?: string;
  project?: Project;
}

// SWOT Bubble Data Structure
const swotBubbleData = {
  1: { title: "Planning doesn't translate into execution", description: "Students can create plans, but the plan often doesn't match their actual time, energy, or daily commitments." },
  2: { title: "Plans don't self-correct", description: "When students miss a session or fall behind, the plan doesn't intelligently recover. One missed session can create a cascade of unfinished work." },
  3: { title: "Activity is mistaken for learning", description: "Students can see tasks completed, study time, or streaks, but these don't necessarily tell them what they actually learned or where they still struggle." },
  4: { title: "Recommendations lack transparency", description: "Students receive schedules or recommendations, but don't always understand why this task, topic, or time slot was chosen." },
  5: { title: "Students lack forward guidance", description: "Most experiences tell students what they've done or what's due. They provide less guidance around what they should do next based on their goals and progress." },
  6: { title: "Planning itself becomes another task", description: "Students spend effort deciding what to study, when to study, and how to rearrange their schedule instead of spending that effort on learning." },
  7: { title: "Build plans around real capacity", description: "Create study plans based on available time, commitments, priorities, and learning goals rather than simply fitting tasks into a calendar." },
  8: { title: "Make the plan adaptive", description: "Allow the plan to continuously respond to changes in time, priorities, progress, and missed sessions." },
  9: { title: "Create a recovery loop", description: "Instead of treating a missed session as failure: Miss → Understand → Rebalance → Continue. The system should help students get back on track without rebuilding the plan themselves." },
  10: { title: "Make AI recommendations explainable", description: "Give students simple reasons behind recommendations. This builds understanding and trust." },
  11: { title: "Connect planning with learning", description: "Move beyond tracking activity by connecting study sessions → learning progress → knowledge gaps → next actions." },
  12: { title: "Turn progress into the next action", description: "Don't just show students where they are. Tell them what comes next based on their progress and goals." },
  13: { title: "Reduce the cognitive load of planning", description: "Students shouldn't have to constantly decide what, when, how much, and what to move. Study Planner can handle the complexity while keeping the student in control." },
};

function SwotDiagram() {
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{x: number, y: number} | null>(null);

  const handleBubbleHover = (bubbleNum: number, event: React.MouseEvent<SVGGElement>) => {
    const svg = event.currentTarget.ownerSVGElement;
    if (svg) {
      const rect = svg.getBoundingClientRect();
      const circle = event.currentTarget.querySelector('circle') as SVGCircleElement;
      if (circle) {
        const cx = parseFloat(circle.getAttribute('cx') || '0');
        const cy = parseFloat(circle.getAttribute('cy') || '0');
        const scale = rect.width / 900;
        setTooltipPos({
          x: rect.left + cx * scale,
          y: rect.top + cy * scale
        });
      }
    }
    setHoveredBubble(bubbleNum);
  };

  return (
    <div className="w-full">
      <svg viewBox="0 0 900 500" className="w-full h-auto">
        {/* Background quadrants - All White */}
        <rect x="10" y="10" width="430" height="230" rx="20" fill="white" />
        <rect x="460" y="10" width="430" height="230" rx="20" fill="white" />
        <rect x="10" y="260" width="430" height="230" rx="20" fill="white" />
        <rect x="460" y="260" width="430" height="230" rx="20" fill="white" />
        
        {/* Quadrant Headers */}
        <g>
          <text x="70" y="40" fontSize="18" fontWeight="bold" fill="#18033b" fontFamily="Poppins">STRENGTHS</text>
        </g>
        
        <g>
          <text x="680" y="40" fontSize="18" fontWeight="bold" fill="#18033b" fontFamily="Poppins">WEAKNESSES</text>
        </g>
        
        <g>
          <text x="70" y="470" fontSize="18" fontWeight="bold" fill="#18033b" fontFamily="Poppins">OPPORTUNITIES</text>
        </g>
        
        <g>
          <text x="680" y="470" fontSize="18" fontWeight="bold" fill="#18033b" fontFamily="Poppins">THREATS</text>
        </g>
        
        {/* Center Circle - Purple with white text */}
        <circle cx="450" cy="250" r="60" fill="#7322ff" stroke="none" />
        <text x="450" y="245" fontSize="20" fontWeight="bold" fill="white" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">SWOT</text>
        <text x="450" y="265" fontSize="13" fontWeight="600" fill="white" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">Analysis</text>
        
        {/* STRENGTHS - Stroke Circles (Top Left) - Should Have 7-10 */}
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(7, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="220" cy="120" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="220" y="120" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">7</text>
        </g>
        
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(8, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="340" cy="100" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="340" y="100" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">8</text>
        </g>
        
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(9, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="180" cy="200" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="180" y="200" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">9</text>
        </g>
        
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(10, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="310" cy="185" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="310" y="185" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">10</text>
        </g>
        
        {/* WEAKNESSES - Stroke Circles (Top Right) - Must Have 1-4 */}
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(1, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="680" cy="120" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="680" y="120" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">1</text>
        </g>
        
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(2, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="560" cy="100" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="560" y="100" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">2</text>
        </g>
        
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(3, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="720" cy="200" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="720" y="200" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">3</text>
        </g>
        
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(4, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="590" cy="185" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="590" y="185" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">4</text>
        </g>
        
        {/* OPPORTUNITIES - Stroke Circles (Bottom Left) - Should Have 11-13 */}
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(11, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="220" cy="380" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="220" y="380" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">11</text>
        </g>
        
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(12, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="340" cy="400" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="340" y="400" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">12</text>
        </g>
        
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(13, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="180" cy="300" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="180" y="300" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">13</text>
        </g>
        
        {/* THREATS - Stroke Circles (Bottom Right) - Must Have 5-6 */}
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(5, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="680" cy="380" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="680" y="380" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">5</text>
        </g>
        
        <g style={{cursor: 'pointer'}} onMouseEnter={(e) => handleBubbleHover(6, e)} onMouseLeave={() => setHoveredBubble(null)}>
          <circle cx="560" cy="400" r="20" fill="none" stroke="#7322ff" strokeWidth="2" />
          <text x="560" y="400" fontSize="14" fontWeight="normal" fill="#7322ff" textAnchor="middle" dominantBaseline="middle" fontFamily="Poppins">6</text>
        </g>
      </svg>
      
      {/* Tooltip */}
      {hoveredBubble && tooltipPos && swotBubbleData[hoveredBubble as keyof typeof swotBubbleData] && (
        <div 
          className="fixed bg-ink text-white rounded-lg p-4 shadow-lg z-50 max-w-xs pointer-events-none"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 140}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <h4 className="font-semibold text-sm mb-2">{swotBubbleData[hoveredBubble as keyof typeof swotBubbleData].title}</h4>
          <p className="text-xs text-white/80">{swotBubbleData[hoveredBubble as keyof typeof swotBubbleData].description}</p>
        </div>
      )}
    </div>
  );
}

export default function ProjectDetailFullContent({ projectId, project }: ProjectDetailFullContentProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"before" | "after" | "impact">("before");
  const [selectedMetric, setSelectedMetric] = useState<"acquisition" | "retention" | "on-time" | "engagement">("acquisition");
  const [currentPersona, setCurrentPersona] = useState(0);
  const [activeResearchTab, setActiveResearchTab] = useState<"findings" | "method" | "analysis">("findings");
  const [selectedResearchQuestion, setSelectedResearchQuestion] = useState(0);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [competitorType, setCompetitorType] = useState<"direct" | "indirect">("direct");
  const [selectedCompetitor, setSelectedCompetitor] = useState(0);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280; // card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };
  
  // Map project IDs to video indices
  const videos = [video1, video2, video3, video4];
  const projectIndex = project ? ["study-planner", "flash-card", "tutify", "mentorship"].indexOf(project.id) : 0;
  const videoSrc = videos[projectIndex >= 0 ? projectIndex : 0];

  // Competitive Analysis Data
  const competitors = {
    direct: [
      {
        name: "MyStudyLife",
        description: "Student planner combining classes, homework, exams, grades and AI-powered study planning.",
        imagePath: myStudyLifeLogo,
        bannerPath: myStudyLifeBanner,
        icon: "🛡️",
        platform: "Web, iOS, Android",
        targetUsers: "School and university students",
        pricing: "Free · Premium $6.99/month or $39.99/year",
        features: [
          "AI study coach creates weekly schedules and exam revision plans",
          "AI timetable scanner converts photos, screenshots or PDFs into schedules",
          "Academic calendar combines classes, homework, exams and activities",
          "Tracks grades, GPA, averages and subject-level performance"
        ],
        strengths: [
          "Strong academic context — Classes, tasks, exams and grades are structured around the student's academic schedule",
          "Low planning effort — Timetable scanning and Scout reduce manual schedule and study-plan creation",
          "Handles complex schedules — Rotating, A/B, block and custom timetables accommodate different academic structures"
        ],
        gaps: [
          "Limited adaptive replanning — Less detail on automatically rebuilding plans after missed sessions",
          "Limited capacity awareness — Public documentation gives less detail on dynamically matching workload to actual daily capacity",
          "Limited learning intelligence — Focus on task tracking rather than topic mastery or learning gaps"
        ]
      },
      {
        name: "StudySmarter",
        description: "All-in-one learning platform combining study plans, learning materials, AI tools, practice and progress tracking.",
        imagePath: studySmarterLogo,
        bannerPath: studySmarterBanner,
        icon: "📦",
        platform: "Web, iOS, Android",
        targetUsers: "School & university students",
        pricing: "Free + Premium options",
        features: [
          "Smart Study Plan — Creates study plans around exam dates, goals, preferences and study style",
          "AI Learning Tools — Generates explanations, flashcards, mock exams and personalised feedback",
          "Spaced Repetition — Adjusts flashcard learning based on study performance",
          "Gamification — Awards points, badges and trophies for study activity"
        ],
        strengths: [
          "Planning linked to learning — Study plans connect directly with flashcards, notes, quizzes and other learning activities",
          "Learning adapts to performance — Spaced repetition changes flashcard learning based on how the student performs",
          "Strong motivation loop — Reminders, nudges, goals, points and badges create multiple reinforcement mechanisms"
        ],
        gaps: [
          "Limited real-life context — Planning inputs focus on exams and goals rather than daily commitments and available time",
          "Planning is exam-centric — Leaves an opportunity for more continuous planning around everyday learning capacity",
          "Broad feature ecosystem — Large feature set can make the planning experience less focused"
        ]
      },
      {
        name: "Shovel",
        description: "Student study planner that turns academic deadlines into scheduled study time by combining tasks, calendar and available capacity.",
        imagePath: shovelLogo,
        bannerPath: shovelBanner,
        icon: "S",
        platform: "Web · Mobile apps",
        targetUsers: "Students managing coursework, assignments and academic workload",
        pricing: "Free trial · Subscription plans",
        features: [
          "LMS Sync — Imports assignments and deadlines from Canvas, Brightspace, Moodle and Google Classroom",
          "Cushion™ — Compares available study time with estimated workload to flag scheduling problems",
          "Smart Schedule — Calculates available study blocks around classes and activities",
          "Timeline — Shows how task start dates and deadlines overlap across the semester"
        ],
        strengths: [
          "Capacity-aware planning — Compares actual available study time against estimated time required for coursework",
          "Strong real-world scheduling — Accounts for classes, activities, routines and other calendar commitments",
          "Early overload detection — Cushion can identify future workload problems before deadlines become urgent"
        ],
        gaps: [
          "Limited learning intelligence — Planning is strongly based on time and deadlines rather than topic mastery or learning difficulty",
          "Manual estimation dependency — Accurate planning relies heavily on students estimating task duration",
          "Learning prioritization — Focuses on fitting work into available time rather than prioritizing based on knowledge gaps"
        ]
      },
      {
        name: "Fasti",
        description: "AI student planner that combines classes, assignments, exams, study time, work shifts, commute and personal commitments.",
        imagePath: fastiLogo,
        bannerPath: fastiBanner,
        icon: "O",
        platform: "iOS · Android · Web",
        targetUsers: "Students managing academics alongside work, travel and personal commitments",
        pricing: "Free · Plus CA$6.99/month · Pro CA$13.99/month",
        features: [
          "Schedule Import — Converts screenshots, PDFs, syllabi and pasted text into editable events",
          "AI Planner — Moves and adds study time through natural-language requests",
          "Calendar Context — Plans around classes, shifts, commute and sleep",
          "Plan Preview — Shows proposed AI changes before they modify the calendar"
        ],
        strengths: [
          "Real-life context — Combines academic deadlines with work, commute, sleep and personal commitments",
          "Strong adaptive planning — Students can ask the Planner to rebalance study blocks when the week becomes overloaded",
          "Transparent AI actions — Proposed calendar changes can be reviewed and approved before taking effect"
        ],
        gaps: [
          "Limited learning intelligence — Planning is strongly focused on time and workload rather than topic mastery",
          "Motivation layer — Focuses on coordination and planning with less emphasis on reinforcement or habit-building",
          "Learning prioritization — Planning model focuses on fitting work into available time rather than prioritizing based on knowledge gaps"
        ]
      }
    ],
    indirect: [
      {
        name: "Notion",
        description: "Flexible workspace students use to manage notes, tasks, schedules, projects and study dashboards.",
        imagePath: notionLogo,
        bannerPath: notionBanner,
        icon: "🗂️",
        platform: "Web · iOS · Android · Desktop",
        targetUsers: "Students, educators and student organizations",
        pricing: "Free · Education plan available for eligible college/university students",
        features: [
          "Student Templates — Ready-made planners, class schedules, notes and dashboards",
          "Databases — Build custom task, assignment and study trackers",
          "Calendar — Manage deadlines, classes and activities",
          "Notion AI — Generate, summarize and organize study content"
        ],
        strengths: [
          "Highly customizable — Students can build their own planning system around their preferred workflow",
          "All-in-one workspace — Combines notes, tasks, databases, calendars and projects in one environment",
          "Strong learning ecosystem — Large marketplace of student templates covering planners, notes, flashcards and study systems"
        ],
        gaps: [
          "Manual setup — Students often need to build or customize their own study-planning system",
          "Limited automatic planning — Unlike dedicated planners, Notion doesn't primarily generate a complete study schedule",
          "Weak adaptive planning — Changing workload or missed sessions generally require the student to update their system"
        ]
      },
      {
        name: "Google Calendar",
        description: "General-purpose calendar for scheduling events, tasks, routines and time blocks.",
        imagePath: googleCalendarLogo,
        bannerPath: googleCalendarBanner,
        icon: "📅",
        platform: "Web · Android · iOS",
        targetUsers: "General users, students, professionals and teams",
        pricing: "Free · Additional features through Google Workspace / Google One plans",
        features: [
          "Time Blocking — Schedule study, classes and personal activities directly on the calendar",
          "Google Tasks — Add dated tasks with duration, deadlines, reminders and recurring schedules",
          "Multiple Calendars — Separate and combine school, personal and other schedules in one view",
          "Focus Time — Reserve distraction-free blocks with notification and meeting controls"
        ],
        strengths: [
          "Strong schedule visibility — Gives students a clear visual view of classes, commitments, tasks and available time",
          "Low-friction scheduling — Adding events or tasks directly to specific time slots makes time blocking simple",
          "Strong ecosystem integration — Gmail, Tasks and other Google services can feed information into the calendar"
        ],
        gaps: [
          "Manual study planning — Students still need to decide what to study, when and how much time each task requires",
          "No learning context — Calendar events don't understand subjects, difficulty, mastery or exam readiness",
          "Limited adaptive planning — Moving a missed study session requires the student to manually reorganize the schedule"
        ]
      },
      {
        name: "Todoist",
        description: "Task-management app for organizing projects, priorities, deadlines and recurring work.",
        imagePath: todoistLogo,
        bannerPath: todoistBanner,
        icon: "✓",
        platform: "Web · iOS · Android · Desktop · Wearables",
        targetUsers: "General users, professionals, teams and students",
        pricing: "Free · Pro $7/month or $60/year",
        features: [
          "Quick Add — Capture tasks using natural-language input",
          "Projects — Organize tasks into separate projects and sections",
          "Priorities — Assign four priority levels to tasks",
          "Recurring Tasks — Schedule repeating tasks on custom schedules"
        ],
        strengths: [
          "Strong task organization — Projects, sections, labels, priorities and filters provide detailed control over large task lists",
          "Flexible scheduling — Supports dates, deadlines, recurring tasks, durations and calendar-based planning",
          "Fast task capture — Natural-language input makes adding dated and recurring tasks quick"
        ],
        gaps: [
          "Generic task model — Tasks don't understand subjects, exams, learning difficulty or topic mastery",
          "Manual study planning — Students still need to decide what to study, how much time it needs and when to do it",
          "Limited learning context — Priorities are user-defined rather than based on learning performance or knowledge gaps"
        ]
      }
    ]
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=pan_tool_alt" />
      {/* ===== TOP BANNER ===== */}
      <div className="relative h-[calc(45vh+100px)] w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Overlay for better button visibility */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Centered Container for Buttons - Matches Content Below */}
        <div className="absolute bottom-0 left-0 right-0 w-full flex justify-center pointer-events-none hidden">
          <div className="max-w-4xl w-full pt-32 lg:pt-40 pb-4 flex pointer-events-auto">
            {/* Buttons - Bottom Left within Centered Container */}
            <div className="flex flex-row gap-4 z-20">
              <button disabled onClick={() => setShowVideoModal(true)} className="w-32 px-6 py-3 bg-white text-brand font-semibold transition-all duration-300 hover:bg-brand hover:text-white flex items-center justify-center gap-2 whitespace-nowrap text-sm opacity-50 cursor-not-allowed" aria-label="Play">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch
              </button>
              <button disabled onClick={() => setShowExperienceModal(true)} className="w-32 px-6 py-3 bg-white text-brand font-semibold transition-all duration-300 hover:bg-brand hover:text-white flex items-center justify-center gap-2 whitespace-nowrap text-sm cursor-not-allowed opacity-50" aria-label="Experience">
                <span className="material-symbols-outlined text-sm">pan_tool_alt</span>
                Experience
              </button>
            </div>
          </div>
        </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowVideoModal(false)}>
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowVideoModal(false)} className="absolute top-8 right-8 text-white text-3xl z-51 hover:opacity-80">
              ✕
            </button>
            <video
              autoPlay
              controls
              playsInline
              className="w-full h-full max-w-6xl max-h-[90vh] object-contain"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {showExperienceModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowExperienceModal(false)}>
          <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowExperienceModal(false)} className="absolute top-8 right-8 text-white text-3xl z-51 hover:opacity-80">
              ✕
            </button>
            
            {/* Tabs */}
            <div className="flex gap-8 mb-8 mt-8">
              <button
                onClick={() => setActiveTab("before")}
                className={`px-6 py-2 font-semibold text-base transition-all ${
                  activeTab === "before"
                    ? "text-brand border-b-2 border-brand"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setActiveTab("after")}
                className={`px-6 py-2 font-semibold text-base transition-all ${
                  activeTab === "after"
                    ? "text-brand border-b-2 border-brand"
                    : "text-white/60 hover:text-white"
                }`}
              >
                After
              </button>
              <button
                onClick={() => setActiveTab("impact")}
                className={`px-6 py-2 font-semibold text-base transition-all ${
                  activeTab === "impact"
                    ? "text-brand border-b-2 border-brand"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Impact
              </button>
            </div>

            {/* Figma Iframe */}
            <div className="w-full h-full max-w-6xl flex-1">
              <iframe
                width="100%"
                height="100%"
                src={
                  activeTab === "before"
                    ? "https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_LINK_BEFORE"
                    : activeTab === "after"
                    ? "https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_LINK_AFTER"
                    : "https://www.figma.com/embed?embed_host=share&url=YOUR_FIGMA_LINK_IMPACT"
                }
                allowFullScreen
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}
      </div>

      <div className="flex h-full flex-col px-8 py-12 lg:px-7 lg:py-20">
        <div className="space-y-24 max-w-4xl mx-auto w-full">
        
        {/* ===== SECTION 1: PROJECT SUMMARY ===== */}
        <section id="project-summary" className="space-y-8 scroll-mt-8">
          <h1 className="text-4xl font-bold text-ink mt-20 mb-8">Project summary</h1>
          
          <div className="space-y-4 max-w-3xl">
            <p className="text-base leading-relaxed text-ink/80">
              <strong>Notesight</strong> is an AI-powered learning platform designed to help students prepare for exams through personalized learning, progress tracking, and guided self-study.
            </p>
            <p className="text-base leading-relaxed text-ink/80">
              As students moved from structured classroom learning to self-directed study, we found a critical gap: <strong className="bg-yellow-100 px-1 py-0.5 rounded">having a study plan didn't mean students could consistently follow it.</strong> Rigid schedules struggled to accommodate school, tuition, personal commitments, changing priorities, and upcoming exams.
            </p>
            <p className="text-base leading-relaxed text-ink/80">
              I designed the <strong>Personalized AI Study Planner</strong> to bridge that gap—using the student's academic schedule, daily routine, available time, exam goals, and learning progress to create a study plan that fits into their real life.
            </p>
          </div>

          {/* Impact Highlights */}
          <div className="space-y-8 pt-6 scroll-mt-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Impact Highlights</h2>
              <p className="text-base text-ink/60 max-w-3xl">
                Personalised learning experience led to stronger and more consistent student outcomes.
              </p>
              <p className="text-sm font-medium text-ink/50">Nov 2024 - Apr 2025 Vs May 2025 - Oct 2025</p>
            </div>

            {/* KPI Cards Grid - 4 columns (Clickable Tabs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {/* Card 1: Acquisition */}
              <button
                onClick={() => setSelectedMetric("acquisition")}
                className={`rounded-lg p-5 transition-all text-left shadow-md ${
                  selectedMetric === "acquisition"
                    ? "border-2 border-brand bg-brand/5 shadow-xl"
                    : "bg-white/90 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/70">Acquisition</p>
                    <FontAwesomeIcon icon={faUsers} className={`size-5 ${selectedMetric === "acquisition" ? "text-brand" : "text-ink/40"}`} />
                  </div>
                  <div className={`text-3xl font-bold ${selectedMetric === "acquisition" ? "text-brand" : "text-ink"}`}>12.4K</div>
                  <div className="text-sm text-green-600">↗ +62% growth</div>
                </div>
              </button>

              {/* Card 2: Retention */}
              <button
                onClick={() => setSelectedMetric("retention")}
                className={`rounded-lg p-5 transition-all text-left shadow-md ${
                  selectedMetric === "retention"
                    ? "border-2 border-brand bg-brand/5 shadow-xl"
                    : "bg-white/90 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/70">Retention</p>
                    <FontAwesomeIcon icon={faChartLine} className={`size-5 ${selectedMetric === "retention" ? "text-brand" : "text-ink/40"}`} />
                  </div>
                  <div className={`text-3xl font-bold ${selectedMetric === "retention" ? "text-brand" : "text-ink"}`}>37%</div>
                  <div className="text-sm text-green-600">↗ +27pp growth</div>
                </div>
              </button>

              {/* Card 3: On-Time Completion */}
              <button
                onClick={() => setSelectedMetric("on-time")}
                className={`rounded-lg p-5 transition-all text-left shadow-md ${
                  selectedMetric === "on-time"
                    ? "border-2 border-brand bg-brand/5 shadow-xl"
                    : "bg-white/90 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/70">Completion</p>
                    <FontAwesomeIcon icon={faCheckCircle} className={`size-5 ${selectedMetric === "on-time" ? "text-brand" : "text-ink/40"}`} />
                  </div>
                  <div className={`text-3xl font-bold ${selectedMetric === "on-time" ? "text-brand" : "text-ink"}`}>68%</div>
                  <div className="text-sm text-green-600">↗ +32pp growth</div>
                </div>
              </button>

              {/* Card 4: Engagement */}
              <button
                onClick={() => setSelectedMetric("engagement")}
                className={`rounded-lg p-5 transition-all text-left shadow-md ${
                  selectedMetric === "engagement"
                    ? "border-2 border-brand bg-brand/5 shadow-xl"
                    : "bg-white/90 backdrop-blur-sm hover:shadow-lg"
                }`}
              >
                <div className="flex flex-col h-full gap-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink/70">Engagement</p>
                    <FontAwesomeIcon icon={faClock} className={`size-5 ${selectedMetric === "engagement" ? "text-brand" : "text-ink/40"}`} />
                  </div>
                  <div className={`text-3xl font-bold ${selectedMetric === "engagement" ? "text-brand" : "text-ink"}`}>8-12 min</div>
                  <div className="text-sm text-green-600">↗ +3x growth</div>
                </div>
              </button>
            </div>

            {/* Dynamic Chart Section */}
            <div className="mt-8 rounded-lg p-8 bg-white/90 backdrop-blur-sm shadow-sm">
              <div className="space-y-6">
                {selectedMetric === "acquisition" && (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-ink">Monthly Acquisition Trend</h3>
                      <p className="text-sm text-ink/60">New student sign-ups by month (Nov 2024 - Nov 2025)</p>
                    </div>
                    
                    {/* Acquisition Bar Chart - SVG */}
                    <svg viewBox="0 0 1000 300" className="w-full h-64 rounded">
                      {/* Grid lines */}
                      {[0, 20, 40, 60, 80, 100].map((val) => (
                        <line
                          key={`grid-${val}`}
                          x1="60"
                          y1={300 - (val / 100) * 240 - 20}
                          x2="950"
                          y2={300 - (val / 100) * 240 - 20}
                          stroke="rgba(24, 3, 59, 0.1)"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Y-axis labels */}
                      {[0, 20, 40, 60, 80, 100].map((val) => (
                        <text
                          key={`label-${val}`}
                          x="50"
                          y={300 - (val / 100) * 240 - 15}
                          fontSize="11"
                          fill="rgba(24, 3, 59, 0.6)"
                          textAnchor="end"
                        >
                          {(val / 100) * 2100}
                        </text>
                      ))}

                      {/* Bars */}
                      {[
                        { month: "Nov", value: 650, x: 80 },
                        { month: "Dec", value: 700, x: 155 },
                        { month: "Jan", value: 1600, x: 230 },
                        { month: "Feb", value: 1900, x: 305 },
                        { month: "Mar", value: 2100, x: 380 },
                        { month: "Apr", value: 1900, x: 455 },
                        { month: "May", value: 850, x: 530 },
                        { month: "Jun", value: 750, x: 605 },
                        { month: "Jul", value: 600, x: 680 },
                        { month: "Aug", value: 500, x: 755 },
                        { month: "Sep", value: 450, x: 830 },
                        { month: "Oct", value: 400, x: 905 },
                      ].map((data, idx) => {
                        const barHeight = (data.value / 2100) * 240;
                        const yPos = 280 - barHeight;
                        return (
                          <g key={idx}>
                            <rect
                              x={data.x - 25}
                              y={yPos}
                              width="50"
                              height={barHeight}
                              fill="#7322FF"
                              rx="4"
                              opacity="0.9"
                            />
                            <text
                              x={data.x}
                              y="295"
                              fontSize="12"
                              fill="rgba(24, 3, 59, 0.6)"
                              textAnchor="middle"
                            >
                              {data.month}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                    <div className="text-center text-sm text-ink/60">Total: 12,400 sign-ups</div>
                  </>
                )}

                {selectedMetric === "retention" && (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-ink">Retention Growth Trend</h3>
                      <p className="text-sm text-ink/60">Day-7 retention rate progression over 12 months</p>
                    </div>
                    
                    {/* Retention Line Chart with Single Annotation */}
                    <svg viewBox="0 0 1000 420" className="w-full h-80 rounded">
                      {/* Grid lines - 0%, 10%, 20%, 30%, 40% */}
                      {[0, 10, 20, 30, 40].map((val) => (
                        <line
                          key={`grid-${val}`}
                          x1="80"
                          y1={360 - (val / 40) * 280}
                          x2="920"
                          y2={360 - (val / 40) * 280}
                          stroke="rgba(24, 3, 59, 0.08)"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Y-axis labels */}
                      {[0, 10, 20, 30, 40].map((val) => (
                        <text
                          key={`label-${val}`}
                          x="70"
                          y={365 - (val / 40) * 280}
                          fontSize="11"
                          fill="rgba(24, 3, 59, 0.5)"
                          textAnchor="end"
                          dominantBaseline="middle"
                        >
                          {val}%
                        </text>
                      ))}
                      
                      {/* Data: Nov 9%, Dec 11%, Jan 10%, Feb 8%, Mar 12%, Apr 10%, May 16%, Jun 21%, Jul 19%, Aug 27%, Sep 32%, Oct 37% */}
                      
                      {/* Grey line (before May) - showing the problem phase - curved */}
                      <path
                        d="M 90,297 Q 130,290 170,283 Q 210,290 250,290 Q 290,297 330,304 Q 370,290 410,276 Q 450,283 490,290"
                        fill="none"
                        stroke="rgba(24, 3, 59, 0.4)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Purple line (from May onwards) - showing improvement after AI Study Planner - curved */}
                      <path
                        d="M 490,290 Q 530,269 570,248 Q 610,230 650,213 Q 690,220 730,227 Q 770,199 810,171 Q 850,153 890,136 Q 930,118 970,101"
                        fill="none"
                        stroke="#7322FF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      
                      {/* Data points - all in purple */}
                      {[
                        { x: 90, y: 297, val: 9, month: "Nov 2024" },
                        { x: 170, y: 283, val: 11, month: "Dec 2024" },
                        { x: 250, y: 290, val: 10, month: "Jan 2025" },
                        { x: 330, y: 304, val: 8, month: "Feb 2025" },
                        { x: 410, y: 276, val: 12, month: "Mar 2025" },
                        { x: 490, y: 290, val: 10, month: "Apr 2025" },
                        { x: 570, y: 248, val: 16, month: "May 2025" },
                        { x: 650, y: 213, val: 21, month: "Jun 2025" },
                        { x: 730, y: 227, val: 19, month: "Jul 2025" },
                        { x: 810, y: 171, val: 27, month: "Aug 2025" },
                        { x: 890, y: 136, val: 32, month: "Sep 2025" },
                        { x: 970, y: 101, val: 37, month: "Oct 2025" },
                      ].map((point, idx) => (
                        <circle
                          key={idx}
                          cx={point.x}
                          cy={point.y}
                          r="4"
                          fill="#7322FF"
                          stroke="white"
                          strokeWidth="2"
                        />
                      ))}
                      
                      {/* Month labels */}
                      {[
                        { x: 90, label: "Nov" },
                        { x: 170, label: "Dec" },
                        { x: 250, label: "Jan" },
                        { x: 330, label: "Feb" },
                        { x: 410, label: "Mar" },
                        { x: 490, label: "Apr" },
                        { x: 570, label: "May" },
                        { x: 650, label: "Jun" },
                        { x: 730, label: "Jul" },
                        { x: 810, label: "Aug" },
                        { x: 890, label: "Sep" },
                        { x: 970, label: "Oct" },
                      ].map((point, idx) => (
                        <text
                          key={`month-${idx}`}
                          x={point.x}
                          y="385"
                          fontSize="11"
                          fill="rgba(24, 3, 59, 0.6)"
                          textAnchor="middle"
                        >
                          {point.label}
                        </text>
                      ))}
                      
                      {/* ANNOTATION: May - AI Study Planner Launched */}
                      <line x1="570" y1="248" x2="570" y2="150" stroke="rgba(115, 34, 255, 0.3)" strokeWidth="1" strokeDasharray="3,3" />
                      <rect x="495" y="115" width="150" height="33" fill="#7322FF" rx="4" opacity="0.15" />
                      <text x="570" y="130" fontSize="12" fontWeight="600" fill="#7322FF" textAnchor="middle">AI Study Planner</text>
                      <text x="570" y="143" fontSize="11" fontWeight="500" fill="#7322FF" textAnchor="middle">launched</text>
                    </svg>
                    
                    <div className="text-center space-y-1">
                      <div className="text-sm font-semibold text-ink">Day-7 retention: 9% → 37% (+28pp)</div>
                      <div className="text-sm text-ink/50">Illustrative monthly trend based on project outcome</div>
                    </div>
                  </>
                )}

                {selectedMetric === "on-time" && (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-ink">On-Time Completion Rate</h3>
                      <p className="text-sm text-ink/60">Percentage of personally-set sessions completed on time</p>
                    </div>
                    
                    {/* Horizontal Bar Chart - Two Periods Comparison */}
                    <div className="grid grid-cols-2 gap-6 px-4 py-6 rounded">
                      {/* Period 1: Nov 2024 - Apr 2025 */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-ink mb-3">Nov 2024 - Apr 2025</h4>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-ink">Completed</span>
                            <span className="text-sm font-bold text-brand">36%</span>
                          </div>
                          <div className="w-full h-5 bg-ink/10 rounded-full overflow-hidden">
                            <div className="h-full w-[36%] bg-brand rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-ink">Incomplete</span>
                            <span className="text-sm font-bold text-ink/60">64%</span>
                          </div>
                          <div className="w-full h-5 bg-ink/10 rounded-full overflow-hidden">
                            <div className="h-full w-[64%] bg-ink/40 rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      {/* Period 2: May 2025 - Oct 2025 */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-ink mb-3">May 2025 - Oct 2025</h4>
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-ink">Completed</span>
                            <span className="text-sm font-bold text-brand">68%</span>
                          </div>
                          <div className="w-full h-5 bg-ink/10 rounded-full overflow-hidden">
                            <div className="h-full w-[68%] bg-brand rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-ink">Incomplete</span>
                            <span className="text-sm font-bold text-ink/60">32%</span>
                          </div>
                          <div className="w-full h-5 bg-ink/10 rounded-full overflow-hidden">
                            <div className="h-full w-[32%] bg-ink/40 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-ink/60">+32pp improvement from previous period</div>
                  </>
                )}

                {selectedMetric === "engagement" && (
                  <>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-ink">Daily Engagement Time</h3>
                      <p className="text-sm text-ink/60">Average time spent learning per day</p>
                    </div>
                    
                    {/* Time Comparison Chart */}
                    <div className="grid grid-cols-2 gap-6 px-4 py-6 rounded">
                      {/* Before */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-ink mb-3">Nov 2024 - Apr 2025</h4>
                        <div className="bg-ink/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-ink/60 mb-1">&lt;3 min</div>
                          <p className="text-sm text-ink/50">per session</p>
                        </div>
                      </div>

                      {/* After */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-ink mb-3">May 2025 - Oct 2025</h4>
                        <div className="bg-brand/10 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-brand mb-1">8-12 min</div>
                          <p className="text-sm text-ink/50">per session</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Improvement indicator */}
                    <div className="text-center px-4">
                      <div className="text-3xl font-bold text-brand">+3x</div>
                      <p className="text-sm text-ink/60">Improvement in daily engagement time</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Note */}
            <div className="bg-ink/5 rounded-lg px-4 py-3">
              <p className="text-sm text-ink/60 font-medium">
                <strong>Note:</strong> The statistics above represent proportional data. This does not represent the real organizational data.
              </p>
            </div>
          </div>

          {/* Core Outcomes */}
          <div className="space-y-6 pt-6">
            <h2 className="text-xl font-semibold text-ink">Core Outcomes</h2>
            <div className="space-y-6">
              {/* Outcome 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faLightbulb} className="text-brand text-sm" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink mt-6 mb-3">Less planning, more learning</h3>
                  <p className="text-sm text-ink/60 mt-2">
                    Students no longer had to manually build a rigid timetable—the system helped translate their goals and availability into an achievable daily plan.
                  </p>
                </div>
              </div>

              {/* Outcome 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faCalendarDays} className="text-brand text-sm" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink mt-6 mb-3">Built for real student routines</h3>
                  <p className="text-sm text-ink/60 mt-2">
                    The experience accounted for <strong>school, tuition, personal time, exams, and changing schedules</strong>, making self-learning easier to sustain.
                  </p>
                </div>
              </div>

              {/* Outcome 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                  <FontAwesomeIcon icon={faFire} className="text-brand text-sm" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-ink mt-6 mb-3">From planning to habit</h3>
                  <p className="text-sm text-ink/60 mt-2">
                    Attendance and streak mechanics gave students a visible sense of consistency and a reason to return every day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* My Role */}
          <div className="space-y-6 pt-6">
            <h2 className="text-xl font-semibold text-ink">My Role</h2>
            
            <div className="flex gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
                <img src={sumansahuImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-ink mt-6 mb-3">Product Designer from Polynomial.ai | Product: Notesight</h3>
                <p className="text-sm text-ink/60">
                  I redesigned Notesight's study-planning experience from a rigid timetable into an adaptive AI companion that fits study into students' real lives, driving consistency and deeper engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 2: BUSINESS PROBLEM ===== */}
        <section id="business-problem" className="space-y-12 scroll-mt-8 mt-[120px]">
          <div>
            <h1 className="text-4xl font-bold text-ink mt-20 mb-8">Business Usecases </h1>
            <div className="relative pl-8 border-l-4 border-brand py-6">
              <h2 className="text-3xl font-bold text-ink leading-tight mt-12 mb-6">
                We brought students to Notesight, but <span className="text-brand">struggled to keep them learning.</span>
              </h2>
            </div>
          </div>

          {/* Three Problem & Target Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Retention */}
            <div 
              className="h-64 cursor-pointer"
              style={{
                perspective: '1000px',
              }}
              onClick={() => setFlippedCard(flippedCard === 'retention' ? null : 'retention')}
            >
              <div
                className="relative w-full h-full rounded-lg transition-transform duration-500 hover:shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === 'retention' ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  backgroundColor: flippedCard === 'retention' ? '#a855f7' : 'rgba(255, 255, 255, 0.9)',
                }}
                onMouseEnter={(e) => {
                  if (flippedCard !== 'retention') {
                    const heading = e.currentTarget.querySelector('.front-content h3') as HTMLElement;
                    const metrics = e.currentTarget.querySelectorAll('.front-content .text-3xl, .front-content .text-2xl') as NodeListOf<HTMLElement>;
                    if (heading) heading.style.color = '#a855f7';
                    metrics.forEach((m: HTMLElement) => m.style.color = '#a855f7');
                  }
                }}
                onMouseLeave={(e) => {
                  if (flippedCard !== 'retention') {
                    const heading = e.currentTarget.querySelector('.front-content h3') as HTMLElement;
                    const metrics = e.currentTarget.querySelectorAll('.front-content .text-3xl, .front-content .text-2xl') as NodeListOf<HTMLElement>;
                    if (heading) heading.style.color = 'inherit';
                    metrics.forEach((m: HTMLElement) => m.style.color = 'inherit');
                  }
                }}
              >
                {/* Front Side */}
                <div
                  className="front-content absolute w-full h-full rounded-lg bg-white/90 backdrop-blur-sm p-6 space-y-4 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div>
                    <div className="absolute top-4 right-4">
                      <FontAwesomeIcon icon={faInfoCircle} className="text-ink/40 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-ink transition-colors duration-300 mt-6 mb-3">Low Student Retention</h3>
                      <p className="text-sm text-ink/60">Only 1 in 10 students retained by Day 7</p>
                      <div className="text-3xl font-bold pt-2 transition-colors duration-300" style={{ color: 'inherit' }}>1 in 10</div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute w-full h-full rounded-lg p-6 space-y-2 flex flex-col justify-center bg-purple-500"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <h3 className="text-base font-semibold text-white">Critical Issue</h3>
                  <p className="text-xs text-white/90 leading-relaxed">
                    90% of users drop off by day 7. The app lacks strong enough value to keep users engaged.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Engagement */}
            <div 
              className="h-64 cursor-pointer"
              style={{
                perspective: '1000px',
              }}
              onClick={() => setFlippedCard(flippedCard === 'engagement' ? null : 'engagement')}
            >
              <div
                className="relative w-full h-full rounded-lg transition-transform duration-500 hover:shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === 'engagement' ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  backgroundColor: flippedCard === 'engagement' ? '#a855f7' : 'rgba(255, 255, 255, 0.9)',
                }}
                onMouseEnter={(e) => {
                  if (flippedCard !== 'engagement') {
                    const heading = e.currentTarget.querySelector('.front-content h3') as HTMLElement;
                    const metrics = e.currentTarget.querySelectorAll('.front-content .text-3xl, .front-content .text-2xl') as NodeListOf<HTMLElement>;
                    if (heading) heading.style.color = '#a855f7';
                    metrics.forEach((m: HTMLElement) => m.style.color = '#a855f7');
                  }
                }}
                onMouseLeave={(e) => {
                  if (flippedCard !== 'engagement') {
                    const heading = e.currentTarget.querySelector('.front-content h3') as HTMLElement;
                    const metrics = e.currentTarget.querySelectorAll('.front-content .text-3xl, .front-content .text-2xl') as NodeListOf<HTMLElement>;
                    if (heading) heading.style.color = 'inherit';
                    metrics.forEach((m: HTMLElement) => m.style.color = 'inherit');
                  }
                }}
              >
                {/* Front Side */}
                <div
                  className="front-content absolute w-full h-full rounded-lg bg-white/90 backdrop-blur-sm p-6 space-y-4 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div>
                    <div className="absolute top-4 right-4">
                      <FontAwesomeIcon icon={faInfoCircle} className="text-ink/40 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-ink transition-colors duration-300 mt-6 mb-3">Declining Engagement</h3>
                      <p className="text-sm text-ink/60">Average time fell below 3 minutes by Day 7</p>
                      <div className="text-3xl font-bold pt-2 transition-colors duration-300" style={{ color: 'inherit' }}>&lt;3 min</div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute w-full h-full rounded-lg p-6 space-y-2 flex flex-col justify-center bg-purple-500"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <h3 className="text-base font-semibold text-white">Engagement Crisis</h3>
                  <p className="text-xs text-white/90 leading-relaxed">
                    Session time drops below 3 min by day 7. Users aren't finding value in the app.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Re-engagement */}
            <div 
              className="h-64 cursor-pointer"
              style={{
                perspective: '1000px',
              }}
              onClick={() => setFlippedCard(flippedCard === 'sustainability' ? null : 'sustainability')}
            >
              <div
                className="relative w-full h-full rounded-lg transition-transform duration-500 hover:shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === 'sustainability' ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  backgroundColor: flippedCard === 'sustainability' ? '#a855f7' : 'rgba(255, 255, 255, 0.9)',
                }}
                onMouseEnter={(e) => {
                  if (flippedCard !== 'sustainability') {
                    const heading = e.currentTarget.querySelector('.front-content h3') as HTMLElement;
                    const metrics = e.currentTarget.querySelectorAll('.front-content .text-3xl, .front-content .text-2xl') as NodeListOf<HTMLElement>;
                    if (heading) heading.style.color = '#a855f7';
                    metrics.forEach((m: HTMLElement) => m.style.color = '#a855f7');
                  }
                }}
                onMouseLeave={(e) => {
                  if (flippedCard !== 'sustainability') {
                    const heading = e.currentTarget.querySelector('.front-content h3') as HTMLElement;
                    const metrics = e.currentTarget.querySelectorAll('.front-content .text-3xl, .front-content .text-2xl') as NodeListOf<HTMLElement>;
                    if (heading) heading.style.color = 'inherit';
                    metrics.forEach((m: HTMLElement) => m.style.color = 'inherit');
                  }
                }}
              >
                {/* Front Side */}
                <div
                  className="front-content absolute w-full h-full rounded-lg bg-white/90 backdrop-blur-sm p-6 space-y-4 flex flex-col justify-between"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <div>
                    <div className="absolute top-4 right-4">
                      <FontAwesomeIcon icon={faInfoCircle} className="text-ink/40 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-ink transition-colors duration-300 mt-6 mb-3">Engagement Sustainability</h3>
                      <div className="space-y-2 pt-1">
                        <div className="flex justify-between items-baseline">
                          <p className="text-sm text-ink/60">Self-Sustaining</p>
                          <div className="text-2xl font-bold pt-2 transition-colors duration-300" style={{ color: 'inherit' }}>3%</div>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <p className="text-sm text-ink/60">Re-engagement Dependent</p>
                          <div className="text-2xl font-bold pt-2 transition-colors duration-300" style={{ color: 'inherit' }}>97%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute w-full h-full rounded-lg p-6 space-y-2 flex flex-col justify-center bg-purple-500"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <h3 className="text-base font-semibold text-white">Low Retention</h3>
                  <p className="text-xs text-white/90 leading-relaxed">
                    97% need re-engagement prompts. Only 3% stay active naturally. Habit-forming features needed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Problems */}
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faClipboardList} className="text-brand text-sm" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink mt-6 mb-3">Planning Burden</h3>
                <p className="text-sm text-ink/60 mt-2">Students had to create and manage their own study schedules.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faLock} className="text-brand text-sm" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink mt-6 mb-3">Rigid Schedules</h3>
                <p className="text-sm text-ink/60 mt-2">Study plans didn't adapt to students' changing routines and commitments.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faHeartBroken} className="text-brand text-sm" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink mt-6 mb-3">Lack of Motivation</h3>
                <p className="text-sm text-ink/60 mt-2">The experience didn't provide enough motivation to build a consistent study habit.</p>
              </div>
            </div>
          </div>

          {/* Business Objectives */}
          <div className="space-y-8 pt-8">
            <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Business Objectives</h2>
            
            <div className="space-y-6">
              {/* Objective 1 */}
              <div className="rounded-lg bg-white/90 backdrop-blur-sm p-8 space-y-4 transition-all duration-300 hover:bg-white hover:shadow-lg" onMouseEnter={(e) => {
                const num = e.currentTarget.querySelector('.objective-number') as HTMLElement;
                if (num) num.style.color = '#a855f7';
              }} onMouseLeave={(e) => {
                const num = e.currentTarget.querySelector('.objective-number') as HTMLElement;
                if (num) num.style.color = 'inherit';
              }}>
                <div className="flex items-start gap-6">
                  <div className="objective-number text-7xl font-bold text-brand/30 transition-colors duration-300">01</div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-semibold text-ink mt-6 mb-3">Improve Retention</h3>
                    <p className="text-base text-ink/70">
                      Increase Day-7 retention from <strong>10% to 25%</strong> and build stronger long-term usage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Objective 2 */}
              <div className="rounded-lg bg-white/90 backdrop-blur-sm p-8 space-y-4 transition-all duration-300 hover:bg-white hover:shadow-lg" onMouseEnter={(e) => {
                const num = e.currentTarget.querySelector('.objective-number') as HTMLElement;
                if (num) num.style.color = '#a855f7';
              }} onMouseLeave={(e) => {
                const num = e.currentTarget.querySelector('.objective-number') as HTMLElement;
                if (num) num.style.color = 'inherit';
              }}>
                <div className="flex items-start gap-6">
                  <div className="objective-number text-7xl font-bold text-brand/30 transition-colors duration-300">02</div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-semibold text-ink mt-6 mb-3">Increase Learning Activity</h3>
                    <p className="text-base text-ink/70">
                      Drive <strong>20–30% higher engagement</strong> and increase meaningful AI learning interactions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Objective 3 */}
              <div className="rounded-lg bg-white/90 backdrop-blur-sm p-8 space-y-4 transition-all duration-300 hover:bg-white hover:shadow-lg" onMouseEnter={(e) => {
                const num = e.currentTarget.querySelector('.objective-number') as HTMLElement;
                if (num) num.style.color = '#a855f7';
              }} onMouseLeave={(e) => {
                const num = e.currentTarget.querySelector('.objective-number') as HTMLElement;
                if (num) num.style.color = 'inherit';
              }}>
                <div className="flex items-start gap-6">
                  <div className="objective-number text-7xl font-bold text-brand/30 transition-colors duration-300">03</div>
                  <div className="space-y-3 flex-1">
                    <h3 className="text-lg font-semibold text-ink mt-6 mb-3">Build Daily Usage</h3>
                    <p className="text-base text-ink/70">
                      Create a consistent daily learning habit through <strong>streaks and recurring study sessions</strong>, reducing dependence on external interventions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 3: USER PROBLEM ===== */}
        <section id="user-problem" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink mt-20 mb-8">User Problems</h1>
          
          {/* WHO ARE OUR STUDENTS SUBSECTION */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Who are our students?</h2>
              <p className="text-base text-ink/60 leading-relaxed">Notesight supports two types of learners — students preparing independently and students learning within a school, tutoring program or study group. While both have the same goal of exam success, their context, needs and behaviours are different.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Individual Learner Card */}
              <div className="px-8 pt-4 pb-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-ink mt-8 mb-4">Individual learner</h3>
                  <p className="text-sm text-ink/60">Preparing independently</p>
                </div>
                
                {/* Individual Learner Image */}
                <img src={individualLearnerImg} alt="Individual learner preparing independently" className="w-full h-48 rounded-lg object-cover border border-purple-200/50" />

                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm text-ink/70">Prepares for exams such as SAT, PSAT, ACT, AP, etc.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm text-ink/70">Manages their own study schedule</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm text-ink/70">Studies independently outside school</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm text-ink/70">Uses Notesight for planning, practice and progress</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm text-ink/70">Needs flexibility around school, activities and personal commitments</span>
                  </li>
                </ul>
              </div>

              {/* Group Learners Card */}
              <div className="px-8 pt-4 pb-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-ink mt-8 mb-4">Group of learners</h3>
                  <p className="text-sm text-ink/60">Study with a school, group or institution</p>
                </div>
                
                {/* Group Learners Image */}
                <img src={groupLearnerImg} alt="Group of learners preparing within a school or program" className="w-full h-48 rounded-lg object-cover border border-purple-200/50" />

                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm text-ink/70">Studies as part of a class, school or tutoring group</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm text-ink/70">Follows a shared curriculum or study schedule</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm text-ink/70">Learns alongside peers</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm text-ink/70">May receive guidance from teachers or tutors</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-sm text-ink/70">Uses Notesight for assignments, practice and progress</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* USER PERSONAS SUBSECTION */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Different learners. Real challenges.</h2>
              <p className="text-base text-ink/60">Students come to the platform with different goals, routines and obstacles.</p>
            </div>

            {/* Personas Carousel - Stacked Cards */}
            <div className="space-y-4">
              {/* Stacked Cards Container */}
              <div className="relative h-[350px]">
                {/* Persona 0: The Overwhelmed Planner */}
                {[
                  {
                    id: 0,
                    image: student1,
                    name: "The Overwhelmed Planner",
                    quote: "I know I need to study, but I don't know how to fit everything in.",
                    goals: [
                      "Plan what to study and when",
                      "Balance multiple subjects",
                      "Prepare for upcoming tests"
                    ],
                    painPoints: [
                      "Too many subjects to plan",
                      "Spends more time planning",
                      "Feels overwhelmed easily"
                    ]
                  },
                  {
                    id: 1,
                    image: student2,
                    name: "The Inconsistent Learner",
                    quote: "I start with motivation, but I can't keep the routine going.",
                    goals: [
                      "Build a regular study routine",
                      "Complete planned sessions",
                      "Get back on track after a pause"
                    ],
                    painPoints: [
                      "Loses motivation quickly",
                      "Misses sessions when busy",
                      "Hard to catch up once behind"
                    ]
                  },
                  {
                    id: 2,
                    image: student3,
                    name: "The Goal-Driven Achiever",
                    quote: "I know where I want to go. Help me get there efficiently.",
                    goals: [
                      "Prepare for a specific exam or goal",
                      "Focus on weak areas",
                      "Track progress toward their goal"
                    ],
                    painPoints: [
                      "Limited time to study",
                      "Unclear what to focus on now",
                      "Generic plans don't fit their goals"
                    ]
                  }
                ].map((persona) => {
                  const distance = (persona.id - currentPersona + 3) % 3;
                  const rotation = distance === 0 ? 0 : distance === 1 ? -3 : 3;
                  const offset = distance * 8;
                  
                  return (
                    <motion.div
                      key={persona.id}
                      className="absolute w-full h-full rounded-lg bg-white/90 backdrop-blur-sm p-6 overflow-y-auto flex flex-col justify-center"
                      animate={{
                        zIndex: 10 - distance,
                        y: offset,
                        scale: 1 - distance * 0.02,
                        rotate: rotation
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      style={{ transformOrigin: "center bottom" }}
                      onClick={() => setCurrentPersona(persona.id)}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto w-full">
                        <div className="space-y-2 flex flex-col items-center text-center">
                          <img src={persona.image} alt={persona.name} className="w-full max-w-56 h-auto rounded-full" />
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-ink mt-6 mb-3">{persona.name}</h3>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <p className="text-sm italic text-ink font-semibold bg-yellow-200/40 border-b-2 border-yellow-400 pb-1">"{ persona.quote}"</p>

                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-brand uppercase tracking-wide">Goals</p>
                            <ul className="space-y-1">
                              {persona.goals.map((goal, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-ink/70">
                                  <span className="text-brand">✓</span>
                                  <span>{goal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-red-500 uppercase tracking-wide">Pain points</p>
                            <ul className="space-y-1">
                              {persona.painPoints.map((point, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-ink/70">
                                  <span className="text-red-500">⚠</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Carousel Controls - Chevrons and Dots */}
              <div className="flex justify-center items-center gap-4 pt-6">
                {/* Left Chevron */}
                <button
                  onClick={() => setCurrentPersona((currentPersona - 1 + 3) % 3)}
                  className="p-2 bg-ink/5 hover:bg-ink/10 rounded-full transition-colors"
                  aria-label="Previous persona"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-ink/50 hover:text-ink/70" />
                </button>

                {/* Dot Indicators */}
                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPersona(index)}
                      className={`rounded-full transition-all duration-300 ${ 
                        currentPersona === index
                          ? "size-3 bg-brand"
                          : "size-2 bg-ink/30 hover:bg-ink/50"
                      }`}
                      aria-label={`Go to persona ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Right Chevron */}
                <button
                  onClick={() => setCurrentPersona((currentPersona + 1) % 3)}
                  className="p-2 bg-ink/5 hover:bg-ink/10 rounded-full transition-colors"
                  aria-label="Next persona"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-ink/50 hover:text-ink/70" />
                </button>
              </div>
            </div>

            {/* BEHAVIORAL SEGMENTATION SUBSECTION */}
            <div className="space-y-6 mt-12">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Behavioral Segmentation</h2>
                <p className="text-base text-ink/60">620 retained students show three distinct planning patterns.</p>
              </div>
              
              {/* Segmentation Table */}
              <div className="overflow-x-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-ink/20">
                      <th className="px-4 py-3 text-left font-semibold text-ink">Characteristics</th>
                      <th className="px-4 py-3 text-center font-semibold text-ink">
                        Long-horizon planners<br />
                        <span className="text-sm font-normal text-ink/60">137 • 22%</span>
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-ink">
                        Parallel planners<br />
                        <span className="text-sm font-normal text-ink/60">205 • 33%</span>
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-ink">
                        Realistic planners<br />
                        <span className="text-sm font-normal text-ink/60">278 • 45%</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-ink/10 hover:bg-ink/5 transition">
                      <td className="px-4 py-3 text-ink font-medium">Plans 7+ days ahead</td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faXmark} className="text-red-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faXmark} className="text-red-500 text-base" /></td>
                    </tr>
                    <tr className="border-b border-ink/10 hover:bg-ink/5 transition">
                      <td className="px-4 py-3 text-ink font-medium">Plans multiple subjects</td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                    </tr>
                    <tr className="border-b border-ink/10 hover:bg-ink/5 transition">
                      <td className="px-4 py-3 text-ink font-medium">Works in parallel</td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faXmark} className="text-red-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faXmark} className="text-red-500 text-base" /></td>
                    </tr>
                    <tr className="border-b border-ink/10 hover:bg-ink/5 transition">
                      <td className="px-4 py-3 text-ink font-medium">Plan matches capacity</td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faXmark} className="text-red-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                    </tr>
                    <tr className="border-b border-ink/10 hover:bg-ink/5 transition">
                      <td className="px-4 py-3 text-ink font-medium">Stays on track</td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faXmark} className="text-red-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                    </tr>
                    <tr className="border-b border-ink/10 hover:bg-ink/5 transition">
                      <td className="px-4 py-3 text-ink font-medium">Recovers after a miss</td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faXmark} className="text-red-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                      <td className="px-4 py-3 text-center"><FontAwesomeIcon icon={faCheck} className="text-green-500 text-base" /></td>
                    </tr>
                    <tr className="border-b border-ink/10 bg-ink/5">
                      <td className="px-4 py-3 text-ink font-semibold italic">Typical behaviour</td>
                      <td className="px-4 py-3 text-center text-sm text-ink/70">Plans far ahead, then struggles to execute</td>
                      <td className="px-4 py-3 text-center text-sm text-ink/70">Balances multiple subjects at once</td>
                      <td className="px-4 py-3 text-center text-sm text-ink/70">Plans realistically and adapts</td>
                    </tr>
                    <tr className="bg-brand/5">
                      <td className="px-4 py-3 text-ink font-semibold italic">Observed outcome</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-red-600">Higher drop-off</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-amber-600">Balanced engagement</td>
                      <td className="px-4 py-3 text-center text-sm font-medium text-green-600">Longer engagement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* KEY GAPS FOR LEARNERS SUBSECTION */}
            <div className="space-y-6 mt-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-ink mt-12 mb-6">5 key gaps for learners</h2>
                <p className="text-base text-ink/60">Students want to learn, but these behaviour patterns create friction in their journey.</p>
              </div>

              {/* 5 Key Gaps Grid with Horizontal Scroll */}
              <div className="relative">
                <div className="flex gap-6 overflow-x-auto pb-4" ref={scrollContainerRef}>
                  {/* Gap 1: Overplanning */}
                  <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold text-lg">01</div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-ink mt-6 mb-3">Overplanning</h3>
                      <p className="text-sm text-ink/60 min-h-[60px] line-clamp-3">Plan too far ahead and set unrealistic targets.</p>
                    </div>
                    <img src={persona1} alt="Overplanning persona" className="rounded-lg h-40 w-full object-cover" />
                    <p className="text-xs font-medium text-red-600 text-center">Overwhelmed planner</p>
                  </div>

                  {/* Gap 2: Poor Plan-Action Fit */}
                  <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 font-bold text-lg">02</div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-ink mt-6 mb-3">Poor Plan-Action Fit</h3>
                      <p className="text-sm text-ink/60 min-h-[60px] line-clamp-3">Planned workload doesn't match their actual capacity.</p>
                    </div>
                    <img src={persona2} alt="Poor Plan-Action Fit persona" className="rounded-lg h-40 w-full object-cover" />
                    <p className="text-xs font-medium text-amber-600 text-center">The Inconsistent Learner</p>
                  </div>

                  {/* Gap 3: Lack of Flexibility */}
                  <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg">03</div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-ink mt-6 mb-3">Lack of Flexibility</h3>
                      <p className="text-sm text-ink/60 min-h-[60px] line-clamp-3">Hard to adapt plans when subjects, priorities or schedules change.</p>
                    </div>
                    <img src={persona3} alt="Lack of Flexibility persona" className="rounded-lg h-40 w-full object-cover" />
                    <p className="text-xs font-medium text-blue-600 text-center">Overwhelmed planner</p>
                  </div>

                  {/* Gap 4: Weak Recovery */}
                  <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 font-bold text-lg">04</div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-ink mt-6 mb-3">Weak Recovery</h3>
                      <p className="text-sm text-ink/60 min-h-[60px] line-clamp-3">Missing a session often leads to falling behind and disengagement.</p>
                    </div>
                    <img src={persona4} alt="Weak Recovery persona" className="rounded-lg h-40 w-full object-cover" />
                    <p className="text-xs font-medium text-green-600 text-center">The Inconsistent Learner</p>
                  </div>

                  {/* Gap 5: Inconsistent Momentum */}
                  <div className="flex-shrink-0 w-64 bg-white rounded-xl shadow-sm p-6 space-y-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 font-bold text-lg">05</div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-ink mt-6 mb-3">Reduced Momentum</h3>
                      <p className="text-sm text-ink/60 min-h-[60px] line-clamp-3">Struggle to maintain a regular and sustained learning routine.</p>
                    </div>
                    <img src={persona5} alt="Inconsistent Momentum persona" className="rounded-lg h-40 w-full object-cover" />
                    <p className="text-xs font-medium text-purple-600 text-center">Realistic planners</p>
                  </div>
                </div>
                
                {/* Scroll Control Buttons */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-brand hover:text-white text-brand rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 z-10"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-brand hover:text-white text-brand rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-all duration-200 z-10"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SECTION 4: RESEARCH ===== */}
        <section id="research" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink mt-20 mb-8">Research</h1>
          
          {/* Subsection 1: Things to Know */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Things to Know</h2>
              <p className="text-base text-ink/60 leading-relaxed">Key questions to explore</p>
              <p className="text-sm text-ink/50 pt-1">To design a planning experience that truly works for students, we need to answer these questions through focused research with real users.</p>
            </div>

            {/* Research Questions - Simple List */}
            <div className="space-y-3">
              {/* Q1: Planning Fit */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">What makes a study plan realistic and adaptable to a student's everyday life?</p>
              </div>

              {/* Q2: Planning Effort */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">What makes planning difficult or time-consuming for students, and where could the experience provide more guidance?</p>
              </div>

              {/* Q3: Trust & Motivation */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">What influences a student's trust and confidence in a study plan?</p>
              </div>

              {/* Q4: Habit & Adoption */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">What factors influence students to develop and maintain a consistent study habit?</p>
              </div>

              {/* Q5: Progressive Learning */}
              <div className="py-3 px-0">
                <p className="text-base text-ink">How do students understand their progress toward a goal, and what helps them move forward?</p>
              </div>
            </div>
          </div>

          {/* Subsection 2: Primary Research - Tabbed Card */}
          <div>
            <h3 className="text-3xl font-bold text-ink mt-12 mb-6">Primary Research</h3>
            
            {/* Top Card: Tabs */}
              {/* Tab Navigation */}
            <div className="flex gap-3 mb-6 p-1.5 bg-ink/5 rounded-lg w-fit">
              <button
                onClick={() => setActiveResearchTab("findings")}
                className={`py-2.5 px-4 font-medium text-sm transition-all duration-300 flex items-center gap-2 rounded-md ${
                  activeResearchTab === "findings"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-ink/60 hover:text-ink/80 hover:bg-white/50"
                }`}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-sm" />
                <span>Findings</span>
              </button>
              <button
                onClick={() => setActiveResearchTab("method")}
                className={`py-2.5 px-4 font-medium text-sm transition-all duration-300 flex items-center gap-2 rounded-md ${
                  activeResearchTab === "method"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-ink/60 hover:text-ink/80 hover:bg-white/50"
                }`}
              >
                <FontAwesomeIcon icon={faFlask} className="text-sm" />
                <span>Method</span>
              </button>
              <button
                onClick={() => setActiveResearchTab("analysis")}
                className={`py-2.5 px-4 font-medium text-sm transition-all duration-300 flex items-center gap-2 rounded-md ${
                  activeResearchTab === "analysis"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-ink/60 hover:text-ink/80 hover:bg-white/50"
                }`}
              >
                <FontAwesomeIcon icon={faBrain} className="text-sm" />
                <span>Analysis</span>
              </button>
            </div>

            {/* Bottom Card: Content */}
            {activeResearchTab === "findings" && (
              <>
                {/* Top Block: Header */}
                <div className="px-8 pt-6 pb-4 rounded-t-xl bg-white">
                  <div className="space-y-0">
                    {/* Research Questions Selector */}
                    <div className="flex items-center justify-between gap-6">
                      <h4 className="text-lg font-semibold text-ink mt-6 mb-3">Research Findings</h4>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSelectedResearchQuestion(Math.max(0, selectedResearchQuestion - 1))}
                      disabled={selectedResearchQuestion === 0}
                      className="text-ink/40 hover:text-ink/60 disabled:opacity-50 transition-colors"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
                    </button>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map((idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedResearchQuestion(idx)}
                          className={`w-8 h-8 rounded-full font-bold text-xs transition-all duration-300 flex items-center justify-center ${
                            selectedResearchQuestion === idx
                              ? "bg-purple-600 text-white shadow-md"
                              : "bg-ink/5 text-ink/60 hover:bg-ink/10"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedResearchQuestion(Math.min(4, selectedResearchQuestion + 1))}
                      disabled={selectedResearchQuestion === 4}
                      className="text-ink/40 hover:text-ink/60 disabled:opacity-50 transition-colors"
                    >
                      <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
                    </button>
                  </div>
                </div>
                  </div>
                </div>

                {/* Bottom Block: Content */}
                <div className="p-8 rounded-b-xl bg-white h-[600px] overflow-y-auto">
                  <div className="space-y-4">
                    {/* Research Question Display */}
                <div className="pb-0">
                  <h3 className="text-xl font-bold text-ink mb-3">
                    {
                      [
                        "What makes a study plan realistic and adaptable to a student's everyday life?",
                        "What makes planning difficult or time-consuming for students, and where could the experience provide more guidance?",
                        "What influences a student's trust and confidence in a study plan?",
                        "What factors influence students to develop and maintain a consistent study habit?",
                        "How do students understand their progress toward a goal, and what helps them move forward?"
                      ][selectedResearchQuestion]
                    }
                  </h3>
                  <p className="text-base text-ink/60 leading-relaxed">
                    {
                      [
                        "Students shared what helps them create plans they can actually follow — and what gets in the way.",
                        "We learned where students struggle most with planning and what kind of support would help.",
                        "Trust is built on clear reasoning and the ability to maintain control over their plans.",
                        "Consistency comes from realistic expectations, recovery options, and meaningful feedback.",
                        "Students want forward-looking guidance that helps them move toward their goals, not just reviews of past work."
                      ][selectedResearchQuestion]
                    }
                  </p>
                </div>

                {/* Sticky Notes Insights */}
                <div className="grid grid-cols-4 gap-8">
                  {
                    [
                      [
                        { text: "Plans need to fit around school, extracurriculars and personal time." },
                        { text: "Students prefer flexibility to adjust when unexpected things come up." },
                        { text: "Smaller, achievable steps make the plan feel more realistic." },
                        { text: "Seeing a balance between study and other priorities is important." },
                        { text: "Clear time estimates help set realistic expectations." }
                      ],
                      [
                        { text: "Complex planning interfaces feel overwhelming to students." },
                        { text: "Manual entry of subjects and schedules is tedious and error-prone." },
                        { text: "Too many options can lead to decision paralysis." },
                        { text: "Lack of structure makes it hard to know where to start." },
                        { text: "Guided recommendations would help students create better plans faster." }
                      ],
                      [
                        { text: "Explaining the 'why' behind suggestions increases confidence." },
                        { text: "Students want AI suggestions, but the final decision is theirs." },
                        { text: "Transparent algorithms build more trust than 'black box' solutions." },
                        { text: "Proof through past success helps students believe in the plan." },
                        { text: "Personal customization shows that the tool understands their needs." }
                      ],
                      [
                        { text: "Realistic goals that are achievable build momentum and confidence." },
                        { text: "Recovery options help students stay engaged after missing a session." },
                        { text: "Regular reminders and nudges keep plans top-of-mind." },
                        { text: "Seeing progress, even small wins, motivates continued effort." },
                        { text: "Peer accountability and social features encourage habit formation." }
                      ],
                      [
                        { text: "Students want to know what to do next, not just what they've done." },
                        { text: "Forward-looking guidance helps them move toward goals faster." },
                        { text: "Visual progress trackers keep students motivated and focused." },
                        { text: "Celebrating milestones builds confidence in the learning journey." },
                        { text: "Personalized recommendations for next steps feel more helpful than generic reviews." }
                      ]
                    ][selectedResearchQuestion].map((insight, idx) => (
                      <div 
                        key={idx} 
                        className="relative bg-yellow-100 shadow-md hover:shadow-lg transition-all duration-300"
                        style={{
                          transform: `rotate(${idx % 2 === 0 ? -3 : 3}deg)`,
                          width: "170px",
                          height: "170px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "20px"
                        }}
                      >
                        {/* Pin */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-red-500" 
                          style={{
                            boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
                          }}
                        />
                        <p className="text-sm text-center text-ink leading-relaxed" style={{ fontFamily: "cursive", fontStyle: "italic" }}>
                          {insight.text}
                        </p>
                      </div>
                    ))
                  }
                </div>
                  </div>
                </div>
              </>
            )}

            {activeResearchTab === "method" && (
              <div className="p-8 rounded-xl bg-white">
                <div className="space-y-12">
                  <h4 className="text-lg font-semibold text-ink mt-6 mb-3">Research Methodology</h4>
                  
                  {/* Participant Info Header */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-0 divide-x divide-ink/10">
                      <div className="space-y-1 px-4 first:pl-0">
                        <p className="text-xs text-ink/60 font-semibold uppercase tracking-wide">Participants</p>
                        <p className="text-xl font-bold text-ink">12 students</p>
                      </div>
                      <div className="space-y-1 px-4">
                        <p className="text-xs text-ink/60 font-semibold uppercase tracking-wide">Age / Grade</p>
                        <p className="text-xl font-bold text-ink">14 - 18 years</p>
                        <p className="text-xs text-ink/60">High school</p>
                      </div>
                      <div className="space-y-1 px-4">
                        <p className="text-xs text-ink/60 font-semibold uppercase tracking-wide">Format</p>
                        <p className="text-xl font-bold text-ink">1:1 interviews</p>
                        <p className="text-xs text-ink/60">Online / In-person</p>
                      </div>
                      <div className="space-y-1 px-4">
                        <p className="text-xs text-ink/60 font-semibold uppercase tracking-wide">Duration</p>
                        <p className="text-xl font-bold text-ink">45 - 60 min</p>
                        <p className="text-xs text-ink/60">per session</p>
                      </div>
                    </div>
                  </div>

                  {/* Research Methods */}
                  <div className="space-y-8">
                    {/* Method 1: In-depth Interviews */}
                    <div className="space-y-4 pb-8 border-b border-ink/10">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-ink mt-6 mb-3">In-depth Interviews</h4>
                        <p className="text-base text-ink/60">Understand the "why"</p>
                      </div>
                      <p className="text-base text-ink/60 leading-relaxed">
                        We explored students' study habits, motivations, and planning challenges through direct conversations.
                      </p>
                      <ul className="space-y-2.5 text-base text-ink/70">
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                          How they currently plan their studies
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                          What makes a plan feel achievable
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                          Why they follow, change or abandon a plan
                        </li>
                      </ul>
                    </div>

                    {/* Method 2: Contextual Study */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-ink mt-6 mb-3">Contextual Study</h4>
                        <p className="text-base text-ink/60">Understand the "how"</p>
                      </div>
                      <p className="text-base text-ink/60 leading-relaxed">
                        We observed students in their real study environment to see how they create, use and adapt plans.
                      </p>
                      <ul className="space-y-2.5 text-base text-ink/70">
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                          How they create and use study plans
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                          How external commitments affect planning
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0"></span>
                          Where planning creates friction
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeResearchTab === "analysis" && (
              <div className="p-8 rounded-xl bg-white">
                <div className="space-y-10">
                  <h4 className="text-lg font-semibold text-ink mt-8 mb-6">Analysis & Insights</h4>
                  
                  {/* Research Question 1 */}
                  <div className="space-y-2 mt-8 mb-6">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleQuestion} className="text-purple-600 mt-1 flex-shrink-0" />
                      <h4 className="text-lg font-bold text-ink">What makes a study plan realistic and adaptable?</h4>
                    </div>
                    <p className="text-base text-ink/70 ml-7">Students plan around what they want to accomplish, but real-life constraints (sports, family, school events) determine what they can actually complete. They need planning that reflects their actual capacity and can accommodate changes without creating additional planning work.</p>
                  </div>

                  {/* Research Question 2 */}
                  <div className="space-y-2 mt-8 mb-6">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleQuestion} className="text-purple-600 mt-1 flex-shrink-0" />
                      <h4 className="text-lg font-bold text-ink">What makes planning difficult or time-consuming for students?</h4>
                    </div>
                    <p className="text-base text-ink/70 ml-7">The cognitive load of defining scope, estimating effort, and sequencing tasks causes students to either over-simplify or abandon planning. Students need guided, structured assistance in defining what to study, how much time each task requires, and how to sequence it logically.</p>
                  </div>

                  {/* Research Question 3 */}
                  <div className="space-y-2 mt-8 mb-6">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleQuestion} className="text-purple-600 mt-1 flex-shrink-0" />
                      <h4 className="text-lg font-bold text-ink">What influences a student's trust and confidence in a study plan?</h4>
                    </div>
                    <p className="text-base text-ink/70 ml-7">Trust is built through demonstrated feasibility and past success. Students need to understand the reasoning behind a plan and have early, visible signs that it's working to maintain commitment.</p>
                  </div>

                  {/* Research Question 4 */}
                  <div className="space-y-2 mt-8 mb-6">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleQuestion} className="text-purple-600 mt-1 flex-shrink-0" />
                      <h4 className="text-lg font-bold text-ink">What factors influence consistent study habits?</h4>
                    </div>
                    <p className="text-base text-ink/70 ml-7">Consistency depends on frequent, visible wins and clear recovery paths when disruptions occur. Students need achievable daily targets, progress visibility, and built-in recovery options when life interferes with their plans.</p>
                  </div>

                  {/* Research Question 5 */}
                  <div className="space-y-2 mt-8 mb-6">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleQuestion} className="text-purple-600 mt-1 flex-shrink-0" />
                      <h4 className="text-lg font-bold text-ink">How do students understand their progress toward a goal?</h4>
                    </div>
                    <p className="text-base text-ink/70 ml-7">Students conflate task completion with learning progress and lack forward-looking guidance on what to prioritize next. They need frameworks to interpret learning progress and guidance on what to focus on next, not just summaries of past activity.</p>
                  </div>

                  {/* Research Question 6 */}
                  <div className="space-y-2 mt-8 mb-6">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleQuestion} className="text-purple-600 mt-1 flex-shrink-0" />
                      <h4 className="text-lg font-bold text-ink">When plans change</h4>
                    </div>
                    <p className="text-base text-ink/70 ml-7">Students often skip, postpone, or rearrange tasks manually when their available time changes, lacking a structured way to adapt their plans dynamically.</p>
                  </div>

                  {/* Research Question 7 */}
                  <div className="space-y-2 mt-8 mb-6">
                    <div className="flex items-start gap-3">
                      <FontAwesomeIcon icon={faCircleQuestion} className="text-purple-600 mt-1 flex-shrink-0" />
                      <h4 className="text-lg font-bold text-ink">Deciding what to study next</h4>
                    </div>
                    <p className="text-base text-ink/70 ml-7">Students balance upcoming exams, unfinished work, difficult topics, and personal priorities when deciding what to study, but lack clear frameworks for prioritization.</p>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Subsection 2B: Key Takeaways from Primary Research */}
          <div className="space-y-6 mt-12 mb-16">
            <h3 className="text-3xl font-bold text-ink mt-12 mb-6">Key Research Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
                  <FontAwesomeIcon icon={faStar} className="text-white text-sm" />
                </div>
                <p className="text-base font-bold text-ink mb-2">Planning vs. Execution Gap</p>
                <p className="text-sm text-ink/70 leading-relaxed">Students' aspirations don't match their feasibility, causing repeated planning failures.</p>
              </div>
              <div className="relative p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
                  <FontAwesomeIcon icon={faStar} className="text-white text-sm" />
                </div>
                <p className="text-base font-bold text-ink mb-2">Absence of Self-Correction</p>
                <p className="text-sm text-ink/70 leading-relaxed">One missed session cascades into complete plan abandonment without recovery options.</p>
              </div>
              <div className="relative p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
                  <FontAwesomeIcon icon={faStar} className="text-white text-sm" />
                </div>
                <p className="text-base font-bold text-ink mb-2">Activity vs. Learning Confusion</p>
                <p className="text-sm text-ink/70 leading-relaxed">Students measure success by task completion and time spent, not actual learning.</p>
              </div>
              <div className="relative p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
                  <FontAwesomeIcon icon={faStar} className="text-white text-sm" />
                </div>
                <p className="text-base font-bold text-ink mb-2">Need for Transparency</p>
                <p className="text-sm text-ink/70 leading-relaxed">Students want to understand the reasoning behind plans, not receive rigid prescriptions.</p>
              </div>
              <div className="relative p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300">
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-md">
                  <FontAwesomeIcon icon={faStar} className="text-white text-sm" />
                </div>
                <p className="text-base font-bold text-ink mb-2">Forward-Looking Guidance</p>
                <p className="text-sm text-ink/70 leading-relaxed">Students need guidance on "what's next," not just reflection on what's been done.</p>
              </div>
            </div>
          </div>

          {/* Subsection 3: Secondary Research */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Secondary Research</h2>
              <p className="text-base text-ink/60 leading-relaxed">Analysis of existing products and solutions</p>
              <p className="text-sm text-ink/50 pt-1">Understanding how existing products address these questions helps us identify gaps and opportunities in the market.</p>
            </div>

            {/* Research Questions - Simple List */}
            <div className="space-y-3">
              {/* Q1 */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">How do existing products help students create study plans that are realistic and achievable?</p>
              </div>

              {/* Q2 */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">How do they help students adapt their plans when schedules or priorities change?</p>
              </div>

              {/* Q3 */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">How do they help students recover after missed or incomplete study sessions?</p>
              </div>

              {/* Q4 */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">How do they reduce the effort of planning through recommendations, automation, or intelligent suggestions?</p>
              </div>

              {/* Q5 */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">How do they build trust and transparency around their study recommendations?</p>
              </div>

              {/* Q6 */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">How do they motivate students to consistently follow their study plans and build learning habits?</p>
              </div>

              {/* Q7 */}
              <div className="py-3 px-0 border-b border-ink/5">
                <p className="text-base text-ink">How do they help students understand what to do next and make progress toward their goals?</p>
              </div>

              {/* Q8 */}
              <div className="py-3 px-0">
                <p className="text-base text-ink">How do they measure learning progress beyond task completion or time spent?</p>
              </div>
            </div>
          </div>

          {/* Subsection 3B: Competitive Analysis */}
          <div className="space-y-6 mt-12">
            <div>
              <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Competitive Analysis</h2>
              <p className="text-base text-ink/60 leading-relaxed">Understanding competitive landscape and feature comparison</p>
            </div>

            {/* Competitive Analysis Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[28%_1fr] gap-6">
              {/* Left Column: All Competitors Organized by Type */}
              <div className="space-y-6">
                {/* Direct Competitors */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase text-ink/60">Direct</p>
                  <div className="space-y-2">
                    {competitors.direct.map((competitor, idx) => (
                      <button
                        key={`direct-${idx}`}
                        onClick={() => {
                          setCompetitorType("direct");
                          setSelectedCompetitor(idx);
                        }}
                        className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                          competitorType === "direct" && selectedCompetitor === idx
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-white border border-ink/10 text-ink hover:border-purple-600/50 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {competitor.imagePath ? (
                            <img src={competitor.imagePath} alt={competitor.name} className="w-6 h-6 object-contain flex-shrink-0" />
                          ) : (
                            <span className="text-lg">{competitor.icon}</span>
                          )}
                          <span className="text-sm font-semibold">{competitor.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Indirect Competitors */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase text-ink/60">Indirect</p>
                  <div className="space-y-2">
                    {competitors.indirect.map((competitor, idx) => (
                      <button
                        key={`indirect-${idx}`}
                        onClick={() => {
                          setCompetitorType("indirect");
                          setSelectedCompetitor(idx);
                        }}
                        className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                          competitorType === "indirect" && selectedCompetitor === idx
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-white border border-ink/10 text-ink hover:border-purple-600/50 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {competitor.imagePath ? (
                            <img src={competitor.imagePath} alt={competitor.name} className="w-6 h-6 object-contain flex-shrink-0" />
                          ) : (
                            <span className="text-lg">{competitor.icon}</span>
                          )}
                          <span className="text-sm font-semibold">{competitor.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Competitor Details */}
              <div className="rounded-xl bg-white shadow-sm border border-ink/5 overflow-hidden">
                {(() => {
                  const competitor = competitors[competitorType][selectedCompetitor];
                  if (!competitor) return <div className="p-8">Select a competitor to view details</div>;
                  return (
                    <div className="space-y-0">
                      {/* Image Area */}
                      <div className="w-full h-48 bg-gradient-to-br from-purple-100/40 to-purple-50/40 flex items-center justify-center border-b border-ink/5">
                        {competitor.bannerPath ? (
                          <img src={competitor.bannerPath} alt={competitor.name} className="w-full h-full object-cover" />
                        ) : competitor.imagePath ? (
                          <img src={competitor.imagePath} alt={competitor.name} className="h-32 object-contain" />
                        ) : (
                          <span className="text-8xl opacity-20">{competitor.icon}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-8 space-y-6">
                        {/* Header */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            {competitor.imagePath ? (
                              <img src={competitor.imagePath} alt={competitor.name} className="w-16 h-16 object-contain" />
                            ) : (
                              <span className="text-4xl">{competitor.icon}</span>
                            )}
                            <div>
                              <h3 className="text-2xl font-bold text-ink">{competitor.name}</h3>
                              <p className="text-base text-ink/60">{competitor.description}</p>
                            </div>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-ink">Key Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {competitor.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <FontAwesomeIcon icon={faCheck} className="text-green-600 text-sm flex-shrink-0" />
                              <span className="text-sm text-ink/70">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strengths */}
                      <div className="space-y-3 p-4 rounded-lg bg-green-50/30 border border-green-100/40">
                        <h4 className="text-base font-semibold text-ink flex items-center gap-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                          Strengths
                        </h4>
                        <ul className="space-y-2">
                          {competitor.strengths.map((strength, idx) => (
                            <li key={idx} className="text-sm text-ink/70">• {strength}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Gaps */}
                      <div className="space-y-3 p-4 rounded-lg bg-red-50/30 border border-red-100/40">
                        <h4 className="text-base font-semibold text-ink flex items-center gap-2">
                          <FontAwesomeIcon icon={faHeartBroken} className="text-red-600" />
                          Gaps / Opportunities
                        </h4>
                        <ul className="space-y-2">
                          {competitor.gaps.map((gap, idx) => (
                            <li key={idx} className="text-sm text-ink/70">• {gap}</li>
                          ))}
                        </ul>
                      </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* ===== COMPETITIVE GAP MAP ===== */}
          <div className="space-y-6 mt-20">
            <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Competitive Gap Map</h2>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-8 mb-6 text-sm">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-lg" />
                <span className="text-ink">Strong capability</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCircle} className="text-yellow-500 text-base" />
                <span className="text-ink">Needs improvement</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleXmark} className="text-red-600 text-lg" />
                <span className="text-ink">Major gap</span>
              </div>
            </div>

            {/* Table - Slim & Professional */}
            <div className="overflow-x-auto border border-ink/10 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-ink/5 border-b border-ink/10">
                    <th className="px-3 py-2 text-left font-semibold text-ink">Capability</th>
                    <th className="px-3 py-2 text-center font-semibold text-ink">MyStudyLife</th>
                    <th className="px-3 py-2 text-center font-semibold text-ink">StudySmarter</th>
                    <th className="px-3 py-2 text-center font-semibold text-ink">Shovel</th>
                    <th className="px-3 py-2 text-center font-semibold text-ink">Fasti</th>
                    <th className="px-3 py-2 text-center font-semibold text-ink">NoteSight</th>
                    <th className="px-3 py-2 text-center font-semibold text-brand">Study Planner</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-ink/10 hover:bg-ink/2">
                    <td className="px-3 py-2 font-medium text-ink">Planning vs. Execution</td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCircle} className="text-yellow-500" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                  </tr>
                  <tr className="border-b border-ink/10 hover:bg-ink/2 bg-ink/1">
                    <td className="px-3 py-2 font-medium text-ink">Adaptive Recovery</td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCircle} className="text-yellow-500" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCircle} className="text-yellow-500" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCircleXmark} className="text-red-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                  </tr>
                  <tr className="border-b border-ink/10 hover:bg-ink/2">
                    <td className="px-3 py-2 font-medium text-ink">Learning Insights</td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCircle} className="text-yellow-500" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCircle} className="text-yellow-500" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCircle} className="text-yellow-500" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                  </tr>
                  <tr className="border-b border-ink/10 hover:bg-ink/2 bg-ink/1">
                    <td className="px-3 py-2 font-medium text-ink">Transparent Recommendations</td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCircle} className="text-yellow-500" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCircle} className="text-yellow-500" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-yellow-500" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                  </tr>
                  <tr className="hover:bg-ink/2">
                    <td className="px-3 py-2 font-medium text-ink">Forward Guidance</td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCircle} className="text-yellow-500" /></td>
                    <td className="px-3 py-2 text-center"><FontAwesomeIcon icon={faCheckCircle} className="text-green-600" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Subsection 4: Gaps and Opportunities */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Gaps and Opportunities</h2>
            
            {/* SWOT Bubble Diagram - Above Must Have/Should Have columns */}
            <div className="w-full flex justify-center py-4 px-4 relative">
              <SwotDiagram />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
              {/* GAPS Column */}
              <div className="space-y-6">
                <div className="pb-4 border-b-2 border-red-200">
                  <h3 className="text-2xl font-bold text-ink">Must Have</h3>
                  <p className="text-sm text-ink/60 mt-1">What is missing in the current study-planning experience</p>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">1. Planning doesn't translate into execution</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Students can create plans, but the plan often doesn't match their actual time, energy, or daily commitments.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">2. Plans don't self-correct</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">When students miss a session or fall behind, the plan doesn't intelligently recover. One missed session can create a cascade of unfinished work.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">3. Activity is mistaken for learning</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Students can see tasks completed, study time, or streaks, but these don't necessarily tell them <span className="font-medium text-ink">what they actually learned or where they still struggle</span>.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">4. Recommendations lack transparency</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Students receive schedules or recommendations, but don't always understand <span className="font-medium text-ink">why this task, topic, or time slot was chosen</span>.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">5. Students lack forward guidance</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Most experiences tell students what they've done or what's due. They provide less guidance around <span className="font-medium text-ink">what they should do next</span> based on their goals and progress.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">6. Planning itself becomes another task</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Students spend effort deciding what to study, when to study, and how to rearrange their schedule instead of spending that effort on learning.</p>
                  </div>
                </div>
              </div>

              {/* OPPORTUNITIES Column */}
              <div className="space-y-6">
                <div className="pb-4 border-b-2 border-green-200">
                  <h3 className="text-2xl font-bold text-ink">Should Have</h3>
                  <p className="text-sm text-ink/60 mt-1">Where Study Planner can create a better experience</p>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">7. Build plans around real capacity</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Create study plans based on <span className="font-medium text-ink">available time, commitments, priorities, and learning goals</span> rather than simply fitting tasks into a calendar.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">8. Make the plan adaptive</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Allow the plan to continuously respond to changes in <span className="font-medium text-ink">time, priorities, progress, and missed sessions</span>.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">9. Create a recovery loop</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Instead of treating a missed session as failure: <span className="font-medium text-ink">Miss → Understand → Rebalance → Continue</span>. The system should help students get back on track without rebuilding the plan themselves.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">10. Connect planning with learning</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Move beyond tracking activity by connecting <span className="font-medium text-ink">study sessions → learning progress → knowledge gaps → next actions</span>.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">11. Make AI recommendations explainable</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Give students simple reasons behind recommendations. This builds understanding and trust.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">12. Turn progress into the next action</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Don't just show students where they are. Tell them what comes next based on their progress and goals.</p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-ink text-base">13. Reduce the cognitive load of planning</h4>
                    <p className="text-sm text-ink/70 leading-relaxed">Students shouldn't have to constantly decide <span className="font-medium text-ink">what, when, how much, and what to move</span>. Study Planner can handle the complexity while keeping the student in control.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subsection 6: How Might We */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-ink mt-12 mb-6">How Might We</h2>
            <p className="text-base text-ink/60 leading-relaxed">
              Reframing research insights into design opportunities through problem-solving prompts...
            </p>
            <div className="pt-4">
              <div className="overflow-hidden rounded-xl border border-brand/10 shadow-sm">
                <table className="w-full">
                  <tbody>
                    {/* P0 - Row 1 */}
                    <tr className="hover:bg-brand/8 transition-colors duration-200">
                      <td className="w-20 bg-gradient-to-br from-brand/15 to-brand/10 p-6 text-center border-r border-brand/10">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-brand text-lg">P0</span>
                          <span className="text-xs text-brand/60 font-medium">Critical</span>
                        </div>
                      </td>
                      <td className="bg-white/80 p-6">
                        <p className="text-base text-ink font-medium leading-relaxed">How might we reduce the effort students spend deciding what to study and when to study it?</p>
                      </td>
                    </tr>
                    
                    {/* P0 - Row 2 */}
                    <tr className="hover:bg-brand/8 transition-colors duration-200 border-t border-brand/10">
                      <td className="w-20 bg-gradient-to-br from-brand/15 to-brand/10 p-6 text-center border-r border-brand/10">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-brand text-lg">P0</span>
                          <span className="text-xs text-brand/60 font-medium">Critical</span>
                        </div>
                      </td>
                      <td className="bg-white/80 p-6">
                        <p className="text-base text-ink font-medium leading-relaxed">How might we help students create study plans that better match their available time and daily commitments?</p>
                      </td>
                    </tr>
                    
                    {/* P0 - Row 3 */}
                    <tr className="hover:bg-brand/8 transition-colors duration-200 border-t border-brand/10">
                      <td className="w-20 bg-gradient-to-br from-brand/15 to-brand/10 p-6 text-center border-r border-brand/10">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-brand text-lg">P0</span>
                          <span className="text-xs text-brand/60 font-medium">Critical</span>
                        </div>
                      </td>
                      <td className="bg-white/80 p-6">
                        <p className="text-base text-ink font-medium leading-relaxed">How might we help students get back on track when they miss or fall behind on a planned study session?</p>
                      </td>
                    </tr>
                    
                    {/* P0 - Row 4 */}
                    <tr className="hover:bg-brand/8 transition-colors duration-200 border-t border-brand/10">
                      <td className="w-20 bg-gradient-to-br from-brand/15 to-brand/10 p-6 text-center border-r border-brand/10">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-brand text-lg">P0</span>
                          <span className="text-xs text-brand/60 font-medium">Critical</span>
                        </div>
                      </td>
                      <td className="bg-white/80 p-6">
                        <p className="text-base text-ink font-medium leading-relaxed">How might we make the next best study action clear to students at any point in their learning journey?</p>
                      </td>
                    </tr>
                    
                    {/* P1 - Row 5 */}
                    <tr className="hover:bg-slate-50 transition-colors duration-200 border-t border-brand/10">
                      <td className="w-20 bg-slate-50 p-6 text-center border-r border-slate-200">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-slate-400 text-lg">P1</span>
                          <span className="text-xs text-slate-400 font-medium">Important</span>
                        </div>
                      </td>
                      <td className="bg-white p-6">
                        <p className="text-base text-ink font-medium leading-relaxed">How might we make study plans continuously adapt to changes in a student's time, priorities, progress, and commitments?</p>
                      </td>
                    </tr>
                    
                    {/* P1 - Row 6 */}
                    <tr className="hover:bg-slate-50 transition-colors duration-200 border-t border-brand/10">
                      <td className="w-20 bg-slate-50 p-6 text-center border-r border-slate-200">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-slate-400 text-lg">P1</span>
                          <span className="text-xs text-slate-400 font-medium">Important</span>
                        </div>
                      </td>
                      <td className="bg-white p-6">
                        <p className="text-base text-ink font-medium leading-relaxed">How might we use learning progress and knowledge gaps to determine what students should study next?</p>
                      </td>
                    </tr>
                    
                    {/* P1 - Row 7 */}
                    <tr className="hover:bg-slate-50 transition-colors duration-200 border-t border-brand/10">
                      <td className="w-20 bg-slate-50 p-6 text-center border-r border-slate-200">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-slate-400 text-lg">P1</span>
                          <span className="text-xs text-slate-400 font-medium">Important</span>
                        </div>
                      </td>
                      <td className="bg-white p-6">
                        <p className="text-base text-ink font-medium leading-relaxed">How might we help students understand why a study recommendation is being made so they can confidently act on it?</p>
                      </td>
                    </tr>
                    
                    {/* P1 - Row 8 */}
                    <tr className="hover:bg-slate-50 transition-colors duration-200 border-t border-brand/10">
                      <td className="w-20 bg-slate-50 p-6 text-center border-r border-slate-200">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-bold text-slate-400 text-lg">P1</span>
                          <span className="text-xs text-slate-400 font-medium">Important</span>
                        </div>
                      </td>
                      <td className="bg-white p-6">
                        <p className="text-base text-ink font-medium leading-relaxed">How might we make falling behind a recoverable part of the learning journey rather than a reason to abandon the plan?</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        
        {/* ===== SECTION 5: DESIGN STRATEGY ===== */}
        <section id="design-strategy" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink mt-20 mb-8">Design Strategy</h1>
          <p className="text-base text-ink/60">Content coming soon...</p>
        </section>

        {/* ===== SECTION 6: SOLUTION ===== */}
        <section id="solution" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink mt-20 mb-8">Solution</h1>
          <p className="text-base text-ink/60">Content coming soon...</p>
        </section>

        {/* ===== SECTION 7: VALIDATION ===== */}
        <section id="validation" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink mt-20 mb-8">Validation</h1>
          <p className="text-base text-ink/60">Content coming soon...</p>
        </section>

        {/* ===== SECTION 8: IMPACT ===== */}
        <section id="impact" className="space-y-8 scroll-mt-8 mt-[120px]">
          <h1 className="text-4xl font-bold text-ink mt-20 mb-8">Impact</h1>
          <p className="text-base text-ink/60">Content coming soon...</p>
        </section>

        </div>
      </div>
    </>
  );
}
