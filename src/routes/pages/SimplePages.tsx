import { PlaceholderCard } from "../../components/PlaceholderCard";

// ---------------------------------------------------------------------------
// A few small pages that are pure placeholders in this shell ticket. Grouping
// them keeps the file count sensible. Each still gets its own route.
// ---------------------------------------------------------------------------

function SimplePage({
  title,
  icon,
  subtitle,
}: {
  title: string;
  icon: string;
  subtitle?: string;
}) {
  return (
    <div className="page">
      <div className="page__head">
        <h1>
          {title} {icon}
        </h1>
        {subtitle && <p className="page__subtitle">{subtitle}</p>}
      </div>
      <PlaceholderCard title={title} icon={icon} />
    </div>
  );
}

export const SimulationsPage = () => (
  <SimplePage
    title="Simulations"
    icon="🧪"
    subtitle="Mock audit scenarios & feedback are built in a later ticket."
  />
);

export const CertificationsPage = () => (
  <SimplePage
    title="Certifications"
    icon="🏅"
    subtitle="Certification & CPE tracking placeholder."
  />
);

export const ProgressPage = () => (
  <SimplePage title="Progress" icon="📈" subtitle="Progress tracking placeholder." />
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
