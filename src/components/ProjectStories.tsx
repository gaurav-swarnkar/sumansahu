import { AnimatePresence, motion } from "motion/react";
import { projects } from "../data";
import { useEffect, type Dispatch, type SetStateAction } from "react";
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
  const project = projects[active];

  const prev = () => {
    if (active === 0) onBack();
    else setActive(active - 1);
  };
  const next = () => setActive((active + 1) % projects.length);

  // Auto-advance to next project every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % projects.length);
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-canvas">
      {/* warm + lime glows */}
      <div className="pointer-events-none absolute -left-32 top-4 size-[620px] rounded-full bg-[#fffcf4] blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -top-28 size-[440px] rounded-full bg-lime opacity-20 blur-[70px]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1920px] grid-cols-1 lg:grid-cols-[minmax(360px,32%)_1fr]">
        {/* ---- sidebar nav ---- */}
        <div className="flex flex-col gap-10 overflow-y-auto px-8 py-12 lg:max-h-screen lg:px-16 lg:py-20" style={{maskImage: 'linear-gradient(to right, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)'}}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              aria-label="Back to home"
              className="group flex size-16 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white"
            >
              <ArrowForward className="size-6 rotate-180 transition-transform duration-300 group-hover:rotate-135" />
            </button>
            <span className="text-lg font-medium text-ink/60">Projects</span>
          </div>

          <nav className="flex flex-col gap-8 pt-4 lg:gap-14 lg:pt-5">
            {projects.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.word}
                  onClick={() => setActive(i)}
                  className="group flex flex-col items-start text-left"
                >
                  <span
                    className={`font-semibold leading-none transition-all duration-300 ${
                      isActive
                        ? "text-[clamp(22px,2.5vw,32px)] text-ink"
                        : "text-[clamp(18px,2vw,24px)] text-ink/50 group-hover:text-ink"
                    }`}
                  >
                    {p.eyebrow}
                  </span>
                  <span className="mt-3 flex items-end gap-3">
                    <span
                      className={`font-semibold leading-none transition-all duration-300 ${
                        isActive
                          ? "text-[clamp(44px,5.2vw,72px)] text-ink"
                          : "text-[clamp(32px,3.8vw,48px)] text-ink/50 group-hover:text-ink"
                      }`}
                    >
                      {p.word}
                    </span>
                    <span
                      className={`mb-2 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "size-6 bg-brand rounded-full cursor-pointer hover:bg-brand-600"
                          : "size-3.5 bg-muted rounded-full"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) navigate(`/project/${p.id}`);
                      }}
                    >
                      {isActive && (
                        <Chevron className="size-3.5 text-white" />
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
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
                  className="group relative flex h-[64px] w-[240px] items-center justify-center gap-4 rounded-full border-2 border-brand bg-white text-brand transition-colors duration-300 hover:bg-brand hover:text-white"
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
