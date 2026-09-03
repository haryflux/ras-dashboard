import type { Persona, PersonaRole } from "../models";
import { personasByRole } from "../data/mockPersonas";
import { getCurrentUserName } from "./currentUser";

export async function getProfile(role: PersonaRole): Promise<Persona> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const persona = personasByRole[role];
  const displayName = getCurrentUserName(role);
  return { ...persona, name: displayName };
}