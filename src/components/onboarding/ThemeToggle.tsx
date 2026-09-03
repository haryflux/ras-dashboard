import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

// ---------------------------------------------------------------------------
// ThemeToggle.tsx — UPDATED to support two layouts:
//   - "fixed"  (default) -> floating circular button, used on Login/Onboarding
//   - "inline" -> sits naturally inside the dashboard header, next to the
//                 persona switcher / health badge / user chip
//
// This REPLACES the previous version at:
//   src/components/onboarding/ThemeToggle.tsx
//
// It still just toggles `data-theme` on <html> and saves the choice in
// localStorage under "atlas_theme" — that single source of truth is what
// lets BOTH the onboarding flow AND the main dashboard react to the same
// switch, since both onboarding.css and index.css now define light-theme
// overrides under the same [data-theme="light"] selector.
// ---------------------------------------------------------------------------

export type AtlasTheme = "dark" | "light";

function getInitialTheme(): AtlasTheme {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("atlas_theme");
  return saved === "light" ? "light" : "dark";
}

export function applyTheme(theme: AtlasTheme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("atlas_theme", theme);
}

export function ThemeToggle({ variant = "fixed" }: { variant?: "fixed" | "inline" }) {
  const [theme, setTheme] = useState<AtlasTheme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const next: AtlasTheme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  const className = variant === "fixed" ? "atlas-theme-toggle" : "theme-toggle-inline";

  return (
    <button
      className={className}
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
