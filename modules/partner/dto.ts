import { z } from "zod";

const locationObject = z.object({
  id: z.string(),
  name: z.string(),
});

const addressIntlObject = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
});

const countryObject = z.object({
  iso2: z.string(),
  name: z.string(),
});

const partnerInputSchema = z.object({
  user_id: z.string(),
  type: z.array(z.enum(["supplier", "buyer"])).min(1, {
    message: "Partner type must have at least one item.",
  }),
  partner_number: z.string().trim().nonempty(),
  business_entity: z
    .enum(["cv", "pt", "koperasi", "perorangan", "lainnya"])
    .optional(),
  name: z.string().trim(),
  email: z.email(),
  phone: z.string().trim(),
  company_phone: z.string().trim().optional(),
  address: z
    .object({
      address_line1: z.string().trim().optional(),
      address_line2: z.string().trim().optional(),
      kelurahan: locationObject.optional(),
      kecamatan: locationObject.optional(),
      kabupaten: locationObject.optional(),
      provinsi: locationObject.optional(),
      postal_code: z.string().trim().optional(),
    })
    .optional(),
  address_intl: addressIntlObject.optional(),
  country: countryObject.optional(),
  created_by: z.string().trim(),
  created_at: z.date().optional().default(new Date()),
  updated_at: z.date().optional(),
});

export const createPartnerDto = partnerInputSchema;
export type CreatePartnerDto = z.infer<typeof createPartnerDto>;

export const updatePartnerDto = partnerInputSchema
  .partial()
  .omit({ user_id: true, partner_number: true, created_by: true })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });
export type UpdatePartnerDto = z.infer<typeof updatePartnerDto>;

// Base schema for partner data returned from API
const partnerBase = z.object({
  id: z.string(),
  type: z.array(z.enum(["supplier", "buyer"])),
  number: z.string(),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  created_at: z.string(),
});

export const listPartnerDto = partnerBase;
export type ListPartnerDto = z.infer<typeof listPartnerDto>;

export const detailPartnerDto = partnerBase.extend({
  business_entity: z
    .enum(["cv", "pt", "koperasi", "perorangan", "lainnya"])
    .optional(),
  company_phone: z.string().optional(),
  address: z
    .object({
      address_line1: z.string().optional(),
      address_line2: z.string().optional(),
      kelurahan: locationObject.optional(),
      kecamatan: locationObject.optional(),
      kabupaten: locationObject.optional(),
      provinsi: locationObject.optional(),
      postal_code: z.string().optional(),
    })
    .optional(),
  address_intl: addressIntlObject.optional(),
  country: countryObject.optional(),
  created_by: z.string(),
  created_at: z.date(),
  updated_at: z.date().optional(),
});
export type DetailPartnerDto = z.infer<typeof detailPartnerDto>;

export const findPartnersQueryDto = z.object({
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc").optional(),
  email: z.string().optional(),
  partner_number: z.string().optional(),
});
export type FindPartnersQueryDto = z.infer<typeof findPartnersQueryDto>;
