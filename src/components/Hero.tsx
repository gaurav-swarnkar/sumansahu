import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBolt, faBrain } from "@fortawesome/free-solid-svg-icons";
import heroImage from "../imports/Main/4c74906ffa4be2217b2d960958c0d49e73b948cc.png";
import ConnectButton from "./ConnectButton";
import { LightSideAmbient, PurplePanelAmbient } from "./HeroAmbient";
import { useSplitVariants } from "../utils/transitions";

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

function AnimatedTitle() {
  const titles = [
    {
      text: "Designing Intelligent Product Experiences",
      highlight: "Product Experiences",
    },
    {
      text: "Shaping Human & AI Collaboration",
      highlight: "Human & AI",
    },
    {
      text: "Turning Complexity into Adaptive Experiences",
      highlight: "Adaptive Experiences",
    },
    {
      text: "Building Trust, Control & Autonomy",
      highlight: "Trust",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTitle = titles[currentIndex];

  // Show each line for a few seconds, then zoom/fade to the next one
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 4500);
    return () => clearTimeout(timer);
  }, [currentIndex, titles.length]);

  // Split the line so the highlighted phrase renders in the brand colour
  const renderText = () => {
    const { text, highlight } = currentTitle;
    const start = text.indexOf(highlight);
    if (start === -1) return text;
    return (
      <>
        {text.slice(0, start)}
        <span className="text-brand font-semibold">{highlight}</span>
        {text.slice(start + highlight.length)}
      </>
    );
  };

  return (
    <h1 className="relative mt-2 text-[clamp(24px,4vw,70px)] font-semibold leading-tight text-ink-soft lg:max-w-[900px] min-h-[2.5em]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="block origin-left"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderText()}
        </motion.span>
      </AnimatePresence>
    </h1>
  );
}

function CtaButton({
  label,
  splitAt,
  onClick,
  variant = "primary",
}: {
  label: string;
  splitAt: number;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary";
}) {
  const head = label.slice(0, splitAt);
  const tail = label.slice(splitAt);
  
  const variantClasses = {
    primary: "bg-lilac text-white hover:bg-brand-600",
    secondary: "bg-white text-lilac border-2 border-lilac hover:bg-lilac hover:text-white",
    tertiary: "bg-transparent text-lilac border-2 border-lilac hover:bg-lilac hover:text-white",
  };
  
  return (
    <button
      onClick={onClick}
      className={`group relative flex h-16 sm:h-[64px] w-full sm:w-[224px] items-center justify-center gap-4 rounded-full transition-colors duration-300 ${variantClasses[variant]}`}
    >
      <span className="text-sm sm:text-[20px] font-medium leading-none tracking-tight">
        {label}
      </span>
      <ArrowForward className="size-4 sm:size-5 transition-transform duration-300 group-hover:-rotate-45 flex-shrink-0" />
    </button>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const split = useSplitVariants();

  // The route transition (see utils/transitions) slides the halves apart on exit.
  const handleNavigation = (path: string) => navigate(path);

  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden bg-white">
      {/* warm glow */}
      <div className="pointer-events-none absolute -left-40 top-8 size-[620px] rounded-full bg-[#fffcf4] blur-[120px]" />
      {/* lime glow behind image */}
      <div className="pointer-events-none absolute -right-24 -top-40 size-[560px] rounded-full bg-lime opacity-20 blur-[80px]" />
      
      {/* random moving light strobe - small and faded */}
      <motion.div
        animate={{
          x: [-100, 50, -75, 125, -150, 25, -50, 150, -100],
          y: [-75, -150, 100, -50, 150, -100, 50, -125, -75],
          scale: [1, 1.2, 0.9, 1.1, 0.95, 1.15, 1, 0.85, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-1/3 left-1/4 size-[200px] rounded-full bg-[#fdfbd4] opacity-30 blur-[40px]"
      />

      {/* floating dots on the light side (desktop) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[60%] lg:block">
        <LightSideAmbient />
      </div>

      {/* DESKTOP: Grid layout */}
      <div className="hidden lg:grid relative z-10 w-full h-full grid-cols-[1.5fr_1fr]">
        {/* left copy */}
        <motion.div variants={split.left}
          className="flex flex-col justify-center max-w-full px-4 py-20 lg:px-8 lg:pl-[74px] lg:pr-16"
        >
          <p className="text-[26px] md:text-[32px] font-semibold text-muted">
            I am Suman S.
          </p>

          {/* Inline badges */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-2 backdrop-blur-sm text-sm">
              <FontAwesomeIcon icon={faBrain} className="text-ink-soft text-sm flex-shrink-0" />
              <span className="font-medium text-ink-soft">AI enabled product designer</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-2 backdrop-blur-sm text-sm">
              <FontAwesomeIcon icon={faBriefcase} className="text-ink-soft text-sm flex-shrink-0" />
              <span className="font-medium text-ink-soft">6+ Yrs Exp. in Design</span>
            </div>
          </div>

          <AnimatedTitle />

          <div className="mt-6 flex flex-row items-center gap-4 w-full">
            <CtaButton label="Project Stories" splitAt={4} onClick={() => handleNavigation("/projects")} variant="primary" />
            <CtaButton label="My Journey" splitAt={2} onClick={() => handleNavigation("/about")} variant="secondary" />
          </div>
        </motion.div>

        {/* right image panel */}
        <motion.div variants={split.right}
          className="relative h-full w-full bg-brand"
        >
          <div className="absolute right-0 top-0 h-full w-full bg-brand" />
          <PurplePanelAmbient />
          <div className="absolute right-[21%] top-[7%] h-[86%] w-[80%] border-4 border-white" />
          <img
            src={heroImage}
            alt="Suman S., product designer, seated in a lilac armchair beside a potted plant"
            className="absolute bottom-0 right-[24%] h-[100%] w-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      <ConnectButton />

      {/* MOBILE: Vertical layout with top white, bottom purple */}
      <div className="flex lg:hidden relative z-10 flex-col h-full w-full">

        {/* Top White Section - Title */}
        <motion.div variants={split.left}
          className="flex-shrink-0 flex flex-col justify-start px-4 pt-[24px] lg:pt-10 pb-4 lg:pb-8 lg:h-[35%] relative"
        >
          <p className="text-[20px] lg:text-base font-semibold text-muted">
            I am Suman S.
          </p>

          {/* Badges for mobile - single line */}
          <div className="mt-2 lg:mt-3 hidden lg:flex flex-row lg:flex-nowrap items-center gap-2 lg:gap-1.5 z-30">
            <div className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-3 py-2 lg:px-2 lg:py-1.5 backdrop-blur-sm text-xs lg:text-xs">
              <FontAwesomeIcon icon={faBrain} className="text-ink-soft text-[20px] lg:text-xs flex-shrink-0" />
              <span className="font-medium text-ink-soft">AI Enabled Product Designer</span>
            </div>
            <div className="inline-flex items-center gap-1 rounded-full bg-brand/15 px-3 py-2 lg:px-2 lg:py-1.5 backdrop-blur-sm text-xs lg:text-xs">
              <FontAwesomeIcon icon={faBriefcase} className="text-ink-soft text-[20px] lg:text-xs flex-shrink-0" />
              <span className="font-medium text-ink-soft">6 yrs. Experience</span>
            </div>
          </div>

          <div className="mt-[32px] lg:mt-2 text-center text-[36px] lg:text-[2.4rem] font-semibold leading-snug lg:leading-tight text-ink-soft lg:min-h-[200px] h-[180px]">
            {(() => {
              const titles = [
                { text: "Designing Intelligent Product Experiences", highlight: "Product Experiences" },
                { text: "Shaping Human & AI Collaboration", highlight: "Human & AI" },
                { text: "Turning Complexity into Adaptive Experiences", highlight: "Adaptive Experiences" },
                { text: "Building Trust, Control & Autonomy", highlight: "Trust" },
              ];
              const [currentIndex, setCurrentIndex] = useState(0);

              useEffect(() => {
                const timer = setInterval(() => {
                  setCurrentIndex((prev) => (prev + 1) % titles.length);
                }, 5000);
                return () => clearInterval(timer);
              }, []);

              const currentTitle = titles[currentIndex];
              const fullText = currentTitle.text;
              const highlightWords = currentTitle.highlight.split(/[\s–-]+/);
              const isHighlightedChar = Array(fullText.length).fill(false);
              
              highlightWords.forEach(word => {
                const regex = new RegExp(`\\b${word}\\b`, "gi");
                let match;
                while ((match = regex.exec(fullText)) !== null) {
                  for (let i = match.index; i < match.index + match[0].length; i++) {
                    isHighlightedChar[i] = true;
                  }
                }
              });

              const renderText = () => {
                const result: JSX.Element[] = [];
                let currentSpanHighlighted: boolean | null = null;
                let currentSpanText = "";

                for (let i = 0; i < fullText.length; i++) {
                  const char = fullText[i];
                  const charHighlighted = isHighlightedChar[i];

                  if (charHighlighted !== currentSpanHighlighted) {
                    if (currentSpanText) {
                      result.push(
                        <span
                          key={result.length}
                          className={currentSpanHighlighted ? "text-brand font-semibold" : ""}
                        >
                          {currentSpanText}
                        </span>
                      );
                    }
                    currentSpanText = char;
                    currentSpanHighlighted = charHighlighted;
                  } else {
                    currentSpanText += char;
                  }
                }

                if (currentSpanText) {
                  result.push(
                    <span
                      key={result.length}
                      className={currentSpanHighlighted ? "text-brand font-semibold" : ""}
                    >
                      {currentSpanText}
                    </span>
                  );
                }

                return result;
              };

              return (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    {renderText()}
                  </motion.div>
                </AnimatePresence>
              );
            })()}
          </div>
        </motion.div>

        {/* Bottom Section - Image Container - Normal Flow (not absolute) */}
        <motion.div variants={split.right}
          className="flex-1 relative flex items-center justify-center w-full"
          style={{ backgroundImage: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgb(115, 34, 255) 100%)' }}
        >
          <PurplePanelAmbient compact />
          <img
            src={heroImage}
            alt="Suman S., product designer, seated in a lilac armchair beside a potted plant"
            className="w-full h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Bottom Navigation Menu - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 w-full px-4 py-4 bg-white border-t border-ink/10 flex flex-col gap-3">
        <div className="flex gap-3">
          <button
            onClick={() => handleNavigation("/projects")}
            className="flex-1 h-[52px] bg-lilac text-white font-semibold text-sm rounded-full transition-all hover:bg-brand-600 active:scale-95"
          >
            Project Stories
          </button>
          <button
            onClick={() => handleNavigation("/about")}
            className="flex-1 h-[52px] bg-white text-lilac font-semibold text-sm border-2 border-lilac rounded-full transition-all hover:bg-lilac hover:text-white active:scale-95"
          >
            My Journey
          </button>
        </div>
        <div className="hidden flex gap-3">
          <button
            onClick={() => handleNavigation("/about")}
            className="flex-1 h-[52px] bg-white text-lilac font-semibold text-sm border-2 border-lilac rounded-full transition-all hover:bg-lilac hover:text-white active:scale-95"
          >
            Experience
          </button>
          <button
            onClick={() => window.open("https://sumansahu.in", "_blank")}
            className="flex-1 h-[52px] bg-white text-lilac font-semibold text-sm border-2 border-lilac rounded-full transition-all hover:bg-lilac hover:text-white active:scale-95"
          >
            Watch
          </button>
        </div>
      </div>

    </section>
  );
}
