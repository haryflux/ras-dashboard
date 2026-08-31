import { useState } from "react";
import { useProfile } from "../../api/useProfile";
import { PlaceholderCard } from "../../components/PlaceholderCard";
import { LoadingState } from "../../components/states/LoadingState";
import { ErrorState } from "../../components/states/ErrorState";
import { EmptyState } from "../../components/states/EmptyState";

// ---------------------------------------------------------------------------
// Learning Hub — premium page.
// A "Continue where you left off" hero + tabbed course grid
// (In Progress / Recommended / Completed).
// ---------------------------------------------------------------------------

type Tab = "progress" | "recommended" | "completed";

const RECOMMENDED = [
  { title: "Sampling & Materiality Deep-Dive", source: "Field Guide", meta: "35 min · Closes a skill gap", tone: "amber", icon: "📘" },
  { title: "HITRUST Fundamentals", source: "HITRUST Academy", meta: "1h 10m · Certification concept", tone: "green", icon: "🎓" },
  { title: "Prompt Engineering Basics", source: "LinkedIn Learning", meta: "29 min · AI skills", tone: "cyan", icon: "💡" },
  { title: "IT General Controls Overview", source: "SharePoint", meta: "40 min · Core concept", tone: "", icon: "🖥️" },
];

export function LearningPage() {
  const { data, loading, error, reload } = useProfile();
  const [tab, setTab] = useState<Tab>("progress");

  if (loading) return <LoadingState message="Loading your learning..." />;
  if (error) return <ErrorState message={error} onRetry={reload} />;
  if (!data) return null;

  const inProgress = data.learning.filter((l) => l.progress > 0 && l.progress < 100);
  const completed = data.learning.filter((l) => l.progress === 100);
  const resume = inProgress[0];

  return (
    <div className="page">
      <div className="page__head">
        <h1>Learning Hub 📚</h1>
        <p className="page__subtitle">Pick up where you left off, or explore what's recommended for you.</p>
      </div>

      {/* Continue hero */}
      {resume && (
        <PlaceholderCard title="Continue where you left off" icon="▶️" badge="Resume">
          <div className="learn-list__row" style={{ marginBottom: 10 }}>
            <div>
              <strong>{resume.title}</strong>
              <span className="learn-list__source"> · {resume.source}</span>
            </div>
            <span className="learn-list__pct">{resume.progress}%</span>
          </div>
          <div className="progress" style={{ marginBottom: 16 }}>
            <div className="progress__bar" style={{ width: `${resume.progress}%` }} />
          </div>
          <button className="btn">Continue learning →</button>
        </PlaceholderCard>
      )}

      {/* Tabs */}
      <div className="tabs" role="tablist">
        <button className={`tab ${tab === "progress" ? "tab--active" : ""}`} onClick={() => setTab("progress")}>In Progress ({inProgress.length})</button>
        <button className={`tab ${tab === "recommended" ? "tab--active" : ""}`} onClick={() => setTab("recommended")}>Recommended</button>
        <button className={`tab ${tab === "completed" ? "tab--active" : ""}`} onClick={() => setTab("completed")}>Completed ({completed.length})</button>
      </div>

      {/* In progress */}
      {tab === "progress" && (
        inProgress.length === 0 ? (
          <EmptyState message="Nothing in progress. Check the Recommended tab to start something! ✨" />
        ) : (
          <div className="course-grid">
            {inProgress.map((l) => (
              <div className="course" key={l.title}>
                <div className="course__top">🎥</div>
                <div className="course__body">
                  <p className="course__title">{l.title}</p>
                  <p className="course__meta">{l.source} · {l.progress}% complete</p>
                  <div className="progress"><div className="progress__bar" style={{ width: `${l.progress}%` }} /></div>
                  <div className="course__foot">
                    <span className="chip chip--blue">In progress</span>
                    <button className="btn" style={{ padding: "7px 14px" }}>Continue</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Recommended */}
      {tab === "recommended" && (
        <div className="course-grid">
          {RECOMMENDED.map((c) => (
            <div className="course" key={c.title}>
              <div className={`course__top ${c.tone ? `course__top--${c.tone}` : ""}`}>{c.icon}</div>
              <div className="course__body">
                <p className="course__title">{c.title}</p>
                <p className="course__meta">{c.meta}</p>
                <div className="course__foot">
                  <span className="chip chip--green">{c.source}</span>
                  <button className="btn" style={{ padding: "7px 14px" }}>Start</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed */}
      {tab === "completed" && (
        completed.length === 0 ? (
          <EmptyState message="No completed courses yet — your finished learning will appear here. 🏁" />
        ) : (
          <div className="course-grid">
            {completed.map((l) => (
              <div className="course" key={l.title}>
                <div className="course__top course__top--green">✅</div>
                <div className="course__body">
                  <p className="course__title">{l.title}</p>
                  <p className="course__meta">{l.source} · Completed</p>
                  <div className="course__foot">
                    <span className="chip chip--green">Done</span>
                    <button className="btn" style={{ padding: "7px 14px" }}>Review</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
