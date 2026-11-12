# Case study pattern

How the Study Planner case study (`src/components/ProjectDetailFullContent.tsx`) is built, so the
other projects (Truck Fill, Recipe to Stock) can follow the same structure.

## Page frame

| Area | What it holds |
| --- | --- |
| Left panel | Breadcrumb (back · home · projects · project word), then the section menu. The active item is large and dark with a purple dot. The panel can collapse to a dot rail. |
| Banner | Project gradient (`src/utils/projectTheme.ts`), eyebrow ("UX FOR IMPACT"), title, outcome pills, **Watch** and **Experience** buttons, project mockup (`ProjectMockups.tsx`). |
| Content | Centred column (`max-w-4xl`). Sections are spaced well apart and each has an `id` that matches the menu. |

The menu labels come from `project.contents` in `src/data.ts`. Each `id` there must match a `<section id="…">`.

## Story arc (8 sections)

Each section answers one question. Sections build on each other: problem → people → evidence → opportunity → design → proof.

1. **Project summary**: *What is it and did it work?*
   - 2–3 short paragraphs: product context, the core gap (with one sentence highlighted in yellow), what I designed.
   - **Impact Highlights**: before/after comparison period, 4 metric tiles (Acquisition, Retention, Completion, Engagement). Selecting a tile switches the chart below (line or bar trend, donut, before/after numbers).
   - A disclaimer that the numbers are proportional, not real organisational data.
   - **Core Outcomes**: 3 cards, each a short headline with one supporting line.
   - **My Role**: company, product, and a one-paragraph scope of work.
2. **Business usecase**: *Why did the business care?*
   - Lead statement with the pain highlighted ("We brought students…, but **struggled to keep them learning**").
   - 3 metric problem cards (e.g. Day-7 retention, time spent, sustainability), each paired with a dark "Critical issue" callout.
   - 3 root-cause cards (icon, title, one line).
   - **Business Objectives**: 3 numbered goals, each with a measurable target in bold (e.g. "10% → 25%").
3. **User problems**: *Who are the users and what gets in their way?*
   - User types: 2 side-by-side cards (image, label, 5 checklist traits).
   - Personas: a carousel of persona cards (photo, name, quote, Goals ✓ and Pain points ⚠).
   - **Behavioural segmentation**: data-backed split (counts and %), shown as proportional bars.
   - **Key gaps**: 5 cards (gap name, one line, linked segment).
4. **Research**: *How did we find out?*
   - **Things to Know**: 4–5 research questions.
   - **Primary research**: tabs for Findings, Method and Analysis. Method has a stat strip (participants, age, format, duration) plus why/how columns. Findings has insight cards, one per question.
   - **Key Research Highlights**: 5 short insight tiles.
   - **Secondary research**: questions asked of the market.
   - **Competitive analysis**: Direct/Indirect toggle, competitor cards (logo, banner, strengths and gaps).
   - **Competitive Gap Map**: a matrix with a 3-level legend (strong, needs improvement, major gap).
   - **Gaps & Opportunities**: two columns, **Must have** (what's missing) and **Should have** (how we'll be better), with key phrases highlighted. A SWOT diagram with numbered hover bubbles ties them together.
   - **How Might We**: a table of HMW questions, each tagged Critical, Important or Nice-to-have.
5. **Design process**: *How did ideas become decisions?* (still to write)
6. **Concept & solution**: *What did we build?* (still to write; the **Experience** modal with Before/After journeys and live prototypes belongs here)
7. **User validation**: *Did users agree?* (still to write)
8. **Conclusion**: *What changed and what did I learn?* (still to write)

## Visual language

- **Headings:** section title `text-4xl font-bold`, sub-section `text-3xl font-bold`, card title `text-lg font-semibold`. Body text is `text-base text-ink/80`, and supporting text is `text-ink/60`.
- **Emphasis:** `<strong>` for numbers and key nouns. The one sentence that carries the insight gets a yellow highlight (`bg-yellow-100`).
- **Cards:** white, rounded, soft shadow, with a brand icon chip (`bg-brand/10`, `text-brand`).
- **Colour meaning:** brand purple for the product and solution, red and amber for problems or critical issues, green for strengths and outcomes.
- **Interaction:** tabs, toggles, carousels and hover tooltips reveal depth without making the page longer. Every interactive chart has a static fallback reading.
- **Numbers:** always paired with a time frame or baseline ("Nov 2024 – Apr 2025 vs May 2025 – Oct 2025").

## Adding another project

1. In `src/data.ts`, set `contents` (menu labels and ids), `pills`, `eyebrow`/`word`, `visual`, and optional `experienceJourneys`.
2. Add a gradient in `src/utils/projectTheme.ts` and a mockup in `ProjectMockups.tsx` if it needs a new visual.
3. Write the eight sections in the order above, reusing the same blocks: metric tiles + chart, problem cards + critical callout, objectives, user types, personas, segmentation, gaps, research tabs, competitor analysis, opportunities, HMW.
4. Keep each section to one question, and lead with the insight before the evidence.
