import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { journeyTimeline } from "../data";

const SLIDE_DURATION_MS = 4000;

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

export default function JourneyCarousel() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const goTo = (i: number) =>
    setIndex(((i % journeyTimeline.length) + journeyTimeline.length) % journeyTimeline.length);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % journeyTimeline.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [index, isPlaying]);

  const slide = journeyTimeline[index];

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      {/* backdrop: crossfading, slowly zooming image/GIF placeholder */}
      <AnimatePresence>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.06 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1, ease: "easeInOut" },
            scale: { duration: SLIDE_DURATION_MS / 1000 + 1, ease: "linear" },
          }}
          className={`absolute inset-0 flex items-center justify-center ${slide.gradient}`}
        >
          <FontAwesomeIcon icon={slide.icon} className="size-48 text-white/10" />
        </motion.div>
      </AnimatePresence>

      {/* cinematic scrims: guarantee contrast for chrome regardless of image brightness */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      {/* story-style progress bars */}
      <div className="absolute inset-x-0 top-0 flex gap-1.5 p-6 sm:p-8">
        {journeyTimeline.map((stage, i) => (
          <div
            key={stage.id}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
          >
            {i === index && (
              <motion.div
                key={isPlaying ? "playing" : "paused"}
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: isPlaying ? "100%" : "35%" }}
                transition={{
                  duration: isPlaying ? SLIDE_DURATION_MS / 1000 : 0.2,
                  ease: "linear",
                }}
              />
            )}
            {i < index && <div className="h-full w-full bg-white" />}
          </div>
        ))}
      </div>

      {/* caption: year as title, one line beneath */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-x-0 bottom-0 space-y-2 p-8 sm:p-12"
        >
          <h3 className="text-[clamp(32px,4.5vw,60px)] font-semibold leading-none text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.45)]">
            {slide.year}
          </h3>
          <p className="max-w-lg text-base leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            {slide.description}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* minimal transport controls */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2 sm:bottom-12 sm:right-12">
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Previous stage"
          className="flex size-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        >
          <ArrowForward className="size-4 rotate-180" />
        </button>
        <button
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          className="flex size-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="size-3.5" />
        </button>
        <button
          onClick={() => goTo(index + 1)}
          aria-label="Next stage"
          className="flex size-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
        >
          <ArrowForward className="size-4" />
        </button>
      </div>
    </div>
  );
}
