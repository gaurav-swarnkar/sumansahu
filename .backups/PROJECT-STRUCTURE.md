# Project Backup & Structure Documentation

## Backup Information

- **Date**: 2026-08-31
- **Component**: Hero Homepage
- **Location**: `.backups/HERO-BACKUP-20260831.tsx`

## Backup Contents

Complete Hero component with all features:

- Animated typing title with 4 rotating titles
- Character-level purple highlighting
- Experience badges with Font Awesome icons
- Three CTA buttons with smooth animations
- Exit animations for page transitions
- Responsive design and animations

## Project Structure

````
sumansahu/
├── .backups/                    # Backup files
│   └── HERO-BACKUP-20260831.tsx
├── .figma/                      # Figma configuration
├── src/
│   ├── components/
│   │   ├── Hero.tsx            # Homepage - main hero section
│   │   ├── ProjectStories.tsx   # Project showcase component
│   │   ├── Visuals.tsx          # Visual elements component
│   │   └── ...other components
│   ├── imports/                # Figma-generated component variants
│   │   ├── Main/               # Main variant
│   │   ├── Main-1/             # Alt variant
│   │   ├── ProjectStories1-5/   # Project story variants
│   │   └── ...SVG assets
│   ├── App.tsx                 # Main app routing
│   ├── main.tsx                # React entry point
│   ├── index.css               # Global styles with Tailwind
│   ├── data.ts                 # Data constants
│   └── vite-env.d.ts           # Vite environment types
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── .mise.toml                  # Toolchain versions
├── index.html                  # HTML shell
└── README.md                   # Project documentation

## Key Dependencies
- **React 19** - UI framework
- **Vite 8** - Build tool
- **Tailwind CSS v4** - Styling
- **Motion** - Animations
- **React Router v7** - Navigation
- **Font Awesome** - Icon library

## Component Breakdown

### Hero Component (`src/components/Hero.tsx`)
**Features:**
- AnimatedTitle: Cycles through 4 titles with typing effect
- Character-level purple highlighting for key phrases
- Experience & availability badges
- CTA buttons with hover animations
- Exit animations on navigation
- Responsive grid layout

**Key Props:** None (uses React Router hooks)

**Exports:**
- AnimatedTitle (internal)
- CtaButton (internal)
- Hero (default - homepage)

## Styling Conventions
- **Tailwind CSS v4** for all utilities
- **Motion** library for animations
- **CSS Variables** for theming (brand, lilac, muted, etc.)
- **Responsive**: Mobile-first with `lg:` breakpoints

## Git Recommendations
```bash
# Add backup directory to version control
git add .backups/

# Commit with message
git commit -m "feat: backup Hero component with full animations and features"
````

## Next Steps

1. ✅ Backup created
2. ✅ Project structure documented
3. → Create remaining page components (Projects, About, Contact)
4. → Set up proper routing in App.tsx
5. → Add page transitions and exit animations
