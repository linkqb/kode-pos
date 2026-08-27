export const API_BASE =
  'https://api-kodepos.linkq.workers.dev/api/kode-pos';

export type Province = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  prov_id: string;
  name: string;
};

export type District = {
  id: string;
  city_id: string;
  name: string;
};

export type Subdistrict = {
  id: string;
  dis_id: string;
  name: string;
  postal_code: string;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function kodePosUrl(
  province?: string,
  city?: string,
  district?: string
) {
  const parts = [province, city, district].filter(Boolean).map(encodeURIComponent);
  return `/kode-pos/${parts.join('/')}/`;
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) throw new Error(`Kode Pos API ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getProvinces(): Promise<Province[]> {
  const result = await getJson<{ data: Province[] }>('/provinsi');
  return result.data ?? [];
}

export async function getCities(provId: string): Promise<City[]> {
  const result = await getJson<{ data: City[] }>(
    `/kota?prov_id=${encodeURIComponent(provId)}`
  );
  return result.data ?? [];
}

export async function getDistricts(cityId: string): Promise<District[]> {
  const result = await getJson<{ data: District[] }>(
    `/kecamatan?city_id=${encodeURIComponent(cityId)}`
  );
  return result.data ?? [];
}

export async function getSubdistricts(disId: string): Promise<Subdistrict[]> {
  const result = await getJson<{ data: Subdistrict[] }>(
    `/kelurahan?dis_id=${encodeURIComponent(disId)}`
  );
  return result.data ?? [];
}
