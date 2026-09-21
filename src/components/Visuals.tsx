import { motion } from "motion/react";

const card =
  "absolute rounded-t-[40px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.28)]";

export function Tablets() {
  return (
    <div className="pointer-events-none absolute bottom-0 right-[-4%] h-[70%] w-[70%]">
      <motion.div
        initial={{ y: 120, opacity: 0, rotate: -19 }}
        animate={{ y: 0, opacity: 1, rotate: -19 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        className={`${card} bottom-[-14%] left-[6%] h-[85%] w-[16%] origin-bottom bg-[#fbfbfb]`}
      />
      <motion.div
        initial={{ y: 120, opacity: 0, rotate: -19 }}
        animate={{ y: 0, opacity: 1, rotate: -19 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className={`${card} bottom-[-10%] left-[16%] h-[92%] w-[24%] origin-bottom`}
      />
      <motion.div
        initial={{ y: 140, opacity: 0, rotate: -20 }}
        animate={{ y: 0, opacity: 1, rotate: -20 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className={`${card} bottom-[-24%] left-[30%] h-[88%] w-[72%] origin-bottom`}
      />
    </div>
  );
}

export function Monitor() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-1/2 h-[70%] w-[80%] -translate-x-1/2">
      {/* desk band */}
      <div className="absolute bottom-0 left-0 h-[36%] w-full rounded-t-[24px] bg-[#18033b]" />
      {/* stands */}
      <div className="absolute bottom-0 left-[26%] h-[24%] w-[8%] rounded-t-[16px] bg-[#18033b]" />
      <div className="absolute bottom-0 right-[26%] h-[24%] w-[8%] rounded-t-[16px] bg-[#18033b]" />
      {/* screen */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="absolute left-1/2 top-[6%] h-[70%] w-[62%] -translate-x-1/2 rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      />
    </div>
  );
}

export function Truck() {
  return (
    <motion.svg
      viewBox="0 0 760 420"
      className="pointer-events-none absolute bottom-[6%] right-[2%] h-[62%] w-[76%]"
      fill="none"
      initial={{ x: 140, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      {/* flatbed + cab */}
      <rect x="40" y="250" width="520" height="34" rx="10" fill="#d9d9d9" />
      <path
        d="M560 190h70l60 60v34h-130z"
        fill="#d9d9d9"
      />
      <rect x="590" y="205" width="55" height="40" rx="8" fill="#9747ff" />
      {/* wheels */}
      <circle cx="150" cy="300" r="30" fill="#18033b" />
      <circle cx="150" cy="300" r="13" fill="#d9d9d9" />
      <circle cx="590" cy="300" r="30" fill="#18033b" />
      <circle cx="590" cy="300" r="13" fill="#d9d9d9" />
      {/* boxes */}
      <g>
        <rect x="70" y="150" width="120" height="100" rx="8" fill="#d9d9d9" />
        <rect x="70" y="150" width="120" height="26" rx="8" fill="#9747ff" />
        <rect x="200" y="120" width="150" height="130" rx="8" fill="#d9d9d9" />
        <rect x="200" y="120" width="150" height="30" rx="8" fill="#9747ff" />
        <rect x="360" y="170" width="90" height="80" rx="8" fill="#dbad77" />
        <rect x="360" y="170" width="90" height="20" rx="8" fill="#a9794a" />
        <rect x="460" y="140" width="90" height="110" rx="8" fill="#d9d9d9" />
        <rect x="460" y="140" width="90" height="26" rx="8" fill="#9747ff" />
      </g>
    </motion.svg>
  );
}

export function Receipt() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-[16%] h-[60%] w-[40%]">
      <div className="absolute bottom-0 left-[-10%] h-[86%] w-[14%] bg-[#18033b]" />
      <motion.div
        initial={{ y: 160, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        className="absolute bottom-0 left-[8%] h-full w-[80%] bg-white"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 8px 0, transparent 8px, black 9px)",
          maskImage:
            "radial-gradient(circle at 8px 0, transparent 8px, black 9px)",
          WebkitMaskSize: "16px 16px",
          maskSize: "16px 16px",
          WebkitMaskRepeat: "repeat-x",
          maskRepeat: "repeat-x",
        }}
      />
    </div>
  );
}
