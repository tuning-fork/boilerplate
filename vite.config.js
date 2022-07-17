import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3001,
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:3000",
      },
    },
  },
  plugins: [react(), svgrPlugin(), eslint({ failOnError: false })],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/testSupport/testSetup.js",
    api: {
      host: "0.0.0.0",
    },
  },
});
