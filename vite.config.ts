import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { compression } from "vite-plugin-compression2";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "brotliCompress",
    }),
    compression({
      algorithm: "gzip",
    }),
  ],
  build: {
    outDir: "dist",
    assetsDir: "_assets",
    rollupOptions: {
      output: {
        // 수동으로 chunk 생성
        manualChunks: (id) => {
          if (id.indexOf("node_modules") !== -1) {
            const module = id.split("node_modules/").pop().split("/")[0];
            return `vendor-${module}`;
          }
        },
      },
      plugins: [
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
