import { useNavigate } from "react-router-dom";
import { useProfile } from "../../api/useProfile";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { Donut } from "../../components/Donut";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";
import { EmptyState } from "../../components/states/EmptyState";

// ---------------------------------------------------------------------------
// Skill Center — premium page.
// Shows an overall readiness donut, stat tiles, and skill bars with gap chips
// plus a "Close gap" action that jumps the user to the Learning Hub.
// ---------------------------------------------------------------------------

export function SkillsPage() {
  const { data, loading, error, reload } = useProfile();
  const navigate = useNavigate();

  if (loading) return <LoadingState message="Loading your skills..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  const avg = data.skills.length
    ? Math.round(data.skills.reduce((s, k) => s + k.currentLevel, 0) / data.skills.length)
    : 0;
  const onTarget = data.skills.filter((s) => s.targetLevel - s.currentLevel <= 15).length;
  const highGaps = data.skills.filter((s) => s.targetLevel - s.currentLevel > 30).length;

  return (
    <div className="page">
      <div className="page__head">
        <h1>Skill Center 🎯</h1>
        <p className="page__subtitle">Your current level vs. what your role expects — and how to close the gaps.</p>
      </div>

      <div className="grid grid--4">
        <Stat variant="blue" icon="🎯" label="Avg. Readiness" value={`${avg}%`} />
        <Stat variant="green" icon="✅" label="On Target" value={`${onTarget}`} valueSmall={`/ ${data.skills.length}`} />
        <Stat variant="amber" icon="📈" label="Developing" value={`${data.skills.length - onTarget - highGaps}`} />
        <Stat variant="violet" icon="🚩" label="High Gaps" value={`${highGaps}`} />
      </div>

      <div className="grid grid--2">
        <PlaceholderCard title="Overall Skill Readiness" icon="📊">
          <div className="rings" style={{ gridTemplateColumns: "1fr" }}>
            <Donut percent={avg} label="Readiness Score" sub={`${data.skills.length} skills`} gradientId="sc-ring" from="#4f8cff" to="#7c5cff" />
          </div>
        </PlaceholderCard>

        <PlaceholderCard title="Next Best Action" icon="✨" badge="AI">
          <p className="card__hint" style={{ marginTop: 0 }}>
            Your biggest opportunity right now:
          </p>
          {highGaps > 0 ? (
            <>
              <p className="feed__title" style={{ marginBottom: 6 }}>
                Focus on {data.skills.sort((a, b) => (b.targetLevel - b.currentLevel) - (a.targetLevel - a.currentLevel))[0].name}
              </p>
              <p className="feed__meta" style={{ marginBottom: 16 }}>
                This has the largest gap vs. your role expectation.
              </p>
              <button className="btn" onClick={() => navigate("/associate/learning")}>
                Find learning to close this →
              </button>
            </>
          ) : (
            <EmptyState message="You're on target across the board. Nice work! 🎉" />
          )}
        </PlaceholderCard>
      </div>

      <PlaceholderCard title="My Skills" icon="🎯">
        {data.skills.length === 0 ? (
          <EmptyState message="No skills recorded yet." />
        ) : (
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
        )}
      </PlaceholderCard>
    </div>
  );
}

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
