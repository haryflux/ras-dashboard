import { useProfile } from "../../api/useProfile";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";

// ---------------------------------------------------------------------------
// My Profile — premium page.
// A profile hero (avatar + name), a completeness meter (a strong nudge), and
// cards for skills, certifications, and learning preferences.
// ---------------------------------------------------------------------------

export function ProfilePage() {
  const { data, loading, error, reload } = useProfile();

  if (loading) return <LoadingState message="Loading your profile..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  const initial = data.name.charAt(0).toUpperCase();

  // Simple completeness score based on how much of the profile is filled.
  const checks = [
    data.name.length > 0,
    data.skills.length > 0,
    data.certifications.length > 0,
    data.learning.length > 0,
    data.experienceLevel.length > 0,
  ];
  const completeness = Math.round((checks.filter(Boolean).length / checks.length) * 100);

  return (
    <div className="page">
      <div className="page__head">
        <h1>My Profile 👤</h1>
        <p className="page__subtitle">Your learning identity — kept up to date as you grow.</p>
      </div>

      {/* Hero */}
      <PlaceholderCard title="Profile" icon="🪪">
        <div className="profile-hero">
          <div className="profile-hero__avatar">{initial}</div>
          <div>
            <p className="profile-hero__name">{data.name}</p>
            <p className="profile-hero__role">{data.jobTitle} · {data.serviceArea}</p>
          </div>
        </div>
      </PlaceholderCard>

      {/* Completeness nudge */}
      <PlaceholderCard title="Profile Completeness" icon="✅" badge={`${completeness}%`}>
        <div className="progress" style={{ marginBottom: 10 }}>
          <div className="progress__bar" style={{ width: `${completeness}%` }} />
        </div>
        <p className="card__hint" style={{ marginTop: 0 }}>
          {completeness === 100
            ? "Your profile is complete — nice work! 🎉"
            : "Add your career goals to reach 100% and improve your recommendations."}
        </p>
      </PlaceholderCard>

      {/* Details */}
      <PlaceholderCard title="Details" icon="📋">
        <dl className="details">
          <div><dt>Name</dt><dd>{data.name}</dd></div>
          <div><dt>Role</dt><dd>{data.jobTitle}</dd></div>
          <div><dt>Service Area</dt><dd>{data.serviceArea}</dd></div>
          <div><dt>Experience Level</dt><dd>{data.experienceLevel}</dd></div>
        </dl>
      </PlaceholderCard>

      <div className="grid grid--2">
        <PlaceholderCard title="My Skills" icon="🎯">
          <div className="atlas-summary__skills" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {data.skills.map((s) => (
              <span key={s.name} className="chip chip--blue">{s.name}</span>
            ))}
          </div>
        </PlaceholderCard>

        <PlaceholderCard title="Certifications" icon="🏅">
          <ul className="feed">
            {data.certifications.map((c) => (
              <li className="feed__item" key={c.name}>
                <div className="feed__icon">🏅</div>
                <div className="feed__body">
                  <p className="feed__title">{c.name}</p>
                  <p className="feed__meta">{c.status.replace("-", " ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </PlaceholderCard>
      </div>
    </div>
  );
}
