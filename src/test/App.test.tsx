import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { PersonaProvider } from "../context/PersonaContext";

// Helper to render the app at a given URL with all providers in place.
function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <PersonaProvider>
        <App />
      </PersonaProvider>
    </MemoryRouter>
  );
}

describe("App shell", () => {
  it("renders the header title", () => {
    renderAt("/associate/dashboard");
    expect(screen.getByText("RAS Training Hub")).toBeInTheDocument();
  });

  it("shows the associate dashboard after loading", async () => {
    renderAt("/associate/dashboard");
    // While loading we see the spinner message...
    expect(screen.getByText(/loading your dashboard/i)).toBeInTheDocument();
    // ...then the welcome heading appears once mock data resolves.
    await waitFor(() =>
      expect(screen.getByText(/welcome back/i)).toBeInTheDocument()
    );
  });

  it("displays the FastAPI health badge", () => {
    renderAt("/associate/dashboard");
    // Backend is offline in tests, so we expect the offline label.
    expect(screen.getByText(/api offline/i)).toBeInTheDocument();
  });

  it("shows a 404 page for unknown routes", () => {
    renderAt("/does-not-exist");
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it("shows manager team dashboard when persona is switched", async () => {
    renderAt("/associate/dashboard");
    // Change the persona dropdown to Manager.
    const select = screen.getByLabelText(/select persona/i);
    fireEvent.change(select, { target: { value: "manager" } });
    await waitFor(() =>
      expect(screen.getByText(/team development summary/i)).toBeInTheDocument()
    );
  });
});
