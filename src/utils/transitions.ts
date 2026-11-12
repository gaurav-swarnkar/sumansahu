import { useEffect, useState } from "react";
import type { Transition, Variants } from "motion/react";

/**
 * Page transitions for the split layouts.
 *
 * Each route is wrapped in a motion element using `pageVariants`
 * (initial="hidden", animate="visible", exit="exit"). Children that only set
 * `variants` inherit those states, so the left half and the right half of a
 * page can enter and leave in opposite directions without any extra state.
 */

const enter: Transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
const leave: Transition = { duration: 0.4, ease: [0.55, 0, 0.75, 0.2] };

export const pageVariants: Variants = {
  hidden: {},
  visible: {},
  exit: {},
};

function slide(axis: "x" | "y", distance: number): Variants {
  return {
    hidden: { opacity: 0, [axis]: distance },
    visible: { opacity: 1, [axis]: 0, transition: enter },
    exit: { opacity: 0, [axis]: distance, transition: leave },
  };
}

const desktop = { left: slide("x", -120), right: slide("x", 120) };
// On mobile the halves are stacked, so the top part moves up and the bottom part down.
const mobile = { left: slide("y", -40), right: slide("y", 60) };

const DESKTOP_QUERY = "(min-width: 1024px)";

/** Variants for the two halves of a split page: `left` (or top) and `right` (or bottom). */
export function useSplitVariants() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia(DESKTOP_QUERY).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop ? desktop : mobile;
}
