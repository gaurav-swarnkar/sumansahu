import { useState } from "react";

/*
 * A project image with a fixed shape and a subtle shimmer until it loads.
 *   size="large"  → 16:12 (big, full-width images)
 *   size="small"  → 16:8  (wide banner-like images)
 *   size="screen" → 16:10 (product screens, used by ScreenCarousel)
 * To swap the picture, replace the file it imports (see src/assets/images/projects/<project>/sections/).
 */
const ratios = { large: "16 / 12", small: "16 / 8", screen: "16 / 10" } as const;

export default function ProjectImage({ src, alt, size = "large", className = "" }: { src: string; alt: string; size?: keyof typeof ratios; className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={`relative w-full overflow-hidden rounded-2xl bg-ink/5 shadow-sm ring-1 ring-ink/5 ${className}`} style={{ aspectRatio: ratios[size] }}>
      {!loaded && <div className="skeleton-shimmer-light absolute inset-0" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0 && !loaded) setLoaded(true);
        }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </figure>
  );
}
