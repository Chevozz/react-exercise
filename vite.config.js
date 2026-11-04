import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // /api diteruskan ke Laravel supaya tidak perlu URL absolut dan tidak
  // tersandung CORS saat pengembangan.
  server: {
    proxy: {
      "/api": { target: "http://127.0.0.1:8000", changeOrigin: true },
      "/storage": { target: "http://127.0.0.1:8000", changeOrigin: true },
    },
  },
});
