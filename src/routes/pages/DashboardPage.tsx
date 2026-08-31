import { useProfile } from "../../api/useProfile";
import { usePersona } from "../../context/PersonaContext";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { Donut } from "../../components/Donut";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";
import { ManagerDashboardPage } from "./ManagerDashboardPage";

// ---------------------------------------------------------------------------
// The Associate dashboard — redesigned with stat tiles, donut/ring charts,
// and filled content cards (recommended learning + activity feed).
// Managers are delegated to their own team dashboard.
// ---------------------------------------------------------------------------

export function DashboardPage() {
  const { role } = usePersona();
  const { data, loading, error, reload } = useProfile();

  if (role === "manager") return <ManagerDashboardPage />;
  if (loading) return <LoadingState message="Loading your dashboard..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  // --- derived numbers for the charts ---
  const cpePct = Math.round((data.cpeHours / data.cpeTarget) * 100);
  const learnDone = data.learning.filter((l) => l.progress === 100).length;
  const learnPct = data.learning.length
    ? Math.round((learnDone / data.learning.length) * 100)
    : 0;
  const avgSkill = data.skills.length
    ? Math.round(
        data.skills.reduce((s, k) => s + k.currentLevel, 0) / data.skills.length
      )
    : 0;
  const certsDone = data.certifications.filter((c) => c.status === "completed").length;

  return (
    <div className="page">
      <div className="page__head">
        <h1>Welcome back, {data.name.split(" ")[0]} 👋</h1>
        <p className="page__subtitle">
          {data.jobTitle} · {data.serviceArea} · {data.experienceLevel}
        </p>
      </div>

      {/* ---- Top stat tiles row ---- */}
      <div className="grid grid--4">
        <StatTile variant="blue" icon="🎯" label="Avg. Skill Level" value={`${avgSkill}%`} trend="↑ 8% this month" up />
        <StatTile variant="violet" icon="📚" label="Courses Completed" value={`${learnDone}`} valueSmall={`/ ${data.learning.length}`} trend="On track" up />
        <StatTile variant="green" icon="⏱️" label="CPE Hours" value={`${data.cpeHours}`} valueSmall={`/ ${data.cpeTarget}`} trend={`${cpePct}% of goal`} up />
        <StatTile variant="amber" icon="🏅" label="Certifications" value={`${certsDone}`} valueSmall={`/ ${data.certifications.length}`} trend="1 in progress" />
      </div>

      {/* ---- Ring charts ---- */}
      <div className="rings" style={{ marginBottom: 20 }}>
        <Donut percent={avgSkill} label="Skill Readiness" sub={`${data.skills.length} skills`} gradientId="ring-skill" from="#4f8cff" to="#7c5cff" />
        <Donut percent={learnPct} label="Learning Progress" sub={`${learnDone}/${data.learning.length} done`} gradientId="ring-learn" from="#22d3ee" to="#4f8cff" />
        <Donut percent={cpePct} label="CPE Completion" sub={`${data.cpeHours}/${data.cpeTarget} hrs`} gradientId="ring-cpe" from="#34d399" to="#22d3ee" />
      </div>

      {/* ---- Recommended learning + Activity feed (filled, clean icons) ---- */}
      <div className="grid grid--2">
        <PlaceholderCard title="Recommended For You" icon="✨" badge="AI">
          <ul className="feed">
            <FeedRow icon="📺" title="SOC Module 2 — Audit Activities" meta="SharePoint · 45 min left" chip="Continue" chipClass="chip--blue" />
            <FeedRow icon="📘" title="Sampling & Materiality Deep-Dive" meta="Field Guide · Closes a skill gap" chip="Start" chipClass="chip--amber" />
            <FeedRow icon="🎓" title="Prompt Engineering Basics" meta="LinkedIn Learning · 29 min" chip="New" chipClass="chip--green" />
          </ul>
        </PlaceholderCard>

        <PlaceholderCard title="Recent Activity" icon="🕑">
          <ul className="feed">
            <FeedRow icon="✅" title="Completed SOC Module 1" meta="Yesterday · +2 CPE hours" chip="Done" chipClass="chip--green" />
            <FeedRow icon="🧪" title="Attempted UAR Simulation" meta="2 days ago · Score 72%" chip="Review" chipClass="chip--blue" />
            <FeedRow icon="📈" title="Skill rating updated: Sampling" meta="3 days ago · Developing → 40%" chip="+5" chipClass="chip--amber" />
          </ul>
        </PlaceholderCard>
      </div>

      {/* ---- Skill snapshot ---- */}
      <PlaceholderCard title="Skill Snapshot" icon="🎯">
        <ul className="skill-list">
          {data.skills.map((skill) => {
            const gap = skill.targetLevel - skill.currentLevel;
            const chipClass = gap > 30 ? "chip--red" : gap > 15 ? "chip--amber" : "chip--green";
            const chipText = gap > 30 ? "High gap" : gap > 15 ? "Developing" : "On target";
            return (
              <li key={skill.name}>
                <div className="skill-list__row">
                  <span>{skill.name}</span>
                  <span>
                    <span className={`chip ${chipClass}`} style={{ marginRight: 10 }}>{chipText}</span>
                    <span className="skill-list__nums">{skill.currentLevel} / {skill.targetLevel}</span>
                  </span>
                </div>
                <div className="progress">
                  <div className="progress__bar" style={{ width: `${skill.currentLevel}%` }} />
                  <div className="progress__target" style={{ left: `${skill.targetLevel}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </PlaceholderCard>
    </div>
  );
}

// ---- small helper components (kept local to this page) ----

function StatTile({
  variant, icon, label, value, valueSmall, trend, up,
}: {
  variant: "blue" | "violet" | "green" | "amber";
  icon: string; label: string; value: string;
  valueSmall?: string; trend?: string; up?: boolean;
}) {
  return (
    <div className={`stat stat--${variant}`}>
      <div className="stat__icon">{icon}</div>
      <div>
        <p className="stat__label">{label}</p>
        <p className="stat__value">{value}{valueSmall && <small>{valueSmall}</small>}</p>
        {trend && <div className={`stat__trend ${up ? "up" : ""}`}>{trend}</div>}
      </div>
    </div>
  );
}

function FeedRow({
  icon, title, meta, chip, chipClass,
}: {
  icon: string; title: string; meta: string; chip: string; chipClass: string;
}) {
  return (
    <li className="feed__item">
      <div className="feed__icon">{icon}</div>
      <div className="feed__body">
        <p className="feed__title">{title}</p>
        <p className="feed__meta">{meta}</p>
      </div>
      <span className={`chip ${chipClass}`}>{chip}</span>
    </li>
  );
}
