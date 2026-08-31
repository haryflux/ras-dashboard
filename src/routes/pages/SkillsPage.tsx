import { useProfile } from "../../api/useProfile";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";
import { EmptyState } from "../../components/states/EmptyState";

// Associate "Skill Center" - lists current vs. target skill levels (mock data).
export function SkillsPage() {
  const { data, loading, error, reload } = useProfile();

  if (loading) return <LoadingState message="Loading your skills..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  return (
    <div className="page">
      <div className="page__head">
        <h1>Skill Center 🎯</h1>
        <p className="page__subtitle">
          Current level vs. target for your role. (Gap calculation is a later
          ticket.)
        </p>
      </div>

      <PlaceholderCard title="My Skills">
        {data.skills.length === 0 ? (
          <EmptyState message="No skills recorded yet." />
        ) : (
          <ul className="skill-list">
            {data.skills.map((skill) => (
              <li key={skill.name} className="skill-list__item">
                <div className="skill-list__row">
                  <span>{skill.name}</span>
                  <span className="skill-list__nums">
                    {skill.currentLevel} / {skill.targetLevel}
                  </span>
                </div>
                <div className="progress">
                  <div
                    className="progress__bar"
                    style={{ width: `${skill.currentLevel}%` }}
                  />
                  <div
                    className="progress__target"
                    style={{ left: `${skill.targetLevel}%` }}
                    title={`Target ${skill.targetLevel}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </PlaceholderCard>
    </div>
  );
}
