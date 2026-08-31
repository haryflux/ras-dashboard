// Reusable ERROR state. Shows a message and an optional "Try again" button.
export function ErrorState({
  message = "Something went wrong.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="state state--error" role="alert">
      <div className="state__icon" aria-hidden="true">⚠️</div>
      <p>{message}</p>
      {onRetry && (
        <button className="btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
