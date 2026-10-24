import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const pages = ["index", "privacy", "terms", "refund", "cookies", "404"];
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
    rollupOptions: { input: Object.fromEntries(pages.map((p) => [p, resolve(__dirname, p + ".html")])) }
  }
});
