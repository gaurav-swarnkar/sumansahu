import {
  faCubes,
  faCopy,
  faHourglassHalf,
  faUniversalAccess,
  faPalette,
  faFont,
  faRulerCombined,
  faLayerGroup,
  faCodeBranch,
  faBook,
  faUsers,
  faChartLine,
  faCircleCheck,
  faMoon,
  faPuzzlePiece,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Body, Card, FeatureCards, ImageSlot, Lead, RoleCard, SectionTitle, SubTitle } from "./shared";

/*
 * 05 · Design Systems: Scalable Design Systems for SaaS Platforms.
 * Shows how I build systems, with live examples drawn from this site's own
 * tokens. Slots are left for screenshots of real systems; no results are invented.
 */

const palette = [
  { name: "brand-900", hex: "#3f0390" },
  { name: "brand-800", hex: "#4c04a9" },
  { name: "brand-600", hex: "#6505e7" },
  { name: "brand", hex: "#7322ff" },
  { name: "lilac", hex: "#884bdb" },
  { name: "lilac-100", hex: "#e1cbff" },
  { name: "ink", hex: "#18033b" },
  { name: "lime", hex: "#f0ff64" },
];

const typeScale = [
  { token: "display", size: 44, weight: 700 },
  { token: "heading-1", size: 32, weight: 700 },
  { token: "heading-2", size: 24, weight: 600 },
  { token: "body", size: 16, weight: 400 },
  { token: "caption", size: 12, weight: 500 },
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64];

function ButtonStates() {
  const states = [
    { s: "Default", cls: "bg-brand text-white" },
    { s: "Hover", cls: "bg-brand-600 text-white" },
    { s: "Focus", cls: "bg-brand text-white ring-4 ring-brand/30" },
    { s: "Disabled", cls: "bg-ink/10 text-ink/40" },
    { s: "Loading", cls: "bg-brand text-white opacity-80" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {states.map((x) => (
        <div key={x.s} className="space-y-2 text-center">
          <span className={`inline-flex h-10 w-full items-center justify-center rounded-lg text-sm font-semibold ${x.cls}`}>{x.s === "Loading" ? "•••" : "Button"}</span>
          <p className="text-xs text-ink/55">{x.s}</p>
        </div>
      ))}
    </div>
  );
}

export default function DesignSystemsCaseStudy() {
  return (
    <div className="flex h-full flex-col px-4 py-12 lg:px-7 lg:py-20">
      <div className="space-y-24 max-w-4xl mx-auto w-full">
        {/* ===== PROJECT SUMMARY ===== */}
        <section id="project-summary" className="space-y-8 scroll-mt-8">
          <SectionTitle first>Project summary</SectionTitle>
          <div className="space-y-4 max-w-3xl">
            <Body>
              As SaaS products grow, every new team and feature adds its own buttons, colours and patterns. I build <strong>design systems</strong> that give those products one shared language, so teams ship faster and users get the same experience everywhere.
            </Body>
            <Body>
              My systems run from <strong>design tokens</strong> through <strong>components and patterns</strong> to the <strong>documentation and governance</strong> that keep them alive. The examples on this page use this portfolio's own tokens.
            </Body>
          </div>

          <SubTitle>What a system gives a product team</SubTitle>
          <FeatureCards
            cols={4}
            items={[
              { icon: faCubes, title: "One source of truth", text: "Tokens and components shared by design and code, so nothing drifts." },
              { icon: faHourglassHalf, title: "Faster delivery", text: "Teams assemble screens from tested parts instead of redrawing them." },
              { icon: faUniversalAccess, title: "Accessibility built in", text: "Contrast, focus and keyboard behaviour solved once, inherited everywhere." },
              { icon: faMoon, title: "Ready for change", text: "Themes, dark mode and rebrands become token changes, not redesigns." },
            ]}
          />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-ink">My Role</h2>
            <RoleCard
              title="Design Systems Lead"
              meta="SaaS platforms · tokens · component libraries · documentation"
              text="I audit existing products, define the foundations, design and spec the component library, write the documentation and work with engineering on the coded version and its release process."
            />
          </div>
        </section>

        {/* ===== THE CHALLENGE ===== */}
        <section id="challenge" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>The Challenge</SectionTitle>
          <Lead>
            Without a system, a growing product slowly becomes <span className="text-brand">several products that happen to share a logo.</span>
          </Lead>
          <FeatureCards
            cols={2}
            items={[
              { icon: faCopy, title: "Duplicated components", text: "The same button or table rebuilt by every team, each slightly different." },
              { icon: faPalette, title: "Inconsistent look and feel", text: "Dozens of near-identical colours and font sizes with no rules behind them." },
              { icon: faHourglassHalf, title: "Slow delivery", text: "Designers redraw and developers rebuild the basics on every feature." },
              { icon: faUniversalAccess, title: "Accessibility gaps", text: "Contrast and keyboard issues fixed screen by screen, then reintroduced." },
            ]}
          />
          <ImageSlot label="Add an audit board: the variations found before the system" aspect="aspect-[21/9]" />
        </section>

        {/* ===== FOUNDATIONS ===== */}
        <section id="foundations" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Foundations</SectionTitle>
          <Lead>
            Everything starts with <span className="text-brand">tokens</span>: named decisions for colour, type, space and depth.
          </Lead>

          <SubTitle note="Each colour is a token used by name, never by hex value.">Colour</SubTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {palette.map((c) => (
              <div key={c.name} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-ink/5">
                <div className="h-16" style={{ background: c.hex }} />
                <div className="p-3">
                  <p className="text-sm font-semibold text-ink">{c.name}</p>
                  <p className="text-xs text-ink/50">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>

          <SubTitle note="A small, fixed scale covers every screen.">Typography</SubTitle>
          <Card className="divide-y divide-ink/5 !p-0">
            {typeScale.map((t) => (
              <div key={t.token} className="flex items-baseline gap-4 px-6 py-4">
                <span className="w-24 shrink-0 text-xs font-semibold text-brand">{t.token}</span>
                <span className="flex-1 truncate text-ink" style={{ fontSize: Math.min(t.size, 36), fontWeight: t.weight }}>
                  Design once, use everywhere
                </span>
                <span className="hidden text-xs text-ink/45 sm:inline">{t.size}px / {t.weight}</span>
              </div>
            ))}
          </Card>

          <SubTitle note="Spacing on a 4-pixel base keeps every layout in rhythm.">Spacing</SubTitle>
          <Card className="space-y-2">
            {spacing.map((s) => (
              <div key={s} className="flex items-center gap-3">
                <span className="w-16 text-xs font-semibold text-ink/60">space-{s}</span>
                <span className="h-3 rounded bg-brand" style={{ width: s * 4 }} />
                <span className="text-xs text-ink/45">{s}px</span>
              </div>
            ))}
          </Card>
        </section>

        {/* ===== COMPONENTS ===== */}
        <section id="components" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Components</SectionTitle>
          <Lead>
            Components are built from tokens, with <span className="text-brand">every state designed</span>, not just the default.
          </Lead>

          <SubTitle note="One component, every state it can be in.">Example: button states</SubTitle>
          <Card>
            <ButtonStates />
          </Card>

          <SubTitle note="Components group into a small number of families.">The library</SubTitle>
          <FeatureCards
            items={[
              { icon: faPuzzlePiece, title: "Inputs", text: "Buttons, fields, selects, toggles, date pickers and file upload." },
              { icon: faLayerGroup, title: "Data display", text: "Tables, cards, lists, charts and empty states." },
              { icon: faCircleCheck, title: "Feedback", text: "Alerts, toasts, badges, progress and validation messages." },
              { icon: faRulerCombined, title: "Layout", text: "Grids, page shells, side panels and modals." },
              { icon: faFont, title: "Content", text: "Headings, rich text, tags and avatars." },
              { icon: faMoon, title: "Themes", text: "Light, dark and per-product brand themes from the same tokens." },
            ]}
          />
          <ImageSlot label="Add a screenshot of the component library in Figma or Storybook" aspect="aspect-[21/9]" />
        </section>

        {/* ===== ADOPTION & GOVERNANCE ===== */}
        <section id="governance" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Adoption & Governance</SectionTitle>
          <Lead>
            A system only works if teams use it. <span className="text-brand">Governance is designed as carefully as the components.</span>
          </Lead>
          <FeatureCards
            cols={2}
            items={[
              { icon: faBook, title: "Documentation", text: "Every component has usage guidance, do's and don'ts, accessibility notes and code examples." },
              { icon: faCodeBranch, title: "Versioning & releases", text: "Semantic versions, changelogs and migration notes so teams can upgrade with confidence." },
              { icon: faUsers, title: "Contribution model", text: "A clear path for teams to propose, review and add new components." },
              { icon: faChartLine, title: "Measuring adoption", text: "Track how much of each product is built from system components, and where it isn't." },
            ]}
          />
        </section>

        {/* ===== CONCLUSION ===== */}
        <section id="impact" className="space-y-8 scroll-mt-8 mt-[120px]">
          <SectionTitle>Conclusion</SectionTitle>
          <Lead>
            The best design systems are <span className="text-brand">invisible to users and indispensable to teams.</span>
          </Lead>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { t: "Consistency users feel", d: "The same patterns behave the same way across every product." },
              { t: "Speed teams notice", d: "New features start from proven parts, not a blank canvas." },
              { t: "Room to grow", d: "New products and rebrands extend the system instead of replacing it." },
            ].map((x) => (
              <Card key={x.t} className="space-y-2">
                <FontAwesomeIcon icon={faCircleCheck} className="size-4 text-brand" />
                <h3 className="text-lg font-semibold text-ink">{x.t}</h3>
                <p className="text-sm text-ink/70">{x.d}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
