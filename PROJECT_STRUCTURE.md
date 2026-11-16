# Project structure

A map of the portfolio, so you can find and change anything yourself.

**The rule:** pages are in `src/pages/`, editable content (text, lists, colours) is in `src/data/`, images and videos are in `src/assets/`, styles are in `src/styles/`, helper code is in `src/lib/`, and reusable building blocks are in `src/components/`.

```
sumansahu/
├── index.html                 The HTML shell (title and meta tags come from .figma/make/site.json)
├── package.json               Dependencies and scripts (pnpm dev / pnpm build)
├── vite.config.ts             Build settings
├── PROJECT_STRUCTURE.md       This guide
│
├── src/
│   ├── main.tsx               Starts the app (you rarely touch this)
│   ├── App.tsx                ROUTES: every address and the page it shows
│   │
│   ├── pages/                 ONE FILE PER PAGE
│   │   ├── HomePage.tsx           /            Home (hero, intro text, menu)
│   │   ├── ProjectsPage.tsx       /projects    Project list + preview panels
│   │   ├── ProjectDetailPage.tsx  /project/…   Project page frame: side menu, scrolling
│   │   ├── AboutPage.tsx          /about       My Journey, work, education, achievements
│   │   ├── admin/
│   │   │   ├── AdminLoginPage.tsx      /workshop/login
│   │   │   └── AdminDashboardPage.tsx  /workshop/dashboard
│   │   └── projects/          THE CASE STUDY CONTENT OF EACH PROJECT
│   │       ├── StudyPlanner.tsx       01 Product & UX Design
│   │       ├── TruckFill.tsx          02 AI Agent Design
│   │       ├── RecipeStock.tsx        03 Enterprise Workflows
│   │       ├── BrandExperience.tsx    04 Brand Experience
│   │       ├── DesignSystems.tsx      05 Design Systems
│   │       └── shared.tsx             Shared titles, cards, image slots used by 02–05
│   │
│   ├── components/            REUSABLE PIECES used by several pages
│   │   ├── ProjectContent.tsx     Project page banner, Watch/Experience buttons + pop-ups,
│   │   │                          and the list that picks the right case study
│   │   ├── ProjectImage.tsx       Project image box: 16:12 (large), 16:8 (small) or 16:10 (screen), shimmer while loading
│   │   ├── ScreenCarousel.tsx     Swipeable image carousel with an explanation block on each slide
│   │   ├── ProjectMockups.tsx     Illustrated mockups drawn in code (Projects page, banners)
│   │   ├── ConnectButton.tsx      "Let's connect" button and contact drawer
│   │   ├── IntroductionModal.tsx  Intro pop-up on /portfolio
│   │   ├── JourneyCarousel.tsx    Video carousel on the About page
│   │   ├── HeroAmbient.tsx        Soft moving circles on the Home page
│   │   └── ProtectedRoute.tsx     Keeps the admin dashboard behind the login
│   │
│   ├── data/                  CONTENT YOU EDIT WITHOUT TOUCHING LAYOUT
│   │   ├── projects.ts            Project titles, categories, menu items, order, cover media
│   │   ├── projectThemes.ts       Background gradient of each project
│   │   └── about.ts               Journey slides, work experience, education, achievements
│   │
│   ├── styles/
│   │   └── index.css              Global CSS: Tailwind, fonts, brand colours, animations
│   │
│   ├── lib/                   HELPER CODE (no visible UI)
│   │   ├── transitions.ts         Page and panel animations
│   │   ├── analytics.ts           Visitor tracking for the admin dashboard
│   │   └── adminTypes.ts          Data types used by analytics
│   │
│   └── assets/                ALL IMAGES AND VIDEOS
│       ├── images/
│       │   ├── common/            Used on several pages (suman-sahu.png profile photo)
│       │   ├── home/              hero-portrait.png
│       │   ├── about/             college.png, design-thinking.png
│       │   └── projects/
│       │       ├── study-planner/     banner.webp, personas, students, learners
│       │       │   ├── sections/      In-page images: summary, business-objectives,
│       │       │   │                  behavioral-segments, research-highlights (.jpg)
│       │       │   │   ├── concept/   user-journey.png, ai-agent / weekly-calendar / guided-setup.png
│       │       │   │   └── solution/  <problem>-1/2/3.png screens for each Solution carousel
│       │       │   └── competitors/   logos and banners of competitor apps
│       │       ├── truck-fill/        photos and personas
│       │       └── recipe-stock/      photos and personas
│       └── videos/
│           ├── about/             journey-1 … journey-7.mp4, award.mp4
│           └── projects/
│               └── study-planner/ background.mp4 (Projects page), walkthrough.mp4 (Watch button)
│
├── public/                    Files copied as-is (reached by URL, not imported)
│   └── prototypes/                Clickable HTML prototypes opened by the Experience button
│
├── docs/                      Notes: case-study pattern, admin panel guides
├── scripts/                   deploy-ftp.ps1 (upload dist/ to sumansahu.in by FTP)
├── .github/workflows/         Publishes the site to GitHub Pages
└── .figma/make/               Figma Make settings (site title/description in site.json)
```

## Common tasks

### Replace an image or video
1. Find it in `src/assets/…` (folders are named after the page or project).
2. **Easiest:** save your new file with **the same name**, over the old one. Nothing else changes.
3. **Different name or format** (for example `.png` to `.webp`): put the file in the same folder, then search the code for the old file name (in VS Code, Ctrl+Shift+F) and update the `import` line at the top of that file.

Example: the Study Planner banner image is imported in `src/data/projects.ts`:
```ts
import studyPlannerBanner from "../assets/images/projects/study-planner/banner.webp";
```

### Project section images (16:12 and 16:8)
Study Planner images are in `src/assets/images/projects/study-planner/sections/`:

| File | Where | Shape |
|---|---|---|
| `summary.jpg` | Project summary, after the text | 16:12 (e.g. 1600×1200) |
| `business-objectives.jpg` | Business Objectives, before the cards | 16:8 (e.g. 1600×800) |
| `behavioral-segments.jpg` | Behavioral Segmentation, after the table | 16:12 |
| `research-highlights.jpg` | Key Research Highlights, after the cards | 16:12 |

**Concept section** (`sections/concept/`): `user-journey.png` (16:8) and one 16:12 image per concept: `ai-agent.png`, `weekly-calendar.png`, `guided-setup.png`.

**Solution section** (`sections/solution/`): three 16:10 screens (e.g. 1600×1000) per problem, shown as a carousel:
`overplanning-1/2/3.png`, `plan-action-fit-1/2/3.png`, `flexibility-1/2/3.png`, `recovery-1/2/3.png`, `momentum-1/2/3.png`.
Texts and screen captions are in the `journeyStages`, `concepts` and `solutions` lists near the top of `src/pages/projects/StudyPlanner.tsx`. Each slide is `{ src, title, text }`: the title and text appear in the block over the image. To add a 4th slide, add an import and one more line.
The **Concept Selection** (Pugh) matrix is built from the `pughConcepts` and `pughCriteria` lists in the same file: change a score (1 better, 0 same, -1 worse) or a weight, and totals, rank and the "Selected" column update automatically.

Replace a file with the same name and it shows up. Other sizes still work: the picture is cropped to fit the shape.
To add another one, in the page file write `<ProjectImage src={myImage} alt="…" />` (16:12) or add `size="small"` (16:8), and import the file at the top.

### Change text on a project page
Open that project's file in `src/pages/projects/` and search for the sentence.

### Change a project's title, category, order or menu items
`src/data/projects.ts`. The order in the `projects` list is the order on the site.

### Change a project's background gradient
`src/data/projectThemes.ts`, one line per project id.

### Change About page text (work, education, achievements)
`src/data/about.ts`.

### Change colours, fonts or global animations
`src/styles/index.css`. Brand colours are defined under `@theme` (for example `--color-brand`).

### Add a new page
1. Create `src/pages/MyPage.tsx` with `export default function MyPage() { … }`.
2. In `src/App.tsx`, import it and add `<Route path="/my-page" element={<Animated><MyPage /></Animated>} />`.

### Add a new project
1. Add an entry to `projects` in `src/data/projects.ts` (give it a unique `id`).
2. Add its gradient in `src/data/projectThemes.ts`.
3. Create `src/pages/projects/MyProject.tsx` (copy `DesignSystems.tsx` as a starting point).
4. Register it in `caseStudies` at the top of `src/components/ProjectContent.tsx`.
5. Put its media in `src/assets/images/projects/<id>/` and `src/assets/videos/projects/<id>/`.

## Naming rules
- Pages: `SomethingPage.tsx`. Project case studies: the project name, for example `TruckFill.tsx`.
- Asset files and folders: lowercase words joined by hyphens, for example `persona-arjun.jpg`.
- One folder per page or project under `assets/images` and `assets/videos`.

## Before you publish
Run `pnpm build`. If it finishes without errors, the site is safe to push.
