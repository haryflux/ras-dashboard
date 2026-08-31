import { useProfile } from "../../api/useProfile";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { Donut } from "../../components/Donut";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";

// ---------------------------------------------------------------------------
// Remaining pages, all styled to match the premium theme:
//   Associate: Certifications, Progress, Simulations
//   Manager:   Team Skills (heatmap), Team Progress, Assessments (table)
// ---------------------------------------------------------------------------

// ===========================================================================
// CERTIFICATIONS
// ===========================================================================
export function CertificationsPage() {
  const { data, loading, error, reload } = useProfile();
  if (loading) return <LoadingState message="Loading certifications..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  const done = data.certifications.filter((c) => c.status === "completed").length;
  const inProg = data.certifications.filter((c) => c.status === "in-progress").length;
  const certPct = data.certifications.length ? Math.round((done / data.certifications.length) * 100) : 0;
  const chipFor = (s: string) => (s === "completed" ? "chip--green" : s === "in-progress" ? "chip--amber" : "chip--blue");
  const textFor = (s: string) => (s === "completed" ? "Completed" : s === "in-progress" ? "In progress" : "Not started");

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
// PROGRESS
// ===========================================================================
export function ProgressPage() {
  const { data, loading, error, reload } = useProfile();
  if (loading) return <LoadingState message="Loading your progress..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  const learnDone = data.learning.filter((l) => l.progress === 100).length;
  const learnPct = data.learning.length ? Math.round((learnDone / data.learning.length) * 100) : 0;
  const avgSkill = data.skills.length ? Math.round(data.skills.reduce((s, k) => s + k.currentLevel, 0) / data.skills.length) : 0;
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
                <div><strong>{item.title}</strong><span className="learn-list__source"> · {item.source}</span></div>
                <span className="learn-list__pct">{item.progress}%</span>
              </div>
              <div className="progress"><div className="progress__bar" style={{ width: `${item.progress}%` }} /></div>
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
// SIMULATIONS
// ===========================================================================
export function SimulationsPage() {
  const scenarios = [
    { title: "User Access Review (UAR)", diff: "Beginner", time: "20 min", tone: "chip--green", icon: "🔐", best: "72%" },
    { title: "SOC 2 Control Walkthrough", diff: "Intermediate", time: "35 min", tone: "chip--amber", icon: "🧾", best: "—" },
    { title: "Sampling Scenario", diff: "Intermediate", time: "25 min", tone: "chip--amber", icon: "📊", best: "—" },
    { title: "Full Mock Engagement", diff: "Advanced", time: "60 min", tone: "chip--red", icon: "🏢", best: "Locked" },
  ];
  return (
    <div className="page">
      <div className="page__head">
        <h1>Simulations 🧪</h1>
        <p className="page__subtitle">Practice realistic audit scenarios and get instant AI feedback. (Scoring engine is a later ticket.)</p>
      </div>
      <div className="grid grid--3">
        <Stat variant="blue" icon="🧪" label="Attempted" value="1" />
        <Stat variant="green" icon="🎯" label="Best Score" value="72%" />
        <Stat variant="violet" icon="🏆" label="Avg. Score" value="72%" />
      </div>
      <div className="course-grid">
        {scenarios.map((s) => (
          <div className="course" key={s.title}>
            <div className="course__top">{s.icon}</div>
            <div className="course__body">
              <p className="course__title">{s.title}</p>
              <p className="course__meta">{s.time} · Best: {s.best}</p>
              <div className="course__foot">
                <span className={`chip ${s.tone}`}>{s.diff}</span>
                <button className="btn" style={{ padding: "7px 14px" }}>Start</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===========================================================================
// MANAGER: TEAM SKILLS (heatmap)
// ===========================================================================
export function TeamSkillsPage() {
  const skills = ["SOC", "Sampling", "Policy", "HITRUST"];
  const team = [
    { name: "Karthik R.", vals: [55, 40, 60, 30] },
    { name: "Prajna S.", vals: [80, 75, 78, 70] },
    { name: "Aisha K.", vals: [34, 45, 40, 25] },
    { name: "Rohan M.", vals: [88, 85, 82, 80] },
    { name: "Neha T.", vals: [61, 58, 65, 50] },
  ];
  const color = (v: number) => (v >= 75 ? "#34d399" : v >= 50 ? "#4f8cff" : v >= 35 ? "#fbbf24" : "#fb7185");

  return (
    <div className="page">
      <div className="page__head">
        <h1>Team Skills 🧭</h1>
        <p className="page__subtitle">Proficiency across the team — spot gaps at a glance.</p>
      </div>
      <PlaceholderCard title="Skill Heatmap" icon="🔥">
        <div style={{ overflowX: "auto" }}>
          <table className="heatmap">
            <thead>
              <tr>
                <th></th>
                {skills.map((s) => <th key={s}>{s}</th>)}
              </tr>
            </thead>
            <tbody>
              {team.map((m) => (
                <tr key={m.name}>
                  <td>{m.name}</td>
                  {m.vals.map((v, i) => (
                    <td key={i}><div className="hcell" style={{ background: color(v) }}>{v}</div></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="card__hint">🟢 Strong (75+) · 🔵 Solid (50–74) · 🟡 Developing (35–49) · 🔴 Gap (&lt;35)</p>
      </PlaceholderCard>
    </div>
  );
}

// ===========================================================================
// MANAGER: TEAM PROGRESS
// ===========================================================================
export function TeamProgressPage() {
  const members = [
    { name: "Karthik R.", pct: 46, chip: "chip--amber", label: "Developing" },
    { name: "Prajna S.", pct: 78, chip: "chip--blue", label: "On track" },
    { name: "Aisha K.", pct: 34, chip: "chip--red", label: "At risk" },
    { name: "Rohan M.", pct: 88, chip: "chip--green", label: "Ready" },
    { name: "Neha T.", pct: 61, chip: "chip--blue", label: "On track" },
  ];
  return (
    <div className="page">
      <div className="page__head">
        <h1>Team Progress 📊</h1>
        <p className="page__subtitle">Learning completion and readiness across your team.</p>
      </div>
      <div className="rings" style={{ marginBottom: 20 }}>
        <Donut percent={61} label="Avg. Readiness" sub="team" gradientId="tp1" from="#4f8cff" to="#7c5cff" />
        <Donut percent={72} label="Learning Complete" sub="team avg" gradientId="tp2" from="#22d3ee" to="#4f8cff" />
        <Donut percent={64} label="Certifications" sub="on target" gradientId="tp3" from="#34d399" to="#22d3ee" />
      </div>
      <PlaceholderCard title="Individual Progress" icon="👥">
        <ul className="skill-list">
          {members.map((m) => (
            <li key={m.name}>
              <div className="skill-list__row">
                <span>{m.name}</span>
                <span>
                  <span className={`chip ${m.chip}`} style={{ marginRight: 10 }}>{m.label}</span>
                  <span className="skill-list__nums">{m.pct}%</span>
                </span>
              </div>
              <div className="progress"><div className="progress__bar" style={{ width: `${m.pct}%` }} /></div>
            </li>
          ))}
        </ul>
      </PlaceholderCard>
    </div>
  );
}

// ===========================================================================
// MANAGER: ASSESSMENTS (table)
// ===========================================================================
export function AssessmentsPage() {
  const rows = [
    { who: "Karthik R.", item: "UAR Simulation", date: "2 days ago", status: "Pending review", chip: "chip--amber" },
    { who: "Aisha K.", item: "SOC Walkthrough Quiz", date: "3 days ago", status: "Pending review", chip: "chip--amber" },
    { who: "Prajna S.", item: "Sampling Assessment", date: "5 days ago", status: "Reviewed", chip: "chip--green" },
    { who: "Neha T.", item: "Policy Testing Case", date: "1 week ago", status: "Reviewed", chip: "chip--green" },
  ];
  return (
    <div className="page">
      <div className="page__head">
        <h1>Assessments 📝</h1>
        <p className="page__subtitle">Review submissions and provide feedback. (AI pre-scoring is a later ticket.)</p>
      </div>
      <div className="grid grid--3">
        <Stat variant="amber" icon="⏳" label="Awaiting Review" value="2" />
        <Stat variant="green" icon="✅" label="Reviewed" value="2" />
        <Stat variant="blue" icon="📋" label="Total" value="4" />
      </div>
      <PlaceholderCard title="Submissions" icon="📥">
        <div style={{ overflowX: "auto" }}>
          <table className="dtable">
            <thead>
              <tr><th>Associate</th><th>Assessment</th><th>Submitted</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.who}</td>
                  <td>{r.item}</td>
                  <td>{r.date}</td>
                  <td><span className={`chip ${r.chip}`}>{r.status}</span></td>
                  <td><button className="btn" style={{ padding: "6px 12px" }}>Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PlaceholderCard>
    </div>
  );
}

// ---- shared helpers ----
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
