export const API_BASE =
  "https://api-kodepos.linkq.workers.dev/api/kode-pos";

export interface Province {
  prov_id: string;
  name: string;
  slug: string;
}

export interface City {
  city_id: string;
  prov_id: string;
  name: string;
  slug: string;
}

export interface District {
  dis_id: string;
  city_id: string;
  name: string;
  slug: string;
}

export interface PostalCode {
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

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${url}`);
  }

  return response.json();
}

/* =========================
   PROVINSI
========================= */

export async function getProvinces(): Promise<Province[]> {
  const result = await getJSON<{
    data: { id: string; name: string }[];
  }>(`${API_BASE}/provinsi`);

  return result.data.map((item) => ({
    prov_id: item.id,
    name: item.name,
    slug: slugify(item.name),
  }));
}

export async function resolveProvince(
  _locals: App.Locals,
  slug: string
): Promise<Province | undefined> {
  const provinces = await getProvinces();

  return provinces.find(
    (item) =>
      item.slug === slug ||
      item.prov_id === slug
  );
}

/* =========================
   KOTA
========================= */

export async function getCities(
  _locals: App.Locals,
  provId: string
): Promise<City[]> {
  const result = await getJSON<{
    data: {
      id: string;
      prov_id: string;
      name: string;
    }[];
  }>(`${API_BASE}/kota?prov_id=${encodeURIComponent(provId)}`);

  return result.data.map((item) => ({
    city_id: item.id,
    prov_id: item.prov_id,
    name: item.name,
    slug: slugify(item.name),
  }));
}

export async function resolveCity(
  locals: App.Locals,
  province: Province,
  slug: string
): Promise<City | undefined> {
  const cities = await getCities(locals, province.prov_id);

  return cities.find(
    (item) =>
      item.slug === slug ||
      item.city_id === slug
  );
}

/* =========================
   KECAMATAN
========================= */

export async function getDistricts(
  _locals: App.Locals,
  cityId: string
): Promise<District[]> {
  const result = await getJSON<{
    data: {
      id: string;
      city_id: string;
      name: string;
    }[];
  }>(
    `${API_BASE}/kecamatan?city_id=${encodeURIComponent(cityId)}`
  );

  return result.data.map((item) => ({
    dis_id: item.id,
    city_id: item.city_id,
    name: item.name,
    slug: slugify(item.name),
  }));
}

export async function resolveDistrict(
  locals: App.Locals,
  city: City,
  slug: string
): Promise<District | undefined> {
  const districts = await getDistricts(
    locals,
    city.city_id
  );

  return districts.find(
    (item) =>
      item.slug === slug ||
      item.dis_id === slug
  );
}

/* =========================
   KELURAHAN / KODE POS
========================= */

export async function getPostalCodes(
  _locals: App.Locals,
  districtId: string
): Promise<PostalCode[]> {
  const result = await getJSON<{
    data: PostalCode[];
  }>(
    `${API_BASE}/kelurahan?dis_id=${encodeURIComponent(
      districtId
    )}`
  );

  return result.data.map((item) => ({
    postal_id: item.postal_id ?? item.id ?? "",
    subdis_id: item.subdis_id ?? item.id ?? "",
    dis_id: item.dis_id,
    city_id: item.city_id,
    prov_id: item.prov_id,
    postal_code: item.postal_code,
    subdis_name: item.subdis_name ?? item.name,
    dis_name: item.dis_name ?? "",
    city_name: item.city_name ?? "",
    prov_name: item.prov_name ?? "",
  }));
}

/* =========================
   URL
========================= */

export function kodePosUrl(
  provinsi?: string,
  kota?: string,
  kecamatan?: string
) {
  return (
    [
      "/kode-pos",
      provinsi,
      kota,
      kecamatan,
    ]
      .filter(Boolean)
      .map(encodeURIComponent)
      .join("/") + "/"
  );
}
