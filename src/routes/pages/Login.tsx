import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./onboarding.css";

// ---------------------------------------------------------------------------
// Login.tsx  —  ATLAS-inspired sign-in (DARK theme).
// PLACE AT: src/routes/pages/Login.tsx
//
// Captures the work email, derives a friendly display name from it, and saves
// it to localStorage so the dashboard can greet the real user (and it survives
// a page refresh). No real auth here — SSO/Entra ID is a separate ticket.
// ---------------------------------------------------------------------------

// Turn "hari.maheshwari@wipfli.com" into "Hari".
function deriveName(email: string): string {
  const local = email.split("@")[0] || "";
  const first = local.split(/[._-]/)[0] || local;
  return first ? first.charAt(0).toUpperCase() + first.slice(1) : "";
}

export function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const continueWithEmail = () => {
    const name = deriveName(email);
    if (name) localStorage.setItem("ras_user_name", name);
    if (email) localStorage.setItem("ras_user_email", email);
    navigate("/onboarding");
  };

  return (
    <div className="atlas-root">
      <div className="atlas-login">
        <p className="atlas-brand">RAS TRAINING HUB</p>
        <h1>Welcome Back!</h1>
        <p className="atlas-login__sub">Sign in to continue your journey!</p>

        <button
          className="atlas-btn atlas-btn--primary"
          onClick={() => navigate("/onboarding")}
        >
          Continue with SSO
        </button>

        <p className="atlas-divider">Or continue with email</p>

        <input
          className="atlas-input"
          type="email"
          placeholder="Work Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && continueWithEmail()}
          aria-label="Work email"
        />

        <button
          className="atlas-btn atlas-btn--primary atlas-btn--block"
          onClick={continueWithEmail}
        >
          Continue with email
        </button>

        <p className="atlas-login__foot">
          Your account is secured by Wipfli’s authentication system
        </p>
      </div>
    </div>
  );
}
