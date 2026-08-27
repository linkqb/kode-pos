export const API_BASE_URL =
  import.meta.env.PUBLIC_KODEPOS_API_URL ||
  "https://api-kodepos.linkq.workers.dev";

export interface Province {
  id: string;
  name: string;
}

export interface City {
  id: string;
  prov_id: string;
  name: string;
}

export interface District {
  id: string;
  city_id: string;
  name: string;
}

export interface Subdistrict {
  id: string;
  dis_id: string;
  name: string;
  postal_code: string;
}

export interface Postal {
  postal_id: string;
  subdis_id: string;
  dis_id: string;
  city_id: string;
  prov_id: string;
  postal_code: string;
  subdis_name: string;
  dis_name: string;
  city_name: string;
  prov_name: string;
}

export function kodePosUrl(
  provinsi?: string,
  kota?: string,
  kecamatan?: string
): string {
  const parts = [provinsi, kota, kecamatan]
    .filter(Boolean)
    .map(slugify);

  return parts.length ? `/kode-pos/${parts.join("/")}/` : "/kode-pos/";
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
