// BACKUP: Hero Component - Homepage
// Date: 2026-08-31
// Features:
// - Animated typing title that cycles through 4 different titles with purple highlights
// - Dynamic badges showing experience and availability
// - Three CTA buttons with smooth hover animations
// - Random moving light strobe effect in background
// - Smooth exit animations when navigating to other pages
// - Responsive design with Tailwind CSS v4
// - Image positioned with dynamic sizing and shadows

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBolt } from "@fortawesome/free-solid-svg-icons";
import heroImage from "../imports/Main/4c74906ffa4be2217b2d960958c0d49e73b948cc.png";

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
      text: "Shaping Human–AI Collaboration",
      highlight: "Human–AI",
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
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingActive, setIsTypingActive] = useState(true);

  const currentTitle = titles[currentIndex];
  const fullText = currentTitle.text;
  const isTextComplete = displayedText.length === fullText.length;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isTypingActive && !isTextComplete) {
      // Currently typing
      timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 50);
    } else if (isTextComplete && isTypingActive) {
      // Text is complete, wait before switching
      setIsTypingActive(false);
    } else if (!isTypingActive && isTextComplete) {
      // Wait period, then switch to next title
      timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % titles.length);
        setDisplayedText("");
        setIsTypingActive(true);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isTypingActive, isTextComplete, fullText, titles.length]);

  const renderText = () => {
    const fullText = currentTitle.text;
    const highlightWords = currentTitle.highlight.split(/[\s–-]+/);
    
    // Create character-level highlighting map
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

    // Build JSX with character-level highlighting
    const result: JSX.Element[] = [];
    let currentSpanHighlighted: boolean | null = null;
    let currentSpanText = "";

    for (let i = 0; i < displayedText.length; i++) {
      const char = displayedText[i];
      const charHighlighted = isHighlightedChar[i];

      if (charHighlighted !== currentSpanHighlighted) {
        // Highlight state changed, render previous span
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

    // Don't forget the last span
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
    <h1 className="mt-2 text-[clamp(36px,5vw,70px)] font-semibold leading-tight text-ink-soft lg:max-w-[900px] min-h-[180px]">
      {renderText()}
      {isTypingActive && <span className="animate-pulse">|</span>}
    </h1>
  );
}

function CtaButton({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative flex h-[68px] w-fit max-w-[280px] items-center overflow-hidden"
    >
      {/* sliding fill from left */}
      <span className="absolute inset-y-0 left-0 right-[44px] bg-lilac transition-all duration-500 ease-out group-hover:right-0 group-hover:bg-brand-600" />
      <span className="relative z-10 flex w-full items-center justify-between px-4 gap-4">
        <span className="text-[26px] font-semibold leading-none tracking-tight text-white">
          {label}
        </span>
        <ArrowForward className="size-7 text-white opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:-rotate-45 flex-shrink-0" />
      </span>
    </button>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleNavigation = (path: string) => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <section className="relative flex h-screen w-full items-center overflow-hidden bg-white">
      {/* warm glow */}
      <div className="pointer-events-none absolute -left-40 top-8 size-[620px] rounded-full bg-[#fffcf4] blur-[120px]" />
      {/* lime glow behind image */}
      <div className="pointer-events-none absolute -right-24 -top-40 size-[560px] rounded-full bg-lime opacity-20 blur-[80px]" />
      
      {/* random moving light strobe on left side */}
      <motion.div
        animate={{
          x: [-200, 100, -150, 250, -300, 50, -100, 300, -200],
          y: [-150, -300, 200, -100, 300, -200, 100, -250, -150],
          scale: [1, 1.2, 0.9, 1.1, 0.95, 1.15, 1, 0.85, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-1/3 left-1/4 size-[400px] rounded-full bg-[#fdfbd4] blur-[60px]"
      />

      <div className="relative z-10 grid h-full w-full grid-cols-1 items-center lg:grid-cols-[1.5fr_1fr]">
        {/* left copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ 
            opacity: isExiting ? 0 : 1, 
            y: isExiting ? 24 : 0,
            x: isExiting ? 100 : 0
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-[820px] pl-[37px] pr-8 py-20 lg:max-w-full lg:pl-[74px] lg:pr-16"
        >
          <p className="text-[26px] font-semibold text-muted sm:text-[32px]">
            I am Suman S.
          </p>
          <AnimatedTitle />

          {/* Inline badges */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-2 backdrop-blur-sm">
              <FontAwesomeIcon icon={faBriefcase} className="text-ink-soft text-sm" />
              <span className="text-sm font-medium text-ink-soft">4+ Yrs Exp. in Saas Design</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/15 px-4 py-2 backdrop-blur-sm">
              <FontAwesomeIcon icon={faBolt} className="text-ink-soft text-sm" />
              <span className="text-sm font-medium text-ink-soft">Open for Work</span>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-8">
            <CtaButton label="Project Stories" onClick={() => handleNavigation("/projects")} />
            <CtaButton label=" My Journey" onClick={() => handleNavigation("/about")} />
            <CtaButton label="Let's Connect" onClick={() => handleNavigation("/contact")} />
          </div>
        </motion.div>

        {/* right image panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ 
            opacity: isExiting ? 0 : 1, 
            scale: isExiting ? 0.96 : 1,
            x: isExiting ? 100 : 0
          }}
          transition={{ duration: 0.5, ease: "easeOut", delay: isExiting ? 0 : 0.15 }}
          className="relative h-full w-full bg-brand"
        >
          <div className="absolute right-0 top-0 h-full w-full bg-brand" />
          <div className="absolute right-[21%] top-[7%] h-[86%] w-[80%] border-4 border-white" />
          <motion.img
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src={heroImage}
            alt="Suman S., product designer, seated in a lilac armchair beside a potted plant"
            className="absolute bottom-0 right-[24%] h-[100%] w-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
