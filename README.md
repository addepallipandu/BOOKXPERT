# BOOKXPERT

BOOKXPERT is a frontend assignment project that demonstrates a React + TypeScript application scaffolded with Vite, Tailwind CSS, and a component library. The main application lives in the `my-react-app` folder.

**Quick summary:** This repo contains a production-ready React app (TypeScript, Vite) with a components folder, auth context, hooks, and pages for a small admin/dashboard style interface.

**Tech stack:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI primitives
- React Router
- React Hook Form

**Repository layout (important paths):**
- Root: this file and repo-level metadata
- `my-react-app/`: main application
	- `package.json`, `vite.config.ts`, `tailwind.config.ts`
	- `src/`: application source
		- `components/`: shared UI components
		- `contexts/`, `hooks/`, `pages/`, `utils/`, `types/`

Getting started
---------------

Requirements:
- Node.js (v16+ recommended)
- npm, pnpm or yarn (examples use `npm`)

Install and run locally:

```powershell
cd my-react-app
npm install
npm run dev
```

Available scripts (in `my-react-app/package.json`):
- `dev`: start Vite dev server
- `build`: production build (`vite build`)
- `build:dev`: build in development mode
- `preview`: locally preview the production build
- `lint`: run ESLint

Project structure (high level)
- `src/main.tsx` — app entry
- `src/App.tsx` — top-level router and layout
- `src/pages/` — route pages (Dashboard, Employees, Login, etc.)
- `src/components/` — UI primitives and feature components
- `src/hooks/` — custom hooks (auth, employees, toasts)

Notes for development
---------------------
- Tailwind is already configured (`tailwind.config.ts`) and used in `src/index.css`.
- Vite handles HMR; use `npm run dev` for fast iteration.
- The UI relies on Radix primitives and a number of small components in `src/components/ui/`.

Contributing
------------
- Make branches off `main` (or however you manage branches).
- Run linters before opening PRs: from `my-react-app` run `npm run lint`.

License & contact
-----------------
If this is an assignment repository, check licensing guidance from the maintainer. For questions, open an issue or contact the repository owner.

----

If you'd like, I can also:
- run `npm install` and start the dev server,
- update package metadata (name/description) in `my-react-app/package.json`, or
- add a small CONTRIBUTING.md — tell me which you'd prefer.
