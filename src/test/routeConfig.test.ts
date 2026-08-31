import { describe, it, expect } from "vitest";
import { routesForRole } from "../routes/routeConfig";

// ---------------------------------------------------------------------------
// These tests prove that navigation changes based on the selected persona -
// one of the key acceptance criteria for this ticket.
// ---------------------------------------------------------------------------

describe("routesForRole (persona-based navigation)", () => {
  it("gives associates their learning-focused routes", () => {
    const paths = routesForRole("associate").map((r) => r.path);
    expect(paths).toContain("dashboard");
    expect(paths).toContain("skills");
    expect(paths).toContain("assistant");
    // Associates should NOT see manager-only routes.
    expect(paths).not.toContain("team-skills");
    expect(paths).not.toContain("assessments");
  });

  it("gives managers their team-focused routes", () => {
    const paths = routesForRole("manager").map((r) => r.path);
    expect(paths).toContain("dashboard");
    expect(paths).toContain("team-skills");
    expect(paths).toContain("assessments");
    // Managers should NOT see individual associate learning pages.
    expect(paths).not.toContain("assistant");
    expect(paths).not.toContain("simulations");
  });
});
