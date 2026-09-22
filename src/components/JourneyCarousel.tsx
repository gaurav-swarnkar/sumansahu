import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { journeyTimeline } from "../data";
import slide1 from "../imports/about_page/slide1.mp4";
import slide2 from "../imports/about_page/slide2.mp4";
import slide3 from "../imports/about_page/slide3.mp4";
import slide4 from "../imports/about_page/slide4.mp4";
import slide5 from "../imports/about_page/slide5.mp4";
import slide6 from "../imports/about_page/slide6.mp4";
import slide7 from "../imports/about_page/slide7.mp4";

const SLIDE_DURATION_MS = 6000;

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
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = (i: number) =>
    setIndex(((i % journeyTimeline.length) + journeyTimeline.length) % journeyTimeline.length);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % journeyTimeline.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(timer);
  }, [index, isPlaying]);

  // Control video playback based on isPlaying state
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const slide = journeyTimeline[index];
  
  // Map videos to slides
  const videos = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];
  const videoSrc = videos[index] || videos[0]; // Fallback to first video

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* Video backdrop */}
      <video
        ref={videoRef}
        key={videoSrc}
        autoPlay
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* scrims for text readability over video */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/85 via-white/40 to-transparent" />

      {/* Header: progress bars and controls inline */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-6 sm:p-8">
        {/* story-style progress bars */}
        <div className="flex flex-1 gap-1.5">
          {journeyTimeline.map((stage, i) => (
            <div
              key={stage.id}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
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
              {i < index && <div className="h-full w-full bg-brand" />}
            </div>
          ))}
        </div>

        {/* transport controls - larger and inline */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous stage"
            className="flex size-12 items-center justify-center rounded-full bg-white/30 text-ink backdrop-blur-sm transition-colors hover:bg-white/40"
          >
            <ArrowForward className="size-5 rotate-180" />
          </button>
          <button
            onClick={() => setIsPlaying((playing) => !playing)}
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            className="flex size-12 items-center justify-center rounded-full bg-white/30 text-ink backdrop-blur-sm transition-colors hover:bg-white/40"
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="size-4" />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next stage"
            className="flex size-12 items-center justify-center rounded-full bg-white/30 text-ink backdrop-blur-sm transition-colors hover:bg-white/40"
          >
            <ArrowForward className="size-5" />
          </button>
        </div>
      </div>

      {/* caption: year as title, one line beneath - at bottom */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-x-0 bottom-0 space-y-2 p-8 pb-24 sm:p-12 sm:pb-32"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="w-fit space-y-3 rounded-lg bg-white/80 px-6 py-4 backdrop-blur-sm">
            <h3 className="inline-block border-b-4 border-brand pb-2 text-[clamp(24px,3vw,40px)] font-semibold leading-tight text-ink">
              {slide.year}
            </h3>
            <p className="max-w-lg text-base leading-relaxed text-ink/70">
              {slide.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>


    </div>
  );
}
