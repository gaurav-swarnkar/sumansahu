# Development Guide

## Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Format code with oxfmt
pnpm format
```

## Development Server

- **URL**: `http://localhost:8443`
- **Hot Reload**: Enabled by default
- **Host**: Configured to `0.0.0.0` for external access

## Available Routes

- `/` - Homepage (Hero component)
- `/projects` - Project stories showcase
- `/about` - My Journey (TBD)
- `/contact` - Let's Connect (TBD)

## Tech Stack

### Core

- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Vite 8** - Build tool and dev server

### Styling

- **Tailwind CSS v4** - Utility-first CSS
- **@tailwindcss/vite** - Vite integration

### Animation & Interaction

- **Motion** (Framer Motion fork) - Smooth animations
- **React Router v7** - Client-side routing

### Icons

- **Font Awesome 7.3** - Icon library
  - `@fortawesome/react-fontawesome` - React component
  - `@fortawesome/fontawesome-svg-core` - Core library
  - `@fortawesome/free-solid-svg-icons` - Solid icons

### Development Tools

- **oxfmt** - Code formatter
- **Mise** - Toolchain version manager

## Key Files Reference

| File                      | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| `vite.config.ts`          | Vite configuration with React & Tailwind plugins |
| `tsconfig.json`           | TypeScript compiler options                      |
| `.mise.toml`              | Node.js and pnpm version pinning                 |
| `src/index.css`           | Global styles & Tailwind imports                 |
| `src/main.tsx`            | React app entry point                            |
| `src/App.tsx`             | Root app component with routing                  |
| `src/components/Hero.tsx` | Homepage component                               |
| `index.html`              | HTML template with `#root` mount point           |

## Common Tasks

### Adding a New Page Component

```typescript
// 1. Create file: src/components/YourPage.tsx
import { motion } from "motion/react";

export default function YourPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Your content */}
    </motion.div>
  );
}

// 2. Add route to App.tsx
<Route path="/your-page" element={<YourPage />} />
```

### Adding a New Font Awesome Icon

```typescript
// 1. Import icon
import { faIconName } from "@fortawesome/free-solid-svg-icons";

// 2. Use component
<FontAwesomeIcon icon={faIconName} className="text-brand text-lg" />
```

### Using Tailwind Classes

```typescript
// Responsive sizing
className = "text-[clamp(36px,5vw,70px)]";

// Color with opacity
className = "bg-brand/15 text-ink-soft";

// Animations
className = "transition-all duration-500 ease-out";

// Hover states
className = "group-hover:opacity-100";
```

## Git Workflow

### Before Committing

```bash
# Format code
pnpm format

# Check for TypeScript errors
# (Use VS Code interface or build locally)
```

### Commit Message Examples

```
feat: add animated title component to hero section
fix: correct animation timing on button hover
refactor: extract button component logic
docs: update development guide
chore: upgrade dependencies
```

## Debugging Tips

### Common Issues

**1. Animations not working**

- Check if component is wrapped with `motion.div`
- Verify animate/initial props are set correctly
- Ensure `duration` is in milliseconds

**2. Tailwind classes not applying**

- Restart dev server after adding new classes
- Check if class is in `src/index.css` via `@tailwindcss`
- Verify class name syntax (e.g., `right-[44px]`)

**3. Type errors in TypeScript**

- Add proper prop types to components
- Use `React.FC<Props>` for component typing
- Import types explicitly when needed

### Useful Browser DevTools

- Check computed styles for Tailwind classes
- Inspect motion library animations in performance tab
- Use React DevTools to check component props

## Environment Variables

Create `.env.local` for local development:

```
# API endpoints (if needed)
VITE_API_URL=http://localhost:3000

# Feature flags
VITE_ENABLE_ANALYTICS=false
```

Access in code with:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Checklist

- [ ] Images are optimized before import
- [ ] Animations use GPU-accelerated properties (transform, opacity)
- [ ] Large lists use React.memo or virtualization
- [ ] Unused dependencies are removed
- [ ] Bundle size is monitored

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Motion Documentation](https://motion.dev)
- [React Router Documentation](https://reactrouter.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Documentation](https://vitejs.dev)

## Support

For issues or questions, refer to:

1. Component backup: `.backups/HERO-BACKUP-20260831.tsx`
2. Structure guide: `.backups/STRUCTURE-GUIDELINES.md`
3. Project overview: `.backups/PROJECT-STRUCTURE.md`
