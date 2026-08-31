import { useNavigate } from "react-router-dom";
import { usePersona } from "../../context/PersonaContext";
import { HealthBadge } from "../HealthBadge";
import type { PersonaRole } from "../../models";

// ---------------------------------------------------------------------------
// The top application header:
//   - product name + logo
//   - persona switcher (Associate <-> Manager)
//   - FastAPI health badge
//   - user avatar (initial) + name
//   - Log out (clears saved name, returns to login)
// ---------------------------------------------------------------------------

// Read the display name saved at login (falls back to a sensible default).
function getUserName(role: PersonaRole): string {
  const stored =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("ras_user_name")
      : null;
  if (stored) return stored;
  return role === "manager" ? "Labeeb" : "Hari";
}

export function AppHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { role, setRole } = usePersona();
  const navigate = useNavigate();

  const userName = getUserName(role);
  const initial = userName.charAt(0).toUpperCase();

  const handlePersonaChange = (next: PersonaRole) => {
    setRole(next);
    navigate(`/${next}/dashboard`);
  };

  const handleLogout = () => {
    // Clear the saved identity and return to the login screen.
    localStorage.removeItem("ras_user_name");
    localStorage.removeItem("ras_user_email");
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="app-header__left">
        <button
          className="icon-btn app-header__menu"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>
        <span className="app-header__logo" aria-hidden="true">🎓</span>
        <span className="app-header__title">RAS Training Hub</span>
      </div>

      <div className="app-header__right">
        <label className="persona-switch">
          <span className="persona-switch__label">Viewing as</span>
          <select
            value={role}
            onChange={(e) => handlePersonaChange(e.target.value as PersonaRole)}
            aria-label="Select persona"
          >
            <option value="associate">Associate</option>
            <option value="manager">Manager</option>
          </select>
        </label>

        <HealthBadge />

        {/* User chip: avatar initial + name */}
        <div className="user-chip">
          <span className="user-chip__avatar" aria-hidden="true">{initial}</span>
          <span className="user-chip__name">{userName}</span>
        </div>

        <button className="logout-btn" onClick={handleLogout} title="Log out">
          <span aria-hidden="true">⏻</span>
          <span className="logout-btn__label">Log out</span>
        </button>
      </div>
    </header>
  );
}
