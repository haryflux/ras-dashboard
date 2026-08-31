// Reusable SUCCESS state. A small green confirmation banner.
export function SuccessState({
  message = "Done!",
}: {
  message?: string;
}) {
  return (
    <div className="state state--success" role="status">
      <div className="state__icon" aria-hidden="true">✅</div>
      <p>{message}</p>
    </div>
  );
}
