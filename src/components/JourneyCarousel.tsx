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
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-ink/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* image / GIF placeholder */}
            <div
              className={`relative flex h-[240px] items-center justify-center sm:h-[300px] ${slide.gradient}`}
            >
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
                {slide.year}
              </span>
              <FontAwesomeIcon icon={slide.icon} className="size-14 text-white/30" />
            </div>

            {/* title + 2-line description */}
            <div className="space-y-1.5 bg-white/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-ink">{slide.title}</h3>
              <p className="text-sm leading-relaxed text-ink/60">{slide.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* prev / next controls */}
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Previous stage"
          className="absolute left-3 top-[120px] flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand backdrop-blur-sm transition-colors hover:bg-brand-600 hover:text-white sm:top-[150px]"
        >
          <ArrowForward className="size-4 rotate-180" />
        </button>
        <button
          onClick={() => goTo(index + 1)}
          aria-label="Next stage"
          className="absolute right-3 top-[120px] flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brand backdrop-blur-sm transition-colors hover:bg-brand-600 hover:text-white sm:top-[150px]"
        >
          <ArrowForward className="size-4" />
        </button>
      </div>

      {/* playback controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white"
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="size-3.5" />
        </button>

        <div className="flex flex-1 items-center gap-2">
          {journeyTimeline.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => goTo(i)}
              aria-label={`Go to ${stage.year}`}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10"
            >
              {i === index && (
                <motion.div
                  key={isPlaying ? "playing" : "paused"}
                  className="h-full bg-brand"
                  initial={{ width: "0%" }}
                  animate={{ width: isPlaying ? "100%" : "35%" }}
                  transition={{
                    duration: isPlaying ? SLIDE_DURATION_MS / 1000 : 0.2,
                    ease: "linear",
                  }}
                />
              )}
              {i < index && <div className="h-full w-full bg-brand/40" />}
            </button>
          ))}
        </div>

        <span className="shrink-0 text-xs font-medium tabular-nums text-ink/50">
          {index + 1} / {journeyTimeline.length}
        </span>
      </div>
    </div>
  );
}
