import { useNavigate } from "react-router-dom";
import { usePersona } from "../../context/PersonaContext";
import { HealthBadge } from "../HealthBadge";
import type { PersonaRole } from "../../models";

// ---------------------------------------------------------------------------
// The top application header. Contains:
//   - The product name
//   - A persona switcher (Associate <-> Manager) that drives the whole app
//   - The FastAPI health badge
//   - A button to open/close the sidebar on small screens
// ---------------------------------------------------------------------------

export function AppHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { role, setRole } = usePersona();
  const navigate = useNavigate();

  // When the persona changes, update context AND jump to that persona's
  // dashboard so the URL and sidebar stay in sync.
  const handlePersonaChange = (next: PersonaRole) => {
    setRole(next);
    navigate(`/${next}/dashboard`);
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
      </div>
    </header>
  );
}
