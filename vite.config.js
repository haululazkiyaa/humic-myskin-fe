import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "https://myskin-v2.humicprototyping.com/",
  plugins: [react(), tailwindcss()],
});
