import { useProfile } from "../../api/useProfile";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";

// Associate "My Profile" page - reads mock profile and shows basic details.
export function ProfilePage() {
  const { data, loading, error, reload } = useProfile();

  if (loading) return <LoadingState message="Loading your profile..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  return (
    <div className="page">
      <div className="page__head">
        <h1>My Profile 👤</h1>
      </div>
      <PlaceholderCard title="Profile Details">
        <dl className="details">
          <div>
            <dt>Name</dt>
            <dd>{data.name}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{data.jobTitle}</dd>
          </div>
          <div>
            <dt>Service Area</dt>
            <dd>{data.serviceArea}</dd>
          </div>
          <div>
            <dt>Experience Level</dt>
            <dd>{data.experienceLevel}</dd>
          </div>
        </dl>
      </PlaceholderCard>
    </div>
  );
}
