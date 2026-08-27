import { defineConfig } from 'astro';

export default defineConfig({
  output: 'static',
  site: 'https://kode-pos.pages.dev',
  build: {
    format: 'directory'
  }
});
