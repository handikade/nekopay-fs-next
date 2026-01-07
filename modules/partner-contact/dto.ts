import { isValidObjectId } from "mongoose";
import { z } from "zod";

const basePartnerContactSchema = z
  .object({
    user_id: z.string().refine((val) => isValidObjectId(val), {
      message: "Invalid User ID",
    }),
    partner_id: z.string().refine((val) => isValidObjectId(val), {
      message: "Invalid Partner ID",
    }),
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address").optional(),
    phone: z
      .string()
      .trim()
      .transform((v) => (v === "" ? undefined : v))
      .optional()
      .refine(
        (v) => v === undefined || /^[+0-9()\-\s]{7,20}$/.test(v),
        "Invalid phone number"
      ),
    // created_at: z.date(),
    // updated_at: z.date(),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone must be provided",
  });

// Define a schema for the _id field
const idSchema = z.object({
  _id: z
    .string()
    .refine((val) => isValidObjectId(val), { message: "Invalid ID" }),
});

export const createPartnerContactDto = basePartnerContactSchema.strict();
export type CreatePartnerContactDto = z.infer<typeof createPartnerContactDto>;

export const updatePartnerContactDto = basePartnerContactSchema
  .omit({
    partner_id: true,
    user_id: true,
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  })
  .strict();
export type UpdatePartnerContactDto = z.infer<typeof updatePartnerContactDto>;

export const listPartnerContactDto = basePartnerContactSchema
  .omit({ user_id: true, partner_id: true })
  .extend(idSchema.shape)
  .extend({ created_at: z.string(), updated_at: z.string() })
  .strict();
export type ListPartnerContactDto = z.infer<typeof listPartnerContactDto>;

export const viewPartnerContactDto = basePartnerContactSchema
  .omit({ user_id: true, partner_id: true })
  .extend(idSchema.shape)
  .extend({ created_at: z.string(), updated_at: z.string() })
  .strict();
export type ViewPartnerContactDto = z.infer<typeof viewPartnerContactDto>;
