import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    assetsDir: "_assets",
    rollupOptions: {
      external: [
        /^mock\/.*/, // mock/ 디렉토리 아래의 모든 파일을 제외
      ],
      output: {
        // 수동으로 chunk 생성
        manualChunks: (id) => {
          if (id.indexOf("node_modules") !== -1) {
            const module = id.split("node_modules/").pop().split("/")[0];
            return `vendor-${module}`;
          }
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.219.109:8080",
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
