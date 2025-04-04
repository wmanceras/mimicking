import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://devtools.veritran.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/mimicking": {
        target: "http://co-ailct-01.veritran.net:8080",
        changeOrigin: true,
        secure: false, // Si el servidor usa HTTP en lugar de HTTPS
        rewrite: (path) => path.replace(/^\/mimicking/, ""),
      },
    },
  },
});
