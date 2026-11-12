import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faReceipt,
  faCamera,
  faClipboardCheck,
  faCarrot,
  faChartLine,
  faCircleCheck,
  faLayerGroup,
  faChevronDown,
  faCheck,
  faXmark,
  faEye,
  faArrowTrendUp,
  faWifi,
  faLanguage,
  faBookOpen,
  faCartShopping,
  faWandMagicSparkles,
  faKitchenSet,
  faTruck,
  faBoxOpen,
  faBoxesStacked,
  faUsers,
  faComments,
  faRotate,
  faShieldHalved,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";
import sumansahuImage from "../../imports/Main/suman_sahu.png";
import imgRohan from "../../imports/recipe_stock/persona_rohan.jpg";
import imgKavita from "../../imports/recipe_stock/persona_kavita.jpg";
import imgImran from "../../imports/recipe_stock/persona_imran.jpg";
import imgRestaurantTable from "../../imports/recipe_stock/restaurant_table.jpg";
import imgKitchenFire from "../../imports/recipe_stock/kitchen_fire.jpg";
import imgProduceStock from "../../imports/recipe_stock/produce_stock.jpg";
import imgRestaurantHall from "../../imports/recipe_stock/restaurant_hall.jpg";

/*
 * Receipt → Recipe → Stock automation, a Click Bacon case study.
 *
 * Deliberately uses its own visual language (receipts, kitchen tickets,
 * ledgers, field notes, blueprints) rather than the patterns of the other
 * case studies. All numbers are assumed / proportional data for portfolio
 * purposes. Photos: Unsplash (unsplash.com/license), stored locally.
 */

/* ================================================================== */
/* Visual language                                                     */
/* ================================================================== */

const C = {
  brand: "#7322ff",
  brand800: "#4c04a9",
  brand900: "#3f0390",
  lilac: "#884bdb",
  lilac300: "#b794f6",
  lilac100: "#e1cbff",
  ink: "#18033b",
  muted: "#7d7192",
  paper: "#fffdf7",
  tomato: "#ef4444",
  saffron: "#f59e0b",
  basil: "#10b981",
};

/** Section opener, matching the other case studies: plain title + optional lead statement. */
function Chapter({ title, thesis }: { n?: string; kicker?: string; title: string; thesis?: ReactNode }) {
  return (
    <header className="space-y-4">
      <h1 className="text-4xl font-bold text-ink mt-20 mb-8">{title}</h1>
      {thesis && <p className="max-w-3xl text-2xl font-semibold leading-snug text-ink">{thesis}</p>}
    </header>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-wide text-ink/50">{children}</p>;
}

function H2({ children, note }: { children: ReactNode; note?: ReactNode }) {
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

function Hl({ children }: { children: ReactNode }) {
  return <span className="text-brand">{children}</span>;
}

/** Paper receipt with perforated top and bottom edges. */
function Receipt({ children, className = "", tone = "paper" }: { children: ReactNode; className?: string; tone?: "paper" | "dark" }) {
  const bg = tone === "dark" ? C.ink : C.paper;
  const edge = `radial-gradient(circle at 8px 0, transparent 6px, ${bg} 6.5px)`;
  return (
    <div className={`relative ${className}`}>
      <div className="h-2" style={{ background: edge, backgroundSize: "16px 8px", transform: "rotate(180deg)" }} />
      <div className={`px-6 py-5 font-mono ${tone === "dark" ? "text-white" : "text-ink"}`} style={{ background: bg }}>
        {children}
      </div>
      <div className="h-2" style={{ background: edge, backgroundSize: "16px 8px" }} />
    </div>
  );
}

/** Ledger line with dotted leader between label and value. */
function Leader({ label, value, strong = false, muted = false }: { label: ReactNode; value: ReactNode; strong?: boolean; muted?: boolean }) {
  return (
    <div className={`flex items-baseline gap-2 text-sm ${strong ? "font-bold" : ""} ${muted ? "opacity-60" : ""}`}>
      <span className="shrink-0">{label}</span>
      <span className="flex-1 translate-y-[-3px] border-b-2 border-dotted border-current opacity-25" />
      <span className="shrink-0">{value}</span>
    </div>
  );
}

function Sticky({ children, tone = "yellow", rotate = 0 }: { children: ReactNode; tone?: "yellow" | "lilac" | "mint" | "peach"; rotate?: number }) {
  const tones = { yellow: "bg-[#fff6a8]", lilac: "bg-[#ece0ff]", mint: "bg-[#d8f7e8]", peach: "bg-[#ffe1cc]" };
  return (
    <div className={`${tones[tone]} p-4 text-sm leading-snug text-ink shadow-[0_6px_14px_rgba(24,3,59,0.12)]`} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </div>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-ink/10 bg-white p-6 ${className}`}>{children}</div>;
}

function Disclaimer() {
  return (
    <p className="rounded-xl bg-white/70 px-4 py-3 text-sm text-ink/60 ring-1 ring-ink/5">
      <strong>Note:</strong> The statistics in this case study are assumed and proportional for illustration. They do not represent real organisational data.
    </p>
  );
}

/* ================================================================== */
/* People                                                              */
/* ================================================================== */

type Person = { id: string; name: string; role: string; photo: string; age: number; place: string };

const people: Record<string, Person> = {
  rohan: { id: "rohan", name: "Rohan Mehta", role: "Stock manager", photo: imgRohan, age: 27, place: "Pune" },
  kavita: { id: "kavita", name: "Kavita Rao", role: "Restaurant owner", photo: imgKavita, age: 45, place: "Bengaluru" },
  imran: { id: "imran", name: "Imran Shaikh", role: "Head chef", photo: imgImran, age: 38, place: "Pune" },
};

function Face({ id, size = 40, className = "" }: { id: string; size?: number; className?: string }) {
  const p = people[id];
  return <img src={p.photo} alt={p.name} className={`shrink-0 rounded-full object-cover ${className}`} style={{ width: size, height: size }} />;
}

/* ================================================================== */
/* Chapter 01 · Summary                                                */
/* ================================================================== */

function AtAGlance() {
  return (
    <div className="grid gap-3 md:grid-cols-4 md:grid-rows-[auto_auto]">
      <div className="rounded-xl bg-ink p-6 text-white md:col-span-2 md:row-span-2">
        <Label><span className="text-white/50">The brief</span></Label>
        <p className="mt-3 text-xl font-semibold leading-snug">
          Turn the stock manager's two-hour nightly count into a few minutes of checking, using data the restaurant already has: its bills.
        </p>
        <div className="mt-6 flex items-center gap-4 border-t border-white/15 pt-5">
          <img src={sumansahuImage} alt="Suman Sahu" className="size-14 rounded-full border-2 border-white/30 object-cover" />
          <div>
            <p className="font-semibold">Suman Sahu</p>
            <p className="text-sm text-white/60">Lead UX Designer · end-to-end owner of the experience</p>
          </div>
        </div>
      </div>
      {[
        { k: "Platform", v: "Click Bacon", s: "Restaurant operations, kitchen to table" },
        { k: "Timeline", v: "5 months", s: "Research → pilot → rollout" },
        { k: "Surfaces", v: "4", s: "Chef recipes · bill scan · verify · owner report" },
        { k: "Pilot", v: "64 outlets", s: "QSR, casual and fine dining" },
      ].map((c) => (
        <div key={c.k} className="rounded-xl border border-ink/10 bg-white p-5">
          <Label>{c.k}</Label>
          <p className="mt-2 text-2xl font-bold text-ink">{c.v}</p>
          <p className="text-xs text-ink/55">{c.s}</p>
        </div>
      ))}
    </div>
  );
}

const nightShift = [
  { t: "10:45 pm", img: imgRestaurantTable, title: "Last table leaves", text: "Billing closes. 412 bills sit in the POS, a record of exactly what the kitchen cooked tonight. Nobody looks at them again." },
  { t: "11:05 pm", img: imgKitchenFire, title: "Kitchen shuts down", text: "Imran's team cleans up. Half-used trays of gravy and dough go back into the walk-in, uncounted." },
  { t: "11:20 pm", img: imgProduceStock, title: "The count begins", text: "Rohan walks the storeroom with a clipboard and a phone torch: 180 items, shelf by shelf, many of which barely moved today." },
  { t: "1:05 am", img: imgRestaurantHall, title: "Numbers typed in", text: "Counts go into a spreadsheet. Twenty items don't match. Rohan guesses, saves and goes home. The owner will see one variance figure at month end." },
];

function NightShift() {
  return (
    <ol className="relative space-y-6 border-l-2 border-dashed border-brand/30 pl-6 md:pl-8">
      {nightShift.map((s) => (
        <li key={s.t} className="relative">
          <span className="absolute -left-[33px] top-1 flex size-4 items-center justify-center rounded-full bg-brand ring-4 ring-canvas md:-left-[41px]" />
          <div className="grid gap-4 md:grid-cols-[180px_1fr] md:items-center">
            <img src={s.img} alt="" className="h-28 w-full rounded-lg object-cover md:h-24" />
            <div>
              <p className="text-sm font-bold text-brand">{s.t}</p>
              <p className="text-lg font-semibold text-ink">{s.title}</p>
              <p className="text-sm leading-relaxed text-ink/70">{s.text}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function TwoReceipts() {
  return (
    <div className="grid items-start gap-6 md:grid-cols-2">
      <div className="space-y-2">
        <Label>Before · one night's stock</Label>
        <Receipt className="-rotate-1 drop-shadow-md">
          <p className="text-center text-xs font-bold tracking-[0.2em]">STOREROOM · NIGHT SHIFT</p>
          <p className="mb-3 text-center text-[11px] opacity-60">Tue · 180 items · 1 person</p>
          <div className="space-y-1.5">
            <Leader label="Count every shelf" value="55 min" />
            <Leader label="Write it down" value="15 min" />
            <Leader label="Type into Excel" value="30 min" />
            <Leader label="Chase mismatches" value="20 min" />
          </div>
          <div className="my-3 border-t-2 border-dashed border-ink/20" />
          <Leader label="TOTAL" value="120 min" strong />
          <Leader label="Items wrong (blind recount)" value="14%" muted />
          <Leader label="Variance explained" value="0%" muted />
          <p className="mt-4 text-center text-[11px] opacity-60">*** home at 1:05 am ***</p>
        </Receipt>
      </div>
      <div className="space-y-2">
        <Label>After · with the stock agent</Label>
        <Receipt tone="dark" className="rotate-1 drop-shadow-xl">
          <p className="text-center text-xs font-bold tracking-[0.2em] text-lime">STOREROOM · NIGHT SHIFT</p>
          <p className="mb-3 text-center text-[11px] text-white/60">Tue · 180 items · 1 person</p>
          <div className="space-y-1.5">
            <Leader label="Estimate from 412 bills" value="auto" />
            <Leader label="Check 8 flagged items" value="11 min" />
            <Leader label="Confirm the other 172" value="1 tap" />
            <Leader label="Tag causes of gaps" value="4 min" />
          </div>
          <div className="my-3 border-t-2 border-dashed border-white/25" />
          <Leader label="TOTAL" value={<span className="text-lime">15 min</span>} strong />
          <Leader label="Estimate accuracy" value="93%" muted />
          <Leader label="Variance explained" value="100% tagged" muted />
          <p className="mt-4 text-center text-[11px] text-white/60">*** home by 11:40 pm ***</p>
        </Receipt>
      </div>
    </div>
  );
}

function KpiStrip() {
  const kpis = [
    { v: "−88%", l: "nightly stock time", s: "120 → 15 min" },
    { v: "93%", l: "estimate accuracy", s: "within ±5% of a blind count" },
    { v: "9% → 4%", l: "unexplained variance", s: "of monthly food cost" },
    { v: "11 → 3", l: "stock-outs a month", s: "dishes run out mid-service" },
  ];
  return (
    <div className="grid grid-cols-2 divide-ink/10 border-y-2 border-ink md:grid-cols-4 md:divide-x">
      {kpis.map((k) => (
        <div key={k.l} className="p-4 md:p-5">
          <p className="text-3xl font-bold text-brand">{k.v}</p>
          <p className="mt-1 text-sm font-semibold text-ink">{k.l}</p>
          <p className="text-[11px] text-ink/50">{k.s}</p>
        </div>
      ))}
    </div>
  );
}

type Outcome = { title: string; text: string; image?: string; imageAlt?: string };

const coreOutcomes: Outcome[] = [
  { title: "Verify, don't count", text: "The nightly count became a short check of the few items that look unusual." },
  { title: "Variance you can explain", text: "Owners see where stock went, dish by dish and cause by cause." },
  { title: "Paper bills included", text: "Outlets still billing by hand scan their bills and get the same report." },
];

function CoreOutcomes() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {coreOutcomes.map((o, i) => (
        <figure key={o.title} className="bg-white p-3 pb-5 shadow-[0_8px_20px_rgba(24,3,59,0.1)]" style={{ transform: `rotate(${[-1.2, 0.8, -0.6][i]}deg)` }}>
          {o.image ? (
            <img src={o.image} alt={o.imageAlt ?? o.title} className="aspect-[4/3] w-full object-cover" />
          ) : (
            <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-canvas text-ink/35">
              <FontAwesomeIcon icon={faChartLine} className="size-6" />
              <span className="text-[11px]">analytics screenshot coming soon</span>
            </div>
          )}
          <figcaption className="px-1 pt-4">
            <p className="font-semibold text-ink">{o.title}</p>
            <p className="mt-1 text-sm text-ink/65">{o.text}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/* ================================================================== */
/* Chapter 02 · Business                                               */
/* ================================================================== */

function FollowTheMoney() {
  // a typical outlet: ₹40L monthly revenue, food cost 34% (target 30%)
  return (
    <Panel className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold text-ink">A typical outlet, one month</h3>
        <span className="text-xs text-ink/50">revenue ₹40 L · food purchases ₹13.6 L</span>
      </div>
      <div className="space-y-2">
        <Label>Revenue</Label>
        <div className="flex h-12 overflow-hidden rounded-md text-xs font-semibold text-white">
          <div className="flex items-center justify-center bg-brand-800" style={{ width: "30%" }}>Food cost target 30%</div>
          <div className="flex items-center justify-center bg-red-500" style={{ width: "4%" }} title="4 pts over target" />
          <div className="flex items-center justify-center bg-lilac-100 text-ink/70" style={{ width: "66%" }}>Labour, rent, overheads & profit</div>
        </div>
        <p className="text-sm text-ink/70"><span className="font-semibold text-red-600">+4 pts</span> over the food-cost target: about <strong>₹1.6 L a month</strong> straight off the margin.</p>
      </div>
      <div className="space-y-2">
        <Label>Inside food cost</Label>
        <div className="flex h-12 overflow-hidden rounded-md text-xs font-semibold">
          <div className="flex items-center justify-center bg-lilac text-white" style={{ width: "91%" }}>Explained by sales × recipes</div>
          <div className="flex items-center justify-center bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_6px,#f87171_6px,#f87171_12px)] text-white" style={{ width: "9%" }}>9%</div>
        </div>
        <p className="text-sm text-ink/70"><Hl>9% of food cost (≈ ₹1.2 L) couldn't be traced</Hl> to any sale. Nobody knew if it was wastage, portioning or theft.</p>
      </div>
    </Panel>
  );
}

const leakCauses = [
  { label: "Over-portioning", pct: 38, color: C.brand800 },
  { label: "Spoilage & wastage", pct: 27, color: C.brand },
  { label: "Data & counting errors", pct: 12, color: C.lilac },
  { label: "Unrecorded staff meals", pct: 15, color: C.lilac300 },
  { label: "Missing / theft", pct: 8, color: C.tomato },
];

function LeakDonut() {
  const r = 70;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="grid items-center gap-8 md:grid-cols-[240px_1fr]">
      <div className="relative mx-auto size-60">
        <svg viewBox="0 0 200 200" className="size-full -rotate-90">
          {leakCauses.map((s) => {
            const len = (s.pct / 100) * c;
            const el = <circle key={s.label} cx="100" cy="100" r={r} fill="none" stroke={s.color} strokeWidth="34" strokeDasharray={`${len - 2} ${c - len + 2}`} strokeDashoffset={-acc} />;
            acc += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-3xl font-bold text-ink">9%</p>
          <p className="text-[10px] text-ink/50">untraced food cost</p>
        </div>
      </div>
      <div className="space-y-3">
        {leakCauses.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="size-3 shrink-0 rounded-sm" style={{ background: s.color }} />
            <span className="flex-1 text-sm text-ink/80">{s.label}</span>
            <span className="text-sm font-bold text-ink">{s.pct}%</span>
          </div>
        ))}
        <p className="pt-2 text-xs text-ink/50">Causes found later, once pilot managers began tagging every gap. Before the project, all of this was one number.</p>
      </div>
    </div>
  );
}

const okrs = [
  {
    o: "Give stock managers their evenings back",
    krs: [
      { kr: "Nightly stock time from 120 to under 30 min", got: "15 min" },
      { kr: "72% of outlets verify every night", got: "72%" },
    ],
  },
  {
    o: "Make stock numbers trustworthy",
    krs: [
      { kr: "90% of items within ±5% of a blind count", got: "93%" },
      { kr: "Recipes confirmed for 80% of top dishes", got: "85%" },
    ],
  },
  {
    o: "Protect the owner's margin",
    krs: [
      { kr: "Unexplained variance from 9% to 5% of food cost", got: "4%" },
      { kr: "Stock-outs from 11 to 5 a month", got: "3" },
    ],
  },
];

function Okrs() {
  return (
    <div className="space-y-4">
      {okrs.map((o, i) => (
        <div key={o.o} className="grid overflow-hidden rounded-xl border border-ink/10 bg-white md:grid-cols-[260px_1fr]">
          <div className="bg-brand/5 p-5">
            <p className="text-xs font-semibold text-brand">OBJECTIVE {i + 1}</p>
            <p className="mt-1 text-lg font-semibold leading-snug text-ink">{o.o}</p>
          </div>
          <ul className="divide-y divide-ink/5">
            {o.krs.map((k, j) => (
              <li key={k.kr} className="flex items-center gap-4 px-5 py-4">
                <span className="text-xs text-ink/40">KR{i + 1}.{j + 1}</span>
                <span className="flex-1 text-sm text-ink/80">{k.kr}</span>
                <span className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                  <FontAwesomeIcon icon={faCheck} className="size-3" /> {k.got}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/* Chapter 03 · People                                                 */
/* ================================================================== */

function BuyerVsUser() {
  return (
    <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
      <div className="rounded-xl border-2 border-ink/10 bg-white p-6">
        <div className="flex items-center gap-3">
          <Face id="kavita" size={52} />
          <div>
            <Label>Who buys</Label>
            <p className="text-lg font-bold text-ink">The restaurant</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5 text-sm text-ink/75">
          <li>• Judges the product on food cost and margin</li>
          <li>• Wants accountability without micromanaging</li>
          <li>• Opens a dashboard once a day, at most</li>
        </ul>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 md:flex-col">
        <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-semibold text-white">tension</span>
        <p className="max-w-[160px] text-center text-xs text-ink/60">If the stock manager doesn't adopt it nightly, the owner never sees the value.</p>
      </div>
      <div className="rounded-xl border-2 border-brand bg-brand/5 p-6">
        <div className="flex items-center gap-3">
          <Face id="rohan" size={52} />
          <div>
            <Label>Who uses it every night</Label>
            <p className="text-lg font-bold text-ink">The stock manager</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5 text-sm text-ink/75">
          <li>• Judges the product on time saved and blame avoided</li>
          <li>• Works in a dim storeroom with weak signal</li>
          <li>• Uses it every night, usually tired</li>
        </ul>
      </div>
    </div>
  );
}

function EmpathyMap() {
  const q = [
    { k: "Says", tone: "bg-[#ece0ff]", items: ["\"Give me ten minutes, I'm still counting.\"", "\"The numbers were fine when I left.\""] },
    { k: "Thinks", tone: "bg-[#fff6a8]", items: ["Did I count the back shelf already?", "If it doesn't match, it's on me."] },
    { k: "Does", tone: "bg-[#d8f7e8]", items: ["Counts 180 items by torchlight after service", "Rounds odd numbers to make totals look right"] },
    { k: "Feels", tone: "bg-[#ffe1cc]", items: ["Exhausted: starts counting at 11:20 pm", "Anxious when the owner asks about variance"] },
  ];
  return (
    <div className="relative grid gap-3 md:grid-cols-2">
      <div className="flex items-center gap-3 md:hidden">
        <Face id="rohan" size={56} />
        <div>
          <p className="font-bold text-ink">Rohan, 27</p>
          <p className="text-xs text-ink/55">Stock manager · primary user</p>
        </div>
      </div>
      {q.map((x, i) => (
        <div key={x.k} className={`${x.tone} min-h-[150px] rounded-xl p-5 ${i % 2 === 0 ? "md:pr-24" : "md:pl-24"}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">{x.k}</p>
          <ul className="mt-2 space-y-2">
            {x.items.map((i) => (
              <li key={i} className="text-sm leading-snug text-ink/85">{i}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl bg-white p-3 shadow-xl md:flex">
        <Face id="rohan" size={88} />
        <p className="mt-2 text-sm font-bold text-ink">Rohan, 27</p>
        <p className="text-[11px] text-ink/55">Stock manager · primary user</p>
      </div>
    </div>
  );
}

function IdBadge({ id, archetype, need, quote, color }: { id: string; archetype: string; need: string; quote: string; color: string }) {
  const p = people[id];
  return (
    <div className="relative pt-6">
      <div className="absolute left-1/2 top-0 h-7 w-3 -translate-x-1/2 rounded-sm" style={{ background: color }} />
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-ink/5">
        <div className="h-3" style={{ background: color }} />
        <div className="flex gap-4 p-5">
          <img src={p.photo} alt={p.name} className="h-24 w-20 shrink-0 rounded-md object-cover" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color }}>{archetype}</p>
            <p className="text-lg font-bold text-ink">{p.name}</p>
            <p className="text-xs text-ink/55">{p.role} · {p.age} · {p.place}</p>
            <p className="mt-2 text-sm text-ink/80"><span className="font-semibold">Needs:</span> {need}</p>
          </div>
        </div>
        <p className="border-t border-dashed border-ink/15 px-5 py-3 text-sm italic text-ink/70">"{quote}"</p>
      </div>
    </div>
  );
}

const jobMap = [
  { step: "Define", job: "Know what to count tonight", pain: 2, note: "Everything, always" },
  { step: "Locate", job: "Gather sales, deliveries, waste", pain: 3, note: "Three places, one on paper" },
  { step: "Prepare", job: "Get the storeroom ready", pain: 1, note: "Wait for the kitchen" },
  { step: "Confirm", job: "Check counts make sense", pain: 3, note: "No expected number to compare" },
  { step: "Execute", job: "Count and record", pain: 3, note: "55 min count + 45 min typing" },
  { step: "Monitor", job: "Spot gaps and shortages", pain: 3, note: "Found at month end" },
  { step: "Modify", job: "Fix mistakes", pain: 2, note: "Guess, round, move on" },
  { step: "Conclude", job: "Report and reorder", pain: 2, note: "Reorder from memory" },
];

function JobMap() {
  const tone = (p: number) => (p === 3 ? "bg-red-500" : p === 2 ? "bg-amber-400" : "bg-emerald-400");
  return (
    <div className="overflow-x-auto">
      <div className="grid min-w-[760px] grid-cols-8 gap-1">
        {jobMap.map((j, i) => (
          <div key={j.step} className="flex flex-col">
            <div className="relative bg-ink py-2 pl-3 pr-4 text-white" style={{ clipPath: i === jobMap.length - 1 ? undefined : "polygon(0 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 0 100%)" }}>
              <p className="text-[10px] text-white/50">0{i + 1}</p>
              <p className="text-sm font-bold">{j.step}</p>
            </div>
            <div className="flex flex-1 flex-col gap-2 border-x border-b border-ink/10 bg-white p-3">
              <p className="text-xs font-semibold leading-snug text-ink">{j.job}</p>
              <p className="text-[11px] leading-snug text-ink/55">{j.note}</p>
              <div className="mt-auto flex gap-1 pt-2" aria-label={`Pain ${j.pain} of 3`}>
                {[1, 2, 3].map((n) => (
                  <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= j.pain ? tone(j.pain) : "bg-ink/10"}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11px] text-ink/50">Universal job map for "close tonight's stock". Bars show pain observed at each step (1–3).</p>
    </div>
  );
}

const blueprintStages = ["Service ends", "Count", "Record", "Reconcile", "Reorder"];
const blueprintRows: { lane: string; tone: string; cells: string[]; fail?: number[] }[] = [
  { lane: "Kitchen & floor", tone: "bg-white", cells: ["Last bills printed; prep returned to walk-in", "Kitchen cleans up", "—", "Chef asked why stock is short", "Chef shouts tomorrow's needs"] },
  { lane: "Stock manager (frontstage)", tone: "bg-brand/5", cells: ["Waits for kitchen to close", "Counts 180 items by torch", "Types counts into Excel", "Explains mismatches by guessing", "Calls suppliers from memory"], fail: [1, 3, 4] },
  { lane: "Owner (backstage)", tone: "bg-white", cells: ["Checks the day's sales", "—", "Waits for the report", "Sees one variance figure, month end", "Approves orders blind"], fail: [3] },
  { lane: "Systems", tone: "bg-canvas", cells: ["POS has every bill", "No expected stock", "Spreadsheet, no link to POS", "No recipes for 69% of dishes", "No par levels"], fail: [2, 3] },
];

function ServiceBlueprint() {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10">
      <div className="min-w-[820px]">
        <div className="grid grid-cols-[150px_repeat(5,1fr)] bg-ink text-white">
          <div className="p-3 text-[11px] uppercase tracking-[0.16em] text-white/50">Lane / stage</div>
          {blueprintStages.map((s, i) => (
            <div key={s} className="border-l border-white/10 p-3">
              <p className="text-[10px] text-white/50">0{i + 1}</p>
              <p className="text-sm font-semibold">{s}</p>
            </div>
          ))}
        </div>
        {blueprintRows.map((r, ri) => (
          <div key={r.lane}>
            {ri === 2 && <div className="border-t-2 border-dashed border-brand/40 bg-white px-3 py-0.5 text-[10px] text-brand">line of visibility</div>}
            <div className={`grid grid-cols-[150px_repeat(5,1fr)] border-t border-ink/10 ${r.tone}`}>
              <div className="p-3 text-xs font-semibold text-ink">{r.lane}</div>
              {r.cells.map((c, i) => (
                <div key={i} className={`relative border-l border-ink/10 p-3 text-xs leading-snug text-ink/75 ${r.fail?.includes(i) ? "pr-8" : ""}`}>
                  {c}
                  {r.fail?.includes(i) && (
                    <span className="absolute right-1.5 top-1.5 flex size-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white" title="Fail point">⚡</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const hypotheses = [
  { believe: "stock managers will stop counting everything", ifWe: "estimate closing stock from bills and recipes, and ask them to check only exceptions", know: "nightly stock time falls under 30 minutes with no loss of accuracy" },
  { believe: "chefs will record recipes", ifWe: "draft each recipe for them and ask only for gram adjustments", know: "80% of top dishes have confirmed recipes within two weeks" },
  { believe: "owners will act on variance", ifWe: "break it down by dish and tagged cause instead of one number", know: "unexplained variance falls below 5% of food cost" },
];

function Hypotheses() {
  return (
    <div className="space-y-3">
      {hypotheses.map((h, i) => (
        <div key={i} className="grid gap-px overflow-hidden rounded-xl bg-ink/10 md:grid-cols-3">
          {[
            { k: "We believe", v: h.believe },
            { k: "If we", v: h.ifWe },
            { k: "We'll know when", v: h.know },
          ].map((c, j) => (
            <div key={c.k} className={`p-5 ${j === 2 ? "bg-brand text-white" : "bg-white"}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${j === 2 ? "text-white/60" : "text-brand"}`}>H{i + 1} · {c.k}</p>
              <p className={`mt-2 text-sm leading-snug ${j === 2 ? "font-semibold" : "text-ink/85"}`}>{c.v}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/* Chapter 04 · Research                                               */
/* ================================================================== */

const researchPlan = [
  { w: "Wk 1", icon: faComments, title: "Stakeholder interviews", text: "Product, sales and support on what restaurants ask for" },
  { w: "Wk 2–3", icon: faEye, title: "Closing-shift shadowing", text: "40 counts timed end to end across 14 outlets" },
  { w: "Wk 3", icon: faClipboardCheck, title: "Blind re-counts", text: "Re-counted 600 items the next morning to measure accuracy" },
  { w: "Wk 4", icon: faReceipt, title: "Bill & recipe audit", text: "Matched 9,000 bills against recorded recipes" },
  { w: "Wk 4", icon: faUsers, title: "Survey", text: "212 stock managers on effort, trust and tools" },
  { w: "Wk 5", icon: faLayerGroup, title: "Synthesis", text: "Affinity map, job map and service blueprint" },
];

function ResearchPlan() {
  return (
    <div className="overflow-x-auto">
      <ol className="flex min-w-[760px] gap-0">
        {researchPlan.map((r, i) => (
          <li key={r.title} className="relative flex-1 pr-3">
            <div className="flex items-center">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-white text-brand">
                <FontAwesomeIcon icon={r.icon} className="size-4" />
              </span>
              {i < researchPlan.length - 1 && <span className="h-0.5 flex-1 bg-brand/25" />}
            </div>
            <p className="mt-3 text-[11px] font-semibold text-brand">{r.w}</p>
            <p className="text-sm font-semibold text-ink">{r.title}</p>
            <p className="text-xs leading-snug text-ink/60">{r.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Headlines() {
  const items = [
    { big: "55 of 120", small: "minutes were actual counting", text: "The rest was writing, typing and chasing mismatches: work sales data could do." },
    { big: "14%", small: "of counted items were wrong", text: "Blind re-counts the next morning disagreed with the night count." },
    { big: "31%", small: "of dishes had a recipe", text: "Without grams per dish, expected use couldn't be calculated." },
    { big: "38%", small: "of outlets billed on paper", text: "At least one counter wrote bills by hand during rush hour." },
  ];
  return (
    <div className="grid gap-px overflow-hidden rounded-xl bg-ink md:grid-cols-2">
      {items.map((h) => (
        <div key={h.big} className="bg-white p-6">
          <p className="text-4xl font-bold tracking-tight text-ink">{h.big}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{h.small}</p>
          <p className="mt-3 text-sm text-ink/70">{h.text}</p>
        </div>
      ))}
    </div>
  );
}

const mismatch = [
  { cat: "Fresh produce", v: 24 },
  { cat: "Dairy", v: 19 },
  { cat: "Meat & poultry", v: 13 },
  { cat: "Prep (gravies, dough)", v: 21 },
  { cat: "Dry goods", v: 6 },
  { cat: "Beverages", v: 3 },
];

function MismatchLollipop() {
  return (
    <Panel className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-ink">Where night counts went wrong</h3>
        <span className="text-xs text-ink/50">% of items off by more than 5% · 600 re-counted</span>
      </div>
      {mismatch.map((m) => (
        <div key={m.cat} className="grid grid-cols-[140px_1fr_40px] items-center gap-3 sm:grid-cols-[170px_1fr_40px]">
          <span className="text-sm text-ink/75">{m.cat}</span>
          <div className="relative h-4">
            <span className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink/20" style={{ width: `${(m.v / 25) * 100}%` }} />
            <span className={`absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ${m.v >= 15 ? "bg-red-500" : "bg-brand"}`} style={{ left: `${(m.v / 25) * 100}%` }} />
          </div>
          <span className="text-sm font-bold text-ink">{m.v}%</span>
        </div>
      ))}
      <p className="text-sm text-ink/65">Fast-moving and half-used items failed most. These became the items the agent always asks a human to check.</p>
    </Panel>
  );
}

function RecipeWaffle() {
  return (
    <div className="grid items-center gap-6 md:grid-cols-[auto_1fr]">
      <div className="grid w-[220px] grid-cols-10 gap-1" role="img" aria-label="31 of 100 dishes had a recipe">
        {Array.from({ length: 100 }, (_, i) => (
          <span key={i} className={`aspect-square rounded-[3px] ${i < 31 ? "bg-brand" : "bg-ink/10"}`} />
        ))}
      </div>
      <div className="space-y-3">
        <p className="text-5xl font-bold text-ink">31<span className="text-2xl text-ink/40"> / 100</span></p>
        <p className="text-sm text-ink/70">dishes had a recorded recipe. An estimate built on the other 69 would be confidently wrong, so recipes had to become part of the product, not a pre-requisite.</p>
        <ul className="space-y-1.5 text-sm text-ink/80">
          <li className="flex gap-2"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 text-brand" />Draft recipes from the dish name and cuisine</li>
          <li className="flex gap-2"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 text-brand" />Start with the 20 dishes that drive 80% of usage</li>
          <li className="flex gap-2"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 text-brand" />Flag every estimate that rests on an unconfirmed recipe</li>
        </ul>
      </div>
    </div>
  );
}

const positioning = [
  { name: "Paper register", x: 12, y: 18, us: false },
  { name: "Spreadsheets", x: 22, y: 30, us: false },
  { name: "Supy", x: 40, y: 55, us: false },
  { name: "MarketMan", x: 55, y: 62, us: false },
  { name: "Petpooja Inventory", x: 70, y: 40, us: false },
  { name: "Click Bacon agent", x: 84, y: 84, us: true },
];

function PositioningMap() {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_260px]">
      <div className="relative aspect-square max-h-[420px] w-full rounded-xl border border-ink/10 bg-white">
        <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-ink/15" />
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-ink/15" />
        <div className="absolute right-0 top-0 h-1/2 w-1/2 bg-brand/[0.04]" />
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-ink/50">less manual effort →</span>
        <span className="absolute left-2 top-1/2 origin-left -translate-y-1/2 -rotate-90 translate-x-3 text-[10px] text-ink/50">more trustworthy →</span>
        <span className="absolute right-3 top-3 text-[10px] font-semibold text-brand">where restaurants need to be</span>
        {positioning.map((p) => (
          <div key={p.name} className="absolute -translate-x-1/2 translate-y-1/2" style={{ left: `${p.x}%`, bottom: `${p.y}%` }}>
            <span className={`block rounded-full ${p.us ? "size-5 bg-brand ring-4 ring-brand/25" : "size-3.5 bg-ink/50"}`} />
            <span className={`absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[11px] ${p.us ? "font-bold text-brand" : "text-ink/65"}`}>{p.name}</span>
          </div>
        ))}
      </div>
      <div className="space-y-4 text-sm text-ink/75">
        <p><span className="font-semibold text-ink">Inventory tools</span> calculate stock from sales but still expect a full count to trust it.</p>
        <p><span className="font-semibold text-ink">Manual methods</span> are familiar but slow and disconnected from sales.</p>
        <p><span className="font-semibold text-ink">The gap:</span> <Hl>less effort and more trust at the same time</Hl>, by asking a human to verify only what the data can't vouch for.</p>
        <p className="text-[11px] text-ink/45">Positions are a qualitative read from public product information and our own trials.</p>
      </div>
    </div>
  );
}

const ideas = [
  { name: "Exception-only verify", impact: 92, effort: 45 },
  { name: "Bills → recipe estimate", impact: 88, effort: 70 },
  { name: "AI recipe drafts", impact: 78, effort: 35 },
  { name: "Paper bill scanning", impact: 62, effort: 60 },
  { name: "Variance by cause", impact: 70, effort: 25 },
  { name: "Suggested orders", impact: 48, effort: 30 },
  { name: "Barcode counting app", impact: 30, effort: 55 },
  { name: "Weight-scale sensors", impact: 55, effort: 92 },
];

function Prioritisation() {
  return (
    <div className="relative aspect-[4/3] max-h-[440px] w-full rounded-xl border border-ink/10 bg-white">
      {[
        { l: "Quick wins", c: "left-3 top-3" },
        { l: "Big bets", c: "right-3 top-3" },
        { l: "Fill-ins", c: "left-3 bottom-7" },
        { l: "Avoid", c: "right-3 bottom-7" },
      ].map((q) => (
        <span key={q.l} className={`absolute ${q.c} text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35`}>{q.l}</span>
      ))}
      <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-ink/15" />
      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-ink/15" />
      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] text-ink/50">effort →</span>
      {ideas.map((d) => {
        const shipped = d.impact >= 60;
        return (
          <div key={d.name} className="absolute -translate-x-1/2 translate-y-1/2" style={{ left: `${d.effort}%`, bottom: `${d.impact * 0.88 + 4}%` }}>
            <span className={`block size-3.5 rounded-full ${shipped ? "bg-brand" : "border-2 border-ink/30 bg-white"}`} />
            <span className={`absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap text-[11px] ${shipped ? "font-semibold text-ink" : "text-ink/45 line-through"}`}>{d.name}</span>
          </div>
        );
      })}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-ink/50">impact →</span>
    </div>
  );
}

const hmwNotes = [
  { q: "…give stock managers tonight's closing stock without counting every shelf?", tone: "yellow" as const, r: -2 },
  { q: "…help chefs record recipes without it feeling like paperwork?", tone: "lilac" as const, r: 1.5 },
  { q: "…make an estimate trustworthy enough to replace a count?", tone: "mint" as const, r: -1 },
  { q: "…bring paper bills into the same report as the POS?", tone: "peach" as const, r: 2 },
  { q: "…explain variance in terms an owner can act on?", tone: "yellow" as const, r: 1 },
  { q: "…warn the kitchen before a dish runs out mid-service?", tone: "lilac" as const, r: -1.5 },
];

function HmwWall() {
  return (
    <div className="rounded-xl bg-[#e8dfd3] p-6 shadow-inner">
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {hmwNotes.map((n) => (
          <Sticky key={n.q} tone={n.tone} rotate={n.r}>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/50">How might we</span>
            <p className="mt-1 font-medium">{n.q}</p>
          </Sticky>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Chapter 05 · Design process                                         */
/* ================================================================== */

function Principles() {
  const rules = [
    { n: "01", t: "Verify, don't count", d: "The estimate is the default. People step in only where the agent is unsure." },
    { n: "02", t: "Show the working", d: "Every number traces back to the bills and recipes behind it." },
    { n: "03", t: "The chef owns the recipe", d: "The agent drafts; the kitchen decides. Nothing changes a recipe silently." },
    { n: "04", t: "Never a blame tool", d: "Gaps are tagged by cause, not by person. Trust in the team comes first." },
  ];
  return (
    <ol className="divide-y divide-ink/10 border-y-2 border-ink">
      {rules.map((r) => (
        <li key={r.n} className="grid gap-2 py-5 md:grid-cols-[80px_260px_1fr] md:items-baseline">
          <span className="text-sm font-bold text-brand">{r.n}</span>
          <span className="text-xl font-bold text-ink">{r.t}</span>
          <span className="text-sm text-ink/70">{r.d}</span>
        </li>
      ))}
    </ol>
  );
}

function DataModel() {
  const nodes = [
    { icon: faReceipt, t: "Receipt", s: "POS or scanned bill", ex: "Bill #4471" },
    { icon: faKitchenSet, t: "Dish", s: "Line item × quantity", ex: "Paneer butter masala × 2" },
    { icon: faBookOpen, t: "Recipe", s: "Ingredients per portion", ex: "Paneer 120 g, butter 15 g…" },
    { icon: faBoxesStacked, t: "Ingredient", s: "Stock item + unit", ex: "Paneer · kg" },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {nodes.map((n, i) => (
          <div key={n.t} className="flex flex-1 flex-col items-stretch gap-2 md:flex-row md:items-center">
            <div className="flex-1 rounded-lg border-2 border-ink bg-white p-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={n.icon} className="size-4 text-brand" />
                <p className="font-bold text-ink">{n.t}</p>
              </div>
              <p className="mt-1 text-xs text-ink/55">{n.s}</p>
              <p className="mt-2 rounded bg-canvas px-2 py-1 text-[11px] text-ink/70">{n.ex}</p>
            </div>
            {i < nodes.length - 1 && (
              <span className="self-center text-xs font-bold text-brand md:px-1">
                <span className="hidden md:inline">1:n →</span>
                <span className="md:hidden">↓ 1:n</span>
              </span>
            )}
          </div>
        ))}
      </div>
      <Receipt tone="dark">
        <Label><span className="text-white/50">The stock equation, per ingredient</span></Label>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-base md:text-lg">
          {[
            { t: "Opening stock", c: "text-white" },
            { t: "+", c: "text-white/40" },
            { t: "Deliveries", c: "text-white" },
            { t: "−", c: "text-white/40" },
            { t: "Σ (dishes sold × recipe)", c: "text-lime" },
            { t: "−", c: "text-white/40" },
            { t: "Logged waste", c: "text-white" },
            { t: "=", c: "text-white/40" },
            { t: "Expected closing", c: "rounded bg-white px-2 text-ink" },
          ].map((x, i) => (
            <span key={i} className={`font-bold ${x.c}`}>{x.t}</span>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/60">Expected closing vs a verified count gives the variance, and every gap gets a cause.</p>
      </Receipt>
    </div>
  );
}

function FlagLogic() {
  const rules = [
    { q: "Is its recipe confirmed by the chef?", no: "Flag: estimate rests on a guess" },
    { q: "Did it move within its usual range today?", no: "Flag: unusual movement" },
    { q: "Is it perishable or prep (gravy, dough)?", yes: "Flag: high error category" },
    { q: "Is it below par for tomorrow?", yes: "Flag: low stock, reorder" },
  ];
  return (
    <div className="space-y-2">
      <div className="mx-auto w-fit rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-white">For each of 180 items</div>
      {rules.map((r, i) => (
        <div key={r.q} className="grid items-center gap-2 md:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm font-medium text-ink">
            <span className="mr-2 text-xs text-brand">Q{i + 1}</span>{r.q}
          </div>
          <span className="justify-self-center text-[11px] font-bold text-red-500">{r.no ? "NO →" : "YES →"}</span>
          <div className="rounded-lg border-2 border-dashed border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">{r.no ?? r.yes}</div>
        </div>
      ))}
      <div className="mx-auto mt-3 w-fit rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
        Otherwise → confirmed in one tap · typically 172 of 180 items
      </div>
    </div>
  );
}

function MiniPhone({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[150px] rounded-[18px] border-[5px] border-ink bg-white p-2">
      <div className="h-[240px] space-y-1.5 overflow-hidden">{children}</div>
    </div>
  );
}

function Iterations() {
  const v = [
    {
      tag: "v1 · Full list",
      verdict: "Felt like counting again",
      learn: "Managers scrolled 180 rows and skimmed past problems.",
      screen: (
        <>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="flex justify-between rounded bg-canvas px-1.5 py-1 text-[8px] text-ink/60">
              <span className="h-1.5 w-12 rounded bg-ink/20" />
              <span className="h-1.5 w-6 rounded bg-ink/20" />
            </div>
          ))}
        </>
      ),
    },
    {
      tag: "v2 · Sorted by variance",
      verdict: "Better, but no reason why",
      learn: "Without the 'why', managers re-counted everything near the top.",
      screen: (
        <>
          {[0.9, 0.7, 0.5, 0.35, 0.2, 0.1, 0.05, 0.05].map((w, i) => (
            <div key={i} className="flex items-center gap-1 rounded bg-canvas px-1.5 py-1">
              <span className="h-1.5 w-10 rounded bg-ink/20" />
              <span className="h-1.5 rounded bg-red-400" style={{ width: `${w * 50}px` }} />
            </div>
          ))}
        </>
      ),
    },
    {
      tag: "v3 · Exceptions + reasons",
      verdict: "Shipped",
      learn: "8 flagged items, each with a reason, then 'confirm the rest'.",
      screen: (
        <>
          <p className="text-[8px] font-bold text-ink">Verify 8 of 180</p>
          {["Used faster than usual", "Recipe not confirmed", "Low for tomorrow"].map((r) => (
            <div key={r} className="rounded border border-amber-300 bg-white px-1.5 py-1">
              <span className="block h-1.5 w-10 rounded bg-ink/30" />
              <span className="text-[7px] text-amber-700">{r}</span>
            </div>
          ))}
          {[0, 1].map((i) => (
            <div key={i} className="rounded bg-emerald-50 px-1.5 py-1 text-[7px] text-emerald-700">✓ matches estimate</div>
          ))}
          <div className="mt-2 rounded bg-brand py-1 text-center text-[7px] font-bold text-white">Confirm the other 172</div>
        </>
      ),
    },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {v.map((x, i) => (
        <div key={x.tag} className="space-y-3">
          <MiniPhone>{x.screen}</MiniPhone>
          <div className="text-center">
            <p className="text-xs font-bold text-brand">{x.tag}</p>
            <p className={`text-sm font-semibold ${i === 2 ? "text-emerald-600" : "text-ink"}`}>{x.verdict}</p>
            <p className="mt-1 text-xs text-ink/60">{x.learn}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Decisions() {
  const d = [
    { chose: "A human check on exceptions", over: "Fully automatic stock deduction", why: "Owners stopped trusting unchecked numbers within two weeks of the first pilot." },
    { chose: "AI-drafted recipes the chef adjusts", over: "A recipe form to fill from scratch", why: "Recipe coverage rose from 31% to 85% of top dishes in the first week." },
    { chose: "Batch scanning at closing time", over: "Scanning each bill live", why: "Live scanning slowed counters at rush hour; batching took 4 minutes a night." },
    { chose: "Phone-first, offline-capable", over: "Desktop stock entry", why: "Storerooms had no desk and weak signal; phones were already in every pocket." },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {d.map((x) => (
        <div key={x.chose} className="rounded-xl border border-ink/10 bg-white p-5">
          <p className="flex items-start gap-2 font-semibold text-ink"><FontAwesomeIcon icon={faCircleCheck} className="mt-1 size-4 shrink-0 text-emerald-500" />{x.chose}</p>
          <p className="mt-1 flex items-start gap-2 text-sm text-ink/45 line-through"><FontAwesomeIcon icon={faXmark} className="mt-1 size-3.5 shrink-0" />{x.over}</p>
          <p className="mt-3 border-t border-dashed border-ink/15 pt-3 text-sm text-ink/70">{x.why}</p>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/* Chapter 06 · Solution: zig-zag walkthrough                           */
/* ================================================================== */

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[220px] rounded-[28px] bg-ink p-2 shadow-2xl">
      <div className="h-[400px] overflow-hidden rounded-[22px] bg-canvas">{children}</div>
    </div>
  );
}

function ScreenRecipe() {
  return (
    <Phone>
      <div className="space-y-2 p-3">
        <p className="text-[10px] text-ink/50">Kitchen · 5 dishes to review</p>
        <p className="text-sm font-bold text-ink">Paneer butter masala</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-lilac-100 px-2 py-0.5 text-[9px] font-semibold text-brand"><FontAwesomeIcon icon={faWandMagicSparkles} className="size-2.5" /> AI draft</span>
        {[
          ["Paneer", "120 g", true],
          ["Butter", "15 g", false],
          ["Tomato purée", "80 g", false],
          ["Cream", "20 ml", false],
          ["Spice mix", "6 g", false],
        ].map(([a, b, active]) => (
          <div key={String(a)} className="flex items-center justify-between rounded-lg bg-white px-2.5 py-2 text-[11px] shadow-sm">
            <span className="text-ink/80">{a}</span>
            <span className={`rounded px-1.5 font-semibold ${active ? "bg-brand text-white" : "text-ink"}`}>{b}</span>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-1.5 pt-1 text-center text-[10px] font-semibold">
          <span className="rounded-lg bg-ink/5 py-2 text-ink/70">🎤 Adjust</span>
          <span className="rounded-lg bg-brand py-2 text-white">Looks right</span>
        </div>
      </div>
    </Phone>
  );
}

function ScreenScan() {
  return (
    <Phone>
      <div className="relative h-full bg-ink">
        <p className="pt-4 text-center text-[10px] font-semibold text-white/80">Batch scan · 23 bills</p>
        <div className="absolute inset-x-5 top-10 rounded-lg bg-white p-2.5 shadow-lg">
          <p className="text-center text-[8px] font-bold text-ink">SPICE ROUTE · COUNTER 2</p>
          {["Veg biryani × 2", "Paneer tikka × 1", "Butter naan × 4", "Lassi × 2", "Raita × 2"].map((t, i) => (
            <div key={t} className={`mt-1 flex justify-between rounded px-1 py-0.5 text-[8px] ${i === 1 ? "bg-amber-100 ring-1 ring-amber-400" : ""}`}>
              <span className="text-ink/80">{t}</span>
              <span className={i === 1 ? "text-amber-600" : "text-emerald-600"}>{i === 1 ? "?" : "✓"}</span>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-3 top-8 h-[150px] rounded-xl border-2 border-dashed border-lime" />
        <div className="absolute inset-x-0 bottom-0 space-y-1.5 rounded-t-2xl bg-white p-3">
          <p className="text-[10px] font-semibold text-ink">22 read · 1 line needs a tap</p>
          <div className="h-1.5 rounded-full bg-lilac-100"><div className="h-full w-[95%] rounded-full bg-brand" /></div>
          <div className="rounded-lg bg-brand py-2 text-center text-[10px] font-semibold text-white">Add to tonight's stock</div>
        </div>
      </div>
    </Phone>
  );
}

function ScreenVerify() {
  return (
    <Phone>
      <div className="space-y-2 p-3">
        <p className="text-[10px] text-ink/50">Closing stock · Tue</p>
        <p className="text-sm font-bold text-ink">Verify 8 of 180</p>
        <div className="h-1.5 rounded-full bg-lilac-100"><div className="h-full w-3/8 rounded-full bg-brand" style={{ width: "37%" }} /></div>
        {[
          { i: "Butter", e: "0.8 kg", w: "Used faster than usual", s: "check" },
          { i: "Tomato", e: "6.5 kg", w: "Recipe not confirmed", s: "check" },
          { i: "Paneer", e: "3.2 kg", w: "Counted 3.0 · spill tagged", s: "done" },
        ].map((x) => (
          <div key={x.i} className={`rounded-lg bg-white p-2 shadow-sm ${x.s === "check" ? "ring-1 ring-amber-300" : ""}`}>
            <div className="flex justify-between text-[11px]"><span className="font-semibold text-ink">{x.i}</span><span className="text-ink/70">{x.e}</span></div>
            <p className={`text-[9px] ${x.s === "check" ? "text-amber-700" : "text-emerald-600"}`}>{x.w}</p>
          </div>
        ))}
        <div className="rounded-lg bg-canvas p-2 text-[9px] text-ink/70">Why butter? 120 naan × 8 g + 42 dishes × 15 g</div>
        <div className="rounded-lg bg-brand py-2 text-center text-[10px] font-semibold text-white">Confirm the other 172</div>
      </div>
    </Phone>
  );
}

function ScreenOwner() {
  return (
    <div className="mx-auto w-full max-w-[340px] rounded-xl border border-ink/10 bg-white p-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-ink">Variance this week</p>
        <span className="text-[11px] text-ink/50">Koramangala</span>
      </div>
      <p className="mt-1 text-3xl font-bold text-ink">₹18,400 <span className="text-sm font-medium text-emerald-600">↘ 41%</span></p>
      <div className="mt-3 space-y-2">
        {[
          { c: "Over-portioning · paneer", v: 42 },
          { c: "Spoilage · dairy", v: 26 },
          { c: "Staff meals (untagged)", v: 18 },
          { c: "Other", v: 14 },
        ].map((x) => (
          <div key={x.c}>
            <div className="flex justify-between text-[11px]"><span className="text-ink/75">{x.c}</span><span className="font-semibold text-ink">{x.v}%</span></div>
            <div className="mt-0.5 h-1.5 rounded-full bg-canvas"><div className="h-full rounded-full bg-brand" style={{ width: `${x.v}%` }} /></div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg bg-amber-50 p-2 text-[11px] text-amber-800">Paneer portions are 14% above recipe on weekends. Share with kitchen →</div>
    </div>
  );
}

const walkthrough = [
  { kicker: "Set up · Chef", title: "Recipes in minutes, not weeks", text: "The agent drafts each top dish from its name and cuisine. Imran only adjusts the grams, by tap or by voice, five dishes at a quiet hour.", points: ["Top 20 dishes first", "Hindi and English, voice input", "Prep items (gravies, dough) as their own recipes"], screen: <ScreenRecipe /> },
  { kicker: "Capture · Cashier", title: "Every bill counts, even paper ones", text: "POS bills flow in on their own. Counters still on paper scan the day's stack at closing; unclear lines are highlighted, never guessed.", points: ["Duplicates and voids caught", "Bill images kept for audits", "4 minutes for a typical day"], screen: <ScreenScan /> },
  { kicker: "Verify · Stock manager", title: "Check eight items, confirm the rest", text: "By the time service ends, expected stock is ready. Rohan checks only the flagged items, each with its reason, then confirms everything else in one tap.", points: ["Every estimate shows its working", "Gaps tagged by cause, not person", "Works offline in the storeroom"], screen: <ScreenVerify /> },
  { kicker: "Act · Owner", title: "Variance that names its cause", text: "Kavita sees variance by dish and tagged cause the same night, with a nudge she can pass straight to the kitchen.", points: ["Top three causes first", "Trend vs last week", "Low stock turns into a suggested order"], screen: <ScreenOwner /> },
];

function Walkthrough() {
  return (
    <div className="space-y-16">
      {walkthrough.map((w, i) => (
        <div key={w.title} className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
          <div className="rounded-2xl bg-gradient-to-br from-lilac-100/70 via-white to-white p-6">{w.screen}</div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Step {i + 1} · {w.kicker}</p>
            <h3 className="text-2xl font-bold leading-tight text-ink">{w.title}</h3>
            <Body>{w.text}</Body>
            <ul className="space-y-1.5 pt-1">
              {w.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-ink/80"><FontAwesomeIcon icon={faCheck} className="mt-1 size-3 text-brand" />{p}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function NotABlameTool() {
  return (
    <div className="grid gap-6 rounded-2xl bg-ink p-6 text-white md:grid-cols-[auto_1fr] md:p-8">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-lime"><FontAwesomeIcon icon={faShieldHalved} className="size-7" /></span>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Designed not to point fingers</h3>
        <p className="text-white/75">Stock numbers decide who gets blamed. Early concepts that showed "who counted what" made managers round numbers to protect themselves, which made the data worse.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { t: "Causes, not culprits", d: "Gaps are tagged spill, waste, portioning or staff meal; never a name." },
            { t: "Corrections are welcome", d: "Every correction improves tomorrow's estimate, and the UI says so." },
            { t: "Owners see patterns", d: "Reports show trends by dish and cause, not by person." },
          ].map((x) => (
            <div key={x.t} className="rounded-xl bg-white/5 p-4">
              <p className="font-semibold text-lime">{x.t}</p>
              <p className="mt-1 text-sm text-white/70">{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const edgeCases = [
  { icon: faBookOpen, t: "A dish with no recipe", d: "Its ingredients are marked 'estimated' and added to tonight's verify list until the chef confirms." },
  { icon: faReceipt, t: "Blurry or handwritten bill", d: "Low-confidence lines are highlighted for a tap-to-fix. Nothing is silently guessed." },
  { icon: faRotate, t: "Voids, comps and refunds", d: "Voided and complimentary items are excluded from consumption; refunds reverse the deduction." },
  { icon: faTruck, t: "Delivery logged late", d: "A late goods-received note updates the estimate instead of creating a false variance." },
  { icon: faBoxOpen, t: "Batch prep: gravies and dough", d: "Prep is tracked as its own stock item, made from raw ingredients and used by dishes." },
  { icon: faWifi, t: "No signal in the storeroom", d: "Verification works offline and syncs when the phone reconnects." },
  { icon: faLanguage, t: "Mixed-language menus", d: "Dish names in Hindi, English or Hinglish map to the same menu item." },
];

function EdgeAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white">
      {edgeCases.map((e, i) => (
        <div key={e.t}>
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-3 px-5 py-4 text-left" aria-expanded={open === i}>
            <FontAwesomeIcon icon={e.icon} className="size-4 text-brand" />
            <span className="flex-1 font-semibold text-ink">{e.t}</span>
            <FontAwesomeIcon icon={faChevronDown} className={`size-3.5 text-ink/40 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 pb-4 pl-12 text-sm text-ink/70">
                {e.d}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/* Chapter 07 · Validation                                             */
/* ================================================================== */

const findingsTable = [
  { sev: "P0", issue: "Managers confirmed all items without checking flags", fix: "Flagged items must be checked before 'confirm the rest' unlocks" },
  { sev: "P0", issue: "Thermal bills too faded to scan", fix: "Edge detection, flash prompt and tap-to-fix for low-confidence lines" },
  { sev: "P1", issue: "Chefs ignored recipe review requests during service", fix: "Moved review to the kitchen display at 4 pm, five dishes at a time" },
  { sev: "P1", issue: "Owners overwhelmed by the full variance list", fix: "Lead with the top three causes and their cost; detail on tap" },
  { sev: "P2", issue: "Units confused (kg vs g, L vs ml)", fix: "Units always shown, with the item's usual unit pre-selected" },
];

function FindingsTable() {
  const tone = (s: string) => (s === "P0" ? "bg-red-500 text-white" : s === "P1" ? "bg-amber-400 text-ink" : "bg-ink/10 text-ink/70");
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white">
      <table className="w-full min-w-[620px] text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-left">
            <th className="p-4 text-[11px] uppercase tracking-[0.14em] text-ink/50">Sev.</th>
            <th className="p-4 text-[11px] uppercase tracking-[0.14em] text-ink/50">What we saw</th>
            <th className="p-4 text-[11px] uppercase tracking-[0.14em] text-ink/50">What we changed</th>
          </tr>
        </thead>
        <tbody>
          {findingsTable.map((f) => (
            <tr key={f.issue} className="border-b border-ink/5 last:border-0">
              <td className="p-4"><span className={`rounded px-2 py-1 text-xs font-bold ${tone(f.sev)}`}>{f.sev}</span></td>
              <td className="p-4 text-ink/80">{f.issue}</td>
              <td className="p-4 text-ink/80">{f.fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const accuracyWeeks = [81, 84, 86, 88, 89, 90, 91, 92, 92, 93];

function LearningCurve() {
  const W = 600;
  const H = 220;
  const pl = 36;
  const x = (i: number) => pl + (i * (W - pl - 16)) / (accuracyWeeks.length - 1);
  const y = (v: number) => 16 + ((100 - v) / 25) * (H - 46);
  const d = accuracyWeeks.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  return (
    <Panel>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold text-ink">Estimates got better as managers corrected them</h3>
        <span className="text-xs text-ink/50">% of items within ±5% · pilot weeks 1–10</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
        {[80, 90, 100].map((v) => (
          <g key={v}>
            <line x1={pl} x2={W - 10} y1={y(v)} y2={y(v)} stroke={C.ink} strokeOpacity="0.08" />
            <text x="0" y={y(v) + 4} fontSize="11" fill={C.muted}>{v}%</text>
          </g>
        ))}
        <rect x={pl} y={y(100)} width={W - pl - 10} height={y(90) - y(100)} fill={C.basil} opacity="0.08" />
        <text x={W - 14} y={y(90) - 6} fontSize="10" fill={C.basil} textAnchor="end" fontWeight="700">target 90%</text>
        <path d={`${d} L${x(accuracyWeeks.length - 1)},${H - 30} L${x(0)},${H - 30} Z`} fill={C.brand} opacity="0.08" />
        <path d={d} fill="none" stroke={C.brand} strokeWidth="3" strokeLinejoin="round" />
        {accuracyWeeks.map((v, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(v)} r="4" fill="white" stroke={C.brand} strokeWidth="2.5" />
            <text x={x(i)} y={H - 10} fontSize="10" fill={C.muted} textAnchor="middle">W{i + 1}</text>
          </g>
        ))}
        <text x={x(9)} y={y(93) - 12} fontSize="12" fill={C.brand800} textAnchor="end" fontWeight="700">93%</text>
      </svg>
    </Panel>
  );
}

const funnel = [
  { s: "Outlets onboarded", n: 64 },
  { s: "Top recipes confirmed", n: 58 },
  { s: "First verification", n: 55 },
  { s: "Verifying weekly", n: 51 },
  { s: "Verifying every night", n: 46 },
];

function AdoptionFunnel() {
  return (
    <div className="space-y-2">
      {funnel.map((f, i) => (
        <div key={f.s} className="flex items-center gap-3">
          <div className="flex h-11 items-center justify-between rounded-md px-4 text-sm font-semibold text-white" style={{ width: `${(f.n / 64) * 100}%`, background: [C.brand900, C.brand800, C.brand, C.lilac, C.lilac300][i], minWidth: 180 }}>
            <span className="truncate">{f.s}</span>
            <span className="">{f.n}</span>
          </div>
          {i > 0 && <span className="text-xs text-ink/45">{Math.round((f.n / funnel[i - 1].n) * 100)}%</span>}
        </div>
      ))}
      <p className="pt-1 text-[11px] text-ink/50">46 of 64 pilot outlets (72%) verified every night by week 10.</p>
    </div>
  );
}

function ChatQuotes() {
  const msgs = [
    { id: "rohan", text: "Sir, stock done. 8 items checked. Leaving 😄", time: "11:38 pm" },
    { id: "kavita", text: "Saw the report. Paneer again? Will talk to Imran tomorrow.", time: "11:52 pm" },
    { id: "imran", text: "It wrote the recipe for me, I just fixed the grams. Weekend portions I'll fix.", time: "9:10 am" },
  ];
  return (
    <div className="mx-auto max-w-md rounded-2xl bg-[#ece5dd] p-4 shadow-inner">
      <p className="mb-3 text-center text-[10px] text-ink/50">Outlet ops group · pilot week 6</p>
      <div className="space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex items-end gap-2 ${m.id === "kavita" ? "flex-row-reverse" : ""}`}>
            <Face id={m.id} size={30} />
            <div className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm shadow-sm ${m.id === "kavita" ? "rounded-br-sm bg-[#dcf8c6]" : "rounded-bl-sm bg-white"}`}>
              <p className="text-[11px] font-semibold text-brand">{people[m.id].name.split(" ")[0]}</p>
              <p className="text-ink/85">{m.text}</p>
              <p className="text-right text-[10px] text-ink/40">{m.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const experiments = [
  { h: "Stock can be fully automatic", r: "Owners distrusted unchecked numbers within 2 weeks", d: "Added exception-only verification", ok: false },
  { h: "Restaurants will enter all recipes up front", r: "Set-up stalled at 31% coverage", d: "AI drafts, top 20 dishes first", ok: false },
  { h: "Cashiers will scan each paper bill live", r: "Counters slowed during rush hour", d: "Batch scan at closing time", ok: false },
  { h: "Reasons next to flags will cut re-counting", r: "Re-counts of unflagged items fell 70%", d: "Kept and extended to every number", ok: true },
];

function ExperimentLog() {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10 bg-white">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-ink/10 text-left">
            {["Hypothesis", "Result", "Decision"].map((h) => (
              <th key={h} className="p-4 text-[11px] uppercase tracking-[0.14em] text-ink/50">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {experiments.map((e) => (
            <tr key={e.h} className="border-b border-ink/5 last:border-0">
              <td className="p-4 text-ink/80">{e.h}</td>
              <td className="p-4">
                <span className={`mr-2 inline-flex size-5 items-center justify-center rounded-full text-[10px] ${e.ok ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                  <FontAwesomeIcon icon={e.ok ? faCheck : faXmark} className="size-2.5" />
                </span>
                <span className="text-ink/80">{e.r}</span>
              </td>
              <td className="p-4 font-semibold text-ink">{e.d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================================================================== */
/* Chapter 08 · Conclusion                                             */
/* ================================================================== */

function Roadmap() {
  const cols = [
    { k: "Now", tone: "border-brand bg-brand/5", items: [{ i: faCartShopping, t: "Suggested orders sent to suppliers" }, { i: faCarrot, t: "Expiry tracking with use-first nudges" }] },
    { k: "Next", tone: "border-lilac bg-white", items: [{ i: faBoxesStacked, t: "Central kitchen → outlet transfers" }, { i: faCamera, t: "Photo-based spot checks of shelves" }] },
    { k: "Later", tone: "border-ink/20 bg-white", items: [{ i: faArrowTrendUp, t: "Demand forecasting for par levels" }, { i: faScaleBalanced, t: "Smart-scale integration for high-value items" }] },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cols.map((c) => (
        <div key={c.k} className={`rounded-xl border-t-4 p-5 ${c.tone}`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">{c.k}</p>
          <ul className="mt-3 space-y-3">
            {c.items.map((x) => (
              <li key={x.t} className="flex gap-3 rounded-lg bg-white p-3 text-sm text-ink/80 shadow-sm">
                <FontAwesomeIcon icon={x.i} className="mt-0.5 size-4 shrink-0 text-brand" />
                {x.t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}


/* ================================================================== */
/* Case study                                                          */
/* ================================================================== */

export default function RecipeStockCaseStudy() {
  return (
    <div className="flex h-full flex-col px-4 py-12 lg:px-7 lg:py-20">
      <div className="space-y-24 max-w-4xl mx-auto w-full">
        {/* ===== 01 SUMMARY ===== */}
        <section id="project-summary" className="space-y-8 scroll-mt-8 [&>header>h1]:mt-0">
          <Chapter title="Project summary" />
          <div className="max-w-3xl space-y-4">
            <Body>
              <strong>Click Bacon</strong> is a restaurant operations platform that helps restaurants run, analyse and optimise everything from the kitchen to the table: billing, menus, inventory and reporting.
            </Body>
            <Body>
              I designed its <strong>Receipt → Recipe → Stock</strong> automation. An agent reads every bill, breaks each dish into its recipe and estimates the stock left on the shelf. The stock manager stops counting and only verifies what looks off. Restaurants on paper bills scan them with a phone.
            </Body>
          </div>
          <AtAGlance />

          <H2 note="We spent closing shifts in 14 restaurants. This is what a typical night looked like.">How it started</H2>
          <NightShift />

          <H2 note="The same night, itemised before and after. Pilot averages across 64 outlets, Jan–Apr vs May–Aug 2024.">Impact Highlights</H2>
          <TwoReceipts />
          <KpiStrip />
          <Disclaimer />

          <h2 className="text-xl font-semibold text-ink">Core Outcomes</h2>
          <CoreOutcomes />
        </section>

        {/* ===== 02 BUSINESS ===== */}
        <section id="business-problem" className="space-y-8 scroll-mt-8 mt-[120px]">
          <Chapter title="Business Usecase" thesis={<>Restaurants knew exactly what they sold, but <Hl>had no idea what was left on the shelf.</Hl></>} />
          <FollowTheMoney />
          <H2 note="Once managers began tagging every gap, the untraced 9% broke down like this.">Where the money leaked</H2>
          <LeakDonut />
          <H2 note="Three objectives, each with key results agreed with restaurant owners before design started.">Business Objectives</H2>
          <Okrs />
        </section>

        {/* ===== 03 PEOPLE ===== */}
        <section id="user-problem" className="space-y-8 scroll-mt-8 mt-[120px]">
          <Chapter n="03" kicker="The people" title="User Problems" thesis={<>The restaurant buys the product. <Hl>The stock manager decides whether it works</Hl>, at 11 pm, in a dim storeroom.</>} />
          <BuyerVsUser />

          <H2 note="Built from 12 interviews and 40 closing shifts.">Primary user: an empathy map</H2>
          <EmpathyMap />

          <H2 note="Two people shape whether stock numbers can be trusted, from either side of the storeroom.">Supporting roles</H2>
          <div className="grid gap-6 md:grid-cols-2">
            <IdBadge id="kavita" archetype="Client · the margin watcher" need="Know where food cost goes, early enough to act." quote="My food cost is 4 points high and nobody can tell me where it goes." color={C.brand800} />
            <IdBadge id="imran" archetype="Kitchen · the recipe keeper" need="Ingredients ready for every service, without paperwork." quote="The recipes are in my head. Nobody ever asked me for grams." color={C.saffron} />
          </div>

          <H2 note="Stripping away the role: the job the stock manager is hired to do, step by step.">Job map: close tonight's stock</H2>
          <JobMap />

          <H2 note="Frontstage, backstage and systems across a closing shift. ⚡ marks where things break.">Service blueprint</H2>
          <ServiceBlueprint />

          <H2 note="Each problem became a testable bet with a measurable outcome.">From problems to hypotheses</H2>
          <Hypotheses />
        </section>

        {/* ===== 04 RESEARCH ===== */}
        <section id="research" className="space-y-8 scroll-mt-8 mt-[120px]">
          <Chapter n="04" kicker="The evidence" title="Research" thesis={<>Before replacing a count with an estimate, we had to learn <Hl>how wrong the count already was</Hl>.</>} />
          <H2 note="Five weeks, mixed methods: 26 interviews, 40 shadowed shifts, 600 blind re-counts, 9,000 bills and a survey of 212 managers.">Research plan</H2>
          <ResearchPlan />

          <H2>Key Research Highlights</H2>
          <Headlines />

          <H2 note="We re-counted 600 items the morning after each shadowed shift.">The blind re-count</H2>
          <MismatchLollipop />

          <H2>The recipe gap</H2>
          <RecipeWaffle />

          <H2 note="Where existing approaches sit on effort and trust.">Competitive Analysis</H2>
          <PositioningMap />

          <H2 note="Eight ideas from synthesis, plotted by impact and effort. Filled dots shipped in v1.">Prioritisation</H2>
          <Prioritisation />

          <H2>How Might We</H2>
          <HmwWall />
        </section>

        {/* ===== 05 DESIGN PROCESS ===== */}
        <section id="design-strategy" className="space-y-8 scroll-mt-8 mt-[120px]">
          <Chapter n="05" kicker="The thinking" title="Design Process" thesis={<>The hard part wasn't the AI. It was deciding <Hl>what a person still needs to do</Hl>, and making that small.</>} />
          <H2>Design Principles</H2>
          <Principles />

          <H2 note="One bill fans out into dishes, recipes and ingredients. One equation ties it to the shelf.">The data model</H2>
          <DataModel />

          <H2 note="How the agent decides what a human should check tonight.">Flagging logic</H2>
          <FlagLogic />

          <H2 note="Three rounds of the verify screen, tested with 15 stock managers.">How the verify screen evolved</H2>
          <Iterations />

          <H2>Key Design Decisions</H2>
          <Decisions />
        </section>

        {/* ===== 06 SOLUTION ===== */}
        <section id="solution" className="space-y-8 scroll-mt-8 mt-[120px]">
          <Chapter n="06" kicker="The product" title="Concept and Solution" thesis={<>One flow, four people: the chef sets it up, the cashier feeds it, <Hl>the manager verifies it</Hl>, the owner acts on it.</>} />
          <Walkthrough />
          <H2>Trust by design</H2>
          <NotABlameTool />
          <H2 note="Real kitchens rarely go to plan. Tap to see how each case is handled.">Edge Cases</H2>
          <EdgeAccordion />
        </section>

        {/* ===== 07 VALIDATION ===== */}
        <section id="validation" className="space-y-8 scroll-mt-8 mt-[120px]">
          <Chapter n="07" kicker="The proof" title="User Validation" thesis={<>Two rounds of usability testing, then <Hl>a 10-week pilot in 64 outlets</Hl> against 30 that kept counting by hand.</>} />
          <H2 note="Severity: P0 blocks the task, P1 slows it, P2 is friction.">Usability findings</H2>
          <FindingsTable />
          <LearningCurve />
          <H2 note="From onboarding to a nightly habit.">Adoption</H2>
          <AdoptionFunnel />
          <H2 note="Shared by a pilot owner (names changed).">Heard on the floor</H2>
          <ChatQuotes />
          <H2 note="Not everything worked. Each miss changed the product.">Experiment log</H2>
          <ExperimentLog />
        </section>

        {/* ===== 08 CONCLUSION ===== */}
        <section id="impact" className="space-y-8 scroll-mt-8 mt-[120px]">
          <Chapter n="08" kicker="The takeaway" title="Conclusion" thesis={<>Automate the work, <Hl>not the responsibility</Hl>.</>} />
          <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <Label>Scorecard vs objectives</Label>
              {[
                { o: "Evenings back", v: "120 → 15 min", ok: true },
                { o: "Trustworthy stock", v: "93% accuracy", ok: true },
                { o: "Margin protected", v: "9% → 4% variance", ok: true },
                { o: "Nightly habit", v: "72% of outlets", ok: true },
              ].map((s) => (
                <Leader key={s.o} label={<span className="flex items-center gap-2"><FontAwesomeIcon icon={faCircleCheck} className="size-4 text-emerald-500" />{s.o}</span>} value={<span className="font-bold text-brand">{s.v}</span>} />
              ))}
            </div>
            <div className="space-y-4">
              <Label>Per outlet, per month</Label>
              <Receipt>
                <Leader label="Stock manager hours saved" value="~52 hrs" />
                <Leader label="Food cost recovered (5 pts)" value="~₹68,000" />
                <Leader label="Stock-outs avoided" value="8" />
                <div className="my-2 border-t-2 border-dashed border-ink/20" />
                <Leader label="Payback on subscription" value="< 1 month" strong />
              </Receipt>
            </div>
          </div>

          <H2>What I Learned</H2>
          <ol className="space-y-6">
            {[
              { t: "Automate the work, not the responsibility.", d: "Our fully automatic first pilot lost owners' trust in two weeks. A small human check made the whole system believable." },
              { t: "Show your working.", d: "\"120 naan × 8 g\" did more for adoption than any accuracy score." },
              { t: "Design for whoever feeds the data.", d: "Estimates lived or died on chefs' recipes, so their five-minute flow mattered as much as the manager's." },
              { t: "Paper isn't an edge case.", d: "For a third of outlets, paper bills were the business. Designing them in widened the market." },
            ].map((l, i) => (
              <li key={l.t} className="grid gap-2 md:grid-cols-[60px_1fr]">
                <span className="text-4xl font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_#7322ff]">{i + 1}</span>
                <div>
                  <p className="text-xl font-bold text-ink">{l.t}</p>
                  <p className="mt-1 text-ink/70">{l.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <H2>What's Next</H2>
          <Roadmap />
          <Disclaimer />
        </section>
      </div>
    </div>
  );
}
