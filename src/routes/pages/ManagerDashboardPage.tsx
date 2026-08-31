import { Donut } from "../../components/Donut";
import { PlaceholderCard } from "../../components/PlaceholderCard";

// ---------------------------------------------------------------------------
// Manager dashboard — PREMIUM redesign focused on TEAM development.
// Uses the same Donut, stat tiles, feed and skill-bar patterns as the
// associate view so both personas feel equally polished.
// All data here is illustrative MOCK team data (no real/confidential info).
// ---------------------------------------------------------------------------

// Illustrative team roster (mock).
const team = [
  { name: "Karthik R.", role: "Analyst", readiness: 46, gap: "SOC, Sampling", status: "developing" },
  { name: "Prajna S.", role: "Senior", readiness: 78, gap: "Reporting", status: "ontrack" },
  { name: "Aisha K.", role: "Analyst", readiness: 34, gap: "Walkthroughs", status: "atrisk" },
  { name: "Rohan M.", role: "Senior", readiness: 88, gap: "—", status: "ready" },
  { name: "Neha T.", role: "Analyst", readiness: 61, gap: "Policy Testing", status: "ontrack" },
];

const statusChip: Record<string, { text: string; cls: string }> = {
  ready: { text: "Ready", cls: "chip--green" },
  ontrack: { text: "On track", cls: "chip--blue" },
  developing: { text: "Developing", cls: "chip--amber" },
  atrisk: { text: "At risk", cls: "chip--red" },
};

export function ManagerDashboardPage() {
  const avgReadiness = Math.round(
    team.reduce((s, m) => s + m.readiness, 0) / team.length
  );
  const readyCount = team.filter((m) => m.readiness >= 80).length;
  const atRisk = team.filter((m) => m.readiness < 40).length;

  return (
    <div className="page">
      <div className="page__head">
        <h1>Team Development Overview 📊</h1>
        <p className="page__subtitle">
          Technology Assurance · {team.length} team members · Manager view
        </p>
      </div>

      {/* ---- Team stat tiles ---- */}
      <div className="grid grid--4">
        <StatTile variant="blue" icon="👥" label="Team Size" value={`${team.length}`} trend="Tech Assurance" />
        <StatTile variant="violet" icon="🎯" label="Avg. Readiness" value={`${avgReadiness}%`} trend="↑ 6% this quarter" up />
        <StatTile variant="green" icon="✅" label="Engagement-Ready" value={`${readyCount}`} valueSmall={`/ ${team.length}`} trend="≥ 80% readiness" up />
        <StatTile variant="amber" icon="⚠️" label="Needs Support" value={`${atRisk}`} trend="Below 40% readiness" />
      </div>

      {/* ---- Team ring charts ---- */}
      <div className="rings" style={{ marginBottom: 20 }}>
        <Donut percent={avgReadiness} label="Team Skill Coverage" sub="avg readiness" gradientId="mgr-skill" from="#4f8cff" to="#7c5cff" />
        <Donut percent={72} label="Learning Completion" sub="team avg" gradientId="mgr-learn" from="#22d3ee" to="#4f8cff" />
        <Donut percent={64} label="Certification Progress" sub="on target" gradientId="mgr-cert" from="#34d399" to="#22d3ee" />
      </div>

      {/* ---- Team roster + Attention feed ---- */}
      <div className="grid grid--2">
        <PlaceholderCard title="Team Readiness" icon="🧭">
          <ul className="skill-list">
            {team.map((m) => {
              const chip = statusChip[m.status];
              return (
                <li key={m.name}>
                  <div className="skill-list__row">
                    <span>
                      {m.name}
                      <span className="learn-list__source"> · {m.role}</span>
                    </span>
                    <span>
                      <span className={`chip ${chip.cls}`} style={{ marginRight: 10 }}>{chip.text}</span>
                      <span className="skill-list__nums">{m.readiness}%</span>
                    </span>
                  </div>
                  <div className="progress">
                    <div className="progress__bar" style={{ width: `${m.readiness}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </PlaceholderCard>

        <PlaceholderCard title="Needs Your Attention" icon="🔔" badge="Action">
          <ul className="feed">
            <FeedRow icon="🚩" title="Aisha K. — SOC Walkthroughs below target" meta="Readiness 34% · assign focused module" chip="Review" chipClass="chip--red" />
            <FeedRow icon="📝" title="2 associates awaiting simulation review" meta="UAR submissions pending feedback" chip="Open" chipClass="chip--amber" />
            <FeedRow icon="🏅" title="Prajna S. — HITRUST cert due soon" meta="Renewal in 3 weeks" chip="Remind" chipClass="chip--blue" />
            <FeedRow icon="🎉" title="Rohan M. reached engagement-ready" meta="Readiness 88% · consider new scope" chip="Done" chipClass="chip--green" />
          </ul>
        </PlaceholderCard>
      </div>

      {/* ---- Team skill gap heatmap ---- */}
      <PlaceholderCard title="Team Skill Gaps" icon="🎯">
        <ul className="skill-list">
          <SkillGapRow name="SOC Walkthroughs" level={52} target={80} />
          <SkillGapRow name="Sampling & Materiality" level={44} target={75} />
          <SkillGapRow name="Policy Testing" level={68} target={80} />
          <SkillGapRow name="Documentation Quality" level={71} target={85} />
        </ul>
      </PlaceholderCard>
    </div>
  );
}

// ---- local helper components (same visual language as the associate view) ----

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

function SkillGapRow({ name, level, target }: { name: string; level: number; target: number }) {
  const gap = target - level;
  const chipClass = gap > 25 ? "chip--red" : gap > 12 ? "chip--amber" : "chip--green";
  const chipText = gap > 25 ? "High gap" : gap > 12 ? "Developing" : "On target";
  return (
    <li>
      <div className="skill-list__row">
        <span>{name}</span>
        <span>
          <span className={`chip ${chipClass}`} style={{ marginRight: 10 }}>{chipText}</span>
          <span className="skill-list__nums">{level} / {target}</span>
        </span>
      </div>
      <div className="progress">
        <div className="progress__bar" style={{ width: `${level}%` }} />
        <div className="progress__target" style={{ left: `${target}%` }} />
      </div>
    </li>
  );
}
