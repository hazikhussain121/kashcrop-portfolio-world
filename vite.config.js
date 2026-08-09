import { defineConfig } from 'vite';

// Vizier web — single-page, full-WebGL. Cloudflare Pages friendly build.
export default defineConfig({
  build: {
    target: 'es2020',
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  server: { port: 5180, open: true },
});
