import type { Persona } from "../models";

// ---------------------------------------------------------------------------
// Typed MOCK data only. No real, confidential, or client information here.
// This lets us build and demo the UI before the real APIs are ready.
// ---------------------------------------------------------------------------

export const associatePersona: Persona = {
  id: "assoc-001",
  name: "Karthik R.",
  role: "associate",
  jobTitle: "Analyst",
  serviceArea: "Technology Assurance (SOC / HITRUST / IT Audit)",
  experienceLevel: "New Hire",
  cpeHours: 12,
  cpeTarget: 40,
  skills: [
    { name: "SOC Walkthroughs", currentLevel: 40, targetLevel: 80 },
    { name: "Sampling", currentLevel: 30, targetLevel: 75 },
    { name: "Policy Testing", currentLevel: 55, targetLevel: 80 },
    { name: "Documentation Quality", currentLevel: 60, targetLevel: 85 },
  ],
  certifications: [
    { name: "CISA (concepts)", status: "not-started" },
    { name: "HITRUST Fundamentals", status: "in-progress", dueDate: "2026-12-01" },
  ],
  learning: [
    { title: "SOC Module 1 - Introduction", source: "SharePoint", progress: 100 },
    { title: "SOC Module 2 - Audit Activities", source: "SharePoint", progress: 45 },
    { title: "Prompt Engineering Basics", source: "LinkedIn Learning", progress: 0 },
  ],
};

export const managerPersona: Persona = {
  id: "mgr-001",
  name: "Labeeb A.",
  role: "manager",
  jobTitle: "Assistant Manager",
  serviceArea: "Technology Assurance (SOC / HITRUST / IT Audit)",
  experienceLevel: "Manager",
  cpeHours: 28,
  cpeTarget: 40,
  skills: [
    { name: "Engagement Review", currentLevel: 85, targetLevel: 90 },
    { name: "Team Coaching", currentLevel: 70, targetLevel: 85 },
  ],
  certifications: [{ name: "CISA", status: "completed" }],
  learning: [
    { title: "Leading Audit Teams", source: "LinkedIn Learning", progress: 60 },
  ],
};

// Simple lookup used by the mock API layer.
export const personasByRole = {
  associate: associatePersona,
  manager: managerPersona,
};
