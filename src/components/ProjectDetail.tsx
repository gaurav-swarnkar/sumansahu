import { motion } from "motion/react";
import { projects } from "../data";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ProjectDetailFullContent from "./ProjectDetailFullContent";
import { useSplitVariants } from "../utils/transitions";


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

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path
        d="M16 4L4 14v12c0 1.1.9 2 2 2h8v-8h4v8h8c1.1 0 2-.9 2-2V14l-12-10z"
        fill="currentColor"
      />
    </svg>
  );
}

function GridIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}

function ChevronSmall({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProjectDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const split = useSplitVariants();

  // Go back within the site when possible; otherwise fall back to the projects list
  const goBack = () => {
    if (location.key !== "default") navigate(-1);
    else navigate("/projects");
  };
  const { projectId } = useParams();
  const [activeContent, setActiveContent] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const contentPanelRef = useRef<HTMLDivElement>(null);

  const project = projects.find((p) => p.id === projectId);

  // Scroll to section when menu item is clicked
  // Section ids come from the project's own menu (data.ts), so every case study can differ
  const sectionIds = project?.contents.map((c) => c.id) ?? [];

  // While a menu click is smooth-scrolling, keep the clicked item highlighted
  const clickLockUntil = useRef(0);

  // On desktop the content panel scrolls; on mobile the whole page does.
  const panelScrolls = () => {
    const panel = contentPanelRef.current;
    return !!panel && panel.scrollHeight > panel.clientHeight + 1 && getComputedStyle(panel).overflowY !== "visible";
  };
  const MOBILE_TABS_OFFSET = 64; // height of the sticky tab bar + breathing room

  const scrollToSection = (index: number) => {
    setActiveContent(index);
    clickLockUntil.current = Date.now() + 1000;
    const sectionId = sectionIds[index];
    const element = contentPanelRef.current?.querySelector(`#${sectionId}`);
    if (!element) return;
    if (panelScrolls()) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const top = element.getBoundingClientRect().top + window.scrollY - MOBILE_TABS_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Highlight the section whose heading has scrolled to near the top of the panel
  const handleScroll = () => {
    const panel = contentPanelRef.current;
    if (!panel) return;
    if (Date.now() < clickLockUntil.current) {
      // still animating towards the clicked section: extend the lock until scrolling stops
      clickLockUntil.current = Date.now() + 200;
      return;
    }
    const inPanel = panelScrolls();
    const panelTop = inPanel ? panel.getBoundingClientRect().top : MOBILE_TABS_OFFSET - 160 + 80;
    const atBottom = inPanel
      ? panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 4
      : window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) {
      setActiveContent(sectionIds.length - 1);
      return;
    }

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const element = panel.querySelector(`#${sectionIds[i]}`);
      if (element && element.getBoundingClientRect().top - panelTop <= 160) {
        setActiveContent(i);
        return;
      }
    }
    setActiveContent(0);
  };

  // Mobile: the page itself scrolls, so track the active section on window scroll too
  useEffect(() => {
    const onScroll = () => {
      if (!panelScrolls()) handleScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  // Keep the active mobile tab in view
  const tabsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = tabsRef.current;
    const tab = bar?.querySelector<HTMLElement>(`[data-tab="${activeContent}"]`);
    if (bar && tab) bar.scrollTo({ left: tab.offsetLeft - bar.clientWidth / 2 + tab.clientWidth / 2, behavior: "smooth" });
  }, [activeContent]);

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


  return (
    <section className="relative min-h-screen w-full overflow-x-clip bg-canvas">
      {/* warm + lime glows */}
      <div className="pointer-events-none absolute -left-32 top-4 size-[620px] rounded-full bg-[#fffcf4] blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -top-28 size-[440px] rounded-full bg-lime opacity-20 blur-[70px]" />

      {/* warm + lime glows */}
      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1920px] grid-cols-1 lg:grid-cols-[minmax(360px,32%)_1fr]" style={{
        gridTemplateColumns: isSidebarCollapsed ? 'minmax(56px, 56px) 1fr' : undefined,
        transition: 'grid-template-columns 500ms ease-in-out'
      }}>
        {/* ---- sidebar nav ---- */}
        <motion.div variants={split.left} 
          className="relative hidden flex-col gap-10 overflow-hidden lg:flex lg:max-h-screen overflow-y-auto"
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
            <div className="px-4 py-12 lg:px-10 lg:py-20 xl:px-16 flex flex-col gap-10">
              {/* Breadcrumb: back + quick links to home and projects */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2">
                <button
                  onClick={goBack}
                  aria-label="Go back"
                  title="Back"
                  className="group flex size-9 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <ArrowForward className="size-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
                </button>
                <span className="mx-1 h-5 w-px bg-ink/15" aria-hidden="true" />
                <button
                  onClick={() => navigate("/")}
                  aria-label="Home"
                  title="Home"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-lilac-100 hover:text-brand"
                >
                  <HomeIcon className="size-4" />
                </button>
                <ChevronSmall className="size-3 text-ink/30" />
                <button
                  onClick={() => navigate("/projects")}
                  aria-label="Projects"
                  title="Projects"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-lilac-100 hover:text-brand"
                >
                  <GridIcon className="size-4" />
                </button>
                <ChevronSmall className="size-3 text-ink/30" />
                <span className="truncate text-sm font-semibold text-brand" aria-current="page">
                  {project.word}
                </span>
              </nav>

              {/* Content Menu */}
              <nav className="flex flex-col gap-5 pt-2 lg:gap-6">
                {project.contents.map((content, index) => (
                  <button
                    key={content.id}
                    onClick={() => scrollToSection(index)}
                    className="group flex flex-col items-start text-left"
                  >
                    <span
                      className={`flex max-w-full items-center gap-3 whitespace-nowrap font-semibold leading-tight transition-all duration-300 ${
                        index === activeContent
                          ? "text-[clamp(18px,1.6vw,26px)] text-ink"
                          : "text-[clamp(15px,1.25vw,20px)] text-ink/50 group-hover:text-ink"
                      }`}
                    >
                      {/* always one line: long labels truncate rather than wrap */}
                      <span className="truncate">{content.label}</span>
                      {index === activeContent && <span className="size-2.5 shrink-0 rounded-full bg-brand" />}
                    </span>
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
                onClick={() => navigate("/")}
                aria-label="Back to home"
                className="group flex size-12 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white"
              >
                <HomeIcon className="size-5 transition-transform duration-300 group-hover:scale-110" />
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
        </motion.div>

        {/* ---- content panel ---- */}
        <motion.div variants={split.right} 
          ref={contentPanelRef}
          onScroll={handleScroll}
          className="relative min-h-[70vh] lg:overflow-y-auto lg:max-h-screen lg:min-h-screen bg-gray-100/50"
        >
          <ProjectDetailFullContent
            projectId={projectId}
            project={project}
            mobileNav={
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white">
                <button onClick={goBack} aria-label="Go back" className="flex size-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <ArrowForward className="size-4 rotate-180" />
                </button>
                <span className="mx-0.5 h-5 w-px bg-white/25" aria-hidden="true" />
                <button onClick={() => navigate("/")} aria-label="Home" className="flex size-8 items-center justify-center rounded-full text-white/75">
                  <HomeIcon className="size-4" />
                </button>
                <ChevronSmall className="size-3 text-white/40" />
                <button onClick={() => navigate("/projects")} aria-label="Projects" className="flex size-8 items-center justify-center rounded-full text-white/75">
                  <GridIcon className="size-4" />
                </button>
                <ChevronSmall className="size-3 text-white/40" />
                <span className="truncate text-sm font-semibold">{project.word}</span>
              </nav>
            }
            stickyTabs={
              <div ref={tabsRef} className="hide-scrollbar flex gap-1 overflow-x-auto border-b border-ink/10 bg-white/95 px-3 shadow-sm backdrop-blur">
                {project.contents.map((c, i) => (
                  <button
                    key={c.id}
                    data-tab={i}
                    onClick={() => scrollToSection(i)}
                    className={`relative shrink-0 whitespace-nowrap px-3 py-3.5 text-sm font-semibold transition-colors ${i === activeContent ? "text-brand" : "text-ink/55"}`}
                  >
                    {c.label}
                    {i === activeContent && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand" />}
                  </button>
                ))}
              </div>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
