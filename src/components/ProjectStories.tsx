import { AnimatePresence, motion } from "motion/react";
import { projects } from "../data";
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useNavigate } from "react-router-dom";

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

// Video paths
const videoPaths = [
  "/imports/Main/1.mp4",
  "/imports/Main/2.mp4",
  "/imports/Main/3.mp4",
  "/imports/Main/4.mp4",
];

function VideoBackground({ index }: { index: number }) {
  const videoSrc = videoPaths[index % videoPaths.length];

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

export default function ProjectStories({
  active,
  setActive,
  onBack,
}: {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  onBack: () => void;
}) {
  const navigate = useNavigate();
  const project = projects[active % projects.length];
  const navRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStartX = useRef(0);
  const isFirstRender = useRef(true);
  const [isMobileNav, setIsMobileNav] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1023px)").matches;
  });

  const prev = () => {
    if (active === 0) onBack();
    else setActive(active - 1);
  };
  const next = () => setActive((active + 1));

  // Auto-advance to next project every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => current + 1);
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  // Initial scroll to center the first item on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const navElement = navRef.current;
      const activeItem = itemRefs.current[0];
      if (!navElement || !activeItem) return;

      const navRect = navElement.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const targetScrollLeft =
        navElement.scrollLeft +
        (itemRect.left - navRect.left) -
        (navRect.width / 2 - itemRect.width / 2);

      navElement.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: "auto",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const updateViewport = () => setIsMobileNav(mediaQuery.matches);
    updateViewport();

    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const navElement = navRef.current;
    const activeItem = itemRefs.current[active];
    if (!navElement || !activeItem) return;

    const navRect = navElement.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const targetScrollLeft =
      navElement.scrollLeft +
      (itemRect.left - navRect.left) -
      (navRect.width / 2 - itemRect.width / 2);

    navElement.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: "smooth",
    });
  }, [active]);

  // Add swipe gesture support for mobile
  useEffect(() => {
    if (!isMobileNav) return;

    const navElement = navRef.current;
    if (!navElement) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;
      const threshold = 30; // Minimum swipe distance

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          // Swiped left, move to next
          next();
        } else {
          // Swiped right, move to previous
          prev();
        }
      }
    };

    navElement.addEventListener("touchstart", handleTouchStart, false);
    navElement.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      navElement.removeEventListener("touchstart", handleTouchStart);
      navElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobileNav, active, projects.length]);

  const getRelativePosition = (
    itemIndex: number,
    activeIndex: number,
    total: number,
  ) => {
    const direct = itemIndex - activeIndex;
    const wrappedLeft = direct - total;
    const wrappedRight = direct + total;

    return [direct, wrappedLeft, wrappedRight].reduce((closest, candidate) =>
      Math.abs(candidate) < Math.abs(closest) ? candidate : closest,
    direct);
  };

  const getRotation3D = (distance: number) => {
    // Helper function - no longer used but kept for reference
    const angle = distance * 120;
    return angle;
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-canvas">
      {/* warm + lime glows */}
      <div className="pointer-events-none absolute -left-32 top-4 size-[620px] rounded-full bg-[#fffcf4] blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -top-28 size-[440px] rounded-full bg-lime opacity-20 blur-[70px]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1920px] grid-cols-1 lg:grid-cols-[minmax(360px,32%)_1fr]">
        {/* ---- sidebar nav ---- */}
        <div className="flex flex-col gap-3 overflow-y-auto px-0 pt-4 lg:max-h-screen lg:px-16 lg:py-20 lg:-mt-10 relative" style={{maskImage: 'linear-gradient(to right, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)'}}>
          <div className="flex items-center justify-between px-4 lg:px-0 gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                aria-label="Back to home"
                className="group flex size-12 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white"
              >
                <ArrowForward className="size-5 rotate-180 transition-transform duration-300 group-hover:rotate-135" />
              </button>
              <span className="text-lg font-medium text-ink/60">Projects</span>
            </div>
            
            {/* Chat Bubble with Hamburger */}
            <button
              className="group hidden sm:flex flex-col items-center justify-center size-12 shrink-0 rounded-full bg-brand text-white transition-all hover:bg-brand-600 shadow-lg hover:shadow-xl"
              aria-label="Open contact menu"
              title="Let's chat!"
            >
              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>

          <nav
            ref={navRef}
            className="flex flex-row gap-4 py-4 px-4 lg:px-0 lg:flex-col lg:gap-14 lg:pt-5 overflow-x-auto overflow-y-hidden hide-scrollbar"
            style={{ paddingLeft: 'calc(50% - 70px)', paddingRight: 'calc(50% - 70px)' }}
          >
            <AnimatePresence mode="sync">
              {/* Dynamically render items around the active index */}
              {Array.from({ length: 5 }).map((_, offset) => {
                const itemIndex = active - 2 + offset;
                const actualIndex = ((itemIndex % projects.length) + projects.length) % projects.length;
                const p = projects[actualIndex];
                const isActive = itemIndex === active;
                const key = `carousel-item-${actualIndex}-${itemIndex}`;
                const skipAnimation = isFirstRender.current;

                return (
                  <motion.button
                    key={key}
                    initial={skipAnimation ? { opacity: 1, x: 0, scale: isActive ? 1.2 : 0.8 } : { opacity: 0, x: 50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: isActive ? 1.2 : 0.8 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    ref={(element) => {
                      itemRefs.current[itemIndex] = element;
                      if (isActive && offset === 2) {
                        isFirstRender.current = false;
                      }
                    }}
                    onClick={() => setActive(itemIndex)}
                    className={`flex flex-col items-center justify-center flex-shrink-0 transition-all duration-500 rounded-3xl px-3 py-2 lg:items-start lg:text-left lg:px-0 lg:py-0 lg:bg-transparent lg:rounded-none`}
                    style={{
                      minWidth: '140px',
                    }}
                  >
                    <span
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        isActive ? 'text-brand' : 'text-ink/50'
                      }`}
                    >
                      {p.eyebrow}
                    </span>
                    <span
                      className={`text-2xl font-bold transition-colors duration-300 mt-1 ${
                        isActive ? 'text-brand' : 'text-ink/40'
                      }`}
                    >
                      {p.word}
                    </span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </nav>
        </div>

        {/* ---- content panel ---- */}
        <div className="relative min-h-[70vh] overflow-hidden lg:min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 overflow-hidden"
            >
              {/* video background */}
              <VideoBackground index={active} />

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
    </section>
  );
}
