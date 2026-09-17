import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Site şu an GitHub Pages'te alt yolda yayınlanıyor:
  // https://ceyhungulbas.github.io/archaplan/
  // Kendi alan adına (archaplan.com.tr) geçince burayı "/" yapın,
  // aksi halde tüm varlıklar 404 döner ve sayfa beyaz kalır.
  base: "/archaplan/",
  plugins: [react(), tailwindcss()],
});
