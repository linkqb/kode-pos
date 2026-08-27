import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',

  site:
    process.env.SITE_URL ||
    'https://kodepos.linkqb.com',

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
