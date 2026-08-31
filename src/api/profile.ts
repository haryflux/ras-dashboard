import type { Persona, PersonaRole } from "../models";
import { personasByRole } from "../data/mockPersonas";

// ---------------------------------------------------------------------------
// Profile API.
//
// For now this returns typed MOCK data with a small artificial delay so we can
// realistically show loading / error states in the UI. When the real backend
// is ready, we simply swap the body for `apiGet<Persona>("/profile")`.
// ---------------------------------------------------------------------------

export async function getProfile(role: PersonaRole): Promise<Persona> {
  // Simulate a network round-trip so the loading spinner is visible.
  await new Promise((resolve) => setTimeout(resolve, 600));
  return personasByRole[role];
}
