// Reusable EMPTY state. Shown when a list/section has no data yet.
export function EmptyState({
  message = "Nothing here yet.",
}: {
  message?: string;
}) {
  return (
    <div className="state state--empty">
      <div className="state__icon" aria-hidden="true">📭</div>
      <p>{message}</p>
    </div>
  );
}
