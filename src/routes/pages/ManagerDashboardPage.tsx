import { PlaceholderCard } from "../../components/PlaceholderCard";

// ---------------------------------------------------------------------------
// Manager dashboard - focuses on TEAM development rather than one person.
// All cards are clearly-labelled placeholders (real logic is out of scope).
// ---------------------------------------------------------------------------

export function ManagerDashboardPage() {
  return (
    <div className="page">
      <div className="page__head">
        <h1>Team Development Summary 📊</h1>
        <p className="page__subtitle">
          Technology Assurance · Manager view
        </p>
      </div>

      <div className="grid grid--3">
        <PlaceholderCard title="Skill Gaps" icon="🧭" badge="Team" />
        <PlaceholderCard title="Completion" icon="✅" badge="Team" />
        <PlaceholderCard title="Certifications" icon="🏅" badge="Team" />
      </div>

      <PlaceholderCard title="Recent Assessment Activity" icon="📝" />
      <PlaceholderCard title="Items Requiring Discussion or Support" icon="💬" />
    </div>
  );
}
