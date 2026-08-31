import { useProfile } from "../../api/useProfile";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { Donut } from "../../components/Donut";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";

// ---------------------------------------------------------------------------
// A few small pages. Certifications and Progress are now fully "filled" with
// premium cards so every page looks finished. The manager-only pages stay as
// simple labelled placeholders (covered by other tickets).
// ---------------------------------------------------------------------------

function SimplePage({ title, icon, subtitle }: { title: string; icon: string; subtitle?: string }) {
  return (
    <div className="page">
      <div className="page__head">
        <h1>{title} {icon}</h1>
        {subtitle && <p className="page__subtitle">{subtitle}</p>}
      </div>
      <PlaceholderCard title={title} icon={icon} />
    </div>
  );
}

// ===========================================================================
// CERTIFICATIONS — premium filled page
// ===========================================================================
export function CertificationsPage() {
  const { data, loading, error, reload } = useProfile();

  if (loading) return <LoadingState message="Loading certifications..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  const done = data.certifications.filter((c) => c.status === "completed").length;
  const inProg = data.certifications.filter((c) => c.status === "in-progress").length;
  const certPct = data.certifications.length
    ? Math.round((done / data.certifications.length) * 100)
    : 0;

  const chipFor = (status: string) =>
    status === "completed" ? "chip--green" : status === "in-progress" ? "chip--amber" : "chip--blue";
  const textFor = (status: string) =>
    status === "completed" ? "Completed" : status === "in-progress" ? "In progress" : "Not started";

  return (
    <div className="page">
      <div className="page__head">
        <h1>Certifications 🏅</h1>
        <p className="page__subtitle">Track certification status and CPE hours toward the 40-hour requirement.</p>
      </div>

      <div className="grid grid--4">
        <Stat variant="green" icon="🏅" label="Completed" value={`${done}`} />
        <Stat variant="amber" icon="⏳" label="In Progress" value={`${inProg}`} />
        <Stat variant="blue" icon="📋" label="Total Tracked" value={`${data.certifications.length}`} />
        <Stat variant="violet" icon="⏱️" label="CPE Hours" value={`${data.cpeHours}`} valueSmall={`/ ${data.cpeTarget}`} />
      </div>

      <div className="grid grid--2">
        <PlaceholderCard title="Certification Progress" icon="📊">
          <div className="rings" style={{ gridTemplateColumns: "1fr" }}>
            <Donut percent={certPct} label="Overall Completion" sub={`${done}/${data.certifications.length}`} gradientId="cert-ring" from="#34d399" to="#22d3ee" />
          </div>
        </PlaceholderCard>

        <PlaceholderCard title="My Certifications" icon="🎖️">
          <ul className="feed">
            {data.certifications.map((c) => (
              <li className="feed__item" key={c.name}>
                <div className="feed__icon">🏅</div>
                <div className="feed__body">
                  <p className="feed__title">{c.name}</p>
                  <p className="feed__meta">{c.dueDate ? `Due ${c.dueDate}` : "No deadline set"}</p>
                </div>
                <span className={`chip ${chipFor(c.status)}`}>{textFor(c.status)}</span>
              </li>
            ))}
          </ul>
        </PlaceholderCard>
      </div>

      <PlaceholderCard title="CPE Hours Progress" icon="⏱️">
        <div className="skill-list__row">
          <span>Toward Wipfli 40-hour requirement</span>
          <span className="skill-list__nums">{data.cpeHours} / {data.cpeTarget} hrs</span>
        </div>
        <div className="progress">
          <div className="progress__bar" style={{ width: `${Math.round((data.cpeHours / data.cpeTarget) * 100)}%` }} />
        </div>
      </PlaceholderCard>
    </div>
  );
}

// ===========================================================================
// PROGRESS — premium filled page
// ===========================================================================
export function ProgressPage() {
  const { data, loading, error, reload } = useProfile();

  if (loading) return <LoadingState message="Loading your progress..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  const learnDone = data.learning.filter((l) => l.progress === 100).length;
  const learnPct = data.learning.length ? Math.round((learnDone / data.learning.length) * 100) : 0;
  const avgSkill = data.skills.length
    ? Math.round(data.skills.reduce((s, k) => s + k.currentLevel, 0) / data.skills.length)
    : 0;
  const cpePct = Math.round((data.cpeHours / data.cpeTarget) * 100);

  return (
    <div className="page">
      <div className="page__head">
        <h1>My Progress 📈</h1>
        <p className="page__subtitle">Your learning journey at a glance.</p>
      </div>

      <div className="rings" style={{ marginBottom: 20 }}>
        <Donut percent={avgSkill} label="Skill Readiness" sub={`${data.skills.length} skills`} gradientId="prog-skill" from="#4f8cff" to="#7c5cff" />
        <Donut percent={learnPct} label="Learning Complete" sub={`${learnDone}/${data.learning.length}`} gradientId="prog-learn" from="#22d3ee" to="#4f8cff" />
        <Donut percent={cpePct} label="CPE Completion" sub={`${data.cpeHours}/${data.cpeTarget} hrs`} gradientId="prog-cpe" from="#34d399" to="#22d3ee" />
      </div>

      <PlaceholderCard title="Learning Progress" icon="📚">
        <ul className="learn-list">
          {data.learning.map((item) => (
            <li key={item.title}>
              <div className="learn-list__row">
                <div>
                  <strong>{item.title}</strong>
                  <span className="learn-list__source"> · {item.source}</span>
                </div>
                <span className="learn-list__pct">{item.progress}%</span>
              </div>
              <div className="progress">
                <div className="progress__bar" style={{ width: `${item.progress}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </PlaceholderCard>

      <PlaceholderCard title="Milestones" icon="🎯">
        <ul className="feed">
          <FeedRow icon="✅" title="Completed onboarding profile" meta="Profile 100% set up" chip="Done" chipClass="chip--green" />
          <FeedRow icon="🎥" title="Finished SOC Module 1" meta="+2 CPE hours earned" chip="Done" chipClass="chip--green" />
          <FeedRow icon="🧪" title="First simulation attempted" meta="UAR · scored 72%" chip="Review" chipClass="chip--blue" />
          <FeedRow icon="🚀" title="Next: reach 60% skill readiness" meta="Currently at 46%" chip="In progress" chipClass="chip--amber" />
        </ul>
      </PlaceholderCard>
    </div>
  );
}

// ===========================================================================
// Manager-only pages (remain simple placeholders — other tickets)
// ===========================================================================
export const SimulationsPage = () => (
  <SimplePage title="Simulations" icon="🧪" subtitle="Mock audit scenarios & feedback are built in a later ticket." />
);
export const TeamSkillsPage = () => (
  <SimplePage title="Team Skills" icon="🧭" subtitle="Manager view placeholder." />
);
export const TeamProgressPage = () => (
  <SimplePage title="Team Progress" icon="📊" subtitle="Manager view placeholder." />
);
export const AssessmentsPage = () => (
  <SimplePage title="Assessments" icon="📝" subtitle="Manager view placeholder." />
);

// ---- shared local helpers ----
function Stat({
  variant, icon, label, value, valueSmall,
}: {
  variant: "blue" | "violet" | "green" | "amber";
  icon: string; label: string; value: string; valueSmall?: string;
}) {
  return (
    <div className={`stat stat--${variant}`}>
      <div className="stat__icon">{icon}</div>
      <div>
        <p className="stat__label">{label}</p>
        <p className="stat__value">{value}{valueSmall && <small>{valueSmall}</small>}</p>
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
