// ---------------------------------------------------------------------------
// Tiny fetch wrapper. All network calls go through here so we have one place
// to add headers, handle errors, and (later) attach auth tokens.
//
// IMPORTANT (per coding instructions):
//   - The browser only ever talks to our own FastAPI backend (/api/...).
//   - It NEVER calls Azure or AI services directly.
//   - No secrets are stored in the frontend.
// ---------------------------------------------------------------------------

// Base URL for the backend. In dev, Vite proxies "/api" to FastAPI.
const BASE_URL = "/api";

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${path}`);
  }

  return (await response.json()) as T;
}
