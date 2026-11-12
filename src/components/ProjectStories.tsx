import { AnimatePresence, motion } from "motion/react";
import { projects } from "../data";
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ConnectButton from "./ConnectButton";
import ProjectMockup from "./ProjectMockups";

const CAROUSEL_ITEM_WIDTH = 120;
const CAROUSEL_STEP = 128;

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

function LightningPill({ text }: { text: string }) {
  return (
    <div 
      className="flex items-center gap-2 rounded-full bg-brand-600/70 px-3 py-2"
      style={{
        backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
        backgroundSize: '200% 100%',
        animation: 'shine 3s linear 2s infinite'
      }}
    >
      <svg viewBox="0 0 28 28" className="size-4 shrink-0" fill="none">
        <path
          d="M13 2 5 15h6l-2 11 10-14h-7l3-10z"
          fill="white"
        />
      </svg>
      <span className="text-[13px] font-normal text-white sm:text-[15px]">
        {text}
      </span>
    </div>
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

      <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-[1920px] grid-cols-1 grid-rows-[auto_1fr] lg:min-h-screen lg:grid-rows-1 lg:grid-cols-[minmax(360px,32%)_1fr]">
        {/* ---- sidebar nav ---- */}
        <div className="relative flex flex-col gap-4 px-0 pt-4 pb-6 lg:max-h-screen lg:gap-10 lg:px-16 lg:py-20 lg:-mt-10">
          {/* header: back | title | contact on mobile; back + title on desktop */}
          <div className="relative flex items-center justify-between px-4 lg:justify-start lg:gap-3 lg:px-0">
            <button
              onClick={() => navigate("/")}
              aria-label="Back to home"
              className="group flex size-10 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white lg:size-12"
            >
              <ArrowForward className="size-4 rotate-180 transition-transform duration-300 group-hover:rotate-135 lg:size-5" />
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
            className="relative h-[72px] overflow-hidden lg:hidden"
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
                    scale: isActive ? 1.15 : 0.9,
                    opacity: Math.abs(offset) > 2 ? 0 : 1,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  onClick={() => setActive(position)}
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
                    className={`text-xl font-semibold leading-none transition-colors duration-300 ${
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
          <nav className="hidden flex-col gap-10 pt-5 lg:flex">
            {projects.map((p, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={p.id}
                  onClick={() => selectProject(index)}
                  className="group flex flex-col items-start gap-2 text-left"
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide transition-colors duration-300 ${
                      isActive ? "text-brand" : "text-ink/40 group-hover:text-ink/60"
                    }`}
                  >
                    {p.eyebrow}
                  </span>
                  <span className="flex items-center gap-3">
                    <span
                      className={`font-semibold leading-none transition-all duration-300 ${
                        isActive
                          ? "text-[clamp(28px,3vw,40px)] text-ink"
                          : "text-[clamp(20px,2.2vw,28px)] text-ink/50 group-hover:text-ink"
                      }`}
                    >
                      {p.word}
                    </span>
                    {isActive && (
                      <span className="block size-2.5 shrink-0 rounded-full bg-brand" />
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ---- content panel: mobile, full-bleed section filling the rest of the screen ---- */}
        <div className={`relative flex overflow-hidden lg:hidden ${project.panel}`}>
          {/* ambient glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-black/25 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative flex w-full flex-col gap-4 px-5 pt-8 pb-8"
            >
              {/* title + outcomes at the top */}
              <h2 className="text-[clamp(26px,7.5vw,36px)] font-semibold leading-tight text-white">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.pills.map((pill) => (
                  <span
                    key={pill}
                    className="flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
                  >
                    <svg viewBox="0 0 28 28" className="size-3 shrink-0" fill="none" aria-hidden="true">
                      <path d="M13 2 5 15h6l-2 11 10-14h-7l3-10z" fill="currentColor" />
                    </svg>
                    {pill}
                  </span>
                ))}
              </div>

              {/* graphics fill the space towards the bottom */}
              <div className="flex flex-1 items-end justify-center py-6">
                <ProjectMockup visual={project.visual} />
              </div>

              {/* button pinned to the bottom */}
              <button
                onClick={() => navigate(`/project/${project.id}`)}
                className="group flex h-12 w-full shrink-0 items-center justify-center gap-3 rounded-full bg-white text-brand transition-colors hover:bg-lilac-100"
              >
                <span className="text-base font-semibold leading-none">View Project</span>
                <ArrowForward className="size-4 shrink-0 transition-transform duration-300 group-hover:-rotate-45" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---- content panel: desktop ---- */}
        <div className="relative hidden overflow-hidden lg:block lg:min-h-screen">
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
              <div className={`pointer-events-none absolute inset-0 ${project.panel}`} />

              {/* ambient blobs */}
              <div className="pointer-events-none absolute -right-40 top-24 size-[520px] rounded-full bg-white/10 blur-[120px]" />
              <div className="pointer-events-none absolute -left-40 bottom-0 size-[520px] rounded-full bg-black/25 blur-[160px]" />



              {/* copy */}
              <div 
                className="relative z-10 flex w-full flex-col gap-10 px-8 pt-24 lg:px-16 lg:pt-28 lg:max-w-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(61, 0, 121, 0.8) 0%, rgba(61, 0, 121, 0.4) 50%, rgba(61, 0, 121, 0) 100%)'
                }}
              >
                <h2 className="text-[clamp(44px,5.2vw,76px)] font-semibold leading-[1.3] text-white pr-20">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  {project.pills.map((pill) => (
                    <LightningPill key={pill} text={pill} />
                  ))}
                </div>

                {/* forward button */}
                <button
                  onClick={() => navigate(`/project/${project.id}`)}
                  aria-label="View Project"
                  className="group relative flex h-[64px] w-[240px] items-center justify-center gap-4 rounded-full border-2 border-brand bg-white text-brand transition-all duration-300 hover:bg-brand hover:text-white"
                >
                  <span className="text-[18px] font-semibold leading-none tracking-tight">
                    View Project
                  </span>
                  <ArrowForward className="size-5 transition-transform duration-300 group-hover:-rotate-45 flex-shrink-0" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
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
