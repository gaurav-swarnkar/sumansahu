import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMobileAlt, faDesktop, faChevronDown, faExpand, faMoon, faSun, faPalette, faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, type ComponentType } from "react";
import type { Project } from "../data/projects";
import walkthroughVideo from "../assets/videos/projects/study-planner/walkthrough.mp4";
import ProjectMockup, { FitGraphic } from "./ProjectMockups";
import { projectBackgrounds } from "../data/projectThemes";
import StudyPlanner from "../pages/projects/StudyPlanner";
import TruckFill from "../pages/projects/TruckFill";
import RecipeStock from "../pages/projects/RecipeStock";
import BrandExperience from "../pages/projects/BrandExperience";
import DesignSystems from "../pages/projects/DesignSystems";

/*
 * The shared frame of every project page: banner, Watch / Experience buttons and
 * their pop-ups, then the project's own case study from src/pages/projects/.
 * To add a project page: create it in src/pages/projects/ and add it to caseStudies below.
 */
const caseStudies: Record<string, ComponentType> = {
  "study-planner": StudyPlanner,
  "truck-fill": TruckFill,
  "recipe-stock": RecipeStock,
  "brand-experience": BrandExperience,
  "design-systems": DesignSystems,
};

interface ProjectDetailFullContentProps {
  projectId?: string;
  project?: Project;
  /** Breadcrumb shown inside the banner on mobile (the sidebar is hidden there). */
  mobileNav?: React.ReactNode;
  /** Section tabs shown under the banner on mobile; they stick to the top while scrolling. */
  stickyTabs?: React.ReactNode;
}

export default function ProjectDetailFullContent({ projectId, project, mobileNav, stickyTabs }: ProjectDetailFullContentProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");
  const [, setSelectedJourney] = useState<string>("0");
  const [expandedJourney, setExpandedJourney] = useState<string | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidePanelCollapsed, setIsSidePanelCollapsed] = useState(false);
  const [backgroundTheme, setBackgroundTheme] = useState<"light" | "dark">("light");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  
  
  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);
  

  // Map experience sub-items to their URLs
  const getExperienceUrl = (subItemId: string | null): string => {
    // Map of sub-item IDs to their experience URLs
    const urlMap: { [key: string]: string } = {
      // Study Planner - Before flows
      "before-1-1": `${import.meta.env.BASE_URL}prototypes/study-planner-old.html`, // Plan > First Time User
      "before-1-2": "https://www.sumansahu.in", // Plan > Returning User
      "before-2-1": "https://www.sumansahu.in", // Acknowledgement > Mobile Notification
      "before-2-2": "https://www.sumansahu.in", // Acknowledgement > Email Notification
      "before-3-1": "https://www.sumansahu.in", // Access > From Dashboard
      "before-3-2": "https://www.sumansahu.in", // Access > From Calendar
      "before-4-1": "https://www.sumansahu.in", // Revoke > From Calendar
      
      // Study Planner - After flows
      "after-1-1": `${import.meta.env.BASE_URL}prototypes/study-planner-old.html`, // Plan > First Time User
      "after-1-2": "https://www.sumansahu.in", // Plan > Returning User
      "after-2-1": "https://www.sumansahu.in", // Acknowledgement > Mobile Notification
      "after-2-2": "https://www.sumansahu.in", // Acknowledgement > Email Notification
      "after-3-1": "https://www.sumansahu.in", // Access > From Dashboard
      "after-3-2": "https://www.sumansahu.in", // Access > From Calendar
      "after-4-1": "https://www.sumansahu.in", // Revoke > From Calendar
    };
    
    // Return the mapped URL or default to the portfolio site
    return subItemId && urlMap[subItemId] ? urlMap[subItemId] : "https://www.sumansahu.in";
  };
  

  // Video shown by the Watch button.
  const videoSrc = walkthroughVideo;

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=pan_tool_alt" />
      {/* ===== TOP BANNER ===== */}
      <div
        className={`relative w-full overflow-hidden ${project?.panel ?? "bg-brand"}`}
        style={{ backgroundImage: project ? projectBackgrounds[project.id] : undefined }}
      >
        {/* soft glow behind the graphic */}
        <div className="pointer-events-none absolute -right-20 bottom-0 size-[420px] rounded-full bg-white/10 blur-[110px]" />

        {/* Same centred column as the content below (outer padding + max-w-4xl) */}
        <div className="relative px-4 lg:px-7">
        {mobileNav && <div className="mx-auto max-w-4xl pt-4 lg:hidden">{mobileNav}</div>}
        {project?.bannerImage ? (
          /* Minimal banner: title on the left, product image on the right */
          <div className="mx-auto grid w-full max-w-6xl items-center gap-4 pb-6 pt-4 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] sm:gap-6 lg:py-8">
            <h1 className="max-w-[14ch] text-[clamp(26px,2.8vw,42px)] font-semibold leading-[1.1] text-white">
              {project.title}
            </h1>
            {/* fixed aspect box so the layout never jumps; shimmer shows until the image loads */}
            <div className="relative w-full" style={{ aspectRatio: "1222 / 695" }}>
              {!bannerLoaded && <div className="skeleton-shimmer absolute inset-[4%] rounded-3xl" aria-hidden="true" />}
              <img
                src={project.bannerImage}
                alt=""
                aria-hidden="true"
                onLoad={() => setBannerLoaded(true)}
                ref={(el) => {
                  if (el?.complete && el.naturalWidth > 0 && !bannerLoaded) setBannerLoaded(true);
                }}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 drop-shadow-[0_20px_40px_rgba(24,3,59,0.35)] ${bannerLoaded ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </div>
        ) : (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 pb-6 pt-6 sm:flex-row sm:items-center sm:gap-8 lg:pt-12 lg:pb-10">
          {/* Title block */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {project && (
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-sm">
                {project.eyebrow} · {project.word}
              </p>
            )}
            <h1 className="max-w-[22ch] text-[clamp(26px,3.2vw,44px)] font-semibold leading-[1.1] text-white">
              {project?.title}
            </h1>
            {project && project.pills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.pills.map((pill) => (
                  <span
                    key={pill}
                    className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm lg:text-sm"
                  >
                    <svg viewBox="0 0 28 28" className="size-3.5 shrink-0" fill="none" aria-hidden="true">
                      <path d="M13 2 5 15h6l-2 11 10-14h-7l3-10z" fill="currentColor" />
                    </svg>
                    {pill}
                  </span>
                ))}
              </div>
            )}

          </div>

          {/* Project graphic */}
          {project && (
            project.cover ? (
              <img src={project.cover} alt={project.title} className="hidden h-[200px] shrink-0 rounded-2xl object-contain sm:block sm:w-[44%] lg:h-[230px]" />
            ) : (
              <FitGraphic maxScale={1.3} className="hidden h-[200px] shrink-0 sm:block sm:w-[44%] lg:h-[230px]">
                <ProjectMockup visual={project.visual} />
              </FitGraphic>
            )
          )}
        </div>
        )}
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
        <div className={`${isFullscreen ? 'hidden' : 'fixed'} inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col`} onClick={() => !isFullscreen && setShowExperienceModal(false)}>
          {/* Slim Header - 72px */}
          <div className="flex items-center justify-between px-8 py-3 border-b border-ink/10 h-18 bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4">
              {/* Back Button */}
              <button
                onClick={() => setShowExperienceModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-all text-ink/60 hover:text-ink"
                title="Go back"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="size-4" />
              </button>
              {/* Side Panel Toggle Button */}
              <button
                onClick={() => setIsSidePanelCollapsed(!isSidePanelCollapsed)}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-all text-ink/60 hover:text-ink"
                title={isSidePanelCollapsed ? "Open side panel" : "Close side panel"}
              >
                <FontAwesomeIcon icon={faBars} className="size-4" />
              </button>
              <h1 className="text-xl font-bold text-ink">Experience</h1>
            </div>
            <div className="flex items-center gap-6">
              {/* View Mode Toggle with Icons */}
              <div className="flex items-center gap-1.5 rounded-full">
                <button
                  onClick={() => setViewMode("mobile")}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                    viewMode === "mobile"
                      ? "bg-lilac text-white"
                      : "text-ink/60 hover:text-ink"
                  }`}
                  title="Mobile view"
                >
                  <FontAwesomeIcon icon={faMobileAlt} className="size-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("desktop")}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                    viewMode === "desktop"
                      ? "bg-lilac text-white"
                      : "text-ink/60 hover:text-ink"
                  }`}
                  title="Desktop view"
                >
                  <FontAwesomeIcon icon={faDesktop} className="size-4" />
                </button>
              </div>
              {/* Theme Toggle Button with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="w-8 h-8 flex items-center justify-center rounded-full transition-all text-ink/60 hover:text-ink"
                  title="Change theme"
                >
                  <FontAwesomeIcon icon={faPalette} className="size-3.5" />
                </button>
                {/* Theme Dropdown Menu */}
                {showThemeMenu && (
                  <div className="absolute right-0 mt-2 bg-white border border-ink/10 rounded-lg shadow-lg z-50 min-w-max">
                    <button
                      onClick={() => {
                        setBackgroundTheme("light");
                        setShowThemeMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-2 transition-all ${
                        backgroundTheme === "light"
                          ? "bg-lilac/10 text-lilac"
                          : "text-ink/70 hover:bg-ink/5"
                      }`}
                    >
                      <FontAwesomeIcon icon={faSun} className="size-3.5" />
                      <span className="text-sm font-medium">Light</span>
                    </button>
                    <button
                      onClick={() => {
                        setBackgroundTheme("dark");
                        setShowThemeMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 flex items-center gap-2 transition-all border-t border-ink/10 ${
                        backgroundTheme === "dark"
                          ? "bg-lilac/10 text-lilac"
                          : "text-ink/70 hover:bg-ink/5"
                      }`}
                    >
                      <FontAwesomeIcon icon={faMoon} className="size-3.5" />
                      <span className="text-sm font-medium">Dark</span>
                    </button>
                  </div>
                )}
              </div>
              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-all text-ink/60 hover:text-ink"
                title="Fullscreen"
              >
                <FontAwesomeIcon icon={faExpand} className="size-3.5" />
              </button>
              {/* Close Button */}
              <button
                onClick={() => setShowExperienceModal(false)}
                className="text-ink text-xl hover:opacity-70 transition-opacity p-1.5"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Left Panel - Journey Navigation with Dot Matrix Background */}
            <div className={`${isSidePanelCollapsed ? 'w-0' : 'w-48 lg:w-72'} bg-gray-50 border-r border-ink/10 overflow-y-auto relative transition-all duration-300`} style={{
              backgroundImage: `radial-gradient(circle, #d4d4d8 0.5px, transparent 0.5px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0'
            }}>
              {/* Overlay for better readability */}
              <div className="absolute inset-0 bg-white/70 pointer-events-none"></div>
              
              {/* Before/After Tabs */}
              <div className="flex border-b border-ink/10 sticky top-0 bg-white/95 backdrop-blur z-10">
                <button
                  onClick={() => {
                    setActiveTab("before");
                    setSelectedJourney("0");
                    setExpandedJourney(null);
                    setSelectedSubItem(null);
                  }}
                  className={`flex-1 px-2 lg:px-4 py-3 font-semibold transition-all text-xs lg:text-sm ${
                    activeTab === "before"
                      ? "text-lilac border-b-2 border-lilac"
                      : "text-ink/60 hover:text-ink"
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => {
                    setActiveTab("after");
                    setSelectedJourney("0");
                    setExpandedJourney(null);
                    setSelectedSubItem(null);
                  }}
                  className={`flex-1 px-2 lg:px-4 py-3 font-semibold transition-all text-xs lg:text-sm ${
                    activeTab === "after"
                      ? "text-lilac border-b-2 border-lilac"
                      : "text-ink/60 hover:text-ink"
                  }`}
                >
                  After
                </button>
              </div>

              {/* Journey List with Accordion */}
              <div className="p-2 lg:p-4 space-y-1.5 lg:space-y-2 relative z-20">
                {project?.experienceJourneys?.[activeTab].map((journey, index) => (
                  <div key={journey.id}>
                    <button
                      onClick={() => {
                        setSelectedJourney(index.toString());
                        setExpandedJourney(expandedJourney === journey.id ? null : journey.id);
                        setSelectedSubItem(null);
                      }}
                      className={`w-full text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-all flex items-center justify-between text-xs lg:text-sm ${
                        expandedJourney === journey.id
                          ? "text-lilac font-semibold"
                          : "text-ink/70 hover:text-ink/90"
                      }`}
                    >
                      <span className="font-semibold">{journey.label}</span>
                      {journey.items && journey.items.length > 0 && (
                        <FontAwesomeIcon 
                          icon={faChevronDown} 
                          className={`size-3 transition-transform ${
                            expandedJourney === journey.id ? "rotate-180 text-lilac" : "text-ink/40"
                          }`}
                        />
                      )}
                    </button>

                    {/* Accordion Sub-items */}
                    {journey.items && expandedJourney === journey.id && (
                      <div className="mt-1 lg:mt-2 ml-3 lg:ml-4 space-y-1 border-l-2 border-lilac/30 pl-2 lg:pl-3">
                        {journey.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setSelectedSubItem(item.id)}
                            className={`w-full text-left px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg transition-all text-xs font-medium ${
                              selectedSubItem === item.id
                                ? "text-lilac font-semibold"
                                : "text-ink/60 hover:text-ink/80"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Main Content Area */}
            <div className="flex-1 overflow-auto relative transition-all duration-300" style={{
              backgroundColor: backgroundTheme === "light" ? '#f3f4f6' : '#1f2937',
              backgroundImage: backgroundTheme === "light" 
                ? `radial-gradient(circle, #d4d4d8 0.5px, transparent 0.5px)`
                : `radial-gradient(circle, #6b7280 0.5px, transparent 0.5px)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0'
            }}>
              {/* Content - Responsive Iframe */}
              <div 
                className="w-full h-full flex items-center justify-center transition-colors duration-300"
                style={{
                  padding: '16px',
                  backgroundColor: backgroundTheme === "light" ? '#d6d6d6' : '#111827'
                }}
              >
                <iframe
                  title="Preview"
                  src={getExperienceUrl(selectedSubItem)}
                  style={{
                    width: viewMode === "mobile" ? '365px' : 'calc(100% - 32px)',
                    height: 'calc(100% - 32px)',
                    border: 'none',
                    transition: 'width 0.3s ease',
                    borderRadius: '8px',
                    backgroundColor: backgroundTheme === "light" ? '#f9fafb' : '#1f2937'
                  }}
                  className="h-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Fullscreen Overlay */}
      {isFullscreen && showExperienceModal && (
        <div className="fixed inset-0 z-50 flex flex-col group" onClick={() => setIsFullscreen(false)}>
          {/* Top Bar - Hidden by default, shows on hover/touch */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-white font-bold text-lg">Experience Preview</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition-all text-white"
              title="Close (ESC)"
            >
              <FontAwesomeIcon icon={faXmark} className="size-5" />
            </button>
          </div>

          {/* Main Fullscreen Content */}
          <div 
            className="flex-1 w-full h-full flex items-center justify-center transition-colors duration-300"
            style={{
              padding: '16px',
              backgroundColor: backgroundTheme === "light" ? '#d6d6d6' : '#111827'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              title="Fullscreen Preview"
              src={getExperienceUrl(selectedSubItem)}
              style={{
                width: viewMode === "mobile" ? '365px' : 'calc(100% - 32px)',
                height: 'calc(100% - 32px)',
                border: 'none',
                transition: 'width 0.3s ease',
                borderRadius: '8px',
                backgroundColor: backgroundTheme === "light" ? '#f9fafb' : '#1f2937'
              }}
            />
          </div>

          {/* Bottom Hint Text */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Press <kbd className="px-2 py-1 bg-white/20 rounded text-white/80 text-xs">ESC</kbd> to exit fullscreen
          </div>
        </div>
      )}
      </div>

      {/* ===== ACTIONS ROW (under the banner) ===== */}
      <div className="border-b border-ink/5 bg-white px-4 py-3 lg:px-7">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3">
              <button onClick={() => setShowVideoModal(true)} className="px-5 py-2.5 bg-brand text-white font-semibold rounded-full transition-all duration-300 hover:bg-brand-600 flex items-center justify-center gap-2 whitespace-nowrap text-sm" aria-label="Play">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch
              </button>
              <button onClick={() => setShowExperienceModal(true)} className="px-5 py-2.5 bg-white text-brand border border-brand/30 font-semibold rounded-full transition-all duration-300 hover:bg-lilac-100 flex items-center justify-center gap-2 whitespace-nowrap text-sm" aria-label="Experience">
                <span className="material-symbols-outlined text-sm">pan_tool_alt</span>
                Experience
              </button>
              <span className="ml-auto hidden text-xs text-ink/50 sm:inline">See the product in action</span>
            </div>
      </div>

      {/* ===== MOBILE SECTION TABS (sticky) ===== */}
      {stickyTabs && <div className="sticky top-0 z-30 lg:hidden">{stickyTabs}</div>}

      {(() => {
        const CaseStudy = caseStudies[project?.id ?? ""] ?? StudyPlanner;
        return <CaseStudy />;
      })()}
    </>
  );
}
