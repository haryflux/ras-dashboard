import type { HealthStatus } from "../models";
import { apiGet } from "./client";

// ---------------------------------------------------------------------------
// Calls the FastAPI /health endpoint and returns its status.
//
// If the backend isn't running yet (very likely early in the hackathon), we
// don't crash the UI - we fall back to a "down" status so the header can show
// a friendly red dot instead of a broken page.
// ---------------------------------------------------------------------------

export async function getHealth(): Promise<HealthStatus> {
  try {
    return await apiGet<HealthStatus>("/health");
  } catch {
    return {
      status: "down",
      service: "FastAPI backend",
      time: new Date().toISOString(),
    };
  }
}
