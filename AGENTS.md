# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

Full map with editing how-tos: `PROJECT_STRUCTURE.md`. Keep to it when adding files.

- `src/main.tsx` - React entrypoint; imports `src/styles/index.css` and mounts `src/App.tsx`
- `src/App.tsx` - All routes (address → page)
- `src/pages/` - One file per page; `src/pages/projects/` holds each project's case study
- `src/components/` - Reusable pieces (project banner/frame `ProjectContent.tsx`, mockups, contact drawer, carousels)
- `src/data/` - Editable content: `projects.ts`, `projectThemes.ts`, `about.ts`
- `src/styles/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `src/lib/` - Helpers without UI (transitions, analytics)
- `src/assets/images|videos/<page-or-project>/` - All media, imported from code; lowercase-hyphen names
- `public/prototypes/` - Static HTML prototypes reached by URL
- `index.html`, `package.json`, `vite.config.ts`, `.mise.toml` - Shell, scripts, build config, toolchain

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/styles/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/styles/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/styles/index.css`, so global font wiring belongs there. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
