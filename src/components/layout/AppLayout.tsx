import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { Sidebar } from "./Sidebar";
import { usePersona } from "../../context/PersonaContext";

// ---------------------------------------------------------------------------
// The overall page shell shared by BOTH personas: header on top, sidebar on
// the left, and the current page rendered in the main area via <Outlet />.
//
// The associate and manager "layouts" are the same shell, but the Sidebar and
// header persona switch make them behave differently. A small colour accent on
// the <div> makes the manager view visually distinct from the associate view.
// ---------------------------------------------------------------------------

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role } = usePersona();

  return (
    <div className={`app-shell app-shell--${role}`}>
      <AppHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
        {/* Dim overlay on mobile when the sidebar is open */}
        {sidebarOpen && (
          <div
            className="app-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
        <main className="app-main" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
