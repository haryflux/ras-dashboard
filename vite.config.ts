/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite config. The `test` block wires up Vitest for our frontend tests.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // During local dev, forward /api calls to the FastAPI backend so the
    // browser never talks to Azure/AI directly (see coding instructions).
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: false,
  },
});
