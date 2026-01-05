import { z } from "zod";

export const locationObject = z.object({
  id: z.string(),
  nama: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export const provinsiDto = locationObject;
export const kabupatenDto = locationObject;
export const kecamatanDto = locationObject;
export const kelurahanDto = locationObject;

export type ProvinsiDto = z.infer<typeof provinsiDto>;
export type KabupatenDto = z.infer<typeof kabupatenDto>;
export type KecamatanDto = z.infer<typeof kecamatanDto>;
export type KelurahanDto = z.infer<typeof kelurahanDto>;
