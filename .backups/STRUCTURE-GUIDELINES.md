# Project Structure Guidelines & Best Practices

## Directory Organization

### `/src` Structure

```
src/
├── components/           # Reusable React components
│   ├── Hero.tsx         # Homepage hero section
│   ├── ProjectStories.tsx
│   ├── Visuals.tsx
│   └── ...
├── pages/               # (Future) Page-level components
├── hooks/               # (Future) Custom React hooks
├── utils/               # (Future) Utility functions
├── types/               # (Future) TypeScript type definitions
├── styles/              # Global styles
│   └── index.css
├── data/                # (Future) Static data & constants
│   └── data.ts
├── imports/             # Figma-generated components (auto-imported)
├── App.tsx              # Root app component with routing
├── main.tsx             # React entry point
└── vite-env.d.ts        # Vite type definitions
```

## Naming Conventions

### Files

- **Components**: PascalCase (e.g., `Hero.tsx`, `ProjectStories.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useNavigation.ts`)
- **Utils**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `Project.ts`)
- **Constants**: UPPER_SNAKE_CASE in data files

### Component Exports

- **Default export** for main component
- Named exports for internal sub-components if reusable
- Keep internal helpers as non-exported functions

## Code Quality Standards

### Imports Organization

1. External libraries (React, motion, etc.)
2. Router libraries
3. State management
4. Internal components
5. Assets/images

### Function Organization

- Utility functions first
- Sub-components second
- Main component last (default export)

### Tailwind CSS Guidelines

- Use `clamp()` for responsive sizing
- Use `@` alias for imports (configured in vite.config.ts)
- Prefer utility classes over custom CSS
- Use CSS variables for theme colors

## Example: Proper Component Structure

```typescript
// Imports (organized)
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import heroImage from "@/imports/Main/image.png";

// Helper components (non-exported)
function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className}>
      {/* SVG content */}
    </svg>
  );
}

// Sub-components (exported if needed elsewhere)
export function AnimatedTitle() {
  // Implementation
}

// Main component (default export)
export default function Hero() {
  // Implementation
}
```

## TypeScript Best Practices

- Always define prop types for components
- Use `React.FC<Props>` or function signatures
- Avoid `any` type - use proper typing
- Define interfaces for complex objects

## Testing Structure (Future)

```
src/
├── __tests__/
│   ├── components/
│   │   └── Hero.test.tsx
│   └── utils/
│       └── helpers.test.ts
```

## Environment Configuration

- `.env.local` - Local environment variables (gitignored)
- `.env.example` - Template for env variables
- Use `import.meta.env` for Vite env variables

## Asset Management

- Images: `/src/imports/` (auto-imported from Figma)
- SVG icons: Font Awesome library
- Custom SVGs: Can be imported as React components using Vite plugin

## Documentation Files

- `README.md` - Project overview
- `STRUCTURE.md` - This file
- Component JSDoc comments for public APIs

## Version Control

### .gitignore Essentials

```
node_modules/
dist/
.env.local
.DS_Store
*.log
.turbo/
```

### Commit Conventions

```
feat: add new feature
fix: fix a bug
refactor: refactor code
docs: update documentation
style: formatting changes
chore: dependencies, tooling
```

## Performance Optimization

- Lazy load routes when applicable
- Memoize expensive computations with `useMemo`
- Use `React.memo()` for frequently re-rendering components
- Optimize images before importing

## Accessibility (A11y)

- All interactive elements must be keyboard accessible
- Use semantic HTML when possible
- Include proper `alt` text for images
- Ensure sufficient color contrast
