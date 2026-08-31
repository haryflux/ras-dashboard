// Reusable LOADING state. Shows a spinner + message while data is being fetched.
export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="state state--loading" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
