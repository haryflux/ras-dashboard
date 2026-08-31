import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// A simple, reusable card used across the dashboard to hold a titled section.
// Because the real logic (RAG, scoring, etc.) is out of scope for this ticket,
// these cards act as clearly-labelled PLACEHOLDERS for future features.
// ---------------------------------------------------------------------------

export function PlaceholderCard({
  title,
  icon,
  children,
  badge,
}: {
  title: string;
  icon?: string;
  children?: ReactNode;
  badge?: string;
}) {
  return (
    <section className="card" aria-label={title}>
      <header className="card__header">
        <h3 className="card__title">
          {icon && <span aria-hidden="true">{icon} </span>}
          {title}
        </h3>
        {badge && <span className="card__badge">{badge}</span>}
      </header>
      <div className="card__body">
        {children ?? (
          <p className="card__placeholder">
            Placeholder — this section will be built in a later ticket.
          </p>
        )}
      </div>
    </section>
  );
}
