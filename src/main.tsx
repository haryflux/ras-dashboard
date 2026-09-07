import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { PersonaProvider } from "./context/PersonaContext";
import "./index.css";

// App entry point. We wrap <App /> in:
//   - HashRouter     -> enables GitHub Pages-compatible routing
//   - PersonaProvider -> makes the selected persona available everywhere
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <PersonaProvider>
        <App />
      </PersonaProvider>
    </HashRouter>
  </React.StrictMode>
);
