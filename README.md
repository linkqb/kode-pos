# Kode Pos — Cloudflare Pages SSR

Clean rebuild containing only the Kode Pos feature.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Framework: Astro
- Output: Server / SSR
- Adapter: `@astrojs/cloudflare`
- Site URL: `https://kode-pos.pages.dev`

Environment variables:

`PUBLIC_KODEPOS_API_URL=https://api-kodepos.linkq.workers.dev`

The Kode Pos pages do not use `getStaticPaths()` and do not fetch the Kode Pos API during `npm run build`. Data is fetched at request time by the Astro server.

## Routes

- `/`
- `/kode-pos/`
- `/kode-pos/{provinsi}/`
- `/kode-pos/{provinsi}/{kota}/`
- `/kode-pos/{provinsi}/{kota}/{kecamatan}/`

No Tools, Product, or Docs are included.
