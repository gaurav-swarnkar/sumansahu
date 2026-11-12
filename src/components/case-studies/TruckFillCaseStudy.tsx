import { useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { AnimatePresence, motion } from "motion/react";
import sumansahuImage from "../../imports/Main/suman_sahu.png";
import imgPriya from "../../imports/truck_fill/persona_priya.jpg";
import imgRamesh from "../../imports/truck_fill/persona_ramesh.jpg";
import imgArjun from "../../imports/truck_fill/persona_arjun.jpg";
import imgTruckHighway from "../../imports/truck_fill/truck_highway.jpg";
import imgWarehouseFloor from "../../imports/truck_fill/warehouse_floor.jpg";
import imgBoxesDock from "../../imports/truck_fill/boxes_dock.jpg";
import imgTruckRoad from "../../imports/truck_fill/truck_road.jpg";
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

/* ------------------------------------------------------------------ */
/* 1b. Context: the story and how truck fill works                     */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* 1c. Core outcomes with space for analytics images                   */
/* ------------------------------------------------------------------ */

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
  photo: string;
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
    photo: imgPriya,
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
    age: 36,
    location: "Bhiwandi, Maharashtra",
    experience: "12 yrs on the dock",
    archetype: "The experience-led loader",
    photo: imgRamesh,
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
    photo: imgArjun,
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
];

/* ------------------------------------------------------------------ */
/* 3b. Challenges matrix                                                */
/* ------------------------------------------------------------------ */

const challenges = [
  { icon: faEye, title: "Invisible capacity", text: "No one sees true fill or spare space until loading is done.", affects: ["priya", "arjun"], severity: 92 },
  { icon: faListOl, title: "Stop-order blindness", text: "Loads aren't sequenced by route, so drops need digging.", affects: ["ramesh", "arjun"], severity: 88 },
  { icon: faWeightHanging, title: "Constraint overload", text: "Weight, axle, fragility and stacking rules are too many to remember.", affects: ["ramesh", "priya"], severity: 74 },
  { icon: faRepeat, title: "Plan-to-dock disconnect", text: "Plans are printed snapshots; changes never flow back.", affects: ["priya", "ramesh"], severity: 81 },
  { icon: faMobileScreen, title: "Tools built for someone else", text: "Desktop planners feel complex and costly for carriers.", affects: ["arjun"], severity: 70 },
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
                  <PersonaPhoto id={p.id} size={36} />
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

/* ================================================================== */
/* Shared palette (brand only, so every visual reads as one system)    */
/* ================================================================== */

const C = {
  brand: "#7322ff",
  brand600: "#6505e7",
  brand800: "#4c04a9",
  brand900: "#3f0390",
  lilac: "#884bdb",
  lilac300: "#b794f6",
  lilac100: "#e1cbff",
  lilac50: "#f5efff",
  ink: "#18033b",
  muted: "#7d7192",
};

/* ================================================================== */
/* 1. How truck fill works: illustrated pipeline                        */
/* ================================================================== */

function IllOrders() {
  const boxes = [
    { x: 18, y: 70, w: 44, h: 34, t: "#1042" },
    { x: 68, y: 58, w: 52, h: 46, t: "#1043" },
    { x: 126, y: 76, w: 36, h: 28, t: "#1047" },
    { x: 34, y: 36, w: 40, h: 30, t: "#1051" },
    { x: 84, y: 22, w: 34, h: 32, t: "#1052" },
  ];
  return (
    <svg viewBox="0 0 180 120" className="h-auto w-full" aria-hidden="true">
      <ellipse cx="90" cy="108" rx="78" ry="6" fill={C.lilac100} opacity="0.6" />
      {boxes.map((b, i) => (
        <g key={b.t}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill={i % 2 ? C.lilac100 : "#ffffff"} stroke={C.brand800} strokeOpacity="0.35" strokeWidth="1.5" />
          <path d={`M${b.x} ${b.y + 8}h${b.w}`} stroke={C.brand800} strokeOpacity="0.2" />
          <rect x={b.x + 5} y={b.y + 13} width={Math.min(26, b.w - 10)} height="7" rx="2" fill={C.brand} opacity="0.8" />
          <text x={b.x + 6} y={b.y + 19} fontSize="5.5" fill="#fff" fontWeight="700">{b.t}</text>
        </g>
      ))}
    </svg>
  );
}

function IllAgent() {
  const rules = ["Volume", "Weight", "Axle", "Route"];
  return (
    <svg viewBox="0 0 180 120" className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="agentG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.brand} />
          <stop offset="1" stopColor={C.brand900} />
        </linearGradient>
      </defs>
      {/* orbit */}
      <circle cx="90" cy="60" r="46" fill="none" stroke={C.lilac100} strokeWidth="1.5" strokeDasharray="3 4" />
      {/* core */}
      <rect x="62" y="32" width="56" height="56" rx="14" fill="url(#agentG)" />
      <path d="M80 60l7 7 14-15" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="90" y="82" fontSize="7" fill="#fff" textAnchor="middle" fontWeight="700" opacity="0.85">AI AGENT</text>
      {/* rule chips */}
      {rules.map((r, i) => {
        const a = (-90 + i * 90) * (Math.PI / 180);
        const x = 90 + Math.cos(a) * 58;
        const y = 60 + Math.sin(a) * 46;
        return (
          <g key={r}>
            <rect x={x - 20} y={y - 8} width="40" height="16" rx="8" fill="#fff" stroke={C.brand} strokeOpacity="0.4" />
            <text x={x} y={y + 3} fontSize="7" fill={C.brand800} textAnchor="middle" fontWeight="700">{r}</text>
          </g>
        );
      })}
    </svg>
  );
}

function IllTruck() {
  // stops 4..1 from cab to door, so stop 1 is by the door
  const stopTone = [C.brand800, C.brand, C.lilac, C.lilac300];
  const cols = 6;
  const rows = 3;
  return (
    <svg viewBox="0 0 180 120" className="h-auto w-full" aria-hidden="true">
      <ellipse cx="90" cy="108" rx="80" ry="5" fill={C.lilac100} opacity="0.6" />
      {/* trailer */}
      <rect x="8" y="26" width="122" height="66" rx="6" fill="#fff" stroke={C.ink} strokeOpacity="0.2" strokeWidth="2" />
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = Math.floor(i / rows);
        const r = i % rows;
        const stop = 3 - Math.min(3, Math.floor((c * 4) / cols)); // 3..0
        const isEmpty = c === cols - 1 && r === 0;
        return isEmpty ? (
          <rect key={i} x={14 + c * 19} y={32 + r * 19} width="16" height="16" rx="3" fill="none" stroke={C.lilac300} strokeDasharray="2 2" />
        ) : (
          <rect key={i} x={14 + c * 19} y={32 + r * 19} width="16" height="16" rx="3" fill={stopTone[stop]} />
        );
      })}
      {/* door marker */}
      <rect x="128" y="30" width="4" height="58" rx="2" fill={C.ink} opacity="0.5" />
      {/* cab, on the left, so the door is on the right */}
      <path d="M134 50h22l14 16v26h-36z" fill={C.brand800} />
      <path d="M140 55h14l9 11h-23z" fill={C.lilac100} />
      {[34, 104, 152].map((x) => (
        <g key={x}>
          <circle cx={x} cy="96" r="9" fill={C.ink} />
          <circle cx={x} cy="96" r="3.5" fill="#e5e7eb" />
        </g>
      ))}
      <rect x="70" y="8" width="54" height="14" rx="7" fill={C.lilac50} stroke={C.brand} strokeOpacity="0.3" />
      <text x="97" y="18" fontSize="7.5" fill={C.brand800} textAnchor="middle" fontWeight="700">94% fill</text>
    </svg>
  );
}

function IllDock() {
  return (
    <svg viewBox="0 0 180 120" className="h-auto w-full" aria-hidden="true">
      {/* route */}
      <path d="M100 96 C 120 70, 150 90, 160 56 S 150 20, 172 14" fill="none" stroke={C.lilac300} strokeWidth="3" strokeDasharray="1 6" strokeLinecap="round" />
      {[
        [100, 96, "1"],
        [138, 80, "2"],
        [160, 50, "3"],
        [170, 16, "4"],
      ].map(([x, y, n]) => (
        <g key={String(n)}>
          <circle cx={Number(x)} cy={Number(y)} r="8" fill={C.brand} />
          <text x={Number(x)} y={Number(y) + 3} fontSize="8" fill="#fff" textAnchor="middle" fontWeight="700">{n}</text>
        </g>
      ))}
      {/* phone */}
      <rect x="18" y="8" width="62" height="104" rx="10" fill={C.ink} />
      <rect x="22" y="14" width="54" height="92" rx="7" fill="#fff" />
      <text x="28" y="26" fontSize="6" fill={C.muted}>Step 3 of 9</text>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="28" y={32 + i * 20} width="42" height="15" rx="4" fill={i === 1 ? C.lilac100 : C.lilac50} />
          <circle cx="35" cy={39.5 + i * 20} r="4" fill={i === 0 ? "#10b981" : C.brand} />
          <rect x="42" y={37 + i * 20} width="22" height="4" rx="2" fill={C.ink} opacity="0.35" />
        </g>
      ))}
      <rect x="28" y="92" width="42" height="10" rx="5" fill={C.brand} />
      <text x="49" y="99" fontSize="5.5" fill="#fff" textAnchor="middle" fontWeight="700">DONE · NEXT</text>
    </svg>
  );
}

const pipeline = [
  { n: "01", title: "Orders arrive", text: "Weight, volume, fragility and delivery windows flow in from the shipper's system.", art: <IllOrders />, tag: "Input" },
  { n: "02", title: "The agent plans", text: "It packs by volume, weight and axle load, and checks every rule before suggesting a plan.", art: <IllAgent />, tag: "AI" },
  { n: "03", title: "Packed by stop", text: "The last stop goes in first, so each customer's goods sit by the door, with a clear fill score.", art: <IllTruck />, tag: "Output" },
  { n: "04", title: "Guided to the road", text: "The crew loads step by step on any phone, and the driver sees what's at the door for each stop.", art: <IllDock />, tag: "Action" },
];

function HowItWorks() {
  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-ink/5 md:p-8">
      <div className="grid gap-6 md:grid-cols-4 md:gap-4">
        {pipeline.map((s, i) => (
          <div key={s.n} className="relative">
            {/* connector */}
            {i < pipeline.length - 1 && (
              <>
                <div className="absolute left-[calc(100%-6px)] top-[72px] z-10 hidden w-[calc(1rem+12px)] items-center md:flex" aria-hidden="true">
                  <span className="h-0.5 flex-1 bg-gradient-to-r from-lilac-100 to-brand" />
                  <span className="size-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-brand" />
                </div>
                <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center md:hidden" aria-hidden="true">
                  <span className="h-3 w-0.5 bg-brand/40" />
                  <span className="size-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-brand" />
                </div>
              </>
            )}
            <div className="flex h-full flex-col rounded-2xl bg-gradient-to-b from-lilac-100/50 to-white p-4 ring-1 ring-brand/10">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-2xl font-bold text-brand/30">{s.n}</span>
                <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand ring-1 ring-brand/20">{s.tag}</span>
              </div>
              <div className="mx-auto w-full max-w-[200px]">{s.art}</div>
              <h3 className="mt-3 font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/65">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-3 border-t border-ink/5 pt-5 text-sm md:grid-cols-2">
        <p className="text-ink/70"><span className="font-semibold text-ink">Goes in:</span> orders, item sizes and weights, truck types, delivery route.</p>
        <p className="text-ink/70"><span className="font-semibold text-ink">Comes out:</span> fill score, load order, dock steps, driver's stop view.</p>
      </div>
    </div>
  );
}

/* ================================================================== */
/* 2. Impact highlights: brand-consistent tiles and charts              */
/* ================================================================== */

/* ================================================================== */
/* 3. Why it happens: illustrated cause → effect → impact flow          */
/* ================================================================== */

const causeFlows = [
  {
    cause: { icon: faEye, title: "No visibility of true fill", text: "Fill is judged by eye; 38% of items lack sizes." },
    effect: { icon: faCubes, title: "Planners pad every load", text: "A 10–15% 'safety gap' becomes the habit." },
    impact: { metric: "71%", title: "average fill", text: "About 1 in 4 trips is avoidable." },
  },
  {
    cause: { icon: faListOl, title: "Load order decided at the dock", text: "Plans ignore the delivery route." },
    effect: { icon: faPeopleCarryBox, title: "Goods dug out at each stop", text: "Re-handling and re-stacking at every drop." },
    impact: { metric: "18 min", title: "lost per stop", text: "Late deliveries and 3.2% damage claims." },
  },
  {
    cause: { icon: faSliders, title: "Tools built for expert planners", text: "Desktop-only, 3D-first, training-heavy." },
    effect: { icon: faMobileScreen, title: "Carriers never adopt them", text: "Owners and agencies stay on calls and WhatsApp." },
    impact: { metric: "0%", title: "spare space sold", text: "Empty capacity goes unused and unpaid." },
  },
];

function FlowArrow() {
  return (
    <div className="flex items-center justify-center py-1 md:px-1 md:py-0" aria-hidden="true">
      <svg viewBox="0 0 40 16" className="h-4 w-8 rotate-90 md:rotate-0">
        <path d="M2 8h30" stroke={C.brand} strokeOpacity="0.45" strokeWidth="2" strokeDasharray="3 3" />
        <path d="M30 3l7 5-7 5" fill="none" stroke={C.brand} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function CauseChain() {
  const heads = [
    { label: "Root cause", sub: "Why" },
    { label: "What happens", sub: "Behaviour" },
    { label: "Business impact", sub: "Cost" },
  ];
  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-ink/5 md:p-6">
      <div className="mb-3 hidden grid-cols-[1fr_40px_1fr_40px_1fr] md:grid">
        {heads.map((h, i) => (
          <div key={h.label} className={i === 1 ? "col-start-3" : i === 2 ? "col-start-5" : ""}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">{h.sub}</p>
            <p className="text-sm font-semibold text-ink">{h.label}</p>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {causeFlows.map((f, idx) => (
          <div key={idx} className="grid items-stretch border-b border-ink/5 pb-5 last:border-0 last:pb-0 md:grid-cols-[1fr_40px_1fr_40px_1fr] md:border-0 md:pb-0">
            <div className="flex gap-3 rounded-2xl bg-lilac-100/40 p-4 ring-1 ring-brand/10">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                <FontAwesomeIcon icon={f.cause.icon} className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{f.cause.title}</p>
                <p className="text-xs text-ink/60">{f.cause.text}</p>
              </div>
            </div>
            <FlowArrow />
            <div className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink/10">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lilac-100/60 text-brand-800">
                <FontAwesomeIcon icon={f.effect.icon} className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{f.effect.title}</p>
                <p className="text-xs text-ink/60">{f.effect.text}</p>
              </div>
            </div>
            <FlowArrow />
            <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-brand to-brand-900 p-4 text-white">
              <div className="shrink-0 text-center">
                <p className="text-2xl font-bold leading-none">{f.impact.metric}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-white/70">{f.impact.title}</p>
              </div>
              <p className="border-l border-white/20 pl-4 text-xs text-white/85">{f.impact.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* 4. Jobs to be done: structured job stories per persona               */
/* ================================================================== */

/* ================================================================== */
/* 5. Journey map: full data rows + per-persona emotion curves          */
/* ================================================================== */

type JStage = {
  stage: string;
  touchpoint: string;
  doing: [string, string];
  thinking: [string, string];
  pain: string;
  opportunity: string;
  doingAfter: [string, string];
  thinkingAfter: [string, string];
};

type JourneyData = { people: string[]; stages: JStage[]; today: [number[], number[]]; future: [number[], number[]] };

const journeyData: Record<"shipper" | "carrier", JourneyData> = {
  shipper: {
    people: ["priya", "ramesh"],
    stages: [
      {
        stage: "Orders close", touchpoint: "WMS export",
        doing: ["Exports orders, checks truck availability", "Prepares bays for the morning wave"],
        thinking: ["Will all of this fit in the trucks I have?", "How many trucks today, and when?"],
        pain: "No idea of fit until the maths is done", opportunity: "Instant fit check per truck",
        doingAfter: ["Sees fit and fill for every truck instantly", "Gets bay schedule with truck ETAs"],
        thinkingAfter: ["I know what fits before I promise it", "I can plan my crew around this"],
      },
      {
        stage: "Plan", touchpoint: "Excel",
        doing: ["Estimates volume, assigns orders to trucks", "Waits for the plan"],
        thinking: ["I'll leave some margin just in case", "Hope the plan isn't late again"],
        pain: "Pads loads with a 'safety gap'", opportunity: "Trusted fill score with confidence",
        doingAfter: ["Reviews the agent's plan and reasons", "Gets the plan pushed to his bay"],
        thinkingAfter: ["The reasons make sense, I'll ship it", "It's here already"],
      },
      {
        stage: "Hand-off", touchpoint: "Printout",
        doing: ["Prints the list, walks it to the dock", "Receives a printout that's already stale"],
        thinking: ["Hope they follow it this time", "This doesn't match what just arrived"],
        pain: "Plan is stale as soon as it's printed", opportunity: "Live plan link to the bay",
        doingAfter: ["Shares a live link; changes sync", "Opens the dock view on a shared phone"],
        thinkingAfter: ["Changes reach the dock on their own", "What I see is what's on the floor"],
      },
      {
        stage: "Load", touchpoint: "Dock floor",
        doing: ["Takes calls when things don't fit", "Crew loads by habit, mixing heavy and fragile"],
        thinking: ["Another call from the dock", "Where does this go? Who's first?"],
        pain: "Crew improvises; re-stacking and damage", opportunity: "One step per screen, in stop order",
        doingAfter: ["Sees progress live, no calls", "Crew follows steps in stop order"],
        thinkingAfter: ["Quiet for once", "Done once, no re-stacking"],
      },
      {
        stage: "Dispatch", touchpoint: "Gate",
        doing: ["Closes the truck, notes late dispatches", "Spots gaps at the doors"],
        thinking: ["We could have fit another order", "Too late to add anything now"],
        pain: "Gaps spotted too late to fill", opportunity: "'Last call' order suggestions",
        doingAfter: ["Adds a 'last call' order to fill the gap", "Closes a full, balanced truck"],
        thinkingAfter: ["That's one less truck tomorrow", "Full and on time"],
      },
    ],
    today: [[3.2, 1.6, 2.2, 2.6, 1.9], [3.0, 3.1, 2.0, 1.1, 2.4]],
    future: [[4.0, 4.5, 4.2, 4.0, 4.6], [3.6, 3.8, 4.4, 4.3, 4.5]],
  },
  carrier: {
    people: ["arjun"],
    stages: [
      {
        stage: "Booking", touchpoint: "Phone call",
        doing: ["Accepts a trip over a call", "Gets told where to report"],
        thinking: ["Is this a full load or a part load?", "Which dock, what time?"],
        pain: "True load size unknown", opportunity: "Fill % visible at booking",
        doingAfter: ["Sees fill % and route at booking", "Gets dock, slot and stops on his phone"],
        thinkingAfter: ["I know what I'm earning", "Clear plan for the day"],
      },
      {
        stage: "At the dock", touchpoint: "Shipper's bay",
        doing: ["Calls around for part-loads", "Waits while the shipper loads"],
        thinking: ["There's still space at the back", "This is taking forever"],
        pain: "Spare space can't be sold in time", opportunity: "Verified part-loads on the route",
        doingAfter: ["Accepts a verified part-load in one tap", "Watches loading progress on the plan"],
        thinkingAfter: ["Empty corner, now paid", "Loading is moving fast"],
      },
      {
        stage: "On the road", touchpoint: "Highway",
        doing: ["Hopes the truck isn't overloaded", "Drives with an unbalanced load"],
        thinking: ["One fine wipes out the trip's profit", "Hope the axle check is fine"],
        pain: "Axle overload risk and fines", opportunity: "Weight & axle check before leaving",
        doingAfter: ["Gets a green axle and weight check", "Drives a balanced load"],
        thinkingAfter: ["No surprise fines", "Truck handles well"],
      },
      {
        stage: "Deliveries", touchpoint: "Customer stops",
        doing: ["Handles calls about delays", "Digs out each stop's goods from behind others"],
        thinking: ["Why is everything late?", "Every stop takes forever"],
        pain: "Digging out goods at every stop", opportunity: "'At the door' view per stop",
        doingAfter: ["Sees stops completing on time", "Unloads what's at the door, moves on"],
        thinkingAfter: ["Clients are happy", "In and out in minutes"],
      },
      {
        stage: "Settle", touchpoint: "WhatsApp & calls",
        doing: ["Reconciles trips and claims by hand", "Argues a damage claim"],
        thinking: ["Did this trip even make money?", "Not my fault, it was loaded that way"],
        pain: "No view of earnings per trip", opportunity: "Trip earnings & utilisation",
        doingAfter: ["Sees earnings and fill per trip", "Shares the load photo and plan as proof"],
        thinkingAfter: ["Now I know which trips pay", "The plan backs me up"],
      },
    ],
    today: [[3.4, 2.0, 2.7, 2.3, 1.5], [2.8, 2.4, 2.1, 1.0, 2.2]],
    future: [[4.3, 4.6, 4.0, 4.1, 4.5], [3.8, 3.9, 4.3, 4.6, 4.0]],
  },
};

const personaColors = [C.brand, "#f59e0b"];

function JourneyMap() {
  const [sideKey, setSideKey] = useState<"shipper" | "carrier">("shipper");
  const [mode, setMode] = useState<"today" | "future">("today");
  const j = journeyData[sideKey];
  const people = j.people.map((id) => personaSheets.find((p) => p.id === id)!);
  const n = j.stages.length;
  const series = (mode === "today" ? j.today : j.future).slice(0, j.people.length);
  const cols = `120px repeat(${n}, minmax(0, 1fr))`;

  // moment that matters (today) / biggest lift (future)
  let mark = { v: 9, i: 0, p: 0 };
  if (mode === "today") j.today.slice(0, j.people.length).forEach((vals, p) => vals.forEach((v, i) => { if (v < mark.v) mark = { v, i, p }; }));
  else {
    mark = { v: -9, i: 0, p: 0 };
    j.future.slice(0, j.people.length).forEach((vals, p) => vals.forEach((v, i) => { const d = v - j.today[p][i]; if (d > mark.v) mark = { v: d, i, p }; }));
  }

  const yPct = (v: number) => 8 + ((5 - v) / 4) * 84; // % from top
  const xPct = (i: number) => ((i + 0.5) / n) * 100;
  const pathFor = (vals: number[]) =>
    vals
      .map((v, i) => {
        const x = xPct(i) * 10;
        const y = yPct(v) * 2;
        if (i === 0) return `M${x},${y}`;
        const px = xPct(i - 1) * 10;
        const py = yPct(vals[i - 1]) * 2;
        const cx = (px + x) / 2;
        return `C${cx},${py} ${cx},${y} ${x},${y}`;
      })
      .join(" ");

  const RowLabel = ({ children }: { children: ReactNode }) => (
    <div className="sticky left-0 z-10 flex items-start bg-white p-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/45">{children}</div>
  );

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
            <button key={t.k} onClick={() => setMode(t.k)} className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${mode === t.k ? "bg-brand text-white" : "text-ink/60 hover:text-ink"}`}>
              {t.l}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5">
        {/* legend */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-ink/5 px-5 py-3">
          {people.map((p, i) => (
            <span key={p.id} className="flex items-center gap-2 text-sm text-ink/80">
              <PersonaPhoto id={p.id} size={28} />
              <span className="h-1 w-5 rounded-full" style={{ background: personaColors[i] }} />
              {p.name.split(" ")[0]} · {p.role}
            </span>
          ))}
          <span className="ml-auto rounded-full bg-lilac-100/60 px-3 py-1 text-xs font-semibold text-brand-800">
            {mode === "today" ? "◎ Moment that matters" : "◎ Biggest lift"}: {j.stages[mark.i].stage} · {people[mark.p].name.split(" ")[0]}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[860px]">
            {/* stages */}
            <div className="grid border-b border-ink/5 bg-canvas/60" style={{ gridTemplateColumns: cols }}>
              <RowLabel>Stage</RowLabel>
              {j.stages.map((s, i) => (
                <div key={s.stage} className="border-l border-ink/5 p-3">
                  <p className="text-[11px] font-semibold text-brand">0{i + 1}</p>
                  <p className="text-sm font-bold text-ink">{s.stage}</p>
                  <p className="text-[11px] text-ink/50">{s.touchpoint}</p>
                </div>
              ))}
            </div>

            {/* doing / thinking, per persona */}
            {[
              { label: "Doing", key: mode === "today" ? ("doing" as const) : ("doingAfter" as const), quote: false },
              { label: "Thinking", key: mode === "today" ? ("thinking" as const) : ("thinkingAfter" as const), quote: true },
            ].map((row) => (
              <div key={row.label} className="grid border-b border-ink/5" style={{ gridTemplateColumns: cols }}>
                <RowLabel>{row.label}</RowLabel>
                {j.stages.map((s) => (
                  <div key={s.stage} className="space-y-1.5 border-l border-ink/5 p-2.5">
                    {s[row.key].slice(0, j.people.length).map((t, pi) => (
                      <p key={pi} className={`flex gap-1.5 text-xs leading-snug ${row.quote ? "italic text-ink/70" : "text-ink/80"}`}>
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: personaColors[pi] }} />
                        {row.quote ? `"${t}"` : t}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* feeling curve */}
            <div className="relative grid border-b border-ink/5" style={{ gridTemplateColumns: cols }}>
              <div className="sticky left-0 z-10 h-48 bg-white text-[11px] text-ink/50">
                <span className="absolute left-3 top-2 font-semibold uppercase tracking-[0.14em] text-ink/45">Feeling</span>
                {[
                  { v: 4.6, l: "😄 Delighted" },
                  { v: 3, l: "😐 Neutral" },
                  { v: 1.4, l: "😣 Frustrated" },
                ].map((t) => (
                  <span key={t.l} className="absolute left-3 -translate-y-1/2 whitespace-nowrap" style={{ top: `${yPct(t.v)}%` }}>{t.l}</span>
                ))}
              </div>
              <div className="relative h-48" style={{ gridColumn: `2 / span ${n}` }}>
                <div className="absolute inset-x-0 top-0 h-[30%] bg-emerald-50/70" />
                <div className="absolute inset-x-0 bottom-0 h-[30%] bg-rose-50/70" />
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-ink/10" />
                {j.stages.map((_, i) => (
                  <div key={i} className="absolute inset-y-0 border-l border-ink/5" style={{ left: `${(i / n) * 100}%` }} />
                ))}
                <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                  {series.map((vals, p) => (
                    <path key={p} d={pathFor(vals)} fill="none" stroke={personaColors[p]} strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                  ))}
                </svg>
                {series.map((vals, p) =>
                  vals.map((v, i) => (
                    <span
                      key={`${p}-${i}`}
                      className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] bg-white"
                      style={{ left: `${xPct(i)}%`, top: `${yPct(v)}%`, borderColor: personaColors[p] }}
                      title={`${people[p].name.split(" ")[0]}: ${v.toFixed(1)} / 5`}
                    />
                  )),
                )}
                <span
                  className="absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-brand"
                  style={{ left: `${xPct(mark.i)}%`, top: `${yPct(series[mark.p][mark.i])}%` }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* pain + opportunity */}
            {[
              { label: mode === "today" ? "Pain point" : "Pain removed", key: "pain" as const, cls: mode === "today" ? "bg-rose-50 text-rose-800" : "bg-canvas text-ink/40 line-through" },
              { label: mode === "today" ? "Opportunity" : "What changed", key: "opportunity" as const, cls: "bg-lilac-100/60 text-brand-800" },
            ].map((row) => (
              <div key={row.label} className="grid border-b border-ink/5 last:border-0" style={{ gridTemplateColumns: cols }}>
                <RowLabel>{row.label}</RowLabel>
                {j.stages.map((s) => (
                  <div key={s.stage} className="border-l border-ink/5 p-2">
                    <p className={`h-full rounded-lg p-2.5 text-xs leading-snug ${row.cls}`}>{s[row.key]}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-ink/50">Feeling scores (1–5) come from interviews and dock observations; "with the AI agent" scores come from pilot follow-ups.</p>
    </div>
  );
}

/* ================================================================== */
/* v6: story carousel, impact visuals, photo personas, JTBD carousel   */
/* Photos: Unsplash (unsplash.com/license), stored locally.            */
/* ================================================================== */

function CarouselControls({ index, count, onChange, label }: { index: number; count: number; onChange: (i: number) => void; label: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            aria-label={`${label} ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? "w-7 bg-brand" : "w-2 bg-ink/20 hover:bg-ink/35"}`}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={() => onChange((index - 1 + count) % count)} aria-label={`Previous ${label}`} className="flex size-10 items-center justify-center rounded-full bg-white text-brand ring-1 ring-ink/10 transition-colors hover:bg-lilac-100">
          <FontAwesomeIcon icon={faChevronLeft} className="size-4" />
        </button>
        <button onClick={() => onChange((index + 1) % count)} aria-label={`Next ${label}`} className="flex size-10 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-600">
          <FontAwesomeIcon icon={faChevronRight} className="size-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------- How it started: small story carousel ---------- */

const storySlides = [
  { img: imgWarehouseFloor, title: "An optimiser nobody used", text: "Let's Transport already had a load-planning engine. Planners exported its output and redid the plans in Excel." },
  { img: imgBoxesDock, title: "Plans fell apart at the dock", text: "Even good plans broke once loading began. Crews improvised, and carriers had no view of the load at all." },
  { img: imgTruckRoad, title: "Where I came in", text: "I was asked to make the plan something every role could see, trust and act on, from the planner's desk to the driver's last stop." },
];

function StoryCarousel() {
  const [i, setI] = useState(0);
  const s = storySlides[i];
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-[1.1fr_1fr]"
          >
            <img src={s.img} alt="" className="h-52 w-full object-cover md:h-full md:min-h-[260px]" />
            <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
              <span className="text-sm font-semibold text-brand">{String(i + 1).padStart(2, "0")} / {String(storySlides.length).padStart(2, "0")}</span>
              <h3 className="text-2xl font-bold leading-tight text-ink">{s.title}</h3>
              <p className="text-base leading-relaxed text-ink/70">{s.text}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <CarouselControls index={i} count={storySlides.length} onChange={setI} label="story slide" />
    </div>
  );
}

/* ---------- Impact highlights ---------- */

function FillRing({ value }: { value: number }) {
  const c = 2 * Math.PI * 42;
  return (
    <svg viewBox="0 0 100 100" className="size-36 -rotate-90" aria-hidden="true">
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="10" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="10" strokeDasharray={c} strokeDashoffset={c * (1 - 0.71)} />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#f0ff64" strokeWidth="10" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
    </svg>
  );
}

const impactCards: { label: string; icon: IconDefinition; before: number; after: number; unit: string; delta: string; note: string; down?: boolean }[] = [
  { label: "Trips needed", icon: faTruck, before: 100, after: 86, unit: "", delta: "14% fewer trips", note: "per 1,000 pallets", down: true },
  { label: "Loading time", icon: faClock, before: 52, after: 34, unit: " min", delta: "35% faster", note: "plan to dispatch", down: true },
  { label: "Damage claims", icon: faBoxOpen, before: 3.2, after: 2.0, unit: "%", delta: "38% fewer", note: "of shipments", down: true },
];

function ImpactHighlights() {
  return (
    <div className="space-y-4">
      {/* hero metric */}
      <div className="relative overflow-hidden rounded-3xl">
        <img src={imgTruckHighway} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/85 to-brand/40" />
        <div className="relative flex flex-col gap-6 p-6 text-white sm:flex-row sm:items-center sm:justify-between md:p-8">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
              <FontAwesomeIcon icon={faGaugeHigh} className="size-3.5" /> Truck fill rate
            </span>
            <p className="text-6xl font-bold leading-none">83<span className="text-3xl">%</span></p>
            <p className="text-base text-white/85">
              up from <strong>71%</strong>: <span className="font-semibold text-lime">+12 pts</span> more freight on every truck
            </p>
          </div>
          <div className="relative self-center">
            <FillRing value={83} />
            <span className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-white/70">target 80%</span>
              <span className="text-sm font-semibold text-lime">beaten</span>
            </span>
          </div>
        </div>
      </div>

      {/* supporting metrics */}
      <div className="grid gap-4 sm:grid-cols-3">
        {impactCards.map((m) => {
          const fmt = (v: number) => (Number.isInteger(m.before) ? `${v}` : v.toFixed(1));
          const pct = (m.after / m.before) * 100;
          return (
            <div key={m.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <FontAwesomeIcon icon={m.icon} className="size-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink/70">{m.label}</p>
                  <p className="text-xs text-ink/45">{m.note}</p>
                </div>
              </div>
              <p className="mt-4 text-4xl font-bold text-ink">{fmt(m.after)}<span className="text-xl">{m.unit}</span></p>
              <p className="mt-1 text-sm font-semibold text-green-600">↘ {m.delta}</p>
              {/* before vs after, as one simple bar */}
              <div className="mt-4 space-y-1.5">
                <div className="h-2.5 rounded-full bg-lilac-100" />
                <div className="h-2.5 rounded-full bg-brand" style={{ width: `${pct}%` }} />
                <div className="flex justify-between text-[11px] text-ink/50">
                  <span>Before {fmt(m.before)}{m.unit}</span>
                  <span className="font-semibold text-brand">After {fmt(m.after)}{m.unit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Personas: 3 photo-based persona cards ---------- */

function PersonaPhoto({ id, size = 40, className = "" }: { id: string; size?: number; className?: string }) {
  const p = personaSheets.find((x) => x.id === id)!;
  return <img src={p.photo} alt={p.name} width={size} height={size} className={`shrink-0 rounded-full object-cover ${className}`} style={{ width: size, height: size }} />;
}

function PersonaSheets() {
  const [id, setId] = useState(personaSheets[0].id);
  const p = personaSheets.find((x) => x.id === id)!;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {personaSheets.map((x) => (
          <button
            key={x.id}
            onClick={() => setId(x.id)}
            className={`flex flex-col items-center gap-2 rounded-2xl p-2 text-center transition-all sm:flex-row sm:pr-3 sm:text-left ${x.id === id ? "bg-brand/5 ring-2 ring-brand" : "bg-white ring-1 ring-ink/10 hover:ring-brand/30"}`}
          >
            <PersonaPhoto id={x.id} size={44} />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink">{x.name.split(" ")[0]}</span>
              <span className="hidden truncate text-xs text-ink/55 sm:block">{x.role}</span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5">
          <div className="grid md:grid-cols-[240px_1fr]">
            <div className="relative">
              <img src={p.photo} alt={p.name} className="h-64 w-full object-cover md:h-full" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 text-white">
                <p className="text-lg font-bold">{p.name}</p>
                <p className="text-sm text-white/80">{p.role} · {p.age}</p>
              </div>
            </div>
            <div className="space-y-5 p-6">
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-brand/10 px-2.5 py-1 font-semibold text-brand">{p.archetype}</span>
                <span className="rounded-full bg-canvas px-2.5 py-1 text-ink/70">{p.location}</span>
                <span className="rounded-full bg-canvas px-2.5 py-1 text-ink/70">{p.experience}</span>
              </div>
              <blockquote className="border-l-4 border-brand pl-4 text-base font-medium italic text-ink">"{p.quote}"</blockquote>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/45">Goals</p>
                  <ul className="space-y-1.5">
                    {p.goals.map((g) => (
                      <li key={g} className="flex gap-2 text-sm text-ink/80"><FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 size-3.5 shrink-0 text-brand" />{g}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/45">Frustrations</p>
                  <ul className="space-y-1.5">
                    {p.frustrations.map((g) => (
                      <li key={g} className="flex gap-2 text-sm text-ink/80"><FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5 size-3.5 shrink-0 text-lilac" />{g}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 border-t border-ink/5 pt-4 text-xs text-ink/60">
                <span className="flex items-center gap-2">
                  Tech comfort
                  <span className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} className={`h-1.5 w-4 rounded-full ${n <= p.techComfort ? "bg-brand" : "bg-ink/10"}`} />
                    ))}
                  </span>
                </span>
                <span className="text-ink/30">·</span>
                <span>Uses {p.tools.join(", ")}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---------- Jobs to be done: one card per persona, in a carousel ---------- */

const jobStories = [
  { persona: "priya", when: "orders close for a dispatch wave", want: "know which truck each order fits into, and in what order", so: "dispatch on time without wasting space", today: "Excel and a 10–15% safety gap", success: "Plan a truck in under 3 minutes" },
  { persona: "ramesh", when: "a truck backs into my bay", want: "my crew to know exactly what goes in next", so: "load once, safely and on time", today: "Printouts and experience", success: "No re-stacking, no crushed cartons" },
  { persona: "arjun", when: "a trip is booked", want: "to know how much space is left and how to fill it", so: "every trip earns as much as it can", today: "Phone calls and guesswork", success: "Spare space sold before dispatch" },
];

function JobsToBeDone() {
  const [i, setI] = useState(0);
  const j = jobStories[i];
  const p = personaSheets.find((x) => x.id === j.persona)!;
  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div key={j.persona} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }} className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink/5">
          <div className="flex items-center gap-4 border-b border-ink/5 bg-gradient-to-r from-brand/10 to-white px-6 py-4">
            <PersonaPhoto id={p.id} size={56} className="ring-4 ring-white" />
            <div>
              <p className="text-lg font-bold text-ink">{p.name}</p>
              <p className="text-sm text-ink/60">{p.role}</p>
            </div>
          </div>
          <div className="grid gap-px bg-ink/5 md:grid-cols-3">
            {[
              { k: "When", v: j.when, icon: faClock },
              { k: "I want to", v: j.want, icon: faBullseye },
              { k: "So I can", v: j.so, icon: faCircleCheck },
            ].map((row, idx) => (
              <div key={row.k} className="space-y-3 bg-white p-6">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <FontAwesomeIcon icon={row.icon} className="size-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{idx + 1} · {row.k}</span>
                </div>
                <p className="text-lg font-semibold leading-snug text-ink">{row.v}</p>
              </div>
            ))}
          </div>
          <div className="grid border-t border-ink/5 sm:grid-cols-2">
            <div className="px-6 py-4 sm:border-r sm:border-ink/5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Hired today</p>
              <p className="mt-1 text-sm text-ink/75">{j.today}</p>
            </div>
            <div className="px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Success looks like</p>
              <p className="mt-1 text-sm font-semibold text-brand">{j.success}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <CarouselControls index={i} count={jobStories.length} onChange={setI} label="job story" />
    </div>
  );
}

/* ---------- Core outcomes: qualitative, room for analytics images ---------- */

type Outcome = { icon: IconDefinition; title: string; text: string; image?: string; imageAlt?: string };

const coreOutcomes: Outcome[] = [
  { icon: faEye, title: "Fill you can see", text: "Planners and owners know a truck's real capacity before anything is loaded." },
  { icon: faTruckRampBox, title: "Unload without digging", text: "Every stop's goods sit by the door, so drops take minutes, not a dig." },
  { icon: faHandshake, title: "Carriers on board", text: "Owners and agencies plan from their phones and sell space that used to travel empty." },
];

function CoreOutcomes() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {coreOutcomes.map((o) => (
        <Card key={o.title} className="flex flex-col gap-4 overflow-hidden !p-0">
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
              <strong>Let's Transport</strong> is a logistics solutions platform that gives enterprises, organisations and individual truck owners the tools to book, manage, track and report on logistics, end to end.
            </Body>
            <Body>
              I designed its <strong>Truck Fill AI Agent</strong>: a planning assistant that shows how full a truck really is before loading, packs each load around the delivery route, guides the dock crew step by step, and lets truck owners fill their spare space from their phone.
            </Body>
          </div>

          <div className="space-y-6 pt-6">
            <SubTitle>How it started</SubTitle>
            <StoryCarousel />
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

          <SubTitle note="Three people shape every load. Each one sees a different part of the problem.">Different roles. Real challenges.</SubTitle>
          <PersonaSheets />

          <SubTitle note="Stripping away the role, each person is trying to get one job done.">Jobs to be done</SubTitle>
          <JobsToBeDone />

          <SubTitle note="We mapped a typical multi-drop load end to end: the shipper side (Priya and Ramesh) and the carrier side (Arjun). The lowest moments are where value leaks out.">Current journey</SubTitle>
          <JourneyMap />

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
