import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // 🟦 Tell Vite to use src/index.jsx as the entry point
  build: {
    rollupOptions: {
      input: "src/index.jsx",
    },
  },
});

