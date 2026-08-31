import { Link } from "react-router-dom";

// Shown for any unknown URL. Gives the user a clear way back.
export function NotFoundPage() {
  return (
    <div className="page">
      <div className="state state--empty">
        <div className="state__icon" aria-hidden="true">🧭</div>
        <h1>Page not found</h1>
        <p>The page you are looking for doesn’t exist.</p>
        <Link className="btn" to="/associate/dashboard">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
