import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  server: {
    port: 3001,
  },
  build: {
    outDir: "build",
  },
  plugins: [reactRefresh(), svgrPlugin()],
});
