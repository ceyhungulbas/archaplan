import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Site kendi alan adında kökten yayınlanıyor: https://archaplan.com/
  // Alt yola (ör. github.io/archaplan/) dönülürse burası tekrar "/archaplan/"
  // olmalı, aksi halde tüm varlıklar 404 döner ve sayfa beyaz kalır.
  base: "/",
  plugins: [react(), tailwindcss()],
});
