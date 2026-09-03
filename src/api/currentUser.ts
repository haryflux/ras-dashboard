import type { PersonaRole } from "../models";
import { personasByRole } from "../data/mockPersonas";

// Single source of truth for "what name should we show for this person?"
// Both the header AND the profile page call this, so they can never
// disagree again. If the user typed an email at login, we use that name.
// Otherwise we fall back to the mock persona's own name for that role.
export function getCurrentUserName(role: PersonaRole): string {
  const stored =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("ras_user_name")
      : null;
  if (stored) return stored;
  return personasByRole[role].name;
}