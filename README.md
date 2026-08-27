# Kode Pos — Astro Static + Cloudflare Pages

Project ini sengaja hanya berisi fitur Kode Pos.

## Build

```bash
npm install
npm run build
```

Output:

```text
dist/
```

## Cloudflare Pages

Build command:

```text
npm run build
```

Build output directory:

```text
dist
```

Tidak diperlukan `@astrojs/cloudflare`, `wrangler.toml`, Worker terpisah untuk frontend, atau KV binding pada Pages.

Frontend static mengambil data saat user membuka/memilih wilayah dari:

```text
https://api-kodepos.linkq.workers.dev
```

Opsional:

```text
PUBLIC_KODEPOS_API_URL=https://api-kodepos.linkq.workers.dev
```

## Data loading

Tidak ada API Kode Pos yang dipanggil saat `npm run build`.
Tidak ada `getStaticPaths()` untuk route Kode Pos.

Urutan request:

- Home → `/api/kode-pos/provinsi`
- Provinsi → `/api/kode-pos/kota?prov_id=...`
- Kota → `/api/kode-pos/kecamatan?city_id=...`
- Kecamatan → `/api/kode-pos/kelurahan?dis_id=...`

Data postal sudah dikembalikan oleh endpoint kelurahan berdasarkan response Worker saat ini.
