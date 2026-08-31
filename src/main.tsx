import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PersonaProvider } from "./context/PersonaContext";
import "./index.css";

// App entry point. We wrap <App /> in:
//   - BrowserRouter  -> enables URL routing
//   - PersonaProvider -> makes the selected persona available everywhere
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PersonaProvider>
        <App />
      </PersonaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
