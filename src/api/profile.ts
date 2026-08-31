import type { Persona, PersonaRole } from "../models";
import { personasByRole } from "../data/mockPersonas";

// ---------------------------------------------------------------------------
// Profile API (mock).
//
// Returns typed MOCK data with a small delay so loading states are visible.
// If the user signed in with an email, we saved a display name in
// localStorage (see Login.tsx) — we use it here so the associate dashboard
// greets the REAL user instead of the placeholder name. This also survives a
// page refresh because localStorage persists.
//
// When the real backend is ready, replace the body with:
//   return apiGet<Persona>("/profile");
// ---------------------------------------------------------------------------

export async function getProfile(role: PersonaRole): Promise<Persona> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const persona = personasByRole[role];

  // Personalize the associate's name from the login step, if available.
  const storedName =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("ras_user_name")
      : null;

  if (role === "associate" && storedName) {
    return { ...persona, name: storedName };
  }

  return persona;
}
