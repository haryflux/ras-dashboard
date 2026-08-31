import { useProfile } from "../../api/useProfile";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";
import { EmptyState } from "../../components/states/EmptyState";

// Associate "Learning Hub" - shows enrolled/recommended learning items (mock).
export function LearningPage() {
  const { data, loading, error, reload } = useProfile();

  if (loading) return <LoadingState message="Loading your learning..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  return (
    <div className="page">
      <div className="page__head">
        <h1>Learning Hub 📚</h1>
      </div>

      <PlaceholderCard title="My Learning">
        {data.learning.length === 0 ? (
          <EmptyState message="No learning items assigned yet." />
        ) : (
          <ul className="learn-list">
            {data.learning.map((item) => (
              <li key={item.title} className="learn-list__item">
                <div className="learn-list__row">
                  <div>
                    <strong>{item.title}</strong>
                    <span className="learn-list__source"> · {item.source}</span>
                  </div>
                  <span className="learn-list__pct">{item.progress}%</span>
                </div>
                <div className="progress">
                  <div
                    className="progress__bar"
                    style={{ width: `${item.progress}%` }}
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
