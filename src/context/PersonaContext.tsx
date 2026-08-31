import { createContext, useContext, useState, type ReactNode } from "react";
import type { PersonaRole } from "../models";

// ---------------------------------------------------------------------------
// PersonaContext lets ANY component know which persona (associate / manager)
// is currently selected, and switch between them. This is what makes the
// navigation change based on the selected persona (an acceptance criterion).
// ---------------------------------------------------------------------------

interface PersonaContextValue {
  role: PersonaRole;
  setRole: (role: PersonaRole) => void;
}

const PersonaContext = createContext<PersonaContextValue | undefined>(undefined);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<PersonaRole>("associate");
  return (
    <PersonaContext.Provider value={{ role, setRole }}>
      {children}
    </PersonaContext.Provider>
  );
}

// Small custom hook so components can do: const { role, setRole } = usePersona();
export function usePersona(): PersonaContextValue {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error("usePersona must be used inside a PersonaProvider");
  }
  return context;
}
