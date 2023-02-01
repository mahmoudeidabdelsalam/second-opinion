import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue2 from "@vitejs/plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins
  plugins: [vue2()],

  // resolve
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  // build
  build: {
    chunkSizeWarningLimit: 1600,
    emptyOutDir: true,
  },
});
