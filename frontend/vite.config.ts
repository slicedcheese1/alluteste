/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  test: {
    deps: {
      registerNodeLoader: true,
    },
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setupTests.ts",
  },
  resolve: {
    alias: [
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@router", replacement: path.resolve(__dirname, "src/router") },
      { find: "@interfaces", replacement: path.resolve(__dirname, "src/interfaces") },
      { find: "@services", replacement: path.resolve(__dirname, "src/services") },
      { find: "@test", replacement: path.resolve(__dirname, "src/test") },
      { find: "@context", replacement: path.resolve(__dirname, "src/context") },
      { find: "@components", replacement: path.resolve(__dirname, "src/components") },
    ],
  },
});
