/**
 * Hue-shifted backgrounds per project: darker at the top-left where the white
 * text sits, opening up into a softer hue towards the bottom for the graphics.
 */
export const projectBackgrounds: Record<string, string> = {
  "study-planner": [
    "radial-gradient(70% 55% at 100% 100%, rgba(240,255,100,0.22) 0%, transparent 60%)",
    "radial-gradient(80% 60% at 0% 100%, rgba(255,110,210,0.38) 0%, transparent 65%)",
    "linear-gradient(160deg, #2e0a78 0%, #5517d4 45%, #8a4dff 100%)",
  ].join(", "),
  "truck-fill": [
    "radial-gradient(75% 55% at 100% 100%, rgba(56,214,255,0.32) 0%, transparent 60%)",
    "radial-gradient(70% 55% at 0% 100%, rgba(120,90,255,0.4) 0%, transparent 65%)",
    "linear-gradient(160deg, #1b0855 0%, #3a1aa8 50%, #2f5be0 100%)",
  ].join(", "),
  "recipe-stock": [
    "radial-gradient(75% 55% at 100% 100%, rgba(255,170,90,0.3) 0%, transparent 60%)",
    "radial-gradient(70% 55% at 0% 100%, rgba(255,80,170,0.38) 0%, transparent 65%)",
    "linear-gradient(160deg, #24025e 0%, #5a0fa0 50%, #a3307f 100%)",
  ].join(", "),
  "brand-experience": [
    "radial-gradient(75% 55% at 100% 100%, rgba(240,255,100,0.25) 0%, transparent 60%)",
    "radial-gradient(70% 55% at 0% 100%, rgba(255,120,120,0.35) 0%, transparent 65%)",
    "linear-gradient(160deg, #1f0547 0%, #4a12b8 50%, #7a3cf0 100%)",
  ].join(", "),
  "design-systems": [
    "radial-gradient(75% 55% at 100% 100%, rgba(110,231,183,0.28) 0%, transparent 60%)",
    "radial-gradient(70% 55% at 0% 100%, rgba(99,102,241,0.4) 0%, transparent 65%)",
    "linear-gradient(160deg, #130433 0%, #321089 50%, #2a4bc4 100%)",
  ].join(", "),
};
