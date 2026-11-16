import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ProjectImage from "./ProjectImage";

/*
 * A swipeable image carousel with an explanation block on each slide.
 * Desktop: the block floats over the bottom-left of the image. Mobile: it sits under the image.
 * Usage: <ScreenCarousel slides={[{ src: img1, title: "Short title", text: "One or two sentences." }, ...]} />
 * size: "screen" (16:10, default) or "large" (16:12).
 */
export type Slide = { src: string; title: string; text?: string };

function Arrow({ dir, onClick, disabled, className = "" }: { dir: "prev" | "next"; onClick: () => void; disabled: boolean; className?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      className={`flex size-10 items-center justify-center rounded-full bg-white text-brand shadow-md ring-1 ring-ink/5 transition hover:bg-lilac-100 disabled:opacity-30 ${className}`}
    >
      <FontAwesomeIcon icon={dir === "prev" ? faChevronLeft : faChevronRight} className="size-4" />
    </button>
  );
}

export default function ScreenCarousel({ slides, size = "screen" }: { slides: Slide[]; size?: "screen" | "large" }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(slides.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div ref={track} onScroll={onScroll} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {slides.map((s, i) => (
            <div key={i} className="relative w-full shrink-0 snap-center">
              <ProjectImage src={s.src} alt={s.title} size={size} />
              {/* Explanation block */}
              <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5 sm:absolute sm:bottom-5 sm:left-5 sm:mt-0 sm:max-w-sm sm:bg-white/90 sm:p-5 sm:shadow-lg sm:backdrop-blur-md">
                <p className="text-xs font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-ink">{s.title}</h3>
                {s.text && <p className="mt-1 text-sm leading-relaxed text-ink/70">{s.text}</p>}
              </div>
            </div>
          ))}
        </div>
        {slides.length > 1 && (
          <>
            <Arrow dir="prev" onClick={() => goTo(index - 1)} disabled={index === 0} className="absolute left-4 top-1/2 hidden -translate-y-1/2 sm:flex" />
            <Arrow dir="next" onClick={() => goTo(index + 1)} disabled={index === slides.length - 1} className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:flex" />
          </>
        )}
      </div>
      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Arrow dir="prev" onClick={() => goTo(index - 1)} disabled={index === 0} className="sm:hidden" />
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-brand" : "w-2 bg-ink/15 hover:bg-ink/30"}`}
              />
            ))}
          </div>
          <Arrow dir="next" onClick={() => goTo(index + 1)} disabled={index === slides.length - 1} className="sm:hidden" />
        </div>
      )}
    </div>
  );
}
