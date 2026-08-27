import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',

  site:
    process.env.SITE_URL ||
    'https://kode-pos.pages.dev',

  integrations: [
    sitemap()
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  },

  vite: {
    build: {
      target: 'esnext'
    }
  }
});