/**
 * Data layer placeholder.
 *
 * Keep all Kode Pos data access here. This file intentionally does not
 * fetch the complete dataset during build. Runtime KV/API integration
 * can be added here without changing the dynamic route architecture.
 */
export function kodePosUrl(
  provinsi?: string,
  kota?: string,
  kecamatan?: string
) {
  return [
    '/kode-pos',
    provinsi,
    kota,
    kecamatan
  ].filter(Boolean).map(encodeURIComponent).join('/') + '/';
}
