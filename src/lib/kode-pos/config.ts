const API_BASE_URL = (
  import.meta.env.PUBLIC_KODEPOS_API_URL ||
  'https://api-kodepos.linkq.workers.dev'
).replace(/\/$/, '');

export interface Province { id: string; name: string }
export interface City { id: string; prov_id: string; name: string }
export interface District { id: string; city_id: string; name: string }
export interface Subdistrict { id: string; dis_id: string; name: string; postal_code: string }
export interface Postal {
  postal_id: string; subdis_id: string; dis_id: string; city_id: string; prov_id: string;
  postal_code: string; subdis_name: string; dis_name: string; city_name: string; prov_name: string;
}

async function apiFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  for (const [key, value] of Object.entries(params || {})) url.searchParams.set(key, value);

  const response = await fetch(url, {
    headers: { accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Kode Pos API returned HTTP ${response.status}`);
  }

  const result = await response.json() as { data?: T; error?: string };
  if (result.data === undefined) {
    throw new Error(result.error || 'Invalid Kode Pos API response');
  }
  return result.data;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const getProvinces = () => apiFetch<Province[]>('/api/kode-pos/provinsi');
export const getCities = (provId: string) => apiFetch<City[]>('/api/kode-pos/kota', { prov_id: provId });
export const getDistricts = (cityId: string) => apiFetch<District[]>('/api/kode-pos/kecamatan', { city_id: cityId });
export const getSubdistricts = (disId: string) => apiFetch<Subdistrict[]>('/api/kode-pos/kelurahan', { dis_id: disId });
export const getPostalCode = (subdisId: string) => apiFetch<Postal>('/api/kode-pos/postal', { subdis_id: subdisId });

export function kodePosUrl(provinsi?: string, kota?: string, kecamatan?: string): string {
  const parts = [provinsi, kota, kecamatan].filter(Boolean).map(slugify);
  return parts.length ? `/kode-pos/${parts.join('/')}/` : '/kode-pos/';
}
