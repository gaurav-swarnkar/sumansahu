import type { Project } from "../data";

/**
 * Small, illustrative UI mockups that suggest what each project's product
 * looks like. Pure markup (no image assets) so they stay crisp at any size.
 */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl bg-white p-3 text-ink shadow-[0_12px_32px_rgba(24,3,59,0.35)] ${className}`}>
      {children}
    </div>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 0l1.8 5.2L15 7l-5.2 1.8L8 14l-1.8-5.2L1 7l5.2-1.8z" />
    </svg>
  );
}

/* ---------- Study planner: today's AI-built schedule ---------- */
function StudyPlannerMockup() {
  const sessions = [
    { time: "09:00", label: "Maths · Calculus", tone: "bg-brand", width: "w-full" },
    { time: "11:30", label: "Physics revision", tone: "bg-lilac", width: "w-4/5" },
    { time: "14:00", label: "Break", tone: "bg-lime", width: "w-2/5" },
    { time: "16:00", label: "Chemistry quiz prep", tone: "bg-brand-800", width: "w-3/4" },
  ];
  return (
    <div className="flex w-full max-w-[340px] items-end gap-3">
      <Card className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium text-muted">Today</p>
            <p className="text-sm font-semibold leading-tight">Mon, 12 Nov</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-lilac-100 px-2 py-1 text-[9px] font-semibold text-brand">
            <Sparkle className="size-2.5" /> AI plan
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {sessions.map((s) => (
            <li key={s.time} className="flex items-center gap-2">
              <span className="w-8 shrink-0 text-[9px] font-medium text-muted">{s.time}</span>
              <span className={`${s.width} truncate rounded-md ${s.tone} px-2 py-1 text-[10px] font-medium ${s.tone === "bg-lime" ? "text-ink" : "text-white"}`}>
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="w-[96px] shrink-0 text-center">
        <div className="relative mx-auto size-14">
          <svg viewBox="0 0 36 36" className="size-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="#e1cbff" strokeWidth="4" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="#7322ff" strokeWidth="4" strokeDasharray="94.2" strokeDashoffset="26" strokeLinecap="round" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">72%</span>
        </div>
        <p className="mt-1 text-[9px] font-medium leading-tight text-muted">Weekly goal</p>
      </Card>
    </div>
  );
}

/* ---------- Truck fill: AI load plan ---------- */
function TruckFillMockup() {
  // 5 columns x 4 rows of pallets; last two slots left empty
  const pallets = Array.from({ length: 20 }, (_, i) => i);
  const tones = ["bg-brand", "bg-lilac", "bg-brand-800", "bg-lilac-100"];
  return (
    <Card className="w-full max-w-[340px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium text-muted">Load plan</p>
          <p className="text-sm font-semibold leading-tight">Truck TRK-204</p>
        </div>
        <span className="rounded-full bg-lime px-2 py-1 text-[10px] font-semibold text-ink">92% full</span>
      </div>

      {/* truck: trailer grid + cab */}
      <div className="mt-3 flex items-end gap-1">
        <div className="grid flex-1 grid-cols-5 gap-1 rounded-lg border-2 border-ink/15 p-1.5">
          {pallets.map((i) => (
            <span
              key={i}
              className={`h-4 rounded-sm ${i >= 18 ? "border border-dashed border-ink/25 bg-transparent" : tones[i % tones.length]}`}
            />
          ))}
        </div>
        <div className="flex h-12 w-9 flex-col justify-between rounded-r-lg rounded-tl-lg bg-ink/80 p-1">
          <span className="h-3 rounded-sm bg-white/70" />
          <span className="mx-auto size-2 rounded-full bg-white/50" />
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-xl bg-lilac-100/60 p-2">
        <Sparkle className="mt-0.5 size-3 shrink-0 text-brand" />
        <p className="text-[10px] leading-snug text-ink-soft">
          Agent rearranged 4 pallets for better weight balance. 18 of 20 slots used, so one trip saved.
        </p>
      </div>
    </Card>
  );
}

/* ---------- Recipe to stock: ingredient matching ---------- */
function RecipeStockMockup() {
  const rows = [
    { ingredient: "Paneer, 400 g", stock: "Paneer block 1 kg", match: 98 },
    { ingredient: "Yoghurt, 1 cup", stock: "Greek yoghurt 500 g", match: 94 },
    { ingredient: "Bell pepper, 2", stock: "Capsicum mix 1 kg", match: 88 },
  ];
  return (
    <Card className="w-full max-w-[340px]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium text-muted">Recipe</p>
          <p className="text-sm font-semibold leading-tight">Paneer Tikka · 4 servings</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-lilac-100 px-2 py-1 text-[9px] font-semibold text-brand">
          <Sparkle className="size-2.5" /> Auto-mapped
        </span>
      </div>
      <ul className="mt-3 space-y-1.5">
        {rows.map((r) => (
          <li key={r.ingredient} className="flex items-center gap-1.5 rounded-lg bg-canvas px-2 py-1.5">
            <span className="min-w-0 flex-1 truncate text-[10px] font-medium">{r.ingredient}</span>
            <svg viewBox="0 0 16 16" className="size-3 shrink-0 text-brand" fill="none" aria-hidden="true">
              <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="min-w-0 flex-1 truncate text-[10px] text-ink-soft">{r.stock}</span>
            <span className="shrink-0 rounded-full bg-brand px-1.5 py-0.5 text-[9px] font-semibold text-white">{r.match}%</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        tabIndex={-1}
        className="mt-3 w-full rounded-lg bg-ink py-1.5 text-[10px] font-semibold text-white"
      >
        Update stock in one click
      </button>
    </Card>
  );
}

export default function ProjectMockup({ visual }: { visual: Project["visual"] }) {
  switch (visual) {
    case "truck":
      return <TruckFillMockup />;
    case "receipt":
      return <RecipeStockMockup />;
    case "tablets":
    case "monitor":
    default:
      return <StudyPlannerMockup />;
  }
}
