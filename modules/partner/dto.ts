import { z } from "zod";

// Shared input fields
const partnerInputSchema = z.object({
  user_id: z.string(),
  type: z.enum(["supplier", "buyer", "both"]),
  partner_number: z.string(),
  business_entity: z.string().optional(),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  company_phone: z.string().optional(),
  address_line1: z.string().optional(),
  address_line2: z.string().optional(),
  regency: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  created_by: z.string(),
});

// Schema for creating a partner
export const createPartnerDto = partnerInputSchema;
export type CreatePartnerDto = z.infer<typeof createPartnerDto>;

// Schema for updating a partner
// All fields are optional, user_id, partner_number, created_by are not updatable
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
  partner_number: z.string(),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
});

// Schema for partner list item
export const listPartnerDto = partnerBase;
export type ListPartnerDto = z.infer<typeof listPartnerDto>;

// Schema for partner detail
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

// Schema for the query parameters for finding partners
export const findPartnersQueryDto = z.object({
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("asc").optional(),
  email: z.string().optional(),
  partner_number: z.string().optional(),
});
export type FindPartnersQueryDto = z.infer<typeof findPartnersQueryDto>;
