import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
  plugins: [react(), svgrPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/testSupport/testSetup.js",
    api: {
      host: "0.0.0.0",
    },
  },
});
