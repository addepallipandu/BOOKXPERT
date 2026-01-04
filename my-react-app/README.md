# my-react-app

This folder is the main React + TypeScript application for the BOOKXPERT assignment. It uses Vite as the build tool and Tailwind CSS for styling. The app includes a dashboard-style UI, auth context, and several feature pages (employees, dashboard, login).

Quick start
-----------

Requirements:
- Node.js v16+ (LTS recommended)

Install and run:

```powershell
cd my-react-app
npm install
npm run dev
```

Production build and preview:

```powershell
npm run build
npm run preview
```

Available scripts (from `package.json`):
- `dev` — start Vite dev server
- `build` — build for production
- `build:dev` — build using development mode
- `preview` — preview production build locally
- `lint` — run ESLint across the codebase

Key files
---------
- `vite.config.ts` — Vite configuration
- `tailwind.config.ts` — Tailwind setup
- `tsconfig.app.json`, `tsconfig.json` — TypeScript configs
- `src/main.tsx` — app bootstrap
- `src/App.tsx` — routes and layout

Source organization
-------------------
- `src/components/` — UI building blocks and feature components
- `src/components/ui/` — design-system-style primitives (buttons, cards, dialogs)
- `src/pages/` — route-level pages (Dashboard, Employees, Login, NotFound)
- `src/contexts/` — `AuthContext` and related providers
- `src/hooks/` — reusable hooks (auth, employees, toast)
- `src/lib/` — utilities
- `src/utils/` — storage helpers

Dependencies summary
--------------------
This app uses Radix UI primitives, `react-router-dom`, `react-hook-form`, `@tanstack/react-query`, Tailwind CSS and several utility libraries. See `package.json` for the full list.

Notes & suggestions
-------------------
- Linting: run `npm run lint` and fix issues before commits.
- If you plan to use `bun` or `pnpm`, adjust install commands accordingly.

Need changes?
------------
I can update `package.json` metadata (name, version, description), add CI instructions, or scaffold a `CONTRIBUTING.md` and `CHANGELOG.md`. Tell me which you'd like next.
