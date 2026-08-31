# RAS Training Hub — Dashboard Shell (Sprint 1, UI)

> **Ticket:** `[Sprint 1][UI] Build learner and manager dashboard shell using React`
> This is the **frontend shell** for the Associate and Manager personas, built with **React + TypeScript + Vite + React Router**.

---

## 🧭 What this is (in plain English)

This project builds the **skeleton** of the training-hub website: the header, the
left-hand menu, the page layouts, and empty "placeholder" pages. The heavy AI
features (skill-gap maths, RAG search, simulation scoring, login) are **out of
scope** — they are separate tickets owned by other teammates. My job is to make
the shell look good, switch cleanly between the two personas, and be ready for
those features to plug in later.

---

## ✅ How to run it (step by step)

You need **Node.js 18 or newer** installed. Then, in a terminal:

```bash
# 1. Go into the project folder
cd ras-dashboard

# 2. Install the libraries (one-time, needs internet)
npm install

# 3. Start the dev server
npm run dev
```

Now open the URL it prints (usually **http://localhost:5173**) in your browser. 🎉

To run the tests:

```bash
npm test
```

To create a production build:

```bash
npm run build
```

---

## 🗂 Folder structure (and why)

The ticket asked for a specific structure — here's where everything lives:

```
src/
├── api/          → all network calls (client, health, profile) + useProfile hook
├── models/       → shared TypeScript types (one source of truth)
├── components/   → reusable UI: layout (header/sidebar), states, cards
├── context/      → PersonaContext (tracks associate vs. manager)
├── data/         → typed MOCK personas (no real/confidential data)
├── routes/       → routeConfig (persona access) + all the pages
└── test/         → Vitest tests
```

- **API calls stay in `src/api`** ✔
- **Shared types stay in `src/models`** ✔
- **Reusable components stay in `src/components`** ✔
- **Routes use a config for persona access** (`src/routes/routeConfig.tsx`) ✔

---

## 🎯 How each acceptance criterion is met

| Acceptance criterion | Where it's done |
|---|---|
| Learner & Manager layouts available | `components/layout/AppLayout.tsx` (+ persona-based sidebar) |
| Navigation changes by persona | `routeConfig.tsx` → `routesForRole()` used by `Sidebar.tsx` |
| All placeholder routes work | `App.tsx` defines every route |
| Learner dashboard: profile/skills/learning/cert/progress placeholders | `pages/DashboardPage.tsx` |
| Manager dashboard: team-development placeholders | `pages/ManagerDashboardPage.tsx` |
| Loading / empty / error / success states shown | `components/states/*` used across pages |
| FastAPI health status displayed | `components/HealthBadge.tsx` + `api/health.ts` |
| Responsive & keyboard-accessible navigation | `index.css` (mobile sidebar) + real `<a>`/focus styles |
| Frontend tests pass | `src/test/*.test.tsx` (run `npm test`) |

---

## 🔒 Safety rules followed (from the ticket)

- The browser **never** calls Azure or AI services directly — all calls go
  through `src/api` to our own FastAPI backend (`/api/...`).
- **No secrets** are stored in the frontend.
- **No client, engagement, or confidential data** — only typed mock personas.

---

## 🔌 Connecting to the real backend later

Right now `api/profile.ts` returns mock data. When the FastAPI `/profile`
endpoint is ready, swap the mock line for:

```ts
return apiGet<Persona>("/profile");
```

The Vite dev server already proxies `/api` to `http://127.0.0.1:8000`, so no
other change is needed.

---

*Built for the AI Spark hackathon — RAS: AI-Powered Training & Development Hub.*
