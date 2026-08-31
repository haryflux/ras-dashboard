<h1 align="center">🎓 RAS Training Hub</h1>

<p align="center">
  <b>An AI-powered training & development experience for the Risk Advisory Services team.</b><br>
  Personalized learning paths · skill-gap insights · certification tracking · manager readiness views.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white">
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-6-CA4245?logo=reactrouter&logoColor=white">
  <img alt="Status" src="https://img.shields.io/badge/Sprint_1-UI_Shell-7c5cff">
</p>

---

## 👋 Start here

Hey — thanks for checking out this repo!

This is the **frontend** for the RAS Training Hub: the part people actually see and click. It's a dark, modern web app where an associate signs in, tells us a bit about themselves, and lands on a personalized dashboard. Managers get their own view to keep an eye on the team.

If you've never run a web project before, don't worry — I wrote the setup steps assuming **zero prior experience**. If you get stuck, jump to the [Troubleshooting](#-when-things-go-wrong) section; I hit most of those snags myself while building this. 🙂

---

## ✨ What's inside

This isn't just empty screens — it's a full, clickable journey:

| Screen | What happens there |
|---|---|
| 🔐 **Login** | Sign in with SSO or a work email. Your name is picked up from the email and used across the app. |
| 🧭 **Onboarding** | A friendly 5-step wizard that builds your learning profile (role, skills, goals, learning style). |
| 🏠 **Associate Dashboard** | Donut charts for skill readiness, learning progress & CPE hours, plus recommendations and a skill snapshot. |
| 👥 **Manager Dashboard** | Team readiness bars, "needs your attention" alerts, team skill-gap heatmap, and team donut charts. |
| 🎯 **Skill Center / Learning / Certifications / Progress** | Filled, styled pages showing skills, courses, certs, and CPE tracking. |
| 💬 **Knowledge Assistant** | The shell for the future AI Q&A chat (the AI itself is a separate ticket). |

> 🎨 The whole thing shares one cohesive **dark theme** — login, onboarding, and both dashboards all speak the same visual language.

---

## 🚀 Run it on your computer (beginner-friendly)

### Step 0 — Install Node.js (only once, ever)

This project runs on **Node.js**. To check if you already have it, open a terminal (PowerShell on Windows) and type:

```bash
node -v
```

- If you see a version like `v20.11.0`, you're good — skip to Step 1.
- If it says *"not recognized"*, download the **LTS** version from **[nodejs.org](https://nodejs.org)**, install it, then **close and reopen your terminal**.

> 💡 On a locked-down work laptop that blocks installers? You can run the whole project in your browser instead — see [Run it online](#-run-it-online-no-install) below.

### Step 1 — Get the code

```bash
git clone https://github.com/haryflux/ras-dashboard.git
cd ras-dashboard
```

### Step 2 — Install the libraries (one time)

```bash
npm install
```

This downloads everything the app needs. It takes a minute or two the first time — grab a coffee. ☕

### Step 3 — Start it

```bash
npm run dev
```

You'll see a line like `Local: http://localhost:5173/`. Open that link in your browser and you're in! 🎉

---

## 🌐 Run it online (no install)

Can't install anything locally? No problem. Open this link and it runs entirely in your browser:

```
https://stackblitz.com/github/haryflux/ras-dashboard
```

Give it about a minute to boot and install, and the app appears in the preview panel. Great for a quick demo, too.

---

## 🕹️ Try these first

Once it's running:

1. **Sign in** with any work-style email like `yourname@wipfli.com` — notice your name shows up on the dashboard.
2. **Walk the onboarding** — click through all 5 steps to the profile summary.
3. **Flip the persona switch** (top-right dropdown) between **Associate** and **Manager** and watch the whole app change.
4. **Resize the window** narrow — the sidebar collapses into a mobile menu. 📱

> ℹ️ You'll see a red **"API Offline"** badge in the header. That's expected and correct — there's no backend running yet. It turns green automatically once the FastAPI service is connected.

---

## 🗂 How the project is organized

If you want to poke around the code, here's the map:

```
src/
├── api/          →  talking to the backend (health, profile) + a small data hook
├── models/       →  shared TypeScript types — one source of truth
├── data/         →  mock people/data for the demo (no real info, ever)
├── context/      →  remembers which persona is selected
├── components/   →  reusable building blocks (header, sidebar, cards, charts, states)
├── routes/       →  the route list + every page
└── test/         →  automated tests
```

A few conventions worth knowing:

- **Anything that talks to the network lives in `src/api`.** Pages never call the internet directly.
- **Reusable pieces live in `src/components`** so we don't rewrite the same button twice.
- **Which pages a persona can see is decided in `src/routes/routeConfig.tsx`** — change it there, and the sidebar updates itself.

---

## 🧪 Running the tests

```bash
npm test
```

The tests confirm the important stuff: the app boots, the right menu shows for each persona, unknown URLs show a 404, and the health badge renders.

---

## 🔒 Ground rules I followed

This app was built to be safe to share from day one:

- 🚫 **No client or engagement data** — everything on screen is realistic *mock* data.
- 🔑 **No secrets in the browser** — no API keys, no tokens baked into the frontend.
- 🛡️ **No direct calls to AI/cloud from the browser** — those go through our own backend later.

---

## 🔌 Wiring up the real backend (for whoever picks this up next)

Right now `src/api/profile.ts` returns mock data so the UI works standalone. When the FastAPI `/profile` endpoint is ready, it's basically a one-line swap:

```ts
// from mock…
return personasByRole[role];

// …to real
return apiGet<Persona>("/profile");
```

The dev server already forwards `/api` requests to `http://127.0.0.1:8000`, so once the backend is up, the frontend just starts getting real answers. No rewrite needed.

---

## 🧰 Built with

- **React + TypeScript** — the UI and type safety
- **Vite** — lightning-fast dev server & build
- **React Router** — page navigation and persona routing
- **Vitest + Testing Library** — the automated tests
- **Plain CSS** — a custom dark theme (no heavy UI library, keeps it light)

---

## 🆘 When things go wrong

Real talk — here are the exact issues I ran into, and the fixes:

| Symptom | What's actually happening | Fix |
|---|---|---|
| `npm: not recognized` | Node.js isn't installed (or terminal wasn't restarted) | Install Node LTS, **reopen the terminal** |
| Blank white screen | A file didn't load / a folder is empty | Make sure the whole `src/` folder is present; check the browser console (F12) |
| `Cannot find module './Donut'` | A component file is missing or in the wrong folder | Confirm `src/components/Donut.tsx` exists |
| Red **API Offline** badge | No backend running | This is **normal** — ignore it for now |
| Dashboard stays after refresh | That's correct — the URL is the dashboard | Use the **Log out** button to return to login |

---

## 🗺️ What's next (other tickets)

This shell is intentionally ready for these to plug in:

- 🔐 Real SSO / Entra ID sign-in
- 🧠 Skill-gap calculation engine
- 🔎 RAG-powered Knowledge Assistant
- 🧪 Simulation generation + AI scoring
- 📊 Final reporting & analytics

---

<p align="center">
  <sub>Built with care for the <b>AI Spark hackathon</b> · RAS: AI-Powered Training & Development Hub</sub>
</p>
