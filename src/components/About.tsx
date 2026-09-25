import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faLocationDot,
  faGraduationCap,
  faBuilding,
  faUniversity,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { workExperience, education } from "../data";
import awardImage from "../imports/about_page/award_video.mp4";
import JourneyCarousel from "./JourneyCarousel";

function ArrowForward({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path
        d="M16 25.333 14.133 23.4l6-6H6.667v-2.8H20.133l-6-6L16 6.667 25.333 16 16 25.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

const sections = [
  { id: "summary", label: "Summary" },
  { id: "work-experience", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
] as const;

type SectionId = (typeof sections)[number]["id"];

function WorkExperienceSection() {
  return (
    <div className="space-y-16">
      <p className="text-xs font-medium uppercase tracking-wide text-ink/60">
        Work Experience
      </p>
      <div className="space-y-8">
        {workExperience.map((exp, i) => (
          <div key={exp.id} className="relative flex gap-6">
            <div className="flex flex-col items-center">
              <span className="mt-2 size-3.5 shrink-0 rounded-full bg-brand" />
              {i < workExperience.length - 1 && (
                <span className="mt-2 w-px flex-1 bg-ink/10" />
              )}
            </div>
            <div className="flex-1 space-y-3 rounded-lg border border-ink/10 bg-white/50 p-6 backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-ink">
                  {exp.role} · <span className="text-brand">{exp.company}</span>
                </h3>
                <span className="text-xs font-medium text-ink/50">
                  {exp.duration}
                </span>
              </div>
              <p className="flex items-center gap-2 text-xs text-ink/50">
                <FontAwesomeIcon icon={faLocationDot} className="size-3" />
                {exp.location}
              </p>
              <ul className="space-y-2 pt-1">
                {exp.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-ink/70">
                    <span className="mt-0.5 text-brand">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationSection() {
  return (
    <div className="space-y-8">
      {/* Education Cards Grid */}
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="rounded-[28px] overflow-hidden bg-[#F9F4EA] shadow-sm"
          >
            {/* Image Container */}
            {edu.image && (
              <div className="relative h-[500px] w-full overflow-hidden bg-[#F9F4EA]">
                <img
                  src={edu.image}
                  alt={edu.degree}
                  className="h-full w-full object-cover"
                />
                {/* Color overlay for consistency */}
                <div className="absolute inset-0 bg-[#F9F4EA] opacity-10 mix-blend-multiply" />
              </div>
            )}

            {/* Content Container */}
            <div className="space-y-6 px-10 pb-12 pt-8">
              {/* Date with accent line */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#555263]">
                  {edu.duration}
                </p>
                <div className="w-6 h-0.5 bg-[#6E56CF]" />
              </div>

              {/* Degree Title - Using Poppins (consistent with design) */}
              <h3 className="text-xl font-bold leading-tight text-[#1A1625]">
                {edu.degree}
              </h3>

              {/* Institution with Icon */}
              <div className="flex items-center gap-2">
                <FontAwesomeIcon 
                  icon={edu.institution === "Self-directed" ? faPen : faUniversity} 
                  className="w-3.5 h-3.5 text-[#6E56CF]" 
                />
                <p className="text-sm font-medium text-[#6E56CF]">
                  {edu.institution}
                </p>
              </div>

              {/* Description */}
              <p className="text-base leading-relaxed text-[#555263]">
                {edu.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsSection() {
  return (
    <div className="absolute inset-0 -m-0 h-full w-full overflow-hidden">
      <video src={awardImage} className="h-full w-full object-cover" autoPlay loop muted style={{ objectPosition: "left center" }} />
      
      {/* Award Description Card */}
      <div className="absolute inset-0 flex items-end justify-start p-8 sm:p-12">
        <div className="w-fit space-y-3 rounded-lg bg-white/80 px-6 py-4">
          <h3 className="inline-block border-b-4 border-brand pb-2 text-[clamp(24px,3vw,40px)] font-semibold leading-tight text-ink drop-shadow-lg">
            Service Award
          </h3>
          <p className="max-w-lg text-base leading-relaxed text-ink/70 drop-shadow-md">
            Recognized for outstanding contribution and innovation in product design and user experience excellence.
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionContent({ sectionId }: { sectionId: SectionId }) {
  switch (sectionId) {
    case "work-experience":
      return <WorkExperienceSection />;
    case "education":
      return <EducationSection />;
    case "achievements":
      return <AchievementsSection />;
    default:
      return null;
  }
}

function DownloadResumeButton() {
  return (
    <a
      href="/resume.pdf"
      download
      className="group relative flex h-[56px] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-brand text-white transition-colors hover:bg-brand-600"
    >
      <FontAwesomeIcon
        icon={faDownload}
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      <span className="text-[16px] font-semibold leading-none">
        Download Resume
      </span>
    </a>
  );
}

export default function About() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<SectionId>("summary");

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-canvas">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -left-32 top-4 size-[620px] rounded-full bg-[#fffcf4] blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -top-28 size-[440px] rounded-full bg-lime opacity-20 blur-[70px]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1920px] grid-cols-1 lg:grid-cols-[minmax(360px,32%)_1fr]">
        {/* ---- sidebar nav ---- */}
        <div className="flex flex-col gap-10 px-8 py-12 -mt-10 lg:max-h-screen lg:px-16 lg:py-20 lg:-mt-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="group flex size-12 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white"
            >
              <ArrowForward className="size-5 rotate-180 transition-transform duration-300 group-hover:rotate-135" />
            </button>
            <span className="text-sm font-medium text-ink/60">My Journey</span>
          </div>

          <nav className="flex flex-col gap-8 pt-4 lg:gap-10 lg:pt-5">
            {sections.map((section) => {
              const isActive = section.id === activeSection;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className="group flex items-center gap-3 text-left"
                >
                  <span
                    className={`font-semibold leading-none transition-all duration-300 ${
                      isActive
                        ? "text-[clamp(28px,3vw,40px)] text-ink"
                        : "text-[clamp(20px,2.2vw,28px)] text-ink/50 group-hover:text-ink"
                    }`}
                  >
                    {section.label}
                  </span>
                  {isActive && (
                    <span className="block size-2.5 shrink-0 rounded-full bg-brand" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-10">
            <DownloadResumeButton />
          </div>
        </div>

        {/* ---- content panel ---- */}
        <div className="relative min-h-[70vh] overflow-hidden lg:max-h-screen lg:min-h-screen">
          <AnimatePresence mode="wait">
            {activeSection === "summary" ? (
              <motion.div
                key="summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <JourneyCarousel />
              </motion.div>
            ) : (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col overflow-y-auto bg-gray-100/50 px-8 py-12 lg:px-16 lg:py-20"
              >
                <SectionContent sectionId={activeSection} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
