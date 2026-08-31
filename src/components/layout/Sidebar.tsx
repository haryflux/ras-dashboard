import { NavLink } from "react-router-dom";
import { usePersona } from "../../context/PersonaContext";
import { routesForRole } from "../../routes/routeConfig";

// ---------------------------------------------------------------------------
// The left navigation sidebar. It reads the current persona from context and
// shows ONLY the routes that persona is allowed to see. That is what makes the
// navigation "change according to the selected persona".
//
// Navigation is keyboard-accessible: NavLink renders real <a> elements, so
// users can Tab through them and press Enter to navigate.
// ---------------------------------------------------------------------------

export function Sidebar({
  isOpen,
  onNavigate,
}: {
  isOpen: boolean;
  onNavigate: () => void;
}) {
  const { role } = usePersona();
  const routes = routesForRole(role);

  return (
    <nav
      className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
      aria-label="Main navigation"
    >
      <p className="sidebar__section">
        {role === "associate" ? "Associate" : "Manager"} Menu
      </p>
      <ul className="sidebar__list">
        {routes.map((route) => (
          <li key={route.path}>
            <NavLink
              to={`/${role}/${route.path}`}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
              onClick={onNavigate}
            >
              <span className="sidebar__icon" aria-hidden="true">
                {route.icon}
              </span>
              <span>{route.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
