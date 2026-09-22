import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data";
import { useState, useRef } from "react";
import ProjectDetailFullContent from "./ProjectDetailFullContent";
import video1 from "../imports/Main/1.mp4";
import video2 from "../imports/Main/2.mp4";
import video3 from "../imports/Main/3.mp4";
import video4 from "../imports/Main/4.mp4";

// Map content indices to section IDs
const sectionIds = [
  "project-summary",
  "business-problem",
  "user-problem",
  "research",
  "design-strategy",
  "solution",
  "validation",
  "impact",
];

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

function VideoBackground({ projectIndex }: { projectIndex: number }) {
  const videos = [video1, video2, video3, video4];
  const videoSrc = videos[projectIndex % videos.length];

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const contentPanelRef = useRef<HTMLDivElement>(null);

  const project = projects.find((p) => p.id === projectId);

  // Scroll to section when menu item is clicked
  const scrollToSection = (index: number) => {
    setActiveContent(index);
    const sectionId = sectionIds[index];
    const element = contentPanelRef.current?.querySelector(`#${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handle scroll to update active section indicator
  const handleScroll = () => {
    if (!contentPanelRef.current) return;

    const scrollPosition = contentPanelRef.current.scrollTop + 100; // Add offset for header

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const sectionId = sectionIds[i];
      const element = contentPanelRef.current.querySelector(`#${sectionId}`);
      if (element) {
        const elementPosition = (element as HTMLElement).offsetTop;
        if (scrollPosition >= elementPosition) {
          setActiveContent(i);
          break;
        }
      }
    }
  };

  if (!project) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-canvas flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ink mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-600"
          >
            Back to Projects
          </button>
        </div>
      </section>
    );
  }

  const projectIndex = projects.findIndex((p) => p.id === projectId);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-canvas">
      {/* warm + lime glows */}
      <div className="pointer-events-none absolute -left-32 top-4 size-[620px] rounded-full bg-[#fffcf4] blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -top-28 size-[440px] rounded-full bg-lime opacity-20 blur-[70px]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1920px] grid-cols-1 lg:grid-cols-[minmax(360px,32%)_1fr]" style={{
        gridTemplateColumns: isSidebarCollapsed ? 'minmax(56px, 56px) 1fr' : undefined,
        transition: 'grid-template-columns 500ms ease-in-out'
      }}>
        {/* ---- sidebar nav ---- */}
        <div 
          className="relative flex flex-col gap-10 overflow-hidden lg:max-h-screen overflow-y-auto"
          style={{
            boxShadow: "12px 0 24px rgba(0, 0, 0, 0.08)",
            paddingLeft: isSidebarCollapsed ? '8px' : undefined,
            paddingRight: isSidebarCollapsed ? '8px' : undefined,
            width: isSidebarCollapsed ? '56px' : 'auto',
            transition: 'width 500ms ease-in-out, padding 500ms ease-in-out',
            backgroundColor: isSidebarCollapsed ? 'rgba(255, 255, 255, 0.95)' : 'transparent'
          }}
        >
          {/* Expanded State */}
          {!isSidebarCollapsed && (
            <div className="px-8 py-12 lg:px-16 lg:py-20 flex flex-col gap-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/projects")}
                  aria-label="Back to projects"
                  className="group flex size-16 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <ArrowForward className="size-6 rotate-180 transition-transform duration-300 group-hover:rotate-135" />
                </button>
                <div className="flex flex-col">
                  <span className="text-lg font-medium text-ink/60 flex items-center gap-2">
                    <button
                      onClick={() => navigate("/")}
                      className="inline-block size-2 rounded-full bg-ink/30 hover:bg-brand transition-colors flex-shrink-0 cursor-pointer"
                      aria-label="Go to Home"
                    />
                    <button
                      onClick={() => navigate("/projects")}
                      className="inline-block size-2 rounded-full bg-ink/30 hover:bg-brand transition-colors flex-shrink-0 cursor-pointer"
                      aria-label="Go to Projects"
                    />
                    <span className="text-brand">{project.word}</span>
                  </span>
                </div>
              </div>

              {/* Project Title */}
              <h2 className="text-[clamp(18px,2vw,24px)] font-semibold leading-tight text-ink">
                {project.title}
              </h2>

              {/* Content Menu */}
              <nav className="flex flex-col gap-5 pt-4 lg:gap-8 lg:pt-5">
                {project.contents.map((content, index) => (
                  <button
                    key={content.id}
                    onClick={() => scrollToSection(index)}
                    className="group flex flex-col items-start text-left"
                  >
                    <div className="flex items-end gap-3">
                      <span
                        className={`font-semibold leading-none transition-all duration-300 ${
                          index === activeContent
                            ? "text-[clamp(22px,2.5vw,32px)] text-ink"
                            : "text-[clamp(18px,2vw,24px)] text-ink/50 group-hover:text-ink"
                        }`}
                      >
                        {content.label}
                      </span>
                      {index === activeContent && (
                        <span className="mb-2 block rounded-full transition-all duration-300 size-2.5 bg-brand" />
                      )}
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Collapsed State - Back Button & Dots */}
          {isSidebarCollapsed && (
            <div className="flex flex-col items-center gap-6 py-12 w-full">
              {/* Collapsed Back Button */}
              <button
                onClick={() => navigate("/projects")}
                aria-label="Back to projects"
                className="group flex size-10 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white"
              >
                <ArrowForward className="size-4 rotate-180 transition-transform duration-300 group-hover:rotate-135" />
              </button>

              {/* Section Dots Navigation */}
              <nav className="flex flex-col items-center gap-3">
                {project.contents.map((content, index) => (
                  <button
                    key={content.id}
                    onClick={() => scrollToSection(index)}
                    aria-label={`Go to ${content.label}`}
                    className="group flex items-center justify-center transition-all duration-300"
                  >
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        index === activeContent
                          ? "size-3 bg-brand"
                          : "size-2 bg-ink/30 group-hover:bg-ink/50"
                      }`}
                    />
                  </button>
                ))}
              </nav>
            </div>
          )}

          {/* Toggle Button - Overlaid on Sidebar */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute z-50 w-6 h-12 bg-white border border-ink/10 flex items-center justify-center hover:bg-brand hover:text-white"
            style={{
              transition: 'all 500ms ease-in-out',
              top: 'calc(45vh + 100px - 2rem)',
              right: '0px'
            }}
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className={`w-4 h-4 ${isSidebarCollapsed ? 'rotate-180' : ''}`}
              style={{
                transition: 'transform 500ms ease-in-out'
              }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
        </div>

        {/* ---- content panel ---- */}
        <div 
          ref={contentPanelRef}
          onScroll={handleScroll}
          className="relative min-h-[70vh] overflow-y-auto lg:max-h-screen lg:min-h-screen bg-gray-100/50"
        >
          <ProjectDetailFullContent projectId={projectId} project={project} />
        </div>
      </div>
    </section>
  );
}
