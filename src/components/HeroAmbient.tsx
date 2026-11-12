import { motion, useReducedMotion } from "motion/react";

/**
 * Subtle ambient motion for the home page so it feels alive without
 * competing with the content. Everything is decorative (aria-hidden,
 * pointer-events-none) and stays still when the visitor prefers reduced motion.
 */

type Orb = {
  className: string; // size + position + colour
  x: number[];
  y: number[];
  duration: number;
  delay?: number;
};

// Soft, blurred circles hugging the edges of the purple panel
const panelOrbs: Orb[] = [
  { className: "-left-24 -top-24 size-72 bg-white/10", x: [0, 30, -10, 0], y: [0, 20, 40, 0], duration: 22 },
  { className: "-right-28 top-1/4 size-80 bg-lilac-100/15", x: [0, -40, -10, 0], y: [0, 30, -20, 0], duration: 26, delay: 2 },
  { className: "-bottom-32 left-1/4 size-96 bg-brand-900/30", x: [0, 40, -30, 0], y: [0, -30, -10, 0], duration: 30, delay: 1 },
  { className: "-bottom-20 -right-20 size-64 bg-white/10", x: [0, -25, 15, 0], y: [0, -35, -10, 0], duration: 24, delay: 4 },
];

// Thin rings that slowly breathe and drift near the corners
const panelRings = [
  { className: "-right-16 -top-16 size-64", duration: 18, delay: 0 },
  { className: "-left-20 bottom-10 size-48", duration: 22, delay: 3 },
];

export function PurplePanelAmbient({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const orbs = compact ? panelOrbs.slice(2) : panelOrbs;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          animate={reduce ? undefined : { x: orb.x, y: orb.y, opacity: [0.6, 1, 0.7, 0.6] }}
          transition={{ duration: orb.duration, delay: orb.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {!compact &&
        panelRings.map((ring, i) => (
          <motion.div
            key={`ring-${i}`}
            className={`absolute rounded-full border border-white/15 ${ring.className}`}
            animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.35, 0.7, 0.35], rotate: [0, 20, 0] }}
            transition={{ duration: ring.duration, delay: ring.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
    </div>
  );
}

// Tiny brand-coloured dots that float gently on the light side
const dots = [
  { className: "left-[8%] top-[18%] size-2 bg-brand/30", y: [0, -14, 0], duration: 7 },
  { className: "left-[46%] top-[12%] size-1.5 bg-lilac/40", y: [0, 12, 0], duration: 9, delay: 1.5 },
  { className: "left-[62%] top-[30%] size-2.5 bg-brand/20", y: [0, -18, 0], duration: 11, delay: 0.5 },
  { className: "left-[12%] top-[78%] size-2 bg-lilac/30", y: [0, -12, 0], duration: 8, delay: 2 },
  { className: "left-[52%] top-[84%] size-1.5 bg-brand/30", y: [0, 10, 0], duration: 10, delay: 3 },
  { className: "left-[70%] top-[66%] size-3 rounded-full border border-brand/25 bg-transparent", y: [0, -16, 0], duration: 12, delay: 1 },
];

export function LightSideAmbient() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((dot, i) => (
        <motion.span
          key={i}
          className={`absolute rounded-full ${dot.className}`}
          animate={reduce ? undefined : { y: dot.y, opacity: [0.4, 1, 0.4] }}
          transition={{ duration: dot.duration, delay: dot.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
