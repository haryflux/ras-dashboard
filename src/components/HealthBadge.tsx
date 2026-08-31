import { useEffect, useState } from "react";
import type { HealthStatus } from "../models";
import { getHealth } from "../api/health";

// ---------------------------------------------------------------------------
// Small badge in the header that shows whether the FastAPI backend is up.
// Satisfies the acceptance criterion: "FastAPI health status is displayed."
// ---------------------------------------------------------------------------

const COLORS: Record<HealthStatus["status"], string> = {
  ok: "#2e9e5b",
  degraded: "#e0a100",
  down: "#d0433f",
};

const LABELS: Record<HealthStatus["status"], string> = {
  ok: "API Online",
  degraded: "API Degraded",
  down: "API Offline",
};

export function HealthBadge() {
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    // Check once on load, then poll every 15 seconds.
    let active = true;
    const check = async () => {
      const result = await getHealth();
      if (active) setHealth(result);
    };
    check();
    const timer = setInterval(check, 15000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  const status = health?.status ?? "down";

  return (
    <div className="health-badge" title={`Backend: ${LABELS[status]}`}>
      <span
        className="health-badge__dot"
        style={{ backgroundColor: COLORS[status] }}
        aria-hidden="true"
      />
      <span className="health-badge__label">{LABELS[status]}</span>
    </div>
  );
}
