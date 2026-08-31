// ---------------------------------------------------------------------------
// Shared TypeScript types for the whole app live here (src/models).
// Keeping types in one place means every component speaks the same language.
// ---------------------------------------------------------------------------

// The two kinds of users our dashboard supports.
export type PersonaRole = "associate" | "manager";

// A single skill and how proficient the user is at it.
export interface Skill {
  name: string;
  // Where they are now vs. what their role expects (0-100).
  currentLevel: number;
  targetLevel: number;
}

// A certification the user holds or is working toward.
export interface Certification {
  name: string;
  status: "completed" | "in-progress" | "not-started";
  // Optional renewal/target date shown in the UI.
  dueDate?: string;
}

// A recommended or in-progress learning item.
export interface LearningItem {
  title: string;
  source: string; // e.g. "SOC Module 1", "LinkedIn Learning"
  progress: number; // 0-100
}

// The full profile object returned by the backend (mocked for now).
export interface Persona {
  id: string;
  name: string;
  role: PersonaRole;
  jobTitle: string;
  serviceArea: string;
  experienceLevel: string;
  cpeHours: number; // hours earned toward the 40-hour requirement
  cpeTarget: number;
  skills: Skill[];
  certifications: Certification[];
  learning: LearningItem[];
}

// Health check response from the FastAPI backend.
export interface HealthStatus {
  status: "ok" | "degraded" | "down";
  service: string;
  time: string;
}
