import { useProfile } from "../../api/useProfile";
import { usePersona } from "../../context/PersonaContext";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";
import { ManagerDashboardPage } from "./ManagerDashboardPage";

// ---------------------------------------------------------------------------
// The Dashboard route. It shows a different layout depending on persona:
//   - Associate: welcome + skill/learning/cert/progress placeholder cards
//   - Manager:   delegates to the manager team-development dashboard
// This demonstrates loading + error states using real (mock) data.
// ---------------------------------------------------------------------------

export function DashboardPage() {
  const { role } = usePersona();
  const { data, loading, error, reload } = useProfile();

  // Managers get their own team-focused dashboard.
  if (role === "manager") {
    return <ManagerDashboardPage />;
  }

  if (loading) return <LoadingState message="Loading your dashboard..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  const cpePct = Math.round((data.cpeHours / data.cpeTarget) * 100);

  return (
    <div className="page">
      <div className="page__head">
        <h1>Welcome back, {data.name.split(" ")[0]} 👋</h1>
        <p className="page__subtitle">
          {data.jobTitle} · {data.serviceArea} · {data.experienceLevel}
        </p>
      </div>

      {/* Top summary row */}
      <div className="grid grid--3">
        <PlaceholderCard title="Skill Score & Gaps" icon="🎯" badge="Live">
          <p className="metric">
            {data.skills.length}
            <span> skills tracked</span>
          </p>
          <p className="card__hint">
            Detailed gap analysis arrives in a later ticket.
          </p>
        </PlaceholderCard>

        <PlaceholderCard title="Learning Progress" icon="📚">
          <p className="metric">
            {data.learning.filter((l) => l.progress === 100).length}
            <span> / {data.learning.length} complete</span>
          </p>
        </PlaceholderCard>

        <PlaceholderCard title="Certifications Status" icon="🏅">
          <p className="metric">
            {data.certifications.filter((c) => c.status === "completed").length}
            <span> / {data.certifications.length} earned</span>
          </p>
        </PlaceholderCard>
      </div>

      {/* CPE progress bar */}
      <PlaceholderCard title="CPE Hours (toward 40-hour requirement)" icon="⏱️">
        <div className="progress" aria-label={`CPE progress ${cpePct}%`}>
          <div className="progress__bar" style={{ width: `${cpePct}%` }} />
        </div>
        <p className="card__hint">
          {data.cpeHours} of {data.cpeTarget} hours ({cpePct}%)
        </p>
      </PlaceholderCard>

      {/* Recommended learning + recent activity placeholders */}
      <div className="grid grid--2">
        <PlaceholderCard title="Recommended Learning" icon="✨" />
        <PlaceholderCard title="Recent Activity & Next Action" icon="🕑" />
      </div>
    </div>
  );
}
