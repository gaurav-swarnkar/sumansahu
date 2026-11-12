import { AnimatePresence, motion } from "motion/react";
import { projects } from "../data";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ConnectButton from "./ConnectButton";
import ProjectMockup, { FitGraphic } from "./ProjectMockups";
import { projectBackgrounds } from "../utils/projectTheme";
import { useSplitVariants } from "../utils/transitions";

const CAROUSEL_ITEM_WIDTH = 150;
const CAROUSEL_STEP = 156;

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path
        d="M12 6L22 16L12 26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path
        d="M16 4L4 14v12c0 1.1.9 2 2 2h8v-8h4v8h8c1.1 0 2-.9 2-2V14l-12-10z"
        fill="currentColor"
      />
    </svg>
  );
}

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

export default function ProjectStories({
  active,
  setActive,
}: {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const split = useSplitVariants();
  // `active` is an unbounded position so the mobile carousel can loop forever;
  // the project shown is that position wrapped into the projects list.
  const total = projects.length;
  const activeIndex = ((active % total) + total) % total;
  const project = projects[activeIndex];
  const [isContactOpen, setIsContactOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance to the next project after 12 seconds (restarts on manual selection)
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((current) => current + 1);
    }, 12000);

    return () => clearTimeout(timer);
  }, [active, setActive]);

  // Jump to a project from the desktop list without breaking the loop position
  const selectProject = (index: number) => setActive(active - activeIndex + index);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) < 30) return;
    setActive((current) => current + (diff > 0 ? 1 : -1));
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-canvas">
      {/* warm + lime glows */}
      <div className="pointer-events-none absolute -left-32 top-4 size-[620px] rounded-full bg-[#fffcf4] blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -top-28 size-[440px] rounded-full bg-lime opacity-20 blur-[70px]" />
      {/* warm + lime glows */}

      <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-[1920px] grid-cols-1 grid-rows-[auto_1fr] lg:min-h-screen lg:grid-rows-1 lg:grid-cols-[minmax(360px,32%)_1fr]">
        {/* ---- sidebar nav ---- */}
        <motion.div variants={split.left} className="relative flex flex-col gap-4 px-0 pt-4 pb-6 lg:max-h-screen lg:gap-10 lg:px-10 lg:py-20 lg:-mt-10 xl:px-14">
          {/* header: back | title | contact on mobile; back + title on desktop */}
          <div className="relative flex items-center justify-between px-4 lg:justify-start lg:gap-3 lg:px-0">
            <button
              onClick={() => navigate("/")}
              aria-label="Go to home"
              className="group flex size-10 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white lg:size-12"
            >
              <HomeIcon className="size-4 transition-transform duration-300 group-hover:scale-110 lg:size-5" />
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 text-base font-medium text-ink/70 lg:static lg:translate-x-0 lg:text-sm lg:text-ink/60">
              Projects
            </span>
            <button
              onClick={() => setIsContactOpen(true)}
              aria-label="Contact"
              title="Contact"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-sm transition-colors hover:bg-lilac-100 lg:hidden"
            >
              <FontAwesomeIcon icon={faComment} className="text-base" />
            </button>
          </div>

          {/* mobile: looping carousel, active item centred and scaled up */}
          <div
            className="relative h-[84px] overflow-hidden lg:hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
            }}
          >
            {[-3, -2, -1, 0, 1, 2, 3].map((offset) => {
              const position = active + offset;
              const p = projects[((position % total) + total) % total];
              const isActive = offset === 0;
              return (
                <motion.button
                  key={position}
                  initial={false}
                  animate={{
                    x: offset * CAROUSEL_STEP,
                    scale: isActive ? 1.1 : 0.88,
                    opacity: Math.abs(offset) > 2 ? 0 : 1,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => setActive(position)}
                  aria-label={`Show ${p.word}`}
                  tabIndex={Math.abs(offset) > 1 ? -1 : 0}
                  className="absolute top-1/2 flex flex-col items-center gap-1 text-center"
                  style={{ left: "50%", width: CAROUSEL_ITEM_WIDTH, marginLeft: -CAROUSEL_ITEM_WIDTH / 2, translateY: "-50%" }}
                >
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wide transition-colors duration-300 ${
                      isActive ? "text-brand" : "text-ink/40"
                    }`}
                  >
                    {p.eyebrow}
                  </span>
                  <span
                    className={`text-base font-semibold leading-tight transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-ink/40"
                    }`}
                  >
                    {p.word}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* desktop: vertical list in the My Journey style */}
          <nav className="hidden flex-col gap-7 pt-2 lg:flex">
            {projects.map((p, index) => {
              const isActive = index === activeIndex;
              return (
                <div key={p.id} className="flex min-w-0 items-end gap-3">
                  <button
                    onClick={() => selectProject(index)}
                    className="group flex min-w-0 flex-col items-start gap-1.5 text-left"
                  >
                    <span
                      className={`text-base font-semibold tracking-wide transition-colors duration-300 ${
                        isActive ? "text-brand" : "text-ink/40 group-hover:text-ink/60"
                      }`}
                    >
                      {p.eyebrow}
                    </span>
                    <span
                      className={`max-w-full truncate whitespace-nowrap font-semibold leading-tight transition-all duration-300 ${
                        isActive
                          ? "text-[clamp(20px,1.85vw,30px)] text-ink"
                          : "text-[clamp(17px,1.4vw,22px)] text-ink/50 group-hover:text-ink"
                      }`}
                    >
                      {p.word}
                    </span>
                  </button>
                  {/* touchpoint to open the selected project */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.button
                        key="open"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => navigate(`/project/${p.id}`)}
                        aria-label={`Open ${p.title}`}
                        title="Open project"
                        className="mb-1.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-600"
                      >
                        <Chevron className="size-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>
        </motion.div>

        {/* ---- content panel: mobile, full-bleed section filling the rest of the screen ---- */}
        <motion.div variants={split.right} className={`relative flex overflow-hidden lg:hidden ${project.panel}`}
          style={{ backgroundImage: projectBackgrounds[project.id] }}
        >
          {/* soft glow behind the graphic */}
          <div className="pointer-events-none absolute -right-16 bottom-24 size-64 rounded-full bg-white/10 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex w-full flex-col gap-3 px-5 pt-6 pb-6"
            >
              {/* title + outcomes at the top */}
              <h2 className="text-[clamp(25px,7.2vw,34px)] font-semibold leading-tight text-white">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.pills.map((pill) => (
                  <span
                    key={pill}
                    className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
                  >
                    <svg viewBox="0 0 28 28" className="size-3 shrink-0" fill="none" aria-hidden="true">
                      <path d="M13 2 5 15h6l-2 11 10-14h-7l3-10z" fill="currentColor" />
                    </svg>
                    {pill}
                  </span>
                ))}
              </div>

              {/* graphics fill the space towards the bottom */}
              <FitGraphic maxScale={1.25} className="min-h-[50%] flex-1 my-3">
                <ProjectMockup visual={project.visual} detailed />
              </FitGraphic>

              {/* button pinned to the bottom */}
              <button
                onClick={() => navigate(`/project/${project.id}`)}
                className="group flex h-11 w-full shrink-0 items-center justify-center gap-3 rounded-full bg-white text-brand transition-colors hover:bg-lilac-100"
              >
                <span className="text-[15px] font-semibold leading-none">View Project</span>
                <ArrowForward className="size-4 shrink-0 transition-transform duration-300 group-hover:-rotate-45" />
              </button>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ---- content panel: desktop ---- */}
        <motion.div variants={split.right} className="relative hidden overflow-hidden lg:block lg:min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 overflow-hidden"
            >
              {/* project background (motion graphics to come) */}
              <div
                className={`pointer-events-none absolute inset-0 ${project.panel}`}
                style={{ backgroundImage: projectBackgrounds[project.id] }}
              />

              {/* soft glow behind the graphic */}
              <div className="pointer-events-none absolute left-1/2 bottom-[10%] size-[560px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />

              <div className="relative z-10 flex h-full flex-col">
              {/* copy */}
              <div className="flex w-full shrink-0 flex-col gap-6 px-14 pt-24 xl:px-16 [@media(max-height:780px)]:gap-4 [@media(max-height:780px)]:pt-20">
                <h2 className="max-w-[24ch] text-[clamp(48px,5.2vw,84px)] font-semibold leading-[1.1] text-white [@media(max-height:780px)]:text-[clamp(42px,4.3vw,62px)]">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  {project.pills.map((pill) => (
                    <span
                      key={pill}
                      className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-base font-medium text-white backdrop-blur-sm"
                    >
                      <svg viewBox="0 0 28 28" className="size-4 shrink-0" fill="none" aria-hidden="true">
                        <path d="M13 2 5 15h6l-2 11 10-14h-7l3-10z" fill="currentColor" />
                      </svg>
                      {pill}
                    </span>
                  ))}
                </div>

                {/* forward button */}
                <button
                  onClick={() => navigate(`/project/${project.id}`)}
                  aria-label="View Project"
                  className="group relative mt-1 flex h-14 w-[220px] items-center justify-center gap-3 rounded-full bg-white text-brand transition-all duration-300 hover:bg-lilac-100"
                >
                  <span className="text-lg font-semibold leading-none tracking-tight">
                    View Project
                  </span>
                  <ArrowForward className="size-5 transition-transform duration-300 group-hover:-rotate-45 flex-shrink-0" />
                </button>
              </div>

              {/* project graphic fills the space below the copy */}
              <div className="flex min-h-0 flex-1 px-14 pb-10 pt-8 xl:px-16">
                <FitGraphic maxScale={2.2} className="h-full">
                  <ProjectMockup visual={project.visual} />
                </FitGraphic>
              </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
      <ConnectButton
        hotspot={false}
        mobileButton={false}
        open={isContactOpen}
        onOpenChange={setIsContactOpen}
      />
    </section>
  );
}
