const API_BASE =
  "https://api-kodepos.linkq.workers.dev/api/kode-pos";

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

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export const kodePosApi = {
  async provinces(): Promise<Province[]> {
    const result = await request<{ data: Province[] }>(
      "/provinsi"
    );

    return result.data ?? [];
  },

  async cities(provId: string): Promise<City[]> {
    const result = await request<{ data: City[] }>(
      `/kota?prov_id=${encodeURIComponent(provId)}`
    );

    return result.data ?? [];
  },

  async districts(cityId: string): Promise<District[]> {
    const result = await request<{ data: District[] }>(
      `/kecamatan?city_id=${encodeURIComponent(cityId)}`
    );

    return result.data ?? [];
  },

  async subdistricts(disId: string): Promise<Subdistrict[]> {
    const result = await request<{ data: Subdistrict[] }>(
      `/kelurahan?dis_id=${encodeURIComponent(disId)}`
    );

    return result.data ?? [];
  },

  async postal(subdisId: string) {
    const result = await request<{
      data: {
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
      };
    }>(
      `/postal?subdis_id=${encodeURIComponent(subdisId)}`
    );

    return result.data;
  }
};

export function kodePosUrl(
  provinsi?: string,
  kota?: string,
  kecamatan?: string
) {
  return [
    "/kode-pos",
    provinsi,
    kota,
    kecamatan
  ]
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/") + "/";
}
