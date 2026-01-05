import { NekoApiError } from "@/lib/neko-api-error";
import { KabupatenDto, KecamatanDto, KelurahanDto, ProvinsiDto } from "./dto";

export async function getProvinsi() {
  const res = await fetch(
    "https://ibnux.github.io/data-indonesia/provinsi.json",
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) throw new NekoApiError(500, "Failed to fetch data nyan!");

  const data: ProvinsiDto[] = await res.json();

  return data;
}

export async function getKabupaten(id: string) {
  const res = await fetch(
    `https://ibnux.github.io/data-indonesia/kabupaten/${id}.json`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) throw new NekoApiError(500, "Failed to fetch data nyan!");

  const data: KabupatenDto[] = await res.json();

  return data;
}

export async function getKecamatan(id: string) {
  const res = await fetch(
    `https://ibnux.github.io/data-indonesia/kecamatan/${id}.json`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) throw new NekoApiError(500, "Failed to fetch data nyan!");

  const data: KecamatanDto[] = await res.json();

  return data;
}

export async function getKelurahan(id: string) {
  const res = await fetch(
    `https://ibnux.github.io/data-indonesia/kelurahan/${id}.json`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) throw new NekoApiError(500, "Failed to fetch data nyan!");

  const data: KelurahanDto[] = await res.json();

  return data;
}
