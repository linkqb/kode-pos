# Kode Pos

Project Astro static untuk Cloudflare Pages.

## Cloudflare Pages

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`

Tidak memakai Astro SSR atau `@astrojs/cloudflare`.

Data Kode Pos tidak dibundle ke build. Halaman mengambil data dari Worker API saat request diperlukan.

## API

`https://api-kodepos.linkq.workers.dev/api/kode-pos`

Route yang digunakan:
- `/provinsi`
- `/kota?prov_id=...`
- `/kecamatan?city_id=...`
- `/kelurahan?dis_id=...`
