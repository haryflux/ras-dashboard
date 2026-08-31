import type { PersonaRole } from "../models";

// ---------------------------------------------------------------------------
// Central route configuration. Instead of scattering routes everywhere, we
// declare them here as data. Each route knows which personas can see it, which
// is how we control persona access (an acceptance criterion / coding rule).
// ---------------------------------------------------------------------------

export interface AppRoute {
  // URL path segment, e.g. "skills" -> /associate/skills
  path: string;
  // Text shown in the sidebar.
  label: string;
  // Simple emoji icon (keeps things dependency-free for the shell).
  icon: string;
  // Which personas are allowed to see this route.
  roles: PersonaRole[];
}

// The order here is the order shown in the sidebar.
export const appRoutes: AppRoute[] = [
  { path: "dashboard", label: "Dashboard", icon: "🏠", roles: ["associate", "manager"] },
  { path: "profile", label: "My Profile", icon: "👤", roles: ["associate"] },
  { path: "skills", label: "Skill Center", icon: "🎯", roles: ["associate"] },
  { path: "learning", label: "Learning Hub", icon: "📚", roles: ["associate"] },
  { path: "assistant", label: "Knowledge Assistant", icon: "💬", roles: ["associate"] },
  { path: "simulations", label: "Simulations", icon: "🧪", roles: ["associate"] },
  { path: "certifications", label: "Certifications", icon: "🏅", roles: ["associate", "manager"] },
  { path: "progress", label: "Progress", icon: "📈", roles: ["associate"] },
  // Manager-only routes
  { path: "team-skills", label: "Team Skills", icon: "🧭", roles: ["manager"] },
  { path: "team-progress", label: "Team Progress", icon: "📊", roles: ["manager"] },
  { path: "assessments", label: "Assessments", icon: "📝", roles: ["manager"] },
];

// Helper: given a persona, return only the routes they are allowed to see.
export function routesForRole(role: PersonaRole): AppRoute[] {
  return appRoutes.filter((route) => route.roles.includes(role));
}
