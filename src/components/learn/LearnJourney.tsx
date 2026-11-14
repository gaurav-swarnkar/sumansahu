import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

// Notesight · Attempt 2 · Learn · focus mode
// Figma: Sumansahu_Portfolio_Projects → 01 · AI Study Planner → node 60:765

type Question = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  coach: string;
};

const TOPIC = "Quadratics";
const SESSION_SECONDS = 30 * 60;

const QUESTIONS: Question[] = [
  {
    prompt: "Solve  x² − 9 = 0",
    options: ["x = 3  or  x = −3", "x = 9", "x = 3 only"],
    answer: 0,
    hint: "This is a difference of two squares: a² − b² = (a − b)(a + b).",
    explanation: "(x − 3)(x + 3) = 0, so x = 3 or x = −3.",
    coach: "Square roots always come in pairs. Both 3² and (−3)² equal 9, so both are solutions.",
  },
  {
    prompt: "Solve  x² + 4x = 0",
    options: ["x = 4", "x = 0  or  x = −4", "x = 0  or  x = 4"],
    answer: 1,
    hint: "Both terms share an x. Try factoring it out first.",
    explanation: "x(x + 4) = 0, so x = 0 or x = −4.",
    coach: "Never divide both sides by x. You would lose the x = 0 solution. Factor instead.",
  },
  {
    prompt: "Solve  x² − 7x + 12 = 0",
    options: ["x = 3  or  x = 4", "x = −3  or  x = −4", "x = 2  or  x = 6"],
    answer: 0,
    hint: "Find two numbers that multiply to 12 and add to −7.",
    explanation: "(x − 3)(x − 4) = 0, so x = 3 or x = 4.",
    coach: "−3 and −4 multiply to +12 and add to −7. Flip the signs to get the roots: 3 and 4.",
  },
  {
    prompt: "Solve  x² − 5x + 6 = 0",
    options: ["x = 2  or  x = 3", "x = −2  or  x = −3", "x = 1  or  x = 6"],
    answer: 0,
    hint: "Find two numbers that multiply to 6 and add to −5.",
    explanation: "(x − 2)(x − 3) = 0, so one factor must be zero: x = 2 or x = 3.",
    coach: "If two numbers multiply to 0, at least one of them must be 0. That's why each factor is set equal to zero.",
  },
  {
    prompt: "Solve  x² + 2x − 15 = 0",
    options: ["x = 3  or  x = 5", "x = 3  or  x = −5", "x = −3  or  x = 5"],
    answer: 1,
    hint: "Two numbers that multiply to −15 and add to +2.",
    explanation: "(x + 5)(x − 3) = 0, so x = −5 or x = 3.",
    coach: "A negative constant means the factors have opposite signs. +5 and −3 add to +2.",
  },
  {
    prompt: "Solve  2x² − 8 = 0",
    options: ["x = 4  or  x = −4", "x = 2  or  x = −2", "x = 2 only"],
    answer: 1,
    hint: "Divide everything by 2 first.",
    explanation: "x² = 4, so x = 2 or x = −2.",
    coach: "Pulling out a common factor first keeps the numbers small and the factoring easy.",
  },
  {
    prompt: "Solve  x² − 6x + 9 = 0",
    options: ["x = 3", "x = −3", "x = 3  or  x = −3"],
    answer: 0,
    hint: "Is this a perfect square?",
    explanation: "(x − 3)² = 0, so x = 3 is a repeated root.",
    coach: "A perfect square trinomial touches the x-axis once, so there's only one distinct solution.",
  },
  {
    prompt: "Which equation has roots 1 and −5?",
    options: ["x² − 4x − 5 = 0", "x² + 4x − 5 = 0", "x² + 6x + 5 = 0"],
    answer: 1,
    hint: "Roots r and s come from (x − r)(x − s) = 0.",
    explanation: "(x − 1)(x + 5) = x² + 4x − 5.",
    coach: "Working backwards from roots to an equation is the same factoring, just in reverse.",
  },
];

const LETTERS = ["A", "B", "C", "D"];

type Result = "correct" | "wrong" | null;

function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function correctTitle(streak: number) {
  if (streak >= 3) return `Nailed it! That's ${streak} in a row.`;
  if (streak === 2) return "Two in a row. Keep it going!";
  return "Nice one!";
}

function PillButton({
  children,
  onClick,
  kind = "soft",
  active = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  kind?: "primary" | "soft";
  active?: boolean;
  disabled?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-3 sm:px-6 sm:py-[14px] text-[15px] font-semibold whitespace-nowrap transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-nb-math focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40";
  const styles =
    kind === "primary"
      ? "bg-nb-ink text-nb-surface hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(26,26,46,0.2)]"
      : `border-[1.5px] text-nb-ink hover:border-nb-math/40 ${
          active ? "border-nb-math bg-nb-math-soft" : "border-nb-line bg-nb-surface"
        }`;
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

export default function LearnJourney() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<Result[]>(() => QUESTIONS.map(() => null));
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showCoach, setShowCoach] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(SESSION_SECONDS);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[index];
  const answered = selected !== null;
  const isCorrect = answered && selected === question.answer;
  const correctCount = useMemo(() => results.filter((r) => r === "correct").length, [results]);

  useEffect(() => {
    if (finished) return;
    const id = window.setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [finished]);

  const choose = (i: number) => {
    if (answered) return;
    const correct = i === question.answer;
    setSelected(i);
    setResults((prev) => prev.map((r, idx) => (idx === index ? (correct ? "correct" : "wrong") : r)));
    const nextStreak = correct ? streak + 1 : 0;
    setStreak(nextStreak);
    setBestStreak((b) => Math.max(b, nextStreak));
  };

  const toggleHint = () => {
    if (!showHint && !answered) setHintsUsed((h) => h + 1);
    setShowHint((v) => !v);
  };

  const next = () => {
    if (index === QUESTIONS.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setShowHint(false);
    setShowCoach(false);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setResults(QUESTIONS.map(() => null));
    setStreak(0);
    setBestStreak(0);
    setShowHint(false);
    setShowCoach(false);
    setHintsUsed(0);
    setSecondsLeft(SESSION_SECONDS);
    setFinished(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (finished) return;
      const n = Number(e.key);
      if (!answered && n >= 1 && n <= question.options.length) choose(n - 1);
      if (answered && e.key === "Enter") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const exit = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const minutesSpent = Math.max(1, Math.round((SESSION_SECONDS - secondsLeft) / 60));

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-6 overflow-clip bg-nb-bg px-4 pb-10 pt-7 font-outfit text-nb-ink sm:px-10 lg:px-20">
      {/* Background glows */}
      <img
        src="/learn/ellipse-1.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[-270px] top-[-270px] h-[740px] w-[740px] max-w-none"
      />
      <img
        src="/learn/ellipse-2.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-[-330px] right-[-330px] h-[720px] w-[720px] max-w-none"
      />

      {/* Focus bar */}
      <div className="relative z-10 flex w-full items-center gap-4">
        <button
          type="button"
          onClick={exit}
          className="flex shrink-0 items-center gap-2 rounded-full bg-nb-surface py-[10px] pl-[14px] pr-[18px] text-[14px] font-semibold transition-shadow hover:shadow-[0_4px_14px_rgba(26,26,46,0.08)]"
        >
          <img src="/learn/icon-x.svg" alt="" width={16} height={16} />
          Exit
        </button>

        <div
          className="flex min-w-0 flex-1 items-center justify-center gap-2"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={QUESTIONS.length}
          aria-valuenow={index + 1}
          aria-label={`Question ${index + 1} of ${QUESTIONS.length}`}
        >
          {results.map((r, i) => {
            const current = i === index && !finished;
            const color = current
              ? "bg-nb-math"
              : r === "correct"
                ? "bg-nb-eng"
                : r === "wrong"
                  ? "bg-nb-coral"
                  : "bg-nb-line";
            return (
              <motion.span
                key={i}
                layout
                className={`h-3 rounded-[6px] ${color}`}
                animate={{ width: current ? 36 : 12 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-full bg-nb-surface py-[10px] pl-[14px] pr-4 text-[14px] font-semibold tabular-nums">
          <img src="/learn/icon-clock.svg" alt="" width={16} height={16} />
          {formatTime(secondsLeft)}
        </div>
      </div>

      <div className="min-h-0 flex-1" />

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 flex w-full max-w-[780px] flex-col gap-[22px] rounded-[28px] bg-nb-surface px-5 pb-8 pt-8 shadow-[0_24px_60px_rgba(110,87,207,0.1)] sm:rounded-[36px] sm:px-12 sm:pb-10 sm:pt-11"
          >
            <div className="flex items-center gap-[10px]">
              <span className="flex items-center gap-[6px] rounded-full bg-nb-math-soft py-[5px] pl-[10px] pr-3 text-[13px]">
                <span>📐</span>
                <span className="font-semibold text-nb-math">{TOPIC}</span>
              </span>
              <span className="text-[14px] font-medium text-nb-muted">
                Question {index + 1} of {QUESTIONS.length}
              </span>
            </div>

            <h1 className="whitespace-pre-wrap text-[30px] font-semibold leading-tight sm:text-[42px] sm:leading-normal">
              {question.prompt}
            </h1>

            <div className="flex flex-col gap-[22px]" role="radiogroup" aria-label="Answer options">
              {question.options.map((opt, i) => {
                const isAnswer = i === question.answer;
                const isPicked = i === selected;
                const showCorrect = answered && isAnswer;
                const showWrong = answered && isPicked && !isAnswer;
                const row = showCorrect
                  ? "border-nb-eng bg-nb-eng-soft"
                  : showWrong
                    ? "border-nb-coral bg-nb-coral-soft"
                    : `border-transparent bg-nb-bg ${answered ? "" : "hover:border-nb-math/30 hover:bg-nb-math-soft/40"}`;
                const badge = showCorrect
                  ? "bg-nb-eng text-nb-surface"
                  : showWrong
                    ? "bg-nb-coral text-nb-surface"
                    : "bg-nb-surface text-nb-ink-2";
                return (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={isPicked}
                    onClick={() => choose(i)}
                    disabled={answered}
                    className={`flex w-full items-center gap-[14px] rounded-full border-2 py-[14px] pl-[14px] pr-5 text-left transition-colors duration-150 disabled:cursor-default ${row}`}
                  >
                    <span
                      className={`flex size-[34px] shrink-0 items-center justify-center rounded-full text-[14px] font-semibold ${badge}`}
                    >
                      {LETTERS[i]}
                    </span>
                    <span className="min-w-0 flex-1 whitespace-pre-wrap text-[17px] font-medium sm:text-[19px]">
                      {opt}
                    </span>
                    {showCorrect && <img src="/learn/icon-check.svg" alt="Correct" width={22} height={22} />}
                  </button>
                );
              })}
            </div>

            <AnimatePresence initial={false}>
              {showHint && !answered && (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-[14px] rounded-[22px] border-[1.5px] border-dashed border-nb-sun/60 px-[18px] py-4">
                    <span className="text-[24px]">💡</span>
                    <p className="text-[14px] text-nb-ink-2">{question.hint}</p>
                  </div>
                </motion.div>
              )}

              {answered && (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  aria-live="polite"
                  className={`flex items-center gap-[14px] rounded-[22px] px-[18px] py-4 ${
                    isCorrect ? "bg-nb-sun-soft" : "bg-nb-coral-soft"
                  }`}
                >
                  <span className="text-[28px]">{isCorrect ? "🎉" : "💪"}</span>
                  <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                    <p className="text-[16px] font-semibold">
                      {isCorrect ? correctTitle(streak) : "Not quite. Mistakes are how you learn."}
                    </p>
                    <p className="text-[14px] text-nb-ink-2">{question.explanation}</p>
                  </div>
                </motion.div>
              )}

              {showCoach && (
                <motion.div
                  key="coach"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-3 rounded-[22px] bg-nb-math-soft px-[18px] py-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-nb-math text-[15px] text-nb-surface">
                      ✨
                    </span>
                    <div className="flex min-w-0 flex-col gap-[2px]">
                      <p className="text-[13px] font-semibold text-nb-math">Notsi · Study coach</p>
                      <p className="text-[14px] text-nb-ink">
                        {answered ? question.coach : `Here's a nudge: ${question.hint}`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-2 pt-2 sm:gap-[10px] sm:pt-6">
              <PillButton onClick={toggleHint} active={showHint && !answered} disabled={answered}>
                💡 Hint
              </PillButton>
              <PillButton onClick={() => setShowCoach((v) => !v)} active={showCoach}>
                ✨ Ask Coach
              </PillButton>
              <div className="min-w-0 flex-1" />
              <PillButton kind="primary" onClick={next} disabled={!answered}>
                {index === QUESTIONS.length - 1 ? "Finish  →" : "Next  →"}
              </PillButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 flex w-full max-w-[780px] flex-col items-center gap-6 rounded-[28px] bg-nb-surface px-5 pb-10 pt-11 text-center shadow-[0_24px_60px_rgba(110,87,207,0.1)] sm:rounded-[36px] sm:px-12"
          >
            <span className="text-[56px]">{correctCount >= 6 ? "🏆" : "🌱"}</span>
            <div className="flex flex-col gap-2">
              <h1 className="text-[30px] font-semibold sm:text-[38px]">
                {correctCount >= 6 ? "Session complete. Great work!" : "Session complete. Progress made!"}
              </h1>
              <p className="text-[16px] text-nb-ink-2">
                You worked through {QUESTIONS.length} {TOPIC.toLowerCase()} questions. Every one counts toward
                your plan.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Correct", value: `${correctCount}/${QUESTIONS.length}`, bg: "bg-nb-eng-soft", fg: "text-nb-eng" },
                { label: "Best streak", value: `${bestStreak}🔥`, bg: "bg-nb-sun-soft", fg: "text-nb-ink" },
                { label: "Hints used", value: `${hintsUsed}`, bg: "bg-nb-math-soft", fg: "text-nb-math" },
                { label: "Minutes", value: `${minutesSpent}`, bg: "bg-nb-bg", fg: "text-nb-ink" },
              ].map((s) => (
                <div key={s.label} className={`flex flex-col gap-1 rounded-[22px] px-4 py-4 ${s.bg}`}>
                  <span className={`text-[26px] font-semibold ${s.fg}`}>{s.value}</span>
                  <span className="text-[13px] font-medium text-nb-ink-2">{s.label}</span>
                </div>
              ))}
            </div>

            {correctCount < QUESTIONS.length && (
              <p className="rounded-full bg-nb-bg px-4 py-[10px] text-[14px] text-nb-ink-2">
                Notsi added {QUESTIONS.length - correctCount} missed question
                {QUESTIONS.length - correctCount === 1 ? "" : "s"} to tomorrow's Quick 15 review.
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-[10px]">
              <PillButton onClick={restart}>↺ Practise again</PillButton>
              <PillButton kind="primary" onClick={exit}>
                Back to plan  →
              </PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-0 flex-1" />

      <div className="relative z-10 rounded-full bg-nb-surface px-4 py-[10px] text-center text-[13px] font-medium text-nb-ink-2">
        🎧&nbsp; Focus mode on · notifications paused until 5:00
      </div>
    </div>
  );
}
