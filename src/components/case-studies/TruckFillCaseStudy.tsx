import { useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import sumansahuImage from "../../imports/Main/suman_sahu.png";
import {
  faTruck,
  faBoxesStacked,
  faWeightHanging,
  faRoute,
  faWarehouse,
  faMobileScreen,
  faUsers,
  faClock,
  faTriangleExclamation,
  faCircleCheck,
  faLightbulb,
  faMagnifyingGlass,
  faLayerGroup,
  faCubes,
  faScaleBalanced,
  faHandshake,
  faGaugeHigh,
  faListOl,
  faRotate,
  faBolt,
  faClipboardList,
  faUserTie,
  faPeopleCarryBox,
  faTruckRampBox,
  faBoxOpen,
  faQuoteLeft,
  faFlask,
  faPenRuler,
  faSitemap,
  faChevronLeft,
  faChevronRight,
  faArrowTrendUp,
  faChartLine,
  faArrowTrendDown,
  faCheck,
  faXmark,
  faShareNodes,
  faEye,
  faBullseye,
  faCompass,
  faCircleInfo,
  faHelmetSafety,
  faRepeat,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";

/*
 * Truck Fill AI Agent: case study.
 *
 * Follows the same story arc and visual language as the Study Planner case
 * study (see CASE_STUDY_PATTERN.md). All numbers are assumed / proportional
 * data for portfolio purposes, not real organisational data.
 */

/* ------------------------------------------------------------------ */
/* Shared building blocks                                              */
/* ------------------------------------------------------------------ */

function SectionTitle({ children }: { children: ReactNode }) {
  return <h1 className="text-4xl font-bold text-ink mt-20 mb-8">{children}</h1>;
}

function SubTitle({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold text-ink mt-12 mb-6">{children}</h2>
      {note && <p className="text-base text-ink/60 max-w-3xl">{note}</p>}
    </div>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <p className="text-base leading-relaxed text-ink/80">{children}</p>;
}

function Mark({ children }: { children: ReactNode }) {
  return <strong className="bg-yellow-100 px-1 py-0.5 rounded">{children}</strong>;
}

function IconChip({ icon, tone = "brand" }: { icon: IconDefinition; tone?: "brand" | "red" | "amber" | "green" }) {
  const tones = {
    brand: "bg-brand/10 text-brand",
    red: "bg-red-100 text-red-600",
    amber: "bg-amber-100 text-amber-600",
    green: "bg-emerald-100 text-emerald-600",
  };
  return (
    <span className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
      <FontAwesomeIcon icon={icon} className="size-5" />
    </span>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5 ${className}`}>{children}</div>;
}

function Disclaimer() {
  return (
    <p className="rounded-xl bg-white/70 px-4 py-3 text-sm text-ink/60 ring-1 ring-ink/5">
      <strong>Note:</strong> The statistics in this case study are assumed and proportional for illustration. They do
      not represent real organisational data.
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Project summary: impact metrics                                  */
/* ------------------------------------------------------------------ */

type MetricKey = "fill" | "accept" | "trips" | "time" | "damage";

const metricTiles: { key: MetricKey; label: string; before: string; after: string; delta: string; up: boolean }[] = [
  { key: "fill", label: "Fill rate", before: "71%", after: "83%", delta: "+12 pts", up: true },
  { key: "accept", label: "Plan acceptance", before: "21%", after: "76%", delta: "3.6×", up: true },
  { key: "trips", label: "Trips needed", before: "100", after: "86", delta: "−14%", up: false },
  { key: "time", label: "Plan to dispatch", before: "52 min", after: "34 min", delta: "−35%", up: false },
  { key: "damage", label: "Damage claims", before: "3.2%", after: "2.0%", delta: "−38%", up: false },
];

const fillByMonth = [70, 71, 70, 72, 71, 71, 74, 77, 79, 81, 82, 83];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/** Semi-circle gauge with before/after needles, plus a month-by-month heat strip */
function FillGauge() {
  const cx = 150;
  const cy = 140;
  const r = 110;
  const angle = (v: number) => Math.PI * (1 - (v - 50) / 50); // 50%..100% mapped to 180°..0°
  const pt = (v: number, rr = r) => [cx + rr * Math.cos(angle(v)), cy - rr * Math.sin(angle(v))];
  const arc = (from: number, to: number) => {
    const [x1, y1] = pt(from);
    const [x2, y2] = pt(to);
    return `M${x1},${y1} A${r},${r} 0 0 1 ${x2},${y2}`;
  };
  const needle = (v: number, color: string, w: number) => {
    const [x, y] = pt(v, r - 22);
    return <line x1={cx} y1={cy} x2={x} y2={y} stroke={color} strokeWidth={w} strokeLinecap="round" />;
  };
  const heat = (v: number) => {
    const t = (v - 68) / 16;
    return `rgba(115, 34, 255, ${0.15 + Math.max(0, Math.min(1, t)) * 0.85})`;
  };
  return (
    <div className="grid items-center gap-6 md:grid-cols-[300px_1fr]">
      <div className="mx-auto w-full max-w-[300px]">
      <svg viewBox="0 0 300 170" className="w-full" role="img" aria-label="Fill rate gauge: 71% before, 83% after">
        <path d={arc(50, 100)} fill="none" stroke="#ede9fe" strokeWidth="22" strokeLinecap="round" />
        <path d={arc(71, 83)} fill="none" stroke="#7322ff" strokeWidth="22" />
        <path d={arc(80, 100)} fill="none" stroke="#bbf7d0" strokeWidth="6" transform="translate(0,0)" />
        {needle(71, "#c4b5fd", 4)}
        {needle(83, "#18033b", 5)}
        <circle cx={cx} cy={cy} r="8" fill="#18033b" />
        <text x="28" y="160" fontSize="10" fill="#7d7192">50%</text>
        <text x="252" y="160" fontSize="10" fill="#7d7192">100%</text>
        <text x={pt(90, r + 18)[0]} y={pt(90, r + 18)[1]} fontSize="9" fill="#16a34a" textAnchor="middle">target zone</text>
      </svg>
      <div className="-mt-1 flex items-center justify-center gap-5 text-sm">
        <span className="flex items-center gap-1.5 text-ink/60"><span className="h-1 w-4 rounded-full bg-lilac" />Before <strong className="text-ink/70">71%</strong></span>
        <span className="flex items-center gap-1.5 text-ink"><span className="h-1 w-4 rounded-full bg-ink" />After <strong className="text-2xl">83%</strong></span>
      </div>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-medium text-ink">Fill rate by month, 2025</p>
        <div className="grid grid-cols-12 gap-1">
          {fillByMonth.map((v, i) => (
            <div key={i} className="space-y-1 text-center">
              <div className={`flex aspect-square items-center justify-center rounded-md text-[10px] font-semibold ${v >= 77 ? "text-white" : "text-ink/70"}`} style={{ background: heat(v) }} title={`${v}%`}>
                {v}
              </div>
              <span className="text-[10px] text-ink/50">{months[i]}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ink/60">The agent launched in July. Fill climbed every month as more fleets came on board.</p>
      </div>
    </div>
  );
}

/** Slope chart: plan acceptance before vs after */
function AcceptanceSlope() {
  const rows = [
    { label: "Planners", before: 21, after: 76, color: "#7322ff", dy: 10 },
    { label: "Dock supervisors", before: 34, after: 81, color: "#f97316", dy: -6 },
    { label: "Truck owners", before: 12, after: 58, color: "#0ea5e9", dy: 0 },
  ];
  const y = (v: number) => 180 - v * 1.6;
  return (
    <div className="grid items-center gap-6 md:grid-cols-[1fr_220px]">
      <svg viewBox="0 0 360 200" className="w-full" role="img" aria-label="Plan acceptance rose for every role">
        <text x="60" y="196" fontSize="11" fill="#7d7192" textAnchor="middle">Before</text>
        <text x="300" y="196" fontSize="11" fill="#7d7192" textAnchor="middle">After</text>
        <line x1="60" x2="60" y1="10" y2="182" stroke="#18033b" strokeOpacity="0.1" />
        <line x1="300" x2="300" y1="10" y2="182" stroke="#18033b" strokeOpacity="0.1" />
        {rows.map((r) => (
          <g key={r.label}>
            <line x1="60" y1={y(r.before)} x2="300" y2={y(r.after)} stroke={r.color} strokeWidth="3" />
            <circle cx="60" cy={y(r.before)} r="5" fill="white" stroke={r.color} strokeWidth="3" />
            <circle cx="300" cy={y(r.after)} r="6" fill={r.color} />
            <text x="48" y={y(r.before) + 4} fontSize="11" fill="#4b4259" textAnchor="end">{r.before}%</text>
            <text x="312" y={y(r.after) + 4 + r.dy} fontSize="12" fontWeight="700" fill={r.color}>{r.after}%</text>
          </g>
        ))}
      </svg>
      <div className="space-y-3">
        {rows.map((r) => (
          <p key={r.label} className="flex items-center gap-2 text-sm text-ink/80"><span className="size-3 rounded-full" style={{ background: r.color }} />{r.label}</p>
        ))}
        <p className="text-xs text-ink/60">Share of plans used as suggested, without manual rework. Trust grew once every placement came with a reason.</p>
      </div>
    </div>
  );
}

function TruckIcon({ faded = false, partial = 1 }: { faded?: boolean; partial?: number }) {
  return (
    <svg viewBox="0 0 40 24" className="h-7 w-auto" aria-hidden="true">
      <defs>
        <clipPath id={`tp-${partial}`}><rect x="0" y="0" width={40 * partial} height="24" /></clipPath>
      </defs>
      <g opacity={faded ? 0.18 : 1} clipPath={partial < 1 ? `url(#tp-${partial})` : undefined}>
        <rect x="1" y="3" width="24" height="14" rx="2" fill="#7322ff" />
        <path d="M26 7h7l5 5v5H26z" fill="#4c04a9" />
        <circle cx="8" cy="20" r="3" fill="#18033b" />
        <circle cx="31" cy="20" r="3" fill="#18033b" />
      </g>
    </svg>
  );
}

/** Pictogram: 10 trucks before vs 8.6 after */
function TripsPictogram() {
  return (
    <div className="space-y-5">
      {[
        { label: "Before", trucks: 10, text: "100 trips" },
        { label: "After", trucks: 8.6, text: "86 trips" },
      ].map((row) => (
        <div key={row.label} className="grid grid-cols-[60px_1fr_auto] items-center gap-3">
          <span className="text-sm font-medium text-ink/70">{row.label}</span>
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 10 }, (_, i) => {
              const remaining = row.trucks - i;
              if (remaining >= 1) return <TruckIcon key={i} />;
              if (remaining > 0) return <TruckIcon key={i} partial={remaining} />;
              return <TruckIcon key={i} faded />;
            })}
          </div>
          <span className="text-sm font-bold text-ink">{row.text}</span>
        </div>
      ))}
      <p className="text-xs text-ink/60">Each truck = 10 trips needed to move 1,000 pallets a week. Faded trucks are trips we no longer need.</p>
    </div>
  );
}

/** Waterfall: 52 min → savings by stage → 34 min */
function TimeWaterfall() {
  const steps = [
    { label: "Before", value: 52, type: "total" as const },
    { label: "Planning", value: -8, type: "delta" as const },
    { label: "Finding items", value: -3, type: "delta" as const },
    { label: "Loading", value: -1, type: "delta" as const },
    { label: "Re-stacking", value: -6, type: "delta" as const },
    { label: "After", value: 34, type: "total" as const },
  ];
  const W = 520;
  const H = 210;
  const max = 56;
  const barW = 56;
  const gap = (W - 40 - steps.length * barW) / (steps.length - 1);
  const yv = (v: number) => H - 30 - (v / max) * (H - 50);
  let running = 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Plan-to-dispatch time fell from 52 to 34 minutes">
      {steps.map((s, i) => {
        const x = 20 + i * (barW + gap);
        let top: number;
        let bottom: number;
        if (s.type === "total") {
          top = s.value;
          bottom = 0;
          running = s.value;
        } else {
          top = running;
          bottom = running + s.value;
          running = bottom;
        }
        const fill = s.type === "total" ? (i === 0 ? "#c4b5fd" : "#7322ff") : "#34d399";
        return (
          <g key={s.label}>
            <rect x={x} y={yv(top)} width={barW} height={yv(bottom) - yv(top)} rx="6" fill={fill} />
            <text x={x + barW / 2} y={yv(top) - 6} fontSize="12" fontWeight="700" fill="#18033b" textAnchor="middle">
              {s.type === "total" ? `${s.value}m` : `${s.value}m`}
            </text>
            <text x={x + barW / 2} y={H - 10} fontSize="10" fill="#7d7192" textAnchor="middle">{s.label}</text>
            {i < steps.length - 1 && (
              <line x1={x + barW} x2={x + barW + gap} y1={yv(running)} y2={yv(running)} stroke="#18033b" strokeOpacity="0.2" strokeDasharray="3 3" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Icon grid: damaged shipments per 1,000 */
function DamageGrid() {
  const Box = ({ bad, tone }: { bad: boolean; tone: string }) => (
    <span className={`aspect-square w-full rounded-[3px] ${bad ? tone : "bg-ink/10"}`} />
  );
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {[
        { label: "Before", count: 32, tone: "bg-red-400" },
        { label: "After", count: 20, tone: "bg-brand" },
      ].map((g) => (
        <div key={g.label} className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-ink/70">{g.label}</span>
            <span className="text-lg font-bold text-ink">{g.count} <span className="text-xs font-normal text-ink/50">per 1,000 shipments</span></span>
          </div>
          <div className="grid max-w-[240px] grid-cols-10 gap-1">
            {Array.from({ length: 40 }, (_, i) => (
              <Box key={i} bad={i < g.count} tone={g.tone} />
            ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-ink/60 sm:col-span-2">Each coloured square is one shipment with a damage claim, in every 1,000 shipped. Fragile and stacking rules are now part of every plan.</p>
    </div>
  );
}

function ImpactHighlights() {
  const [selected, setSelected] = useState<MetricKey>("fill");
  const charts: Record<MetricKey, { title: string; note: string; chart: ReactNode }> = {
    fill: { title: "Average fill rate", note: "Volume used per dispatched truck", chart: <FillGauge /> },
    accept: { title: "Plan acceptance", note: "Plans used as suggested, without manual rework", chart: <AcceptanceSlope /> },
    trips: { title: "Trips per 1,000 pallets", note: "Same freight, fewer trucks on the road", chart: <TripsPictogram /> },
    time: { title: "Where the time went", note: "Minutes per truck, from plan to dispatch", chart: <TimeWaterfall /> },
    damage: { title: "Damage claims", note: "Shipments with a damage claim", chart: <DamageGrid /> },
  };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {metricTiles.map((m) => {
          const isActive = m.key === selected;
          return (
            <button
              key={m.key}
              onClick={() => setSelected(m.key)}
              className={`group relative overflow-hidden rounded-2xl p-4 text-left transition-all ${
                isActive ? "bg-ink text-white shadow-lg" : "bg-white text-ink ring-1 ring-ink/5 hover:ring-brand/30"
              }`}
            >
              <p className={`text-xs font-medium ${isActive ? "text-white/70" : "text-ink/60"}`}>{m.label}</p>
              <p className="mt-1 text-2xl font-bold">{m.after}</p>
              <p className={`mt-1 flex items-center gap-1 text-xs font-semibold ${isActive ? "text-lime" : "text-emerald-600"}`}>
                <FontAwesomeIcon icon={m.up ? faArrowTrendUp : faArrowTrendDown} className="size-3" />
                {m.delta}
              </p>
              <p className={`text-[11px] ${isActive ? "text-white/50" : "text-ink/40"}`}>from {m.before}</p>
              {isActive && <span className="absolute inset-x-0 bottom-0 h-1 bg-lime" />}
            </button>
          );
        })}
      </div>
      <Card>
        <h3 className="text-xl font-semibold text-ink">{charts[selected].title}</h3>
        <p className="mb-6 text-sm text-ink/60">{charts[selected].note}</p>
        {charts[selected].chart}
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1b. Context: the story and how truck fill works                     */
/* ------------------------------------------------------------------ */

function StoryTimeline() {
  const steps = [
    { title: "An optimiser nobody used", text: "Let's Transport had a load-optimisation engine. Planners exported its output and re-did plans in Excel." },
    { title: "Pressure from both sides", text: "Shippers pushed for lower freight cost. Carriers complained about part-loads and slow drops." },
    { title: "A failed walkthrough", text: "An end-to-end review with leadership exposed broken hand-offs from plan to dock to road." },
    { title: "The real problem", text: "The maths was fine. People couldn't see, trust or act on the plan, and carriers had no way in at all." },
    { title: "Where I came in", text: "I took the experience end to end: research, flows across four roles, testing and the pilot." },
  ];
  return (
    <ol className="relative grid gap-4 md:grid-cols-5">
      <span className="absolute left-0 right-0 top-5 hidden h-0.5 bg-gradient-to-r from-lilac-100 via-brand/40 to-brand md:block" aria-hidden="true" />
      {steps.map((s, i) => (
        <li key={s.title} className="relative space-y-2">
          <span className={`relative z-10 flex size-10 items-center justify-center rounded-full text-sm font-bold ${i === steps.length - 1 ? "bg-brand text-white" : "bg-white text-brand ring-2 ring-brand/30"}`}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="font-semibold text-ink">{s.title}</p>
          <p className="text-sm text-ink/70">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

function HowItWorks() {
  const orders = ["#1042 · 12 cartons", "#1043 · 2 pallets", "#1047 · 6 cartons", "#1051 · 1 pallet", "#1052 · 9 cartons"];
  return (
    <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1.1fr_auto_1fr]">
      <Card className="space-y-2 !p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">01 · Orders in</p>
        {orders.map((o) => (
          <p key={o} className="rounded-lg bg-canvas px-3 py-1.5 text-xs text-ink/80">{o}</p>
        ))}
        <p className="text-xs text-ink/50">Weight, volume, fragility, delivery windows</p>
      </Card>
      <FontAwesomeIcon icon={faChevronRight} className="hidden size-5 self-center text-brand md:block" />
      <div className="flex flex-col justify-center gap-3 rounded-2xl bg-gradient-to-br from-brand to-brand-900 p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">02 · Truck Fill AI agent</p>
        {["Packs by volume, weight & axle load", "Orders stops along the route", "Explains each placement", "Flags what doesn't fit, with a next step"].map((t) => (
          <p key={t} className="flex items-start gap-2 text-sm"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 text-lime" />{t}</p>
        ))}
      </div>
      <FontAwesomeIcon icon={faChevronRight} className="hidden size-5 self-center text-brand md:block" />
      <Card className="space-y-2 !p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">03 · Ready-to-load trucks</p>
        {[
          { t: "Truck A · 32 ft", f: 94 },
          { t: "Truck B · 22 ft", f: 88 },
        ].map((tr) => (
          <div key={tr.t} className="rounded-lg bg-canvas p-2.5">
            <div className="flex justify-between text-xs"><span className="font-semibold text-ink">{tr.t}</span><span className="font-semibold text-emerald-600">{tr.f}%</span></div>
            <div className="mt-1.5 h-1.5 rounded-full bg-lilac-100"><div className="h-full rounded-full bg-brand" style={{ width: `${tr.f}%` }} /></div>
          </div>
        ))}
        <p className="text-xs text-ink/50">With a fill score, load order and dock steps</p>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1c. Core outcomes with space for analytics images                   */
/* ------------------------------------------------------------------ */

type Outcome = { icon: IconDefinition; title: string; text: ReactNode; image?: string; imageAlt?: string };

const coreOutcomes: Outcome[] = [
  { icon: faGaugeHigh, title: "Fuller trucks, fewer trips", text: <>Average fill rose from <strong>71% to 83%</strong>, cutting trips for the same freight by <strong>14%</strong>.</> },
  { icon: faTruckRampBox, title: "Unload without digging", text: <>Route-aware load order cut re-handling at drops by <strong>61%</strong>, from about 18 to 7 minutes per stop.</> },
  { icon: faMobileScreen, title: "Planners trust the plan", text: <>Plan acceptance grew from <strong>21% to 76%</strong>, and <strong>64%</strong> of truck owners used the app weekly.</> },
];

function CoreOutcomes() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {coreOutcomes.map((o) => (
        <Card key={o.title} className="flex flex-col gap-4 !p-0 overflow-hidden">
          {/* analytics image slot: add `image` to show a dashboard screenshot */}
          {o.image ? (
            <img src={o.image} alt={o.imageAlt ?? o.title} className="aspect-[16/10] w-full object-cover" />
          ) : (
            <div className="m-4 mb-0 flex aspect-[16/10] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink/15 bg-canvas text-ink/40">
              <FontAwesomeIcon icon={faChartLine} className="size-6" />
              <span className="text-xs font-medium">Analytics screenshot coming soon</span>
            </div>
          )}
          <div className="space-y-2 px-6 pb-6">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={o.icon} className="size-4 text-brand" />
              <h3 className="text-lg font-semibold text-ink">{o.title}</h3>
            </div>
            <Body>{o.text}</Body>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Research: primary research tabs, competitors, gap map             */
/* ------------------------------------------------------------------ */

const researchQuestions = [
  "How do planners and loaders judge whether a truck is 'full', and how accurate is that judgement?",
  "What makes loading for multiple drops slow, and what causes re-handling at each stop?",
  "Which constraints (weight, axle load, fragility, stacking, temperature) are hardest to keep in mind?",
  "How does a plan travel from the planner's desk to the loading bay, and where does it break?",
  "What would make a small truck owner or transport agency actually adopt a planning tool?",
];

const findings = [
  { q: 1, text: "'Full' is judged by eye. Planners estimated fill within ±15%, and trucks left the dock at an average of 71% volume while feeling 'full' to the crew. Weight limits, not volume, were hit on only 1 in 8 trips." },
  { q: 2, text: "Load order is decided at the dock, not in the plan. On multi-drop routes, 3 of 5 observed trucks had a later stop's goods blocking an earlier one, adding about 18 minutes of re-handling per stop." },
  { q: 3, text: "Crews remember 'heavy at the bottom', but axle balance and stacking limits are rarely checked. Mixed fragile and heavy loads caused most damage claims." },
  { q: 4, text: "Plans are printed or sent as screenshots. When orders change after printing (in 37% of loads), the dock improvises and the planner never finds out." },
  { q: 5, text: "Owners and agencies want answers, not a 3D tool: 'Can I take this extra load?' and 'Which of my trucks has space?'. They live on mobile and WhatsApp; desktop planners felt built for someone else." },
];

function PrimaryResearch() {
  const [tab, setTab] = useState<"findings" | "method" | "analysis">("findings");
  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-ink/10">
        {(["findings", "method", "analysis"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors ${tab === t ? "bg-brand text-white" : "text-ink/60 hover:text-ink"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "method" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Participants", value: "32 people", sub: "planners, loaders, owners, agencies" },
              { label: "Sites", value: "6 warehouses", sub: "+ 4 transport agencies" },
              { label: "Format", value: "Contextual inquiry", sub: "dock observation + 1:1 interviews" },
              { label: "Observed", value: "42 loads", sub: "single and multi-drop" },
            ].map((s) => (
              <Card key={s.label} className="!p-4">
                <p className="text-xs text-ink/60">{s.label}</p>
                <p className="text-lg font-bold text-ink">{s.value}</p>
                <p className="text-xs text-ink/50">{s.sub}</p>
              </Card>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <p className="mb-2 font-semibold text-ink">Understand the "why"</p>
              <Body>1:1 interviews (45–60 min) with 10 planners, 8 truck owners, 6 agency managers and 8 drivers about how they decide what goes where, and what a "good trip" means to them.</Body>
            </Card>
            <Card>
              <p className="mb-2 font-semibold text-ink">Understand the "how"</p>
              <Body>Shadowed 42 loads across morning and peak shifts, timed each stage, photographed final load layouts and measured actual fill against declared truck capacity.</Body>
            </Card>
          </div>
        </div>
      )}

      {tab === "findings" && (
        <div className="space-y-3">
          {findings.map((f) => (
            <Card key={f.q} className="flex gap-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{f.q}</span>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink/60">{researchQuestions[f.q - 1]}</p>
                <Body>{f.text}</Body>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "analysis" && (
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Affinity mapping", icon: faLayerGroup, text: "214 observations clustered into 6 themes: visibility, sequencing, constraints, hand-off, trust, and adoption." },
            { title: "Journey mapping", icon: faRoute, text: "Mapped order → plan → load → drive → unload for both shipper and carrier sides to find the 4 moments where value leaks." },
            { title: "Opportunity scoring", icon: faBullseye, text: "Scored each theme on frequency × cost per occurrence. Sequencing and visibility led, with adoption as the gating factor." },
          ].map((a) => (
            <Card key={a.title} className="space-y-3">
              <IconChip icon={a.icon} />
              <h3 className="text-lg font-semibold text-ink">{a.title}</h3>
              <Body>{a.text}</Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

type Level = "strong" | "mid" | "gap";

const competitors = {
  direct: [
    { name: "Esko Cape TruckFill", type: "Desktop load planner", strengths: ["Mature 3D load building", "Pallet and case optimisation", "Strong for packaging-led shippers"], gaps: ["Desktop-first, expert users", "Little guidance at the dock", "Not built for small carriers"] },
    { name: "EasyCargo", type: "Web load planner", strengths: ["Quick 3D load plans", "Multiple vehicle types", "Shareable plan views"], gaps: ["Plan is a picture, not guidance", "Limited live re-planning", "No fleet-wide view"] },
    { name: "Cargo-Planner", type: "Web load planner", strengths: ["Detailed constraints and rules", "Container and truck planning", "API integrations"], gaps: ["Steep learning curve", "Desktop-centric workflow", "Little support for unloading order"] },
  ],
  indirect: [
    { name: "Spreadsheets", type: "Manual planning", strengths: ["Familiar and flexible", "Free", "Works offline"], gaps: ["No fill visibility", "Breaks on order changes", "Lives on one person's laptop"] },
    { name: "TMS suites", type: "Transport management", strengths: ["Orders, routes and billing in one place", "Enterprise reporting"], gaps: ["Treats a truck as a number, not a space", "Expensive for small fleets"] },
    { name: "WhatsApp & calls", type: "Coordination", strengths: ["Everyone already uses it", "Instant"], gaps: ["No structure or history", "Capacity known only after loading"] },
  ],
};

const gapRows: { capability: string; values: Level[] }[] = [
  { capability: "Fill visibility before loading", values: ["strong", "strong", "strong", "gap", "mid"] },
  { capability: "Multi-drop load sequencing", values: ["mid", "mid", "mid", "gap", "gap"] },
  { capability: "Weight, axle and fragility rules", values: ["strong", "mid", "strong", "gap", "mid"] },
  { capability: "Step-by-step guidance at the dock", values: ["gap", "gap", "gap", "gap", "gap"] },
  { capability: "Live re-plan when orders change", values: ["mid", "gap", "mid", "gap", "mid"] },
  { capability: "Mobile-first for owners and agencies", values: ["gap", "mid", "gap", "mid", "gap"] },
  { capability: "Fleet-wide spare capacity view", values: ["gap", "gap", "gap", "gap", "mid"] },
];
const gapCols = ["Cape TruckFill", "EasyCargo", "Cargo-Planner", "Spreadsheets", "TMS"];

function LevelDot({ level }: { level: Level }) {
  const map = { strong: "bg-emerald-500", mid: "bg-amber-400", gap: "bg-red-400" };
  const label = { strong: "Strong capability", mid: "Needs improvement", gap: "Major gap" };
  return <span className={`inline-block size-3.5 rounded-full ${map[level]}`} title={label[level]} aria-label={label[level]} />;
}

function CompetitiveAnalysis() {
  const [type, setType] = useState<"direct" | "indirect">("direct");
  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-ink/10">
        {(["direct", "indirect"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-colors ${type === t ? "bg-brand text-white" : "text-ink/60 hover:text-ink"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {competitors[type].map((c) => (
          <Card key={c.name} className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-ink">{c.name}</h3>
              <p className="text-sm text-ink/60">{c.type}</p>
            </div>
            <ul className="space-y-1.5">
              {c.strengths.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-ink/80"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 text-emerald-600" />{s}</li>
              ))}
            </ul>
            <ul className="space-y-1.5 border-t border-ink/5 pt-3">
              {c.gaps.map((s) => (
                <li key={s} className="flex gap-2 text-sm text-ink/80"><FontAwesomeIcon icon={faXmark} className="mt-1 size-3 text-red-500" />{s}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <p className="text-xs text-ink/50">Competitor notes are simplified from publicly available product information and our own trials, for comparison only.</p>
    </div>
  );
}

function GapMap() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 text-sm text-ink/70">
        <span className="flex items-center gap-2"><LevelDot level="strong" /> Strong capability</span>
        <span className="flex items-center gap-2"><LevelDot level="mid" /> Needs improvement</span>
        <span className="flex items-center gap-2"><LevelDot level="gap" /> Major gap</span>
      </div>
      <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-ink/5">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-ink/5 text-left text-ink/60">
              <th className="p-4 font-medium">Capability</th>
              {gapCols.map((c) => (
                <th key={c} className="p-4 text-center font-medium">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gapRows.map((r) => (
              <tr key={r.capability} className="border-b border-ink/5 last:border-0">
                <td className="p-4 font-medium text-ink">{r.capability}</td>
                {r.values.map((v, i) => (
                  <td key={i} className="p-4 text-center"><LevelDot level={v} /></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Body>
        Load planners are good at <Mark>calculating</Mark> a fill. Nobody is good at <Mark>carrying that plan to the dock and the road</Mark>, or at serving the carriers who own the trucks.
      </Body>
    </div>
  );
}

const hmw = [
  { q: "How might we show planners and owners how full a truck really is, before a single box is loaded?", tag: "Critical" },
  { q: "How might we load multi-drop trucks so every stop's goods come out without moving anything else?", tag: "Critical" },
  { q: "How might we turn a load plan into step-by-step guidance a dock crew will actually follow?", tag: "Critical" },
  { q: "How might we keep weight, axle and fragility rules safe without the user having to remember them?", tag: "Critical" },
  { q: "How might we re-plan instantly when orders change at the last minute?", tag: "Important" },
  { q: "How might we let a truck owner answer 'can I take this extra load?' from their phone in seconds?", tag: "Important" },
  { q: "How might we give agencies a live view of spare capacity across their fleet?", tag: "Important" },
  { q: "How might we help carriers fill spare space with matching part-loads?", tag: "Nice to have" },
];

/* ------------------------------------------------------------------ */
/* 6. Solution: feature showcase with mockups                          */
/* ------------------------------------------------------------------ */

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[230px] rounded-[30px] bg-ink p-2 shadow-xl">
      <div className="h-[420px] overflow-hidden rounded-[24px] bg-canvas">{children}</div>
    </div>
  );
}

function FillScoreMockup() {
  const cells = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-ink/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-ink/60">Truck TRK-204 · 32 ft container</p>
          <p className="text-lg font-bold text-ink">Load plan · 14 orders</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-brand">92%</p>
          <p className="text-xs text-ink/60">fill score</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-10 gap-1 rounded-xl border-2 border-ink/10 p-2">
        {cells.map((i) => (
          <span key={i} className={`h-6 rounded ${i >= 27 ? "border border-dashed border-ink/20" : i % 7 === 0 ? "bg-amber-300" : ["bg-brand", "bg-lilac", "bg-brand-800"][i % 3]}`} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { l: "Volume", v: "92%" },
          { l: "Weight", v: "17.8 / 20 t" },
          { l: "Cost / order value", v: "3.8%" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg bg-canvas p-2">
            <p className="text-[10px] text-ink/60">{s.l}</p>
            <p className="text-sm font-semibold text-ink">{s.v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">● Cost: healthy</span>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700">● Axle balance: OK</span>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-700">● 2 items estimated</span>
      </div>
      <div className="mt-3 flex items-start gap-2 rounded-xl bg-lilac-100/60 p-3 text-xs text-ink/80">
        <FontAwesomeIcon icon={faLightbulb} className="mt-0.5 size-3.5 text-brand" />
        3 slots still free. Adding order #4471 (6 cartons, same route) would reach 97%.
      </div>
    </div>
  );
}

function SequenceMockup() {
  const stops = [
    { n: 1, name: "Andheri", items: "12 cartons", tone: "bg-brand" },
    { n: 2, name: "Powai", items: "8 cartons", tone: "bg-lilac" },
    { n: 3, name: "Thane", items: "2 pallets", tone: "bg-brand-800" },
    { n: 4, name: "Bhiwandi", items: "1 pallet", tone: "bg-amber-400" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1.1fr]">
      <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-ink/5">
        <p className="text-xs text-ink/60">Load order (last stop goes in first)</p>
        <div className="mt-3 flex h-36 overflow-hidden rounded-xl border-2 border-ink/10">
          {[...stops].reverse().map((s) => (
            <div key={s.n} className={`flex flex-1 flex-col items-center justify-center text-white ${s.tone}`}>
              <span className="text-lg font-bold">{s.n}</span>
              <span className="text-[10px] opacity-80">stop</span>
            </div>
          ))}
          <div className="flex w-8 items-center justify-center bg-ink/80 text-[9px] text-white [writing-mode:vertical-rl]">DOOR</div>
        </div>
        <p className="mt-3 text-xs text-ink/60">Stop 1's goods sit by the door, so nothing has to move at earlier drops.</p>
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-ink/5">
        <p className="mb-3 text-sm font-semibold text-ink">Dock guidance · step 3 of 9</p>
        <ul className="space-y-2">
          {stops.map((s, i) => (
            <li key={s.n} className={`flex items-center gap-3 rounded-lg p-2.5 ${i === 1 ? "bg-lilac-100 ring-1 ring-brand/30" : "bg-canvas"}`}>
              <span className={`flex size-7 items-center justify-center rounded-full text-xs font-bold text-white ${s.tone}`}>{s.n}</span>
              <span className="flex-1 text-sm text-ink">{s.name}</span>
              <span className="text-xs text-ink/60">{s.items}</span>
              {i > 1 && <FontAwesomeIcon icon={faCircleCheck} className="size-4 text-emerald-500" />}
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-700">⚠ Fragile: keep Powai cartons on top, max 2 high.</p>
      </div>
    </div>
  );
}

function OwnerAppMockup() {
  return (
    <div className="grid items-start gap-6 md:grid-cols-2">
      <PhoneFrame>
        <div className="space-y-3 p-4">
          <p className="text-[10px] text-ink/60">Good morning, Arjun</p>
          <p className="text-sm font-bold text-ink">Your fleet today</p>
          {[
            { t: "MH-04 · 22 ft", fill: 64, route: "Pune → Mumbai" },
            { t: "MH-12 · 32 ft", fill: 91, route: "Pune → Nashik" },
            { t: "MH-14 · 17 ft", fill: 48, route: "Pune → Satara" },
          ].map((tr) => (
            <div key={tr.t} className="rounded-xl bg-white p-3 shadow-sm">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-ink">{tr.t}</span>
                <span className={tr.fill < 70 ? "font-semibold text-amber-600" : "font-semibold text-emerald-600"}>{tr.fill}%</span>
              </div>
              <p className="text-[10px] text-ink/50">{tr.route}</p>
              <div className="mt-2 h-1.5 rounded-full bg-lilac-100">
                <div className="h-full rounded-full bg-brand" style={{ width: `${tr.fill}%` }} />
              </div>
            </div>
          ))}
          <div className="rounded-xl bg-brand p-3 text-white">
            <p className="text-[11px] font-semibold">2 part-loads match MH-14's route</p>
            <p className="text-[10px] opacity-80">Could reach 86% · est. ₹3,200 extra</p>
          </div>
        </div>
      </PhoneFrame>
      <div className="space-y-4">
        {[
          { icon: faEye, title: "Answer first, detail on tap", text: "Owners see a fill % per truck and a clear prompt. The 3D view is one tap away for those who want it." },
          { icon: faHandshake, title: "Fill the gap", text: "Spare space is matched to part-loads on the same route, so empty corners become revenue." },
          { icon: faShareNodes, title: "Works where they already are", text: "Plans and dock steps share as a link on WhatsApp. Drivers and loaders don't need to install anything." },
          { icon: faUsers, title: "Agency view", text: "Agencies see utilisation across every vendor truck in one list, sorted by who's running emptiest." },
        ].map((f) => (
          <div key={f.title} className="flex gap-4">
            <IconChip icon={f.icon} />
            <div>
              <h3 className="text-lg font-semibold text-ink">{f.title}</h3>
              <Body>{f.text}</Body>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const solutionTabs = [
  {
    key: "fill",
    label: "1 · Know the real fill",
    problem: "How do users know the effective fill of their truck?",
    view: <FillScoreMockup />,
    insight: "Planners added a 'safety gap' because they couldn't trust their volume maths, and weight limits were hit on only 1 in 8 trips. Volume was the real constraint, and confidence was the real gap.",
    responses: [
      "One fill score that combines volume, weight and axle balance, so 'full' means the same thing to everyone",
      "A cost signal in the planner's own units (freight cost as a % of order value), coloured green, amber or red",
      "Confidence label shows when sizes are estimated, so planners stop padding every load",
      "When something doesn't fit, the agent names exactly which items and offers the next best truck or split",
      "From plan to dispatch-ready in two taps in the ideal case, down from a dozen steps across three tools",
    ],
  },
  {
    key: "sequence",
    label: "2 · Load for easy unloading",
    problem: "How do we make taking items in and out easy?",
    view: <SequenceMockup />,
    insight: "On multi-drop routes, wrong load order cost more time than poor fill: ~18 minutes of digging per stop, and most damage happened while re-stacking.",
    responses: [
      "Layout starts from the route: the last stop goes in first, and each stop's goods sit together by the door",
      "One step per screen for the crew, with item photos, stacking limits and fragile warnings in context",
      "Driver's 'at the door' view lists what to unload at each stop and what to leave untouched",
    ],
  },
  {
    key: "owner",
    label: "3 · Built for owners & agencies",
    problem: "How do transport agencies and truck owners use this easily?",
    view: <OwnerAppMockup />,
    insight: "Owners asked two questions: 'Can I take this load?' and 'Which truck has space?'. They work from their phone, between calls, and won't learn a desktop tool.",
    responses: [
      "Answer first: a fill % per truck and one clear prompt, with details and 3D on tap",
      "'Fill the gap' matches spare space to verified part-loads on the same route, with estimated earnings",
      "Agencies get one list of every vendor truck, sorted by who's running emptiest",
    ],
  },
] as const;

function SolutionShowcase() {
  const [tab, setTab] = useState<(typeof solutionTabs)[number]["key"]>("fill");
  const current = solutionTabs.find((t) => t.key === tab)!;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {solutionTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tab === t.key ? "bg-brand text-white" : "bg-white text-ink/70 ring-1 ring-ink/10 hover:text-ink"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="flex items-center gap-2 text-sm font-medium text-ink/60">
        <FontAwesomeIcon icon={faCircleInfo} className="size-4 text-brand" /> Solves: {current.problem}
      </p>
      <div className="rounded-3xl bg-gradient-to-br from-lilac-100/70 to-white p-4 md:p-8">{current.view}</div>
      <InsightResponse insight={current.insight} responses={[...current.responses]} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. User problems: JTBD, journey map, problem statements             */
/* ------------------------------------------------------------------ */

const jobs = [
  { role: "Load planner", icon: faClipboardList, when: "orders close for a dispatch wave", want: "to know which truck they fit into and in what order", so: "I can dispatch on time without wasting space" },
  { role: "Dock supervisor", icon: faHelmetSafety, when: "a truck backs into my bay", want: "my crew to know exactly what goes in next", so: "we load once, safely and on time" },
  { role: "Driver", icon: faRoute, when: "I reach a customer's stop", want: "their goods to be right at the door", so: "I can deliver and leave in minutes" },
  { role: "Truck owner", icon: faTruck, when: "a trip is booked", want: "to know how much space is left and how to fill it", so: "every trip earns as much as it can" },
  { role: "Agency head", icon: faUserTie, when: "I review today's fleet", want: "to see which trucks are running empty", so: "I can combine loads before they leave" },
];

function JobsToBeDone() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {jobs.map((j) => (
        <Card key={j.role} className="flex gap-4 !p-5">
          <IconChip icon={j.icon} />
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">{j.role}</p>
            <p className="text-sm leading-relaxed text-ink/80">
              <strong>When</strong> {j.when}, <strong>I want</strong> {j.want}, <strong>so</strong> {j.so}.
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

const problemStatements = [
  {
    n: 1,
    title: "Effective fill is invisible",
    user: "Planners and truck owners",
    need: "need to know a truck's real usable capacity before anything is loaded",
    because: "'full' is judged by eye, so trucks leave about 29% empty and spare space is discovered only at the doors.",
  },
  {
    n: 2,
    title: "Loading ignores unloading",
    user: "Dock crews and drivers",
    need: "need every load arranged around the delivery route",
    because: "items for later stops block earlier ones, costing ~18 minutes of re-handling per stop and causing most damage claims.",
  },
  {
    n: 3,
    title: "Tools don't fit carriers",
    user: "Truck owners and transport agencies",
    need: "need capacity answers on their phone, in seconds",
    because: "they work on the move over calls and WhatsApp, and desktop load planners feel built for someone else.",
  },
];

function ProblemStatements() {
  return (
    <div className="space-y-3">
      {problemStatements.map((p) => (
        <div key={p.n} className="grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-ink/5 md:grid-cols-[200px_1fr]">
          <div>
            <span className="text-4xl font-bold text-brand/30">0{p.n}</span>
            <h3 className="text-lg font-bold text-ink">{p.title}</h3>
          </div>
          <p className="text-base leading-relaxed text-ink/80">
            <strong className="text-ink">{p.user}</strong> {p.need}, <span className="text-ink/60">because</span> <Mark>{p.because}</Mark>
          </p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Research: time breakdown, root cause, data reality               */
/* ------------------------------------------------------------------ */

const timeSlices = [
  { label: "Plan & wait for plan", min: 11, tone: "#4c04a9" },
  { label: "Find & stage items", min: 9, tone: "#884bdb" },
  { label: "Load", min: 18, tone: "#c4b5fd" },
  { label: "Re-stack & re-work", min: 14, tone: "#f87171" },
];

function TimeBreakdown() {
  const total = timeSlices.reduce((a, s) => a + s.min, 0);
  return (
    <Card className="space-y-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-semibold text-ink">Where 52 minutes go</h3>
        <span className="text-sm text-ink/60">Average per truck · 42 observed loads</span>
      </div>
      <div className="flex h-10 overflow-hidden rounded-xl">
        {timeSlices.map((s) => (
          <div key={s.label} className="flex items-center justify-center text-xs font-semibold text-white" style={{ width: `${(s.min / total) * 100}%`, background: s.tone }} title={`${s.label}: ${s.min} min`}>
            {s.min}m
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {timeSlices.map((s) => (
          <div key={s.label} className="flex items-start gap-2 text-sm">
            <span className="mt-1 size-3 shrink-0 rounded" style={{ background: s.tone }} />
            <span className="text-ink/70">{s.label}</span>
          </div>
        ))}
      </div>
      <Body>
        Only <strong>18 of 52 minutes</strong> is actual loading. <Mark>Nearly half the time (25 min) goes to waiting, searching and re-stacking</Mark>. That's waste a better plan can remove.
      </Body>
    </Card>
  );
}

function RootCause() {
  const whys = [
    "Why do trucks leave at 71% fill? → Planners add a 'safety gap' so loads don't fail at the dock.",
    "Why add a safety gap? → They can't trust their volume estimate.",
    "Why can't they trust it? → 38% of SKUs have missing or wrong dimensions, and the maths ignores stacking rules.",
    "Why does that matter at the dock? → The crew improvises, and items that 'should fit' don't.",
    "Root cause → Nobody has a trustworthy, shared picture of the load that holds up from planning to delivery.",
  ];
  return (
    <Card className="space-y-3">
      <h3 className="text-xl font-semibold text-ink">5 whys: the under-filled truck</h3>
      <ol className="space-y-2">
        {whys.map((w, i) => (
          <li key={w} className={`flex gap-3 rounded-xl p-3 text-sm ${i === whys.length - 1 ? "bg-brand text-white" : "bg-canvas text-ink/80"}`}>
            <span className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i === whys.length - 1 ? "bg-white text-brand" : "bg-white text-ink"}`}>{i + 1}</span>
            {w}
          </li>
        ))}
      </ol>
    </Card>
  );
}

function DataReality() {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1.3fr]">
      <div className="rounded-2xl bg-ink p-6 text-white">
        <p className="text-5xl font-bold text-lime">38%</p>
        <p className="mt-2 text-sm text-white/80">of SKUs in partner warehouse systems had missing or wrong dimensions. Any AI plan built on that data would be confidently wrong.</p>
      </div>
      <Card className="space-y-3">
        <h3 className="text-lg font-semibold text-ink">Design implication</h3>
        <ul className="space-y-2 text-sm text-ink/80">
          <li className="flex gap-2"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 text-brand" />Use category defaults when dimensions are missing, and label the plan's confidence honestly.</li>
          <li className="flex gap-2"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 text-brand" />Let the dock crew correct a size in two taps (or with a photo), and learn from it for next time.</li>
          <li className="flex gap-2"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 text-brand" />Show which items are 'estimated' so planners know where the risk is.</li>
        </ul>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Solution: insight → response, trust, dock design, edge cases      */
/* ------------------------------------------------------------------ */

function InsightResponse({ insight, responses }: { insight: string; responses: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
      <div className="rounded-2xl bg-amber-50 p-5">
        <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
          <FontAwesomeIcon icon={faLightbulb} className="size-3.5" /> Insight
        </p>
        <p className="text-sm leading-relaxed text-ink/80">{insight}</p>
      </div>
      <div className="rounded-2xl bg-white p-5 ring-1 ring-ink/5">
        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand">
          <FontAwesomeIcon icon={faPenRuler} className="size-3.5" /> Design response
        </p>
        <ul className="space-y-1.5">
          {responses.map((r) => (
            <li key={r} className="flex gap-2 text-sm text-ink/80"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 shrink-0 text-brand" />{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TrustPatterns() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">Confidence, stated honestly</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-2 text-xs text-emerald-800"><FontAwesomeIcon icon={faCircleCheck} className="size-3.5" />High confidence · all sizes verified</div>
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-2 text-xs text-amber-800"><FontAwesomeIcon icon={faTriangleExclamation} className="size-3.5" />Estimated · 3 items use category sizes</div>
        </div>
        <p className="text-sm text-ink/70">Planners know when to double-check, instead of trusting everything or nothing.</p>
      </Card>
      <Card className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">A reason for every placement</p>
        <div className="flex flex-wrap gap-1.5">
          {["Stop 1", "Fragile · top layer", "Heavy · over axle", "Same customer"].map((c) => (
            <span key={c} className="rounded-full bg-lilac-100 px-2.5 py-1 text-xs font-medium text-brand">{c}</span>
          ))}
        </div>
        <p className="text-sm text-ink/70">Short "why" chips turned black-box output into advice crews could check at a glance.</p>
      </Card>
      <Card className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">Override, with a reason</p>
        <div className="rounded-lg bg-canvas p-2 text-xs text-ink/80">Moved pallet P-12 → <strong>"Customer needs it first"</strong></div>
        <p className="text-sm text-ink/70">People stay in control. Each override teaches the agent, and a healthy 8–15% override rate is tracked as a guardrail.</p>
      </Card>
    </div>
  );
}

function DockDesign() {
  const items = [
    { icon: faMobileScreen, title: "Glove-friendly", text: "64 px touch targets and one action per screen ('Done · Next')." },
    { icon: faEye, title: "Readable in sunlight", text: "High-contrast dock mode, large step numbers, and colour paired with icons." },
    { icon: faRotate, title: "Works offline", text: "Plans download at bay check-in and sync when the network returns." },
    { icon: faUsers, title: "Their language", text: "Hindi, Marathi, Tamil and English, with item photos instead of SKU codes." },
    { icon: faShareNodes, title: "No install, no login", text: "A WhatsApp link opens the dock view on any shared phone." },
    { icon: faBolt, title: "Feedback without sound", text: "Vibration and full-screen colour confirm each step, because docks are loud." },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((i) => (
        <Card key={i.title} className="space-y-2 !p-5">
          <IconChip icon={i.icon} />
          <h3 className="font-semibold text-ink">{i.title}</h3>
          <p className="text-sm text-ink/70">{i.text}</p>
        </Card>
      ))}
    </div>
  );
}

const edgeCases = [
  { icon: faBoxOpen, title: "An item doesn't fit", text: "The agent suggests the next-best truck or a split, and shows the cost of each option." },
  { icon: faRepeat, title: "Orders change at the dock", text: "Live re-plan pushes only the changed steps, with a clear 'Plan updated' banner." },
  { icon: faCubes, title: "Unknown dimensions", text: "Category defaults are flagged as 'estimated'. The crew corrects with two taps or a photo." },
  { icon: faWeightHanging, title: "Axle overload risk", text: "Plan is blocked with a fix ('move 2 pallets forward') instead of just a warning." },
  { icon: faTruck, title: "Mixed truck types", text: "Owners save each truck's real inside size once; plans adapt to 17, 22 or 32 ft bodies." },
  { icon: faClock, title: "Truck arrives late", text: "Orders re-balance across available trucks, keeping stop order intact." },
];

function EdgeCases() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {edgeCases.map((e) => (
        <div key={e.title} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink/5">
          <FontAwesomeIcon icon={e.icon} className="mt-1 size-4 shrink-0 text-brand" />
          <div>
            <p className="text-sm font-semibold text-ink">{e.title}</p>
            <p className="text-sm text-ink/70">{e.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Validation: rounds, pilot vs control, what didn't work            */
/* ------------------------------------------------------------------ */

function TestRounds() {
  const rounds = [
    { tag: "Round 1", title: "Paper & lo-fi prototypes", who: "6 participants · 2 warehouses", learn: "3D-first screens confused owners and crews; a single fill % and next step was understood by everyone." },
    { tag: "Round 2", title: "Hi-fi prototype on the dock", who: "8 participants · live bays", learn: "Gloves, glare and noise broke small controls and audio prompts, which led to dock mode." },
    { tag: "Pilot", title: "8-week controlled pilot", who: "3 pilot fleets (142 trucks) vs 3 similar control fleets", learn: "Measured fill, time and damage against fleets that kept their existing process." },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {rounds.map((r) => (
        <Card key={r.tag} className="space-y-2">
          <span className="rounded-full bg-lilac-100 px-2.5 py-1 text-xs font-semibold text-brand">{r.tag}</span>
          <h3 className="pt-2 text-lg font-semibold text-ink">{r.title}</h3>
          <p className="text-xs font-medium text-ink/50">{r.who}</p>
          <p className="text-sm text-ink/70">{r.learn}</p>
        </Card>
      ))}
    </div>
  );
}

function PilotResults() {
  const rows = [
    { metric: "Fill rate change", pilot: 9.8, control: 0.6, unit: " pts", max: 12 },
    { metric: "Plan-to-dispatch time saved", pilot: 16, control: 1, unit: " min", max: 20 },
    { metric: "Re-handling per stop saved", pilot: 10, control: 0.5, unit: " min", max: 12 },
    { metric: "Damage claims reduced", pilot: 31, control: 3, unit: "%", max: 40 },
  ];
  return (
    <Card className="space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold text-ink">Pilot vs control, 8 weeks</h3>
        <div className="flex gap-4 text-xs text-ink/60">
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded bg-brand" />Pilot fleets</span>
          <span className="flex items-center gap-1.5"><span className="size-2.5 rounded bg-ink/20" />Control fleets</span>
        </div>
      </div>
      {rows.map((r) => (
        <div key={r.metric} className="space-y-1.5">
          <p className="text-sm font-medium text-ink">{r.metric}</p>
          {[
            { v: r.pilot, tone: "bg-brand", text: "text-ink" },
            { v: r.control, tone: "bg-ink/20", text: "text-ink/50" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-3 flex-1 rounded-full bg-canvas">
                <div className={`h-full rounded-full ${b.tone}`} style={{ width: `${Math.max(2, (b.v / r.max) * 100)}%` }} />
              </div>
              <span className={`w-16 text-right text-xs font-semibold ${b.text}`}>{b.v}{r.unit}</span>
            </div>
          ))}
        </div>
      ))}
      <p className="text-sm text-ink/60">Control fleets barely moved over the same period, so we can credit the improvement to the new loading flow rather than seasonality.</p>
    </Card>
  );
}

function WhatDidntWork() {
  const items = [
    { title: "The 3D view nobody used", text: "Only 19% of sessions opened it. We kept it one tap away for planners and stopped investing in it.", tone: "bg-amber-50" },
    { title: "'Fill the gap' at first", text: "Owners accepted just 9% of part-load matches; they didn't trust unknown shippers. Verified-shipper badges and guaranteed payment lifted it to 31%.", tone: "bg-amber-50" },
    { title: "Voice prompts on the dock", text: "Too noisy to hear. Replaced with vibration and full-screen colour confirmations.", tone: "bg-amber-50" },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((i) => (
        <div key={i.title} className={`rounded-2xl p-5 ${i.tone}`}>
          <p className="flex items-center gap-2 font-semibold text-ink"><FontAwesomeIcon icon={faTriangleExclamation} className="size-4 text-amber-600" />{i.title}</p>
          <p className="mt-2 text-sm text-ink/70">{i.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Conclusion: metrics tree, outcomes by role                        */
/* ------------------------------------------------------------------ */

function MetricTree() {
  const drivers = [
    { label: "Plan acceptance", value: "21% → 76%", note: "plans used without manual rework" },
    { label: "Plan followed at dock", value: "44% → 89%", note: "steps completed in order" },
    { label: "Spare space filled", value: "0 → 31%", note: "owners accepting part-loads" },
  ];
  const guards = [
    { label: "Loading time", value: "−35%", ok: true },
    { label: "Damage rate", value: "−38%", ok: true },
    { label: "Override rate", value: "11%", ok: true },
    { label: "Driver complaints", value: "−42%", ok: true },
  ];
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-900 p-6 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">North-star metric</p>
        <p className="mt-1 text-2xl font-bold">Usable truck capacity sold per trip</p>
        <p className="text-sm text-white/80">Average fill 71% → 83%</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {drivers.map((d) => (
          <Card key={d.label} className="!p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">Driver</p>
            <p className="mt-1 font-semibold text-ink">{d.label}</p>
            <p className="text-xl font-bold text-ink">{d.value}</p>
            <p className="text-xs text-ink/50">{d.note}</p>
          </Card>
        ))}
      </div>
      <div className="rounded-2xl bg-white p-4 ring-1 ring-ink/5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/50">Guardrails: fuller trucks must not mean slower or riskier loading</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {guards.map((g) => (
            <div key={g.label} className="flex items-center gap-2 text-sm">
              <FontAwesomeIcon icon={faCircleCheck} className="size-4 text-emerald-500" />
              <span className="text-ink/70">{g.label}</span>
              <span className="ml-auto font-semibold text-ink">{g.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoleOutcomes() {
  const roles = [
    { icon: faClipboardList, role: "Load planner", outcome: "~5 hrs back every day", detail: "40 trucks × 8 min saved per plan" },
    { icon: faHelmetSafety, role: "Dock crew", outcome: "18 min faster per truck", detail: "less searching and re-stacking" },
    { icon: faRoute, role: "Driver", outcome: "~55 min saved per route", detail: "11 min less re-handling at each of 5 stops" },
    { icon: faTruck, role: "Truck owner", outcome: "+₹18k per truck per month", detail: "for owners using 'Fill the gap'" },
    { icon: faUserTie, role: "Agency head", outcome: "Daily utilisation view", detail: "instead of month-end reports" },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {roles.map((r) => (
        <Card key={r.role} className="flex gap-4 !p-5">
          <IconChip icon={r.icon} tone="green" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">{r.role}</p>
            <p className="font-bold text-ink">{r.outcome}</p>
            <p className="text-xs text-ink/60">{r.detail}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Illustrated avatars (no photos needed)                              */
/* ------------------------------------------------------------------ */

type AvatarProps = {
  skin: string;
  hair: string;
  hairStyle: "short" | "long" | "bun" | "bald" | "curly";
  shirt: string;
  bg: string;
  accessory?: "helmet" | "cap" | "glasses" | "headset" | "beard";
  size?: number;
};

function Avatar({ skin, hair, hairStyle, shirt, bg, accessory, size = 96 }: AvatarProps) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className="shrink-0" aria-hidden="true">
      <defs>
        <clipPath id={`clip-${bg.replace("#", "")}-${shirt.replace("#", "")}`}>
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${bg.replace("#", "")}-${shirt.replace("#", "")})`}>
        <rect width="120" height="120" fill={bg} />
        {/* long hair behind */}
        {hairStyle === "long" && <path d="M33 52c0-20 12-32 27-32s27 12 27 32v34H33z" fill={hair} />}
        {/* shoulders */}
        <path d="M18 120c2-24 20-36 42-36s40 12 42 36z" fill={shirt} />
        <path d="M50 84h20l-10 12z" fill="#ffffff" opacity="0.35" />
        {/* neck */}
        <rect x="52" y="70" width="16" height="16" rx="6" fill={skin} />
        {/* head */}
        <ellipse cx="60" cy="54" rx="21" ry="24" fill={skin} />
        {/* ears */}
        <ellipse cx="39" cy="56" rx="4" ry="6" fill={skin} />
        <ellipse cx="81" cy="56" rx="4" ry="6" fill={skin} />
        {/* hair styles */}
        {hairStyle === "short" && <path d="M38 50c0-16 10-25 22-25s22 9 22 25c-6-8-14-11-22-11s-16 3-22 11z" fill={hair} />}
        {hairStyle === "long" && <path d="M38 52c0-17 10-27 22-27s22 10 22 27c-5-10-13-14-22-14s-17 4-22 14z" fill={hair} />}
        {hairStyle === "bun" && (
          <>
            <circle cx="60" cy="24" r="9" fill={hair} />
            <path d="M38 50c0-16 10-25 22-25s22 9 22 25c-6-8-14-11-22-11s-16 3-22 11z" fill={hair} />
          </>
        )}
        {hairStyle === "curly" && (
          <path d="M37 52c-3-10 2-22 10-25 4-6 16-7 22-3 8 0 15 7 14 16 3 4 2 9 0 12-4-9-13-14-23-14s-19 5-23 14z" fill={hair} />
        )}
        {/* face */}
        <circle cx="52" cy="57" r="2.2" fill="#18033b" />
        <circle cx="68" cy="57" r="2.2" fill="#18033b" />
        <path d="M53 67c4 4 10 4 14 0" stroke="#18033b" strokeWidth="2" fill="none" strokeLinecap="round" />
        {accessory === "beard" && <path d="M41 60c2 14 9 21 19 21s17-7 19-21c-4 6-10 9-19 9s-15-3-19-9z" fill={hair} />}
        {accessory === "glasses" && (
          <g stroke="#18033b" strokeWidth="2" fill="none">
            <circle cx="52" cy="57" r="6" />
            <circle cx="68" cy="57" r="6" />
            <path d="M58 57h4" />
          </g>
        )}
        {accessory === "helmet" && (
          <>
            <path d="M36 46c0-16 11-26 24-26s24 10 24 26z" fill="#facc15" />
            <rect x="32" y="44" width="56" height="6" rx="3" fill="#eab308" />
          </>
        )}
        {accessory === "cap" && (
          <>
            <path d="M38 44c0-13 10-21 22-21s22 8 22 21z" fill="#1e3a8a" />
            <path d="M60 42h30c0 4-4 6-8 6H60z" fill="#1e40af" />
          </>
        )}
        {accessory === "headset" && (
          <g fill="none" stroke="#18033b" strokeWidth="3">
            <path d="M38 54c0-16 10-26 22-26s22 10 22 26" />
            <rect x="34" y="52" width="7" height="12" rx="3" fill="#18033b" />
            <path d="M40 64c2 8 8 10 14 10" strokeWidth="2" />
          </g>
        )}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 1. My role                                                          */
/* ------------------------------------------------------------------ */

function MyRole() {
  return (
    <Card className="space-y-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="size-28 shrink-0 overflow-hidden rounded-full border-4 border-white bg-lilac-100 shadow-lg ring-2 ring-brand/20">
          <img src={sumansahuImage} alt="Suman Sahu" className="h-full w-full object-cover" />
        </div>
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Lead UX Designer</p>
          <h3 className="text-2xl font-bold text-ink">Suman Sahu</h3>
          <p className="text-sm text-ink/60">Let's Transport · Truck Fill AI Agent · 6 months · 2025</p>
        </div>
      </div>
      <Body>
        I owned the experience end to end, from field research on warehouse docks and in transport agency offices to the planner web app, the dock guidance flow and the owner and agency mobile app. I worked closely with the optimisation and data science teams to make the AI's decisions explainable and safe.
      </Body>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Business usecase: illustrated                                    */
/* ------------------------------------------------------------------ */

function MovingAirTruck() {
  // 10 columns × 4 rows of cargo; 71% filled (≈28 of 40), rest is "air"
  const cols = 10;
  const rows = 4;
  const filled = 28;
  const cw = 34;
  const ch = 26;
  const tones = ["#7322ff", "#884bdb", "#4c04a9", "#a78bfa"];
  return (
    <svg viewBox="0 0 520 230" className="w-full h-auto" role="img" aria-label="A truck whose container is 71% filled with cargo and 29% empty">
      {/* road */}
      <rect x="0" y="206" width="520" height="4" rx="2" fill="#18033b" opacity="0.1" />
      {/* container */}
      <rect x="20" y="40" width={cols * cw + 16} height={rows * ch + 24} rx="10" fill="#ffffff" stroke="#18033b" strokeOpacity="0.15" strokeWidth="2" />
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = Math.floor(i / rows);
        const r = rows - 1 - (i % rows);
        const x = 28 + c * cw;
        const y = 52 + r * ch;
        const isFilled = i < filled;
        return isFilled ? (
          <rect key={i} x={x} y={y} width={cw - 4} height={ch - 4} rx="4" fill={tones[(c + r) % tones.length]} />
        ) : (
          <rect key={i} x={x} y={y} width={cw - 4} height={ch - 4} rx="4" fill="none" stroke="#f87171" strokeDasharray="4 3" strokeWidth="1.5" />
        );
      })}
      {/* air label */}
      <g>
        <rect x={28 + 7 * cw - 2} y="16" width={3 * cw} height="20" rx="10" fill="#fee2e2" />
        <text x={28 + 8.5 * cw - 2} y="30" fontSize="11" fontWeight="700" fill="#b91c1c" textAnchor="middle">29% moving air</text>
      </g>
      <g>
        <rect x="28" y="16" width={7 * cw - 8} height="20" rx="10" fill="#ede9fe" />
        <text x={28 + 3.5 * cw - 4} y="30" fontSize="11" fontWeight="700" fill="#5b21b6" textAnchor="middle">71% cargo</text>
      </g>
      {/* cab */}
      <path d={`M${36 + cols * cw} 92h52l26 30v42h-78z`} fill="#4c04a9" />
      <path d={`M${44 + cols * cw} 100h38l18 22h-56z`} fill="#c4b5fd" />
      {/* wheels */}
      {[70, 150, 300, 70 + cols * cw].map((x) => (
        <g key={x}>
          <circle cx={x} cy="190" r="16" fill="#18033b" />
          <circle cx={x} cy="190" r="6" fill="#e5e7eb" />
        </g>
      ))}
    </svg>
  );
}

function BusinessIllustrated() {
  return (
    <div className="space-y-6">
      <div className="grid items-center gap-6 rounded-3xl bg-gradient-to-br from-white to-lilac-100/60 p-6 ring-1 ring-ink/5 md:grid-cols-[1.4fr_1fr]">
        <MovingAirTruck />
        <div className="space-y-3">
          <p className="text-5xl font-bold text-ink">71%</p>
          <p className="text-sm text-ink/70">average fill on dispatch across 18 partner fleets and 1,140 trucks. Crews called these trucks "full".</p>
          <div className="rounded-xl bg-ink p-4 text-white">
            <p className="text-xs uppercase tracking-wide text-white/60">The cost of empty space</p>
            <p className="mt-1 text-2xl font-bold text-lime">~1,300 trips / month</p>
            <p className="text-xs text-white/70">that a fuller plan could avoid, worth about ₹1.2 Cr in fuel, tolls and driver time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StopsIllustration() {
  const stops = [1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 220 80" className="w-full h-auto" aria-hidden="true">
      <line x1="14" x2="206" y1="40" y2="40" stroke="#18033b" strokeOpacity="0.15" strokeWidth="4" strokeLinecap="round" />
      {stops.map((s, i) => {
        const x = 14 + i * 48;
        return (
          <g key={s}>
            <circle cx={x} cy="40" r="10" fill="#7322ff" />
            <text x={x} y="44" fontSize="10" fill="white" textAnchor="middle" fontWeight="700">{s}</text>
            <rect x={x - 10} y="56" width="20" height={6 + i * 2} rx="2" fill="#f87171" opacity={0.5 + i * 0.1} />
          </g>
        );
      })}
      <text x="110" y="18" fontSize="10" fill="#b91c1c" textAnchor="middle" fontWeight="600">re-handling grows at every stop</text>
    </svg>
  );
}

function DamageIllustration() {
  return (
    <svg viewBox="0 0 220 80" className="w-full h-auto" aria-hidden="true">
      <rect x="60" y="44" width="50" height="30" rx="3" fill="#4c04a9" />
      <text x="85" y="63" fontSize="9" fill="white" textAnchor="middle" fontWeight="700">40 kg</text>
      <path d="M62 44l6-14h34l6 14z" fill="#fecaca" stroke="#f87171" />
      <path d="M78 34l4 6-3 4" stroke="#b91c1c" strokeWidth="1.5" fill="none" />
      <text x="85" y="26" fontSize="9" fill="#b91c1c" textAnchor="middle" fontWeight="700">fragile</text>
      <rect x="120" y="30" width="44" height="44" rx="3" fill="#a78bfa" />
      <rect x="120" y="14" width="44" height="16" rx="3" fill="#c4b5fd" />
      <text x="142" y="56" fontSize="9" fill="white" textAnchor="middle" fontWeight="700">ok</text>
    </svg>
  );
}

function FillIllustration() {
  return (
    <svg viewBox="0 0 220 80" className="w-full h-auto" aria-hidden="true">
      <rect x="20" y="24" width="180" height="34" rx="8" fill="#f3e8ff" />
      <rect x="20" y="24" width={180 * 0.71} height="34" rx="8" fill="#7322ff" />
      <rect x={20 + 180 * 0.71} y="24" width={180 * 0.29} height="34" rx="0" fill="url(#hatch)" />
      <defs>
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="4" height="8" fill="#fecaca" />
        </pattern>
      </defs>
      <text x={20 + 90 * 0.71} y="46" fontSize="12" fill="white" textAnchor="middle" fontWeight="700">71%</text>
      <text x={20 + 180 * 0.855} y="72" fontSize="9" fill="#b91c1c" textAnchor="middle" fontWeight="600">empty</text>
    </svg>
  );
}

const businessProblems = [
  { art: <FillIllustration />, title: "Low truck utilisation", stat: "71% average fill", text: "About 1 in 4 trips could have been avoided with fuller plans.", impact: "Every extra trip adds fuel, tolls and driver hours, and pushes freight rates up." },
  { art: <StopsIllustration />, title: "Slow multi-drop delivery", stat: "~18 min re-handling per stop", text: "Goods loaded out of route order were dug out at almost every drop.", impact: "Missed delivery windows hurt on-time scores with enterprise clients." },
  { art: <DamageIllustration />, title: "Damage and disputes", stat: "3.2% of shipments claimed", text: "Heavy-on-fragile stacking and shifting loads caused most claims.", impact: "Claims eat carrier margins and erode shipper–carrier trust." },
];

function BusinessProblems() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {businessProblems.map((p) => (
        <div key={p.title} className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-ink/5">
          <div className="bg-canvas px-4 py-5">{p.art}</div>
          <div className="flex-1 space-y-1 p-5">
            <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
            <p className="text-sm font-semibold text-red-600">{p.stat}</p>
            <p className="text-sm text-ink/70">{p.text}</p>
          </div>
          <div className="flex gap-2 bg-ink px-5 py-4 text-sm text-white/85">
            <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5 size-3.5 shrink-0 text-amber-300" />
            {p.impact}
          </div>
        </div>
      ))}
    </div>
  );
}

function CauseChain() {
  const chains = [
    { cause: "No visibility of true fill", effect: "Planners pad every load", impact: "Under-filled trucks, more trips" },
    { cause: "Load order decided at the dock", effect: "Goods dug out at each stop", impact: "Late deliveries, damage" },
    { cause: "Tools built for expert planners", effect: "Carriers never adopt them", impact: "Spare capacity goes unsold" },
  ];
  return (
    <div className="space-y-3">
      <div className="hidden grid-cols-3 gap-3 px-1 text-xs font-semibold uppercase tracking-wide text-ink/50 md:grid">
        <span>Root cause</span><span>What happens</span><span>Business impact</span>
      </div>
      {chains.map((c) => (
        <div key={c.cause} className="grid gap-2 md:grid-cols-3 md:gap-3">
          <div className="rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-900">{c.cause}</div>
          <div className="relative rounded-xl bg-white p-3 text-sm text-ink/80 ring-1 ring-ink/5">
            <FontAwesomeIcon icon={faChevronRight} className="absolute -left-3 top-1/2 hidden size-3 -translate-y-1/2 text-ink/30 md:block" />
            {c.effect}
          </div>
          <div className="relative rounded-xl bg-red-50 p-3 text-sm font-medium text-red-800">
            <FontAwesomeIcon icon={faChevronRight} className="absolute -left-3 top-1/2 hidden size-3 -translate-y-1/2 text-ink/30 md:block" />
            {c.impact}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2b. Business objectives: strong goal cards                          */
/* ------------------------------------------------------------------ */

const goalCards = [
  { icon: faGaugeHigh, goal: "Raise truck utilisation", metric: "Average volumetric fill", baseline: 71, target: 80, result: 83, min: 60, max: 90, fmt: (v: number) => `${v}%`, why: "The north star: more freight per trip.", featured: true },
  { icon: faTruck, goal: "Fewer trips", metric: "Trips per 1,000 pallets", baseline: 100, target: 90, result: 86, min: 80, max: 105, fmt: (v: number) => `${v}`, why: "Same freight, fewer trucks on the road.", lowerBetter: true },
  { icon: faClock, goal: "Faster dispatch", metric: "Minutes per truck", baseline: 52, target: 36, result: 34, min: 25, max: 55, fmt: (v: number) => `${v}m`, why: "Bays turn faster at peak.", lowerBetter: true },
  { icon: faTruckRampBox, goal: "Easier unloading", metric: "Re-handling per stop", baseline: 18, target: 9, result: 7, min: 0, max: 20, fmt: (v: number) => `${v}m`, why: "Drivers finish routes on time.", lowerBetter: true },
  { icon: faMobileScreen, goal: "Carrier adoption", metric: "Owners active weekly", baseline: 0, target: 60, result: 64, min: 0, max: 80, fmt: (v: number) => `${v}%`, why: "Value only lands if carriers use it." },
];

function GoalTrack({ g }: { g: (typeof goalCards)[number] }) {
  const pos = (v: number) => {
    const t = (v - g.min) / (g.max - g.min);
    return `${(g.lowerBetter ? 1 - t : t) * 100}%`;
  };
  return (
    <div className="relative mt-5 h-2 rounded-full bg-ink/10">
      <div className="absolute inset-y-0 rounded-full bg-gradient-to-r from-lilac to-brand" style={{ left: pos(g.baseline), width: `calc(${pos(g.result)} - ${pos(g.baseline)})` }} />
      {[
        { v: g.baseline, label: "Before", cls: "bg-white ring-2 ring-ink/30", text: "text-ink/50" },
        { v: g.target, label: "Target", cls: "bg-white ring-2 ring-amber-400", text: "text-amber-600" },
        { v: g.result, label: "Achieved", cls: "bg-brand ring-4 ring-brand/20", text: "text-brand" },
      ].map((m) => (
        <span key={m.label} className={`absolute top-1/2 block size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${m.cls}`} style={{ left: pos(m.v) }} title={`${m.label} ${g.fmt(m.v)}`} />
      ))}
    </div>
  );
}

function GoalValues({ g, dark = false }: { g: (typeof goalCards)[number]; dark?: boolean }) {
  const items = [
    { label: "Before", v: g.baseline, dot: dark ? "bg-white/50" : "bg-white ring-2 ring-ink/30", text: dark ? "text-white/70" : "text-ink/60" },
    { label: "Target", v: g.target, dot: "bg-white ring-2 ring-amber-400", text: dark ? "text-amber-200" : "text-amber-700" },
    { label: "Achieved", v: g.result, dot: dark ? "bg-lime" : "bg-brand", text: dark ? "text-lime" : "text-brand" },
  ];
  return (
    <div className="mt-4 grid grid-cols-3 gap-2">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-1.5">
          <span className={`size-2.5 shrink-0 rounded-full ${i.dot}`} />
          <span className={`text-xs ${dark ? "text-white/60" : "text-ink/50"}`}>{i.label}</span>
          <span className={`text-xs font-bold ${i.text}`}>{g.fmt(i.v)}</span>
        </div>
      ))}
    </div>
  );
}

function BusinessObjectives() {
  const [featured, ...rest] = goalCards;
  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-brand to-brand-900 p-6 text-white md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Objective 1 · North star</p>
            <h3 className="mt-1 text-2xl font-bold">{featured.goal}</h3>
            <p className="text-sm text-white/70">{featured.metric} · {featured.why}</p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-bold text-lime">{featured.fmt(featured.result)}</p>
            <p className="text-xs text-white/70">from {featured.fmt(featured.baseline)} · target {featured.fmt(featured.target)}</p>
          </div>
        </div>
        <div className="relative mt-6 h-3 rounded-full bg-white/15">
          <div className="absolute inset-y-0 rounded-full bg-lime" style={{ left: `${((featured.baseline - featured.min) / (featured.max - featured.min)) * 100}%`, width: `${((featured.result - featured.baseline) / (featured.max - featured.min)) * 100}%` }} />
          <span className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ring-2 ring-amber-400" style={{ left: `${((featured.target - featured.min) / (featured.max - featured.min)) * 100}%` }} title="Target" />
        </div>
        <GoalValues g={featured} dark />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {rest.map((g, i) => (
          <Card key={g.goal} className="space-y-1">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <IconChip icon={g.icon} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">Objective {i + 2}</p>
                  <h3 className="font-semibold text-ink">{g.goal}</h3>
                </div>
              </div>
              <p className="text-3xl font-bold text-brand">{g.fmt(g.result)}</p>
            </div>
            <p className="text-xs text-ink/60">{g.metric} · {g.why}</p>
            <GoalTrack g={g} />
            <GoalValues g={g} />
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Personas: real persona sheets                                    */
/* ------------------------------------------------------------------ */

type Persona = {
  id: string;
  name: string;
  role: string;
  side: "Shipper" | "Carrier";
  age: number;
  location: string;
  experience: string;
  archetype: string;
  avatar: AvatarProps;
  quote: string;
  bio: string;
  goals: string[];
  frustrations: string[];
  behaviours: string[];
  tools: string[];
  techComfort: number; // 1-5
  motivations: { label: string; value: number }[]; // 0-100
  day: { time: string; text: string }[];
};

const personaSheets: Persona[] = [
  {
    id: "priya",
    name: "Priya Nair",
    role: "Load planner",
    side: "Shipper",
    age: 31,
    location: "Bhiwandi, Maharashtra",
    experience: "7 yrs in 3PL operations",
    archetype: "The spreadsheet planner",
    avatar: { skin: "#c68863", hair: "#1f130d", hairStyle: "bun", shirt: "#7322ff", bg: "#ede9fe", accessory: "glasses" },
    quote: "I plan 40 trucks before lunch. Ten minutes of spreadsheet Tetris per truck is my whole morning.",
    bio: "Priya runs outbound planning for an FMCG distributor's 3PL warehouse. She's measured on on-time dispatch and is quietly proud of her Excel templates, but knows the dock rarely follows them.",
    goals: ["Plan a truck in minutes", "Know if an order fits before promising it", "Hand the dock a plan they'll actually follow"],
    frustrations: ["Fit is guesswork until the truck is loaded", "Orders change after the plan is printed", "No feedback from the dock on what went wrong"],
    behaviours: ["Adds a 10–15% 'safety gap' to every load", "Prints plans and walks them to the dock", "Calls supervisors when things don't fit"],
    tools: ["Excel", "WMS", "WhatsApp", "Desktop"],
    techComfort: 4,
    motivations: [{ label: "Speed", value: 90 }, { label: "Accuracy", value: 80 }, { label: "Cost", value: 60 }, { label: "Safety", value: 50 }],
    day: [{ time: "08:00", text: "Orders close for wave 1" }, { time: "08:30", text: "Plans 20 trucks in Excel" }, { time: "11:00", text: "Re-plans after order changes" }, { time: "15:00", text: "Chases dock on delays" }],
  },
  {
    id: "ramesh",
    name: "Ramesh Yadav",
    role: "Dock supervisor",
    side: "Shipper",
    age: 44,
    location: "Bhiwandi, Maharashtra",
    experience: "15 yrs on the dock",
    archetype: "The experience-led loader",
    avatar: { skin: "#a86b4a", hair: "#2b2b2b", hairStyle: "short", shirt: "#f97316", bg: "#ffedd5", accessory: "helmet" },
    quote: "We load by experience. If the first stop's boxes end up at the back, the driver loses an hour digging.",
    bio: "Ramesh leads a crew of 8 loaders across 6 bays. He trusts his eye more than any printout and is the one blamed when cartons are crushed or a truck misses its slot.",
    goals: ["A clear load order his crew can follow", "No re-stacking or crushed cartons", "Every bay turned on time at peak"],
    frustrations: ["Printouts don't match what arrives", "Heavy and fragile mixed together", "No way to flag issues back to planning"],
    behaviours: ["Decides the order as goods arrive", "Shares one phone across the crew", "Works in gloves, noise and glare"],
    tools: ["Printed sheets", "Shared Android phone", "Walkie-talkie"],
    techComfort: 2,
    motivations: [{ label: "Speed", value: 85 }, { label: "Accuracy", value: 50 }, { label: "Cost", value: 30 }, { label: "Safety", value: 90 }],
    day: [{ time: "06:30", text: "Crew briefing" }, { time: "08:00", text: "First trucks dock" }, { time: "12:00", text: "Peak: 6 bays at once" }, { time: "17:00", text: "Damage reports" }],
  },
  {
    id: "arjun",
    name: "Arjun Singh",
    role: "Truck owner",
    side: "Carrier",
    age: 38,
    location: "Pune, Maharashtra",
    experience: "Owns 6 trucks · 10 yrs",
    archetype: "The margin-driven owner",
    avatar: { skin: "#b07a55", hair: "#111111", hairStyle: "short", shirt: "#0ea5e9", bg: "#e0f2fe", accessory: "beard" },
    quote: "An empty corner in my truck is money I'm leaving on the road. But I won't learn complicated software.",
    bio: "Arjun started as a driver and now runs a small fleet for three regular shippers. He runs the business from his phone between calls and thinks in rupees per trip.",
    goals: ["Earn more per trip by filling spare space", "Avoid overloading fines", "Run everything from his phone"],
    frustrations: ["Doesn't know spare space until loading", "Desktop planners feel built for big shippers", "Everything happens over calls"],
    behaviours: ["Accepts trips by phone", "Shares updates on WhatsApp groups", "Checks earnings at month end"],
    tools: ["WhatsApp", "UPI apps", "Android phone"],
    techComfort: 3,
    motivations: [{ label: "Speed", value: 60 }, { label: "Accuracy", value: 40 }, { label: "Cost", value: 95 }, { label: "Safety", value: 65 }],
    day: [{ time: "07:00", text: "Assigns trucks to trips" }, { time: "10:00", text: "Calls shippers for part-loads" }, { time: "14:00", text: "Sorts a driver issue" }, { time: "21:00", text: "Tallies the day's trips" }],
  },
  {
    id: "meera",
    name: "Meera Kulkarni",
    role: "Operations head",
    side: "Carrier",
    age: 46,
    location: "Mumbai, Maharashtra",
    experience: "Transport agency · 120 trucks",
    archetype: "The fleet orchestrator",
    avatar: { skin: "#d39b76", hair: "#3b2416", hairStyle: "long", shirt: "#10b981", bg: "#d1fae5", accessory: "headset" },
    quote: "I manage 120 trucks across vendors. I need to see who's running half-empty, not find out at month end.",
    bio: "Meera coordinates vendor-owned trucks for enterprise shippers. Her clients increasingly ask for utilisation and carbon numbers she can't produce reliably.",
    goals: ["A fleet-wide view of utilisation", "Match part-loads to trucks with space", "Prove efficiency to enterprise clients"],
    frustrations: ["Data arrives late and inconsistent", "Each vendor reports differently", "Partial trips quietly eat margin"],
    behaviours: ["Runs a daily control-room call", "Builds weekly reports by hand", "Juggles 20+ vendor contacts"],
    tools: ["TMS", "Excel", "WhatsApp", "Laptop"],
    techComfort: 4,
    motivations: [{ label: "Speed", value: 70 }, { label: "Accuracy", value: 85 }, { label: "Cost", value: 80 }, { label: "Safety", value: 60 }],
    day: [{ time: "09:00", text: "Control-room call" }, { time: "11:00", text: "Re-assigns late trucks" }, { time: "15:00", text: "Client escalation" }, { time: "18:00", text: "Manual utilisation report" }],
  },
  {
    id: "salim",
    name: "Salim Khan",
    role: "Driver",
    side: "Carrier",
    age: 29,
    location: "Thane, Maharashtra",
    experience: "6 yrs · multi-drop routes",
    archetype: "The on-time runner",
    avatar: { skin: "#8d5a3b", hair: "#0f0f0f", hairStyle: "curly", shirt: "#4c04a9", bg: "#f3e8ff", accessory: "cap" },
    quote: "Five drops a day. If the load isn't in stop order, I'm unloading and reloading at every customer.",
    bio: "Salim drives a 22 ft truck on city multi-drop routes. He's paid per trip, with penalties for late delivery and damage, even when the loading wasn't his.",
    goals: ["Reach each stop's goods without moving others", "Finish the route on time", "Fewer damage disputes"],
    frustrations: ["Later-stop goods block earlier ones", "No idea what's where inside", "Blamed for loading-side damage"],
    behaviours: ["Photographs the load before leaving", "Re-stacks at stops himself", "Uses voice notes, not typing"],
    tools: ["WhatsApp voice notes", "Google Maps", "Basic Android"],
    techComfort: 2,
    motivations: [{ label: "Speed", value: 90 }, { label: "Accuracy", value: 40 }, { label: "Cost", value: 50 }, { label: "Safety", value: 75 }],
    day: [{ time: "07:30", text: "Waits at the dock" }, { time: "09:30", text: "Stop 1 · digs for cartons" }, { time: "13:00", text: "Stop 3 · runs late" }, { time: "18:30", text: "Damage dispute call" }],
  },
];

function PersonaSheets() {
  const [id, setId] = useState(personaSheets[0].id);
  const p = personaSheets.find((x) => x.id === id)!;
  return (
    <div className="space-y-4">
      {/* persona tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {personaSheets.map((x) => (
          <button
            key={x.id}
            onClick={() => setId(x.id)}
            className={`flex shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-4 text-left transition-colors ${x.id === id ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-ink/10 hover:ring-brand/30"}`}
          >
            <Avatar {...x.avatar} size={36} />
            <span>
              <span className="block text-sm font-semibold leading-tight">{x.name.split(" ")[0]}</span>
              <span className={`block text-[11px] leading-tight ${x.id === id ? "text-white/75" : "text-ink/50"}`}>{x.role}</span>
            </span>
          </button>
        ))}
      </div>

      {/* sheet */}
      <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5">
        <div className="grid md:grid-cols-[260px_1fr]">
          {/* profile column */}
          <div className="space-y-4 bg-gradient-to-b from-lilac-100/70 to-white p-6 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <Avatar {...p.avatar} size={120} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-ink">{p.name}</h3>
              <p className="text-sm font-medium text-brand">{p.role}</p>
              <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${p.side === "Shipper" ? "bg-lilac-100 text-brand" : "bg-sky-100 text-sky-700"}`}>{p.side} side · {p.archetype}</span>
            </div>
            <dl className="grid grid-cols-2 gap-3 text-left text-xs md:grid-cols-1">
              {[
                { k: "Age", v: `${p.age}` },
                { k: "Location", v: p.location },
                { k: "Experience", v: p.experience },
              ].map((d) => (
                <div key={d.k}>
                  <dt className="font-semibold uppercase tracking-wide text-ink/40">{d.k}</dt>
                  <dd className="text-ink/80">{d.v}</dd>
                </div>
              ))}
              <div>
                <dt className="font-semibold uppercase tracking-wide text-ink/40">Tech comfort</dt>
                <dd className="mt-1 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span key={n} className={`h-1.5 w-5 rounded-full ${n <= p.techComfort ? "bg-brand" : "bg-ink/10"}`} />
                  ))}
                </dd>
              </div>
            </dl>
            <div className="flex flex-wrap justify-center gap-1.5 md:justify-start">
              {p.tools.map((t) => (
                <span key={t} className="rounded-md bg-white px-2 py-1 text-[11px] font-medium text-ink/70 ring-1 ring-ink/10">{t}</span>
              ))}
            </div>
          </div>

          {/* details column */}
          <div className="space-y-6 p-6">
            <blockquote className="border-l-4 border-yellow-400 bg-yellow-50 py-2 pl-4 pr-3 text-base font-medium italic text-ink">"{p.quote}"</blockquote>
            <p className="text-sm leading-relaxed text-ink/75">{p.bio}</p>

            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { title: "Goals", items: p.goals, mark: "✓", tone: "text-emerald-600" },
                { title: "Frustrations", items: p.frustrations, mark: "!", tone: "text-red-500" },
                { title: "Behaviours", items: p.behaviours, mark: "•", tone: "text-brand" },
              ].map((col) => (
                <div key={col.title}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">{col.title}</p>
                  <ul className="space-y-2">
                    {col.items.map((it) => (
                      <li key={it} className="flex gap-2 text-sm text-ink/80"><span className={`font-bold ${col.tone}`}>{col.mark}</span>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/50">What drives them</p>
                <div className="space-y-2">
                  {p.motivations.map((m) => (
                    <div key={m.label} className="grid grid-cols-[70px_1fr] items-center gap-2 text-xs">
                      <span className="text-ink/70">{m.label}</span>
                      <div className="h-2 rounded-full bg-ink/10"><div className="h-full rounded-full bg-brand" style={{ width: `${m.value}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/50">A day in their life</p>
                <ol className="relative space-y-2 border-l-2 border-lilac-100 pl-4">
                  {p.day.map((d) => (
                    <li key={d.time} className="relative text-xs text-ink/80">
                      <span className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-brand" />
                      <span className="font-semibold text-ink">{d.time}</span> · {d.text}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3b. Challenges matrix                                                */
/* ------------------------------------------------------------------ */

const challenges = [
  { icon: faEye, title: "Invisible capacity", text: "No one sees true fill or spare space until loading is done.", affects: ["priya", "arjun", "meera"], severity: 92 },
  { icon: faListOl, title: "Stop-order blindness", text: "Loads aren't sequenced by route, so drops need digging.", affects: ["ramesh", "salim"], severity: 88 },
  { icon: faWeightHanging, title: "Constraint overload", text: "Weight, axle, fragility and stacking rules are too many to remember.", affects: ["ramesh", "priya", "salim"], severity: 74 },
  { icon: faRepeat, title: "Plan-to-dock disconnect", text: "Plans are printed snapshots; changes never flow back.", affects: ["priya", "ramesh"], severity: 81 },
  { icon: faMobileScreen, title: "Tools built for someone else", text: "Desktop planners feel complex and costly for carriers.", affects: ["arjun", "meera", "salim"], severity: 70 },
];

function ChallengesMatrix() {
  return (
    <div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-ink/5">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-ink/5">
            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-ink/50">Challenge</th>
            {personaSheets.map((p) => (
              <th key={p.id} className="p-2">
                <div className="flex flex-col items-center gap-1">
                  <Avatar {...p.avatar} size={36} />
                  <span className="text-[11px] font-semibold text-ink/70">{p.name.split(" ")[0]}</span>
                </div>
              </th>
            ))}
            <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide text-ink/50">Severity</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((c) => (
            <tr key={c.title} className="border-b border-ink/5 last:border-0">
              <td className="p-4">
                <div className="flex gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                    <FontAwesomeIcon icon={c.icon} className="size-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{c.title}</p>
                    <p className="text-xs text-ink/60">{c.text}</p>
                  </div>
                </div>
              </td>
              {personaSheets.map((p) => (
                <td key={p.id} className="p-2 text-center">
                  {c.affects.includes(p.id) ? (
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-red-100 text-red-600" aria-label="Affected">
                      <FontAwesomeIcon icon={faXmark} className="size-3" />
                    </span>
                  ) : (
                    <span className="inline-block size-1.5 rounded-full bg-ink/15" aria-label="Not affected" />
                  )}
                </td>
              ))}
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-20 rounded-full bg-ink/10"><div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-red-500" style={{ width: `${c.severity}%` }} /></div>
                  <span className="text-xs font-semibold text-ink/70">{c.severity}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-ink/5 px-4 py-3 text-xs text-ink/50">Severity = frequency × cost per occurrence, scored from research observations (0–100).</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3c. Journey map v2: per-persona curves, today vs with agent          */
/* ------------------------------------------------------------------ */

type JourneySide = {
  people: [string, string]; // persona ids
  stages: { stage: string; touchpoint: string; pain: string; better: string }[];
  today: [number[], number[]];
  future: [number[], number[]];
};

const journeysV2: Record<"shipper" | "carrier", JourneySide> = {
  shipper: {
    people: ["priya", "ramesh"],
    stages: [
      { stage: "Orders close", touchpoint: "WMS export", pain: "No idea of fit until the maths is done", better: "Instant fit check per truck" },
      { stage: "Plan", touchpoint: "Excel", pain: "Pads loads with a 'safety gap'", better: "Trusted fill score with confidence" },
      { stage: "Hand-off", touchpoint: "Printout", pain: "Plan is stale as soon as it's printed", better: "Live plan link to the bay" },
      { stage: "Load", touchpoint: "Dock floor", pain: "Crew improvises; re-stacking and damage", better: "One step per screen, in stop order" },
      { stage: "Dispatch", touchpoint: "Gate", pain: "Gaps spotted too late to fill", better: "'Last call' order suggestions" },
    ],
    today: [
      [3.2, 1.6, 2.2, 2.6, 1.9],
      [3.0, 3.1, 2.0, 1.1, 2.4],
    ],
    future: [
      [4.0, 4.5, 4.2, 4.0, 4.6],
      [3.6, 3.8, 4.4, 4.3, 4.5],
    ],
  },
  carrier: {
    people: ["arjun", "salim"],
    stages: [
      { stage: "Booking", touchpoint: "Phone call", pain: "True load size unknown", better: "Fill % visible at booking" },
      { stage: "At the dock", touchpoint: "Shipper's bay", pain: "Spare space can't be sold in time", better: "Verified part-loads on the route" },
      { stage: "On the road", touchpoint: "Highway", pain: "Axle overload risk and fines", better: "Weight & axle check before leaving" },
      { stage: "Deliveries", touchpoint: "Customer stops", pain: "Digging out goods at every stop", better: "'At the door' view per stop" },
      { stage: "Settle", touchpoint: "WhatsApp & calls", pain: "No view of earnings per trip", better: "Trip earnings & utilisation" },
    ],
    today: [
      [3.4, 2.0, 2.7, 2.3, 1.5],
      [2.8, 2.4, 2.1, 1.0, 2.2],
    ],
    future: [
      [4.3, 4.6, 4.0, 4.1, 4.5],
      [3.8, 3.9, 4.3, 4.6, 4.0],
    ],
  },
};

function EmotionChart({ side, mode, mark }: { side: JourneySide; mode: "today" | "future"; mark: { i: number; p: number } }) {
  const W = 700;
  const H = 220;
  const padL = 86;
  const padR = 20;
  const padT = 16;
  const padB = 16;
  const n = side.stages.length;
  const x = (i: number) => padL + ((W - padL - padR) / n) * (i + 0.5);
  const y = (v: number) => padT + ((5 - v) / 4) * (H - padT - padB);
  const colors = ["#7322ff", "#f97316"];
  const smooth = (vals: number[]) =>
    vals
      .map((v, i) => {
        if (i === 0) return `M${x(0)},${y(v)}`;
        const cx = (x(i - 1) + x(i)) / 2;
        return `C${cx},${y(vals[i - 1])} ${cx},${y(v)} ${x(i)},${y(v)}`;
      })
      .join(" ");
  const series = mode === "today" ? side.today : side.future;
  const markV = series[mark.p][mark.i];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Emotion curve ${mode === "today" ? "today" : "with the AI agent"}`}>
      {/* bands */}
      <rect x={padL} y={y(5)} width={W - padL - padR} height={y(3.5) - y(5)} fill="#ecfdf5" />
      <rect x={padL} y={y(2.5)} width={W - padL - padR} height={y(1) - y(2.5)} fill="#fef2f2" />
      {[
        { v: 4.6, label: "😄 Delighted" },
        { v: 3, label: "😐 Neutral" },
        { v: 1.4, label: "😣 Frustrated" },
      ].map((l) => (
        <text key={l.label} x="6" y={y(l.v) + 4} fontSize="12" fill="#7d7192">{l.label}</text>
      ))}
      <line x1={padL} x2={W - padR} y1={y(3)} y2={y(3)} stroke="#18033b" strokeOpacity="0.12" strokeDasharray="4 4" />
      {side.stages.map((_, i) => (
        <line key={i} x1={x(i)} x2={x(i)} y1={padT} y2={H - padB} stroke="#18033b" strokeOpacity="0.05" />
      ))}
      {series.map((vals, p) => (
        <g key={p}>
          <path d={smooth(vals)} fill="none" stroke={colors[p]} strokeWidth="3.5" strokeLinecap="round" />
          {vals.map((v, i) => (
            <circle key={i} cx={x(i)} cy={y(v)} r="5.5" fill="white" stroke={colors[p]} strokeWidth="3" />
          ))}
        </g>
      ))}
      {/* moment that matters / biggest lift */}
      <circle cx={x(mark.i)} cy={y(markV)} r="13" fill="none" stroke={mode === "today" ? "#ef4444" : "#10b981"} strokeWidth="2.5" strokeDasharray="3 3" />
    </svg>
  );
}

function JourneyMapV2() {
  const [sideKey, setSideKey] = useState<"shipper" | "carrier">("shipper");
  const [mode, setMode] = useState<"today" | "future">("today");
  const side = journeysV2[sideKey];
  const people = side.people.map((id) => personaSheets.find((p) => p.id === id)!);
  const colors = ["bg-brand", "bg-orange-500"];

  // Today: the lowest moment. With the agent: the biggest improvement over today.
  let low = { v: 9, i: 0, p: 0 };
  side.today.forEach((vals, p) => vals.forEach((v, i) => { if (v < low.v) low = { v, i, p }; }));
  let lift = { v: -9, i: 0, p: 0 };
  side.future.forEach((vals, p) => vals.forEach((v, i) => { const d = v - side.today[p][i]; if (d > lift.v) lift = { v: d, i, p }; }));
  const mark = mode === "today" ? low : lift;
  const markText =
    mode === "today"
      ? `Moment that matters: ${side.stages[low.i].stage} (${people[low.p].name.split(" ")[0]})`
      : `Biggest lift: ${side.stages[lift.i].stage} (${people[lift.p].name.split(" ")[0]}, +${lift.v.toFixed(1)})`;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-ink/10">
          {(["shipper", "carrier"] as const).map((t) => (
            <button key={t} onClick={() => setSideKey(t)} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition-colors ${sideKey === t ? "bg-brand text-white" : "text-ink/60 hover:text-ink"}`}>
              {t} side
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-ink/10">
          {([
            { k: "today", l: "Today" },
            { k: "future", l: "With the AI agent" },
          ] as const).map((t) => (
            <button key={t.k} onClick={() => setMode(t.k)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${mode === t.k ? (t.k === "today" ? "bg-ink text-white" : "bg-emerald-600 text-white") : "text-ink/60 hover:text-ink"}`}>
              {t.l}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-white p-4 ring-1 ring-ink/5 md:p-6">
        {/* legend */}
        <div className="mb-3 flex flex-wrap gap-4">
          {people.map((p, i) => (
            <span key={p.id} className="flex items-center gap-2 text-sm text-ink/80">
              <Avatar {...p.avatar} size={28} />
              <span className={`h-1 w-5 rounded-full ${colors[i]}`} />
              {p.name.split(" ")[0]} · {p.role}
            </span>
          ))}
          <span className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${mode === "today" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
            <span className={`size-3 rounded-full border-2 border-dashed ${mode === "today" ? "border-red-500" : "border-emerald-500"}`} />
            {markText}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[680px]">
            {/* stage header */}
            <div className="grid" style={{ gridTemplateColumns: `86px repeat(${side.stages.length}, 1fr)` }}>
              <div />
              {side.stages.map((s, i) => (
                <div key={s.stage} className="px-2 pb-2 text-center">
                  <span className="text-[11px] font-semibold text-brand">Stage {i + 1}</span>
                  <p className="text-sm font-bold text-ink">{s.stage}</p>
                  <p className="text-[11px] text-ink/50">{s.touchpoint}</p>
                </div>
              ))}
            </div>
            <EmotionChart side={side} mode={mode} mark={mark} />
            {/* details row */}
            <div className="mt-2 grid" style={{ gridTemplateColumns: `86px repeat(${side.stages.length}, 1fr)` }}>
              <div className="pt-2 text-[11px] font-semibold uppercase tracking-wide text-ink/50">{mode === "today" ? "Pain" : "What changes"}</div>
              {side.stages.map((s) => (
                <div key={s.stage} className="p-1.5">
                  <p className={`h-full rounded-xl p-2.5 text-xs ${mode === "today" ? "bg-red-50 text-red-800" : "bg-emerald-50 text-emerald-800"}`}>{mode === "today" ? s.pain : s.better}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Case study                                                          */
/* ------------------------------------------------------------------ */

export default function TruckFillCaseStudy() {
  return (
    <div className="flex h-full flex-col px-4 py-12 lg:px-7 lg:py-20">
      <div className="space-y-24 max-w-4xl mx-auto w-full">
        {/* ===== SECTION 1: PROJECT SUMMARY ===== */}
        <section id="project-summary" className="space-y-8 scroll-mt-8">
          <SectionTitle>Project summary</SectionTitle>
          <div className="space-y-4 max-w-3xl">
            <Body>
              <strong>Let's Transport</strong> is a tech-led trucking and logistics platform that connects shippers (warehouses, 3PLs and enterprise brands) with transport agencies and truck owners to plan, load and move freight across India.
            </Body>
            <Body>
              Our partner fleets were busy but not efficient: <Mark>trucks were leaving the dock feeling full while carrying only about 71% of their capacity.</Mark> Multi-drop loads were packed in the wrong order, drivers re-handled goods at every stop, and the carriers who owned the trucks had no simple way to see or sell their spare space.
            </Body>
            <Body>
              I designed the <strong>Truck Fill AI Agent</strong> for Let's Transport to close that gap. It calculates a true fill score before loading, sequences each load around the delivery route, guides the dock crew step by step, and gives truck owners and agencies a mobile-first view of spare capacity they can act on.
            </Body>
          </div>

          <div className="space-y-6 pt-6">
            <SubTitle note="The technology existed long before people trusted it.">How it started</SubTitle>
            <StoryTimeline />
          </div>

          <div className="space-y-6">
            <SubTitle note="Orders go in, ready-to-load trucks come out, with every decision explained.">How truck fill works</SubTitle>
            <HowItWorks />
          </div>

          <div className="space-y-8 pt-6">
            <div className="space-y-3">
              <SubTitle note="An AI-guided loading flow led to fuller trucks, fewer trips and faster, safer loading.">Impact Highlights</SubTitle>
              <p className="text-sm font-medium text-ink/50">Jan 2025 – Jun 2025 vs Jul 2025 – Dec 2025 · 18 partner fleets</p>
            </div>
            <ImpactHighlights />
            <Disclaimer />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-ink">Core Outcomes</h2>
            <CoreOutcomes />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-ink">My Role</h2>
            <MyRole />
          </div>
        </section>

        {/* ===== SECTION 2: BUSINESS USECASE ===== */}
        <section id="business-problem" className="space-y-12 scroll-mt-8 mt-[120px]">
          <div className="space-y-4">
            <SectionTitle>Business Usecase</SectionTitle>
            <p className="text-2xl font-semibold leading-snug text-ink max-w-3xl">
              Our partners were moving freight every day, but <span className="text-brand">a third of every truck was moving air.</span>
            </p>
          </div>

          <BusinessIllustrated />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-ink">Where the value leaks</h2>
            <BusinessProblems />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-ink">Why it happens</h2>
            <CauseChain />
          </div>

          <div className="space-y-6">
            <SubTitle note="Each objective had a baseline, a target agreed with operations, and a single metric we could track weekly.">Business Objectives</SubTitle>
            <BusinessObjectives />
          </div>
        </section>

        {/* ===== SECTION 3: USER PROBLEMS ===== */}
        <section id="user-problem" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>User Problems</SectionTitle>

          <SubTitle note="A load passes through two sides: the shipper who prepares and loads the freight, and the carrier who owns and drives the truck. Both lose value, in different ways.">
            Who loads the truck?
          </SubTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: faWarehouse, title: "Shipper side", sub: "Warehouses, 3PLs, distributors", traits: ["Plans dozens of trucks a day", "Owns orders, SKUs and dock crews", "Measured on dispatch speed and damage", "Uses WMS or spreadsheets to plan", "Needs plans the dock will follow"] },
              { icon: faTruck, title: "Carrier side", sub: "Transport agencies and truck owners", traits: ["Owns 1–200 trucks, often mixed sizes", "Paid per trip, so spare space is lost revenue", "Coordinates over calls and WhatsApp", "Works mostly on mobile", "Needs quick answers, not 3D models"] },
            ].map((u) => (
              <Card key={u.title} className="space-y-4">
                <div className="flex items-center gap-3">
                  <IconChip icon={u.icon} />
                  <div>
                    <h3 className="text-2xl font-semibold text-ink">{u.title}</h3>
                    <p className="text-sm text-ink/60">{u.sub}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {u.traits.map((t) => (
                    <li key={t} className="flex gap-2 text-sm text-ink/80"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 text-brand" />{t}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <SubTitle note="Five people touch every load. Each sees a different part of the problem.">Different roles. Real challenges.</SubTitle>
          <PersonaSheets />

          <SubTitle note="Stripping away the role, each person is trying to get one job done.">Jobs to be done</SubTitle>
          <JobsToBeDone />

          <SubTitle note="We mapped a typical multi-drop load end to end, from both sides. The lowest moments are where value leaks out.">Current journey</SubTitle>
          <JourneyMapV2 />

          <SubTitle note="We surveyed 480 planners, supervisors and owners. Three distinct loading behaviours emerged.">Behavioural Segmentation</SubTitle>
          <Card className="space-y-5">
            <div className="flex h-10 overflow-hidden rounded-xl text-xs font-semibold text-white">
              <div className="flex items-center justify-center bg-brand-800" style={{ width: "46%" }}>221 · 46%</div>
              <div className="flex items-center justify-center bg-brand" style={{ width: "32%" }}>154 · 32%</div>
              <div className="flex items-center justify-center bg-lilac" style={{ width: "22%" }}>105 · 22%</div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { tone: "bg-brand-800", title: "Experience-led loaders", text: "Load by eye and habit. Fast, but fill averages 66% and stop order is often wrong." },
                { tone: "bg-brand", title: "Spreadsheet planners", text: "Calculate volume in Excel. Better fill (74%) but plans break when orders change." },
                { tone: "bg-lilac", title: "Tool adopters", text: "Use a load planner on desktop. Best fill (79%), but plans rarely reach the dock intact." },
              ].map((s) => (
                <div key={s.title} className="space-y-1">
                  <p className="flex items-center gap-2 font-semibold text-ink"><span className={`size-3 rounded ${s.tone}`} />{s.title}</p>
                  <p className="text-sm text-ink/70">{s.text}</p>
                </div>
              ))}
            </div>
          </Card>

          <SubTitle note="Every role wants a fuller, faster, safer trip. These five challenges get in the way, and they hit each person differently.">Challenges across roles</SubTitle>
          <ChallengesMatrix />

          <SubTitle note="Everything we heard came down to three problems, each tied to one of the questions this project set out to answer.">Problem statements</SubTitle>
          <ProblemStatements />
        </section>

        {/* ===== SECTION 4: RESEARCH ===== */}
        <section id="research" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Research</SectionTitle>

          <SubTitle note="To design loading that works on a real dock and a real route, we needed to answer these questions with the people doing the work.">Things to Know</SubTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {researchQuestions.map((q, i) => (
              <Card key={q} className="flex gap-4 !p-5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-sm font-bold text-brand">{i + 1}</span>
                <p className="text-sm text-ink/80">{q}</p>
              </Card>
            ))}
          </div>

          <h3 className="text-3xl font-bold text-ink mt-12 mb-6">Primary Research</h3>
          <PrimaryResearch />

          <h3 className="text-3xl font-bold text-ink mt-12 mb-6">Key Research Highlights</h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "'Full' is a feeling", text: "Crews call a truck full at about 71% of volume. Visibility, not effort, is the gap." },
              { title: "Order beats volume", text: "On multi-drop routes, wrong load order costs more time than poor fill." },
              { title: "Rules live in memory", text: "Axle and stacking limits are rarely checked, and damage follows." },
              { title: "Plans die at the dock", text: "37% of loads change after the plan is printed, and the planner never knows." },
              { title: "Owners want answers", text: "'Can I take this load?' matters more than a 3D model, on mobile and WhatsApp." },
            ].map((h) => (
              <div key={h.title} className="rounded-2xl bg-brand p-5 text-white">
                <p className="font-semibold">{h.title}</p>
                <p className="mt-1 text-sm text-white/80">{h.text}</p>
              </div>
            ))}
          </div>

          <h3 className="text-3xl font-bold text-ink mt-12 mb-6">Digging deeper</h3>
          <TimeBreakdown />
          <RootCause />

          <h3 className="text-3xl font-bold text-ink mt-12 mb-6">The data reality</h3>
          <DataReality />

          <SubTitle note="We studied how existing products answer the same questions, to find where the market falls short.">Secondary Research</SubTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "How do existing tools calculate and show truck fill before loading?",
              "Do they plan load order around multi-drop routes?",
              "How do they enforce weight, axle and fragility rules?",
              "How does the plan reach the people physically loading the truck?",
              "Can plans adapt when orders change at the last minute?",
              "Are they usable by small fleets and agencies on mobile?",
            ].map((q) => (
              <Card key={q} className="flex gap-3 !p-5">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mt-1 size-4 shrink-0 text-brand" />
                <p className="text-sm text-ink/80">{q}</p>
              </Card>
            ))}
          </div>

          <SubTitle note="Direct load-planning tools and the indirect ways people manage loading today.">Competitive Analysis</SubTitle>
          <CompetitiveAnalysis />

          <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Competitive Gap Map</h2>
          <GapMap />

          <h2 className="text-3xl font-bold text-ink mt-12 mb-6">Gaps and Opportunities</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-ink">Must Have</h3>
                <p className="text-sm text-ink/60">What's missing in loading today</p>
              </div>
              {[
                <>A <span className="font-semibold text-brand">true fill score</span> before loading, covering volume, weight and axle balance together.</>,
                <>Load order built from the <span className="font-semibold text-brand">delivery route</span>, not decided at the dock.</>,
                <><span className="font-semibold text-brand">Rules enforced automatically</span> for fragility, stacking and weight.</>,
                <>A plan that <span className="font-semibold text-brand">reaches the dock as steps</span>, not a printout.</>,
              ].map((t, i) => (
                <p key={i} className="rounded-xl bg-red-50 p-3 text-sm text-ink/80">{t}</p>
              ))}
            </Card>
            <Card className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-ink">Should Have</h3>
                <p className="text-sm text-ink/60">Where we can be better than anyone</p>
              </div>
              {[
                <><span className="font-semibold text-brand">Live re-planning</span> when orders change: change → re-fit → re-sequence → notify.</>,
                <><span className="font-semibold text-brand">Explainable AI</span> that says why an item goes where it does.</>,
                <>A <span className="font-semibold text-brand">mobile-first carrier app</span> with an answer first and details on tap.</>,
                <><span className="font-semibold text-brand">Spare capacity as revenue</span>, matching empty space to part-loads on the route.</>,
              ].map((t, i) => (
                <p key={i} className="rounded-xl bg-emerald-50 p-3 text-sm text-ink/80">{t}</p>
              ))}
            </Card>
          </div>

          <h2 className="text-3xl font-bold text-ink mt-12 mb-6">How Might We</h2>
          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-ink/5">
            {hmw.map((h) => (
              <div key={h.q} className="flex flex-col gap-2 border-b border-ink/5 p-4 last:border-0 sm:flex-row sm:items-center sm:gap-4">
                <span
                  className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    h.tag === "Critical" ? "bg-red-100 text-red-700" : h.tag === "Important" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {h.tag}
                </span>
                <p className="text-sm text-ink/80">{h.q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SECTION 5: DESIGN PROCESS ===== */}
        <section id="design-strategy" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Design Process</SectionTitle>

          <SubTitle note="Four principles kept every decision honest for both the planner's desk and the loading bay.">Design Principles</SubTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: faGaugeHigh, title: "Answer first", text: "Lead with the number that matters (fill %, can it fit, what's next). Details are always one tap away." },
              { icon: faCompass, title: "Plan for the route, not the box", text: "Every layout starts from delivery order. A full truck that's slow to unload isn't a good load." },
              { icon: faScaleBalanced, title: "Safe by default", text: "Weight, axle and fragility rules are guardrails the user never has to remember." },
              { icon: faCircleInfo, title: "Explain the AI", text: "Every suggestion comes with a short 'why', so planners and crews trust it and can override it." },
            ].map((p) => (
              <Card key={p.title} className="flex gap-4">
                <IconChip icon={p.icon} />
                <div>
                  <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                  <Body>{p.text}</Body>
                </div>
              </Card>
            ))}
          </div>

          <SubTitle note="The agent supports five moments across both sides of a load.">Experience Flow</SubTitle>
          <div className="grid gap-3 md:grid-cols-5">
            {[
              { icon: faClipboardList, step: "Plan", who: "Planner", text: "Orders in, fill score and layout out" },
              { icon: faCubes, step: "Fit", who: "AI agent", text: "Packs by volume, weight, axle and stop order" },
              { icon: faPeopleCarryBox, step: "Load", who: "Dock crew", text: "Step-by-step guidance on any phone" },
              { icon: faRoute, step: "Deliver", who: "Driver", text: "Know what's at the door for each stop" },
              { icon: faArrowTrendUp, step: "Learn", who: "Owner & agency", text: "Spare capacity and utilisation insights" },
            ].map((s, i) => (
              <div key={s.step} className="relative rounded-2xl bg-white p-4 text-center ring-1 ring-ink/5">
                <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-brand text-white">
                  <FontAwesomeIcon icon={s.icon} className="size-5" />
                </span>
                <p className="mt-3 font-semibold text-ink">{i + 1}. {s.step}</p>
                <p className="text-xs font-semibold text-brand">{s.who}</p>
                <p className="mt-1 text-xs text-ink/60">{s.text}</p>
              </div>
            ))}
          </div>

          <SubTitle note="We explored three directions with planners, supervisors and owners before committing.">Concept Exploration</SubTitle>
          <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-ink/5">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-ink/5 text-left text-ink/60">
                  <th className="p-4 font-medium">Concept</th>
                  <th className="p-4 font-medium">Idea</th>
                  <th className="p-4 text-center font-medium">Fill</th>
                  <th className="p-4 text-center font-medium">Unloading</th>
                  <th className="p-4 text-center font-medium">Adoption</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "A · 3D builder", idea: "Drag-and-drop 3D load builder with optimise button", s: ["strong", "mid", "gap"] as Level[] },
                  { name: "B · Smart checklist", idea: "AI generates a printable loading checklist per truck", s: ["mid", "strong", "mid"] as Level[] },
                  { name: "C · Guided agent ✓", idea: "AI plans, explains and guides each step on any device", s: ["strong", "strong", "strong"] as Level[] },
                ].map((c) => (
                  <tr key={c.name} className={`border-b border-ink/5 last:border-0 ${c.name.includes("✓") ? "bg-lilac-100/40" : ""}`}>
                    <td className="p-4 font-semibold text-ink">{c.name}</td>
                    <td className="p-4 text-ink/70">{c.idea}</td>
                    {c.s.map((v, i) => (
                      <td key={i} className="p-4 text-center"><LevelDot level={v} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Body>
            Concept A impressed planners but lost owners and dock crews within minutes. Concept B was loved at the dock but couldn't adapt to changes. <Mark>We combined A's intelligence with B's simplicity</Mark> into a guided agent that does the planning and hands each person only the step they need.
          </Body>

          <SubTitle>Key Design Decisions</SubTitle>
          <div className="space-y-3">
            {[
              { from: "A 3D model as the main screen", to: "A fill score and 'what's next' as the main screen, with 3D on demand", why: "Only 1 in 5 owners interacted with 3D in tests; everyone understood a percentage." },
              { from: "Printed load sheets", to: "Shareable dock links, one step per screen", why: "Crews used shared phones; no install or login meant same-day adoption." },
              { from: "Silent optimisation", to: "Each placement explains its reason ('Stop 1 · fragile · top layer')", why: "Supervisors overrode unexplained plans 3× more often." },
              { from: "Separate tools per role", to: "One plan, many views (planner, crew, driver, owner)", why: "Changes flow to everyone instantly, so the plan never goes stale." },
            ].map((d) => (
              <Card key={d.from} className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <p className="text-sm text-ink/50 line-through decoration-red-400/60">{d.from}</p>
                <FontAwesomeIcon icon={faChevronRight} className="hidden size-4 text-brand md:block" />
                <div>
                  <p className="text-sm font-semibold text-ink">{d.to}</p>
                  <p className="text-xs text-ink/60">{d.why}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ===== SECTION 6: CONCEPT AND SOLUTION ===== */}
        <section id="solution" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Concept and Solution</SectionTitle>
          <div className="space-y-4 max-w-3xl">
            <Body>
              The Truck Fill AI Agent works as <Mark>one shared plan with a view for every role</Mark>. Planners get the fill and layout, dock crews get step-by-step guidance, drivers know what's at the door for each stop, and owners and agencies see spare capacity they can turn into revenue.
            </Body>
          </div>
          <SolutionShowcase />

          <SubTitle note="An AI plan is only useful if people trust it enough to follow it, and can correct it when it's wrong.">Designing for trust</SubTitle>
          <TrustPatterns />

          <SubTitle note="The dock is loud, bright and fast. Gloved hands share phones, and the network drops out. We designed for that environment, not for a desk.">Designing for the dock</SubTitle>
          <DockDesign />

          <SubTitle note="Real loads rarely go to plan. These are the cases we designed for explicitly.">Edge cases</SubTitle>
          <EdgeCases />

          <SubTitle note="How the same multi-drop load runs before and after the agent.">Before vs After</SubTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { title: "Before", tone: "bg-red-50", icon: faXmark, iconTone: "text-red-500", steps: ["Planner estimates fit in Excel (~11 min)", "Prints a list; dock decides the order", "Truck leaves at ~71% fill", "Driver digs out goods at each stop", "Owner learns spare space after the trip"] },
              { title: "After", tone: "bg-emerald-50", icon: faCheck, iconTone: "text-emerald-600", steps: ["Agent builds a plan with a fill score (~3 min)", "Crew follows route-ordered steps on a phone", "Truck leaves at ~83% fill, or the gap is filled", "Each stop's goods are at the door", "Owner sees and sells spare space before dispatch"] },
            ].map((b) => (
              <div key={b.title} className={`rounded-2xl p-6 ${b.tone}`}>
                <h3 className="mb-4 text-xl font-bold text-ink">{b.title}</h3>
                <ol className="space-y-3">
                  {b.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm text-ink/80">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-ink">{i + 1}</span>
                      <span className="flex-1">{s}</span>
                      <FontAwesomeIcon icon={b.icon} className={`mt-0.5 size-3.5 ${b.iconTone}`} />
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* ===== SECTION 7: USER VALIDATION ===== */}
        <section id="validation" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>User Validation</SectionTitle>
          <SubTitle note="Two rounds of moderated testing with 14 participants (planners, dock supervisors, truck owners and agency managers), then an 8-week pilot measured against fleets that didn't use the agent.">How we tested</SubTitle>
          <TestRounds />

          <h3 className="text-2xl font-bold text-ink">Usability: before vs after</h3>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { l: "Task success", b: "61%", a: "93%" },
              { l: "Time to plan a truck", b: "11 min", a: "3 min" },
              { l: "SUS score", b: "58", a: "82" },
              { l: "Plans followed at dock", b: "44%", a: "89%" },
            ].map((m) => (
              <Card key={m.l} className="!p-4">
                <p className="text-xs text-ink/60">{m.l}</p>
                <p className="mt-1 text-2xl font-bold text-brand">{m.a}</p>
                <p className="text-xs text-ink/50">from {m.b}</p>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { q: "I finally know how full the truck is before we start, not after.", who: "Load planner, 3PL" },
              { q: "The crew just follows the phone. Nobody asks me where things go any more.", who: "Dock supervisor" },
              { q: "It told me I could take two more orders on the Satara run. That's my diesel paid for.", who: "Truck owner, 6 trucks" },
            ].map((t) => (
              <Card key={t.who} className="space-y-3">
                <FontAwesomeIcon icon={faQuoteLeft} className="size-5 text-brand/50" />
                <p className="text-ink/80 italic">{t.q}</p>
                <p className="text-xs font-semibold text-ink/60">{t.who}</p>
              </Card>
            ))}
          </div>

          <PilotResults />

          <SubTitle>What we changed after testing</SubTitle>
          <div className="space-y-3">
            {[
              { icon: faFlask, finding: "Supervisors didn't trust auto-placement of heavy pallets.", change: "Added a one-line reason to every placement and an 'override with reason' option the agent learns from." },
              { icon: faMobileScreen, finding: "Dock crews wore gloves and missed small buttons.", change: "Moved to full-width 'Done · Next' buttons, large step numbers and vibration confirmations." },
              { icon: faBolt, finding: "Owners ignored the fleet list when every truck looked 'fine'.", change: "Sorted by lowest fill and added a single 'Fill the gap' prompt with estimated earnings." },
              { icon: faRotate, finding: "Last-minute order changes left crews mid-way through an old plan.", change: "Live re-plan pushes only the changed steps, with a clear 'Plan updated' banner." },
            ].map((c) => (
              <Card key={c.finding} className="flex gap-4">
                <IconChip icon={c.icon} />
                <div>
                  <p className="text-sm font-semibold text-ink">{c.finding}</p>
                  <p className="text-sm text-ink/70">→ {c.change}</p>
                </div>
              </Card>
            ))}
          </div>

          <SubTitle note="Not everything landed. These misses shaped the final product as much as the wins.">What didn't work</SubTitle>
          <WhatDidntWork />
        </section>

        {/* ===== SECTION 8: CONCLUSION ===== */}
        <section id="impact" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Conclusion</SectionTitle>
          <div className="space-y-4 max-w-3xl">
            <Body>
              The biggest win wasn't the optimisation algorithm. It was <Mark>getting the plan off the planner's screen and into the hands of everyone who touches the truck</Mark>. Once fill was visible, load order followed the route, and owners could act on spare space, utilisation followed.
            </Body>
          </div>

          <SubTitle note="One north-star metric, three behaviours that drive it, and guardrails so efficiency never came at the cost of safety or speed.">How we measured success</SubTitle>
          <MetricTree />

          <SubTitle note="What changed for each person who touches the truck.">Outcomes by role</SubTitle>
          <RoleOutcomes />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { v: "−14%", l: "trips for the same freight" },
              { v: "~₹14 Cr", l: "estimated annual freight-cost saving across partner fleets" },
              { v: "~1,400 t", l: "CO₂e avoided per year from fewer trips (est.)" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-gradient-to-br from-brand to-brand-900 p-6 text-white">
                <p className="text-3xl font-bold">{s.v}</p>
                <p className="mt-1 text-sm text-white/80">{s.l}</p>
              </div>
            ))}
          </div>

          <SubTitle>What I learned</SubTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: faCubes, title: "A smarter optimiser isn't a better product", text: "The engine had worked for a year. Acceptance only moved, from 21% to 76%, once people could see why a plan was good." },
              { icon: faCircleInfo, title: "Speak in the user's units", text: "Planners didn't want the model's logic. They wanted numbers they already used: fill %, cost per order, minutes per stop." },
              { icon: faTriangleExclamation, title: "Trust breaks at the edges", text: "One plan that silently drops a pallet undoes ten good ones. The 'doesn't fit' path got as much design time as the happy path." },
              { icon: faPenRuler, title: "Design for the dock, not the desk", text: "The hardest constraint was a loader with gloves and a shared phone, not the 3D maths. Field visits found it; screen reviews never would." },
            ].map((l) => (
              <Card key={l.title} className="flex gap-4">
                <IconChip icon={l.icon} />
                <div>
                  <h3 className="text-lg font-semibold text-ink">{l.title}</h3>
                  <p className="text-sm text-ink/70">{l.text}</p>
                </div>
              </Card>
            ))}
          </div>

          <SubTitle>What's next</SubTitle>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { icon: faBoxOpen, text: "Camera-based load check: a photo at dispatch confirms the plan was followed." },
              { icon: faHandshake, text: "Open capacity network so agencies can share spare space across partners." },
              { icon: faBoxesStacked, text: "Mixed temperature and hazmat rules for cold-chain fleets." },
              { icon: faArrowTrendUp, text: "Predictive planning that suggests truck size before orders close." },
            ].map((n) => (
              <Card key={n.text} className="flex gap-3 !p-5">
                <FontAwesomeIcon icon={n.icon} className="mt-1 size-4 shrink-0 text-brand" />
                <p className="text-sm text-ink/80">{n.text}</p>
              </Card>
            ))}
          </div>

          <Disclaimer />
        </section>
      </div>
    </div>
  );
}
