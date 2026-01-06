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
    email: z.email("Invalid email address").optional().or(z.literal("")),
    phone: z
      .string()
      .min(1, "Phone number cannot be empty")
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone must be provided",
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
