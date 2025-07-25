/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["manifest.json"],
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com/,

            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: {
                maxEntries: 10,
                // 30 days in seconds
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      manifest: {
        name: "Katasaka",
        short_name: "Katasaka",
        description: "Katasaka",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/PWA/LogoSquare.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any",
          },
          {
            src: "/PWA/LogoSquare.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any",
          },
        ],
        screenshots: [
          {
            src: "/PWA/bg-2.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/PWA/bg-1.png",
            sizes: "375x667",
            type: "image/png",
          },
        ],
        lang: "en",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
