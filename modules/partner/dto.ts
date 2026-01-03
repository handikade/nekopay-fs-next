import { z } from "zod";

const partnerInputSchema = z.object({
  user_id: z.string(),
  type: z.enum(["supplier", "buyer", "both"]),
  partner_number: z.string().trim(),
  business_entity: z.string().trim().optional(),
  name: z.string().trim(),
  email: z.email(),
  phone: z.string().trim(),
  company_phone: z.string().trim().optional(),
  address_line1: z.string().trim().optional(),
  address_line2: z.string().trim().optional(),
  regency: z.string().trim().optional(),
  city: z.string().trim().optional(),
  province: z.string().trim().optional(),
  postal_code: z.string().trim().optional(),
  country: z.string().trim().optional(),
  created_by: z.string().trim(),
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

// Base schema for partner data returned from API@dto
const partnerBase = z.object({
  id: z.string(),
  type: z.enum(["supplier", "buyer", "both"]),
  number: z.string(),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  createdAt: z.string(),
});

export const listPartnerDto = partnerBase;
export type ListPartnerDto = z.infer<typeof listPartnerDto>;

export const detailPartnerDto = partnerBase.extend({
  business_entity: z.string().optional(),
  company_phone: z.string().optional(),
  address_line1: z.string().optional(),
  address_line2: z.string().optional(),
  regency: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
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
