import { useCallback, useEffect, useState } from "react";
import type { Persona } from "../models";
import { usePersona } from "../context/PersonaContext";
import { getProfile } from "./profile";

// ---------------------------------------------------------------------------
// Custom hook that loads the current persona's profile and exposes the three
// UI states pages care about: data, loading, and error (plus a reload fn).
// Reusing this hook keeps every page consistent.
// ---------------------------------------------------------------------------

export function useProfile() {
  const { role } = usePersona();
  const [data, setData] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const profile = await getProfile(role);
      setData(profile);
    } catch {
      setError("Could not load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
