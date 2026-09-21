import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

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

export default function About() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-canvas">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -left-32 top-4 size-[620px] rounded-full bg-[#fffcf4] blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -top-28 size-[440px] rounded-full bg-lime opacity-20 blur-[70px]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1920px] grid-cols-1 lg:grid-cols-[minmax(360px,32%)_1fr]">
        {/* ---- sidebar nav ---- */}
        <div className="flex flex-col gap-10 px-8 py-12 lg:px-16 lg:py-20">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="group flex size-16 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white"
            >
              <ArrowForward className="size-6 rotate-180 transition-transform duration-300 group-hover:rotate-135" />
            </button>
            <span className="text-sm font-medium text-ink/60">My Journey</span>
          </div>

          {/* Placeholder for content structure - to be designed */}
          <nav className="flex flex-col gap-8 pt-4 lg:gap-14 lg:pt-5">
            <div className="flex flex-col items-start text-left">
              <span className="text-[22px] font-semibold leading-none text-ink/50">
                Story
              </span>
              <span className="mt-3 text-[clamp(34px,3.4vw,48px)] font-semibold leading-none text-ink/50">
                Coming Soon
              </span>
            </div>
          </nav>
        </div>

        {/* ---- content panel ---- */}
        <div className="relative min-h-[70vh] overflow-hidden lg:min-h-screen">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden bg-gradient-to-br from-brand to-brand-900"
          >
            {/* ambient blobs */}
            <div className="pointer-events-none absolute -right-40 top-24 size-[520px] rounded-full bg-white/10 blur-[120px]" />
            <div className="pointer-events-none absolute -left-40 bottom-0 size-[520px] rounded-full bg-black/25 blur-[160px]" />

            {/* content placeholder */}
            <div className="relative z-10 flex max-w-[760px] flex-col gap-6 px-8 pt-24 lg:px-16 lg:pt-28">
              <h2 className="text-[clamp(36px,4.4vw,64px)] font-semibold leading-[1.05] text-white">
                My Journey
              </h2>
              <p className="text-lg leading-relaxed text-white/80">
                This page is being designed. Come back soon to see my story, 
                experience, and the path that shaped me as a product designer.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
